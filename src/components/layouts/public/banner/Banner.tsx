'use client';

import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { Pagination, Autoplay, EffectFade } from 'swiper/modules';

import Image from 'next/image';

const slides = [
  {
    id: 1,
    image: '/images/banner1.jpg',
  },
  {
    id: 2,
    image: '/images/banner2.jpg',
  },
  {
    id: 3,
    image: '/images/banner3.jpg',
  },
  {
    id: 4,
    image: '/images/banner4.jpg',
  },
];

const swiperModules = [Pagination, Autoplay, EffectFade];

const Banner = () => {
  return (
    <section className="w-full bg-white">
      <div className="w-full max-w-[1920px] mx-auto">
        {/* ================= MOBILE ================= */}
        <div className="block sm:hidden">
          <Swiper
            modules={swiperModules}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            effect="fade"
            fadeEffect={{
              crossFade: true,
            }}
            loop
            className="w-full"
          >
            {slides.slice(0, 2).map(slide => (
              <SwiperSlide key={slide.id}>
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <Image
                    src={slide.image}
                    alt={`Banner ${slide.id}`}
                    fill
                    priority={slide.id === 1}
                    sizes="100vw"
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ================= TABLET + DESKTOP ================= */}
        <div className="hidden sm:block">
          <Swiper
            modules={swiperModules}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            effect="fade"
            fadeEffect={{
              crossFade: true,
            }}
            loop
            className="w-full"
          >
            {slides.map(slide => (
              <SwiperSlide key={slide.id}>
                <div className="relative w-full aspect-[16/7] lg:aspect-[16/6] overflow-hidden">
                  <Image
                    src={slide.image}
                    alt={`Banner ${slide.id}`}
                    fill
                    priority={slide.id === 1}
                    sizes="100vw"
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Banner;
