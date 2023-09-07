import React, { useState, useEffect } from 'react'
import { PostDto } from '../post/post.dto';
import { getByCommunityID } from '../service/post.service';
import { CommunityDto } from './community.dto';
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Post } from '../post/Post';
import { CreatePost } from '../post/CreatePost';

interface Props {
    auth: any;
    community: CommunityDto;
}

function Community(props: Props) {

    const [posts, setPosts] = useState([] as PostDto[]);


    async function getPosts()
    {
        const data = await getByCommunityID(props.community.id!);

        if(!data.success)
        {
            return;
        }
        setPosts(data.data);

    }

    useEffect(() => {
        
        getPosts();
    }, [props.community])

    function removePost(post: PostDto)
    {
        setPosts(posts.filter((el) => el.id != post.id))
    }

    const postsElements: JSX.Element[] = [];
    posts.forEach((post, index) => postsElements.push(<Post post={post} key={index} userID={props.auth.id} OnRemove = {() => {removePost(post)}}></Post>));

    return (
        <Container>
        <Row className='shadow my-3 border-white  gap-3'>   
            <h1 className='p-3 border-bottom'>{props.community.title}</h1>
            <h3 className='p-3'>{props.community.description}</h3>
        </Row>
        <Row>
        <div className="d-flex justify-content-center shadow p-3 bg-white rounded">
            <CreatePost Community={props.community} OnCreate={() => {getPosts()}} />
          </div>
        </Row>
        <Row className="mt-5">
        <Col md={1} lg={1} xs={12}>
        </Col>
        <Col md={10} lg={10} xs={12} >
            {posts.length ? postsElements : (
            <div className="shadow p-3 mb-5 bg-white rounded">
                <h3 className="text-center">Trenutno nema nijedan post</h3>
            </div>
            )}
        </Col>
        <Col md={1} lg={1} xs={12}>
        </Col>
        </Row>

    </Container>
    )
}

export default Community