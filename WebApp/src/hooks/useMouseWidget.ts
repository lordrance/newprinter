import {useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { changeWidgetPos, changeActive } from '@/store/slices/tempWidgetSlice';
const useMouseWidget = (index: number) => {
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const width = useSelector((s: any) => s.tempPage.width)
    const height = useSelector((s: any) => s.tempPage.height)
    const handleDown = (e: MouseEvent) => {
        e.stopPropagation(); 
        dispatch(changeActive(index))
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleUp);
    }
    const handleMove = (e: MouseEvent) => {
        e.stopPropagation(); e.preventDefault();
        let trans = ref.current?.parentElement?.style.transform;
        const s = trans?.match(/scale\((.*?)\)/)
        const scale = s ? parseFloat(s[1]) : 1
        dispatch(changeWidgetPos({moveX: e.movementX/scale, moveY: e.movementY/scale, width, height}))
    }
    const handleUp = () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleUp);
    }
    useEffect(() => {
        ref.current?.addEventListener('mousedown', handleDown);
        return () => {
            ref.current?.removeEventListener('mousedown', handleDown);
        }
    }, [])
    return ref;
}

export default useMouseWidget;