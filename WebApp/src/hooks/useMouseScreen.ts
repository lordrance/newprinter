import {useRef, useEffect} from 'react'
import { changeActive } from '@/store/slices/tempWidgetSlice'
import { useDispatch } from 'react-redux';

const useMouseScreen = () => {
    let scale = 1;
    let moveX = 0;
    let moveY = 0;
    const dispatch = useDispatch();

    const ref = useRef<HTMLDivElement>(null);

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

    const handleMouseDown = (e: MouseEvent) => {
        e.preventDefault();e.stopPropagation();
        dispatch(changeActive(-1))
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleUp);
    }

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

    const handleUp = () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleUp)
    }

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