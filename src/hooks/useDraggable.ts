import type { Ref } from 'vue'

export default function useDraggable(target: Ref) {
  const pressedDelta = {
    x: 0,
    y: 0
  }

  const position = reactive({
    x: 0,
    y: 0
  })

  const start = (e: MouseEvent) => {
    const rect = target.value.getBoundingClientRect()
    pressedDelta.x = e.pageX - rect.left
    pressedDelta.y = e.pageY - rect.top

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', end)
  }

  const move = (e: MouseEvent) => {
    position.x = e.clientX - pressedDelta.x
    position.y = e.clientY - pressedDelta.y
  }

  const end = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', end)
  }

  onMounted(() => {
    if (target) target.value.addEventListener('mousedown', start)
  })

  return {
    ...toRefs(position),
    style: computed(() => `left:${position.x}px;top:${position.y}px;`)
  }
}
