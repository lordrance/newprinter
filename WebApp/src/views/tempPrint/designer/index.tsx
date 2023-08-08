import React from 'react'
import Design from '@/components/design'
import Panel from '@/components/panel'
import styles from './index.module.scss'
import { changeActive } from '@/store/slices/tempWidgetSlice'
import { useDispatch } from 'react-redux';

const Designer = () => {
    const dispatch = useDispatch();
    const cancelActive = () => {
      dispatch(changeActive(-1))
    }
  return (
    <div className={styles.root}>
        <div className='left'>
          <Panel/>
        </div>
        <div className='right' onMouseDown={cancelActive}>
          <Design/>
        </div>
    </div>
  )
}

export default Designer