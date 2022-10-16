export const useEditorStore = defineStore('editor', () => {
  const components = ref([
    {
      id: 1,
      active: true,
      clientRect: {},
      props: {
        defaultClientRect: {
          t: 300,
          l: 300,
          w: 300,
          h: 300,
          minWidth: 100,
          minHeight: 100
        }
      }
    },
    {
      id: 2,
      active: true,
      clientRect: {},
      props: {
        defaultClientRect: {
          t: 500,
          l: 500,
          w: 300,
          h: 300,
          minWidth: 100,
          minHeight: 100
        }
      }
    }
  ])
  const activeComponent = ref({})

  return { components, activeComponent }
})
