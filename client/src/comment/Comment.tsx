import React, {useEffect, useState} from 'react'
import { Button, Card } from 'react-bootstrap'
import { dislikeComment, likeComment } from '../service/user.service'
import { UserDto } from '../user/user.dto'
import { CommentDto } from './comment.dto'
import DeleteComment from './DeleteComment'


interface Props {
  comment: CommentDto,
  userID: string,
  OnRemove?: () => void;

}

function Comment(props: Props) {

  const [like, setLike] = useState({isLike: false, likeCounter: 0});
  const [dislike, setDislike] = useState({isDislike: false, dislikeCounter: 0});

  useEffect(() => {
    setLike({isLike: !!props.userID && props.comment.userLikes.some(el => props.userID === el), likeCounter: +props.comment.likes!});
    setDislike({isDislike: !!props.userID && props.comment.userDislikes.some(el => props.userID === el), dislikeCounter: +props.comment.dislikes!});
  }, [props.comment]);


  useEffect(() => {
    
  }, [props.comment])
  
  async function handleLikeClick()
  {
    const result = await likeComment({userID: props.userID, commentID: props.comment.id});

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
    const result = await dislikeComment({userID: props.userID, commentID: props.comment.id});

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
    <Card className="shadow my-3">

      <Card.Header className="d-flex">
        <h5 className="m-0">{props.comment.user.username + ":"}</h5>
        <div className="ms-auto d-flex gap-3">
          {props.comment.user.id === props.userID && (
            <div className="d-flex gap-3">
                <DeleteComment id={props.comment.id} OnRemove={props.OnRemove} />
            </div>
          )}
        </div>
      </Card.Header>


      <Card.Body>
          <Card.Text>
              {props.comment.text}
          </Card.Text>
      </Card.Body>

      <Card.Footer>
          {!!props.userID && !!props.comment && (
            <div className="d-flex gap-3">
              <Button variant="light" onClick={handleLikeClick}>
                <i className={`fa fa-thumbs-up ${like.isLike ? "text-success" : "text-secondary"}`}></i> {like.likeCounter}
              </Button>
              <Button variant="light" onClick={handleDislikeClick}>
                <i className={`fa fa-thumbs-down ${dislike.isDislike ? "text-danger" : "text-secondary"}`}></i> {dislike.dislikeCounter}
              </Button>
            </div>
          ) || (
            <div className="d-flex gap-3">
              <span>
                <i className="fa fa-thumbs-up"></i> {props.comment.likes}
              </span>
              <span>
                <i className="fa fa-thumbs-down"></i> {props.comment.dislikes}
              </span>
            </div>
          )}
      </Card.Footer>

    </Card>
  )
}

export default Comment