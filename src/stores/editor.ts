export const useEditorStore = defineStore('editor', () => {
  const states = reactive({
    // 编辑器组件信息
    components: {},
    // 被选中的组件信息
    activeComponent: {}
  })
  return { states }
})
