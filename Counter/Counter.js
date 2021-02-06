class Counter {
  static #count = 0;

  callMe() {
    return Counter.#count++;
  }

  static callCount() {
    return this.#count;
  }
}

module.exports = Counter;
