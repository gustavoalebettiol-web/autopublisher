export interface Post {
  id?: string;
  text: string;
  media?: string[]; // URLs or paths
  scheduledAt?: Date | string;
}

export abstract class Publisher {
  abstract publish(post: Post): Promise<{ success: boolean; id?: string; error?: any }>;
}
