import MainSlider from './modules/slider/slider-main';
import VideoPlayer from './modules/playVideo';

window.addEventListener('DOMContentLoaded', () => {
  const slider = new MainSlider({ page: '.page', btns: '.next' });
  const player = new VideoPlayer('.showup .play', '.overlay');

  slider.render();
  player.init();
});
