import { motion } from "framer-motion";
import LoadingBackground from "@r/assets/videos/loading-background.mp4";
import { useContext } from "react";
import { SetupLayoutContext } from "@/renderer/contexts/SetupLayoutContext";

export default function SetupBackground() {
  const setupLayoutContext = useContext(SetupLayoutContext);
  const backgroundWidth = setupLayoutContext?.backgroundWidth;

  return (
    <motion.video
      className="h-full rounded-[10px] object-cover"
      style={{
        width: backgroundWidth,
      }}
      autoPlay
      loop
      muted
    >
      <source src={LoadingBackground} type="video/mp4" />
    </motion.video>
  );
}
