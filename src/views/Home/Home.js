
import Slider from '../../components/Slider/Slider.js';
import AbstractView from "../AbstractView.js";
import HomeView from './Home.html';

import RoundedButton from '../../components/RoundedButton/RoundedButton.js';
import WelcomeBanner from '../../components/WelcomeBanner/WelcomeBanner.js';

import BrothService from '../../services/Broths.service.js';
import ProteinService from '../../services/Protein.service.js';

import LocalStorageManager from '../../scripts/utils/StorageManager.js';
export default class Home extends AbstractView {
    broth = null;
    protein = null;

    constructor(params) {
        super(params);
        this.setTitle("RamenGo! - Home");
        this.services = {
            brothService: new BrothService(),
            proteinService: new ProteinService(),
        }
        this.components = {
            WelcomeBanner,
            Slider,
            RoundedButton
        }
    }

    async getHtml() {
        return HomeView;
    }

    async init() {
        this.createComponentsVariables();

        this.setBroths()
        this.setProteins();
        this.createEvents();
        this.configOrderButton();
    }

    dispatchOrder() {
        const order = {
            broth: this.broth,
            protein: this.protein,
        }
        const storageManager = new LocalStorageManager();
        storageManager.setItem('order', order);
        window.location.href = '/sucess';
    }

    async setBroths() {
        const broths = await this.services.brothService.getBroths();
        if (broths) {
            this.sliderBroths.setAttribute('items', JSON.stringify(broths));
            return;
        }
    }

    async setProteins() {
        const proteins = await this.services.proteinService.getProteins();
        if (proteins) {
            this.sliderProteins.setAttribute('items', JSON.stringify(proteins));
            return;
        }
    }

    updateBroth(id) {
        this.broth = this.broth === id ? null : id;
        this.updateOrderButton();
    }

    updateProtein(id) {
        this.protein = this.protein === id ? null : id;
        this.updateOrderButton();
    }

    updateOrderButton() {
        const isSelectedBrothAndProtein = this.broth && this.protein
        isSelectedBrothAndProtein ? this.buttonOrder.removeAttribute('disabled') : '';
        isSelectedBrothAndProtein ? this.buttonOrder.classList.remove('disabled') : this.buttonOrder.classList.add('disabled')
        isSelectedBrothAndProtein ? this.buttonOrder.classList.add('active') : this.buttonOrder.classList.remove('active');
    }

    createComponentsVariables() {
        const buttonShadowComponent = document.querySelector('rmg-rounded-button').shadowRoot;
        this.buttonOrder = buttonShadowComponent.querySelector('button');

        this.sliderBroths = document.querySelector('#broth-slider');
        this.sliderProteins = document.querySelector('#protein-slider');
    }

    createEvents() {
        this.sliderBroths.addEventListener('slide-item-selected', (event) => this.updateBroth(event.detail));
        this.sliderProteins.addEventListener('slide-item-selected', (event) => this.updateProtein(event.detail));
    }

    configOrderButton() {
        this.buttonOrder.classList.add('disabled');
        this.buttonOrder.disabled = true;
        this.buttonOrder.addEventListener('click', this.dispatchOrder.bind(this));
    }
}

