import mongoose from "mongoose";

// Define the seller schema
const sellerSchema = new mongoose.Schema({
  vendedor_id: { type: Number, required: true },
  gerente_id: { type: Number, required: true },
  ventas_en_proceso: { type: Number, required: true },
  ventas_concluidas: { type: Number, required: true },
});

// Create the seller model
const Seller = mongoose.model("Seller", sellerSchema);

const handler = async (req, res) => {
  // Receive details of the purchase and manager ID
  const { gerente_id } = req.body;

  // Connect to the MongoDB database using Mongoose
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Find the seller with the lowest number of unfinished sales under the given manager ID
    const result = await Seller.find({
      gerente_id: gerente_id,
      ventas_en_proceso: { $exists: true, $lt: Infinity },
    })
      .sort({ ventas_en_proceso: 1 })
      .limit(1, { _id: 0, id: 1 })
      .lean()
      .exec();
    const sellerId = result[0].id;

    // Update the seller's document to reflect the new purchase
    await Seller.updateOne(
      { id: sellerId },
      { $inc: { ventas_en_proceso: 1 } }
    );

    // Respond with a success message
    res
      .status(200)
      .json({ message: "Compra asignada correctamente", sellerId });
  } catch (error) {
    console.error(error);
    // Respond with an error message
    res.status(500).json({ message: "Hubo un error al asignar la compra" });
  } finally {
    // Close the Mongoose connection
    await mongoose.disconnect();
  }
};

export default handler;
