import { NextFunction, Request, Response } from "express";
import { Community } from "../model/Community";
import { CommunityService } from "../service/community.service";
import ApplicationError from "../utils/error/application.error";
import { httpErrorTypes } from "../utils/error/types.error";
import { sendResponse } from "../utils/response";
import { communityCreateScheme, communityUpdateScheme } from "../utils/validation";
const communityService = new CommunityService();

export class CommunityController
{
    async create(req: Request, res: Response, next: NextFunction)
    {
        try {
            const community = req.body as Community;
            
            const testUnique = communityService.getByTitle(community.title);

            if((await testUnique).length) throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);

            await communityCreateScheme.parseAsync(community);

            if(!community.image_url)
                community.image_url = "default_img.png"

            const payload = await communityService.create(community);
            
            return sendResponse(res, payload[0]);
        } catch (error) {
            next(error);
        }
    }

    async get(req: Request, res: Response, next: NextFunction)
    {
        try {
            const id = req.params.id;

            const payload = await communityService.get(id);

            if(!payload.length) throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);

            return sendResponse(res, payload[0]);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction)
    {
        try {

            const payload = await communityService.getAll();

            if(!payload.length) throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);

            return sendResponse(res, payload);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction)
    {
        try {
            const community = req.body as Community;
            
            const id = req.params.id;

            await communityUpdateScheme.parseAsync(community);

            community.id = id;

            const payload = await communityService.update(community);
            
            return sendResponse(res, payload);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction)
    {
        try {
            const id  = req.params.id;
            
            if(!id) throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "ID is required"});

            await communityService.delete(id);

            /////if(!payload.length) throw new ApplicationError()///

            return sendResponse(res, {message: "Community deleted!"});

        } catch (error) {
            next(error);
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction)
    {
        try {
            const id = req.params.id;

            if(!id) throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "ID is required"});

            const payload = await communityService.getAllUsers(id);

            return sendResponse(res, payload);
            
        } catch (error) {
            next(error);
        }
    }

}