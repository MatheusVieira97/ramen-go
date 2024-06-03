import CoverDeliveryHtmlContent from './Cover.html';

export default class Cover extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const template = document.createElement('template');
    template.innerHTML = `${CoverDeliveryHtmlContent}`;
    const style = document.createElement('style');
    style.textContent = this.createStyles();
    this.shadow.appendChild(style);
    this.shadow.appendChild(template.content);
  }

  createStyles() {
    return `
    .cover-delivery {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 4%;
    }

    .cover-delivery__circle {
      position: absolute;
      height: 26vh;
      width: 56vw;
      background-color: #730000;
      border-radius: 50%;
      margin-top: 5%;
    }

    .delivery-girl {
      width: 65vw;
      height: 30vh;
      z-index: 1;
    }

    .balloon {
      position: absolute;
    }

    .balloon-blue {
      top: 75px;
      left: 15%;
      width: 45px;
      height: 50px;
    }

    .balloon-yellow {
      top: 20%;
      right: 18%;
      width: 40px;
      height: 90px;
    }

    @media(min-width: 1800px) {
      .cover-delivery {
        margin-top: 5%;
        padding-left: 6%;
        overflow: hidden;
      }

      .cover-delivery__circle {
        height: 58vh;
        width: 30vw;
        margin-top: 2.5%;
      }

      .delivery-girl {
        max-width: 700px;
        max-heigth: 700px;
        width: 35%;
        height: auto;
      } 

      .balloon-blue {
        max-width: 120px;
        max-heigth: 130px;
        top: 10%;
        left: 40%;
        width: 130px;
        height: 140px;
      }

      .balloon-yellow {
        max-width: 120px;
        max-heigth: 250px;
        top: 39%;
        right: 26%;
        width: 140px;
        height: 280px;
      }
    }
    `
  }
}

customElements.define("rmg-cover", Cover);
