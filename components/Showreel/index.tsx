'use client'

import { useRef } from 'react'

import styles from '@/components/Showreel/Showreel.module.css'
import VideoPlayer from '@/components/VideoPlayer'

export default function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoId = 'SHOWREEL_2023_v4'

  function ShowreelVideo() {
    return (
      <VideoPlayer
        ref={videoRef}
        className={styles.ShowreelVideo}
        id={videoId}
        preload={'metadata'}
      />
    )
  }

  return (
    <div className={styles.Showreel}>
      <div className={styles['Showreel__title-container']}>
        <h2 className={styles['Showreel__title']}>Showreel!</h2>
      </div>
      <div className={styles['Showreel__video-container']}>
        <ShowreelVideo />
      </div>
    </div>
  )
}
