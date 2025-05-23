import "../../index.css";
import {
  AnimatePresence,
  cubicBezier,
  motion,
  stagger,
  useAnimate,
  useMotionValue,
  usePresence,
} from "framer-motion";
import "./Setup.css";
import { animate } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import * as Sequences from "./sequences";
import { useBattery } from "react-use";
import { BatteryState } from "react-use/lib/useBattery";
import { cn } from "../../lib/utils";
import BatteryIcon from "../../components/BatteryIcon";
import useSetup from "../../hooks/useSetup";
import useConf from "../../hooks/useConf";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "../../components/ui/DropdownMenu";
import { ArrowRight20Filled } from "@fluentui/react-icons";
import Background from "../../../../assets/images/pink-and-blue-gradient-background-vector-53093083.jpg";

export default function App() {
  const {
    sequences,
    initializeSequence,
    importantSequence,
    currentSequence,
    setSequence,
  } = useSetup();
  const { confData, setConf } = useConf();
  const sequence = currentSequence.sequence;
  const sequenceIndex = currentSequence.sequenceIndex;
  const isFirstTimeOpened = confData.isFirstTimeOpened as boolean;
  const eased = cubicBezier(0.17, 0.67, 0.53, 0.99);
  const backgroundWidth = useMotionValue(832);

  const Welcome = () => {
    const [scope, animate] = useAnimate();
    const [isPresent, safeToRemove] = usePresence();
    const [isNextButtonVisible, setIsNextButtonVisible] = useState(true);

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
          ease: eased,
        },
      );
      handleWelcomeNextAction();
    }

    useEffect(() => {
      if (isPresent) {
        handleStartAnimation();
      } else {
        // animate(backgroundWidth, 320, {duration:2})
        safeToRemove()
      }
    }, [isPresent]);

    const spanVariants = {
      hidden: {
        opacity: 0,
        filter: "blur(6px)",
        bottom: -10,
        transition: {
          ease: eased,
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
              staggerChildren: 0.15
            }}
          >
            <motion.span
              className="font-ginto-nord relative"
              variants={spanVariants}
              transition={{
                duration: 0.4,
              }}
            >
              Welcome
            </motion.span>
            <motion.span
              className="font-ginto-nord relative"
              variants={spanVariants}
              transition={{
                duration: 0.4,
              }}
            >
              {" "}
              to{" "}
            </motion.span>
            <motion.span
              className="font-ginto-nord relative"
              variants={spanVariants}
              transition={{
                duration: 0.4,
              }}
            >
              {" "}
              a
            </motion.span>
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
            <motion.span
              className="font-ginto-nord relative font-bold"
              variants={spanVariants}
              transition={{
                duration: 0.4,
              }}
            >
              better
            </motion.span>
            <motion.span
              className="font-ginto-nord relative"
              variants={spanVariants}
              transition={{
                duration: 0.4,
              }}
            >
              {" "}
              desktop
            </motion.span>
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
                    ease: eased,
                  },
                }}
                exit={{
                  opacity: [1, 0],
                  filter: ["blur(0)", "blur(6px)"],
                  bottom: [140, 150],
                  transition: {
                    delay: 0.15,
                    duration: 0.5,
                    ease: eased,
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
  };

  async function handleWelcomeNextAction() {
    const animateBgWidth = animate(backgroundWidth, 350, { duration: 0.8, ease: eased });
    animateBgWidth.then(() => startSetup());
  }

  async function startSetup(){
    setConf("isFirstTimeOpened", false);
  }

  useEffect(() => {
    if(isFirstTimeOpened == false) {
      initializeSequence();
      backgroundWidth.set(350);
    }
    console.log(sequences);
  }, [isFirstTimeOpened]);

  return (
    <>
      <div className="Setup bg-orange-50 text-slate-950">
          <motion.div
            className="grid h-full items-center rounded-lg bg-cover"
            style={{
              width: backgroundWidth,
              backgroundImage: `url(${Background})`,
            }}
          >
            <AnimatePresence mode="wait">
              {isFirstTimeOpened ? <Welcome /> : (
                sequences.preinstall[sequence]?.map((step, i) => {
                  const Sequence = !importantSequence
                    ? Sequences[step]
                    : Sequences[importantSequence];
                  return sequences.preinstall[sequence][sequenceIndex] && (
                    <Sequence key={i} />
                  );
                })
              )}
            </AnimatePresence>
          </motion.div>
      </div>
    </>
  );
}
