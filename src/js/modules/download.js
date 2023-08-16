export default class Download {
  constructor(triggers) {
    this.btns = document.querySelectorAll(triggers);
    this.path = 'assets/img/mainbg.jpg';
  }

  downloadItem(path) {
    const element = document.createElement('a');
    element.setAttribute('href', path);
    element.setAttribute('download', 'nice_picture');
    
    element.style.display = 'none';
    document.body.appendChild(element);

    element.preventDefault();
    element.click();

    document.body.removeChild(element);
  }

  init() {
    this.btns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.downloadItem(this.path);
      });
    });
  }
}
