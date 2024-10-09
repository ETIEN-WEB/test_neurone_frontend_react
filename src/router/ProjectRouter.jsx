import React from 'react';
import Master from "../layout/Master";
import Home from "../layout/Home";
import AddPost from "../posts/AddPost";
import EditPost from "../posts/EditPost";

const ProjectRouter = (
    {
        path: '/',
        element : <Master/>,
        children: [
            {
                path: '/post',
                element: <Home/>
            },
            {
                path: '/create/post',
                element: <AddPost/>
            },
            {
                path: '/post/edit/:id',
                element: <EditPost/>
            },

        ]
    }
);

export default ProjectRouter;