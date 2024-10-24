import {BindingScope, injectable} from '@loopback/core';
import {createClient, RedisClientType} from 'redis';

@injectable({scope: BindingScope.TRANSIENT})
export class RedisCacheService {
  private client: RedisClientType;
  constructor() {

    this.client = createClient({
      url: 'redis://localhost:6379',
    });

    this.client.on('error', (err) => {
      console.error('Redis error: ', err);
    });

    this.client.connect().catch(console.error);
  }

  async set(key: string, value: string, expirationTime: number): Promise<void> {
    try {
      await this.client.setEx(key, expirationTime, value);
    } catch (err) {
      console.error('Error setting Redis cache:', err);
      throw err;
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      const data = await this.client.get(key);
      return data;
    } catch (err) {
      console.error('Error getting Redis cache:', err);
      throw err;
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (err) {
      console.error('Error deleting Redis cache:', err);
      throw err;
    }
  }
}
