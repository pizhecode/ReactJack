import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
//懒加载
// import Publish from '@/pages/Publish'
// import Article from '@/pages/Article'
// import Home from '@/pages/Home'
import AuthRoute from '@/components/AuthRoute'
import { lazy, Suspense } from 'react'


const Publish = lazy(() => import('@/pages/Publish'))
const Article = lazy(() => import('@/pages/Article'))
const Home = lazy(() => import('@/pages/Article'))
const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute><Layout /></AuthRoute>,
    children: [
      {
        index: true,
        // path: 'home',
        element:<Suspense fallback={'加载中'}><Home /></Suspense>,
      },
      {
        path: 'article',
        element: <Suspense fallback={'加载中'}><Article /></Suspense>,
      },
      {
        path: 'publish',
        element: <Suspense fallback={'加载中'}><Publish /></Suspense>,
      },
    ]
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default router