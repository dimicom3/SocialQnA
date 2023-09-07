import { IModel } from "./IModel";
import { User } from "./User";

export interface UserLikeComment extends IModel
{
    user: User;
    post: Comment;
    createdAt: Date;
}