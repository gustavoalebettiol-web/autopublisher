const { app, connectDB, scheduler } = require('./app');

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  app.listen(PORT, () => console.log(`Servidor backend corriendo en puerto ${PORT}`));
  // Iniciar scheduler sólo después de que DB esté lista
  scheduler.start();
}

startServer().catch(err => {
  console.error('Error arrancando servidor:', err);
  process.exit(1);
});