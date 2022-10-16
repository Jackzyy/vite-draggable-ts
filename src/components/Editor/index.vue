<script setup lang="ts">
import DraggableResizable from './DraggableResizable.vue'
import { useEditorStore } from '@/stores/editor'

const editStore = useEditorStore()
const { components, activeComponent } = storeToRefs(editStore)
</script>

<template>
  <pre>{{ components }}</pre>
  <pre>{{ activeComponent }}</pre>

  <draggable-resizable
    v-for="component in components"
    :id="component.id"
    :key="component.id"
    :t="component.props.defaultClientRect.t"
    :l="component.props.defaultClientRect.l"
    :w="component.props.defaultClientRect.w"
    :h="component.props.defaultClientRect.h"
    :min-width="component.props.defaultClientRect.minWidth"
    :min-height="component.props.defaultClientRect.minHeight"
  ></draggable-resizable>
</template>

<style lang="scss" scoped>
main {
  width: 100vw;
  height: 100vh;
}
</style>
