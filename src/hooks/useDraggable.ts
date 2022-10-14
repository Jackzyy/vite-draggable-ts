import type { Ref } from 'vue'
import useMutationObserver from './useMutationObserver'

export default function useDraggable(target: Ref, options = {}) {
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
      left: 0,
      top: 0
    }
  })

  // 默认值
  states.target = Object.assign(states.target, options)

  const getBoundingClientRect = () => {
    states.target = target.value.getBoundingClientRect().toJSON()
  }

  useMutationObserver(target, getBoundingClientRect)

  const start = (e: MouseEvent) => {
    states.pressedDelta = {
      left: e.pageX - states.target.left,
      top: e.pageY - states.target.top
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', end)
  }

  const move = async (e: MouseEvent) => {
    states.target.left = e.clientX - states.pressedDelta.left
    states.target.top = e.clientY - states.pressedDelta.top
  }

  const end = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', end)
  }

  onMounted(() => {
    target.value.addEventListener('mousedown', start)
    getBoundingClientRect()
  })

  return {
    target: toRef(states, 'target'),
    position: computed(() => `left: ${states.target.left}px;top: ${states.target.top}px`)
  }
}
