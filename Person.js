class Person {
  //TODO: Make constant
  static GENDER = {
    NOT_DEFINED: 0,
    MAN: 1,
    WOMAN: 2,
  };

  #gender = Person.GENDER.NOT_DEFINED;

  constructor(name = 'NoName', gender) {
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
  constructor(message) {
    super(message);
  }
}

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
          if (target[prop]) {
            target.#log.push(`${prop}: ${target[prop]} -> ${value}`);
          }
          return Reflect.set(target, prop, value);
        }
        return true;
      },
    });
    return Object.seal(proxy);
  }

  get log() {
    return this.#log.length ? this.#log : 'no logs yet';
  }
}
