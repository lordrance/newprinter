import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, List, MenuProps, Menu } from 'antd'
import Preview from '@/components/preview';
import styles from './index.module.scss'
import { createPage } from '@/store/slices/tempPageSlice';
import { createWidgets } from '@/store/slices/tempWidgetSlice';
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Template, Page } from '@/interfaces';
import { v4 as uuid } from 'uuid';

const {Search} = Input;
const menuItems: MenuProps['items'] = [
  {
    label: '打印',
    key: 'print',
  },
  {
    label: '模板',
    key: 'temp',
  },
]

const TempPrint = () => {
  const navigateTo = useNavigate();
  const tempPage = useSelector((s: any) => s.tempPage)
  const dispatch = useDispatch();
  const str = localStorage.getItem('temps');
  const data: Template[] = str ? JSON.parse(str) : [];
  const handleChoose = (index: number) => {
    dispatch(createPage(data[index].page));
    dispatch(createWidgets(data[index].widgets));
  }

  const design = () => {
    if (tempPage.uuid === 'null') {
      alert('请选择模板')
    } else {
      navigateTo('designer')
    }
  }

  const createTemp = () => {
    const page: Page = {
      name: 'example',
      width: 500,
      height: 600,
      pageHeight: 600,
      pageWidth: 500,
      uuid: uuid()
    }
    dispatch(createPage(page));
    dispatch(createWidgets([]))
    navigateTo('designer')
  }

  return (
    <div className={styles.root}>
      <div className='header'>
        <Menu mode="horizontal" items={menuItems} />
      </div>
      <div className='container'>
        <div className='left'>
          <div className='title'>模板列表</div>
          <span className='buttoms'>
            <Search placeholder="input search text"  className='search' />
            <Button type="primary" icon={<PlusOutlined />} className='create' onClick={createTemp}>新建</Button>
          </span>
          <div className='list'>
            <List
              split={false}
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item onClick={() => handleChoose(index)}>
                    {item.page.name}
                </List.Item>
              )}
            />
          </div>
        </div>
        <div className='right'>
          <div className='temp-name'>{tempPage.name}</div>
          <div className='view-port'>
            <Preview/>
          </div>
          <span className='buttoms'>
            <Button danger className='delete-buttom'>删除</Button>
            <Button type="primary" className='design-buttom' onClick={design}>设计</Button>
          </span>
        </div>
      </div>
    </div>
  )
}

export default TempPrint