import {
  AnimatePresence,
  cubicBezier,
  motion,
  stagger,
  useAnimate,
  useMotionValue,
  usePresence,
} from "framer-motion";
// import { animate } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight20Filled } from "@fluentui/react-icons";
import { nativeImage } from "electron";
import useSetupSequence from "@r/hooks/useSetupSequence";
import useStore from "@r/hooks/useStore";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
// } from "@r/components/ui/DropdownMenu";
import useLanguage from "@r/hooks/useLanguage";
import BetterParagraph from "@r/components/BetterParagraph";
import useGlobalVariable from "@r/hooks/useGlobalVariable";
import { getAssetsPath } from "@r/lib/utils";

const easingGraph = cubicBezier(0.17, 0.67, 0.53, 0.99);

function Welcome() {
  const { setStoreKey } = useStore();
  const { getLanguageKey } = useLanguage();
  const [scope, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();
  const [isNextButtonVisible, setIsNextButtonVisible] = useState(true);
  const [divChildrens, setDivChildrens] = useState<{
    firstDivChildren: Array<string>;
    secondDivChildren: Array<string>;
  }>({
    firstDivChildren: [],
    secondDivChildren: [],
  });

  useEffect(() => {
    (async () => {
      const WELCOME_TEXT = "setup.welcome_text";

      const welcomeText = await getLanguageKey(WELCOME_TEXT);
      const welcomeTextSplited = welcomeText.split(" ");
      for (let i = 0; i < welcomeTextSplited.length; i++) {
        if (welcomeTextSplited[i].indexOf("**") === 0) {
          setDivChildrens({
            firstDivChildren: welcomeTextSplited.slice(0, i),
            secondDivChildren: welcomeTextSplited.slice(i),
          });
        }
      }
    })();
  }, [getLanguageKey, divChildrens]);

  function startSetup() {
    setStoreKey({ isFirstTimeOpened: false });
  }

  function handleWelcomeNextAction() {
    // const animateBgWidth = animate(backgroundWidth, 350, {
    //   duration: 0.8,
    //   ease: eased,
    // });
    // animateBgWidth.then(() => startSetup());
    startSetup();
  }

  async function handleStartAnimation() {
    await animate(
      "div",
      { transform: ["translateY(0)", "translateY(-20px)"] },
      {
        delay: stagger(0.1, { startDelay: 2.9 }),
        duration: 0.4,
        ease: "easeOut",
      },
    );
  }

  async function handleExitAnimation() {
    await animate(
      "div",
      {
        transform: ["translateY(-20px)", "translateY(-40px)"],
        opacity: [1, 0],
        filter: "blur(6px)",
      },
      {
        delay: stagger(0.1),
        duration: 0.4,
        ease: easingGraph,
      },
    );
    handleWelcomeNextAction();
  }

  useEffect(() => {
    if (isPresent) {
      handleStartAnimation();
    } else {
      // animate(backgroundWidth, 320, {duration:2})
      safeToRemove();
    }
  }, [isPresent]);

  const spanVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(6px)",
      bottom: -10,
      transition: {
        ease: easingGraph,
      },
    },
    visible: { opacity: 1, filter: "blur(0)", bottom: 0 },
  };

  return (
    <div className="grid h-full w-full items-center text-white">
      <motion.div className="text-5xl/16 text-center" ref={scope}>
        <motion.div
          variants={spanVariants}
          animate="visible"
          initial="hidden"
          transition={{
            staggerChildren: 0.15,
          }}
        >
          {divChildrens.firstDivChildren.map((children) => (
            <motion.span
              className="font-ginto-nord relative"
              variants={spanVariants}
              transition={{
                duration: 0.4,
              }}
            >
              <BetterParagraph>{children}</BetterParagraph>
            </motion.span>
          ))}
        </motion.div>
        <motion.div
          animate="visible"
          initial="hidden"
          variants={spanVariants}
          transition={{
            delayChildren: 0.5,
            staggerChildren: 0.15,
          }}
        >
          {divChildrens.secondDivChildren.map((children) => (
            <motion.span
              className="font-ginto-nord relative"
              variants={spanVariants}
              transition={{
                duration: 0.4,
              }}
            >
              <BetterParagraph>{children}</BetterParagraph>
            </motion.span>
          ))}
          <motion.span
            className="font-ginto-nord relative"
            variants={spanVariants}
          >
            .
          </motion.span>
        </motion.div>
      </motion.div>
      <div className="absolute bottom-0 flex w-full justify-center">
        <AnimatePresence mode="wait">
          {isNextButtonVisible && (
            <motion.button
              className="relative grid w-fit items-center rounded-lg bg-white px-7 py-3 text-slate-950 hover:bg-neutral-300 active:bg-neutral-400"
              animate={{
                opacity: [0, 1],
                filter: ["blur(6px)", "blur(0)"],
                bottom: [130, 140],
                transition: {
                  delay: 3.2,
                  duration: 0.5,
                  ease: easingGraph,
                },
              }}
              exit={{
                opacity: [1, 0],
                filter: ["blur(0)", "blur(6px)"],
                bottom: [140, 150],
                transition: {
                  delay: 0.15,
                  duration: 0.5,
                  ease: easingGraph,
                },
              }}
              onClick={() => {
                setIsNextButtonVisible(false);
                handleExitAnimation();
              }}
            >
              <ArrowRight20Filled />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function App() {
  const { currentSequence, setCurrentSequence } = useSetupSequence();
  const { getStoreKey } = useStore();
  const { getVariable } = useGlobalVariable();
  const [sequence, setSequence] = useState<Record<string, any>>({});
  const [isFirstTimeOpened, setIsFirstTimeOpened] = useState<boolean>(true);
  const currentSequenceName = currentSequence.sequence;
  const currentSequenceIndex = currentSequence.sequenceIndex;
  const backgroundWidth = useMotionValue(832);
  const wallpaperPath = getAssetsPath("images/wallpaper.jpg");
  const wallpaperUrl = nativeImage.createFromPath(wallpaperPath).toDataURL();

  useEffect(() => {
    (async () => {
      const value = (await getStoreKey("isFirstTimeOpened")) as boolean;
      const setupSequenceValue = (await getVariable(
        "setupSequence",
      )) as typeof sequence;

      setIsFirstTimeOpened(value);
      setSequence(setupSequenceValue);
      setCurrentSequence(Object.keys(sequence)[0]);
    })();
  }, []);

  return (
    <div className="bg-orange-50">
      <motion.div
        className="grid h-full items-center rounded-lg"
        style={{
          backgroundImage: `url(${wallpaperUrl})`,
          width: backgroundWidth,
        }}
      >
        <AnimatePresence mode="wait">
          {isFirstTimeOpened ? (
            <Welcome />
          ) : (
            Object.keys(sequence[currentSequence.sequence]).map((step) => {
              const Sequence = step;
              return (
                sequence[currentSequenceName][currentSequenceIndex] && (
                  <Sequence key={Math.random()} />
                )
              );
            })
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
