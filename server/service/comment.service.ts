import { Graph } from "redis";
import { BaseService } from "./base.service";
import { CreateCommentDTO, UpdateCommentDTO } from "../dto/comment.dto";

export class CommentService extends BaseService
{

    async get(id: string)
    {
        const session = this.neo4jDriver.session();

        const query = 
        `MATCH (n)
        WHERE n.id = $id
        RETURN n
        `;
        
        const result = this.getRecordDataFromNeo(await session.run(query, {id}));

        session.close();

        return result;
    }

    async getCommentsByPostID(postID: string)
    {
        const session = this.neo4jDriver.session();

        const query = 
        `
        MATCH (p:Posts)<-[:COMMENT_HAS_POST]-(c:Comments)-[:COMMENT_HAS_USER]->(u:Users)
        WHERE p.id = $postID
        OPTIONAL MATCH (ul:Users) -[l:likes]-> (c)
        OPTIONAL MATCH (ud:Users) -[d:dislikes]-> (c)
        WITH u,c,p, count(distinct d) as dislikeCount, count(distinct l) as likeCount, collect(distinct ul.id) as userLikes, collect(distinct ud.id) as userDislikes
        RETURN {comment: c{.id, .text, .timeStamp}, user: u{.username, .id}, likes: likeCount, dislikes: dislikeCount,  userLikes: userLikes, userDislikes: userDislikes }
        `;
        const result = (await session.run(query, {postID})).records.map(record => record["_fields"][0]);

        session.close();

        return result;
    }

    async create(com:CreateCommentDTO)
    {
        const session = this.neo4jDriver.session();

        const query = 
        `
        MATCH
        (u:Users {id: $userID}),
        (p:Posts {id: $postID})
        MERGE(c:Comments {id: randomUUID(), text: $text, timeStamp: dateTime()})     
        MERGE (c)-[:COMMENT_HAS_USER]->(u)
        MERGE (c)-[:COMMENT_HAS_POST]->(p)
        RETURN c
        `; 
        const result = this.getRecordDataFromNeo(await session.run(query, com));

        session.close();

        return result;
    }


    async update(comment: UpdateCommentDTO)
    {
        const session = this.neo4jDriver.session();

        const query = 
        `MATCH (n: Comments {id: $id})
        SET n.text = $text
        RETURN n
        `
        //${Object.getOwnPropertyNames(comment).map(prop => `n.${prop} = $${prop}`)}
        const result = this.getRecordDataFromNeo(await session.run(query, comment));

        session.close();

        return result;
    }



    async delete(id: string)
    {
        const session = this.neo4jDriver.session();

        const query =
        `
        MATCH (n)
        WHERE n.id = $id
        DETACH DELETE n
        RETURN n
        `;

        const result = this.getRecordDataFromNeo(await session.run(query, {id}));

        session.close();

        return result;
    }
}