const arr = [5, 7, 7, 8, 8, 10];
//2.1
const findFirstLastIndex = (arr, num) => {
  return [arr.indexOf(num), arr.lastIndexOf(num)];
};

const printFirstLastIndex = () => {
  console.clear();
  const index = Math.floor(+prompt('Input Index Value'));
  if (!parseInt(index)) {
    alert('Please Input Integer Number');
  } else {
    const arr = [5, 7, 7, 8, 8, 10];
    console.log('Array: ', arr);
    console.log(findFirstLastIndex(arr, index));
  }
};
//2.2
const intersection = (arr1, arr2) => {
  return arr1.filter((el) => arr2.includes(el));
};

const printIntersection = () => {
  console.clear();

  const arr1 = [1, 2, 2, 1];
  const arr2 = [2, 2];
  console.log('Arr1', arr1);
  console.log('Arr2', arr2);
  console.log('intersection: ', intersection(arr1, arr2));
};
//2.3
const insertArray = (arr1, arr2, idx) => {
  return arr1.slice(0, idx).concat(arr2).concat(arr1.slice(idx));
};

const printInsertArray = () => {
  console.clear();

  const arr1 = [1, 2, 3, 4, 5];
  const arr2 = [6, 7, 8];
  const idx = 1;
  console.log('Arr1', arr1);
  console.log('Arr2', arr2);
  console.log('Index: ' + idx);
  console.log('Result: ', insertArray(arr1, arr2, idx));
};

//2.4
const printArrSortedById = () => {
  console.clear();

  const res = data.sort((a, b) => b.id - a.id);
  console.log('Sorteed: ', res);
};

//2.4*
const printArrSortedByData = () => {
  console.clear();

  const res = data.sort(
    (a, b) =>
      new Date(b.registrationDate.substring(0, b.registrationDate.length - 7)) -
      new Date(a.registrationDate.substring(0, a.registrationDate.length - 7))
  );

  console.log('Sorted: ', res);
};
