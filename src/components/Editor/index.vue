<script setup lang="ts">
import DraggableResizable from './DraggableResizable.vue'

const states = reactive({
  positionA: {},
  positionB: {}
})
const onDragA = (val: any) => {
  states.positionA = val
}
const onDragB = (val: any) => {
  states.positionB = val
}
</script>

<template>
  <main>
    <draggable-resizable
      :t="300"
      :l="300"
      :w="300"
      :h="300"
      :min-width="100"
      :min-height="100"
      @dragging="onDragA"
    >
      <pre>{{ states.positionA }}</pre>
    </draggable-resizable>

    <draggable-resizable @dragging="onDragB">
      <pre>{{ states.positionB }}</pre>
    </draggable-resizable>
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 100vw;
  height: 100vh;
}
</style>
