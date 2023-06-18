// Connecting to ElasticSearch with security disabled
const { Client } = require('@elastic/elasticsearch')
const { ELASTIC_API_KEY } = process.env

export default async function handler(req, res) {
  //const client = new Client({ node: 'http://localhost:9200' });
  if(req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const car = req.body.car;
  const agency_id = req.body.agency_id;
  const { ano, ...carWithoutAno } = car;

  const client = new Client({
      node: ' https://swivelelastictest.es.us-east4.gcp.elastic-cloud.com/',
      auth: {
          apiKey: ELASTIC_API_KEY
      }
  })

  try {
    await client.index({
      index: 'autos',
      body: {
        ...carWithoutAno,
        año: ano,
        agencia_id: agency_id
      }
    });

    res.status(200).json({ message: 'Car uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading car' });
  }
};
