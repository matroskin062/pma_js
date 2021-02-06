const { Person, PersonLog, PersonGenderError } = require('./Person');

describe('Person class', () => {
  const p = new Person();

  it('GENDER object should be immutable', () => {
    Person.GENDER = { foo: 1 };
    Person.GENDER.A = 54;

    expect(Person.GENDER).toEqual({
      NOT_DEFINED: 0,
      MAN: 1,
      WOMAN: 2,
    });
  });

  it('should throw PersonGenderException on invalid values', () => {
    try {
      p.gender = 10;
    } catch (err) {
      expect(err).toBeInstanceOf(PersonGenderError);
    }
  });
});

describe('PersonLog Class', () => {
  const p = new PersonLog();

  it('should have logs array', () => {
    expect(p.log).toBeInstanceOf(Array);
  });

  it('should add new record to logs array if property changes correctly', () => {
    p.gender = 1;
    p.gender = 10;
    p.name = 'new name';
    expect(p.log).toEqual(['gender: 0 -> 1', 'name: NoName -> new name']);
  });

  it('should throws exception on invalid gender value', () => {
    try {
      p.gender = 10;
    } catch (e) {
      expect(e).toBeInstanceOf(PersonGenderError);
    }
  });
});
