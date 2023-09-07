import dotenv from "dotenv";
import app from "./app";
import http from "http";
import {redisDB, neo4jDB} from "./db";

dotenv.config();

async function main()
{
    const port = process.env.SERVER_PORT || 5000; //ako se slucajno izbrise .env fajl; dobra praksa
    const server = http.createServer(app); //ako budemo sa socket-om radili.

    console.log("\n");

    await redisDB.testConnection();

    await neo4jDB.testConnection();

    server.listen(port, () => {  //callback f-ja
        console.log('\x1b[32m%s\x1b[0m', `Server started at ${port}...`);
    })
}
main();

//index.ts glavni konfiguracioni fajl