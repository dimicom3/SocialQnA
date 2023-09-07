import { IModel } from "./IModel";
import { Post } from "./Post";
import { User } from "./User";

export interface Community extends IModel
{
    title: string;
    description: string;
    image_url?: string;
    // posts?: Post[];
    // followingUsers?: User[];
}