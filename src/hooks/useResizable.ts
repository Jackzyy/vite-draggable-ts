import type { CSSProperties } from 'vue'

export default function useResizable() {
  const points = ['tl', 'tm', 'tr', 'rm', 'br', 'bm', 'bl', 'lm']
  const pointsCursor = {
    tl: 'nw',
    tm: 'n',
    tr: 'ne',
    rm: 'e',
    br: 'se',
    bm: 's',
    bl: 'sw',
    lm: 'w'
  }

  const setPointStyle = (point: string, width: number, height: number): CSSProperties => {
    let left = 0
    let top = 0
    if (point.includes('m')) {
      // 四个角居中点
      if (point.includes('t') || point.includes('b')) {
        left = width / 2
        top = point.includes('t') ? 0 : height
      }
      if (point.includes('l') || point.includes('r')) {
        left = point.includes('l') ? 0 : width
        top = height / 2
      }
    } else {
      // 四个角
      left = point.includes('l') ? 0 : width
      top = point.includes('t') ? 0 : height
    }

    const style = {
      position: 'absolute',
      marginLeft: point.includes('l') ? '-5px' : '-4px', // 1px的边宽度处理
      marginTop: point.includes('t') ? '-5px' : '-4px',
      left: `${left}px`,
      top: `${top}px`,
      cursor: `${pointsCursor[point]}-resize`
    }

    return style
  }

  return {
    points,
    pointsCursor,
    setPointStyle
  }
}
