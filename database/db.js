const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const connectToDB = () => {
  try {
    const uri = process.env.ATLAS_KEY;

    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Connect to MongoDB Atlas
    client.connect();
    console.log('Connected to MongoDB Atlas');

    // Return the connected client for reuse in other parts of the application
    return client;
  } catch (error) {
    console.log(error);
    // throw error;
  }
};

module.exports = connectToDB;
