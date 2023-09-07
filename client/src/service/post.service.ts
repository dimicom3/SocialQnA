import { API_URL } from "../config";
import { PostDto } from "../post/post.dto";
import { fetchResult } from "../utils/fetch.helper";

const BASE_URL = `${API_URL}/post`;

export async function getByUserID(id: string)
{
    const result = await fetchResult(`${BASE_URL}/user/${id}`, {
        method: "GET"
    })

    return result;
}

export async function create(post: PostDto)
{
    const result = await fetchResult(`${BASE_URL}/`, {
        method: "POST",
        payload: post,
        token: localStorage.getItem("token")!
    })

    return result;
}

export async function get(id: string)
{
    const result = await fetchResult(`${BASE_URL}/${id}`, {
        method: "GET"
    });

    return result;
}

export async function visitPost(id: string)
{
    await fetchResult(`${BASE_URL}/visit/${id}`, {
        method: "POST"
    });
}

export async function remove(id: string)
{
    const result = await fetchResult(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });

    return result;
}

export async function update(post: PostDto)
{
    const {id, timeStamp, ...data} = post;
    const result = await fetchResult(`${BASE_URL}/${id}`, {
        method: "PUT",
        payload: data
    });

    return result;
}

export async function getEditHistory(id: string)
{
    const result = await fetchResult(`${BASE_URL}/edit-history/${id}`, {
        method: "GET"
    });

    return result;
}

export async function getByFollowers(id: string)
{
    const result = await fetchResult(`${BASE_URL}/following-users/${id}`, {
        method: "GET"
    });

    return result;
}

export async function getByCommunityID(communityID: string)
{
    const result = await fetchResult(`${BASE_URL}/community/${communityID}`, {
        method: "GET"
    });
    
    return result; 
}


export async function getTop10()
{
    const result = await fetchResult(`${BASE_URL}/top10`, {
        method: "GET"
    });

    return result;
} 