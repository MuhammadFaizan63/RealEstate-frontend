import React from 'react' 
import Navbar from './components/Navbar/Navbar'
import HomePage from './routes/HomePage/HomePage'
import ListPage from './routes/ListPage/ListPage'
import { Link, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout, RequireAuth } from './routes/Layout/Layout'
import SinglePage from './routes/SinglePage/SinglePage'
import ProfilePage from './routes/ProfilePage/ProfilePage'
import Register from './routes/Register/Register'
import Login from './routes/Login/Login'
import ProfileUpdatePage from './routes/ProfileUpdatePage/ProfileUpdatePage'
import NewPostPage from './routes/NewPostPage/NewPostPage'
import { listPageLoader, profilePageLoader, singlePageLoader } from './lib/loaders'

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
        children:[
          {
      path: "/list",
      element: <ListPage />,
      loader: listPageLoader
    },
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/:id",
      element: <SinglePage />,
      loader: singlePageLoader
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/login",
      element: <Login />
    }
        ]
    },
    {
      path: "/",
      element:<RequireAuth />,
      children:[
    {
      path: "/profile",
      element: <ProfilePage />,
      loader: profilePageLoader
    },
    {
      path: "/profile/update",
      element: <ProfileUpdatePage />
    },
    {
      path: "/add",
      element: <NewPostPage />
    },
    {
      path: "/addPost",
      element: <NewPostPage />
    }
      ]
    }
    
  ]);

  return (
    
    <RouterProvider router={router} />
  )
}

export default App
