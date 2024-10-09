import AuthLayout from "../layout/AuthLayout";
import React from "react";
import { Navigate } from "react-router-dom";
import Signup from "../auth/Signup";
import Login from "../auth/Login";

const PublicRouter = (
    {
        path: '/',
        element : <AuthLayout />,
        children: [
            {
                path: '/accueil',
                element: <Navigate to="/"/>
            },
            {
                path: '/',
                element: <Signup />
            },
            {
                path: '/login',
                element: <Login />
            },


        ]
    }
)

export default PublicRouter;