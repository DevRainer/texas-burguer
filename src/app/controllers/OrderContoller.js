import Category from '../models/Category.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

class OrderController {
  async store(request, response) {
    const { userId, userName } = request;
    const { product: productsRequest } = request.body;

    if (!productsRequest || !Array.isArray(productsRequest)) {
      return response.status(400).json({
        error: 'Validation fails',
        messages: ['The "product" field is required and must be an array'],
      });
    }

    try {
      // Fetch all products from database based on the IDs provided
      const productIds = productsRequest.map((p) => p.id);
      const products = await Product.findAll({
        where: {
          id: productIds,
        },
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['name'],
          },
        ],
      });

      if (products.length === 0) {
        return response.status(404).json({
          error: 'Products not found',
          message: 'No products were found with the provided IDs',
        });
      }

      // Create a map for easy lookup
      const productsMap = {};
      products.forEach((p) => {
        productsMap[p.id] = p;
      });

      // Build the order products array with details
      const orderProducts = productsRequest.map((p) => {
        const productData = productsMap[p.id];
        return {
          id: productData.id,
          name: productData.name,
          category: productData.category?.name || 'Uncategorized', // Assuming category_id is an object with a name property
          price: productData.price / 100, // Convert from cents to reais
          quantity: p.quantity,
          url: productData.url,
        };
      });

      // Calculate total price
      const total = orderProducts.reduce((sum, p) => {
        return sum + (p.price * p.quantity);
      }, 0);

      const orderData = {
        user: {
          id: userId,
          name: userName,
        },
        products: orderProducts,
        total: Math.round(total * 100) / 100, // Round to 2 decimal places
        status: 'pending',
      };

      return response.status(201).json({
        message: 'Order created successfully',
        order: orderData,
      });
    } catch (error) {
      return response.status(500).json({
        error: 'Error creating order',
        details: error.message,
      });
    }
  }

  async index(_request, response) {
    try {
      const orders = await Order.findAll();
      return response.status(200).json(orders);
    } catch (error) {
      return response.status(500).json({
        error: 'Error fetching orders',
        details: error.message,
      });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;
      const order = await Order.findByPk(id);

      if (!order) {
        return response.status(404).json({ error: 'Order not found' });
      }

      return response.status(200).json(order);
    } catch (error) {
      return response.status(500).json({
        error: 'Error fetching order',
        details: error.message,
      });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const order = await Order.findByPk(id);

      if (!order) {
        return response.status(404).json({ error: 'Order not found' });
      }

      await order.update(request.body);
      return response.status(200).json(order);
    } catch (error) {
      return response.status(500).json({
        error: 'Error updating order',
        details: error.message,
      });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const order = await Order.findByPk(id);

      if (!order) {
        return response.status(404).json({ error: 'Order not found' });
      }

      await order.destroy();
      return response.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      return response.status(500).json({
        error: 'Error deleting order',
        details: error.message,
      });
    }
  }
}

export default new OrderController();

