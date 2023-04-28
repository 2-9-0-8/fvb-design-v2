import * as React from 'react'

export default function useCombinedRefs<T>(...refs: React.ForwardedRef<T>[]) {
  const targetRef = React.useRef(null)

  React.useEffect(() => {
    refs.forEach(ref => {
      if (!ref) {
        return
      }

      if (typeof ref === 'function') {
        ref(targetRef.current)
      } else {
        ref.current = targetRef.current
      }
    })
  }, [refs])

  return targetRef
}