import { Timestamp } from "@redis/time-series/dist/commands";
import { IModel } from "./IModel";
import { User } from "./User";

export interface UserEditedComment extends IModel
{
    user: User;
    comment: Comment;
    lastModified: Date;
}