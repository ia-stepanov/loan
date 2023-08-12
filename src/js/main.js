import Slider from './modules/slider';
import VideoPlayer from './modules/playVideo';


window.addEventListener('DOMContentLoaded', () => {
  const slider = new Slider('.page', '.next');
  const player = new VideoPlayer('.showup .play', '.overlay');
  
  slider.render();
  player.init();
});
