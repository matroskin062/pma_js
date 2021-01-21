//1.1
const hash = data.reduce((obj, item) => {
  obj[item.id] = item;
  return obj;
}, {});

//1.2
const getUserData = (id) => {
  return hash[id] ? hash[id] : 'no such user';
};

const printUserData = () => {
  console.clear();
  const id = prompt('Input ID:');
  if (!id.trim()) {
    alert('Please Input Id:');
  } else console.log(getUserData(id));
};

//1.3
const getUserAddress = (id) => {
  return getUserData(id)?.address || 'no such user';
};

const printAddress = () => {
  console.clear();

  const id = prompt('Input ID:');
  if (!id.trim()) {
    alert('Please Input Id:');
  } else console.log(getUserAddress(id));
};

//1.4
const getCompanyEmployeers = (company) => {
  const employeers = [...Object.values(hash)].filter((el) => {
    const {
      company: { name },
    } = el;
    return company === name;
  });
  return employeers.length ? employeers : 'no employeers in this company';
};

const printCompanyEmployeers = () => {
  console.clear();

  const company = prompt('Input Company Name:');
  if (!company.trim()) {
    alert('Please Input Company Name:');
  } else console.log(getCompanyEmployeers(company));
};

//1.5-1.6
const phoneShadow = Symbol('phone');
[...Object.values(hash)].map((el) => {
  Object.defineProperties(el, {
    id: {
      writable: false,
      configurable: false,
    },
    [phoneShadow]: { writable: true, value: el.phone },
    phone: {
      get: function () {
        return this[phoneShadow];
      },
      set: function (value) {
        if (
          !value.toString().match(/\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/g)
        ) {
          console.log('Wrong phone number format!');
        } else {
          this[phoneShadow] = value;
        }
      },
    },
  });
});

const tryToChangePhoneNumber = () => {
  console.clear();

  const invalidPhone = '050 877-77-77';
  const correctPhone = '(050) 877-77-77';
  console.log(`hash[1].phone: ${JSON.stringify({ phone: hash[1].phone })}`);
  console.log('==================================');
  console.log('Atempt to assign wrong number format');
  hash[1].phone = invalidPhone;
  console.log(`hash[1].phone: ${JSON.stringify({ phone: hash[1].phone })}`);
  console.log('==================================');

  console.log('Atempt to assign correct number format');
  hash[1].phone = correctPhone;
  console.log(`hash[1].phone: ${JSON.stringify({ phone: hash[1].phone })}`);
};

const tryToMutateDeleteId = () => {
  console.clear();
  console.log(`hash[1].id: ${JSON.stringify({ id: hash[1].id })}`);
  console.log('Atempt to delete and mutate id proprety');
  console.log('delete hash[1].id');
  delete hash[1].id;
  console.log('hash[1].id = 54');
  hash[1].id = 54;
  console.log(`hash[1].id: ${JSON.stringify({ id: hash[1].id })}`);
};
