import { Widget } from '@/interfaces'
import React from 'react'
import styles from './index.module.scss'
import {useSelector} from 'react-redux'

const Text = ({index}: {index: number}) => {
  const data: Widget = useSelector((s: any) => s.tempWidget.widgets[index])
  return (
    <div className={styles.root}
      style={{
        width: data.width+'px',
        height: data.height+'px',
        left: data.left+'px',
        top: data.top+'px'
      }}
    >
      {data.value}
    </div>
  )
}

export default Text