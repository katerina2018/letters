const cards = [{
        mainLetter: 'а',
        img: ['', 'akula_1.jpg', 'apelsun_2.jpg', 'avtobus_3.jpg'],
        description: ['', 'Акула', 'Апельсин', 'Автобус'],
    },
    // {
    //     mainLetter: 'у',
    //     img: ['', 'akula_1.jpg', 'apelsun_2.jpg', 'avtobus_3.jpg'],
    //     description: ['', 'Акула', 'Апельсин', 'Автобус'],
    // },
];

const containerEl = document.querySelector('.container');
const buttonEL = document.querySelector('.js-button');
const mainLetterEL = document.querySelector('.main-letter');

function createMainLetter(cards) {
    containerEl.insertAdjacentHTML(
        'afterbegin',
        ` <h1 class="main-letter">${cards[0].mainLetter.toUpperCase()}${
      cards[0].mainLetter
    }</h1>`,
    );
}
createMainLetter(cards);
buttonEL.addEventListener('click', showCard);
let counter = 0;

function showCard() {
    counter += 1;
    containerEl.insertAdjacentHTML('beforeend', createCards(cards));
    console.log();
    const wordEl = document.querySelector('.js-word');

    wordEl.addEventListener('click', checkLetter);
}

function createCards(cards) {
    const cardImgEl = document.querySelector('.card-img');
    cardImgEl.remove();
    buttonEL.textContent = 'Наступне';
    if (counter >= cards[0].description.length) {
        counter = 1;
    }

    let mainWord = cards[0].description[counter];
    // console.log('🚀 ~ createCards ~ mainWord', mainWord);
    let row = '';
    for (let i = 0; i < mainWord.length; i += 1) {
        row += `<td>${mainWord[i]}</td>`;
    }

    return cards.map(({ img, description }) => {
        return ` <div class="card-img"><img src="./img/А/${img[counter]}" alt="${description[counter]}" />
          <table class="js-word">
              <tr>
                  ${row}
              </tr>
          </table> </div>`;
    });
}

function checkLetter(e) {
    let letterClick = e.target.textContent.toLowerCase();
    if (cards[0].mainLetter === letterClick) {
        console.log('🚀 ~ checkLetter ~ letterClick', letterClick);
        e.target.classList.add('green-bg');
    } else {
        console.log('🚀 ~ checkLetter ~ letterClick', letterClick);
        e.target.classList.add('red-bg');
    }

    console.log(e.target);
}