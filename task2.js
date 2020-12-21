const enemy = {
  name: 'Bob',
};

const friend = {
  name: 'Alex',
};

const me = friend;

me.name = 'Bob';

/* 
  Объекты friend и me ссылаются на один и тот же объект
  Изменив значение свойства name объекта me, оно изменится и в объекте friend
  Занчит в консоли выведет 'Bob'
*/
console.log(friend.name); //Bob
/*
  Me и friend ссылаются на один и тот же объект, а значит они одинаковые
  Результатом будет true
*/
console.log(me === friend);
/*
  me и enemy ссылаются на два разных объекта 
*/
console.log(me == enemy);
