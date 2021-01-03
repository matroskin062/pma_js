const substring = () => {
  const s1 = prompt('Input first string');
  const s2 = prompt('Input second string');
  if (s1.trim() !== '' && s2.trim() !== '') {
    let pos = 0;
    let times = 0;
    while (true) {
      let index = s1.indexOf(s2, pos);
      if (index === -1) break;
      times = times + 1;
      pos = index + 1;
    }
    alert(`${s2} found ${times} times in ${s1}`);
  } else {
    alert('Empty string');
  }
};

const findNumbers = () => {
  const numbers = 'ECMAScript 2015 (6th Edition, ECMA-262)'
    .match(/\d+/g)
    .join(', ');
  alert(numbers);
};

const findCapital = () => {
  const capital = 'ECMAScript 2015 (6th Edition, ECMA-262)'
    .match(/[A-Z]/g)
    .join(', ');
  alert(capital);
};
