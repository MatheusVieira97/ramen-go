import LogoYellow from '../../assets/images/logo-yellow.png';
import HeaderHtmlContent from './Header.html';
export default class Header extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
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
      padding-top: 5%;

      img {
        content: url(${LogoYellow})
      }
    }
    `
  }
}

customElements.define("rmg-header", Header);
