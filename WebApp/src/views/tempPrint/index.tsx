import {useState} from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, List, Modal, Select, message, Popconfirm } from 'antd'
import Preview from '@/components/preview';
import styles from './index.module.scss'
import { changeTempName, changeTempPageWH, changeTempWH, createPage, setType, setUUID } from '@/store/slices/tempPageSlice';
import { createWidgets } from '@/store/slices/tempWidgetSlice';
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Template, Page } from '@/interfaces';
import { v4 as uuid } from 'uuid';
import { getTempType, getTestData } from '@/utils';
import store from '@/store';
import { preview } from '@/lodop';

const {Search, TextArea} = Input;

const TempPrint = () => {
  const navigateTo = useNavigate();
  const tempPage = useSelector((s: any) => s.tempPage)
  const dispatch = useDispatch();
  const str = localStorage.getItem('temps');
  const data: Template[] = str ? JSON.parse(str) : [];
  const [testDataModal, setTestDataModal] = useState(false);
  const [newTempModal, setNewTempModal] = useState(false);

  let testData: string = '';

  const handleOk = () => {
    const temp: Template = {
      page: tempPage,
      widgets: store.getState().tempWidget.widgets
    }
    let data: any = null
    try {
      data = JSON.parse(testData)
    } catch(err) {
      message.error('数据格式错误')
      return;
    }
    preview(temp, data)
    setTestDataModal(false);
  };

  const handleChoose = (index: number) => {
    dispatch(createPage(data[index].page));
    dispatch(createWidgets(data[index].widgets));
  }

  const handleDelete = () => {
    let str = localStorage.getItem('temps');
    const data: Template[] = str ? JSON.parse(str) : [];
    const index = data.findIndex(x => x.page.uuid === tempPage.uuid)
    if (index !== -1)
    data.splice(index, 1);
    str = JSON.stringify(data);
    localStorage.setItem('temps', str)
    clearTemp();
    message.success('删除成功')
  }

  const createTemp = () => {
    dispatch(changeTempWH({width: 210*3.8, height: 297*3.8}));
    dispatch(changeTempPageWH({pageWidth: 210, pageHeight: 297}))
    dispatch(setUUID(uuid()))
    setNewTempModal(false);
    navigateTo('designer')
  }

  const clearTemp = () => {
    const page: Page = {
        name: '',
        width: 0,
        height: 0,
        pageWidth: 0,
        pageHeight: 0,
        type: '',
        uuid: 'null'
    }
    dispatch(createPage(page));
    dispatch(createWidgets([]))
  }

  return (
    <div className={styles.root}>
        <div className='left'>
          <div className='title'>模板列表</div>
          <span className='buttoms'>
            <Search placeholder="input search text"  className='search' />
            <Button type="primary" icon={<PlusOutlined />} className='create' 
            onClick={() => {clearTemp(); setNewTempModal(true)}}>新建</Button>
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
          <div className='right-top'>
            <span>
              {tempPage.uuid !== 'null' ? tempPage.name : ''}
            </span>
            <span>
              <Button onClick={() => setTestDataModal(true)} 
                disabled={tempPage.uuid === 'null'}
              >测试数据预览</Button>
              <Popconfirm
                title="确定删除？"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button danger
                  disabled={tempPage.uuid === 'null'}
                >删除</Button>
              </Popconfirm>
              <Button type="primary" onClick={() => navigateTo('designer')} 
                disabled={tempPage.uuid === 'null'}
              >设计</Button>
            </span>
          </div>
          <div className='view-port'>
            <Preview/>
          </div>
        </div>
        <div>
          <Modal title="测试数据" open={testDataModal} onOk={handleOk} 
          onCancel={() => setTestDataModal(false)}>
            <TextArea defaultValue={testData = getTestData(tempPage.type === 'PowerConsumption'?'pw' : 'de')} autoSize={true}
            onBlur={(e: any) => testData=e.target.value}/>
          </Modal>
          <Modal title="新建模板" open={newTempModal} onOk={createTemp} 
          onCancel={() => setNewTempModal(false)} width={600}>
            <label>模板类型</label>
            <Select
              style={{ width: 120, margin: '20px 20px 10px 20px'}}
              onSelect={(e: any) => dispatch(setType(e))}
              options={getTempType()}
            />
            <label>模板名称</label>
            <Input style={{width: '200px', margin: '20px 20px 10px 20px'}}
              onChange={(e: any) => dispatch(changeTempName(e.target.value))}
            />
          </Modal>
        </div>
    </div>
  )
}

export default TempPrint