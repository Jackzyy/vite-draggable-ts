import type { Ref } from 'vue'
import { isEqual, cloneDeep } from 'lodash-es'

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
      offsetX: 0,
      offsetY: 0
    }
  })

  watch(
    () => cloneDeep(states.target),
    (newValue, oldValue) => {
      if (isEqual(newValue, oldValue)) return
      getBoundingClientRect()
    },
    { deep: true }
  )

  onMounted(() => {
    target.value.addEventListener('mousedown', start)
  })

  // 默认值
  states.target = Object.assign(states.target, options)

  const getBoundingClientRect = async () => {
    await nextTick()
    states.target = target.value.getBoundingClientRect().toJSON()
  }

  const start = (e: MouseEvent) => {
    states.pressedDelta = {
      offsetX: e.pageX - states.target.left,
      offsetY: e.pageY - states.target.top
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', end)
  }

  const move = async (e: MouseEvent) => {
    states.target.left = e.clientX - states.pressedDelta.offsetX
    states.target.top = e.clientY - states.pressedDelta.offsetY
  }

  const end = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', end)
  }

  return {
    target: toRef(states, 'target'),
    position: computed(
      () =>
        `width:${states.target.width}px;height:${states.target.height}px;left: ${states.target.left}px;top: ${states.target.top}px`
    )
  }
}
