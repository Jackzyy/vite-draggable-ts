import type { Ref } from 'vue'

export default function useResizeObserver(
  target: Ref,
  callback: MutationCallback,
  options?: MutationObserverInit | undefined
) {
  let observer: MutationObserver | undefined
  options = options ?? { attributes: true }

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

      observer = new MutationObserver(callback)
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
