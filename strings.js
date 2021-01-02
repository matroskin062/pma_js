const substring = (s1, s2) => {
  let pos = 0;
  while (true) {
    let index = s1.indexOf(s2, pos);
    if (index === -1) break;
    console.log(found);
    pos = index + 1;
  }
};

const findNumbers = (str) => {
  return str.match(/\d+/g).join(', ');
};

const findCapital = (str) => {
  return str.match(/[A-Z]/g).join(', ');
};
