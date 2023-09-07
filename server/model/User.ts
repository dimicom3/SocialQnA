import { Community } from "./Community";
import { IModel } from "./IModel";
import { Post } from "./Post";

export interface User extends IModel
{
    username: string;
    password: string;
    email: string;
    // posts?: Post[];
    // comments?: Comment[];
    // likedPosts?: Post[];
    // dislikedPosts?: Post[];
    // likedComments?: Comment[];
    // dislikedComments?: Comment[];
    // followedCommunities?: Community[];
}