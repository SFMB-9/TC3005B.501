import { Client } from '@elastic/elasticsearch';
import { ELASTIC_API_KEY } from 'process.env';

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).json({ message: 'Method not allowed' });

  const id = req.query.id;

  const client = new Client({
    node: 'https://swivelelastictest.es.us-east4.gcp.elastic-cloud.com/',
    auth: {
      apiKey: ELASTIC_API_KEY
    }
  });

  try {
    const { body } = await client.get({
      index: 'autos',
      id: id
    });

    const updatedDocument = {
      ...body._source,
      visitas: (body._source.visitas || 0) + 1
    };

    await client.update({
      index: 'autos',
      id: id,
      body: {
        doc: updatedDocument
      }
    });

    res.status(200).json({ message: 'Car updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating car' });
  }
}
