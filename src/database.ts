import "reflect-metadata"
import { Connection, createConnection } from 'typeorm'

const dbConnection = async () => {

    try {
        const db: Connection = await createConnection({
            type: "postgres",
            host: process.env.TYPEORM_HOST,
            username: process.env.TYPEORM_USERNAME,
            password: process.env.TYPEORM_PASSWORD,
            port: 5432,
            database: "ranchat",
            // logging: true
            synchronize: true,
        })

        await db.synchronize();

        console.log("db connect");
    } catch (e) {
        throw new Error(e);
    }
}

export default dbConnection