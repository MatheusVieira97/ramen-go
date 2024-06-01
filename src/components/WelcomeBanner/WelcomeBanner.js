import Cover from '../Cover/Cover.js';
import Header from '../Header/Header.js';
import WelcomeBannerHtmlContent from './WelcomeBanner.html';

import bannerRedPattern from '../../assets/images/pattern-red.svg';

export default class WelcomeBanner extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.components = {
        Header,
        Cover
    }
  }

  connectedCallback() {
    const template = document.createElement('template');
    template.innerHTML = `${WelcomeBannerHtmlContent}`;
    const style = document.createElement('style');
    style.textContent = this.createStyles();
    this.shadow.appendChild(style);
    this.shadow.appendChild(template.content);
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
    `
  }
}

customElements.define("rmg-welcome-banner", WelcomeBanner);
