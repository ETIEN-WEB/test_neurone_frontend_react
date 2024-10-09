import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './AppOLD.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './assets/css/styles.css';
import './assets/css/main.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from "./router/routes";

function App() {
  const router = createBrowserRouter(routes)

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
