import LogoRed from '../../assets/images/logo-red.png';
import LogoYellow from '../../assets/images/logo-yellow.png';
import HeaderHtmlContent from './Header.html';
export default class Header extends HTMLElement {
  constructor() {
    super();
    this.createElement();
  }

  static get observedAttributes() {
    return ['color'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.color = name === 'color' ? newValue : '';
    this.updateColor();
  }

  updateColor() {
    this.shadowRoot.querySelector('header').classList.add('yellow');
  }


  createElement() {
    this.shadow = this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `${HeaderHtmlContent}`;
    const style = document.createElement('style');
    style.textContent = this.createStyles();
    this.shadow.appendChild(style);
    this.shadow.appendChild(template.content);
  }

  createStyles() {
    return `
    header {
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 0;
      padding-top: 15%;

      img {
        content: url(${LogoRed})
      } 
    }

    .yellow {
      padding-top: 5%;
      img {
        content: url(${LogoYellow})
      }
    }
    `
  }
}

customElements.define("rmg-header", Header);
