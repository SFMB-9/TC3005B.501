// Connecting to ElasticSearch with security disabled
const { Client } = require('@elastic/elasticsearch')
const { ELASTIC_API_KEY } = process.env

export default async function handler(req, res) {
  //const client = new Client({ node: 'http://localhost:9200' });
  if(req.method !== 'PUT') return res.status(405).json({ message: 'Method not allowed' });

  const car = req.body.car;
  const id = req.body.id;
  const { ano, ...carWithoutAno } = car;

  console.log("Car data in update: ");
  console.log(car);
  console.log("Car ID in update: ");
  console.log(id);

  const client = new Client({
      node: ' https://swivelelastictest.es.us-east4.gcp.elastic-cloud.com/',
      auth: {
          apiKey: ELASTIC_API_KEY
      }
  })

  try {
    await client.update({
      index: 'autos',
      id: id,
      body: {
        doc: {
          ...carWithoutAno,
          año: ano,
        }
      }
    });

    res.status(200).json({ message: 'Car uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading car', message: error.message });
  }
};
