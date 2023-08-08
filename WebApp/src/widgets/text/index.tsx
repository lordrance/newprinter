import { Widget } from '@/interfaces'
import styles from './index.module.scss'
import {useSelector} from 'react-redux'
import useMouseWidget from '@/hooks/useMouseWidget'

const Text = ({index, isDesign}: {index: number, isDesign: boolean}) => {
  const data: Widget = useSelector((s: any) => s.tempWidget.widgets[index])
  return (
    <div className={styles.root} ref={isDesign?useMouseWidget(index):null}
      style={{
        width: data.width+'px',
        height: data.height+'px',
        left: data.left+'px',
        top: data.top+'px'
      }}
      suppressContentEditableWarning={true}
      contentEditable={true}
    >
      {data.value}
    </div>
  )
}

export default Text