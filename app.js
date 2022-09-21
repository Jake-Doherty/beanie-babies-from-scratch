/* Imports */
import { getBeanies } from './fetch-utils.js';
import { renderBeanie } from './render-beanies.js';

/* Get DOM Elements */
const beanieList = document.getElementById('beanie-list');

/* State */
let error = null;
let beanies = [];

/* Events */
window.addEventListener('load', async () => {
    findBeanies();
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

// (don't forget to call any display functions you want to run on page load!)
displayBeanies();
