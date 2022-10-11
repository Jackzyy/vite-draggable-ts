import type { Ref } from 'vue'

export default function useResizeObserver(target: Ref, callback: MutationCallback) {
  let observer: MutationObserver | undefined

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
      observer.observe(target.value, { attributes: true })
    },
    { flush: 'post' }
  )

  const stop = () => {
    cleanup()
    stopWatch()
  }

  onUnmounted(() => stop())
}
