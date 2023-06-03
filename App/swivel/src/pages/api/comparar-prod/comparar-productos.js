import dbConnect from "../../../config/dbConnect";
import { Client } from '@elastic/elasticsearch';

/* 
car comparison function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
    const client = new Client({
        node: ' https://swivelelastictest.es.us-east4.gcp.elastic-cloud.com/',
        auth: {
            apiKey: process.env.ELASTIC_API_KEY
        }
    })

    if(req.method === 'GET'){
        dbConnect();

        const { lst } = req.query;

        if(lst.length < 2 || lst.length > 3){
            return res.status(401).json({ message: 'Unsupported amount of cars' }); // <-- handle this part in front
        };

        try {
            const body = await client.search({
                index: 'autos',
                body: {
                  query: {
                    terms: {
                      _id: lst
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
  