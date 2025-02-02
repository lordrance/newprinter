import {useRef, useEffect} from 'react'
import { changeActive } from '@/store/slices/tempWidgetSlice'
import { useDispatch } from 'react-redux';
//移动窗口
const useMouseScreen = () => {
    let scale = 1;
    let moveX = 0;
    let moveY = 0;
    const dispatch = useDispatch();

    const ref = useRef<HTMLDivElement>(null);

    // 鼠标滚轮，缩放窗口
    const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const cur = ref.current;
        if (e.deltaY < 0) {
            if (scale < 2.5)
            scale += 0.1
            if (cur)
            cur.style.transform = `scale(${scale}) translate(${moveX}px,${moveY}px)`;
        } else {
            if (scale > 0.3)
            scale -= 0.1
            if (cur)
            cur.style.transform = `scale(${scale}) translate(${moveX}px,${moveY}px)`;
        }
    }

    // 鼠标按下，添加鼠标移动和抬起事件
    const handleMouseDown = (e: MouseEvent) => {
        e.preventDefault();e.stopPropagation();
        dispatch(changeActive(-1))
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleUp);
    }

    // 鼠标移动事件，平移窗口
    const handleMove = (e: MouseEvent) => {
        e.preventDefault();
        const cur = ref.current;
        const mx = e.movementX/scale
        const my = e.movementY/scale
        const limitX = window.innerWidth*0.45/scale
        const limitY = window.innerHeight*0.65/scale

        if (moveX >= - limitX && moveX <= limitX) moveX += mx
        else if (moveX < - limitX && mx > 0) moveX += mx
        else if (moveX > limitX && mx < 0) moveX += mx

        if (moveY >= -limitY && moveY <= limitY) moveY += my;
        else if (moveY < - limitY && my > 0) moveY += my
        else if (moveY > limitY && my < 0) moveY += my

        if (cur) {
            cur.style.transform = `scale(${scale}) translate(${moveX}px, ${moveY}px)`;
        }
    }

    // 移除事件监听器
    const handleUp = () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleUp)
    }

    // 添加滚轮和鼠标按下事件
    useEffect(() => {
        const cur = ref.current;
        cur?.addEventListener('wheel', handleWheel);
        cur?.addEventListener('mousedown', handleMouseDown);
        return () => {
            cur?.removeEventListener('wheel', handleWheel);
            cur?.removeEventListener('mousedown', handleMouseDown);
        }
    }, [])

    return ref;
}

export default useMouseScreen;