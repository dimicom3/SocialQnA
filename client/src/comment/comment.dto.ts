import { UserDto } from "../user/user.dto";

export interface CommentDto
{
    id: string;
    text: string;
    timeStamp: Date;
    user: UserDto;
    postID: string;    
    likes?: number;
    dislikes?: number;
    userLikes: string[];
    userDislikes: string[];
}