const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

const userInput = prompt('Введите месяц:');

const getMonth = (userInput) => {
  if (+userInput >= 1 && +userInput <= 12) {
    return months[+userInput - 1];
  } else {
    const idx =
      months.findIndex((el) => el === userInput.trim().toLowerCase()) + 1;
    if (idx) {
      return idx;
    } else {
      return 'Неверный ввод!';
    }
  }
};

alert(getMonth(userInput));
