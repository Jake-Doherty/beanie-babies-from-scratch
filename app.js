/* Imports */
import { getAstroSigns, getBeanies } from './fetch-utils.js';
import { renderAstroOption, renderBeanie } from './render-beanies.js';

/* Get DOM Elements */
const beanieList = document.getElementById('beanie-list');
const astroSelect = document.getElementById('astrology-select');

/* State */
let error = null;
let astroSigns = [];
let beanies = [];

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

async function findBeanies(title, releaseYear) {
    const response = await getBeanies(title, releaseYear);

    error = response.error;
    beanies = response.data;

    if (!error) {
        displayBeanies();
    }
}

/* Display Functions */

function displayBeanies() {
    beanieList.innerHTML = '';

    for (const beanie of beanies) {
        const beanieElement = renderBeanie(beanie);
        beanieList.append(beanieElement);
    }
}

function displayAstroSignOptions() {
    for (const astroSign of astroSigns) {
        const astroOption = renderAstroOption(astroSign);
        astroSelect.append(astroOption);
    }
}

// (don't forget to call any display functions you want to run on page load!)
displayBeanies();
