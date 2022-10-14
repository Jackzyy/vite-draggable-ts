<script setup lang="ts">
import useDraggable from '@/hooks/useDraggable'
import useResizable from '@/hooks/useResizable'

const root = ref()
const emits = defineEmits(['dragging'])

const { target, position } = useDraggable(root, { top: 100, left: 100 })
const { points, setPointStyle } = useResizable()

watch(
  () => target.value,
  newValue => emits('dragging', newValue),
  { immediate: true, deep: true }
)

const handleResize = (point: string, e: MouseEvent) => {
  e.stopPropagation()
  e.preventDefault()

  console.log(point)
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
