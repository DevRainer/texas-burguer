import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

const authMiddleware = (req, res, next) => {
  const autToken = req.headers.authorization;

  if (!autToken) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const token = autToken.split(' ')[1];

  try {
    jwt.verify(token, authConfig.secret, (error, decoded) => {
      if (error) {
        throw new Error();
      }

      req.userId = decoded.id;
      req.userName = decoded.name;
      req.userAdmin = decoded.admin;
    });
  } catch (_erro) {
    return res.status(401).json({ error: 'Token invalid' });
  }
  return next();
};

export default authMiddleware;
