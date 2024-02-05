
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import Layout from './routes/Layout';
import Product from '../pages/Product';
import Project from '../pages/Project';

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
          path: "/projects",
          element: <Project />,
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
