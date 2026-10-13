import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  delay?: number;
}

export const WordsPullUp: React.FC<WordsPullUpProps> = ({
  text,
  className = '',
  showAsterisk = false,
  delay = 0,
}) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const words = text.split(' ');

  return (
    <h1 ref={ref} className={`inline-flex flex-wrap items-baseline ${className}`}>
      {words.map((word, index) => {
        const isLastWord = index === words.length - 1;

        return (
          <span
            key={`${word}-${index}`}
            className="inline-block relative mr-[0.25em] last:mr-0 overflow-visible"
          >
            <motion.span
              className="inline-block"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: delay + index * 0.08,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
            >
              {word}
              {showAsterisk && isLastWord && (
                <span
                  className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] font-light leading-none select-none text-primary"
                  aria-hidden="true"
                >
                  *
                </span>
              )}
            </motion.span>
          </span>
        );
      })}
    </h1>
  );
};
