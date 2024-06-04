import RoundedButtonHTMLTemplate from './RoundedButton.html';
export default class RoundedButton extends HTMLElement {
  constructor() {
    super();
    this.createElement();
  }

  static get observedAttributes() {
    return ['text'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.text = name === 'text' ? newValue : '';
    this.updateTextInHtml()
  }

  updateTextInHtml() {
    const span = this.shadowRoot.querySelector('.span-text');
    span.innerText = this.text;
  }

  createElement() {
    this.shadow = this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `${RoundedButtonHTMLTemplate}`;
    const style = document.createElement('style');
    style.textContent = this.createStyles();
    this.shadow.appendChild(style);
    this.shadow.appendChild(template.content);
  }

  createStyles() {
    return `
    .button-container {
      display: flex;
      justify-content: center;
      padding: 10%;
    }

    .rounded-button {
      display: flex;
      align-items: center;
      justify-content: center;

      cursor: pointer;
      min-width: 160px;
      height: 60px;
      border-radius: 80px;
      border-style: none;
      background-color: #1820EF;
      color: #FAFAED;
    }

    .disabled {
      background-color: #c5c5c5
    }

    .centralize-left {
      justify-content: left;
      display: none;
    }

    .arrow-icon {
      width: 26px;
      height: 26px;
      padding-left: 8px;
    }

    @media(min-width: 1100px){
      .button-container {
        padding: 0 0 2% 0;
      }

      .centralize-left {
        display: block;
        margin: 3% 0 0 20%;
      }
    }
    `
  }
}

customElements.define("rmg-rounded-button", RoundedButton);
