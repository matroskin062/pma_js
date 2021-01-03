const betweenNumbers = () => {
  const n = prompt('Input first number');
  const m = prompt('Input second number');

  if (!isNaN(n) && !isNaN(m)) {
    let min = 0;
    let max = 0;
    if (n > m && n - m > 1) {
      min = Math.floor(m);
      max = Math.floor(n);
    } else if (n < m && m - n > 1) {
      min = Math.floor(n);
      max = Math.floor(m);
    } else {
      console.log('no numbers between');
    }
    alert('Result in Console!');
    for (let i = min + 1; i < max; i++) {
      console.log(i);
    }
  } else {
    alert('Invalid Value!');
  }
};

const toPower = () => {
  const arrow = (num, pow) => num ** pow;
  const funExp = function (num, pow) {
    return num ** pow;
  };

  const number = prompt('Input number');
  let power = prompt('Input power');

  if (!isNaN(number) && !isNaN(power)) {
    if (power.trim() === '') {
      power = 2;
    }
    alert('Result in Console!');
    console.log('Arrow: ' + arrow(number, power));
    console.log('Function Expression: ' + funExp(number, power));
  } else {
    alert('Invalid Input!');
  }
};
