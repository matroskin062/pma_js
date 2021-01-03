const round = () => {
  const n = prompt('Input first number');
  const m = prompt('Input second number');
  if (!isNaN(m) && !isNaN(n) && n.trim() !== '' && m.trim !== '') {
    alert('Result in Console!');
    console.log(Math.round(n * 0.3));
    console.log(Math.round(m * 0.3));
  } else {
    alert('Invalid Input');
  }
};

const randomNumber = () => {
  const n = prompt('Input first number');
  const m = prompt('Input second number');
  if (!isNaN(n) && !isNaN(m) && n.trim() !== '' && m.trim !== '') {
    let min = 0;
    let max = 0;

    if (n > m) {
      min = m;
      max = n;
    } else if (n < m) {
      min = n;
      max = m;
    } else {
      console.log('no numbers between');
    }
    alert('Result in Console!');
    console.log(Math.round(min - 0.5 + Math.random() * (max - min + 1)));
  } else {
    alert('Invalid Input');
  }
};
