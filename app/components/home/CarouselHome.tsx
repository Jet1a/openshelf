"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import bannerPaths from "@/data/bannerPath";

const CarouselHome = () => {
  const plugin = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  );

  return (
    <Carousel plugins={[plugin.current]} opts={{ align: "center", loop: true }}>
      <CarouselContent className="flex w-full h-full">
        {bannerPaths.map((path, index) => (
          <CarouselItem
            key={index}
            className="relative flex items-center justify-center "
          >
            <Link href={`/discover`}>
              <div className="flex items-center justify-center w-[520px] h-[300px]">
                <Image
                  src={path}
                  alt="carousel image"
                  fill
                  className="w-full transition-transform transform hover:opacity-90"
                  priority={true}
                />
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-8 top-1/2 transform -translate-y-1/2 opacity-80" />
      <CarouselNext className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-80" />
    </Carousel>
  );
};

export default CarouselHome;
