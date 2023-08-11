import {useState} from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, List, MenuProps, Menu, Modal } from 'antd'
import Preview from '@/components/preview';
import styles from './index.module.scss'
import { createPage } from '@/store/slices/tempPageSlice';
import { createWidgets } from '@/store/slices/tempWidgetSlice';
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Template, Page } from '@/interfaces';
import { v4 as uuid } from 'uuid';
import { getTestData } from '@/utils';
import store from '@/store';
import { preview } from '@/lodop';

const {Search, TextArea} = Input;
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  let testData: string = '';

  const handleOk = (e: any) => {
    const temp: Template = {
      page: tempPage,
      widgets: store.getState().tempWidget.widgets
    }
    let data: any = null
    try {
      data = JSON.parse(testData)
    } catch(err) {
      alert('数据格式错误')
      return;
    }
    console.log(data)
    preview(temp, data)
    setIsModalOpen(false);
  };

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
      width: 210*3.8,
      height: 297*3.8,
      pageHeight: 297,
      pageWidth: 210,
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
          <div className='temp-name'>
            {tempPage.name}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" onClick={() => setIsModalOpen(true)} 
              disabled={tempPage.uuid === 'null'}
            >
                测试数据预览
            </Button>
            <Modal title="测试数据" open={isModalOpen} onOk={handleOk} 
            onCancel={() => setIsModalOpen(false)}>
              <TextArea defaultValue={testData = getTestData()} autoSize={true}
              onBlur={(e: any) => testData=e.target.value}/>
            </Modal>
          </div>
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