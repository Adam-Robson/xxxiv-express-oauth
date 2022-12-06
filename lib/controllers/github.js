const { Router } = require('express');

module.exports = Router().get('/login', (req, res) => {
  res.redirect(`https://github.cpm/login/oauth/authotize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
  );
});
