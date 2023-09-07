import { CommentService } from "../service/comment.service";
import { NextFunction, Request, response, Response } from "express";
import { sendResponse } from "../utils/response";
import { request } from "http";
import { CreateCommentDTO, UpdateCommentDTO } from "../dto/comment.dto";
import { commentCreateSchema, postCreateSchema } from "../utils/validation";
import ApplicationError from "../utils/error/application.error";
import { httpErrorTypes } from "../utils/error/types.error";

const commentService = new CommentService();

export class CommentController
{
    async get(req: Request, res:Response, next: NextFunction)
    {
        try
        {
            const id = req.params.id;

            const result = await commentService.get(id);

            if(!result.length) throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);

            return sendResponse(res, result[0]);

            
        }
        catch(error)
        {
            next(error);
        }
    }

    async getCommentsByPostID(req:Request, res: Response, next: NextFunction)
    {
        try {
            const postID = req.params.postID;

            const result = await commentService.getCommentsByPostID(postID);
            
            return sendResponse(res, result);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction)
    {
        try {
            const comment = req.body as CreateCommentDTO;

            await commentCreateSchema.parseAsync(comment);

            const payload = await commentService.create(comment);

            return sendResponse(res, payload);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction)
    {
        try {
            const comment = req.body as UpdateCommentDTO;

            comment.id = req.params.id;

            const result = await commentService.update(comment);

            if(!result.length) throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);

            return sendResponse(res, result);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction)
    {
        try
        {
            const id = req.params.id;

            const result = await commentService.delete(id);
            
            if(!result.length) throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
            
            return sendResponse(res, {message: "Comment deleted."});
        }
        catch(error)
        {
            next(error);
        }
    }
}