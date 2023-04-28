'use client'

import * as React from 'react'
import Link from 'next/link'

import { SITE_NAME } from '@/utils/lib/constants'
import BrandAsset from '@/components/BrandAsset'
import styles from '@/components/Header/Header.module.css'

const title = SITE_NAME + '.'

export default function Header() {
  const logoRef = React.useRef(null)
  const [rotation, setRotation] = React.useState(0)

  function handleRotation() {
    const currentPosition = window.scrollY
    const rotationFactor = 1

    setRotation(currentPosition * rotationFactor)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleRotation)

    return () => {
      window.removeEventListener('scroll', handleRotation)
    }
  }, [])

  return (
    <header className={styles.Header}>
      <h1 className={styles['Header__title']}>
        <Link href={'/'}>{title}</Link>
      </h1>
      <BrandAsset
        style={{ transform: `rotate(${rotation}deg)` }}
        ref={logoRef}
        type={'Logo'}
        width={110}
        height={101}
        className={styles['Header__logo']}
      />
    </header>
  )
}
