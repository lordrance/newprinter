import { Button, Input, InputNumber, ColorPicker, Radio, Switch, Select } from 'antd'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Page, Template, Widget } from '@/interfaces'
import { changeWidgetWHO, changeWidgetPosO, addWidget, deleteWidget, changeActive, setStyle, createWidgets} from '@/store/slices/tempWidgetSlice'
import { changeTempName, changeTempPageWH, changeTempWH, createPage} from '@/store/slices/tempPageSlice'
import { useNavigate } from 'react-router-dom'
import store from '@/store'
import { preview } from '@/lodop'
import { getDefaultTable, getDefaultText, getFonts, getPaper } from '@/utils'

const Panel = () => {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const page: Page = useSelector((s: any) => s.tempPage)
    const widget: Widget = useSelector((s: any) => s.tempWidget.widgets[s.tempWidget.activeIndex])
    const active = useSelector((s: any) => s.tempWidget.activeIndex)

    const changePaper = (s: string) => {
        const wh = s.split(',')
        const e: number[] = [];
        e[0] = parseInt(wh[0]);
        e[1] = parseInt(wh[1])
        dispatch(changeTempPageWH({pageWidth: e[0], pageHeight: e[1]}))
        dispatch(changeTempWH({width: e[0]*3.8, height: e[1]*3.8}))
    }

    //1水平2竖直
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

    const deleteCur = () => {
        dispatch(deleteWidget())
        dispatch(changeActive(-1))
    }
    
    const cancel = () => {
        dispatch(createPage({
            name: '',
            width: 0,
            height: 0,
            pageHeight: 0,
            pageWidth: 0,
            uuid: 'null'
        }))
        dispatch(createWidgets([]))
        navigateTo('/home/tempPrint')
    }

    const previewTemp = () => {
        const temp: Template = {
            page,
            widgets: store.getState().tempWidget.widgets
        }
        preview(temp);
    }

    const save = () => {
        const temp: Template = {
            page,
            widgets: store.getState().tempWidget.widgets
        }

        let str = localStorage.getItem('temps');
        const data: Template[] = str ? JSON.parse(str) : [];
        const index = data.findIndex(x => x.page.uuid === temp.page.uuid)
        if (index === -1) {
            data.push(temp);
        } else {
            data[index] = temp
        }
        str = JSON.stringify(data)
        localStorage.setItem('temps', str)
        navigateTo('/home/tempPrint')
    }

  return (
    <div className={styles.root}>
        <div className='page'>
            <div className='title'>模板信息</div>
            <div className='main'>
                <div>
                    <label>模板名称</label>
                    <Input placeholder="请输入模板名称" value={page.name} onChange={
                        (e: any) => dispatch(changeTempName(e.target.value))
                        }/>
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
        <hr/>
        <div className='style'>
            <div className='title'>当前组件</div>
            <div className='main'>
                <div>
                    <span>
                        <label>宽度</label>
                        <InputNumber min={10} disabled={active===-1} value={active===-1?null:widget.width.toFixed(1)} onChange={
                            (e: any) => dispatch(changeWidgetWHO({width: e, height: widget.height}))
                        }/>
                    </span>
                    <span>
                        <label>高度</label>
                        <InputNumber min={10} disabled={active===-1} value={active===-1?null:widget.height.toFixed(1)} onChange={
                            (e: any) => dispatch(changeWidgetWHO({width: widget.width, height: e}))
                            }/>
                    </span>
                </div>
                <div>
                    <span>
                        <label>横坐标</label>
                        <InputNumber disabled={active===-1} value={active===-1?null:widget.left.toFixed(1)} onChange={
                            (e) => dispatch(changeWidgetPosO({left: e, top: widget.top}))
                        }/>
                    </span>
                    <span>
                        <label>纵坐标</label>
                        <InputNumber disabled={active===-1} value={active===-1?null:widget.top.toFixed(1)} onChange={
                            (e: any) => dispatch(changeWidgetPosO({left: widget.left, top: e}))
                        }/>
                    </span>
                </div>
                <div>
                    <span>
                        <label>字号</label>
                        <InputNumber disabled={active===-1} min={12} 
                        value={widget?.style?.FontSize ? widget?.style?.FontSize : 12}
                        onChange={
                            (e: any) => dispatch(setStyle({...widget.style, FontSize: e}))
                        }/>
                    </span>
                    <span>
                        <label>颜色</label>
                        <ColorPicker disabled={active===-1} onChange={
                            (e: any) => dispatch(setStyle({...widget.style, FontColor: '#'+e.toHex()}))
                        }
                        value={widget?.style?.FontColor ? widget?.style?.FontColor : '000000'}/>
                    </span>
                </div>
                <div>
                    <label>字体</label>
                    <Select
                        style={{width: 180}}
                        disabled={active===-1}
                        value={widget?.style?.FontName ? widget?.style?.FontName : null}
                        onSelect={
                            (e: any) => {
                                dispatch(setStyle({...widget.style, FontName: e}))
                            }
                        }
                        options={getFonts()}
                    />
                </div>
                <div>
                    <span>
                        <label>加粗</label>
                        <Switch disabled={active===-1} onChange={
                            (e: any) => dispatch(setStyle({...widget.style, Bold: e}))
                        }
                        checked={widget?.style?.Bold ? true : false}/>
                    </span>
                    <span>
                        <label>斜体</label>
                        <Switch disabled={active===-1} onChange={
                            (e: any) => dispatch(setStyle({...widget.style, Italic: e}))
                        }
                        checked={widget?.style?.Italic ? true : false}/>
                    </span>
                    <span>
                        <label>下划线</label>
                        <Switch disabled={active===-1} onChange={
                            (e: any) => dispatch(setStyle({...widget.style, Underline: e}))
                        } 
                        checked={widget?.style?.Underline ? true : false}/>
                    </span>
                </div>
                <div>
                    <label>对齐方式</label>
                    <Radio.Group disabled={active===-1} onChange={
                        (e: any) => dispatch(setStyle({...widget.style, Alignment: e.target.value}))
                    } 
                    value={widget?.style?.Alignment ? widget?.style?.Alignment : null }>
                        <Radio value={'left'}>左</Radio>
                        <Radio value={'center'}>中</Radio>
                        <Radio value={'right'}>右</Radio>
                    </Radio.Group>
                </div>
                <div>
                    <Button disabled={active === -1 || widget?.type !== 'table'}>新增一列</Button>
                    <Button disabled={active === -1 || widget?.type !== 'table'}>删除当前列</Button>
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
               <Button onClick={() => dispatch(addWidget(getDefaultText()))}>文本</Button> 
               <Button onClick={() => dispatch(addWidget(getDefaultTable()))}>表格</Button> 
               <Button>图片</Button> 
            </div>
        </div>
        <hr/>
        <div className='buttom'>
            <Button className='b1' onClick={cancel}>取消</Button>
            <Button className='b3' onClick={previewTemp}>预览</Button>
            <Button className='b2' type="primary" onClick={save}>保存</Button>
        </div>
    </div>
  )
}

export default Panel