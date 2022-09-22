export function renderBeanie(beanie) {
    const li = document.createElement('li');
    li.classList.add('beanie-card');

    const beanieInfoDiv = document.createElement('div');
    beanieInfoDiv.classList.add('info-card');

    const h2 = document.createElement('h2');
    h2.textContent = beanie.title;

    const attributes = document.createElement('p');
    attributes.classList.add('attr');

    const animal = document.createElement('span');
    animal.textContent = beanie.animal;

    const astrologySign = document.createElement('span');
    astrologySign.textContent = beanie.astroSign;

    const releaseYear = document.createElement('span');
    releaseYear.textContent = `Released in ${beanie.releaseYear}`;

    const beanieImage = document.createElement('img');
    beanieImage.src = beanie.image;
    beanieImage.alt = beanie.title;

    attributes.append(animal, astrologySign, releaseYear);

    beanieInfoDiv.append(h2, attributes);

    li.append(beanieInfoDiv, beanieImage);

    return li;
}
