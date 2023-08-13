export default class Form {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll('input');
    this.message = {
      loading: 'Загрузка…',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так…',
    };
    this.path = 'assets/question.php';
  }

  clearInputs() {
    this.inputs.forEach((item) => {
      item.value = '';
    });
  }

  checkTextInputs() {
    const mailInputs = document.querySelectorAll('[type="email"]');

    mailInputs.forEach((input) => {
      const regExp = /[^a-z 0-9 @ \.]/gi;

      input.addEventListener('input', function (e) {
        if (this.value.match(regExp)) {
          this.value = this.value.replace(regExp, '');
        }
      });
    });
  }

  initMask() {
    let setCursorPosition = (pos, elem) => {
      elem.focus();

      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();

        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    };

    function createMask(event) {
      let matrix = '+1 (___) ___-____';
      let i = 0;
      let def = matrix.replace(/\D/g, '');
      let val = this.value.replace(/\D/g, '');

      if (def.length >= val.length) {
        val = def;
      }

      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length
          ? val.charAt(i++)
          : i >= val.length
          ? ''
          : a;
      });

      if (event.type === 'blur') {
        if (this.value.length === 2) {
          this.value = '';
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }

    let inputs = document.querySelectorAll('[name="phone"]');

    inputs.forEach((input) => {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
    });
  }

  async postData(url, data) {
    let res = await fetch(url, {
      method: 'POST',
      body: data,
    });

    return await res.text();
  }

  init() {
    this.checkTextInputs();
    this.initMask();
    this.forms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('div');
        statusMessage.classList.add('animated', 'fadeInUp');
        statusMessage.style.cssText = `
          margin-top: 16px;
          font-size: 18px;
          color: white;
        `;
        form.parentNode.appendChild(statusMessage);
        statusMessage.textContent = this.message.loading;

        const formData = new FormData(form);
        this.postData(this.path, formData)
          .then((res) => {
            console.log(res);
            statusMessage.textContent = this.message.success;
          })
          .catch(() => {
            statusMessage.textContent = this.message.failure;
          })
          .finally(() => {
            this.clearInputs();
            setTimeout(() => {
              statusMessage.remove();
            }, 6000);
          });
      });
    });
  }
}
