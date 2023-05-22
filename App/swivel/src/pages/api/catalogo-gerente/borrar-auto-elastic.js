const { Client } = require('@elastic/elasticsearch');

export default async (req, res) => {
  if (req.method !== 'DELETE') {
    res.status(400).json({ message: 'Method not allowed' });
  }
  
  const client = new Client({ node: 'http://localhost:9200' });

  const auto_id = req.query.auto_id;

  try {
    await client.delete({
      index: 'autos',
      id: auto_id
    });

    // res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    // res.setHeader('Pragma', 'no-cache');
    // res.setHeader('Expires', '0');

    return res
      .status(200)
      .json({
          message: "Auto borrado exitosamente"
      });
    
  } catch (error) {
    res.status(500).json({ error: 'Error borrando auto' , message: error.message});
  }
};