import React, { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom"
import Home from "@/views/home"
const HomePage = lazy(()=>import('@/views/homePage'))
const TempPrint = lazy(()=>import('@/views/tempPrint'))
const Test = lazy(()=>import('@/views/test'))
const Test2 = lazy(()=>import('@/views/test2'))

const withFallback = (comp: JSX.Element) => (
    <React.Suspense fallback={<div>loading....</div>}>
        {comp}
    </React.Suspense>
)

const routes = [
    {
        path: '/',
        element: <Navigate to='/home'/>
    },
    {
        path: '/home',
        element: <Home/>,
        children: [
            {
                path: '',
                element: withFallback(<HomePage/>)
            },
            {
                path: 'tempPrint',
                element: withFallback(<TempPrint/>)
            },
            {
                path: 'test',
                element: withFallback(<Test/>)
            },
            {
                path: 'test2',
                element: withFallback(<Test2/>)
            }
        ]
    }
]

const Router = () => useRoutes(routes);

export default Router;