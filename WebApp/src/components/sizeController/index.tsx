import React from 'react'
import {useSelector} from 'react-redux'
import styles from './index.module.scss'

const SizeController = () => {
    const widget = useSelector((s: any) => s.tempWidget.widgets[s.tempWidget.activeIndex])
    return (
        widget ? 
        <div className={styles.root} style={{
            width: widget.width + 1.5,
            height: widget.height + 1.5,
            left: widget.left + 0.5,
            top: widget.top + 0.5
        }} >
            <div style={{
                width: '5px',
                height: '5px',
                left: widget.width/2 - 2.5,
                top: -3.5
            }}/>
            <div style={{
                width: '5px',
                height: '5px',
                left: widget.width/2 - 2.5,
                top: widget.height - 1.5
            }}/>
            <div style={{
                width: '5px',
                height: '5px',
                left: widget.width - 1.5,
                top: widget.height/2 - 1.5
            }}/>
            <div style={{
                width: '5px',
                height: '5px',
                left: -3.5,
                top: widget.height/2 - 1.5
            }}/>
        </div>
        : null
    )
}

export default SizeController