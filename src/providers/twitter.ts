import { Publisher, Post } from '../publisher/publisher';

export class TwitterProvider extends Publisher {
  constructor(private opts?: any) {
    super();
  }

  async publish(post: Post) {
    // TODO: implementar llamada a la API de Twitter (X) usando credenciales y librería HTTP
    console.log('[Twitter] Publicando:', post.text);
    return { success: true, id: 'twitter-demo-id' };
  }
}
