import { Widget, Column } from '@/interfaces'
import {useSelector} from 'react-redux'
import styles from './index.module.scss'
import useMouseWidget from '@/hooks/useMouseWidget'

const Table = ({index, isDesign}: {index: number, isDesign: boolean}) => {
  const data: Widget = useSelector((s: any) => s.tempWidget.widgets[index])
  const ref = useMouseWidget(index)

  return (
    <div className={styles.root} ref={isDesign?ref:null}
      style={{
        width: data.width+'px',
        height: data.height+'px',
        left: data.left+'px',
        top: data.top+'px',
        fontSize: data?.style?.FontSize+'pt',
        fontWeight: data?.style?.Bold ? 'bold' : 'normal',
        fontStyle: data?.style?.Italic ? 'italic' : 'normal',
        textDecoration: data?.style?.Underline ? 'underline' : 'none',
        textAlign: data?.style?.Alignment === 'right' ? 'right' : data?.style?.Alignment === 'center' ? 'center' : 'left',
        color: data?.style?.FontColor,
        fontFamily: data?.style?.FontName
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