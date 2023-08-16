import useMouseScreen from '@/hooks/useMouseScreen'
import {useSelector} from 'react-redux'
import styles from './index.module.scss'
import { selectWidget } from '@/utils'
import SizeController from '../sizeController'

const Design = () => {
    const ref = useMouseScreen();
    // 模板长宽
    const width = useSelector((s: any) => s.tempPage.width);
    const height = useSelector((s: any) => s.tempPage.height);
    // 模板所有组件
    const widgets = useSelector((s: any) => s.tempWidget.widgets, (a, b) => {
        return a.length === b.length
    })
    return (
        <div ref={ref} className={styles.root} style={{width: width, height: height}}>
            {/* 组件大小控制器 */}
            <SizeController/>
            {/* 画所有组件 */}
            {
                widgets.map((x: any, index: number) => {
                   return selectWidget(x.type, index, true)
                })
            }
        </div>
    )
}

export default Design