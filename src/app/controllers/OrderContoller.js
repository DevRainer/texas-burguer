/** biome-ignore-all assist/source/organizeImports: null*/
import Category from "../models/Category.js";
import Order from "../schemas/Order.js";
import Product from "../models/Product.js";
import OrderStatusService from "../services/OrderStatusService.js";

class OrderController {
  async store(request, response) {
    const { userId, userName } = request;
    const { product: productsRequest, paymentIntentId } = request.body;

    if (!productsRequest || !Array.isArray(productsRequest)) {
      return response.status(400).json({
        error: "Validation fails",
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
            as: "category",
            attributes: ["name"],
          },
        ],
      });

      if (products.length === 0) {
        return response.status(404).json({
          error: "Products not found",
          message: "No products were found with the provided IDs",
        });
      }

      // Create a map for easy lookup
      const productsMap = {};
      products.forEach((p) => {
        productsMap[p.id] = p;
      });

      // Build the order products array with details
      const orderProducts = productsRequest
        .filter((p) => productsMap[p.id])
        .map((p) => {
          const productData = productsMap[p.id];
          return {
            id: productData.id,
            name: productData.name,
            category: productData.category?.name || "Uncategorized", // Assuming category_id is an object with a name property
            price: productData.price / 100, // Convert from cents to reais
            quantity: p.quantity,
            url: productData.url,
          };
        });

      // Calculate total price
      const total = orderProducts.reduce((sum, p) => {
        return sum + p.price * p.quantity;
      }, 0);

      const orderData = {
        user: {
          id: userId,
          name: userName,
        },
        products: orderProducts,
        total: Math.round(total * 100) / 100, // Round to 2 decimal places
        status: "pending",
        ...(paymentIntentId ? { paymentIntentId } : {}),
      };
      const order = await Order.create(orderData);

      return response.status(201).json({
        message: "Order created successfully",
        order,
      });
    } catch (error) {
      return response.status(500).json({
        error: "Error creating order",
        details: error.message,
      });
    }
  }

  async index(_request, response) {
    try {
      const orders = await Order.find();
      return response.status(200).json(orders);
    } catch (error) {
      return response.status(500).json({
        error: "Error fetching orders",
        details: error.message,
      });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;
      const order = await Order.findById(id);

      if (!order) {
        return response.status(404).json({ error: "Order not found" });
      }

      return response.status(200).json(order);
    } catch (error) {
      return response.status(500).json({
        error: "Error fetching order",
        details: error.message,
      });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const order = await Order.findById(id);

      if (!order) {
        return response.status(404).json({ error: "Order not found" });
      }

      // Apply updates from request body
      Object.assign(order, request.body);
      await order.save();

      return response.status(200).json(order);
    } catch (error) {
      return response.status(500).json({
        error: "Error updating order",
        details: error.message,
      });
    }
  }

  async updateStatus(request, response) {
    try {
      const { id } = request.params;
      const { status } = request.body;

      if (!status) {
        return response.status(400).json({
          error: "Validation fails",
          messages: ['The "status" field is required'],
        });
      }

      const order = await OrderStatusService.updateStatus(id, status);

      return response.status(200).json({
        message: "Order status updated successfully",
        order,
        statusLabel: OrderStatusService.getStatusLabel(status),
      });
    } catch (error) {
      const statusCode = error.message === "Order not found" ? 404 : 400;
      return response.status(statusCode).json({
        error: "Error updating order status",
        details: error.message,
      });
    }
  }

  async advanceStatus(request, response) {
    try {
      const { id } = request.params;

      const order = await OrderStatusService.advanceStatus(id);

      return response.status(200).json({
        message: "Order status advanced successfully",
        order,
        statusLabel: OrderStatusService.getStatusLabel(order.status),
      });
    } catch (error) {
      const statusCode = error.message === "Order not found" ? 404 : 400;
      return response.status(statusCode).json({
        error: "Error advancing order status",
        details: error.message,
      });
    }
  }

  async getStatusLabels(_request, response) {
    try {
      const labels = OrderStatusService.getAllStatusLabels();
      const validStatuses = OrderStatusService.getValidStatuses();

      return response.status(200).json({
        labels,
        validStatuses,
      });
    } catch (error) {
      return response.status(500).json({
        error: "Error fetching status labels",
        details: error.message,
      });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const order = await Order.findById(id);

      if (!order) {
        return response.status(404).json({ error: "Order not found" });
      }

      await Order.deleteOne({ _id: id });
      return response
        .status(200)
        .json({ message: "Order deleted successfully" });
    } catch (error) {
      return response.status(500).json({
        error: "Error deleting order",
        details: error.message,
      });
    }
  }
}

export default new OrderController();
