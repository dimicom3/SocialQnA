import { API_URL } from "../config";
import { CommentDto } from "../comment/comment.dto";
import { fetchResult } from "../utils/fetch.helper";

const BASE_URL = `${API_URL}/comment`;

export async function getByPostID(postID: string)
{
    const result = await fetchResult(`${BASE_URL}/post/${postID}`, {
        method: "GET"
    })

    return result;
}

export async function create(comment: {text: string, userID: string,  postID: string | undefined})
{
    const result = await fetchResult(`${BASE_URL}/`, {
        method: "POST",
        payload: comment,
        token: localStorage.getItem("token")!
    });
    return result;
}

export async function remove(commentID: string)
{
    const result = await fetchResult(`${BASE_URL}/${commentID}`, {
        method: "DELETE",
        token: localStorage.getItem("token")!
    });
    return result;
}