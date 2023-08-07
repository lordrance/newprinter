import {useSelector} from 'react-redux'
import sytles from './index.module.scss'
import useMousePreview from '@/hooks/useMousePreview'
import Text from '@/widgets/text'

const Preview = () => {
    const ref = useMousePreview();
    const widgets = useSelector((s: any) => s.tempWidget.widgets);
    const width = useSelector((s: any) => s.tempPage.width);
    const height = useSelector((s: any) => s.tempPage.height);

    const select = (type: string, index: number) => {
        switch (type) {
            case 'text':
                return <Text index={index} key={index}/>
            default:
                break;
        }
    }

    return (
        <div ref={ref} className={sytles.root} style={{width: width, height: height}}>
            {
                widgets.map((x: any, index: number) => {
                    select(x.type, index)
                })
            }
        </div>
    )
}

export default Preview