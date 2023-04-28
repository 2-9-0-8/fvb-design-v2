'use client'

import * as React from 'react'

export default function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    const queryList = window.matchMedia(query)
    const listener = () => setMatches(!!queryList.matches)

    try {
      queryList.addEventListener('change', listener)
    } catch (err) {
      queryList.addListener(listener)
    }

    listener()

    return () => {
      try {
        queryList.removeEventListener('change', listener)
      } catch (err) {
        queryList.removeListener(listener)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return matches
}
