import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

export const initSwiper = () => {
  new Swiper('.js-gallery-object-swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 4,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    speed: 800,
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
    },
    a11y: {
      enabled: false,
    },
    breakpoints: {
      450: {
        slidesPerView: 2,
      },
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
      pageUpDown: true
    },
  });

  new Swiper('.js-gallery-cases-swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 16,
    autoplay: {
      delay: 1000,
    },
    loop: true,
    speed: 800,
    a11y: {
      enabled: false,
    },
    breakpoints: {
      320: {
        slidesPerView: 1.2,
      },
      657: {
        slidesPerView: 2.5,
      },
      900: {
        slidesPerView: 3.3,
      },
      1200: {
        slidesPerView: 3.5,
      },
      1469: {
        slidesPerView: 4.3,
      },
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
      pageUpDown: true
    },
  });
};
