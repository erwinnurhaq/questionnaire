import { AnimatePresence, motion } from 'framer-motion';

const AnimateFade = ({ keyMotion, children }) => (
  <AnimatePresence exitBeforeEnter>
    <motion.div
      key={keyMotion}
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={{ hidden: { opacity: 0 }, enter: { opacity: 1 }, exit: { opacity: 0 } }}
      transition={{ duration: 0.4, type: 'tween', ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

const AnimateSlide = ({ keyMotion, isReversed, children }) => (
  <AnimatePresence exitBeforeEnter>
    <motion.div
      key={keyMotion}
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={{
        hidden: { opacity: 0, x: isReversed ? 20 : -30, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: isReversed ? -30 : 20, y: 0 },
      }}
      transition={{ duration: 0.4, type: 'tween', ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

const Animate = {
  Fade: AnimateFade,
  Slide: AnimateSlide,
};

export default Animate;
