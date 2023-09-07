import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { followUser, getFollowUserInfo } from "../service/user.service";

interface Props {
    auth: any;
    userID?: string;
}

export function FollowUser(props: Props)
{
    const [followInfo, setFollowInfo] = useState({createdAt: {day: "", year: "", month: ""}});

    async function getFollowInfo()
    {
        if(!props.userID) return;

        const result = await getFollowUserInfo({userFollowID: props.auth.id as string, userFollowingID: props.userID});

        if(!result.success)
        {
            return;
        }

        if(!result.data)
        {
            setFollowInfo({createdAt: {day: "", year: "", month: ""}});
            return;
        }

        setFollowInfo(result.data);
    }

    async function setFollowUser()
    {
        if(!props.userID) return;

        const result = await followUser(props.userID);

        if(!result.success)
        {
            return;
        }

        if(!result.data || !Object.keys(result.data).length)
        {
            setFollowInfo({createdAt: {day: "", year: "", month: ""}});
            return;
        }

        setFollowInfo(result.data);
    }

    useEffect(()=> {
        getFollowInfo();
    },[]);

    useEffect(()=> {
        getFollowInfo();
    },[props.userID, props.auth.id]);

    return (
        <>
            {!!props.auth.id && props.auth.id !== props.userID && (
                <div>
                    <Button variant={!!followInfo.createdAt.day ? "danger" : "info"} onClick={setFollowUser}>
                        {!!followInfo.createdAt.day ? "Unfollow" : "Follow"}
                    </Button>
                    {!!followInfo.createdAt.day && (
                        <p>Follow since {`${followInfo.createdAt.day}.${followInfo.createdAt.month}.${followInfo.createdAt.year}`}</p>
                    )}
                </div>
            )}
        </>
    );
}