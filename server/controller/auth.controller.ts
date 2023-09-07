import { Request, Response, NextFunction } from "express";
import { UserLoginDto } from "../dto/user.dto";
import { User } from "../model/User";
import { UserService } from "../service/user.service";
import { compareValues } from "../utils/crypt";
import ApplicationError from "../utils/error/application.error";
import { httpErrorTypes } from "../utils/error/types.error";
import { encodeToken, signToken } from "../utils/jwt";
import { sendResponse } from "../utils/response";
import { loginSchema } from "../utils/validation";

const userService = new UserService();


export class AuthController {
    async login(req: Request, res: Response, next: NextFunction)
    {
        try {
            await loginSchema.parseAsync(req.body);
            const user = req.body as UserLoginDto;

            const userFromDB = (await userService.getFromEmail(user.email))[0] as User;

            if(!userFromDB) {
                throw new ApplicationError(httpErrorTypes.UNAUTHORIZED);
            }

            if(!(await compareValues(user.password, userFromDB.password))) {
                throw new ApplicationError(httpErrorTypes.UNAUTHORIZED);
            }

            const token = signToken(userFromDB, "1d");

            return sendResponse(res, token);
        } catch (error) {
            next(error);
        }
    }

    async isAuth(req: Request, res: Response, next: NextFunction)
    {
        try {
            const token = req.headers["authorization"] as string | undefined | null;

            if(!token || token === "undefined" || token === "null")
                throw new ApplicationError(httpErrorTypes.UNAUTHORIZED);
            
            const data = encodeToken(token);

            req.body.auth = data;

            return next();
        } catch (error) {
            next(error);
        }
    }

    async getAuthInfo(req: Request, res: Response, next: NextFunction)
    {
        try {
            return sendResponse(res, req.body.auth);
        } catch (error) {
            next(error);
        }
    }
}