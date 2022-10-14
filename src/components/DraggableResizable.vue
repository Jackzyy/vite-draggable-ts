<script setup lang="ts">
import useDraggable from '@/hooks/useDraggable'

const root = ref()
const emits = defineEmits(['dragging'])

// 拖拽功能
const { target, position } = useDraggable(root, { top: 100, left: 100, width: 100, height: 100 })
watch(
  () => target.value,
  newValue => emits('dragging', newValue),
  { immediate: true, deep: true }
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
const handleResize = (point: string, $event: MouseEvent) => {
  $event.stopPropagation()
  $event.preventDefault()

  const top = target.value.top
  const left = target.value.left
  const width = target.value.width
  const height = target.value.height

  const move = (e: MouseEvent) => {
    // 移动的距离
    const diffX = e.pageX - $event.pageX
    const diffY = e.pageY - $event.pageY

    if (point === 'tl') {
      target.value.width = width - diffX
      target.value.height = height - diffY
      target.value.top = top + diffY
      target.value.left = left + diffX
    }
    if (point === 'tm') {
      target.value.width = width
      target.value.height = height - diffY
      target.value.top = top + diffY
      target.value.left = left
    }
    if (point === 'tr') {
      target.value.width = width + diffX
      target.value.height = height - diffY
      target.value.top = top + diffY
      target.value.left = left
    }
    if (point === 'rm') {
      target.value.width = width + diffX
      target.value.height = height
      target.value.top = top
      target.value.left = left
    }
    if (point === 'br') {
      target.value.width = width + diffX
      target.value.height = height + diffY
      target.value.top = top
      target.value.left = left
    }
    if (point === 'bm') {
      target.value.width = width
      target.value.height = height + diffY
      target.value.top = top
      target.value.left = left
    }
    if (point === 'bl') {
      target.value.width = width - diffX
      target.value.height = height + diffY
      target.value.top = top
      target.value.left = left + diffX
    }
    if (point === 'lm') {
      target.value.width = width - diffX
      target.value.height = height
      target.value.top = top
      target.value.left = left + diffX
    }
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
  user-select: none;
  outline: 1px solid #70c0ff;
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
