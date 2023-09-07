import { BaseService } from "./base.service";

export class TagService extends BaseService
{
    async getByName(name: string)
    {
        const session = this.neo4jDriver.session();

        const query = `MATCH (t:Tags) WHERE t.name = $name RETURN t`;

        const result = this.getRecordDataFromNeo(await session.run(query, {name}));

        session.close();

        return result;
    }

    async create(name: string)
    {
        const session = this.neo4jDriver.session();

        const query = `CREATE (t: Tags {id: randomUUID(), name: $name}) RETURN t`;
        
        const result = this.getRecordDataFromNeo(await session.run(query, {name}));

        session.close();

        return result;
    }

    async delete(id: string)
    {
        const session = this.neo4jDriver.session();

        const query = `MATCH (t:Tags {id: $id}) DELETE t`;

        const result = this.getRecordDataFromNeo(await session.run(query, {id}));

        session.close();

        return result;
    }
}