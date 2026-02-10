/** biome-ignore-all assist/source/organizeImports: null*/
import * as Yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';


class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.string().required(),
      offer: Yup.boolean(),
    });
    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (error) {
      return response
        .status(400)
        .json({ error: 'Validation fails', messages: error.errors });
    }

    const { name, price, category_id, offer} = request.body;
    const { filename } = request.file;

    const newProduct = await Product.create({
      name,
      price,
      category_id,
      path: filename,
      offer,
    });

    return response.status(200).json({newProduct});
  }

   async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.string(),
      offer: Yup.boolean(),
    });
    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (error) {
      return response
        .status(400)
        .json({ error: 'Validation fails', messages: error.errors });
    }

    const { name, price, category_id, offer} = request.body;
    const { id } = request.params;
    let path
    if (request.file) {
    const { filename } = request.file;
    path = filename;
    }


  await Product.update({
      name,
      price,
      category_id,
      path,
      offer,
    },
    { where: { 
      id,
    },
    },
  );
    return response.status(201).json();
  }
  async index(_request, response) {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['name'],
        },
      ],
    });
    return response.status(200).json(products);
  }
}

export default new ProductController();

