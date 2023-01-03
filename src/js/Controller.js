import Model from './Model';
import View from './View';

export default class Controller {

    #domSelectors;

    constructor(domSelectors = {}) {
        this.#domSelectors = domSelectors;
        this.init();
    }

    async controlMenu() {
        try {
            View.renderSpinner();
            await Model.loadMenuData();
            View.renderCatBar(Model.state.menuCategories);
            View.render(Model.state);
        } catch(err) {
            console.error(err);
            View.renderError();
        }
    }

    init() {
        View.addHandlerMenu(this.controlMenu, this.#domSelectors);
    }
}
