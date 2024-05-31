
import AbstractView from "../AbstractView.js";
import HomeView from './Home.html';

import Header from '../../components/Header/Header.js';
export default class Home extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("RamenGo! - Home");
        this.components = {
            Header,
        }

    }

    async getHtml() {
        return HomeView;
    }     
}

