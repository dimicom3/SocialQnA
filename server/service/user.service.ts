import { UserFollowCommunityDto, UserFollowUserDto, UserLikeCommentDto, UserLikePostDto } from "../dto/user.dto";
import { User } from "../model/User";
import { hashValue } from "../utils/crypt";
import ApplicationError from "../utils/error/application.error";
import { httpErrorTypes } from "../utils/error/types.error";
import { BaseService } from "./base.service";

export class UserService extends BaseService {
    
    constructor()
    {
        super();
    }

    async create(user: User)
    {
        const session = this.neo4jDriver.session();

        if(((await this.getFromEmail(user.email)).length))
        {
            throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "User with that email exist in database!"});
        }

        user.password = await hashValue(user.password);

        const query = `CREATE (n:Users {id:randomUUID(), username:$username, email:$email, password:$password}) RETURN n`;

        const result = this.getRecordDataFromNeo(await session.run(query, user));

        if(!result.length) throw new ApplicationError(httpErrorTypes.BAD_REQUEST);

        session.close();

        return result;
    }

    async get(id: string)
    {
        const session = this.neo4jDriver.session();

        const query = `MATCH (n:Users) WHERE n.id = $id RETURN n`;

        const result = this.getRecordDataFromNeo(await session.run(query, { id }));

        session.close();

        return result;
    }

    async getFromEmail(email: string)
    {
        const session = this.neo4jDriver.session();

        const query = `MATCH (n:Users) WHERE n.email = $email RETURN n`;

        const result = this.getRecordDataFromNeo(await session.run(query, { email }));

        session.close();

        return result;
    }

    async delete(id: string)
    {
        const session = this.neo4jDriver.session();

        const query = `MATCH (n:Users {id: $id}) DETACH DELETE n`;

        const result = this.getRecordDataFromNeo(await session.run(query, {id}));

        session.close();

        return result;
    }

    async update(user: User)
    {
        const session = this.neo4jDriver.session();

        if(user.password) {
            user.password = await hashValue(user.password);
        }

        const query = `MATCH (n: Users {id: $id})
        SET ${Object.getOwnPropertyNames(user).map(prop => `n.${prop} = $${prop}`)}
        RETURN n
        `
        const result = this.getRecordDataFromNeo(await session.run(query, user));

        session.close();

        return result;
    }

    async likePost(payload: UserLikePostDto)
    {
        const session = this.neo4jDriver.session();
        
        const query = `
        MATCH
            (u: Users),
            (p: Posts)
        WHERE u.id = $userID AND p.id = $postID
        MERGE (u)-[r:likes]->(p)
        ON MATCH SET r.toDelete = true
        ON CREATE SET r.createdAt = datetime()
        WITH r
        WHERE r.toDelete
        DELETE r
        `
        const result = (await session.run(query, payload)).summary.updateStatistics["_stats"];

        if(result.relationshipsCreated)
        {
            await this.setExpressionInRedis({
                entityType: "post",
                id: payload.postID,
                expressionType: "likes",
                userID: payload.userID
            })
        }
        else
        {
            await this.unsetExpressionInRedis({
                entityType: "post",
                id: payload.postID,
                expressionType: "likes",
                userID: payload.userID
            })
        }

        session.close();

        return result.relationshipsCreated ? { created: true } : {created: false}; 
    }

    async dislikePost(payload: UserLikePostDto)
    {
        const session = this.neo4jDriver.session();

        const query = `
        MATCH
            (u: Users),
            (p: Posts)
        WHERE u.id = $userID AND p.id = $postID
        MERGE (u)-[r:dislikes]->(p)
        ON MATCH SET r.toDelete = true
        ON CREATE SET r.createdAt = datetime()
        WITH r
        WHERE r.toDelete
        DELETE r
        `
        const result = (await session.run(query, payload)).summary.updateStatistics["_stats"];

        if(result.relationshipsCreated)
        {
            await this.setExpressionInRedis({
                entityType: "post",
                id: payload.postID,
                expressionType: "dislikes",
                userID: payload.userID
            })
        }
        else
        {
            await this.unsetExpressionInRedis({
                entityType: "post",
                id: payload.postID,
                expressionType: "dislikes",
                userID: payload.userID
            })
        }

        session.close();

        return result.relationshipsCreated ? { created: true } : {created: false};
    }

    async likeComment(payload: UserLikeCommentDto)
    {
        const session = this.neo4jDriver.session();

        const query = `
        MATCH
            (u: Users),
            (c: Comments)
        WHERE u.id = $userID AND c.id = $commentID
        MERGE (u)-[r:likes]->(c)
        ON MATCH SET r.toDelete = true
        ON CREATE SET r.createdAt = datetime()
        WITH r
        WHERE r.toDelete
        DELETE r
        `
        const result = (await session.run(query, payload)).summary.updateStatistics["_stats"];

        if(result.relationshipsCreated)
        {
            await this.setExpressionInRedis({
                entityType: "comment",
                id: payload.commentID,
                expressionType: "likes",
                userID: payload.userID
            })
        }
        else
        {
            await this.unsetExpressionInRedis({
                entityType: "comment",
                id: payload.commentID,
                expressionType: "likes",
                userID: payload.userID
            })
        }

        session.close();

        return result.relationshipsCreated ? { created: true } : {created: false};
    }

    async dislikeComment(payload: UserLikeCommentDto)
    {
        const session = this.neo4jDriver.session();

        const query = `
        MATCH
            (u: Users),
            (c: Comments)
        WHERE u.id = $userID AND c.id = $commentID
        MERGE (u)-[r:dislikes]->(c)
        ON MATCH SET r.toDelete = true
        ON CREATE SET r.createdAt = datetime()
        WITH r
        WHERE r.toDelete
        DELETE r
        `
        const result = (await session.run(query, payload)).summary.updateStatistics["_stats"];

        if(result.relationshipsCreated)
        {
            await this.setExpressionInRedis({
                entityType: "comment",
                id: payload.commentID,
                expressionType: "dislikes",
                userID: payload.userID
            })
        }
        else
        {
            await this.unsetExpressionInRedis({
                entityType: "comment",
                id: payload.commentID,
                expressionType: "dislikes",
                userID: payload.userID
            })
        }

        session.close();

        return result.relationshipsCreated ? { created: true } : {created: false};
    }

    async followCommunity(payload: UserFollowCommunityDto)
    {
        const session = this.neo4jDriver.session();

        const query = `
        MATCH
            (u: Users),
            (c: Communities)
        WHERE u.id = $userID AND c.id = $communityID
        MERGE (u)-[r:follows]->(c)
        ON MATCH SET r.toDelete = true
        ON CREATE SET r.createdAt = datetime()
        WITH r
        WHERE r.toDelete
        DELETE r
        `
        const result = (await session.run(query, payload)).summary.updateStatistics["_stats"];

        session.close();

        return result.relationshipsCreated ? { created: true } : {created: false};
    }

    async followUser(payload: UserFollowUserDto)
    {
        const session = this.neo4jDriver.session();

        const query = `
        MATCH
            (u: Users),
            (uf: Users)
        WHERE u.id = $userFollowID AND uf.id = $userFollowingID
        MERGE (u)-[r:follows]->(uf)
        ON MATCH SET r.toDelete = true
        ON CREATE SET r.createdAt = datetime()
        WITH r, r.createdAt as createdAt
        WHERE r.toDelete
        DELETE r
        `
        await session.run(query, payload);

        const result = (await this.getFollowUserInfo(payload))[0];

        session.close();

        return result;
    }

    async getFollowUserInfo(payload: {userFollowID: string, userFollowingID: string})
    {
        const session = this.neo4jDriver.session();

        const query = `
        MATCH
            (u: Users {id: $userFollowID}) -[f:follows]-> (uf: Users {id: $userFollowingID})
        RETURN f
        `;

        const result = this.getRecordDataFromNeo(await session.run(query, payload));

        session.close();

        return result;
    }

    async getFollowCommunityInfo(payload: {userID: string, communityID: string})
    {
        const session = this.neo4jDriver.session();

        const query = `
        MATCH
            (u: Users {id: $userID}) -[f:follows]-> (c: Communities {id: $communityID})
        RETURN f
        `;

        const result = this.getRecordDataFromNeo(await session.run(query, payload));

        session.close();

        return result;
    }

    async getFollowedCommunities(id: string)
    {
        const session = this.neo4jDriver.session();

        const query = `
        MATCH 
            (u:Users {id: $id}) -[:follows]-> (c:Communities) 
        RETURN c
        `;

        const result = this.getRecordDataFromNeo(await session.run(query, {id}));

        session.close();

        return result;
    }
    
    async setExpressionInRedis({entityType, id, expressionType, userID}: {entityType: string, id: string, expressionType: string, userID: string})
    {
        await this.redisDriver.incr(`${entityType}:${id}:${expressionType}`);

        await this.redisDriver.sAdd(`${entityType}:${id}:${expressionType}-users`, [userID]);
    }

    async unsetExpressionInRedis({entityType, id, expressionType, userID}: {entityType: string, id: string, expressionType: string, userID: string})
    {
        await this.redisDriver.decr(`${entityType}:${id}:${expressionType}`);

        await this.redisDriver.sRem(`${entityType}:${id}:${expressionType}-users`, [userID]);
    }
}