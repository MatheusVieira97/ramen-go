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
    const button = this.shadowRoot.querySelector('.rounded-button');
    button.innerText = this.text;
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
      cursor: pointer;
      width: 70%;
      height: 60px;
      border-radius: 80px;
      border-style: none;
      background-color: #1820EF;
      color: #FAFAED;
    }

    .disabled {
      background-color: #c5c5c5
    }
    `
  }
}

customElements.define("rmg-rounded-button", RoundedButton);
