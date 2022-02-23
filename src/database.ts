import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';

import entities from './entities';

const dbConnection = async () => {
  try {
    const db: Connection = await createConnection({
      type: 'postgres',
      host: process.env.AWS_IP,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      port: 5432,
      database: 'ranchat',
      //   logging: true
      synchronize: true,
      entities: entities,
    });

    await db.synchronize();

    console.log('db connect');
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export default dbConnection;
