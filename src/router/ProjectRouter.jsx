import React from 'react';
import Master from "../layout/Master";
import Home from "../layout/Home";

const ProjectRouter = (
    {
        path: '/',
        element : <Master/>,
        children: [
            {
                path: '/post',
                element: <Home/>
            },

        ]
    }
);

export default ProjectRouter;