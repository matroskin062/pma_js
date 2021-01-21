const assert = require('assert');

const flatWhite = (arr) => {
  return [].concat(...arr);
};

assert.deepStrictEqual(flatWhite(['doppio', ['hot'], 'milk']), [
  'doppio',
  'hot',

  'milk',
]);

assert.deepStrictEqual(flatWhite([['espresso', 'hot'], 'milk']), [
  'espresso',
  'hot',
  'milk',
]);

console.log('Looks good');
