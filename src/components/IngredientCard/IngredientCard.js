import IngredientCardHtmlContent from './IngredientCard.html';
export default class IngredientCard extends HTMLElement {
    ingredient = null;
    selected = false;

    constructor() {
        super();
        this.createElement();
    }

    static get observedAttributes() {
        return ['item', 'selected'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case 'item': {
                this.ingredient = name === 'item' ? JSON.parse(newValue) : this.ingredient;
                this.createIngredientCard(this.ingredient);
                break;
            }
            case 'selected': {
                this.selected = !this.selected
                this.updateState();
                break;
            }
        }
    }

    updateState() {
        this.updateImage();
        this.updateTittle();
        this.updatePrice();
        this.updateCard();
    }

    updateImage() {
        const image =this.shadowRoot.querySelector('img');
        image.src = this.selected ? this.ingredient.imageActive : this.ingredient.imageInactive;
    }

    updateTittle() {
        const tittle = this.shadowRoot.querySelector('.ingredient-tittle');
        this.selected ? tittle.classList.add('selected') : tittle.classList.remove('selected')
    }

    updatePrice() {
        const price = this.shadowRoot.querySelector('.ingrediente-value');
        this.selected ? price.classList.add('price-selected') : price.classList.remove('price-selected')
    }

    updateCard() {
        const container = this.shadowRoot.querySelector('.ingredient-card');
        this.selected ? container.classList.add('selected') : container.classList.remove('selected')
    }


    createIngredientCard(ingredient) {
        this.card = this.shadowRoot.querySelector('.ingredient-card');
        this.createImage(ingredient);
        this.createTittle(ingredient.name);
        this.createDescription(ingredient.description);
        this.createValue(ingredient.price);
    }

    createImage = (ingredient) => {
        const image = document.createElement('img');
        image.src = ingredient.imageInactive;
        image.alt = ingredient.description;
        this.card.appendChild(image);
    }

    createTittle = (name) => {
        const tittle = document.createElement('p');
        tittle.innerText = name;
        tittle.className = "ingredient-tittle";
        this.card.appendChild(tittle);
    }

    createDescription = (text) => {
        const description = document.createElement('p');
        description.innerText = text;
        description.className = "ingredient-description";
        this.card.appendChild(description);
    }

    createValue = (price) => {
        const value = document.createElement('p');
        value.innerText = `US$: ${price}`;
        value.className = "ingrediente-value";
        this.card.appendChild(value);
    }

    createElement() {
        this.shadow = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `${IngredientCardHtmlContent}`;
        const style = document.createElement('style');
        style.textContent = this.createStyles();
        this.shadow.appendChild(style);
        this.shadow.appendChild(template.content);
    }

    createStyles() {
        return `
        .ingredient-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 1em;
            width: 80vw;
            max-height: 46vh;
            box-shadow: rgba(0, 0, 0, 0.10) 0px 3px 8px;
            border-radius: 10px;
            background-color: var(--white);
        }

        .ingredient-tittle {
            font-family: 'Mplus-Black';
            font-size: 1.4em;
            color: var(--blue);
            margin: 0;
            padding-top: 4%;
        }

        .ingredient-description {
            text-align: center;
            margin: 0;
            padding: 0 2% 0 2%;
            font-size: 1em;
        }

        .ingrediente-value {
            color: var(--red);
            font-family: 'Mplus-Bold';
            font-size: 1.4em;
            padding: 5%;
        }

        .price-selected {
            color: var(--yellow);
        }


        .selected {
            background-color: var(--blue);
            color: white;
        }

        img {
            width: 105px;
            height: 105px;
            padding-top: 15%;
        }

        p {
            font-family: 'Mplus-Medium';
        }

        @media (min-width: 1100px) {
            .ingredient-card {
                max-width: 360px;
                max-height: 360px;
            }
        }
    `
    }
}

customElements.define("rmg-ingredient-card", IngredientCard);
