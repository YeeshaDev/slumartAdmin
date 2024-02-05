
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import Layout from './routes/Layout';
import Product from '../pages/Product';
import Project from '../pages/Project';
import AllArts from '../pages/AllArts';
import AllProjects from '../pages/AllProjects';
import EditArtForm from '../pages/EditArtDetails';
import EditEventForm from '../pages/EditProjectDeatils';

function App() {
  

  const router = createBrowserRouter([ 
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Product />,
        },
        {
          path: "/upload_projects",
          element: <Project />,
        },
        {
          path: "/artworks",
          element: <AllArts />,
        },
        {
          path: "/events",
          element: <AllProjects />,
        },
        {
          path: "/edit_artwork/:id",
          element: <EditArtForm />,
        },
        {
          path: "/edit_project/:id",
          element: <EditEventForm />,
        },
      ]
    }
   ]);
    return (
      <>
       <RouterProvider router={router} />
      </>
    )
  }

export default App
