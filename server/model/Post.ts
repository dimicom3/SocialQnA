import { Comment } from "./Comment";
import { Community } from "./Community";
import { IModel } from "./IModel";
import { User } from "./User";
import { UserLikePost } from "./UserLikePost";

export interface Post extends IModel
{
    title: string;
    text: string;
    timeStamp: Date;
    author: User;
    community: Community;
    // userLikes?: UserLikePost[];
    // userDislikes?: User[];  
    // comments?: Comment[];
}