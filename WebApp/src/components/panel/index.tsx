import { Button, Input, InputNumber, ColorPicker, Radio } from 'antd'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Page, Widget } from '@/interfaces'
import { changeWidgetWHO, changeWidgetPosO, addWidget, deleteWidget, changeActive} from '@/store/slices/tempWidgetSlice'
import { changeTempName, changeTempPageWH, changeTempWH} from '@/store/slices/tempPageSlice'
import { useNavigate } from 'react-router-dom'
const Panel = () => {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const page: Page = useSelector((s: any) => s.tempPage)
    const widget: Widget = useSelector((s: any) => s.tempWidget.widgets[s.tempWidget.activeIndex])
    const active = useSelector((s: any) => s.tempWidget.activeIndex)
    const changeWidth = (e: any) => {
        dispatch(changeWidgetWHO({width: e, height: widget.height}))
    }
    
    const changeHeight = (e: any) => {
        dispatch(changeWidgetWHO({width: widget.width, height: e}))
    }

    const changeLeft = (e: any) => {
        dispatch(changeWidgetPosO({left: e, top: widget.top}))
    }

    const changeTop = (e: any) => {
        dispatch(changeWidgetPosO({left: widget.left, top: e}))
    }

    const changeViewW = (e: any) => {
        dispatch(changeTempWH({width: e, height: page.height}))
    }

    const changeViewH = (e: any) => {
        dispatch(changeTempWH({width: page.width, height: e}))
    }

    const changePageH = (e: any) => {
        dispatch(changeTempPageWH({pageWidth: page.pageWidth, pageHeight: e}))
    }

    const changePageW = (e: any) => {
        dispatch(changeTempPageWH({pageWidth: e, pageHeight: page.pageHeight}))
    }

    const changeName = (e: any) => {
        dispatch(changeTempName(e.target.value))
    }

    const addText = () => {
        const text: Widget = {
            type: 'text',
            isEdit: true,
            resizable: true,
            width: 100,
            height: 50,
            left: Math.ceil(page.width/2 - 50),
            top: Math.ceil(page.height/2 - 25),
            value: '文本'
        }
        dispatch(addWidget(text))
    }

    const deleteCur = () => {
        dispatch(deleteWidget())
        dispatch(changeActive(-1))
    }
    
    const cancel = () => {
        navigateTo('/home/tempPrint')
    }

  return (
    <div className={styles.root}>
        <div className='page'>
            <div className='title'>模板信息</div>
            <div className='main'>
                <div>
                    <label>模板名称</label>
                    <Input placeholder="请输入模板名称" value={page.name} onChange={changeName}/>
                </div>
                <div>
                    <label>视口宽度</label>
                    <InputNumber min={10} value={page.width} onChange={changeViewW} />
                </div>
                <div>
                    <label>视口高度</label>
                    <InputNumber min={10}  value={page.height} onChange={changeViewH}/>
                </div>
                <div>
                    <label>纸张宽度(mm)</label>
                    <InputNumber min={10}  value={page.pageWidth} onChange={changePageW}/>
                </div>
                <div>
                    <label>纸张高度(mm)</label>
                    <InputNumber min={10}  value={page.pageHeight} onChange={changePageH}/>
                </div>
            </div>
        </div>
        <hr/>
        <div className='style'>
            <div className='title'>当前组件</div>
            <div className='main'>
                <div>
                    <span>
                        <label>宽度</label>
                        <InputNumber min={10} disabled={active===-1} value={active===-1?null:widget.width.toFixed(1)} onChange={changeWidth}/>
                    </span>
                    <span>
                        <label>高度</label>
                        <InputNumber min={10} disabled={active===-1} value={active===-1?null:widget.height.toFixed(1)} onChange={changeHeight}/>
                    </span>
                </div>
                <div>
                    <span>
                        <label>横坐标</label>
                        <InputNumber disabled={active===-1} value={active===-1?null:widget.left.toFixed(1)} onChange={changeLeft}/>
                    </span>
                    <span>
                        <label>纵坐标</label>
                        <InputNumber disabled={active===-1} value={active===-1?null:widget.top.toFixed(1)} onChange={changeTop}/>
                    </span>
                </div>
                <div>
                    <span>
                        <label>字号</label>
                        <InputNumber min={12} />
                    </span>
                    <span>
                        <label>颜色</label>
                        <ColorPicker />
                    </span>
                </div>
                <div>
                    <label>对齐方式</label>
                    <Radio.Group value={3}>
                        <Radio value={1}>左</Radio>
                        <Radio value={2}>中</Radio>
                        <Radio value={3}>右</Radio>
                    </Radio.Group>
                </div>
                <div>
                    <Button danger disabled={active===-1} onClick={deleteCur}>删除组件</Button>
                </div>
            </div>
        </div>
        <hr/>
        <div className='widget'>
            <div className='title'>添加组件</div>
            <div className='main'>
               <Button onClick={addText}>文本</Button> 
               <Button>表格</Button> 
               <Button>图片</Button> 
            </div>
        </div>
        <hr/>
        <div className='buttom'>
            <Button className='b1' onClick={cancel}>取消</Button>
            <Button className='b2' type="primary">保存</Button>
        </div>
    </div>
  )
}

export default Panel