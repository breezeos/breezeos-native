import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as FluentIcons from "@fluentui/react-icons";
import * as FluentIconsType from "@r/lib/fluentIcons";
import { ScrollArea } from "./shadcn-ui/ScrollArea";
import {cn} from "@r/lib/utils";
import useSetupSequence from "@r/hooks/useSetupSequence";
import useSequence from "@r/hooks/useSequence";
import useDialog from "@r/hooks/useDialog";
import useGlobalVariable from "@r/hooks/useGlobalVariable";
import useLanguage from "@r/hooks/useLanguage";

type FluentIconName = keyof typeof FluentIconsType;

function getFluentIcon(
  fluentIcon: FluentIconName,
  props?: React.SVGProps<SVGSVGElement>,
) {
  const FluentIcon = FluentIcons[fluentIcon] as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  return <FluentIcon {...props} />;
}

interface SequenceViewProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SequenceView({
  children,
  className,
}: SequenceViewProps) {
  const { setCurrentSequence, nextSequence, currentSequence } =
    useSetupSequence();
  const { scrollDisabled, interactionsDisabled } = useSequence();
  const { getLanguageKey } = useLanguage();
  const { createDialog } = useDialog();
  const { getVariable } = useGlobalVariable();
  const [data, setData] = useState<{
    title: string;
    description?: string;
    icon: FluentIconName;
  }>({
    title: "",
    icon: "GlobeRegular",
  });

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

  const currentSequenceName = currentSequence.sequence;
  const currentSequenceIndex = currentSequence.sequenceIndex;

  async function getCurrentSequenceKey(key: string) {
    const sequences = (await getVariable("setupSequence")) as Record<
      string,
      any
    >;
    const sequence = sequences[currentSequenceName][currentSequenceIndex];
    const keySeparator = ".";
    const sequenceHandler = sequence.handler as string;
    const sequenceDataKey = Array.of(sequenceHandler, key).join(keySeparator);
    const sequenceData = await getLanguageKey(sequenceDataKey);
    return sequenceData;
  }

  async function syncData() {
    const title = await getCurrentSequenceKey("title");
    const description = await getCurrentSequenceKey("description");
    const icon = (await getCurrentSequenceKey("icon")) as FluentIconName;
    setData({ title, description, icon });
  }

  async function handleForward() {
    const sequences = (await getVariable("setupSequence")) as Record<
      string,
      any
    >;
    const sequence = sequences[currentSequenceName];
    const sequencesKey = Object.keys(sequences);

    if (currentSequenceIndex === Object.keys(sequence).length - 1) {
      const index = sequencesKey.indexOf(currentSequenceName);
      setCurrentSequence(sequences[index + 1]);
    }

    if (sequencesKey.indexOf(currentSequenceName) === sequencesKey.length - 1) {
      createDialog({
        message: "Apply changes to the system?",
        type: "question",
        important: true,
      });
    }

    nextSequence();
  }

  useEffect(() => {
    syncData();
  }, []);

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
          {getFluentIcon(data.icon, { className: "size-28 text-white" })}
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
        <p className="text-3xl font-medium text-black">{data.title}</p>
        {data.description && (
          <p className="text-md font-medium text-black">{data.description}</p>
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
              <FluentIcons.ArrowRight20Filled className="text-white" />
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
