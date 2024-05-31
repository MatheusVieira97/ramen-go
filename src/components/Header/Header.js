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
      h1 {
        color: red;
      }
      div {
        background-color: blue;
      }
      p {
        color: blue;
      }`
  }
}

customElements.define("rmg-header", Header);
