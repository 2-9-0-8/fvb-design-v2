import useColourValue from '@/utils/hooks/useColourValue'
import type { ColourValues, TintValues } from '@/utils/hooks/useColourValue'
import styles from '@/components/Icon/Icon.module.css'

export type IconTypes = ['Play']

type IconSizes = [10, 12, 16, 18, 20, 24, 136, 'parent']

type IconProps = {
  type: IconTypes[number]
  colour?: ColourValues
  tint?: TintValues
  size?: IconSizes[number]
}

export default function Icon({ type, colour = 'neutral', tint, size }: IconProps) {
  const resolvedColour = useColourValue(colour, tint)

  switch (type) {
    case 'Play':
      return <Play colour={resolvedColour} size={size} />
  }
}

type Icon = {
  colour?: string | Record<TintValues, string>
  size?: number | 'parent'
}

function Play({ colour, size }: Icon) {
  return (
    <svg className={styles.Icon} data-size={size} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 117 136">
      <path style={{ stroke: `var(--${colour})` }} fill="#FF3A00" d="M117 68 0 135.55V.45L117 68Z" />
    </svg>
  )
}
