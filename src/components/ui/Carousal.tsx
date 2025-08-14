// // import { useEffect, useRef, useState } from "react";
// // import { AnimatePresence, motion } from "framer-motion";
// // import Image from "next/image";
// // import styles from "@/styles/components/ui/Carousal.module.css";

// // interface CarouselProps {
// //   images: any[];
// // }

// // const Carousel: React.FC<CarouselProps> = ({ images }) => {
// //   const [current, setCurrent] = useState(0);
// //   const [direction, setDirection] = useState(0);
// //   const intervalRef = useRef<NodeJS.Timeout | null>(null);
// //   const carouselRef = useRef<HTMLDivElement | null>(null);
// //   const isHoveredRef = useRef(false);

// //   const startAutoSlide = () => {
// //     if (intervalRef.current) clearInterval(intervalRef.current);
// //     intervalRef.current = setInterval(() => {
// //       if (!isHoveredRef.current) {
// //         setDirection(1);
// //         setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
// //       }
// //     }, 3000);
// //   };

// //   const stopAutoSlide = () => {
// //     if (intervalRef.current) clearInterval(intervalRef.current);
// //   };

// //   const prevSlide = () => {
// //     setDirection(-1);
// //     setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
// //   };

// //   const nextSlide = () => {
// //     setDirection(1);
// //     setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
// //   };

// //   useEffect(() => {
// //     startAutoSlide();
// //     return () => stopAutoSlide();
// //   }, [images.length]);

// //   const handleMouseEnter = () => {
// //     isHoveredRef.current = true;
// //   };

// //   const handleMouseLeave = () => {
// //     isHoveredRef.current = false;
// //   };

// //   return (
// //     <div
// //       className={styles.carousel}
// //       ref={carouselRef}
// //       onMouseEnter={handleMouseEnter}
// //       onMouseLeave={handleMouseLeave}
// //     >
// //       <AnimatePresence initial={false} custom={direction} mode="popLayout">
// //         <motion.div
// //           key={current}
// //           className={styles.imageWrapper}
// //           custom={direction}
// //           initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
// //           animate={{ x: 0, opacity: 1 }}
// //           exit={{ x: direction < 0 ? 300 : -300, opacity: 0 }}
// //           transition={{ duration: 0.5, ease: "easeInOut" }}
// //         >
// //           <Image
// //             src={images[current]}
// //             alt={`Slide ${current}`}
// //             className={styles.image}
// //             priority
// //             fill
// //             sizes="100vw"
            
// //             // style={{ objectFit: "cover" }}
// //           />
// //         </motion.div>
// //       </AnimatePresence>

// //       <button
// //         onClick={prevSlide}
// //         className={`${styles.navButton} ${styles.left}`}
// //       >
// //         ◀
// //       </button>
// //       <button
// //         onClick={nextSlide}
// //         className={`${styles.navButton} ${styles.right}`}
// //       >
// //         ▶
// //       </button>
// //     </div>
// //   );
// // };

// // export default Carousel;


// import { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import Image from "next/image";
// import styles from "@/styles/components/ui/Carousal.module.css";

// interface CarouselProps {
//   images: any[];
// }

// const Carousel: React.FC<CarouselProps> = ({ images }) => {
//   const [current, setCurrent] = useState(0);
  

//   const prevSlide = () => {
//     setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   };

//   const nextSlide = () => {
//     setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//   };

//   return (
//     <>
//       <div className={styles.carousel}>
//         <div key={current} className={styles.imageWrapper}>
//           <Image
//             src={images[current]}
//             alt={`Slide ${current}`}
//             className={styles.image}
//           />
//         </div>

//         <button
//           onClick={prevSlide}
//           className={`${styles.navButton} ${styles.left}`}
//         >
//           ◀
//         </button>
//         <button
//           onClick={nextSlide}
//           className={`${styles.navButton} ${styles.right}`}
//         >
//           ▶
//         </button>
//       </div>
//     </>
//   );
// };

// export default Carousel;
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import styles from "@/styles/components/ui/Carousal.module.css";

interface CarouselProps {
  images: any[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isHoveredRef.current) {
        setDirection(1);
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [images.length]);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
  };

  return (
    <div
      className={styles.carousel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // style={{ height: `calc(100vh - ${headerHeight}px)` }}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          className={styles.imageWrapper}
          custom={direction}
          initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction < 0 ? 300 : -300, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Image
            src={images[current]}
            alt={`Slide ${current}`}
            className={styles.image}
            priority
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className={`${styles.navButton} ${styles.left}`}
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className={`${styles.navButton} ${styles.right}`}
      >
        ▶
      </button>

      <div className={styles.indicators}>
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.dot} ${idx === current ? styles.activeDot : ""}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
