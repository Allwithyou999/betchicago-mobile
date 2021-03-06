import { Colors } from '../../../themes'

/**
 * All the variations of text styling within the app.
 * You want to customize these to whatever you need in your app.
 */
export const sizePresets = {
  default: { fontSize: 12 },

  tiny: { fontSize: 8 },
  small: { fontSize: 10 },
  smallPlus: { fontSize: 12 },
  medium: { fontSize: 14 },
  mediumPlus: { fontSize: 16 },
  regular: { fontSize: 18 },
  exRegular: { fontSize: 20 },
  large: { fontSize: 22 },
  exLarge: { fontSize: 24 },
  XXLarge: { fontSize: 30 },
}

export const alignPresets = {
  default: { textAlign: 'center' },

  left: { textAlign: 'left' },
  right: { textAlign: 'right' },
  auto: { textAlign: 'auto' },
  center: { textAlign: 'center' },
  justify: { textAlign: 'justify' },
}
