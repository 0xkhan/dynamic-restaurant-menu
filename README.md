# Dynamic Restaurant Menu

For the lack of a better name I just call it Dynamic Restaurant Menu. However
the name basically describes the purpose of this little component. It allows
you to add a dynamic menu to your static websites.

### Demo
See the [Demo Here](https://drm-demo.pages.dev/) with default theme!

### How to use it?
Of course there are better ways to use this component e.g npm package etc.
but this little component is not worth it as I developed it for my own static
website projects, therefore I didn't really thought about a better architecture.
However I now decided to share it with others because I find it very useful and
think that other developers might benefit from it too. With that being said what
you've to do is to manually copy the files from the `js/` directory to your
project.

After you've copied the files into the right place now it's time to link your
JSON file where your menu data is stored. You've to link it in `config.js`
file. See the config file below:

```javascript
export const API_URL = '../menu.json';
export const TIMEOUT_SEC = 10;
export const MENU_CATS = ["pasta", "antipasti", "classics", "seafood", "meat-food"];
```

You can either store your JSON file locally or host it for free on Netlify or
Cloudflare Pages and then assign the link to `API_URL`. As you're at it you
might also assign your menu categories to `MENU_CATS`. These categories have
to be the same as the categories in your JSON file and in lowercase as they're
**case sensitive**.

The next step is to import the `Controller` into your `index.js` file or any
other file that is used for bundling as follows:

```javascript
import Menu from './js/Controller';

new Menu({
    tab: "menu__tab",
    tabsContainer: "menu__tabs",
    contentContainer: "menu__content",
});
```

The `Menu` object takes an object as an argument and those are the DOM elements
that are manipulated by our script. See the methods below for reference!

```javascript
// Methods from View.js file

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
```

You also wanna add some HTML in your HTML file where you wanna show the menu.

```html
<div class="menu__tabs"></div>
<div class="menu__content-container"></div>
```

But wait! You're not done yet. If you want to use the whole thing without
customization then you also need the styles for it. Navigate to `src/sass/themes/`
there you'll find SCSS files for different themes just copy the one you need!

(Optional!) You might want to copy it to your `components/` directory and rename it
to `_menu.scss`.
