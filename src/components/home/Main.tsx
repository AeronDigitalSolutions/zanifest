import React from "react";
import Carousel from "../ui/Carousal";
import carousalImage from "@/assets/home/carousal1.png";
import { div } from "framer-motion/client";

const images = [carousalImage, carousalImage, carousalImage];

function Main() {
  return <Carousel images={images} />;
}

export default Main;
