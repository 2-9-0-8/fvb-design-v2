'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

interface AnimationContextProps {
  targets: React.MutableRefObject<HTMLElement[]> | null
  setTargets: (target: HTMLElement) => void
  activateObserver: () => void
}

export const AnimationContext = createContext<AnimationContextProps>({
  targets: null,
  setTargets: () => {},
  activateObserver: () => {},
})

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const targets = useRef<HTMLElement[]>([])
  const location = usePathname()
  const [observerActivated, setObserverActivated] = useState<number>(0)
  const observer = useRef<null | IntersectionObserver>(null)

  const handleAnimation = (target: HTMLElement, index: number) => {
    const DELAY_MULTIPLIER = 150
    const delay = index * DELAY_MULTIPLIER
    const duration = parseFloat(window.getComputedStyle(target).getPropertyValue('--duration')) * 100
    const style = target.getAttribute('style')

    target.style.setProperty('--delay', delay + 'ms')
    target.setAttribute('data-animating', '')

    setTimeout(() => {
      target.removeAttribute('data-animate')
      target.removeAttribute('data-animating')

      style ? target.setAttribute('style', style) : target.removeAttribute('style')
    }, delay + duration + 100)
  }

  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        handleAnimation(entry.target as HTMLElement, index)

        observer.current?.unobserve(entry.target)
      }
    })
  }

  const options = { rootMargin: '0px', threshold: [0.2] }

  const activateObserver = () => setObserverActivated(observerActivated + 1)

  const store = {
    targets,
    setTargets: (t: HTMLElement) => targets?.current.push(t),
    activateObserver,
  }

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-animate'))

    observer.current = new IntersectionObserver(callback, options)

    targets.current = []
    elements.map(element => (targets.current = [...targets.current, element]))
    targets?.current.map((target: HTMLElement) => observer.current?.observe(target))

    return () => {
      targets?.current.map((target: HTMLElement) => observer.current?.unobserve(target))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, observerActivated])

  return <AnimationContext.Provider value={store}>{children}</AnimationContext.Provider>
}

export const useAnimation = () => useContext(AnimationContext)
