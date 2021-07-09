class Menu {
  constructor(menu) {
    let menuBlock = document.querySelector(menu);
    this.iconMenu = menuBlock.querySelector(".menu__icon");
    this.listMenu = menuBlock.querySelector(".menu__navigation");
    if (!!this.iconMenu) {
      this.iconMenu.addEventListener("click", () => {
        this.iconMenu.classList.toggle("_active");
        this.listMenu.classList.toggle("_active");
      });
    }
  }
}

class Slider {
  constructor(slider, header) {
    let sliderBlock = document.querySelector(slider);
    this.header = document.querySelector(header);
    this.sliders = sliderBlock.querySelectorAll(".slider__item");

    sliderBlock.addEventListener("click", (e) => this.changeSlider(e));
  }

  slideNumber(target) {
    if (target.classList.contains("slider__item--one")) return 1;
    if (target.classList.contains("slider__item--two")) return 2;
    if (target.classList.contains("slider__item--three")) return 3;

    return -1;
  }

  changeSlider(e) {
    this.sliders.forEach((s) => {
      s.classList.remove("slider__item--active");
    });
    const target = e.target;
    if (target.classList.contains("slider__item")) {
      target.classList.add("slider__item--active");
      const slide = this.slideNumber(target);
      switch (slide) {
        case 1:
          this.header.style.backgroundImage = `url("img/mainpage-background-1.jpg"`;
          break;
        case 2:
          this.header.style.backgroundImage = `url("img/mainpage-background-2.jpg"`;
          break;
        case 3:
          this.header.style.backgroundImage = `url("img/mainpage-background-3.jpg"`;
          break;
        default:
          break;
      }
    }
  }
}

let menu = new Menu(".menu");
let slider = new Slider(".slider", ".page-header");
