import { AgencyEntity } from "@/models/user";
import dbConnect from "@/config/dbConnect";

/* 
Creates agency
@Recieves: request object, response object
    Recieves following fields in request body:
    {
        is_account_verified: Boolean,
        documentos_requeridos_compra: Array,
        horas_min: Number,
        dias_anticipo: Number,
        dias_max: Number,
        grupo_automotriz_id: String,
        horas_max: Number,

        //registro-direccion
        direccion: {
        calle: String,
        numero_exterior: String,
            numero_interior: String,
            ciudad: String,
            estado: String,
            pais: String,
            codigo_postal: String,
        },
    
        url_agencia: String,
        coordenadas_agencia: {
            location: {
                type: {
                    type: String, // Don't do `{ location: { type: String } }`
                    enum: ['Point'], // 'location.type' must be 'Point'
                    required: true
                },
                coordinates: {
                    type: [Number],
                    required: true
                }
            }
        },
    }
@Returns: response status and json
*/

export default async function handler(req, res) {
  if (req.method === "POST") {
    dbConnect();

    const { agency } = req.body;

    const newAgency = new AgencyEntity(agency);

    newAgency.save((err, agency) => {
      if (err) {
        res.status(500).json({ message: "Error al crear la agencia" });
      } else {
        res
          .status(200)
          .json({ message: "Agencia creada exitosamente", agency: agency });
      }
    });
  } else {
    res.status(405).json({ message: "Wrong request method" });
  }
}
