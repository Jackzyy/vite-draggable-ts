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
  <main>
    <draggable-resizable @dragging="onDrag">
      <el-button type="primary">primary</el-button>
      <pre>{{ states.position }}</pre>
    </draggable-resizable>

    <draggable-resizable @dragging="onDrag">
      <el-button type="primary">primary</el-button>
      <pre>{{ states.position }}</pre>
    </draggable-resizable>
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 100vw;
  height: 100vh;
}
</style>
