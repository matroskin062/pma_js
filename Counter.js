class Counter {
  static #count = 0;

  callMe() {
    return Counter.#count++;
  }

  static callCount() {
    return this.#count;
  }
}

new Counter().callMe();
new Counter().callMe();
new Counter().callMe();
new Counter().callMe();
new Counter().callMe();

Counter.callCount();
