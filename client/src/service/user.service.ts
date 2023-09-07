import { API_URL } from "../config";
import { UserUpdateDto } from "../user/user.dto";
import { fetchResult } from "../utils/fetch.helper";

const BASE_URL = `${API_URL}/user`;

export async function get(id: string)
{
    const result = await fetchResult(`${BASE_URL}/${id}`, {
        method: "GET"
    })

    return result;
}

export async function update(payload: UserUpdateDto)
{
    const {id, ...rest} = payload;
    const result = await fetchResult(`${BASE_URL}/${id}`, {
        method: "PUT",
        payload: rest,
        token: localStorage.getItem("token") as string | undefined
    })

    return result;
}

export async function remove(id: string)
{
    const result = await fetchResult(`${BASE_URL}/${id}`, { 
        method: "DELETE"
    })

    return result;
}

export async function followUser(userFollowingID: string)
{
    const result = await fetchResult(`${BASE_URL}/follow/user`, {
        method: "POST",
        payload: {userFollowingID},
        token: localStorage.getItem("token")!
    })

    return result;
}

export async function getFollowUserInfo({userFollowID, userFollowingID}: {userFollowID: string, userFollowingID: string})
{
    const result = await fetchResult(`${BASE_URL}/${userFollowID}/follow/user/${userFollowingID}`, {
        method: "GET"
    })

    return result;
}

export async function getFollowCommunityInfo({userID, communityID}: {userID: string, communityID: string})
{
    const result = await fetchResult(`${BASE_URL}/${userID}/follow/community/${communityID}`, {
        method: "GET"
    })

    return result;
}

export async function getFollowedCommunities(userID: string)
{
    const result = await fetchResult(`${BASE_URL}/${userID}/followedCommunities`, {
        method: "GET"
    });

    return result;
}

export async function likePost(payload: {userID: string, postID: string})
{
    const result = await fetchResult(`${BASE_URL}/like/post`, {
        method: "POST",
        payload
    })

    return result;
}

export async function dislikePost(payload: {userID: string, postID: string})
{
    const result = await fetchResult(`${BASE_URL}/dislike/post`, {
        method: "POST",
        payload
    })

    return result;
}

export async function followCommunity(payload: {userID: string, communityID: string})
{
    const result = await fetchResult(`${BASE_URL}/follow/community`, {
        method: "POST",
        payload
    });

    return result;
}

export async function likeComment(payload: {userID: string, commentID: string})
{
    const result = await fetchResult(`${BASE_URL}/like/comment`, {
        method: "POST",
        payload
    })

    return result;
}

export async function dislikeComment(payload: {userID: string, commentID: string})
{
    const result = await fetchResult(`${BASE_URL}/dislike/comment`, {
        method: "POST",
        payload
    })

    return result;
}