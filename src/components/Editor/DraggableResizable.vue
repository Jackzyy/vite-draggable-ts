<script setup lang="ts">
import { findIndex } from 'lodash-es'
import useDraggable from '@/hooks/useDraggable'
import { useEditorStore } from '@/stores/editor'

const editStore = useEditorStore()
const { components, activeComponent } = storeToRefs(editStore)

const props = defineProps({
  id: {
    type: Number,
    default: 0
  },
  t: {
    type: Number,
    default: 0
  },
  l: {
    type: Number,
    default: 0
  },
  w: {
    type: Number,
    default: 100
  },
  h: {
    type: Number,
    default: 100
  },
  minWidth: {
    type: Number,
    default: 50
  },
  minHeight: {
    type: Number,
    default: 50
  }
})

// 拖拽功能
const componentIndex = findIndex(components.value, { id: props.id })
const componentClientRect = toRef(components.value[componentIndex], 'clientRect')

const defaultConfig = {
  ...{
    top: props.t,
    left: props.l,
    width: props.w,
    height: props.h
  },
  ...componentClientRect.value
}

const root = ref()
const { target, position } = useDraggable(root, defaultConfig)

watch(
  () => target.value,
  newValue => {
    // 更新Store组件数据
    componentClientRect.value = newValue
    activeComponent.value = newValue
  },
  { deep: true }
)

// 放大缩小点位以及功能
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
const setPointStyle = (point: string, width: number, height: number) => {
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
    marginLeft: point.includes('l') ? '-5px' : '-4px', // 1px的边宽度处理
    marginTop: point.includes('t') ? '-5px' : '-4px',
    left: `${left}px`,
    top: `${top}px`,
    cursor: `${pointsCursor[point]}-resize`
  }

  return style
}
const handleResize = (point: string, $startEvent: MouseEvent) => {
  $startEvent.stopPropagation()
  $startEvent.preventDefault()

  // 初始点位信息
  const top = target.value.top
  const left = target.value.left
  const width = target.value.width
  const height = target.value.height

  const move = ($moveEvent: MouseEvent) => {
    const hasT = point.includes('t')
    const hasR = point.includes('r')
    const hasB = point.includes('b')
    const hasL = point.includes('l')
    const hasM = point.includes('m')
    const hasTL = hasT || hasL
    const hasTBM = (hasT || hasB) && hasM
    const hasLRM = (hasL || hasR) && hasM

    // 移动的距离
    // 1，X负数时，向左移动，正数时，向右移动
    // 2，Y负数时，向上移动，正数时，向下移动
    const diffX = $moveEvent.pageX - $startEvent.pageX
    const diffY = $moveEvent.pageY - $startEvent.pageY

    // 计算各个点移动过程中，宽高的变化
    // 1，如果是上下位置的中间点位，则移动中的宽度变化为0。如果不是中间，如果是左点位则取反值，如果是右点位取正值
    // 2，如果是左右的中间点位，则移动中的高度变化为0.如果不是中间，如果是上点位则取反值，如果是右点位取正值
    const diffWidth = width + (hasTBM ? 0 : hasL ? -diffX : diffX)
    const diffHeight = height + (hasLRM ? 0 : hasT ? -diffY : diffY)

    const { minWidth, minHeight } = props
    const isLTMinWidth = diffWidth < minWidth
    const isLTMinHeight = diffHeight < minHeight

    // 处理超出临界高度的定位
    // 1，如果是上左，则临界 X定位=x坐标+宽度-最小宽度，Y定位=Y坐标+高度-最小高度
    // 2，如果是下右，则临界 X定位=X坐标，Y定位=Y坐标
    const minLeft = hasTL ? left + (width - minWidth) : left
    const minTop = hasTL ? top + (height - minHeight) : top

    target.value.width = isLTMinWidth ? minWidth : diffWidth
    target.value.height = isLTMinHeight ? minHeight : diffHeight
    target.value.left = isLTMinWidth ? minLeft : left + (hasL ? diffX : 0)
    target.value.top = isLTMinHeight ? minTop : top + (hasT ? diffY : 0)
  }

  const end = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', end)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', end)
}
</script>

<template>
  <div ref="root" class="root" :style="position">
    <div
      v-for="point in points"
      :key="point"
      :ref="point"
      :style="setPointStyle(point, target.width, target.height)"
      :class="point"
      class="point"
      @mousedown="$event => handleResize(point, $event)"
    />
    <slot />
  </div>
</template>

<style scoped lang="scss">
.root {
  width: 500px;
  height: 500px;
  touch-action: none;
  outline: 1px solid #70c0ff;
  user-select: none;
  position: absolute;
  &:hover {
    cursor: move;
  }

  .point {
    position: absolute;
    background: #fff;
    outline: 1px solid #59c7f9;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    z-index: 1;
  }
}
</style>
