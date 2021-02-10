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