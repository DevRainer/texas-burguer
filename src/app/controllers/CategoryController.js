import * as Yup from 'yup';
import Category from '../models/Category.js';


class CategoryController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      
    });
    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json({ error: 'Validation fails', messages: error.errors });
    }

    
    const { name } = request.body;
    const { filename } = request.file;

    const existingCategory = await Category.findOne({ where: { name,} });
    if (existingCategory) {
      return response.status(400).json({ error: 'Category already exists' });
    }   

    const newCategory = await Category.create({
      name,
       path: filename,
    });

    return response.status(200).json({newCategory});
  }

  async index(_request, response) {
    const categories = await Category.findAll();
    return response.status(200).json(categories);
  }
}

export default new CategoryController();
