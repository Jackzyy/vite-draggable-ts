<script setup lang="ts">
let a = ref(1)
</script>

<template>
  <main>Home</main>
  <el-button @click="a++">A</el-button>
  {{ a }}
</template>
