import { css } from '@emotion/css'
import { useCallback, MouseEvent, useRef, useState } from 'react'
import { useAnimationFrame } from '../../hooks/useAnimationFrame'

type ButtonProps = {
  mouseX: number
  mouseY: number
  x: number
  y: number
  hovering: boolean
}

const sqdist = (x0: number, y0: number, x1: number, y1: number) => {
  return (x0 - x1) ** 2 + (y0 - y1) ** 2
}

const AttractiveButton = (props: ButtonProps) => {
  const baseStyle = css`
    background-color: lightyellow;
    border-radius: 8px;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    transition: transform 0.1s ease-in;
    position: absolute;
    left: ${props.x}px;
    top: ${props.y}px;
  `
  const style = css`
    ${baseStyle};
    ${props.hovering ? 'background-color: yellow;' : ''}
  `
  return <div className={style}>Button</div>
}

const BaseCursorStyle = css`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  position: fixed;
  z-index: 9999;
  border: none;
  transform: scale(1);
  transition: transform 0.1s ease-in;
`

const HoverCursorStyle = css`
  transform: scale(1.2);
  transition: transform 0.1s ease-in;
`

export function FakeCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const currentX = useRef<number>(0)
  const currentY = useRef<number>(0)
  const targetX = useRef<number>(0)
  const targetY = useRef<number>(0)
  const [hovering, setHovering] = useState(false)

  const onMove = useCallback((e: MouseEvent<HTMLElement>) => {
    if (sqdist(e.clientX, e.clientY, 300, 300) > 5000) {
      //   const s = 0.5
      targetX.current = e.clientX
      targetY.current = e.clientY
    }
  }, [])

  const onUpdate = useCallback(() => {
    currentX.current =
      currentX.current + (targetX.current - currentX.current) * 0.15
    currentY.current =
      currentY.current + (targetY.current - currentY.current) * 0.15

    if (cursorRef.current) {
      cursorRef.current.style.left = `${currentX.current - 10}px`
      cursorRef.current.style.top = `${currentY.current - 10}px`
    }

    const curX = currentX.current
    const curY = currentY.current
    const buttonX = 340
    const buttonY = 340
    if (sqdist(curX, curY, buttonX, buttonY) < 3000) {
      if (!hovering) {
        setHovering(true)
      }
      const s = 0.95
      targetX.current = targetX.current * (1 - s) + buttonX * s
      targetY.current = targetY.current * (1 - s) + buttonY * s
    } else {
      if (hovering) {
        setHovering(false)
      }
    }
  }, [hovering, setHovering])

  useAnimationFrame(onUpdate)

  const cursorStyle = hovering
    ? `${BaseCursorStyle} ${HoverCursorStyle}`
    : BaseCursorStyle

  return (
    <div
      className={css`
        background-color: Aquamarine;
        width: 100vw;
        height: 100vh;
        cursor: none;
      `}
      onMouseMove={onMove}
    >
      <div ref={cursorRef} className={cursorStyle}></div>

      <AttractiveButton
        x={300}
        y={300}
        mouseX={currentX.current}
        mouseY={currentY.current}
        hovering={hovering}
      />
    </div>
  )
}
