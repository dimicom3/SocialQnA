import { Express, NextFunction } from "express";
import ApplicationError from "../utils/error/application.error";
import { httpErrorTypes } from "../utils/error/types.error";
import * as ErrorController from "../controller/error.controller"
import userRoute from "./user.route";
import postRoute from "./post.route";
import authRoute from "./auth.route";
import communityRoute from "./community.route"
import commentRoute from "./comment.route";

export default function (app: Express) { 
    app.use("/user", userRoute);
    app.use("/post", postRoute);
    app.use("/auth", authRoute);
    app.use("/community", communityRoute);
    app.use("/comment", commentRoute);
    
    app.use((req, res, next) => {
        next(new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND));
    });
    app.use(ErrorController.errorHandler); //da se rute ne pozivaju u kontroleru vec zasebno odvojeno.otprilike
}