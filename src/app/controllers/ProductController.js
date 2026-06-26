/** biome-ignore-all assist/source/organizeImports: null*/
import * as Yup from "yup";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
    });
    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Validation fails", messages: error.errors });
    }

    const { name, price, category_id, offer } = request.body;
    const filename = request.file?.filename || null;

    const newProduct = await Product.create({
      name,
      price,
      category_id,
      path: filename,
      offer,
    });

    return response.status(200).json({ newProduct });
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
    });
    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Validation fails", messages: error.errors });
    }

    const { name, price, category_id, offer } = request.body;
    const { id } = request.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return response.status(404).json({ error: "Product not found" });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (price !== undefined) updateData.price = price;
    if (category_id !== undefined) updateData.category_id = category_id;
    if (offer !== undefined) updateData.offer = offer;
    if (request.file) updateData.path = request.file.filename;

    if (Object.keys(updateData).length === 0) {
      return response.status(400).json({ error: "No fields to update" });
    }

    await Product.update(updateData, {
      where: {
        id,
      },
    });

    const updatedProduct = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    return response.status(200).json(updatedProduct);
  }
  async index(_request, response) {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });
    return response.status(200).json(products);
  }
}

export default new ProductController();
