#!/usr/bin/env node
import 'dotenv/config';
import { TwitterProvider } from './providers/twitter';

async function runOnce() {
  const provider = new TwitterProvider();
  const post = { text: 'Publicación manual desde CLI ' + new Date().toISOString() };
  const res = await provider.publish(post as any);
  console.log('Resultado CLI:', res);
}

if (require.main === module) {
  runOnce().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
