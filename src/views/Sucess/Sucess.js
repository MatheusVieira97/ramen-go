
import AbstractView from "../AbstractView.js";
import SucessView from './Sucess.html';

import LocalStorageManager from '../../scripts/utils/StorageManager.js';
import OrderService from '../../services/Order.service.js';

export default class Sucess extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("RamenGo! - Sucess");
        this.services = {
            orderService: new OrderService(),
        }
        this.components = {

        }
    }

    async getHtml() {
        return SucessView;
    }

    async init() {
        this.createComponentsVariables();
        this.createEvents();

        this.getOrder()
        this.renderOrder();
    }

    getOrder() {
        const storageManager = new LocalStorageManager();
        this.order = storageManager.getItem('order');
    }

    createComponentsVariables() {
        const buttonShadowComponent = document.querySelector('rmg-rounded-button').shadowRoot;
        this.newOrderButton = buttonShadowComponent.querySelector('button');
    }

    createEvents() {
        this.newOrderButton.addEventListener('click', this.dispatchNewOrder.bind(this));
    }

    dispatchNewOrder() {
        const storageManager = new LocalStorageManager();
        storageManager.clear('order');
        window.location.href = '/home';
    }

    async renderOrder() {
        const broth = this.order.broth;
        const protein = this.order.protein
        const order = await this.services.orderService.postOrders(`${broth}`, `${protein}`);
        const ramgenImage = document.querySelector('.ramen-image');
        const tittle = document.querySelector('.order-tittle')
        if(order) {
            ramgenImage.src = order.image;
            ramgenImage.id = order.id;
            tittle.innerText = order.description;
        }
    }
}

