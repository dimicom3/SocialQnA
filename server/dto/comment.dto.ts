export interface CreateCommentDTO
{
    text: string;
    postID: string;
    userID: string;
}

export interface UpdateCommentDTO
{
    id: string;
    text: string;
}