import Slider from './slider';

export default class MainSlider extends Slider {
  constructor(container, btns, nexts, prevs) {
    super(container, btns);
    // this.paused = false;
  }

  showSlides(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }

    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    try {
      this.hanson.style.opacity = '0';

      if (n === 3) {
        this.hanson.classList.add('animated');
        setTimeout(() => {
          this.hanson.style.opacity = '1';
          this.hanson.classList.add('slideInUp');
        }, 3000);
      } else {
        this.hanson.classList.remove('slideInUp');
      }
    } catch (e) {}

    [...this.slides].forEach((slide) => {
      // slide.classList.add('animated');
      slide.style.display = 'none';
    });

    this.slides[this.slideIndex - 1].style.display = 'block';
  }

  plusSlides(n) {
    this.showSlides((this.slideIndex += n));
  }

  bindTriggers() {
    this.btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.plusSlides(1);
      });

      const mainLink = btn.parentNode.previousElementSibling;
      mainLink.addEventListener('click', (e) => {
        if (!mainLink.classList.contains('module__info-book')) {
          e.preventDefault();
          this.slideIndex = 1;
          this.showSlides(this.slideIndex);
        }
      });
    });

    this.nexts.forEach((next) => {
      next.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.plusSlides(1);
      });
    });

    this.prevs.forEach((prev) => {
      prev.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.plusSlides(-1);
      });
    });
  }

  /* // Автопролистывание слайдера
  activateAnimation() {
    this.paused = setInterval(() => {
      this.plusSlides(1);
      this.slides[this.slideIndex - 1].classList.add('slideInDown');
    }, 5000);
  }
  */

  render() {
    if (this.container) {
      try {
        this.hanson = document.querySelector('.hanson');
      } catch (e) {}
      this.showSlides(this.slideIndex);
      this.bindTriggers();

      /*// Автопролистывание слайдера
      this.activateAnimation();

      this.container.addEventListener('mouseenter', () => {
        clearInterval(this.paused);
      });

      this.container.addEventListener('mouseleave', () => {
        this.activateAnimation();
      });
      */
    }
  }
}
