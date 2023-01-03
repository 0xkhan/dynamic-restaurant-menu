import { API_URL, MENU_CATS } from './config.js';
import { AJAX } from './helpers.js';

class Model {
    state = {
        menuCategories: MENU_CATS,
        menu: {}
    };

    async loadMenuData() {
        try {
            const data = await AJAX(API_URL);
            this.state.menu = data;
        } catch(err) {
            throw err;
        }
    }
}

export default new Model();
