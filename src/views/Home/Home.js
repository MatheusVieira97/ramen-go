import AbstractView from "../AbstractView.js";
import home from './home.html';


export default class NotFound extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("RH - Not Found");
    }

    async getHtml() {
        return home;
    }
}
