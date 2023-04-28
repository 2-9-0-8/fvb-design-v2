import * as React from 'react'

import { selectors } from '@/utils/lib/selectors'
import useLock from '@/utils/hooks/useLock'

type Props = {
  ref: React.RefObject<HTMLElement>
  _state: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  postOpenFn?: () => void
  postCloseFn?: () => void
  lockWhenOpen?: boolean
  lightDismiss?: boolean
}

const selectorString = selectors.join(',')

export default function useModal({
  ref,
  _state,
  postOpenFn,
  postCloseFn,
  lockWhenOpen = true,
  lightDismiss = true,
}: Props) {
  const [state, setState] = _state

  function closeFn() {
    return new Promise<void>((resolve, reject) => {
      try {
        setState(false)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }

  function openFn() {
    return new Promise<void>((resolve, reject) => {
      try {
        setState(true)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }

  async function handleClose() {
    await closeFn()
    postCloseFn?.()
  }

  async function handleOpen() {
    await openFn()
    postOpenFn?.()
  }

  function handleFocus(direction: 'previous' | 'next') {
    const focusableElements: HTMLElement[] = Array.from(ref.current!.querySelectorAll(selectorString))
    const currentIndex = focusableElements.findIndex(el => {
      return el === document.activeElement
    })

    switch (direction) {
      case 'previous':
        const previousIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1
        const previousElement = focusableElements[previousIndex]
        previousElement.focus()
        break
      case 'next':
        const nextIndex = currentIndex === focusableElements.length - 1 ? 0 : currentIndex + 1
        const nextElement = focusableElements[nextIndex]
        nextElement.focus()
        break
    }
  }

  function handleKeys(e: KeyboardEvent) {
    if (!state || !ref.current) {
      return
    }

    switch (e.key) {
      case 'Escape':
        handleClose()
        break
      case 'Tab':
        e.preventDefault()
        handleFocus(e.shiftKey ? 'previous' : 'next')
        break
    }
  }

  function handleClickOutside(e: Event) {
    if (ref.current && !ref.current.contains(e.target as HTMLElement) && state && lightDismiss) {
      handleClose()
    }
  }

  useLock({ state, isEnabled: lockWhenOpen })

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeys)

    return () => {
      document.removeEventListener('keydown', handleKeys)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return { handleOpen, handleClose }
}
