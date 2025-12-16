import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * TypewriterText Component
 *
 * Reusable component that types out text character by character.
 *
 * Logic:
 * 1. Uses `useInView` to detect when the text is visible on screen.
 * 2. When in view, sets `isVisible` to true, triggering the animation.
 * 3. When out of view, sets `isVisible` to false, resetting the text to hidden.
 *    This ensures the effect runs again when the user comes back.
 * 4. Accepts `repeatInterval` to restart animation periodically while staying in view.
 */
interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number; // Optional initial delay
  speed?: number; // Optional typing speed per character
  repeatInterval?: number; // Optional: restart animation every X ms if in view
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  className = "",
  delay = 0,
  speed = 0.01,
  repeatInterval,
}) => {
  const ref = useRef(null);

  // Monitors if the element is in the viewport.
  // `amount: 0.3` means 30% of the element must be visible to trigger.
  // `once: false` ensures it updates every time enter/exit happens.
  const isInView = useInView(ref, { amount: 0.3, once: false });

  const [isVisible, setIsVisible] = useState(false);
  const [triggerKey, setTriggerKey] = useState(0);

  // Handle enter/exit view logic
  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
      setTriggerKey((prev) => prev + 1); // Trigger animation start
    } else {
      setIsVisible(false);
    }
  }, [isInView]);

  // Handle repeat interval logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isInView && repeatInterval && repeatInterval > 0) {
      interval = setInterval(() => {
        setTriggerKey((prev) => prev + 1); // Re-trigger animation
      }, repeatInterval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isInView, repeatInterval]);

  // Split text into characters for individual animation
  const characters = text.split("");

  return (
    <span ref={ref} className={className}>
      {isVisible ? (
        // Wrapper with key ensures specific children remount on triggerKey change
        characters.map((char, index) => (
          <motion.span
            key={`${triggerKey}-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.1,
              delay: delay + index * speed,
              ease: "easeOut",
            }}
          >
            {char}
          </motion.span>
        ))
      ) : (
        // Render invisible text to maintain layout height/width when not animating
        <span className="opacity-0">{text}</span>
      )}
    </span>
  );
};
