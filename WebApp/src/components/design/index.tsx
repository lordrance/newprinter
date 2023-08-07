import React from 'react'
import useMouseScreen from '@/hooks/useMouseScreen'
import {useSelector} from 'react-redux'
import styles from './index.module.scss'
import { selectWidget } from '@/utils'

const Design = () => {
    const ref = useMouseScreen();
    const width = useSelector((s: any) => s.tempPage.width);
    const height = useSelector((s: any) => s.tempPage.height);
    const widgets = useSelector((s: any) => s.tempWidget.widgets, (a, b) => {
        return a.length === b.length
    })
    console.log("Design draw")
    return (
        <div ref={ref} className={styles.root} style={{width: width, height: height}}>
            {
                widgets.map((x: any, index: number) => {
                   return selectWidget(x.type, index, true)
                })
            }
        </div>
    )
}

export default Design