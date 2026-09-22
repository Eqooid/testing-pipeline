import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHelloWithKey(): string {
    return `hello world this is your key ${process.env.SECRET_KEY}`;
  }

  async checkDatabase(): Promise<{ connected: boolean }> {
    let client: MongoClient;

    try {
      client = new MongoClient(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
        socketTimeoutMS: 5000,
      });
      await client.connect();
      await client.db().command({ ping: 1 });
      return { connected: true };
    } catch {
      throw new ServiceUnavailableException({ connected: false });
    } finally {
      await client?.close();
    }
  }
}
