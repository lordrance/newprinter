import {useSelector} from 'react-redux'
import styles from './index.module.scss'
import useMouseSize from '@/hooks/useMouseSize'

const SizeController = () => {
    const widget = useSelector((s: any) => s.tempWidget.widgets[s.tempWidget.activeIndex])
    const ref = []
    for (let i = 0; i < 4; i++) {
        ref[i] = useMouseSize(i);
    }
    return (
        widget ? 
        <div className={styles.root} style={{
            width: widget.width + 1,
            height: widget.height + 1,
            left: widget.left - 1.3,
            top: widget.top - 1.2
        }}>
            {/* //上 */}
            <div style={{
                left: widget.width/2 - 2.5,
                top: -5
            }} ref={ref[0]}/>
            {/* 右 */}
            <div style={{
                left: widget.width - 1.5,
                top: widget.height/2 - 1.5
            }} ref={ref[1]}/>
            {/* 下  */}
            <div style={{
                left: widget.width/2 - 2.5,
                top: widget.height - 1.5
            }} ref={ref[2]}/>
            {/* 左 */}
            <div style={{
                left: -5,
                top: widget.height/2 - 1.5
            }} ref={ref[3]}/>
        </div>
        : null
    )
}

export default SizeController