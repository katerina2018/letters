const cards = [{
        mainLetter: 'а',
        typeLetter: 'голосна',
        img: ['', 'akula_1.jpg', 'apelsun_2.jpg', 'avtobus_3.jpg', 'ukraina_1.jpg'],
        description: ['', 'Акула', 'Апельсин', 'Автобус', 'Україна'],
    },
    {
        mainLetter: 'а',
        typeLetter: 'голосна',
        img: ['', 'akula_1.jpg', 'apelsun_2.jpg', 'avtobus_3.jpg', 'ukraina_1.jpg'],
        description: ['', 'Акула', 'Апельсин', 'Автобус', 'Україна'],
    },
    {
        mainLetter: 'у',
        typeLetter: 'голосна',
        img: [
            '',
            'ukraina_1.jpg',
            'uchen_2.jpg',
            'udav_4.jpg',
            'akula_1.jpg',
            'avtobus_3.jpg',
        ],
        description: ['', 'Україна', 'Учень', 'Удав', 'Акула', 'Автобус'],
    },
    {
        mainLetter: 'о',
        typeLetter: 'голосна',
        img: [
            '',
            'ogurec_1.jpg',
            'orel_2.jpg',
            'ovoshi_3.jpg',
            'ochki_4.jpg',
            'jabloko_1.jpg',
        ],
        description: ['', 'Огірок', 'Орел', 'Овочі', 'Окуляри', 'Яблоко'],
    },
    {
        mainLetter: 'я',
        typeLetter: 'голосна',
        img: [
            '',
            'jabloko_1.jpg',
            'jakir_2.jpg',
            'jauco.jpg',
            'jaxta.jpg',
            'ochki_4.jpg',
        ],
        description: ['', 'Яблоко', 'Якір', 'Яйце', 'Яхта', 'Окуляри'],
    },
];

const containerEl = document.querySelector('.container');
const navLetterEL = document.querySelector('.nav');

let counterLeters = 0;

navLetterEL.addEventListener('click', checkNav);

function checkNav(e) {
    let cardImgEl = document.querySelector('.card-img');
    if (cardImgEl) {
        cardImgEl.remove();
    }
    if (e.target.classList.contains('js-nav-right')) {
        counterLeters += 1;

        if (counterLeters > cards.length - 1) {
            counterLeters = 0;
        }
    } else if (e.target.classList.contains('js-nav-left')) {
        counterLeters -= 1;

        if (counterLeters < 0) {
            counterLeters = cards.length - 1;
        }
    }

    createMainLetter(cards, counterLeters);
    let newBtn = createMainButton(cards, counterLeters);
    newBtn.addEventListener('click', showCard);
}

function createMainButton(cards, counterLeters) {
    let buttonEL = document.querySelector('.js-button');

    buttonEL.remove();
    containerEl.insertAdjacentHTML(
        'beforeend',
        `  <button type="button " class="js-button">Почати ${cards[
      counterLeters
    ].mainLetter.toUpperCase()}</button>`,
    );
    buttonEL = document.querySelector('.js-button');
    return buttonEL;
}

function createMainLetter(cards, counterLeters) {
    const mainLetterEL = document.querySelector('.main-letter');
    mainLetterEL.remove();
    containerEl.insertAdjacentHTML(
        'afterbegin',
        ` <h1 class="main-letter">${cards[counterLeters].mainLetter.toUpperCase()}${
      cards[counterLeters].mainLetter
    }</h1>`,
    );
}

let counter = 0;

function showCard() {
    counter += 1;
    containerEl.insertAdjacentHTML('beforeend', createCards(cards));

    const wordEl = document.querySelector('.js-word');

    wordEl.addEventListener('click', checkLetter);
}

function createCards(cards) {
    let cardImgEl = document.querySelector('.card-img');
    if (cardImgEl) {
        cardImgEl.remove();
    }
    let buttonEL = document.querySelector('.js-button');
    buttonEL.textContent = '->';
    buttonEL.classList.add('continue-card');
    if (counter >= cards[counterLeters].description.length) {
        counter = 1;
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