/** biome-ignore-all assist/source/organizeImports: null*/
import Order from '../schemas/Order.js';
import {
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
  VALID_ORDER_STATUSES,
} from '../schemas/Order.js';

class OrderStatusService {
  /**
   * Get the Portuguese label for a given status
   * @param {string} status - The status in English
   * @returns {string} The Portuguese label
   */
  getStatusLabel(status) {
    return ORDER_STATUS_LABELS[status] || status;
  }

  /**
   * Get all valid statuses
   * @returns {string[]} Array of valid status values
   */
  getValidStatuses() {
    return VALID_ORDER_STATUSES;
  }

  /**
   * Get all status labels in Portuguese
   * @returns {Object} Object with status keys and Portuguese labels
   */
  getAllStatusLabels() {
    return ORDER_STATUS_LABELS;
  }

  /**
   * Validate if a status is valid
   * @param {string} status - The status to validate
   * @returns {boolean} True if valid, false otherwise
   */
  isValidStatus(status) {
    return VALID_ORDER_STATUSES.includes(status);
  }

  /**
   * Update order status asynchronously
   * @param {string} orderId - The order ID
   * @param {string} newStatus - The new status value
   * @returns {Promise<Object>} The updated order
   */
  async updateStatus(orderId, newStatus) {
    // Validate the new status
    if (!this.isValidStatus(newStatus)) {
      const validStatuses = VALID_ORDER_STATUSES.join(', ');
      throw new Error(
        `Invalid status: ${newStatus}. Valid statuses are: ${validStatuses}`,
      );
    }

    // Find the order
    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    // Update the status
    order.status = newStatus;
    await order.save();

    return order;
  }

  /**
   * Get the next status in the order progression
   * @param {string} currentStatus - The current status
   * @returns {string|null} The next status or null if already delivered
   */
  getNextStatus(currentStatus) {
    const statusOrder = [
      ORDER_STATUS.PENDING,
      ORDER_STATUS.ORDER_PLACED,
      ORDER_STATUS.PREPARING,
      ORDER_STATUS.ON_THE_WAY,
      ORDER_STATUS.DELIVERED,
    ];

    const currentIndex = statusOrder.indexOf(currentStatus);
    if (currentIndex === -1 || currentIndex === statusOrder.length - 1) {
      return null;
    }

    return statusOrder[currentIndex + 1];
  }

  /**
   * Advance order to the next status
   * @param {string} orderId - The order ID
   * @returns {Promise<Object>} The updated order
   */
  async advanceStatus(orderId) {
    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    const nextStatus = this.getNextStatus(order.status);

    if (!nextStatus) {
      throw new Error('Order has already reached the final status');
    }

    order.status = nextStatus;
    await order.save();

    return order;
  }
}

export default new OrderStatusService();
