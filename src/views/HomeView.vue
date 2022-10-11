<script setup lang="ts">
import useDraggable from '@/hooks/useDraggable'

const box = ref()
const { x, y, style } = useDraggable(box)
</script>

<template>
  <main>
    <div ref="box" class="box" :style="style" style="position: absolute">
      <span>{{ x }}, {{ y }}</span>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.box {
  width: 200px;
  height: 200px;
  background-color: aqua;
}
</style>
