import * as React from 'react'

export default function useLock({
  state,
  isEnabled = true,
  root,
}: {
  state: boolean
  isEnabled: boolean
  root?: HTMLElement
}) {
  const rootRef = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    if (!state || !isEnabled) {
      return
    }

    rootRef.current = root ?? document.body

    const originalStyle = window.getComputedStyle(rootRef.current).overflow
    rootRef.current.style.overflow = 'hidden'

    return () => {
      rootRef.current!.style.overflow = originalStyle
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])
}
