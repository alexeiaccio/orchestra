import { useCallback, useState } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export const useMeasure = () => {
  const [rect, set] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  })

  const [observer] = useState(
    () =>
      new ResizeObserver(entries => {
        const entry = entries[0]
        if (entry) {
          set(entry.contentRect)
        }
      })
  )

  const ref = useCallback(
    node => {
      observer.disconnect()
      if (node) {
        observer.observe(node)
      }
    },
    [observer]
  )
  return [ref, rect]
}
