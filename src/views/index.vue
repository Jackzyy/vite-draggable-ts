<script setup lang="ts">
import DraggableResizable from '@/components/DraggableResizable.vue'

const states = reactive({
  position: {}
})
const onDrag = (val: Object) => {
  states.position = val
}
</script>

<template>
  <draggable-resizable @dragging="onDrag">
    <span>draggable-resizable</span>
    <span>{{ states.position }}</span>
  </draggable-resizable>
</template>

<style lang="scss" scoped></style>
