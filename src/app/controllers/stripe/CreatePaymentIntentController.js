import dotenv from "dotenv";
import Stripe from "stripe";
import * as Yup from "yup";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20", // sempre defina a versão da API
});

// Item prices already come in cents, the same unit Stripe expects.
const calculateOrderAmount = (items, deliveryTax) => {
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  return Math.round(total + deliveryTax);
};

class CreatePaymentIntentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      deliveryTax: Yup.number().min(0).default(0),
      items: Yup.array()
        .required()
        .of(
          Yup.object().shape({
            id: Yup.number().required(),
            name: Yup.string().required(),
            price: Yup.number().required(),
            quantity: Yup.number().required(),
          }),
        ),
    });

    try {
      const { items, deliveryTax } = await schema.validate(req.body);

      const orderAmount = calculateOrderAmount(items, deliveryTax);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: orderAmount,
        currency: "brl", // Use the appropriate currency code
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return res.json({ 
        clientSecret: paymentIntent.client_secret,
        dpmCheckerLink: `https://dashboard.stripe.com/test/dpm_checker/${paymentIntent.id}`
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new CreatePaymentIntentController();
