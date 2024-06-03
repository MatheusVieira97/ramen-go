import Cover from '../Cover/Cover.js';
import Header from '../Header/Header.js';
import RoundedButton from '../RoundedButton/RoundedButton.js';
import WelcomeBannerHtmlContent from './WelcomeBanner.html';

import bannerRedPattern from '../../assets/images/pattern-red.svg';

export default class WelcomeBanner extends HTMLElement {
  constructor() {
    super();
    this.createElement();
    this.components = {
        Header,
        Cover,
        RoundedButton
    }
  }

  createElement() {
    this.shadow = this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `${WelcomeBannerHtmlContent}`;
    const style = document.createElement('style');
    style.textContent = this.createStyles();
    this.shadow.appendChild(style);
    this.shadow.appendChild(template.content);
  }
  
  connectedCallback() {
    this.adjustButton()
  }

  adjustButton() {
    const button = this.shadowRoot.querySelector('rmg-rounded-button').shadowRoot;
    const container = button.querySelector('.button-container');
    container.classList.add('centralize-left')
    button.addEventListener('click', this.redirect)
  }

  redirect() {
    document.getElementById('broths').scrollIntoView();
  }

  createStyles() {
    return `
    .banner {
      height: 75vh;
      background-image: url('${bannerRedPattern}');
      background-size: contain;
    }

    .banner__text {
      display: flex;
      align-items: center;
      flex-direction: column;
      color: white;

      h2 { 
        font-size: 3em;
        margin: 0;
        color: #FFC024;
      }

      h3 {
        font-size: 7em;
        padding: 0;
        margin: 0;
        line-height: 1em;
      }

      p {
        text-align: center;
        width: 80%;
        font-family: 'Mplus-Medium'
      }
    }

    @media(min-width: 1100px) {
      .banner {
        height: 100vh;
      }

      .banner__text {
        align-items: baseline;
        z-index: 1;
        position: absolute;
        top: 28%;
        left: 19%;
        padding-left: 7%;
        overflow: hidden;

        .tittle {
          display: flex;
          align-items: baseline;
        }

        h2 {
          font-size: 4em;
          writing-mode: vertical-lr
        }

        h3 {
          font-size: 11em;
        }

        p {
          width: 25%;
          text-align: left;
          padding-left: 3%;
          font-size: 1.1em;
          margin: 0;
        }
      }
    }
    `
  }
}

customElements.define("rmg-welcome-banner", WelcomeBanner);
