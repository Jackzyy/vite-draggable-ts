<script setup lang="ts">
import useDraggable from '@/hooks/useDraggable'

const emits = defineEmits(['dragging'])
const dr = ref()

const states = reactive({
  dragStyles: useDraggable(dr, { top: 100, left: 100 }),
  dragPoints: ['tl', 'tm', 'tr', 'rm', 'br', 'bm', 'bl', 'lm'], // 上左、上中、上右、右中、下右、下中、下左、左中
  dragPointsCursor: {
    tl: 'nw',
    tm: 'n',
    tr: 'ne',
    rm: 'e',
    br: 'se',
    bm: 's',
    bl: 'sw',
    lm: 'w'
  }
})

watch(
  () => states.dragStyles,
  newValue => emits('dragging', newValue),
  { immediate: true, deep: true }
)

const setPointStyle = (point: string) => {
  const { width, height } = states.dragStyles.target
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
    cursor: `${states.dragPointsCursor[point]}-resize`
  }

  return style
}

const handleResize = (point: string, e: MouseEvent) => {
  e.stopPropagation()
  e.preventDefault()

  console.log(point)
}
</script>

<template>
  <div ref="dr" class="dr" :style="states.dragStyles.style">
    <div
      v-for="point in states.dragPoints"
      :key="point"
      :ref="point"
      :style="setPointStyle(point)"
      :class="point"
      class="point"
      @mousedown="$event => handleResize(point, $event)"
    />
    <slot />
  </div>
</template>

<style scoped lang="scss">
.dr {
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
