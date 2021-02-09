const input = document.querySelector('input');
const button = document.querySelector('button');
const autocomplete = document.querySelector('.autocomplete__items');
let autocompleteItems;

const debounce = (fn, delay = 1000) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};
const getUsers = async (login) => {
  const { data } = await axios.get(`https://api.github.com/search/users`, {
    params: {
      q: login,
      per_page: 5,
    },
  });
  return data.items;
};

const getUser = async (login) => {
  const { data } = await axios.get(`https://api.github.com/users/${login}`);

  return data;
};

const getFollowers = async (followers_url) => {
  const { data } = await axios.get(followers_url);
  return data;
};

const getRepositories = async (repos_url) => {
  const { data } = await axios.get(repos_url);
  return data;
};

const renderAutocomplete = (users, inputVal) => {
  users.map(({ login }) => {
    if (
      login.substr(0, inputVal.length).toUpperCase() === inputVal.toUpperCase()
    ) {
      autocomplete.innerHTML += `<p>${login}</p>`;
    }
  });
};

const renderRepositories = async (url) => {
  const repos = await getRepositories(url);
  const reposBlock = document.querySelector('.repos');
  reposBlock.innerHTML = '';
  repos.length
    ? repos.map(
        (el) =>
          (reposBlock.innerHTML += `
      <a href='${el.html_url}' target='blank'>
        <div class='repos__card'>
          <p class='repos__card-title'>${el.name}</p>
          <p class='repos__card-desc'>${el.description || 'no description'}</p>
        </div>
      </a>
      `)
      )
    : (reposBlock.innerHTML = 'no repos');
};

const renderFollowers = async (url) => {
  const followers = await getFollowers(url);
  const followersBlock = document.querySelector('.followers');
  followersBlock.innerHTML = '';
  followers.length
    ? followers.map(
        (el) =>
          (followersBlock.innerHTML += `
  <a href='${el.html_url}' target='blank'>
    <div class='followers__card'>
      <img src='${el.avatar_url}'/>
      <p class='followers__login'>${el.login}</p>
    </div>
  </a>
  `)
      )
    : (followersBlock.innerHTML = 'no followers');
};

const handleAutocompleteClick = () => {
  document.querySelectorAll('.autocomplete__items p').forEach((el) => {
    el.addEventListener('click', async (e) => {
      renderProfile(e.target.innerText);
    });
  });
};

input.addEventListener(
  'input',
  debounce(async (e) => {
    console.log('call');
    autocomplete.innerHTML = '';
    if (e.target.value.length > 0) {
      const users = await getUsers(e.target.value);
      if (users.length) {
        autocomplete.style.display = 'block';
        renderAutocomplete(users, e.target.value);
        handleAutocompleteClick();
      }
    }
  }, 1000)
);

const renderProfile = async (login) => {
  document.querySelector('.profile').style.display = 'flex';

  const user = await getUser(login);
  input.value = '';
  await renderRepositories(user.repos_url);
  await renderFollowers(user.followers_url);
  setTimeout(() => {
    autocomplete.style.display = 'none';
  }, 200);
};

button.addEventListener('click', async () => {
  renderProfile(input.value);
});
