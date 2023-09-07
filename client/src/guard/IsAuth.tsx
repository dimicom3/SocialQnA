import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuthInfo } from "../service/auth.service";

export function IsAuth({ children }: {children: JSX.Element})
{
    // const [auth, setAuth] = useState({});

    // const [child, setChild] = useState(children);

    // const isFirstRender = useRef(true);
    
    // useEffect(() => {
    //     async function getAuth()
    //     {
    //         const result = await getAuthInfo();
    
    //         if(!result.success)
    //         {
    //             return;
    //         }
    
    //         setAuth(result.data);
    //     }

    //     getAuth();
    // }, []);

    // useEffect(() => {

    //     if(!Object.keys(auth).length)
    //     {
    //         setChild(<Navigate to="/error404" />)
    //     }

    // }, [auth])

    // const {data, error, isPending} = useAsync({ promiseFn: getAuthInfo });

    // while(!isPending) {};

    // console.log(data);

    // if(!error)
    // {
    //     return <Navigate to="/error404" />;
    // }

    // if(!data.success)
    // {
    //     return <Navigate to="/error404" />;
    // }

    return children;
}