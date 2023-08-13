import Slider from './slider';

export default class MiniSlider extends Slider {
  constructor(container, next, prev, activeClass, animate, autoplay) {
    super(container, next, prev, activeClass, animate, autoplay);
  }

  decorizeSlides() {
    [...this.slides].forEach((slide) => {
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        slide.querySelector('.card__title').style.opacity = '0.4';
        slide.querySelector('.card__controls-arrow').style.opacity = '0';
      }
    });

    this.slides[0].classList.add(this.activeClass);
    if (this.animate) {
      this.slides[0].querySelector('.card__title').style.opacity = '1';
      this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
    }
  }

  nextSlide() {
    const lastElement = this.slides[this.slides.length - 2];

    lastElement.tagName === 'BUTTON'
      ? this.container.insertBefore(this.slides[0], lastElement)
      : this.container.appendChild(this.slides[0]);

    this.decorizeSlides();
  }

  bindTriggers() {
    this.next.addEventListener('click', () => this.nextSlide());

    this.prev.addEventListener('click', () => {
      const lastElement = this.slides[this.slides.length - 2];

      let active =
        lastElement.tagName === 'BUTTON'
          ? this.slides[this.slides.length - 3]
          : this.slides[this.slides.length - 1];

      this.container.insertBefore(active, this.slides[0]);
      this.decorizeSlides();
    });
  }

  activateAnimation() {
    this.paused = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  init() {
    try {
      this.container.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        align-items: flex-start;
      `;

      this.bindTriggers();
      this.decorizeSlides();

      if (this.autoplay) {
        this.activateAnimation();
      }

      this.container.addEventListener('mouseenter', () => {
        clearInterval(this.paused);
      });

      this.container.addEventListener('mouseleave', () => {
        this.activateAnimation();
      });
    } catch (e) {}
  }
}
