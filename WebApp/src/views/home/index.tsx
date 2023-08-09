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

const { Content, Sider } = Layout;

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
  const dispatch = useDispatch();
  const topItems: MenuItem[] = useSelector((s: any) => s.topNav)

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
        dispatch(addNav(item))
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
    const index = topItems.findIndex(x=>x.label === deleteLabel)
    console.log(index, deleteLabel)
    if (index !== -1 && topItems[index].key === selectKeys[0]) {
      navigateTo('')
      setSelectKeys([])
    }
    dispatch(deleteNav(index))
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