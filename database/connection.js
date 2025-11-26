const mongoose = require('mongoose');

// Si no hay MONGO_URI, arrancamos un servidor Mongo en memoria (dev/testing)
const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;
    if (!uri) {
      console.log('MONGO_URI no configurado, arrancando MongoDB en memoria (mongodb-memory-server)');
      // Usamos mongodb-memory-server para desarrollo sin Docker
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
      // guardamos referencia para evitar GC accidental
      connectDB._mongod = mongod;
    }

    await mongoose.connect(uri, {
      // Aumentar timeout de selección de servidor para clusters remotos (Atlas)
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      // family: 4 // opcional: forzar IPv4 si hay problemas con DNS/IPv6
    });
    console.log('MongoDB conectado a', uri);
  } catch (err) {
    console.error('Error al conectar MongoDB:', err.message || err);
    process.exit(1);
  }
};

module.exports = connectDB;
