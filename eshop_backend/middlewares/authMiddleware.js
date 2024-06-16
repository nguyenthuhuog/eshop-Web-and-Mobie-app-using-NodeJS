const authMiddleware = (req, res, next) => {
  console.log('checking auth: ', req.session);
    if (req.session && req.session.userId) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
  
const adminMiddleware = (req, res, next) => {
  if (!(req.session && req.session.userId))
    res.status(401).json({ message: 'Unauthorized' });
  else if (!req.session.isAdmin) {
    res.status(403).json({ message: 'Forbidden' });
  } else {
    next();
  }
};

module.exports = {
authMiddleware,
adminMiddleware
};
