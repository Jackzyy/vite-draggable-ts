<script setup lang="ts">
import DraggableResizable from '@/components/DraggableResizable.vue'

const states = reactive({
  position: {}
})
const onDrag = (val: any) => {
  states.position = val
}
</script>

<template>
  <draggable-resizable @dragging="onDrag">
    <el-button type="primary">primary</el-button>
    <pre>{{ states.position }}</pre>
  </draggable-resizable>
</template>

<style lang="scss" scoped></style>
