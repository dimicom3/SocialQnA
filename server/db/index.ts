import dotenv from "dotenv";
import { Neo4jDB } from "./neo4j.db";
import { RedisDB } from "./redis.db";

dotenv.config();

const neo4jDB = new Neo4jDB(process.env.NEO4J_URL!, process.env.NEO4J_USERNAME!, process.env.NEO4J_PASSWORD!);
const redisDB = new RedisDB(process.env.REDIS_URL!);

export {
    neo4jDB,
    redisDB
}