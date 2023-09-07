import { UserDto } from "../user/user.dto";

export interface PostDto {
    id: string;
    title: string;
    text: string;
    communityID: string;
    timeStamp: Date;
    likes?: number;
    dislikes: number;
    user?: UserDto;
    userLikes: string[];
    userDislikes: string[];
    community: any;
}