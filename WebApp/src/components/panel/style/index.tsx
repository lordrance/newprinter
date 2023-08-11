import { Button, InputNumber, ColorPicker, Radio, Switch, Select, Input } from 'antd'
import { changeWidgetWHO, changeWidgetPosO, deleteWidget, changeActive, setStyle,deleteCurCol, addCol, changeValue, setTableName} from '@/store/slices/tempWidgetSlice'
import { useSelector, useDispatch } from 'react-redux'
import { getFonts, tableToHtml} from '@/utils'
import styles from './index.module.scss'
import { Widget } from '@/interfaces'

const PanelStyle = () => {
    const dispatch = useDispatch();
    const active = useSelector((s: any) => s.tempWidget.activeIndex)
    const widget: Widget | undefined = useSelector((s: any) => s.tempWidget.widgets[s.tempWidget.activeIndex])
    const deleteCur = () => {
        dispatch(deleteWidget())
        dispatch(changeActive(-1))
    }
  return (
    <div className={styles.root}>
        <div className='title'>当前组件</div>
        <div className='main'>
            <div>
                <span>
                    <label>宽度</label>
                    <InputNumber min={10} disabled={active===-1} value={active===-1?null:widget?.width.toFixed(1)} onChange={
                        (e: any) => dispatch(changeWidgetWHO({width: e, height: widget?.height}))
                    }/>
                </span>
                <span>
                    <label>高度</label>
                    <InputNumber min={10} disabled={active===-1} value={active===-1?null:widget?.height.toFixed(1)} onChange={
                        (e: any) => dispatch(changeWidgetWHO({width: widget?.width, height: e}))
                        }/>
                </span>
            </div>
            <div>
                <span>
                    <label>横坐标</label>
                    <InputNumber disabled={active===-1} value={active===-1?null:widget?.left.toFixed(1)} onChange={
                        (e) => dispatch(changeWidgetPosO({left: e, top: top}))
                    }/>
                </span>
                <span>
                    <label>纵坐标</label>
                    <InputNumber disabled={active===-1} value={active===-1?null:widget?.top.toFixed(1)} onChange={
                        (e: any) => dispatch(changeWidgetPosO({left: widget?.left, top: e}))
                    }/>
                </span>
            </div>
            <div>
                <span>
                    <label>字号</label>
                    <InputNumber disabled={active===-1} min={12} 
                    value={widget?.style?.FontSize ? widget?.style?.FontSize : null}
                    onChange={
                        (e: any) => dispatch(setStyle({...widget?.style, FontSize: e}))
                    }/>
                </span>
                <span>
                    <label>字体颜色</label>
                    <ColorPicker disabled={active===-1} onChangeComplete={
                        (e: any) => dispatch(setStyle({...widget?.style, FontColor: '#'+e.toHex()}))
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
                            dispatch(setStyle({...widget?.style, FontName: e}))
                        }
                    }
                    options={getFonts()}
                />
            </div>
            <div>
                <span>
                    <label>加粗</label>
                    <Switch disabled={active===-1} onChange={
                        (e: any) => dispatch(setStyle({...widget?.style, Bold: e}))
                    }
                    checked={widget?.style?.Bold ? true : false}/>
                </span>
                <span>
                    <label>斜体</label>
                    <Switch disabled={active===-1} onChange={
                        (e: any) => dispatch(setStyle({...widget?.style, Italic: e}))
                    }
                    checked={widget?.style?.Italic ? true : false}/>
                </span>
                <span>
                    <label>下划线</label>
                    <Switch disabled={active===-1} onChange={
                        (e: any) => dispatch(setStyle({...widget?.style, Underline: e}))
                    } 
                    checked={widget?.style?.Underline ? true : false}/>
                </span>
            </div>
            <div>
                <label>对齐方式</label>
                <Radio.Group disabled={active===-1} onChange={
                    (e: any) => dispatch(setStyle({...widget?.style, Alignment: e.target.value}))
                } 
                value={widget?.style?.Alignment ? widget?.style?.Alignment : null }>
                    <Radio value={'left'}>左</Radio>
                    <Radio value={'center'}>中</Radio>
                    <Radio value={'right'}>右</Radio>
                </Radio.Group>
            </div>
            <div>
                <label>表格名称</label>
                <Input disabled={active === -1 || widget?.type !== 'table'}
                    onChange={(e: any) => dispatch(setTableName(e.target.value))}
                    value={widget?.tableName ? widget?.tableName : undefined}
                />
            </div>
            <div>
                <label>表格列</label>
                <Button disabled={active === -1 || widget?.type !== 'table'}
                    onClick={() => {dispatch(addCol())}}
                >新增一列</Button>
                <Button disabled={active === -1 || widget?.type !== 'table' || widget?.activeCol === -1} 
                    onClick={() => dispatch(deleteCurCol())}
                >删除当前列</Button>
            </div>
            <div>
                <span>
                    <label>边框粗细</label>
                    <InputNumber min={1} disabled={active === -1 || widget?.type !== 'table'}
                        value={widget?.style?.BorderWidth ? widget?.style?.BorderWidth : null}
                        onChange={
                        (e: any) => dispatch(setStyle({...widget?.style, BorderWidth: e}))
                    }/>
                </span>
                <span>
                    <label>边框颜色</label>
                    <ColorPicker disabled={active === -1 || widget?.type !== 'table'}
                        value={widget?.style?.BorderColor? widget?.style?.BorderColor : '000000'}
                        onChangeComplete={
                        (e: any) => dispatch(setStyle({...widget?.style, BorderColor: '#'+e.toHex()}))
                    }/>
                </span>
            </div>
            <div>
                <Button danger disabled={active===-1} onClick={deleteCur}>删除组件</Button>
                {/* <Button onClick={() => tableToHtml(widget?.style, widget?.columns)}>test</Button> */}
            </div>
        </div>
    </div>
  )
}

export default PanelStyle