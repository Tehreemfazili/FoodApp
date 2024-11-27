'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import classes from "@/styles/ImageSlideshow.module.css";
import { absoluteUrlCustom } from "@/lib/utils";

interface SlideshowImage {
  image: string;
  alt: string;
}

interface ImageSlideshowProps {
  images: SlideshowImage[];
}

export default function ImageSlideshow({ images }: ImageSlideshowProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  console.log(images)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={classes.slideshow}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={absoluteUrlCustom(image.image)}
          alt={image.alt}
          className={index === currentImageIndex ? classes.active : ""}
          width={240}
          height={240}
        />
      ))}
    </div>
  );
}
