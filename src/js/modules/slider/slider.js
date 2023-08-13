export default class Slider {
  constructor({
    container = null,
    btns = null,
    next = null,
    prev = null,
    nexts = null,
    prevs = null,
    activeClass = '',
    animate,
    autoplay,
  } = {}) {
    this.container = document.querySelector(container);
    try {
      this.slides = this.container.children;
    } catch (e) {}
    this.btns = document.querySelectorAll(btns);
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.nexts = document.querySelectorAll(nexts);
    this.prevs = document.querySelectorAll(prevs);
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoplay = autoplay;
    this.slideIndex = 1;
  }
}
