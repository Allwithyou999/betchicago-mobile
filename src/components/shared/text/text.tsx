import * as React from 'react'
import { Text as ReactNativeText, TextProps as RNTextProps, TextStyle } from 'react-native'
import { sizePresets, alignPresets } from './text.presets'
import { Colors } from '../../../themes'

interface TextProps extends RNTextProps {
  size?: string | number
  color?: string
  align?: string
  text?: string
  style?: TextStyle
  fontFamily?: string
  children?: React.ReactChild
}

/**
 * For your text displaying needs.
 */
export const Text = (props: TextProps) => {
  // grab the props
  const {
    size = 'default',
    align = 'default',
    color = 'black',
    text,
    children,
    fontFamily,
    style: styleOverride,
    // tslint:disable-next-line
    ...rest
  } = props

  // figure out which content to use
  const content = text || children

  // assemble the style
  const sizePresetToUse = sizePresets[size] || (typeof size === 'number' ? { fontSize: size } : sizePresets.default)
  const alignPresetToUse = alignPresets[align] || alignPresets.default
  const colorPresetToUse = { color: color ? Colors[color] || color : Colors.black }
  const style = {
    ...sizePresetToUse,
    ...alignPresetToUse,
    ...colorPresetToUse,
    ...styleOverride,
    fontFamily: fontFamily || 'Roboto-Medium',
  }

  return (
    <ReactNativeText style={style} {...rest}>
      {content}
    </ReactNativeText>
  )
}
