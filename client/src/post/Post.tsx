import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import { dislikePost, likePost } from "../service/user.service";
import { DeletePost } from "./DeletePost";
import { PostEditHistory } from "./EditHistory";
import { PostDto } from "./post.dto";
import { UpdatePost } from "./Update";

interface Props {
    post: PostDto;
    userID: string;
    OnRemove?: () => void; 
}

export function Post(props: Props)
{

    const [like, setLike] = useState({isLike: false, likeCounter: 0});
    const [dislike, setDislike] = useState({isDislike: false, dislikeCounter: 0});

    useEffect(() => {
      setLike({isLike: !!props.userID && props.post.userLikes.some(el => props.userID === el), likeCounter: +props.post.likes!});
      setDislike({isDislike: !!props.userID && props.post.userDislikes.some(el => props.userID === el), dislikeCounter: +props.post.dislikes});
    }, [props.post]);

    async function handleLikeClick()
    {
      const result = await likePost({userID: props.userID, postID: props.post.id});

      if(!result.success)
      {
        return;
      }

      if(result.data.created)
      {
        setLike({isLike: true, likeCounter: like.likeCounter + 1});
      }
      else {
        setLike({isLike: false, likeCounter: like.likeCounter - 1});
      }
    }

    async function handleDislikeClick()
    {
      const result = await dislikePost({userID: props.userID, postID: props.post.id});

      if(!result.success)
      {
        return;
      }

      if(result.data.created)
      {
        setDislike({isDislike: true, dislikeCounter: dislike.dislikeCounter + 1});
      }
      else {
        setDislike({isDislike: false, dislikeCounter: dislike.dislikeCounter - 1});
      }
    }
    
    return (
      <Card className="shadow my-3 border-white">
        <Card.Header className="d-flex bg-white">
          <div className="d-flex align-items-center">
            <div>
              <a href={`/profile/${props.post.user?.id}`} className="link-secondary text-decoration-none">{props.post.user?.username}</a>, 
              <a href={`/community/${props.post.community.id}`} className="text-decoration-none link-secondary ms-2">{props.post.community.title}</a>
            </div>
          </div>
          <div className="ms-auto d-flex gap-3">
            {props.post.user!.id === props.userID && (
              <div className="d-flex gap-3">
                <DeletePost id={props.post.id} OnRemove={props.OnRemove}/>
                <UpdatePost post={{id: props.post.id, title: props.post.title, text: props.post.text}}></UpdatePost>
              </div>
            )}
            <PostEditHistory id={props.post.id}></PostEditHistory>
          </div>
        </Card.Header>
        {/* <Card.Header className="d-flex align-items-center bg-white">
          <h5 className="d-flex gap-2 m-0">User: <a href={`/profile/${props.post.user?.id}`} className="text-decoration-none">{props.post.user?.username}</a></h5>
        </Card.Header>
        <Card.Header className="d-flex align-items-center bg-white">
          <h5 className="d-flex gap-2 m-0">Community: <a href={`/community/${props.post.community.id}`} className="text-decoration-none">{props.post.community.title}</a></h5>
        </Card.Header> */}
        <Card.Body>
            <h4 className="mb-3"><a href={`/post/${props.post.id}`} className="text-decoration-none text-dark">{props.post.title}</a></h4>
            <Card.Text>
                {props.post.text}
            </Card.Text>
        </Card.Body>
        <Card.Footer className="bg-white">
            {!!props.userID && !!props.post && (
              <div className="d-flex gap-3">
                <Button variant="transparent" onClick={handleLikeClick}>
                  <i className={`fa fa-thumbs-up ${like.isLike ? "text-success" : "text-secondary"}`}></i> {like.likeCounter}
                </Button>
                <Button variant="transparent" onClick={handleDislikeClick}>
                  <i className={`fa fa-thumbs-down ${dislike.isDislike ? "text-danger" : "text-secondary"}`}></i> {dislike.dislikeCounter}
                </Button>
              </div>
            ) || (
              <div className="d-flex gap-3">
                <span>
                  <i className="fa fa-thumbs-up"></i> {props.post.likes}
                </span>
                <span>
                  <i className="fa fa-thumbs-down"></i> {props.post.dislikes}
                </span>
              </div>
            )}
        </Card.Footer>
      </Card>
    );
}