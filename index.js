// Массив всех текстов
let textStock = [
  'English texts for beginners  online and for free. both improve your',
  'to practice reading and comprehension',
  'Practicing your comprehension of written English will',
  'vocabulary and understanding of grammar and word order.',
];

// Глобальные переменные
let mainTxt = document.querySelector('.mainTxt');
let randomText = textStock[getRandomInt(0, textStock.length - 1)].split('');
let symbolIndex = 0;
let sumErrors = 0;
let timeHasGone = 0;
let sumTime = 0;
let amountOfTime = 0;

// Функия отправляет рандомное число от 0 до числа последнего текста
function getRandomInt(min, max) {
  let minimum = Math.ceil(min);
  let maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum)) + minimum; //Максимум не включается, минимум включается
}

// Передает нужные данные для работы с клавиатурой и текстом при запуске (начать печатать)
const newText = document.querySelector('.start__typing');
newText.addEventListener('click', () => {
  // Вывод текста посимвольно на табло
  randomText.forEach((x) =>
    mainTxt.insertAdjacentHTML('beforeend', `<span class="whiteTxt">${x}</span>`),
  );

  // Отправляет данные для работы панели ошибок и скорости печати
  document.addEventListener('keyup', function (event) {
    clickHandling(event.code);
    timeBetweenClicks(event.code);
  });
});


// Функция отображает клавиатуру и элементы табло с текстом после нажатия кнопки (начать печатать)
const showhide = (showBoardItems) => {
  let BoardItems = document.getElementById(showBoardItems);
  BoardItems.style.visibility = BoardItems.style.visibility == 'hidden' ? 'visible' : 'hidden';
  document.getElementById('showKeyboard').style.visibility = 'visible';
  inputСharСolor();
};

// Обработка нажимаемых клавиш и обработка ошибок
const clickHandling = (smallKeys) => {
  // классу "mainTxt" находит символ или букву по индексу
  let textSymbol = mainTxt.childNodes[symbolIndex].textContent;
  inputСharСolor(symbolIndex);

  // Если шифт или капс зачат(true) классу "Keyboard" добавляется класс "keyboardStyle" это изменяет вводимые буквы на большие и заменяет символы
  document.querySelector('.text__transform') ? (keyboardStyle = true) : (keyboardStyle = false);

  // Обрабатывает символы и присваивает новый класс правильный символ = зеленый фон, неправильный красный и отсылает символ индекс чтобы можно было менять цвет для следующего символа на желтый
  if (
    smallKeys != 'ShiftLeft' &&
    smallKeys != 'Space' &&
    smallKeys != 'CapsLock' &&
    smallKeys != 'Tab' &&
    smallKeys != 'Enter' &&
    smallKeys !== 'ShiftRight' &&
    smallKeys != 'Backspace'
  ) {
    let charFromKeyboard = document
      .getElementById(smallKeys)
      .getElementsByTagName('span')
      .item(1).textContent;
    if (textSymbol === charFromKeyboard && keyboardStyle === false) {
      mainTxt.childNodes[symbolIndex++].className = 'green__backgroud';
      inputСharСolor(symbolIndex);
    }
    if (textSymbol === charFromKeyboard.toUpperCase() && keyboardStyle === true) {
      mainTxt.childNodes[symbolIndex++].className = 'green__backgroud';
      inputСharСolor(symbolIndex);
    } else if (
      textSymbol != charFromKeyboard ||
      (keyboardStyle === true && textSymbol != charFromKeyboard.toUpperCase())
    ) {
      mainTxt.childNodes[symbolIndex].className = 'red__backgroud';
      errorCounter(1);
    }
  } else if (smallKeys === 'Space' && textSymbol === ' ') {
    let bigCharFromKeyboard = document
      .getElementById(smallKeys)
      .getElementsByTagName('span')
      .item(1).textContent;
    if ((textSymbol === bigCharFromKeyboard && keyboardStyle === false) || keyboardStyle === true) {
      mainTxt.childNodes[symbolIndex++].className = 'green__backgroud';
      inputСharСolor(symbolIndex);
    }
  }
};

// Функция подсвечивает следующий символ желтым
const inputСharСolor = (symbolIndex) => {
  if (symbolIndex < mainTxt.childNodes.length) {
    mainTxt.childNodes.item(symbolIndex).className = 'yellow__backgroud';
  }
  endOfText(symbolIndex);
};

// Функция показывает сумму ошибок
const errorCounter = (err) => {
  sumErrors += err;
  document.getElementById('errors').textContent = sumErrors;
  document.getElementById('mistake').getElementsByTagName('span').item(0).innerHTML = `${sumErrors}`;
};

// Функция показывает среднюю скорость котороя обновляется при клике
const netAverageSpeed = (timeBetween) => {
  amountOfTime += timeBetween;
  document.getElementById('speed__min').textContent = Math.floor(
    (symbolIndex / amountOfTime.toFixed(2)) * 60,
  );
};

// Обработчик KEYDOWN
document.addEventListener('keydown', (event) => {
  if (!event.repeat) {
    backLight(event);
  }
  if (
    event.code === 'CapsLock' &&
    document.getElementById('one').getElementsByTagName('span').item(0).innerHTML === '!'
  ) {
    document.getElementById('showKeyboard').classList.toggle('text__transform');
    swapSymbol(false);
  } else if (
    event.code === 'CapsLock' &&
    document.getElementById('one').getElementsByTagName('span').item(0).innerHTML === '1'
  ) {
    document.getElementById('showKeyboard').classList.toggle('text__transform');
    swapSymbol(true);
  }
});

// Обработчик KEYUP
document.addEventListener('keyup', (event) => {
  backLight(event);
  if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') swapSymbol(false);
});

// Подсветка клавиш при клике
function backLight(event) {
  for (let key of document.querySelectorAll('.row i')) {
    if (key.id === event.code) {
      key.getElementsByTagName('div').item(0).classList.toggle('smallKeysSwapColor');
    }
    if (key.id === event.code && (event.code === 'ShiftLeft' || event.code === 'ShiftRight')) {
      document.getElementById('showKeyboard').classList.toggle('text__transform');

      swapSymbol(true);
    }
  }
}

// Функция заменяет символы на клавиатуре при нажатии шифт или капс
function swapSymbol(checkShift) {
  let changeableKeys = [
    'Digit1',
    'Digit2',
    'Digit3',
    'Digit4',
    'Digit5',
    'Digit6',
    'Digit7',
    'Digit8',
    'Digit9',
    'Digit0',
    'Minus',
    'Equal',
    'Slash',
  ];
  let secondTypeOfKeys = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '?'];
  let firstTypeOfKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '/'];
  let i = 0;

  changeableKeys.forEach(
    (x) =>
      (document.getElementById(x).getElementsByTagName('span').item(1).textContent = `${
        checkShift ? secondTypeOfKeys[i++] : firstTypeOfKeys[i++]
      }`),
  );
}

// Вывод таблички с результатом
function endOfText(symbolIndex) {
  if (symbolIndex === mainTxt.childNodes.length) {
    document.getElementById('showResults').style.visibility = 'visible';
    document.getElementById('speed').getElementsByTagName('span').item(0).innerHTML = `${
      Math.floor(symbolIndex / amountOfTime.toFixed(2)) * 60
    }`;
  }
}






  




