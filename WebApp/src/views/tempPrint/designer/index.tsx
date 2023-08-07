import React from 'react'
import Design from '@/components/design'
import styles from './index.module.scss'

const Designer = () => {
  return (
    <div className={styles.root}>
        <div className='left'></div>
        <div className='right'>
            <Design/>
        </div>
    </div>
  )
}

export default Designer