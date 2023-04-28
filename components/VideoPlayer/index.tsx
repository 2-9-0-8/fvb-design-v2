import * as React from 'react'

import { CONTACT_EMAIL } from '@/utils/lib/constants'

import Icon from '@/components/Icon'
import styles from '@/components/VideoPlayer/VideoPlayer.module.css'
import useCombinedRefs from '@/utils/hooks/use-combined-refs'

type Props = {
  id: string
  className?: string
} & React.VideoHTMLAttributes<HTMLVideoElement>

type State = {
  loading: boolean
  loaded: boolean
  playing: boolean
  paused: boolean
  ended: boolean
  error: boolean
}

type Action =
  | { type: 'LOADING' }
  | { type: 'LOADED' }
  | {
      type: 'PLAYING'
    }
  | {
      type: 'PAUSED'
    }
  | {
      type: 'ENDED'
    }
  | {
      type: 'ERROR'
    }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'LOADED':
      return { ...state, loaded: true, loading: false }
    case 'PLAYING':
      return { ...state, playing: true }
    case 'PAUSED':
      return { ...state, paused: true }
    case 'ENDED':
      return { ...state, ended: true, playing: false, paused: false }
    case 'ERROR':
      return { ...state, error: true }
    default:
      throw new Error('Unknown action')
  }
}

const initialState = {
  loading: true,
  loaded: false,
  playing: false,
  paused: false,
  ended: false,
  error: false,
}

const VideoPlayer = React.forwardRef(
  ({ id, className, controls = false, ...rest }: Props, ref: React.ForwardedRef<HTMLVideoElement>) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    const innerRef = React.useRef<HTMLVideoElement>(null)
    const combinedRef = useCombinedRefs(ref, innerRef) as React.RefObject<HTMLVideoElement>
    const [nativeControlsVisible, setNativeControlsVisible] = React.useState(controls)

    if (state.error) {
      return (
        <p className={styles.VideoPlayerError}>
          Video error. Please try again later. If the problem persists, please contact me at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      )
    }

    function VideoPlayerControls() {

      function handlePlay() {
        if (combinedRef.current) {
          combinedRef.current.play()
          setNativeControlsVisible(true)
        }
      }

      return (
        <div className={styles.VideoPlayerControls}>
          <button 
            className={styles['VideoPlayerControls__play']} 
            onClick={handlePlay}>
            <Icon type={'Play'} size={'parent'} colour={'energy-orange'} />
          </button>
        </div>
      )
    }

    return (
      <div className={styles.VideoPlayerContainer}>
        {!nativeControlsVisible && <VideoPlayerControls />}
        <video
          ref={combinedRef}
          controls={nativeControlsVisible}
          className={[styles.VideoPlayer, className].join(' ')}
          onLoadStart={() => {
            dispatch({ type: 'LOADING' })
          }}
          onLoadedData={() => {
            dispatch({ type: 'LOADED' })
          }}
          onPlay={() => {
            dispatch({ type: 'PLAYING' })
          }}
          onPause={() => {
            dispatch({ type: 'PAUSED' })
          }}
          onEnded={() => {
            dispatch({ type: 'ENDED' })
          }}
          onError={() => {
            dispatch({ type: 'ERROR' })
          }}
          {...rest}>
          <source src={`/media/${id}.mp4#t=0.01`} type={'video/mp4'} />
        </video>
      </div>
    )
  }
)

VideoPlayer.displayName = 'VideoPlayer'

export default VideoPlayer
