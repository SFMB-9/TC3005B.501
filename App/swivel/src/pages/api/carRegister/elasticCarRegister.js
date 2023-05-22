const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

//uploads a car to elastic
async function uploadCar(car) {
    try {
      const response = await client.index({
        index: 'cars',
        body: car
      });
      console.log('Car uploaded successfully:', response);
    } catch (error) {
      console.error('Error uploading car:', error);
    }
  };
  
  export default uploadCar;