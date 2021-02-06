class PersonGenderError extends Error {
  constructor(message = 'Invalid gender value') {
    super(message);
  }
}

class Person {
  static GENDER = {
    NOT_DEFINED: 0,
    MAN: 1,
    WOMAN: 2,
  };

  #gender = Person.GENDER.NOT_DEFINED;

  constructor(name = 'NoName', gender) {
    this.name = name;
    this.gender = gender;
  }

  get gender() {
    return this.#gender;
  }

  set gender(genderVal) {
    try {
      if (Object.values(Person.GENDER).includes(genderVal)) {
        this.#gender = genderVal;
      } else {
        throw new PersonGenderError();
      }
    } catch (e) {
      console.log(e.message);
    }
  }
}

Object.freeze(Person);
Object.freeze(Person.GENDER);

class PersonLog extends Person {
  #log = [];

  constructor(name, gender) {
    super(name, gender);

    const proxy = new Proxy(this, {
      get: function (target, prop) {
        return Reflect.get(target, prop);
      },
      set(target, prop, newVal) {
        if (Reflect.has(target, prop)) {
          const oldVal = target[prop];
          Reflect.set(target, prop, newVal);
          target.#addToLog(prop, oldVal, newVal);
        }
      },
    });

    return Object.seal(proxy);
  }

  #addToLog(prop, oldVal, newVal) {
    if (this[prop] !== oldVal && prop !== 'log') {
      this.#log.push(`${prop}: ${oldVal} -> ${newVal}`);
    }
  }

  get log() {
    return this.#log;
  }
}

const p = new PersonLog();
p.name = 'new name';
console.log(p);
module.exports = { Person, PersonLog, PersonGenderError };
