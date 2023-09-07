import { User } from "../model/User";

export interface UserLikePostDto {
    userID: string;
    postID: string;
}

export interface UserLoginDto extends Pick<User, "email" | "password"> { }

export interface UserLikeCommentDto {
    userID: string;
    commentID: string;
}

export interface UserFollowCommunityDto {
    userID: string;
    communityID: string;
}

export interface UserFollowUserDto {
    userFollowID: string;
    userFollowingID: string;
}