import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: {
    id: {
        type: string,
        required: true,
 },
    name: {
        type: string,
        required: true,
    },
},
  products: [
    {
        id: {
            type: string,
            required: true,
        },
        name: {
            type: string,
            required: true,
        },

        category: {
            type: string,
            required: true,
        },
        price: {
            type: number,
            required: true,
        },
        quantity: {
            type: number,
            required: true,
        },
        url: {
            type: string,
            required: true,
        },
    },
],

  total: {
    type: number,
    required: true,
  },
  status: {
    type: string,
    required: true,
  },
  
}, 
{
    timestamps: true
}
);

export default mongoose.model('Order', OrderSchema);
    