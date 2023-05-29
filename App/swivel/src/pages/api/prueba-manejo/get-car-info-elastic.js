/* 
Diego Corrales Pinedo
19/5/2023

Endpoint to get all the data
of a given car in the elastic db.
*/

const { Client } = require('@elastic/elasticsearch');

export default async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
  }
  
  const client = new Client({ node: 'http://localhost:9200' });

  const auto_id = req.query.auto_id;

  try {
    const auto = await client.get({
      index: 'autos',
      id: auto_id
    });

    return res
      .status(200)
      .json({
            auto,
            message: "Se ha encontrado el auto"
      });
    
  } catch (error) {
    res.status(500).json({ error: 'Error encontrando auto' , message: error.message});
  } finally {
    client.close();
  }
};