import React from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, List, MenuProps, Menu } from 'antd'
import Preview from '@/components/preview';
import styles from './index.module.scss'
import { createPage } from '@/store/slices/tempPageSlice';
import { createWidgets } from '@/store/slices/tempWidgetSlice';
import {useDispatch} from 'react-redux'
import { generateRandomTemplate } from '@/test/testData';

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

const data = [
  'Racing car sprays .',
  'Japanese princess.',
  'Australian walksrash.',
  'Man charged overgirl.',
  'Los Angeles battes.',
  'Los Angeles battes.',
  'Los Angeles battes.',
  'Los Angeles battes.',
  'Los Angeles battes.',
  'Los Angeles battes.',
  'Los Angeles battes.',
  'Los Angeles battes.',
  'Los Angeles battes.',
  'Los Angeles battes.',
  'Los Angeles battes.',
];

const TempPrint = () => {
  const dispatch = useDispatch();
  const t = generateRandomTemplate();
  dispatch(createPage(t.page))
  dispatch(createWidgets(t.widgets))

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
              renderItem={(item) => (
                <List.Item>
                  {item}
                </List.Item>
              )}
            />
          </div>
        </div>
        <div className='right'>
          <div className='temp-name'>模板名aaaaa</div>
          <div className='view-port'>
            <Preview/>
          </div>
          <span className='buttoms'>
            <Button danger className='delete-buttom'>删除</Button>
            <Button type="primary" className='design-buttom'>设计</Button>
          </span>
        </div>
      </div>
    </div>
  )
}

export default TempPrint