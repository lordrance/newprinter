import { Widget, Column } from '@/interfaces'
import React from 'react'
import {useSelector} from 'react-redux'
import styles from './index.module.scss'

const Table = ({index, isDesign}: {index: number, isDesign: boolean}) => {
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
      <tr>
        {
          data.columns?.map((x: Column, index: number) => (
            <th key={index}>{x.name}</th>
          ))
        }
      </tr>
      <tr>
        {
          data.columns?.map((x: Column, index: number) => (
            <td key={index}>{x.value}</td>
          ))
        }
      </tr>
    </div>
  )
}

export default Table