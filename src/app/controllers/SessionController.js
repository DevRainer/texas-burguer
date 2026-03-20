/** biome-ignore-all assist/source/organizeImports: null*/
import authConfig from '../../config/auth.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User.js';

class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    try {
      await schema.validate(request.body, { abortEarly: false, strict: true });

      const { email, password } = request.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return response.status(401).json({ error: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash,
      );

      if (!isPasswordValid) {
        return response.status(401).json({ error: 'Invalid password' });
      }

      const token = jwt.sign(
        {
          id: user.id,
          admin: user.admin,
          name: user.name,
        },
        authConfig.secret,
        {
          expiresIn: authConfig.expiresIn,
        },
      );

      return response.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        token,
      });
    } catch (_error) {
      return response.status(400).json({ error: 'Email or password invalid' });
    }
  }
}

export default new SessionController();
