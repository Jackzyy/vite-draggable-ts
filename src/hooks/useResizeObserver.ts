import type { Ref } from 'vue'

export default function useResizeObserver(target: Ref, callback: ResizeObserverCallback) {
  let observer: ResizeObserver | undefined

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }

  const stopWatch = watch(
    () => target.value,
    () => {
      cleanup()

      observer = new ResizeObserver(callback)
      observer.observe(target.value)
    },
    { flush: 'post' }
  )

  const stop = () => {
    cleanup()
    stopWatch()
  }

  onUnmounted(() => stop())
}
