/*  store -> criar um novo recurso
    Index -> listar vários recursos
    Show -> exibir um recurso específico
    Update -> atualizar um recurso
    Delete -> deletar um recurso
*/
import bcrypt from 'bcrypt';
import * as Yup from 'yup';
import User from '../models/User.js';

class UserController {
  async index(_request, response) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'admin'],
      });
      return response.json(users);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Error fetching users' });
    }
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      admin: Yup.boolean(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response
        .status(400)
        .json({ message: 'Validation failed', errors: err.errors });
    }

    try {
      const { name, email, password, admin } = request.body;
      console.log('Request body:', request.body);

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return response.status(400).json({ message: 'Email already taken' });
      }

      const password_hash = await bcrypt.hash(password, 6); // In a real app, hash the password before storing

      const user = await User.create({
        name,
        email,
        password_hash,
        admin,
      });

      console.log('User created:', user.toJSON());
      return response.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
      });
    } catch (error) {
      console.error(error);
      return response
        .status(400)
        .json({ message: error.message || 'Validation failed' });
    }
  }
}

export default new UserController();
