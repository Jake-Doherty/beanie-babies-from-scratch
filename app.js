/* Imports */
import { getAstroSigns, getBeanies } from './fetch-utils.js';
import { renderAstroOption, renderBeanie } from './render-beanies.js';

/* Get DOM Elements */
const beanieList = document.getElementById('beanie-list');
const astroSelect = document.getElementById('astrology-select');
const searchForm = document.getElementById('search-form');
const notificationDisplay = document.getElementById('notification-display');

/* State */
let error = null;
let count = 0;
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

async function findBeanies(name, astroSign) {
    const response = await getBeanies(name, astroSign);

    error = response.error;
    beanies = response.data;
    count = response.count;

    displayNotifications();
    if (!error) {
        displayBeanies();
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);
    findBeanies(formData.get('name'), formData.get('astroSign'));
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

// (don't forget to call any display functions you want to run on page load!)
displayBeanies();
