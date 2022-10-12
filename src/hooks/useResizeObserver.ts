import type { Ref } from 'vue'

export default function useResizeObserver(
  target: Ref,
  callback: ResizeObserverCallback,
  options?: ResizeObserverOptions | undefined
) {
  let observer: ResizeObserver | undefined
  options = options ?? {}

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
      observer.observe(target.value, options)
    },
    { flush: 'post' }
  )

  const stop = () => {
    cleanup()
    stopWatch()
  }

  onUnmounted(() => stop())
}
