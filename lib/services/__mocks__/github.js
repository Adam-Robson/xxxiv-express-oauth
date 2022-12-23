const exchangeCodeForToken = async () => {
  const adam = await 'ADAM';
  return adam;
};

const getGithubProfile = async () => {
  return { email: 'example@example.com', login: 'github_user', avatar_url: 'https://www.placekitten.com/300/300' };
};

module.exports = { exchangeCodeForToken, getGithubProfile };
