
import AbstractView from "../AbstractView.js";
import HomeView from './Home.html';

import WelcomeBanner from '../../components/WelcomeBanner/WelcomeBanner.js';
export default class Home extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("RamenGo! - Home");
        this.components = {
            WelcomeBanner,
        }

    }

    async getHtml() {
        return HomeView;
    }     
}

