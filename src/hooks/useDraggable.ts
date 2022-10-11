import type { Ref } from 'vue'
import useMutationObserver from './useMutationObserver'

export default function useDraggable(target: Ref) {
  const states = reactive({
    target: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    pressedDelta: {
      x: 0,
      y: 0
    }
  })

  const start = (e: MouseEvent) => {
    states.pressedDelta = {
      x: e.pageX - states.target.left,
      y: e.pageY - states.target.top
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', end)
  }

  const move = (e: MouseEvent) => {
    states.target.x = e.clientX - states.pressedDelta.x
    states.target.y = e.clientY - states.pressedDelta.y
    update()
  }

  const end = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', end)
  }

  const update = () => {
    target.value.style.position = 'absolute'
    target.value.style.left = `${states.target.x}px`
    target.value.style.top = `${states.target.y}px`

    const rect = target.value.getBoundingClientRect()
    states.target = rect.toJSON()
  }

  onMounted(() => {
    target.value.addEventListener('mousedown', start)
    update()
  })

  useMutationObserver(target, () => {
    const rect = target.value.getBoundingClientRect()
    states.target = rect.toJSON()
    update()
  })
  return computed(() => states.target)
}
