const mongoose = require('mongoose');

// Si no hay MONGO_URI, arrancamos un servidor Mongo en memoria (dev/testing)
const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;
    if (!uri) {
      console.log('MONGO_URI no configurado, intentando usar mongodb-memory-server...');
      try {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const mongod = await MongoMemoryServer.create();
        uri = mongod.getUri();
        connectDB._mongod = mongod;
        console.log('✓ MongoDB en memoria iniciado');
      } catch (memErr) {
        console.warn('⚠ mongodb-memory-server no disponible:', memErr.message);
        console.warn('⚠ Sin MONGO_URI y sin mongodb-memory-server, la app no puede conectar a BD');
        throw new Error('MONGO_URI no configurado y mongodb-memory-server no disponible');
      }
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      retryWrites: true,
    });
    console.log('✓ MongoDB conectado exitosamente');
  } catch (err) {
    console.error('✗ Error al conectar MongoDB:', err.message || err);
    process.exit(1);
  }
};

module.exports = connectDB;
