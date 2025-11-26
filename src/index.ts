import 'dotenv/config';
import { startScheduler } from './scheduler';

async function main() {
  console.log('Autopublisher arrancando...');
  startScheduler();
}

main().catch((err) => {
  console.error('Error en la app:', err);
  process.exit(1);
});
