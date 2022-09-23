/* Imports */
import { getAstroSigns, getBeanies, getThemes, getAnimals } from './fetch-utils.js';
import {
    renderAstroOption,
    renderBeanie,
    renderThemeOption,
    renderAnimalOption,
} from './render-beanies.js';

/* Get DOM Elements */
const beanieList = document.getElementById('beanie-list');
const astroSelect = document.getElementById('astrology-select');
const themeSelect = document.getElementById('theme-select');
const animalSelect = document.getElementById('animal-select');
const searchForm = document.getElementById('search-form');
const notificationDisplay = document.getElementById('notification-display');

/* State */
let error = null;
let count = 0;
let astroSigns = [];
let themes = [];
let beanies = [];
let animals = [];

let filter = {
    name: '',
    astroSign: '',
    theme: '',
    animal: '',
};

let paging = {
    page: 1,
    pageSize: 25,
};

/* Events */
/*                          REFACTORED!!                      */

window.addEventListener('load', async () => {
    findBeanies();

    const astro = await getAstroSigns();
    const theme = await getThemes();
    const animal = await getAnimals();

    const response = await Promise.all([astro, theme, animal]);

    error = response.error;
    astroSigns = astro.data;
    themes = theme.data;
    animals = animal.data;

    if (!error) {
        displayAstroSignOptions();
        displayThemeOptions();
        displayAnimalOptions();
    }
});

/*                          old code!!                      */

// window.addEventListener('load', async () => {
//     findBeanies();

//     const response = await getAstroSigns();

//     error = response.error;
//     astroSigns = response.data;

//     if (!error) {
//         displayAstroSignOptions();
//     }
// });

// window.addEventListener('load', async () => {
//     findBeanies();

//     const response = await getThemes();

//     error = response.error;
//     themes = response.data;

//     if (!error) {
//         displayThemeOptions();
//     }
// });

// window.addEventListener('load', async () => {
//     findBeanies();

//     const response = await getAnimals();

//     error = response.error;
//     animals = response.data;

//     if (!error) {
//         displayAnimalOptions();
//     }
// });

const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            // do magic here
            getMoreBeanies();
        }
    }
});

async function getMoreBeanies() {
    paging.page++;
    const response = await getBeanies(filter, paging);

    error = response.error;
    themes = response.data;
    animals = response.data;
    count = response.count;
    const moreBeanies = response.data;
    beanies = beanies.concat(moreBeanies);

    displayNotifications();
    displayMoreBeanies(moreBeanies);
}

async function findBeanies() {
    const response = await getBeanies(filter, paging);

    error = response.error;
    beanies = response.data;
    themes = response.data;
    animals = response.data;
    count = response.count;

    displayNotifications();
    if (!error) {
        displayBeanies();
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(searchForm);

    filter.name = formData.get('name');
    filter.astroSign = formData.get('astroSign');
    filter.theme = formData.get('theme');
    filter.animal = formData.get('animal');

    paging.page = 1;

    findBeanies();
});

/* Display Functions */

function displayBeanies() {
    beanieList.innerHTML = '';

    displayMoreBeanies(beanies);
}

function displayMoreBeanies(moreBeanies) {
    let lastEl = null;
    for (const beanie of moreBeanies) {
        const beanieElement = renderBeanie(beanie);
        beanieList.append(beanieElement);
        lastEl = beanieElement;
    }

    if (beanies.length < count) {
        observer.observe(lastEl);
    }
}

function displayNotifications() {
    if (error) {
        notificationDisplay.textContent = error.message;
    } else {
        notificationDisplay.textContent = `Displaying ${beanies.length} of ${count} Beanie Babies`;
    }
}

function displayAstroSignOptions() {
    for (const astroSign of astroSigns) {
        const astroOption = renderAstroOption(astroSign);
        astroSelect.append(astroOption);
    }
}

function displayThemeOptions() {
    for (const theme of themes) {
        const themeOption = renderThemeOption(theme);
        themeSelect.append(themeOption);
    }
}

function displayAnimalOptions() {
    for (const animal of animals) {
        const animalOption = renderAnimalOption(animal);
        animalSelect.append(animalOption);
    }
}

// (don't forget to call any display functions you want to run on page load!)
displayBeanies();
