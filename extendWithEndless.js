const assert = require('assert');

const extendWithEndless = (...obj) => {
  return obj.reduce((acc, val) => ({ ...acc, ...val }), {});
};
assert.deepStrictEqual(
  extendWithEndless(
    { flatWhite: ['doppio', 'hot', 'milk'], isValid: true },

    { isValid: false, additionalProp: { thisIsGoodProp: 123 } },

    { prop3: false },

    { prop4: true },

    { isValid: [false, false] }
  ),

  {
    flatWhite: ['doppio', 'hot', 'milk'],

    isValid: [false, false],

    additionalProp: { thisIsGoodProp: 123 },

    prop3: false,

    prop4: true,
  }
);
console.log('Looks good');
