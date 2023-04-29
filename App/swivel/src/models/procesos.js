const mongoose = require('mongoose');

const procesoSchema = new mongoose.Schema({
  vendedor_id: {
    type: String,
    
  },
  status: {
    type: String,
  },
  tipo_proceso: {
    type: String,
  
  },
  documentos: {
    type: Array,
  },
  auto: {
    type: JSON,
  },
  usuario_final_id: {
    type: String,
  },
  chat: {
    type: JSON,
  },
  _id: mongoose.Schema.Types.ObjectId,

}); 


module.exports = mongoose.models.Proceso || mongoose.model('Proceso', procesoSchema, 'procesos'); // pass the collection name explicitlyo;
