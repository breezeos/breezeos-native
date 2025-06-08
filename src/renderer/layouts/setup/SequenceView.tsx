import React, { useCallback, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight20Filled } from "@fluentui/react-icons";
import {
  useSetupSequence,
  useSequence,
  useDialog,
  useLanguage,
} from "@r/hooks";
import { type FluentIconName } from "@/types";
import FluentIconComponent from "@r/components/FluentIconComponent";
import { InteractionButton } from "@r/components/setup";
import { cn } from "@r/lib";

const variants: Variants = {
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

interface SequenceViewProps extends React.ComponentPropsWithoutRef<"div"> {}

export default function SequenceView({
  children,
  className,
}: SequenceViewProps) {
  const { sequences, setCurrentSequence, nextSequence, currentSequence } =
    useSetupSequence();
  const currentSequenceIndex = currentSequence.sequenceIndex;
  const currentSequenceName = currentSequence.sequence;
  const currentSequenceView = Object.keys(sequences[currentSequenceName])[
    currentSequenceIndex
  ];
  const sequenceKey = Object.keys(sequences);

  const { interactionsDisabled } = useSequence();
  const { getLanguageKey } = useLanguage();
  const { createDialog } = useDialog();
  const [data, setData] = useState<{
    title: string;
    description?: string;
    icon: FluentIconName;
  }>();

  function getCurrentSequenceKey(key: string) {
    const sequence = sequences[currentSequenceName][currentSequenceView];
    const sequenceHandler = sequence.handler;
    const sequenceDataKey = Array.of(sequenceHandler, key).join(".");
    return getLanguageKey(sequenceDataKey);
  }

  useEffect(() => {
    setData({
      title: getCurrentSequenceKey("title"),
      description: getCurrentSequenceKey("description"),
      icon: getCurrentSequenceKey("icon") as FluentIconName,
    });
  }, []);

  const handleForward = useCallback(() => {
    const sequence = sequences[currentSequenceName];

    if (currentSequenceIndex === Object.keys(sequence).length - 1) {
      const index = sequenceKey.indexOf(currentSequenceName);
      setCurrentSequence(sequenceKey[index + 1]);
    }

    if (sequenceKey.lastIndexOf(currentSequenceName) === 0) {
      createDialog({
        message: "Apply changes to the system?",
        type: "question",
        important: true,
      });
    }

    nextSequence();
  }, [
    sequences,
    currentSequenceName,
    currentSequenceIndex,
    sequenceKey,
    setCurrentSequence,
    createDialog,
    nextSequence,
  ]);

  return (
    <div className="absolute grid h-full w-full grid-cols-7 gap-5 px-5 pl-0">
      <div className="basis-lg col-span-3 grid h-full place-items-center">
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
          <FluentIconComponent
            fluentIcon={data?.icon}
            className="size-32 text-white"
          />
        </motion.div>
      </div>
      <div className="relative col-span-4 grid h-full w-full grid-rows-1 gap-4 py-5 text-zinc-900">
        <div className="space-y-3">
          <div className="rows-span-1 h-auto space-y-3 px-3 py-2">
            <p className="font-ginto-variable text-3xl font-medium text-black">
              {data?.title}
            </p>
            {data?.description && (
              <p className="text-md text-black">{data?.description}</p>
            )}
          </div>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              duration: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className={cn("h-[calc(100%-50px)] w-full overflow-y-auto", className)}
          >
            {children}
          </motion.div>
        </div>
        <div className="flex gap-3">
          {!interactionsDisabled && (
            <InteractionButton className="flex-1" onClick={handleForward}>
              <p>Continue</p>
              <ArrowRight20Filled className="arrow-icon" />
            </InteractionButton>
          )}
          {/* {flexEndButtons && (
            <p onClick={flexEndButtons.action}>{flexEndButtons.label}</p>
          )} */}
        </div>
      </div>
    </div>
  );
}
