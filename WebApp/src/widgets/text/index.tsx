import { Widget } from '@/interfaces'
import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import useMouseWidget from '@/hooks/useMouseWidget'
import { changeValue } from '@/store/slices/tempWidgetSlice'

const Text = ({index, isDesign}: {index: number, isDesign: boolean}) => {
  const dispatch = useDispatch();
  const data: Widget = useSelector((s: any) => s.tempWidget.widgets[index])

  const updateText = (e: any) => {
    dispatch(changeValue({index, value: e.target.innerText}))
  }

  return (
    <div className={styles.root} ref={isDesign?useMouseWidget(index):null}
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
      suppressContentEditableWarning={true}
      contentEditable={true}
      onBlur={updateText}
    >
      {data.value}
    </div>
  )
}

export default Text