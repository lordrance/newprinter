import { Widget } from '@/interfaces'
import React from 'react'
import {useSelector} from 'react-redux'

const Text = ({index}: {index: number}) => {
  const data: Widget = useSelector((s: any) => s.tempWidget.widgets[index])

  return (
    <div>{data.value}</div>
  )
}

export default Text