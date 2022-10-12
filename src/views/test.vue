<script setup lang="ts">
// 这里的obj是个普通对象，但是如果我把这个obj变成响应式的对象,toRef的修改就会引起视图的变化了，这又是为什么？(问题2)
let obj = reactive({
  name: '张三',
  age: 22,
  weight: {
    a: 1
  }
})
let a = toRef(obj.weight, 'a')
</script>

<template>
  <span>{{ a }}</span>
  <button @click="a++">点击按钮来修改toRef得到的数据</button>
</template>
