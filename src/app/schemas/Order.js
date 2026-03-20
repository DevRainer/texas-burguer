import mongoose from 'mongoose';

// Status constants and mappings
export const ORDER_STATUS = {
  PENDING: 'pending',
  ORDER_PLACED: 'Order Placed',
  PREPARING: 'Preparing Order',
  ON_THE_WAY: 'On the Way',
  DELIVERED: 'Delivered',
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Pendente',
  [ORDER_STATUS.ORDER_PLACED]: 'Pedido realizado',
  [ORDER_STATUS.PREPARING]: 'Pedido em preparo',
  [ORDER_STATUS.ON_THE_WAY]: 'Pedido a caminho',
  [ORDER_STATUS.DELIVERED]: 'Pedido entregue',
};

export const VALID_ORDER_STATUSES = Object.values(ORDER_STATUS);

const OrderSchema = new mongoose.Schema(
  {
    user: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    products: [
      {
        id: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Order', OrderSchema);
