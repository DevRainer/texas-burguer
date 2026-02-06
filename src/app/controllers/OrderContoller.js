
class OrderController {
  async store(request, response) {
    // const schema = Yup.object({
    //   name: Yup.string().required(),
    //   price: Yup.number().required(),
    //   category_id: Yup.string().required(),
    //   offer: Yup.boolean(),
    // });
    // try {
    //   schema.validateSync(request.body, { abortEarly: false });
    // } catch (error) {
    //   return response.status(400).json({ error: 'Validation fails', messages: error.errors });
    // }

    // const { name, price, category_id, offer} = request.body;
    // const { filename } = request.file;


    return response.status(200).json();
  }
}

export default new OrderController();
