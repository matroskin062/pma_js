const betweenNumbers = (n, m) => {
  if (!isNaN(n) && !isNaN(m)) {
    let min = 0;
    let max = 0;
    if (n > m && n - m > 1) {
      min = Math.floor(m);
      max = Math.floor(n);
      for (let i = min + 1; i < max; i++) {
        console.log(i);
      }
    } else if (n < m && m - n > 1) {
      min = Math.floor(n);
      max = Math.floor(m);
      for (let i = min + 1; i < max; i++) {
        console.log(i);
      }
    } else {
      console.log('no numbers between');
    }
  } else {
    console.log('Invalid Value!');
  }
};

const toPower = (number, power = 2) => number ** power;

const toPower2 = function (number, power = 2) {
  return number ** power;
};

const round = (n, m) => {
  if (!isNaN(m) && !isNaN(n)) {
    console.log(Math.round(n * 0.3));
    console.log(Math.round(m * 0.3));
  } else {
    console.log('Invalid Input');
  }
};

const randomNumber = (n, m) => {
  if (!isNaN(n) && !isNaN(m)) {
    let min = 0;
    let max = 0;

    if ((n > m, n - m > 1)) {
      min = m;
      max = n;
      console.log(Math.round(min - 0.5 + Math.random() * (max - min + 1)));
    } else if ((n < m, m - n > 1)) {
      min = n;
      max = m;
      console.log(Math.round(min - 0.5 + Math.random() * (max - min + 1)));
    } else {
      console.log('no numbers between');
    }
  } else {
    console.log('Invalid Input');
  }
};
