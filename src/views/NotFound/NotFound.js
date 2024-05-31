import AbstractView from "../AbstractView.js";
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("RH - Not Found");
    }

    async getHtml() {
        return `
            <h1>Not Found 404</h1>
            <p>Parece que essa página não existe!</p>
            <a href="/home">Redirect!</a>
        `;
    }
}