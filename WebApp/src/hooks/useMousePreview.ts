import {useRef, useEffect} from 'react'

const useMousePreview = () => {
    let scale = 1;
    let moveX = 0;
    let moveY = 0;

    const ref = useRef<HTMLDivElement>(null);

    const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const cur = ref.current;
        if (e.deltaY < 0) {
            scale += 0.1
            if (cur)
            cur.style.transform = `scale(${scale}) translate(${moveX}px,${moveY}px)`;
        } else {
            scale -= 0.1
            if (cur)
            cur.style.transform = `scale(${scale}) translate(${moveX}px,${moveY}px)`;
        }
    }

    const handleMouseDown = (e: MouseEvent) => {
        e.preventDefault();e.stopPropagation();
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleUp);
    }

    const handleMove = (e: MouseEvent) => {
        const cur = ref.current;
        moveX += e.movementX/scale;
        moveY += e.movementY/scale;
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

export default useMousePreview;