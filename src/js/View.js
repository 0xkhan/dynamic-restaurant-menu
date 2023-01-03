class View {

    #data;
    #errorMessage = "Bad Request. Please try again!";

    #bodyElement = document.querySelector('body');
    #menuCatElem = document.querySelector('.menu__tabs');
    #menuItemsElem = document.querySelector('.menu__content-container');

    render(data) {
        if (!data) return this.renderError();
        this.#data = data;

        const firstCat = this.#data.menuCategories[0];
        const markup = this.#data.menuCategories.map(cat => this.#generateMarkup(this.#data.menu[cat], cat, firstCat)).join('');

        this.#clear(this.#menuItemsElem);
        this.#menuItemsElem.insertAdjacentHTML('afterbegin', markup);
    }

    renderCatBar(data) {
        if (!data) return this.renderError();
        this.#data = data;

        const firstCat = this.#data[0];
        const markup = this.#data.map(cat => this.#generateCatBarMarkup(cat, firstCat)).join('');

        this.#clear(this.#menuCatElem);
        this.#menuCatElem.insertAdjacentHTML('afterbegin', markup);
    }

    renderSpinner() {
        const markup = `
            <div class="spinner">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-loader" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                   <line x1="12" y1="6" x2="12" y2="3"></line>
                   <line x1="16.25" y1="7.75" x2="18.4" y2="5.6"></line>
                   <line x1="18" y1="12" x2="21" y2="12"></line>
                   <line x1="16.25" y1="16.25" x2="18.4" y2="18.4"></line>
                   <line x1="12" y1="18" x2="12" y2="21"></line>
                   <line x1="7.75" y1="16.25" x2="5.6" y2="18.4"></line>
                   <line x1="6" y1="12" x2="3" y2="12"></line>
                   <line x1="7.75" y1="7.75" x2="5.6" y2="5.6"></line>
                </svg>
            </div>
        `;

        this.#clear(this.#menuCatElem);
        this.#menuCatElem.insertAdjacentHTML('afterbegin', markup);
    }

    renderError() {
        const markup = `
            <div class="error">
                ${this.#errorMessage}
            </div>
        `;

        this.#clear(this.#menuCatElem);
        this.#menuCatElem.insertAdjacentHTML('afterbegin', markup);
    }

    #clear(elem) {
        elem.innerHTML = '';
    }

    #generateCatBarMarkup(cat, firstCat) {
        return `
            <button class="btn btn--round menu__tab ${cat === firstCat ? 'menu__tab--active' : ''} menu__tab--${cat}" data-tab="${cat}">${cat}</button>
        `;
    }

    #generateMarkup(data, cat, firstCat) {
        return `
            <div class="menu__content ${cat === firstCat ? 'menu__content--active' : ''} menu__content--${cat}">
                <div class="row">
                    ${data.map(this.#generateDishMarkup).join('')}
                </div>
            </div>
        `;
    }

    #generateDishMarkup(dish) {
        return `
            <div class="menu__content-col">
                <div class="menu__item">
                    <div class="menu__item-desc">
                        <span class="menu__item-price u-margin-bottom-xs">${dish.dishPrice}</span>
                        <h3 class="u-margin-bottom-xs">${dish.dishName}</h3>
                        <p class="menu__item-ingredients">
                            ${dish.dishIngredients.map(ing => ing).join(', ')}
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    async addHandlerMenu(handler, domSelectors) {
        window.addEventListener('load', () => {
            handler().then(() => {
                const tabs = document.querySelectorAll(`.${domSelectors.tab}`);
                const tabsContainer = document.querySelector(`.${domSelectors.tabsContainer}`);
                const tabsContent = document.querySelectorAll(`.${domSelectors.contentContainer}`);

                tabsContainer.addEventListener('click', function(e) {
                    const clicked = e.target.closest(`.${domSelectors.tab}`);
                    if (!clicked) return;

                    // Add active class to the button that is clicked
                    tabs.forEach((tab) => tab.classList.remove('menu__tab--active'));
                    clicked.classList.add('menu__tab--active');

                    // Activate content area
                    tabsContent.forEach((tabContent) => tabContent.classList.remove('menu__content--active'));
                    document.querySelector(`.menu__content--${clicked.dataset.tab}`).classList.add('menu__content--active');
                });
            });
        });
    }

}

export default new View();
