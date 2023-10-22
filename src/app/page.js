'use client';
import { useTransform, useScroll, motion } from 'framer-motion';
import Image from 'next/image';
import styles from './page.module.scss';
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { useDimension } from '@/hooks/useDimension';

const images = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg',
  '9.jpg',
  '10.jpg',
  '11.jpg',
  '12.jpg',
];

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const { height } = useDimension();

  //   scrollYProgress.onChange((latest) => console.log(latest));

  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.spacer} />
      <div ref={ref} className={styles.gallery}>
        <Column images={[images.at(0), images.at(1), images.at(2)]} y={y} />
        <Column images={[images.at(3), images.at(4), images.at(5)]} y={y2} />
        <Column images={[images.at(6), images.at(7), images.at(8)]} y={y3} />
        <Column images={[images.at(9), images.at(10), images.at(11)]} y={y4} />
      </div>
      <div className={styles.spacer} />
    </main>
  );
}

function Column({ images, y = 0 }) {
  return (
    <motion.div className={styles.column} style={{ y }}>
      {images.map((src, index) => {
        return (
          <div key={index} className={styles.imageContainer}>
            <Image src={`/images/${src}`} fill alt="image" />
          </div>
        );
      })}
    </motion.div>
  );
}
