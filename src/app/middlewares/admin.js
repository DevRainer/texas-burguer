const adminMiddleware = (req, res, next) => {
  const isUserAdmin = req.userAdmin;

  if (!isUserAdmin) {
    return res.status(401).json();
  }

  return next();
};

export default adminMiddleware;
