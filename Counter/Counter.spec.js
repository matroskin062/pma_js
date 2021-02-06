const Counter = require('./Counter');

describe('Counter class', () => {
  const instance1 = new Counter();
  const instance2 = new Counter();
  const instance3 = new Counter();

  it('should increment counter', () => {
    instance1.callMe();
    expect(Counter.callCount()).toBe(1);
  });

  it('should increment counter on each instance', () => {
    instance2.callMe();
    instance3.callMe();
    expect(Counter.callCount()).toBe(3);
  });
});
