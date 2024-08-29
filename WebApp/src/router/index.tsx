/*
 * @Author: uyrance uyrance@hotmal.com
 * @Date: 2024-08-07 18:18:03
 * @LastEditors: uyrance uyrance@hotmal.com
 * @LastEditTime: 2024-08-21 01:24:53
 * @FilePath: \WebApp\src\router\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom"
import Home from "@/views/home"
import { Spin } from "antd";
const HomePage = lazy(()=>import('@/views/homePage'))
const TempPrint = lazy(()=>import('@/views/tempPrint'))
const Test = lazy(()=>import('@/views/test'))
const Test2 = lazy(()=>import('@/views/test2'))
const Designer = lazy(() => import('@/views/tempPrint/designer'))

/*加载动画*/
const withFallback = (comp: JSX.Element) => (
    <React.Suspense fallback={<Spin size='large' style={{width: 100, height: 100, position: 'absolute', margin: 'auto', left: 0, right: 0, top: 0, bottom: 0}}/>}>
        {comp}
    </React.Suspense>
)
/*路由加载不同页面*/
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
    },
    {
        path: '/home/tempPrint/designer',
        element: withFallback(<Designer/>)
    }
]
/*useRoutes就是为了把routes打包成react组件，方便其他页面调用*/
const Router = () => useRoutes(routes);

export default Router;