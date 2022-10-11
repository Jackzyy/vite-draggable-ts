<script setup lang="ts">
import useDraggable from '@/hooks/useDraggable'

const emits = defineEmits(['dragging'])
const dr = ref()

const states = {
  dragInfo: useDraggable(dr)
}

watch(
  () => states.dragInfo,
  newValue => emits('dragging', newValue),
  { deep: true }
)
</script>

<template>
  <div ref="dr" class="dr">
    <div class="point" />
    <slot />
  </div>
</template>

<style scoped lang="scss">
.dr {
  width: 100px;
  height: 100px;
  touch-action: none;
  box-sizing: border-box;
  border: 1px dashed black;
}
</style>
