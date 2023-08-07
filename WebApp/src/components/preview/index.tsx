import React, {useRef, useEffect} from 'react'
import {useSelector} from 'react-redux'
import sytles from './index.module.scss'
import useMousePreview from '@/hooks/useMousePreview'

const Preview = () => {
    const ref = useMousePreview();
    // const data = useSelector((state: any) => ({
    //     total: state.tempWidget.widgets.length, 
    //     width: state.tempPage.width,
    //     height: state.tempPage.height
    // }))


    return (
        <div ref={ref} className={sytles.root}>

        </div>
    )
}

export default Preview