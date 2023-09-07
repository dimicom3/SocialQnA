import { auth, driver, Driver } from "neo4j-driver";
import dotenv from "dotenv";

dotenv.config();

export class Neo4jDB {

    driver: Driver;

    constructor(private readonly url: string, private readonly username: string, private readonly password: string) 
    {
        this.driver = driver(this.url, auth.basic(this.username, this.password), { disableLosslessIntegers: true });
    }

    async testConnection()
    {
        try {
            let serverInfo = await this.driver.getServerInfo();
            console.log('\x1b[32m%s\x1b[0m', `Neo4j connected on ${serverInfo.address}`);
        } catch (error) {
            console.error('\x1b[31m%s\x1b[0m', "Neo4j is not connected...");
            console.error('\x1b[31m%s\x1b[0m', "ERROR:", (error as Error).message);
        }
    }
}

