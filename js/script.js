import cards from './letters.js';

const pageWrapperEL = document.querySelector('.page-wrapper');
const wrapperEl = document.querySelector('.card-wrapper');

function createCardLetter(cards, wrapperEl) {
    let allCards = '';

    for (const element of cards) {
        let typeLetter = 'js-prugolosna';
        if (element.typeLetter === 'голосна') {
            typeLetter = 'js-golosna';
        }
        allCards += `<div class="card">
             <h2 class="${typeLetter}">${element.mainLetter.toUpperCase()}${
      element.mainLetter
    }</h2>
             <img src="./img/${element.img[0]}" alt="" />
             <div class="all-card"></div>
           </div>`;
    }
    wrapperEl.insertAdjacentHTML('beforeend', allCards);
}
// ---------------------------------------------------
createCardLetter(cards, wrapperEl);

wrapperEl.addEventListener('click', show);

function show(e) {
    const currentCard = e.target.closest('.card');
    let findLetter;
    if (currentCard) {
        findLetter = currentCard.querySelector('h2').textContent;
        wrapperEl.classList.add('visually-hidden');
        for (const elem of cards) {
            if (findLetter[1] === elem.mainLetter) {
                counterLeters = cards.indexOf(elem);
            }
        }
        createMainLetter(findLetter);
        showCard(counterLeters);
        createBtn();
    }
}

// ------------------------------------------------------------
const containerEl = document.querySelector('.container');
const navLetterEL = document.querySelector('.nav');

let counterLeters = 0;

function createMainLetter(findLetter) {
    const mainLetterEL = document.querySelector('.main-letter');
    containerEl.insertAdjacentHTML(
        'afterbegin',
        ` <h1 class="main-letter">${findLetter}</h1>`,
    );
}

function createBtn() {
    containerEl.insertAdjacentHTML(
        'afterbegin',
        ` <button class="js-button btn-back"><-</button>`,
    );
    const buttonEL = document.querySelector('.js-button');

    if (buttonEL) {
        buttonEL.addEventListener('click', comeBackAbetka);
    }
}

function comeBackAbetka() {
    const mainLetterEL = document.querySelector('.main-letter');
    mainLetterEL.remove();
    const mainWordEL = document.querySelector('.card-img');
    mainWordEL.remove();
    const buttonEL = document.querySelector('.js-button');
    buttonEL.remove;

    wrapperEl.classList.remove('visually-hidden');
}

let counter = 0;

function showCard(counterLeters) {
    counter += 1;
    containerEl.insertAdjacentHTML(
        'beforeend',
        createCards(cards, counterLeters),
    );

    const wordEl = document.querySelector('.js-word');

    wordEl.addEventListener('click', checkLetter);
}

function createCards(cards, findLetter) {
    let cardImgEl = document.querySelector('.card-img');
    if (cardImgEl) {
        cardImgEl.remove();
    }

    if (counter >= cards[counterLeters].description.length) {
        counter = 0;
    }
    let mainWord = cards[counterLeters].description[counter];

    let row = '';
    for (let i = 0; i < mainWord.length; i += 1) {
        row += `<td>${mainWord[i]}</td>`;
    }

    return ` <div class="card-img"><img src="./img/${cards[counterLeters].img[counter]}" alt="${cards[counterLeters].description[counter]}" />
          <table class="js-word">
              <tr>
                  ${row}
              </tr>
          </table> </div>`;
}
let checkAnswer = 0;

function checkLetter(e) {
    let totalMainLetter = 0;

    let currentWord = cards[counterLeters].description[counter].toLowerCase();
    let letterClick = e.target.textContent.toLowerCase();
    if (cards[counterLeters].mainLetter === letterClick) {
        e.target.classList.add('green-bg');
        checkAnswer += 1;
    } else {
        e.target.classList.add('red-bg');
    }

    for (let i = 0; i < currentWord.length; i += 1) {
        if (currentWord[i] === cards[counterLeters].mainLetter) {
            totalMainLetter += 1;
        }
    }

    if (totalMainLetter === checkAnswer) {
        showCard();

        checkAnswer = 0;
    }
}