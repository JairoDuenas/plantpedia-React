import { motion } from "motion/react";

export const Skeleton = ({ className }) => {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.8,
      }}
      className={`bg-stone-200 dark:bg-stone-800 rounded-2xl ${className}`}
    />
  );
};
