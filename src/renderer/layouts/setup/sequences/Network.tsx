import { Wifi1Regular } from "@fluentui/react-icons";
import { motion } from "framer-motion";
import SequenceView from "../SequenceView";

export function Network() {
  return (
    <SequenceView id="wifi" className="grid gap-2">
      <motion.button
        whileTap={{ scale: ".97" }}
        transition={{
          duration: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="button flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Wifi1Regular className="h-6 w-6 text-inherit" />
          <p className="font-semibold">334</p>
        </div>
      </motion.button>
      <button className="button flex items-center space-x-2">
        <p className="font-semibold">Connect to Hidden Network...</p>
      </button>
    </SequenceView>
  );
}
