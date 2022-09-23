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

/* Events */
window.addEventListener('load', async () => {
    findBeanies();

    const response = await getAstroSigns();

    error = response.error;
    astroSigns = response.data;

    if (!error) {
        displayAstroSignOptions();
    }
});

window.addEventListener('load', async () => {
    findBeanies();

    const response = await getThemes();

    error = response.error;
    themes = response.data;

    if (!error) {
        displayThemeOptions();
    }
});

window.addEventListener('load', async () => {
    findBeanies();

    const response = await getAnimals();

    error = response.error;
    animals = response.data;

    if (!error) {
        displayAnimalOptions();
    }
});

async function findBeanies(name, astroSign, theme, animal) {
    const response = await getBeanies(name, astroSign, theme, animal);

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
    findBeanies(
        formData.get('name'),
        formData.get('astroSign'),
        formData.get('theme'),
        formData.get('animal')
    );
});

/* Display Functions */

function displayBeanies() {
    beanieList.innerHTML = '';

    for (const beanie of beanies) {
        const beanieElement = renderBeanie(beanie);
        beanieList.append(beanieElement);
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
