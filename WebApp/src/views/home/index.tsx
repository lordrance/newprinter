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

const { Content, Sider } = Layout;

type MenuItem = {
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
}

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

const items: MenuItem[] = [
  getItem('模板打印', 'tempPrint', <PrinterOutlined/>),
  getItem('test', 'test', <PieChartOutlined />),
  getItem('test2', 'test2', <PieChartOutlined />),
];

const Home: React.FC = () => {

  const navigateTo = useNavigate();

  //收放侧边栏
  const [collapsed, setCollapsed] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);
  
  const handleCollapse = (value: boolean) => {
    setCollapsed(value)
    if(value && logoRef.current) {
      logoRef.current.style.transform='translateX(-200px)'
    }
    else if (logoRef.current) {
      logoRef.current.style.transform='translateX(0)'
    }
  }

  //点击导航
  const [topItems, setTopItems] = useState([] as MenuItem[])
  const [selectKeys, setSelectKeys] = useState([] as string[])
  const handleClick = ({key}: {key: string}) => {
    navigateTo(key)
    setSelectKeys([key])
    if (!topItems.some(x=>x?.key === key)) {
        let label = items.find(k=>k?.key === key)?.label
        let item = {
          key: key,
          label: label
        } as MenuItem;
        const newState = [...topItems, item];
        setTopItems(newState)
    }
  }

  const handleTopClick = ({key}: {key: string}) => {
    navigateTo(key);
    setSelectKeys([key]);
  }

  const deleteRef = useRef<HTMLDivElement>(null);
  const handleMouseEnter = () => {
    const list = document.querySelectorAll('.right .header .ant-menu-item')
    list.forEach(x=>{
      x.addEventListener("mouseenter", handleTopEnter);
    })
  }

  const handleMouseLeave = () => {
    const list = document.querySelectorAll('.right .header .ant-menu-item')
    list.forEach(x=>{
      x.removeEventListener("mouseenter", handleTopEnter);
    })
  }

  let deleteLabel = ''
  const handleDelete = () => {
    const newTopItems = topItems.filter(x=>x.label!==deleteLabel)
    setTopItems(newTopItems)
    if (newTopItems.length !== 0 && (deleteLabel === items.find(x=>x.key === selectKeys[0])?.label)) {
      setSelectKeys([newTopItems[0].key.toString()])
      navigateTo(newTopItems[0].key.toString())
    }
    if (newTopItems.length === 0) setSelectKeys([])
    removeDelete()
  }

  const handleTopEnter = (e: any) => {
    deleteLabel = e.target.outerText;
    let c = deleteRef.current;
    let offset = e.target.offsetLeft+e.target.offsetWidth
    offset -= e.target.offsetWidth*0.15
    if (c) {
      c.style.display='block';
      c.style.transform=`translate(${offset}px, 5px)`
    }
  }

  const removeDelete = () => {
    if (deleteRef.current) {
      deleteRef.current.style.display='none'
    }
  }

  useEffect(() => {
    if (topItems.length === 0)
    navigateTo('')
  }, [topItems])

  return (
    <Layout className={styles.root}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => handleCollapse(value)}
        width={192} className='sider'>
        <img src={headLogo} className='head-logo' ref={logoRef}/>
        <Menu theme="dark" mode="inline" items={items} onClick={handleClick} selectedKeys={selectKeys}/>
      </Sider>
      <Layout className='right' >
        <div className='header' onMouseLeave={removeDelete}>
          <Menu mode="horizontal" items={topItems} selectedKeys={selectKeys} onClick={handleTopClick}
          onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
          <div className='delete' ref={deleteRef} onClick={handleDelete}/>
        </div>
        <Content className='content'>
          <Outlet/>
        </Content>
        <div className='footer'>江苏丰尚智能科技有限公司©版权所有<img src={logo} className='logo'/></div>
      </Layout>
    </Layout>
  );
};

export default Home;