"use client";
import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useAnimation,
  transform,
  animate,
} from "framer-motion";
const RevealScroll = ({ children, delay = 0.25 }) => {
  // const ref = useRef(null);
  const ref2 = useRef(null);
  // const isInView = useInView(ref, { once: true });
  const isInView2 = useInView(ref2, { once: true });

  // const mainControl = useAnimation();
  const mainControl2 = useAnimation();

  // useEffect(() => {
  //   if (isInView) {
  //     mainControl.start("visible");
  //   }
  // }, [isInView]);
  useEffect(() => {
    if (isInView2) {
      mainControl2.start("then");
    }
  }, [isInView2]);
  return (
    <>
      {/* <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControl}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div> */}

      <motion.div
        ref={ref2}
        variants={{
          first: { scale: 0, opacity: 0, y: 100 },
          then: { scale: 1, opacity: 1, y: 0 },
        }}
        initial="first"
        animate={mainControl2}
        transition={{ duration: 0.45, delay: delay }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default RevealScroll;
