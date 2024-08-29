import React, { useState, useRef, useEffect } from 'react';
import {
  PieChartOutlined,
  PrinterOutlined 
} from '@ant-design/icons';
import { Layout, Menu} from 'antd';
import styles from './index.module.scss'
import logo from '@/assets/logo.png'
import headLogo from '@/assets/head-logo.png'
import { Outlet, useNavigate } from 'react-router-dom';
import { MenuItem } from '@/interfaces';
import {useSelector, useDispatch} from 'react-redux'
import { addNav, deleteNav } from '@/store/slices/topNavSlice';
//Layout: 这是一个布局容器，分为左侧导航栏 (Sider) 和右侧的内容区（Content）。
const { Content, Sider } = Layout;
//一个帮助函数，用来简化菜单项的创建。每个菜单项可以有一个标签、一个唯一键（key）、一个图标（可选）以及子菜单（可选）。

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
//items: 定义了左侧导航栏的菜单项，例如 “模板打印”、“test”、“test2”。
const items: MenuItem[] = [
  getItem('模板打印', 'tempPrint', <PrinterOutlined/>),
  getItem('test', 'test', <PieChartOutlined />),
  getItem('test2', 'test2', <PieChartOutlined />),
];

//主页布局
const Home: React.FC = () => {

  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  //redux管理顶部导航项
  const topItems: MenuItem[] = useSelector((s: any) => s.topNav)

  //收放侧边栏
  const [collapsed, setCollapsed] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);
  
  //当收起侧边栏
  const handleCollapse = (value: boolean) => {
    setCollapsed(value)
    if(value && logoRef.current) {
      logoRef.current.style.transform='translateX(-200px)'
    }
    else if (logoRef.current) {
      logoRef.current.style.transform='translateX(0)'
    }
  }

  //点击左侧导航
  const [selectKeys, setSelectKeys] = useState([] as string[])
  const handleClick = ({key}: {key: string}) => {
    navigateTo(key)
    setSelectKeys([key])
    if (!topItems.some(x=>x?.key === key)) {
        const label = items.find(k=>k?.key === key)?.label
        const item = {
          key: key,
          label: label
        } as MenuItem;
        dispatch(addNav(item))
    }
  }

  //点击顶部导航
  const handleTopClick = ({key}: {key: string}) => {
    navigateTo(key);
    setSelectKeys([key]);
  }

  //鼠标进入顶部导航项
  const deleteRef = useRef<HTMLDivElement>(null);
  const handleMouseEnter = () => {
    const list = document.querySelectorAll('.right .header .ant-menu-item')
    list.forEach(x=>{
      x.addEventListener("mouseenter", handleTopEnter);
    })
  }

  //鼠标离开顶部导航项
  const handleMouseLeave = () => {
    const list = document.querySelectorAll('.right .header .ant-menu-item')
    list.forEach(x=>{
      x.removeEventListener("mouseenter", handleTopEnter);
    })
  }

  //点击顶部导航删除标签，redux删除顶部导航项
  let deleteLabel = ''
  const handleDelete = () => {
    const index = topItems.findIndex(x=>x.label === deleteLabel)
    if (index !== -1 && topItems[index].key === selectKeys[0]) {
      navigateTo('')
      setSelectKeys([])
    }
    dispatch(deleteNav(index))
    removeDelete()
  }

  //鼠标进入导航，显示删除标签
  const handleTopEnter = (e: any) => {
    deleteLabel = e.target.outerText;
    const c = deleteRef.current;
    let offset = e.target.offsetLeft+e.target.offsetWidth
    offset -= e.target.offsetWidth*0.15
    if (c) {
      c.style.display='block';
      c.style.transform=`translate(${offset}px, 5px)`
    }
  }

  //移除删除标签
  const removeDelete = () => {
    if (deleteRef.current) {
      deleteRef.current.style.display='none'
    }
  }

  //顶部导航为空时自动跳转至空页
  useEffect(() => {
    if (topItems.length === 0)
    navigateTo('')
  }, [topItems])

  return (
    <Layout className={styles.root}>
      {/* 左侧导航 */}
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => handleCollapse(value)}
        width={192} className='sider'>
        <img src={headLogo} className='head-logo' ref={logoRef}/>
        <Menu theme="dark" mode="inline" items={items} onClick={handleClick} selectedKeys={selectKeys}/>
      </Sider>
      <Layout className='right' >
        {/* 顶部导航 */}
        <div className='header' onMouseLeave={removeDelete}>
          <Menu mode="horizontal" items={topItems} selectedKeys={selectKeys} onClick={handleTopClick}
          onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
          <div className='delete' ref={deleteRef} onClick={handleDelete}/>
        </div>
        {/* 内容 */}
        <Content className='content'>
          <Outlet/>
        </Content>
        <div className='footer'>江苏丰尚智能科技有限公司©版权所有<img src={logo} className='logo'/></div>
      </Layout>
    </Layout>
  );
};

export default Home;