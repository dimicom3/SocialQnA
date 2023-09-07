import { Community } from "../model/Community";
import ApplicationError from "../utils/error/application.error";
import { httpErrorTypes } from "../utils/error/types.error";
import { BaseService } from "./base.service";

export class CommunityService extends BaseService
{
    async create(community: Community)
    {
        const session = this.neo4jDriver.session();

        const query = `CREATE (n:Communities {id:randomUUID(), title:$title, description:$description, image_url:$image_url}) RETURN n`
        
        const result = this.getRecordDataFromNeo(await session.run(query, community));

        if(!result.length) throw new ApplicationError(httpErrorTypes.BAD_REQUEST);  

        session.close();

        return result;   
    }
    async get(id: string)
    {
        const session = this.neo4jDriver.session();

        const query = `MATCH (n:Communities) WHERE n.id = $id RETURN n`;

        const result = this.getRecordDataFromNeo(await session.run(query, {id}));
        
        session.close();

        return result;
    }
    async getByTitle(title: string)
    {
        const session = this.neo4jDriver.session();

        const query = `MATCH (n:Communities) WHERE n.title = $title RETURN n`;

        const result = this.getRecordDataFromNeo(await session.run(query, {title}));
        
        session.close();

        return result;
    }
    async getAll()
    {
        const session = this.neo4jDriver.session();

        const query = `MATCH (n:Communities) RETURN n`;

        const result = this.getRecordDataFromNeo(await session.run(query));
                
        session.close();
        
        return result as Community[];
    }

    async delete(id: string)
    {
        const session = this.neo4jDriver.session();

        const query = `MATCH (n:Communities) WHERE n.id = $id DETACH DELETE n`;

        const result = this.getRecordDataFromNeo(await session.run(query, {id}));

        session.close();

        return result;
    }

    async update(community: Community)
    {
        const session = this.neo4jDriver.session();


        const query = `MATCH (n:Communities {id: $id})
        SET ${Object.getOwnPropertyNames(community).map(prop => `n.${prop} = $${prop}`)}
        RETURN n
        `
        const result = this.getRecordDataFromNeo(await session.run(query, community));

        session.close();

        return result;
    }

    async getAllUsers(id: String)
    {
        const session = this.neo4jDriver.session();
        
        
        const query = `MATCH (u:Users) -[:follows]-> (c:Communities {id: $id}) RETURN u`;

        const result = this.getRecordDataFromNeo(await session.run(query, {id}));

        session.close();

        return result;

    }

}