import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useNavigate, useParams } from "react-router-dom";
import { CommentDto } from "../comment/comment.dto";
import  Comment  from "../comment/Comment";

import CreateComment from "../comment/CreateComment";
import { getByPostID } from "../service/comment.service";
import { get, visitPost } from "../service/post.service";
import { Post } from "./Post";
import { PostDto } from "./post.dto";
import { UserDto } from "../user/user.dto";

interface Props {
  auth: any;
}

export function ShowPost(props: Props)
{
    const navigate = useNavigate();
    const [post, setPost] = useState({title: "", text: "", id: "", likes: 0, dislikes: 0, user: {}, community: {}} as PostDto);
    const [comments, setComments] = useState([] as CommentDto[])
    const { id } = useParams();

    async function getPost()
    {

        if (!id) return;

        const data = await get(id);

        if(!data.success)
        {
            return navigate("/error404");
        }

        setPost(data.data);

        await visitPost(id);
    }

    async function getComments()
    {

      if(!id) return;

      const data = await getByPostID(id);

      if(!data.success)
      {
          return navigate("/error404");
      }

      let komentari: CommentDto[];
      komentari = data.data.map((c: any) => {return {
        id:c.comment.id,
        text:c.comment.text,
        timeStamp: c.comment.timeStamp,
        user: c.user,
        postID: id,
        likes: c.likes,
        dislikes: c.dislikes,
        userDislikes: c.userDislikes,
        userLikes: c.userLikes
      } as CommentDto})

      setComments(komentari);
    }

    function handleOnRemove()
    {
        navigate("/");
    }

    function removeComment(comment: CommentDto)
    {
      setComments(comments.filter((el) => el.id != comment.id))
    }

    useEffect(()=> {
        getPost();
        getComments();
    }, [])

    useEffect(()=> {
      getPost();
  }, [props.auth])

    return (
        <Container>
        <Row className="mt-5">
          <Col md={3} lg={3} xs={12}>
          </Col>
          <Col md={6} lg={6} xs={12}>
            <Post post={post} OnRemove={handleOnRemove} userID={props.auth.id}></Post>
          </Col>
          <Col md={3} lg={3} xs={12}>
          </Col>         
        </Row>
        

        {comments.map((comment: CommentDto, index: any) => (
        <Row key={index}>
          <Col md={4} lg={4} xs={12}>
          </Col>
          <Col md={4} lg={4} xs={12} >
            <Comment
              comment={comment}
              userID={props.auth.id}
              OnRemove={() => removeComment(comment)}
            />
          </Col>
          <Col md={4} lg={4} xs={12}>
          </Col>    
        </Row> 
        ))}

        <Row>
          <Col md={4} lg={4} xs={12}>
          </Col>
          <Col md={4} lg={4} xs={12} >
            <div className="d-flex justify-content-center">
             <CreateComment userID={props.auth.id} postID={id} OnCreate={() => { getComments()}}/>
            </div>
          </Col>
          <Col md={4} lg={4} xs={12}>
          </Col>    
        </Row> 



      </Container>
    );
}