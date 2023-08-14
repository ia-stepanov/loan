import MainSlider from './modules/slider/slider-main';
import MiniSlider from './modules/slider/slider-mini';
import VideoPlayer from './modules/playVideo';
import Difference from './modules/difference';
import Form from './modules/forms';

window.addEventListener('DOMContentLoaded', () => {
  const slider = new MainSlider({ container: '.page', btns: '.next' });
  const modulePageSlider = new MainSlider({
    container: '.moduleapp',
    btns: '.next',
    nexts: '.nextmodule',
    prevs: '.prevmodule',
  });
  const showUpSlider = new MiniSlider({
    container: '.showup__content-slider',
    next: '.showup__next',
    prev: '.showup__prev',
    activeClass: 'card-active',
    animate: true,
  });

  const moduleSlider = new MiniSlider({
    container: '.modules__content-slider',
    next: '.modules__info-btns .slick-next',
    prev: '.modules__info-btns .slick-prev',
    activeClass: 'card-active',
    animate: true,
    autoplay: true,
  });

  const feedSlider = new MiniSlider({
    container: '.feed__slider',
    next: '.feed__slider .slick-next',
    prev: '.feed__slider .slick-prev',
    activeClass: 'feed__item-active',
  });

  const mainPlayer = new VideoPlayer('.showup .play', '.overlay');
  const modulePlayer = new VideoPlayer('.module__video-item .play', '.overlay');
  const difference = new Difference('.officerold', '.officernew', '.officer__card-item');
  const form = new Form('.form');

  slider.render();
  modulePageSlider.render();
  showUpSlider.init();
  moduleSlider.init();
  feedSlider.init();
  mainPlayer.init();
  modulePlayer.init();
  difference.init();
  form.init();
});
