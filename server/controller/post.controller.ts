import { NextFunction, Request, Response } from "express";
import { CreatePostDto, UpdatePostDto } from "../dto/post.dto";
import { Post } from "../model/Post";
import { PostService } from "../service/post.service";
import ApplicationError from "../utils/error/application.error";
import { httpErrorTypes } from "../utils/error/types.error";
import { sendResponse } from "../utils/response";
import { postCreateSchema } from "../utils/validation";

const postService = new PostService();

export class PostController {

    async get(req: Request, res: Response, next: NextFunction)
    {
        try {
            const id = req.params.id;

            let result = await postService.getFromRedis(id);

            if(result)
            {
                return sendResponse(res, result);
            }

            result = await postService.get(id);

            await postService.setInRedis(result);

            return sendResponse(res, result);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction)
    {
        try {
            const post = req.body as CreatePostDto;

            if(req.body.auth) post.userID = req.body.auth.id;

            await postCreateSchema.parseAsync(post);

            const payload = await postService.create(post);

            return sendResponse(res, payload);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction)
    {
        try {
            const id = req.params.id;

            await postService.delete(id);

            return sendResponse(res, {message: "Post deleted!"});
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction)
    {
        try {
            const post = req.body as UpdatePostDto;

            post.id = req.params.id;

            const result = await postService.update(post);

            return sendResponse(res, result);
        } catch (error) {
            next(error);
        }
    }

    async getByUserID(req:Request, res: Response, next: NextFunction)
    {
        try {
            const userID = req.params.userID;

            const result = await postService.getByUserID(userID);

            return sendResponse(res, result);
        } catch (error) {
            next(error);
        }
    }

    async getByCommunityID(req:Request, res: Response, next: NextFunction)
    {
        try {
            const communityID = req.params.communityID;

            const result = await postService.getByCommunityID(communityID);

            return sendResponse(res, result);
        } catch (error) {
            next(error);
        }
    }

    async visitPost(req: Request, res: Response, next: NextFunction)
    {
        try {
            const result = await postService.incrementInSortedSet(req.params.id);

            return sendResponse(res, result);
        } catch (error) {
            next(error);
        }
    }

    async getEditHistory(req: Request, res: Response, next: NextFunction)
    {
        try {
            const result = await postService.getEditHistory(req.params.id);

            return sendResponse(res, result);
        } catch (error) {
            next(error);
        }
    }

    async getByFollowingUsers(req: Request, res: Response, next: NextFunction)
    {
        try {
            const result = await postService.getByFollowingUsers(req.params.id);

            return sendResponse(res, result);
        } catch (error) {
            next(error);
        }
    }

    async getTop10(req: Request, res: Response, next: NextFunction)
    {
        try {
            const result = await postService.getTop10();

            sendResponse(res, result);
        } catch (error) {
            next(error);
        }
    }
}