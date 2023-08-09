import { Button, Input, InputNumber, ColorPicker, Radio, Switch, Select } from 'antd'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Page, Template, Widget } from '@/interfaces'
import { changeWidgetWHO, changeWidgetPosO, addWidget, deleteWidget, changeActive, setStyle, createWidgets} from '@/store/slices/tempWidgetSlice'
import { changeTempName, changeTempPageWH, changeTempWH, createPage} from '@/store/slices/tempPageSlice'
import { useNavigate } from 'react-router-dom'
import store from '@/store'

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
    const changePaper = (e: any) => {
        switch (e) {
            case 'a4':
                dispatch(changeTempPageWH({pageWidth: 210, pageHeight: 297}))
                dispatch(changeTempWH({width: 210*3, height: 297*3}))
                break;
            case 'a5':
                dispatch(changeTempPageWH({pageWidth: 148, pageHeight: 210}))
                dispatch(changeTempWH({width: 148*3, height: 210*3}))
                break;
            case 'a6':
                dispatch(changeTempPageWH({pageWidth: 105, pageHeight: 144}))
                dispatch(changeTempWH({width: 105*3, height: 144*3}))
                break;
            default:
                break;
        }
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

    const bold = (e: any) => {
        const style = {...widget.style, Bold: e}
        dispatch(setStyle(style))
    }

    const italic = (e: any) => {
        const style = {...widget.style, Italic: e}
        dispatch(setStyle(style))
    }

    const underline = (e: any) => {
        const style = {...widget.style, Underline: e}
        dispatch(setStyle(style))
    }

    const align = (e: any) => {
        const style = {...widget.style, Alignment: e.target.value}
        dispatch(setStyle(style))
    }

    const fontSize = (e: any) => {
        const style = {...widget.style, FontSize: e}
        dispatch(setStyle(style))
    }

    const color = (e: any) => {
        const style = {...widget.style, FontColor: '#'+e.toHex()}
        dispatch(setStyle(style))
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
            value: '文本',
            style: {
                Bold: false,
                Italic: false,
                FontSize: 12,
                Alignment: 'left',
                Underline: false,
                FontColor: '#000000'
            }
        }
        dispatch(addWidget(text))
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
                    <Input placeholder="请输入模板名称" value={page.name} onChange={changeName}/>
                </div>
                <div>
                    <span>
                        <label>视口宽度</label>
                        <InputNumber min={10} value={page.width} onChange={changeViewW} />
                    </span>
                    <span>
                        <label>视口高度</label>
                        <InputNumber min={10}  value={page.height} onChange={changeViewH}/>
                    </span>
                </div>
                <div>
                    <label>纸张宽度(mm)</label>
                    <InputNumber min={10}  value={page.pageWidth} onChange={changePageW}/>
                </div>
                <div>
                    <label>纸张高度(mm)</label>
                    <InputNumber min={10}  value={page.pageHeight} onChange={changePageH}/>
                </div>
                <div>
                    <span>
                        <label>常用纸张</label>
                        <Select
                            style={{width: 70}}
                            onSelect={changePaper}
                            options={[
                                { value: 'a4', label: 'A4' },
                                { value: 'a5', label: 'A5' },
                                { value: 'a6', label: 'A6' },
                            ]}
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
                        <InputNumber disabled={active===-1} min={12} 
                        value={widget?.style?.FontSize ? widget?.style?.FontSize : 12}
                        onChange={fontSize}/>
                    </span>
                    <span>
                        <label>颜色</label>
                        <ColorPicker disabled={active===-1} onChange={color}
                        value={widget?.style?.FontColor ? widget?.style?.FontColor : '000000'}/>
                    </span>
                </div>
                <div>
                    <span>
                        <label>加粗</label>
                        <Switch disabled={active===-1} onChange={bold}
                        checked={widget?.style?.Bold ? true : false}/>
                    </span>
                    <span>
                        <label>斜体</label>
                        <Switch disabled={active===-1} onChange={italic}
                        checked={widget?.style?.Italic ? true : false}/>
                    </span>
                    <span>
                        <label>下划线</label>
                        <Switch disabled={active===-1} onChange={underline} 
                        checked={widget?.style?.Underline ? true : false}/>
                    </span>
                </div>
                <div>
                    <label>对齐方式</label>
                    <Radio.Group disabled={active===-1} onChange={align} value={widget?.style?.Alignment ? widget?.style?.Alignment : null }>
                        <Radio value={'left'}>左</Radio>
                        <Radio value={'center'}>中</Radio>
                        <Radio value={'right'}>右</Radio>
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
            <Button className='b2' type="primary" onClick={save}>保存</Button>
        </div>
    </div>
  )
}

export default Panel