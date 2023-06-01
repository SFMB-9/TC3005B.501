const { Client } = require('@elastic/elasticsearch');

export default async (req, res) => {
  if (req.method !== 'DELETE') {
    res.status(405).json({ message: 'Method not allowed' });
  }
  
  const client = new Client({
    node: ' https://swivelelastictest.es.us-east4.gcp.elastic-cloud.com/',
    auth: {
      apiKey: 'blpSdGFvZ0I2RmMxNy1oMFJjQUw6WER6UHc0T3BTUnlld0lzWUEwRzFTQQ=='
    }
  })

  const auto_id = req.query.auto_id;

  try {
    await client.delete({
      index: 'autos',
      id: auto_id
    });

    return res
      .status(200)
      .json({
          message: "Auto borrado exitosamente"
      });
    
  } catch (error) {
    res.status(500).json({ error: 'Error borrando auto' , message: error.message});
  }
};