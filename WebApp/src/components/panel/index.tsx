import { Button} from 'antd'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Page, Template} from '@/interfaces'
import {addWidget, createWidgets} from '@/store/slices/tempWidgetSlice'
import { createPage} from '@/store/slices/tempPageSlice'
import { useNavigate } from 'react-router-dom'
import store from '@/store'
import { preview } from '@/lodop'
import { getDefaultText, getDto, getTable, getText } from '@/utils'
import PanelPage from './page'
import PanelStyle from './style'

// 控制版面
const Panel = () => {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const page: Page = useSelector((s: any) => s.tempPage)
    const dto = getDto(page.type);

    // 取消按钮，清空redux数据，页面跳转
    const cancel = () => {
        dispatch(createPage({
            name: '',
            width: 0,
            height: 0,
            pageHeight: 0,
            pageWidth: 0,
            type: '',
            uuid: 'null'
        }))
        dispatch(createWidgets([]))
        navigateTo('/home/tempPrint')
    }

    // 预览模板，调lodop接口
    const previewTemp = () => {
        const temp: Template = {
            page,
            widgets: store.getState().tempWidget.widgets
        }
        preview(temp);
    }

    // 保存当前模板，存localStorage
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
            <PanelPage/>
        </div>
        <hr/>
        <div className='style'>
            <PanelStyle/>
        </div>
        <hr/>
        <div className='widget'>
            <div className='title'>添加组件</div>
            <div className='main'>
               <Button onClick={() => dispatch(addWidget(getDefaultText()))}>文本</Button> 
               { 
                 dto?.map((x, index)=> {
                    if (x.columns) {
                        return <Button key={index} onClick={() => dispatch(addWidget(getTable(x)))}>{x.name}</Button>
                    } else {
                        return <Button key={index} onClick={() => dispatch(addWidget(getText(x)))}>{x.name}</Button>
                    }
                 })
               }
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