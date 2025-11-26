import schedule from 'node-schedule';
import { TwitterProvider } from './providers/twitter';
import { Post } from './publisher/publisher';

const twitter = new TwitterProvider();

export function startScheduler() {
  // Job demo: cada minuto intenta publicar un post de ejemplo
  schedule.scheduleJob('*/1 * * * *', async () => {
    const demo: Post = {
      text: `Publicación programada de prueba - ${new Date().toISOString()}`,
    };
    try {
      console.log('[Scheduler] Ejecutando job demo...');
      const res = await twitter.publish(demo);
      console.log('[Scheduler] Resultado:', res);
    } catch (err) {
      console.error('[Scheduler] Error en job demo:', err);
    }
  });
  console.log('Scheduler arrancado (job demo cada minuto)');
}
