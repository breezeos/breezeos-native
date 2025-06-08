import {
  AnimatePresence,
  motion,
  cubicBezier,
  stagger,
  useAnimate,
  usePresence,
  Variants,
} from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { ArrowRight20Filled } from "@fluentui/react-icons";
import { useLanguage, useStore } from "@r/hooks";
import BetterParagraph from "@/renderer/components/BetterParagraph";
import { SetupLayoutContext } from "@/renderer/contexts/SetupLayoutContext";

const easingGraph = cubicBezier(0.17, 0.67, 0.53, 0.99);

const spanVariants: Variants = {
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

const classes = {
  welcomeSpan: "font-ginto-nord relative **:font-ginto-nord",
};

export default function Welcome() {
  const setupLayoutContext = useContext(SetupLayoutContext);
  const setBackgroundShrink = setupLayoutContext?.setBackgroundShrink;
  const { setStoreItems } = useStore();
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

  function startSetup() {
    setStoreItems({ isFirstTimeOpened: false });
  }

  function handleWelcomeNextAction() {
    if (setBackgroundShrink) setBackgroundShrink();
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
      safeToRemove();
    }
  }, [isPresent]);

  useEffect(() => {
    const WELCOME_TEXT = "setup.welcome_text";

    const welcomeText = getLanguageKey(WELCOME_TEXT);
    const welcomeTextSplited = welcomeText.split(" ");
    for (let i = 0; i < welcomeTextSplited.length; i++) {
      if (welcomeTextSplited[i].indexOf("**") === 0) {
        const childrens = {
          firstDivChildren: welcomeTextSplited.slice(0, i),
          secondDivChildren: welcomeTextSplited.slice(i),
        };
        setDivChildrens(childrens);
      }
    }
  }, []);

  return (
    <div className="grid h-full w-full items-center text-white">
      <motion.div
        className="text-5xl/16 text-center [&_*]:space-x-3"
        ref={scope}
      >
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
              className={classes.welcomeSpan}
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
              className={classes.welcomeSpan}
              variants={spanVariants}
              transition={{
                duration: 0.4,
              }}
            >
              <BetterParagraph>{children}</BetterParagraph>
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
      <div className="absolute bottom-0 flex w-full justify-center ">
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
                handleExitAnimation();
                setIsNextButtonVisible(false);
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
