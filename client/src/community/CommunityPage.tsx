import React, {useState, useEffect} from 'react'
import { get } from '../service/community.service'
import { useParams, useNavigate } from 'react-router-dom';
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { CommunityDto } from './community.dto';
import Community from './Community';
import { CreatePost } from '../post/CreatePost';
import { followCommunity, getFollowCommunityInfo } from '../service/user.service';
import Button from 'react-bootstrap/esm/Button';
interface Props {
    auth: any;
}

function CommunityPage(props: Props) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [community, setCommunity] = useState({} as CommunityDto);
    const [isFollow, setIsFollow] = useState(false);

    async function getCommunity()
    {
        if (!id) return;

        const data = await get(id!);

        if(!data.success)
        {
            return navigate("/error404");
        }

        setCommunity(data.data);
    }

    async function getFollowInfo()
    {
      if(!props.auth.id || !community.id) return;

      const data = await getFollowCommunityInfo({
        userID: props.auth.id,
        communityID: community.id
      });

      if(!data.success)
      {
          return;
      }

      setIsFollow(!!data.data);
    }

    async function setFollowCommunity()
    {
      const data = await followCommunity({
        userID: props.auth.id,
        communityID: community.id,
      })

      if(!data.success)
      {
        return;
      }

      setIsFollow(data.data.created);
    }

    useEffect(() => {
        getCommunity();
        getFollowInfo();
    }, []);

    useEffect(() => {
      getFollowInfo();
    }, [props.auth, community]);

    return (
        <Container>

        <Row className="vh-100 mt-5">
          <Col md={3} lg={3} xs={12}>
          {!!props.auth.id && (
                <div>
                    <Button variant={isFollow ? "danger" : "info"} onClick={setFollowCommunity}>
                      {isFollow ? "Unfollow" : "Follow"}
                    </Button>
                </div>
            )}
          </Col>
          <Col md={6} lg={6} xs={12}>
            <Community community={community} auth={props.auth}/>
          </Col>
          <Col md={3} lg={3} xs={12}>
          </Col>
        </Row>

      </Container>
    )
}

export default CommunityPage