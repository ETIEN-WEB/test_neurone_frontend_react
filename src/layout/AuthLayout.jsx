import React from 'react';
import {Outlet, Navigate } from 'react-router-dom';


const AuthLayout = () => {
    return (
        <Outlet/>
    );
};

export default AuthLayout;