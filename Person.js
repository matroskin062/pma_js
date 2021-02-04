class Person {
  static GENDER = {
    NOT_DEFINED: 0,
    MAN: 1,
    WOMAN: 2,
  };

  #gender = Person.GENDER.NOT_DEFINED;

  constructor(name = 'NoName', gender = Person.GENDER.NOT_DEFINED) {
    this.name = name;
    this.#gender = gender;
  }

  get gender() {
    return this.#gender;
  }

  set gender(gender) {
    if (!Object.values(Person.GENDER).includes(gender)) {
      throw new PersonGenderError();
    }
    this.#gender = gender;
  }
}

class PersonGenderError extends Error {
  constructor(message = 'Invalid gender value') {
    super(message);
  }
}

console.log('====================================');
console.log('Person');
console.log('====================================');

const person = new Person();
person.gender = 1;
//works correct
console.log(person.gender);
//will throw exception
// person.gender = 10;

class PersonLog extends Person {
  #log = [];

  constructor(name, gender) {
    super(name, gender);
    const proxy = new Proxy(this, {
      get(target, prop) {
        return Reflect.get(target, prop);
      },
      set(target, prop, value) {
        if (target[prop] !== value) {
          if (target[prop] && prop !== 'log') {
            target.#log.push(`${prop}: ${target[prop]} -> ${value}`);
          }
          return Reflect.set(target, prop, value);
        }
      },
    });
    return Object.seal(proxy);
  }

  get log() {
    return this.#log.length ? this.#log : 'no logs yet';
  }
}

console.log('====================================');
console.log('Person with Logger');
console.log('====================================');

const personLog = new PersonLog();

personLog.name = 'foo';
personLog.name = 'bar';
personLog.name = 'baz';

personLog.gender = 0;
personLog.gender = 1;
personLog.gender = 2;
//will throw exception
// personLog.gender = 10;

//cannot add new properties
personLog.newProp = 'new';
//will print undefined
console.log(personLog.newProp);

console.log(personLog.log);
