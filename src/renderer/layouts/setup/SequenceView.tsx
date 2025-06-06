import React from "react";
import { motion } from "framer-motion";
import { ArrowRight20Filled } from "@fluentui/react-icons";
import { ScrollArea } from "@r/components/shadcn-ui/ScrollArea";
import { cn } from "@r/utils";
import {
  useSetupSequence,
  useSequence,
  useDialog,
  useLanguage,
} from "@r/hooks";
import { type FluentIconName } from "@/renderer/types";
import FluentIconComponent from "@/renderer/components/FluentIconComponent";

interface SequenceViewProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SequenceView({
  children,
  className,
}: SequenceViewProps) {
  const { sequences, setCurrentSequence, nextSequence, currentSequence } =
    useSetupSequence();
  const { scrollDisabled, interactionsDisabled } = useSequence();
  const { getLanguageKey } = useLanguage();
  const { createDialog } = useDialog();
  const currentSequenceIndex = currentSequence.sequenceIndex;
  const currentSequenceName = Object.keys(sequences[currentSequence.sequence])[
    currentSequenceIndex
  ];
  const sequenceKey = Object.keys(sequences);

  function getCurrentSequenceKey(key: string) {
    const sequence = sequences[currentSequence.sequence][currentSequenceName];
    const sequenceHandler = sequence.handler as string;
    const sequenceDataKey = Array.of(sequenceHandler, key).join(".");
    return getLanguageKey(sequenceDataKey);
  }

  const data = {
    title: getCurrentSequenceKey("title"),
    description: getCurrentSequenceKey("description"),
    icon: getCurrentSequenceKey("icon") as FluentIconName,
  };

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

  function handleForward() {
    const sequence = sequences[currentSequenceName];

    if (currentSequenceIndex === Object.keys(sequence).length - 1) {
      const index = sequenceKey.indexOf(currentSequenceName);
      setCurrentSequence(sequences[index + 1]);
    }

    if (sequenceKey.lastIndexOf(currentSequenceName) === 0) {
      createDialog({
        message: "Apply changes to the system?",
        type: "question",
        important: true,
      });
    }

    nextSequence();
  }

  return (
    <div className="absolute grid h-full w-full grid-cols-[350px_auto]">
      <div className="basis-lg grid h-full place-items-center space-y-5 px-2 py-8">
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
            fluentIcon={data.icon}
            className="size-28 text-white"
          />
        </motion.div>
      </div>
      <div className="relative flex h-full w-full flex-col justify-between space-y-4 text-zinc-900">
        <p className="text-5xl font-normal text-black">{data.title}</p>
        {data.description && (
          <p className="text-md text-black">{data.description}</p>
        )}
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
              // disabled={forwardDisabled}
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
}
