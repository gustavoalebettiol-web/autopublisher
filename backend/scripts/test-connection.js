const mongoose = require('mongoose');
require('dotenv').config();

async function test() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI no definido en .env');
    process.exit(1);
  }
  try {
    await mongoose.connect(uri);
    console.log('Conectado a MongoDB correctamente. Base de datos:', mongoose.connection.name);
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Colecciones existentes:', collections.map(c=>c.name));
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error conectando a MongoDB:', err.message || err);
    process.exit(1);
  }
}

test();
