import moongose from 'moongose';

// Create a Mongoose schema
const saleCreationSchema = new moongose.Schema({
    array_documentos: { type: Array, required: true },
    auto_id: { type: Number, required: true },
    usuario_final_id: { type: Number, required: true },
    vendedor_id: { type: Number, required: true },
    chat_id: { type: Number, required: true },
});

// Create a Mongoose model
const SaleCreation = moongose.model('SaleCreation', saleCreationSchema);

const handler = async (req, res) => {
    // Receive details of the purchase and manager ID
    const { arrayDocumentos, autoId, usuarioFinalId, chatId, sellerId } = req.body;

    // Connect to the MongoDB database using Mongoose
    await moongose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        // Create the purchase
        await SaleCreation.create({
            array_documentos: arrayDocumentos,
            auto_id: autoId,
            usuario_final_id: usuarioFinalId,
            vendedor_id: sellerId,
            chat_id: chatId,
        });

        // Respond with a success message
        res.status(200).json({ message: 'Compra creada' })
    } catch (error) {
        console.error(error);
        // Respond with an error message
        res.status(500).json({ message: 'Hubo un error al crear la compra' });
    } finally {
        // Close the Mongoose connection
        await mongoose.disconnect();
    }
};

export default handler;

