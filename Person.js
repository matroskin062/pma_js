class Person {
  static GENDER = {
    NOT_DEFINED: 0,
    MAN: 1,
    WOMAN: 2,
  };
  name = 'NoName';
  gender = Person.GENDER.NOT_DEFINED;

  constructor(name, gender) {
    if (!Object.values(Person.GENDER).includes(gender)) {
      throw new PersonGenderError();
    }
    this.name = name;
    this.gender = gender;
  }
}

class PersonGenderError extends Error {
  #log = [];

  constructor(message) {
    super(message);
    this.name = 'PersonGenderError';
  }
}

class PersonLog extends Person {}
