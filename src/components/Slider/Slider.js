import IngredientCard from '../IngredientCard/IngredientCard.js';
import SliderHtmlContent from './Slider.html';
export default class Slider extends HTMLElement {
    isDragging = false;
    touchPosition = null;
    scrollCurrentPosition = null;

    items = [];

    constructor() {
        super();
        this.createElement();
        this.components = {
            IngredientCard,
        }
    }

    connectedCallback() {
        this.sliderItems = this.shadowRoot.querySelector('.items');
        this.init();
    }

    init() {
        this.bindEvents()
    }

    static get observedAttributes() {
        return ['items'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.items = name === 'items' ? JSON.parse(newValue) : this.items;
        this.createItemsInList(this.items);
        this.createDots(this.items);
    }

    createDots(items) {
        items.forEach((item, index) => {
            const dot = this.createDot(index);
            dot.id = index;
            this.shadowRoot.querySelector('.slider-dots').appendChild(dot);
        })
    }

    createElement() {
        this.shadow = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `${SliderHtmlContent}`;
        const style = document.createElement('style');
        style.textContent = this.createStyles();
        this.shadow.appendChild(style);
        this.shadow.appendChild(template.content);
    }

    createItemsInList(items) {
        items.forEach((item, index) => {
            const li = this.createListItem();
            const card = this.createCard(item);
            card.id = index;

            li.appendChild(card);
            this.sliderItems.appendChild(li);
        });
    }

    createListItem() {
        const li = document.createElement('li');
        li.className = "item";
        return li;
    }

    createCard(item) {
        const card = document.createElement('rmg-ingredient-card');
        card.setAttribute('item', JSON.stringify(item));
        card.addEventListener('click', this.handleClick);
        return card;
    }

    handleClick = (event) => {
        const id = Number(event.target.id) + 1

        this.removePreviousSelected(event);

        const card = event.currentTarget;
        card.setAttribute('selected', true);

        let customEvent = new CustomEvent('slide-item-selected', {
            bubbles: true,
            cancelable: true,
            detail: id,
            composed: true
        });
        this.dispatchEvent(customEvent);
    }

    removePreviousSelected(event) {
        const slider = document.querySelector(`#${this.id}`).shadowRoot;
        const cards = slider.querySelectorAll('rmg-ingredient-card');
        cards.forEach(card => {
            if (card.id !== event.target.id && card.selected === true) {
                card.setAttribute('selected', false);
            }
        })
    }

    createDot(index) {
        const span = document.createElement('span');
        span.className = index === 0 ? 'dot dot-active' : 'dot';
        return span;
    }

    bindEvents() {
        this.sliderItems.addEventListener('mousedown', this.startDragging);
        this.sliderItems.addEventListener('touchstart', this.startDragging);

        this.sliderItems.addEventListener('mousemove', this.moveItems);
        this.sliderItems.addEventListener('touchmove', this.moveItems);

        this.sliderItems.addEventListener('mouseleave', this.endDragging);
        this.sliderItems.addEventListener('mouseup', this.endDragging);
        this.sliderItems.addEventListener('touchend', this.endDragging);
    }

    startDragging = (event) => {
        this.isDragging = true;
        this.sliderItems.classList.add('active');
        this.touchPosition = event.pageX || event.touches[0].pageX - this.sliderItems.offsetLeft;
        this.scrollCurrentPosition = this.sliderItems.scrollLeft;
    }

    endDragging = () => {
        this.isDragging = false;
        this.sliderItems.classList.remove('active');
    }

    moveItems = (event) => {
        if (!this.isDragging) return;
        event.preventDefault();
        const positionX = event.pageX || event.touches[0].pageX - this.sliderItems.offsetLeft;
        const dist = (positionX - this.touchPosition);
        this.sliderItems.scrollLeft = this.scrollCurrentPosition - dist;
        this.calculateNewPosition();
    }

    calculateNewPosition() {
        const listItems = this.shadowRoot.querySelectorAll('rmg-ingredient-card');
        for (const item of listItems) {
            const relativeLeftPostion = item.getBoundingClientRect().left;
            if (relativeLeftPostion > -150 && relativeLeftPostion < 180) {
                this.updateActiveDot(item.id)
            }
        }
    }

    updateActiveDot(index) {
        const activeDot = this.shadowRoot.querySelector('.dot-active');
        if (activeDot) {
            activeDot.classList.remove('dot-active');
        }

        const dots = this.shadowRoot.querySelectorAll('.dot');
        for (let dot of dots) {
            if (dot.id === index) {
                dot.classList.add("dot-active")
            }
        }
    }

    createStyles() {
        return `
        .wrapper {
            ul {
                 display: flex;
            }
        }

        .items {
            width: 100%;
            overflow: hidden;
            cursor: pointer;
            list-style-type: none;
            margin: 0;
            padding: 0;
            
            &.active {
                cursor: grab;
            }
        }

        .item {
            padding: 4%;
            font-size: 1em;
        }

        .slider-dots {
            display: flex;
            justify-content: center;
        
            .dot {
                cursor: pointer;
                height: 16px;
                width: 16px;
                margin: 0 5px;
                background-color: #e0dbbf;
                border-radius: 50%;
                display: inline-block; 
                transition: opacity 0.6s ease;
                opacity: 0.35;
            }
        
            .dot-active {
                width: 36px;
                border-radius: 80px 80px 80px 80px;
                background-color: var(--red);
                opacity: 0.9;
            }
        }

        @media(min-width: 1100px){
            .wrapper {
                ul {
                    justify-content: center;
                }
            }

            .slider-dots {
                display: none;
            }
        }
    `
    }
}

customElements.define("rmg-slider", Slider);
