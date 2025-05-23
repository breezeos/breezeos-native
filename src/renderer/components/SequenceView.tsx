import React, { useEffect } from "react";
import { ScrollArea } from "./ui/ScrollArea";
import { BatteryState } from "react-use/lib/useBattery";
import { useBattery } from "react-use";
import { motion } from "framer-motion";
import { ArrowRight20Filled, FluentIcon } from "@fluentui/react-icons";
import { cn } from "../lib/utils";
import useSetup from "../hooks/useSetup";
import useSequence from "../hooks/useSequence";
import useDialog from "../hooks/useDialog";
import useLanguage from "../hooks/useLanguage";

interface SequenceViewProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  id: string;
  icon: FluentIcon;
  forwardDisabled?: boolean;
}

const SequenceView: React.FC<SequenceViewProps> = ({
  name,
  id,
  icon: FluentIcon,
  forwardDisabled,
  children,
  className,
}) => {
  const { sequences, setSequence, nextSequence, currentSequence } = useSetup();
  const {
    title,
    desc,
    scrollDisabled,
    interactionsDisabled,
    resetSequence,
    setTitle,
    setDesc,
  } = useSequence();
  const batteryState = useBattery() as BatteryState;
  const batteryLevel = batteryState.level * 100;
  const isCriticallyLowBattery = batteryLevel < 6 && !batteryState.charging;
  const { createDialog } = useDialog();
  const { langData, getLanguageKey } = useLanguage();

  useEffect(() => {
    resetSequence();
    setTitle(getLanguageKey(`Setup_${id}.title`));
    setDesc(getLanguageKey(`Setup_${id}.desc`));
  }, [langData]);

  function handleForward() {
    const preinstall = Object.keys(sequences.preinstall);
    const sequence = sequences.preinstall[currentSequence.sequence];
    if (currentSequence.sequenceIndex === sequence.length - 1) {
      const index = preinstall.indexOf(currentSequence.sequence);
      setSequence(preinstall[index + 1]);
    }

    if (
      preinstall.indexOf(currentSequence.sequence) ===
      preinstall.length - 1
    ) {
      createDialog({
        message: "Apply changes to the system?",
        type: "question",
        important: true,
      });
    }

    nextSequence();
  }

  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <div className="absolute grid h-full w-full grid-cols-[350px_auto]">
      <div className="basis-lg grid place-items-center h-full space-y-5 px-2 py-8">
        {/* {setup.currentSequence !== 0 &&
          !setup.importantSequence &&
          !isCriticallyLowBattery && (
            <div className="absolute left-0 top-0 p-5 text-zinc-950">
              <button
                className="p-1 transition-transform active:scale-75"
                onClick={() => dispatch(prevSequence())}
              >
                <ArrowLeftRegular className="h-5 w-5 text-zinc-950" />
              </button>
            </div>
          )} */}
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            duration: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <FluentIcon
            className="size-28 text-white"
          />
        </motion.div>
        {/* <motion.div
          initial={{ opacity: 0, translateX: "-20px" }}
          animate={{ opacity: 1, translateX: "0" }}
          exit={{ opacity: 0, translateX: "20px" }}
          transition={{
            duration: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <p className="text-3xl font-semibold text-black">{title}</p>
          <p className="text-sm text-zinc-500">{desc}</p>
        </motion.div> */}
      </div>
      <div className="relative flex h-full w-full flex-col justify-between space-y-4 text-zinc-900">
        <p className="font-medium text-3xl text-black">{title}</p>
        {!scrollDisabled ? (
          <ScrollArea>
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{
                duration: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              className={className}
            >
              {children}
            </motion.div>
          </ScrollArea>
        ) : (
          <div
            className={cn(
              "flex h-full flex-col items-center justify-center",
              className,
            )}
          >
            {children}
          </div>
        )}
        <div className="flex flex-row-reverse">
          {!interactionsDisabled && (
            <button
              className="rounded-lg bg-slate-800 px-5 py-3 transition-transform active:scale-90 disabled:pointer-events-none disabled:opacity-30"
              onClick={handleForward}
              disabled={forwardDisabled}
            >
              <ArrowRight20Filled className="text-white" />
            </button>
          )}
          {/* {flexEndButtons && (
            <p onClick={flexEndButtons.action}>{flexEndButtons.label}</p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default SequenceView;
