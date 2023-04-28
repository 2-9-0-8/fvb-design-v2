import * as React from 'react'

export type TintValues = 100
export type ColourValues = 'neutral' | 'energy-orange'

const COLOUR_MAP: Record<string, Record<TintValues, string> | string> = {
  
  neutral: {
    100: 'fvb-neutral-black',
  },
  'energy-orange': {
    100: 'fvb-energy-orange',
  },
}

export default function useColourValue(colour: ColourValues, tint?: TintValues) {
  const value: string = React.useMemo(() => {
    if (tint) {
      return COLOUR_MAP[colour][tint]
    }

    return COLOUR_MAP[colour]['100']
  }, [colour, tint])

  return value
}
