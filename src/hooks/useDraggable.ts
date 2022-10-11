import type { Ref } from 'vue'

export default function useDraggable(ref: Ref | null) {
  const pressedDelta = {
    x: 0,
    y: 0
  }

  const position = reactive({
    x: 0,
    y: 0
  })

  const start = (e: MouseEvent) => {
    e.stopPropagation()
    pressedDelta.x = e.offsetX
    pressedDelta.y = e.offsetY

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', end)
  }

  const move = (e: MouseEvent) => {
    position.x = e.clientX - pressedDelta.x
    position.y = e.clientY - pressedDelta.y
  }

  const end = () => {
    window.removeEventListener('mousemove', move)
    window.removeEventListener('mouseup', end)
  }

  onMounted(() => {
    if (ref?.value) ref.value.addEventListener('mousedown', start)
  })

  return {
    ...toRefs(position),
    style: computed(() => `left:${position.x}px;top:${position.y}px;`)
  }
}
