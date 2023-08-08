import { Button, Input, InputNumber, ColorPicker, Radio } from 'antd'
import styles from './index.module.scss'

const Panel = () => {
  return (
    <div className={styles.root}>
        <div className='page'>
            <div className='title'>模板信息</div>
            <div className='main'>
                <div>
                    <label>模板名称</label>
                    <Input placeholder="请输入模板名称"/>
                </div>
                <div>
                    <label>视口宽度</label>
                    <InputNumber min={1} max={10} defaultValue={3}  />
                </div>
                <div>
                    <label>视口高度</label>
                    <InputNumber min={1} max={10} defaultValue={3}  />
                </div>
                <div>
                    <label>纸张宽度(mm)</label>
                    <InputNumber min={1} max={10} defaultValue={3} />
                </div>
                <div>
                    <label>纸张高度(mm)</label>
                    <InputNumber min={1} max={10} defaultValue={3}  />
                </div>
            </div>
        </div>
        <hr/>
        <div className='style'>
            <div className='title'>当前组件</div>
            <div className='main'>
                <div>
                    <span>
                        <label>宽度</label>
                        <InputNumber min={1} max={10} defaultValue={3} />
                    </span>
                    <span>
                        <label>高度</label>
                        <InputNumber min={1} max={10} defaultValue={3} />
                    </span>
                </div>
                <div>
                    <span>
                        <label>横坐标</label>
                        <InputNumber min={1} max={10} defaultValue={3} />
                    </span>
                    <span>
                        <label>纵坐标</label>
                        <InputNumber min={1} max={10} defaultValue={3} />
                    </span>
                </div>
                <div>
                    <span>
                        <label>字号</label>
                        <InputNumber min={1} max={10} defaultValue={3} />
                    </span>
                    <span>
                        <label>颜色</label>
                        <ColorPicker />
                    </span>
                </div>
                <div>
                    <label>对齐方式</label>
                    <Radio.Group value={3}>
                        <Radio value={1}>左</Radio>
                        <Radio value={2}>中</Radio>
                        <Radio value={3}>右</Radio>
                    </Radio.Group>
                </div>
            </div>
        </div>
        <hr/>
        <div className='widget'>
            <div className='title'>添加组件</div>
            <div className='main'>
               <Button>文本</Button> 
               <Button>表格</Button> 
               <Button>图片</Button> 
            </div>
        </div>
        <hr/>
        <div className='buttom'>
            <Button className='b1'>取消</Button>
            <Button className='b2' type="primary">保存</Button>
        </div>
    </div>
  )
}

export default Panel