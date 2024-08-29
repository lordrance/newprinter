import Design from '@/components/design'
import Panel from '@/components/panel'
import styles from './index.module.scss'
import { changeActive } from '@/store/slices/tempWidgetSlice'
import { useDispatch } from 'react-redux';

const Designer = () => {
    const dispatch = useDispatch();
    // 点击空白处时取消当前活跃组件
    const cancelActive = () => {
      dispatch(changeActive(-1))
    }
  return (
    <div className={styles.root}>
        <div className='left'>
          {/* 控制版面 */}
          <Panel/>
        </div>    
        <div className='right' onMouseDown={cancelActive}>
          {/* 工作区 */}
          <Design/>
        </div>
    </div>
  )
}

export default Designer