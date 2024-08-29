import { useSelector, useDispatch } from "react-redux"
import {useRef, useEffect} from 'react'
import { changeWidgetWH, changeWidgetPos } from "@/store/slices/tempWidgetSlice";
import store from "@/store";
//改变组件大小
//order 0 1 2 3 上右下左
const useMouseSize = (order: number) => {
    const dispatch = useDispatch();
    const index = useSelector((s: any) => s.tempWidget.activeIndex)
    const ref = useRef<HTMLDivElement>(null);

    // 鼠标按下，添加鼠标移动和抬起事件
    const handleDown = (e: MouseEvent) => {
        e.stopPropagation();
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleUp);
    }

    // 鼠标移动，修改redux组件长宽
    const handleMove = (e: MouseEvent) => {
        e.preventDefault();e.stopPropagation();
        const width = store.getState().tempPage.width;
        const height = store.getState().tempPage.height;
        const trans = ref.current?.parentElement?.parentElement?.style.transform;
        const s = trans?.match(/scale\((.*?)\)/)
        // 获得窗口缩放比，调整鼠标移动距离
        const scale = s ? parseFloat(s[1]) : 1
        switch (order) {
            case 0:
                dispatch(changeWidgetPos({moveX: 0, moveY: (e.movementY/scale), width, height}))
                dispatch(changeWidgetWH({moveX: 0, moveY: (-e.movementY/scale)}))
                break;
            case 2:
                dispatch(changeWidgetWH({moveX: 0, moveY: (e.movementY/scale)}))
                break;
            case 1:
                dispatch(changeWidgetWH({moveX: (e.movementX/scale), moveY: 0}))
                break;
            case 3:
                dispatch(changeWidgetPos({moveX: (e.movementX/scale), moveY: 0, width, height}))
                dispatch(changeWidgetWH({moveX: (-e.movementX/scale), moveY: 0}))
                break;
            default:
                break;
        }
    }

    // 移除事件监听器
    const handleUp = () => {
        document.removeEventListener('mousemove', handleMove)
        document.removeEventListener('mouseup', handleUp)
    }

    // 添加鼠标按下事件
    useEffect(() => {
       ref.current?.addEventListener('mousedown', handleDown);
       return () => {
        ref.current?.removeEventListener('mousedown', handleDown);
       }
    }, [index])
    return ref
}

export default useMouseSize