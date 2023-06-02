import { BuyerUser } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";
import { encryptRole } from "../../../utils/crypto";
import { Client } from '@elastic/elasticsearch';


/* 
buyer wishlist retrieval function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
    const client = new Client({
        node: ' https://swivelelastictest.es.us-east4.gcp.elastic-cloud.com/',
        auth: {
            apiKey: ELASTIC_API_KEY
        }
    })

    if(req.method === 'GET'){
        dbConnect();

        const { id } = req.query;

        const e_role = encryptRole("user")

        try {
            const result = await BuyerUser.findOne({ tipo_usuario: e_role, _id: id }, "lista_deseos");
            const wishlist = result.lista_deseos;

            const { body } = await client.search({
                index: 'autos',
                body: {
                  query: {
                    ids: {
                      values: wishlist
                    }
                  }
                }
              });

            const searchResults = body.hits.hits.map(hit => hit._source);
            
            res.status(200).json(searchResults);
        } 
        catch (error) {
            console.error('Error fetching data:', error);
            res.status(400).json({ error: 'An error occurred' });
        }
    }
    else {
        res.status(405).json({ message: "Wrong request method" });
    }
  }
  