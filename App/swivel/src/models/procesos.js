const mongoose = require('mongoose');

const procesoSchema = new mongoose.Schema({
  vendedor_id: {
    type: String,
    
  },
  tipo_proceso: {
    type: String,
  
  },
  documentos_url: {
    type: JSON,
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
}); 

const Proceso = mongoose.model('Proceso', procesoSchema, 'procesos'); // pass the collection name explicitly

module.exports = Proceso;
