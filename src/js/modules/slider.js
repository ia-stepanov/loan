export default class Slider {
  constructor(page, btns) {
    this.page = document.querySelector(page);
    this.slides = this.page.children;
    this.btns = document.querySelectorAll(btns);
    this.slideIndex = 1;
    this.paused = false;
  }

  showSlides(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }

    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    [...this.slides].forEach((slide) => {
      // slide.classList.add('animated');
      slide.style.display = 'none';
    });

    this.slides[this.slideIndex - 1].style.display = 'block';
  }

  plusSlides(n) {
    this.showSlides((this.slideIndex += n));
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
    this.btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.plusSlides(1);
        // this.slides[this.slideIndex - 1].classList.add('slideInDown');
      });

      btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });

    this.showSlides(this.slideIndex);

    /*// Автопролистывание слайдера
    this.activateAnimation();

    this.page.parentNode.addEventListener('mouseenter', () => {
      clearInterval(this.paused);
    });

    this.page.parentNode.addEventListener('mouseleave', () => {
      this.activateAnimation();
    });
    */
  }
}