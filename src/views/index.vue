<script setup lang="ts">
import DraggableResizable from '@/components/DraggableResizable.vue'

const states = reactive({
  position: {}
})
const onDrag = (val: any) => {
  states.position = val
}

const pointList = ['t', 'r', 'b', 'l', 'lt', 'rt', 'lb', 'rb']
</script>

<template>
  <draggable-resizable @dragging="onDrag">
    <el-button type="primary">primary</el-button>
    <span>draggable-resizable</span>
    <span>{{ states.position }}</span>
  </draggable-resizable>
</template>

<style lang="scss" scoped></style>
