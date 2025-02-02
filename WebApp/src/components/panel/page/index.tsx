import {  Input, InputNumber, Select, Modal } from 'antd'
import {ExclamationCircleOutlined} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { changeTempName, changeTempPageWH, changeTempWH, setType} from '@/store/slices/tempPageSlice'
import {  getPaper, getTempType } from '@/utils'
import { Page} from '@/interfaces'
import styles from './index.module.scss'
import { removeAll } from '@/store/slices/tempWidgetSlice';

//模板纸张控制版面
const PanelPage = () => {
    const dispatch = useDispatch();
    const page: Page = useSelector((s: any) => s.tempPage)
    const changeDirection = (e: any) => {
        if (e === 1) {
            if (page.pageHeight > page.pageWidth) {
                dispatch(changeTempPageWH({pageWidth: page.pageHeight, pageHeight: page.pageWidth}))
                dispatch(changeTempWH({width: page.height, height: page.width}))
            }
        } else {
            if (page.pageHeight < page.pageWidth) {
                dispatch(changeTempPageWH({pageWidth: page.pageHeight, pageHeight: page.pageWidth}))
                dispatch(changeTempWH({width: page.height, height: page.width}))
            }
        }
    }
    const changePaper = (s: string) => {
        const wh = s.split(',')
        const e: number[] = [];
        e[0] = parseInt(wh[0]);
        e[1] = parseInt(wh[1])
        dispatch(changeTempPageWH({pageWidth: e[0], pageHeight: e[1]}))
        dispatch(changeTempWH({width: e[0]*3.8, height: e[1]*3.8}))
    }

    const chooseTempType = (e: any) => {
        Modal.confirm({
            title: '确认改变模板类型？',
            icon: <ExclamationCircleOutlined/>,
            content: '这将会清空模板内容',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => {
                dispatch(removeAll())
                dispatch(setType(e))
            }
        })
    }

  return (
    <div className={styles.root}>
        <div className='title'>模板信息</div>
        <div className='main'>
            <div>
                <label>模板名称</label>
                <Input placeholder="请输入模板名称" value={page.name} onChange={
                    (e: any) => dispatch(changeTempName(e.target.value))
                    }/>
            </div>
            <div>
                <label>模板类型</label>
                <Select
                    style={{width: 130}}
                    value={page.type}
                    onChange={chooseTempType}
                    options={getTempType()}
                />
            </div>
            <div>
                <label>纸张宽度(mm)</label>
                <InputNumber min={10}  value={page.pageWidth} onChange={
                    (e: any) => {
                        dispatch(changeTempPageWH({pageWidth: e, pageHeight: page.pageHeight}))
                        dispatch(changeTempWH({width: e*3.8, height: page.height}))
                    }
                }/>
            </div>
            <div>
                <label>纸张高度(mm)</label>
                <InputNumber min={10}  value={page.pageHeight} onChange={
                    (e: any) => {
                        dispatch(changeTempPageWH({pageWidth: page.pageWidth, pageHeight: e}))
                        dispatch(changeTempWH({width: page.width, height: e*3.8}))
                    }
                }/>
            </div>
            <div>
                <span>
                    <label>常用纸张</label>
                    <Select
                        style={{width: 80}}
                        onSelect={changePaper}
                        options={getPaper()}
        
                    />                   
                </span>
                <span>
                    <label>方向</label>
                    <Select
                        style={{width: 80}}
                        onSelect={changeDirection}
                        options={[
                            {value: 1, label: '水平'},
                            {value: 2, label: '竖直'}
                        ]}
                    />
                </span>
            </div>
        </div>
    </div>
  )
}

export default PanelPage