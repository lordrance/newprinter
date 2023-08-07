import {useState} from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, List, MenuProps, Menu } from 'antd'
import Preview from '@/components/preview';
import styles from './index.module.scss'
import { createPage } from '@/store/slices/tempPageSlice';
import { createWidgets } from '@/store/slices/tempWidgetSlice';
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { generateRandomTemplate } from '@/test/testData';
import { Template } from '@/interfaces';

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

const data: Template[] = [];
for (let i = 0; i < 20; i++) {
  data[i] = generateRandomTemplate();
}
const TempPrint = () => {
  const navigateTo = useNavigate();
  const [tempName, setTempName] = useState('');
  const dispatch = useDispatch();
  
  const handleChoose = (index: number) => {
    dispatch(createPage(data[index].page));
    dispatch(createWidgets(data[index].widgets));
    setTempName(data[index].page.name)
  }

  const design = () => {
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
            <Button type="primary" icon={<PlusOutlined />} className='create'>新建</Button>
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
          <div className='temp-name'>{tempName}</div>
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