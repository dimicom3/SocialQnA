import { Post } from "../model/Post";

type PostCommonAttributes = Pick<Post, "text" | "title">

export interface CreatePostDto extends PostCommonAttributes {
    userID: string;
    communityID: string;
}

export interface UpdatePostDto extends Partial<PostCommonAttributes> { 
    id: string;
}