import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import styles from "@/styles/components/ui/Carousal.module.css";

interface CarouselProps {
  images: any[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className={styles.carousel}>
        <div key={current} className={styles.imageWrapper}>
          <Image
            src={images[current]}
            alt={`Slide ${current}`}
            className={styles.image}
          />
        </div>

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
      </div>
    </>
  );
};

export default Carousel;
