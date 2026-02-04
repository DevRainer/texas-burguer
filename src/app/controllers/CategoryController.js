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
  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });
    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json({ error: 'Validation fails', messages: error.errors });
    }

    const { name } = request.body;
    
    const id = parseInt(request.params.id, 10);

    if (Number.isNaN(id) || id <= 0) {
      return response.status(400).json({ error: 'Invalid category ID' });
    }

    const category = await Category.findByPk(id);

    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    const existingCategory = await Category.findOne({
      where: {
        name,
      },
    });

    if (existingCategory && existingCategory.id !== category.id) {
      return response.status(400).json({ error: 'Category already exists' });
    }

    if (request.file) {
      category.path = request.file.filename;
    }

    await category.update({
      name,
      path: category.path,
    });

    return response.status(200).json({ category });
  }
  async index(_request, response) {
    const categories = await Category.findAll();
    return response.status(200).json(categories);
  }
}

export default new CategoryController();