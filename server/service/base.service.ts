import { Driver, QueryResult, Record } from "neo4j-driver";
import { RedisClientType } from "redis";
import { neo4jDB, redisDB } from "../db";

export class BaseService {
    neo4jDriver: Driver;
    redisDriver: RedisClientType;

    constructor()
    {
        this.neo4jDriver = neo4jDB.driver;
        this.redisDriver = redisDB.client;
    }

    getRecordDataFromNeo(data: QueryResult)
    {
        if(!data.records.length) return [];

        return data.records.map(record => record["_fields"][0].properties)
    }
}