import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../post/Post";
import { PostDto } from "../post/post.dto";
import { getByUserID } from "../service/post.service";
import { get } from "../service/user.service";
import { FollowUser } from "./FollowUser";
import { UserDto } from "./user.dto";

interface Props {
    auth: any;
}

export function Profile(props: Props) {
    const navigate = useNavigate();
    const [user, setUser] = useState({} as UserDto);
    const [posts, setPosts] = useState([] as PostDto[]);
    const { id } = useParams();

    if(!id)
    {
        navigate("/error404");
    }
    
    async function getUser()
    {
        const data = await get(id!);
        if(!data.success)
        {
            return navigate("/error404");
        }
        setUser(data.data);
    }

    async function getPosts()
    {
        if(!id) return;

        const data = await getByUserID(id);
        if(!data.success)
        {
            return;
        }
        setPosts(data.data);

    }

    function addPost(post: PostDto)
    {
        setPosts([...posts, post]);
    }

    function removePost(post: PostDto)
    {
        setPosts(posts.filter((el) => el.id != post.id))
    }

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        getPosts();
    }, [props.auth]);

    const postsElements: JSX.Element[] = [];
    posts.forEach((post, index) => postsElements.push(<Post post={post} key={index} userID={props.auth.id} OnRemove={() => {removePost(post)} }></Post>));

    return (
        <Container>
        <Row className="vh-100 mt-5">
          <Col md={3} lg={3} xs={12}>
            <h3>{user.username}</h3>
            <FollowUser auth={props.auth} userID={user.id}></FollowUser>
          </Col>
          <Col md={6} lg={6} xs={12}>
            {posts.length ? postsElements : (
                <div className="shadow p-3 mb-5 bg-white rounded">
                    <h5 className="text-center">Korisnik trenutno nema nijedan postavljen post</h5>
                </div>
            )}
          </Col>
          <Col md={3} lg={3} xs={12}>
          </Col>
        </Row>
      </Container>
    );
}