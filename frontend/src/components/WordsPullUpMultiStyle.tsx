import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export interface TextSegment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: TextSegment[];
  className?: string;
  delay?: number;
}

export const WordsPullUpMultiStyle: React.FC<WordsPullUpMultiStyleProps> = ({
  segments,
  className = '',
  delay = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  // Flatten segments into individual words while preserving segment className
  const wordTokens: { word: string; className?: string; globalIndex: number }[] = [];
  let counter = 0;

  segments.forEach((segment) => {
    const rawWords = segment.text.trim().split(/\s+/);
    rawWords.forEach((w) => {
      if (w.length > 0) {
        wordTokens.push({
          word: w,
          className: segment.className,
          globalIndex: counter++,
        });
      }
    });
  });

  return (
    <div
      ref={containerRef}
      className={`inline-flex flex-wrap justify-center items-center ${className}`}
    >
      {wordTokens.map((item) => (
        <span
          key={`${item.word}-${item.globalIndex}`}
          className={`inline-block mr-[0.28em] last:mr-0 ${item.className || ''}`}
        >
          <motion.span
            className="inline-block"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: delay + item.globalIndex * 0.08,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
          >
            {item.word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};
