import React from 'react';
import { useNavigate, Outlet, Navigate } from 'react-router-dom';
import {useStateContext} from "../contexts/ContextProvider";

const Master = () => {
    const { userToken} = useStateContext();

    if(!userToken) {
        return <Navigate to='login' />
    }

    return (
        <>
            <Outlet/>
        </>
    );
};

export default Master;