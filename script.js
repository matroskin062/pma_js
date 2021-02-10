const input = document.querySelector('input');
const button = document.querySelector('button');
const autocomplete = document.querySelector('.autocomplete__items');

const renderAutocomplete = (users, inputVal) => {
  users.map(({ login }) => {
    if (
      login.substr(0, inputVal.length).toUpperCase() === inputVal.toUpperCase()
    ) {
      autocomplete.innerHTML += `<p>${login}</p>`;
    }
  });
};

const repo = (el) => {
  return `
      <a href='${el.html_url}' target='blank'>
        <div class='repos__card'>
          <p class='repos__card-title'>${el.name}</p>
          <p class='repos__card-desc'>${el.description || 'no description'}</p>
        </div>
      </a>
      `
}

const renderRepositories = async (url) => {
  const repos = await getRepositories(url);
  const reposBlock = document.querySelector('.repos');
  reposBlock.innerHTML = '';
  repos.length
    ? repos.map(
        (el) =>
          (reposBlock.innerHTML += repo(el))
      )
    : (reposBlock.innerHTML = 'no repos');
};

const follower = (el) => {
  return `
    <a href='${el.html_url}' target='blank'>
      <div class='followers__card'>
        <img src='${el.avatar_url}' alt="${el.login}"/>
        <p class='followers__login'>${el.login}</p>
      </div>
    </a>
  `
}

const renderFollowers = async (url) => {
  const followers = await getFollowers(url);
  const followersBlock = document.querySelector('.followers');
  followersBlock.innerHTML = '';
  followers.length
    ? followers.map(
        (el) =>
          (followersBlock.innerHTML += follower(el))
      )
    : (followersBlock.innerHTML = 'no followers');
};

const renderProfile = async (login) => {
  try {
    const user = await getUser(login);
    input.value = '';
    document.querySelector('.no-user').style.display = 'none';
    document.querySelector('.profile').style.display = 'flex';
    await renderRepositories(user.repos_url);
    await renderFollowers(user.followers_url);
  }catch (e){
    document.querySelector('.no-user').style.display = 'block';
  }
  autocomplete.style.display = 'none';
};

const handleAutocompleteClick = () => {
  [...document.querySelectorAll('.autocomplete__items p')].map((el) => {
    el.addEventListener('click',  async (e) => {
      await renderProfile(e.target.innerText);
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
  }, 500)
);

button.addEventListener('click', async () => {
  await renderProfile(input.value);
});
