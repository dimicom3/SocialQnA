import { NextFunction, Request, Response } from "express";
import { UserFollowCommunityDto, UserFollowUserDto, UserLikeCommentDto, UserLikePostDto } from "../dto/user.dto";
import { User } from "../model/User";
import { UserService } from "../service/user.service";
import ApplicationError from "../utils/error/application.error";
import { httpErrorTypes } from "../utils/error/types.error";
import { sendResponse } from "../utils/response";
import { registerSchema, updateUserSchema } from "../utils/validation";

const userService = new UserService();

export class UserController {
    
    async create(req: Request, res: Response, next: NextFunction)
    {
        try {
            const user = req.body as User;

            await registerSchema.parseAsync(user);

            const payload = await userService.create(user);

            return sendResponse(res, payload);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction)
    {
        try {
            const id = req.params.id;
            if(!id) throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "ID is required"});

            await userService.delete(id);

            return sendResponse(res, {message: "User deleted!"});
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction)
    {
        try {
            const user = req.body as User;
            
            await updateUserSchema.parseAsync(user);

            user.id = req.params.id;
            
            const result = await userService.update(user);

            return sendResponse(res, result);
        } catch (error) {
            next(error);
        }
    }

    async get(req: Request, res: Response, next: NextFunction)
    {
        try {
            const id = req.params.id;

            const result = await userService.get(id);
            
            if(!result.length) throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);

            return sendResponse(res, result[0]);
        } catch (error) {
            next(error);
        }
    }

    async likePost(req: Request, res: Response, next: NextFunction)
    {
        try {
            const payload = req.body as UserLikePostDto;

            const result = await userService.likePost(payload);

            return sendResponse(res, result);
        } catch (error) {
            next(error);
        }
    }

    async dislikePost(req: Request, res: Response, next: NextFunction)
    {
        try {
            const payload = req.body as UserLikePostDto;

            const result = await userService.dislikePost(payload);

            return sendResponse(res, result);
        } catch (error) {
            next(error);
        }
    }

    async likeComment(req: Request, res: Response, next: NextFunction)
    {
        try {
            const payload = req.body as UserLikeCommentDto;

            const result = await userService.likeComment(payload);

            return sendResponse(res, result);
        } catch (error) {
            next(error);
        }
    }

    async dislikeComment(req: Request, res: Response, next: NextFunction)
    {
        try {
            const payload = req.body as UserLikeCommentDto;

            const result = await userService.dislikeComment(payload);

            return sendResponse(res, result);
        } catch (error) {
            next(error);
        }
    }

    async followCommunity(req: Request, res: Response, next: NextFunction)
    {
        try {
            const payload = req.body as UserFollowCommunityDto;

            const result  = await userService.followCommunity(payload);

            return sendResponse(res, result);
        } catch (error) {
            next(error);
        }
    }

    async followUser(req: Request, res: Response, next: NextFunction)
    {
        try {
            let payload = req.body as UserFollowUserDto;

            payload.userFollowID = req.body.auth.id;

            const result = await userService.followUser(payload);

            return sendResponse(res, result);
        } catch (error) {
            next(error);
        }
    }

    async getFollowUserInfo(req: Request, res: Response, next: NextFunction)
    {
        try {
            let payload = req.params as {userFollowID: string, userFollowingID: string};

            const result = await userService.getFollowUserInfo(payload);

            return sendResponse(res, result[0] || {createdAt: {day: ""}});
        } catch (error) {
            next(error);
        }
    }

    async getFollowCommunityInfo(req: Request, res: Response, next: NextFunction)
    {
        try {
            let payload = req.params as {userID: string, communityID: string};

            const result = await userService.getFollowCommunityInfo(payload);

            return sendResponse(res, result[0]);
        } catch (error) {
            next(error);
        }
    }

    async getFollowedCommunities(req: Request, res: Response, next: NextFunction)
    {
        try {
            let payload = req.params.id;
            const result = await userService.getFollowedCommunities(payload);

            if(!result.length) throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);

            return sendResponse(res, result);
        } catch (error) {
            next(error);
        }        
    }
}