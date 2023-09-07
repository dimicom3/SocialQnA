import { CommunityDto } from "../community/community.dto";
import { API_URL } from "../config";
import { fetchResult } from "../utils/fetch.helper";

const BASE_URL = `${API_URL}/community`;

export async function getAll()
{
    const result = await fetchResult(`${BASE_URL}/getAll`, {
        method: "GET"
    });

    return result;
}


export async function get(id: string)
{
    const result = await fetchResult(`${BASE_URL}/${id}`, {
        method: "GET"
    });
    
    return result;
}

export async function create(community: CommunityDto)
{
    const result = await fetchResult(`${BASE_URL}/`, {
        method: "POST",
        payload: community,
        token: localStorage.getItem("token")!
    });

    return result;
}

export async function update(community: CommunityDto)
{
    const result = await fetchResult(`${BASE_URL}/${community.id}`, {
        method: "PUT",
        payload: community,
        token: localStorage.getItem("token") as string | undefined
    });
    
    return result;
}

export async function remove(id: string)
{
    const result = await fetchResult(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });

    return result;
}
