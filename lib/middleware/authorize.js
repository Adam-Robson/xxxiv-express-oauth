module.exports = async (req, res, next) => {
  try {
    if (!req.user || req.user.email !== 'admin')
      throw new Error('This page has not been found');
    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
