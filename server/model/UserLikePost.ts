import { IModel } from "./IModel";
import { Post } from "./Post";
import { User } from "./User";

export interface UserLikePost extends IModel
{
    user: User;
    post: Post;
    createdAt: Date;
}