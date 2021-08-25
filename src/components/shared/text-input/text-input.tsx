import * as React from 'react'
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps, View, ViewStyle, TextStyle } from 'react-native'
import { Text } from '../text'
import * as styles from './text-input.styles'

interface TextInputProps extends RNTextInputProps {
  containerStyle?: ViewStyle
  label?: string
  labelColor?: string
  labelStyle?: TextStyle
  errorText?: string
  errorColor?: string
  errorStyle?: TextStyle
  reference?: React.RefObject<RNTextInput>
}

export const TextInput: React.SFC<TextInputProps> = (props: TextInputProps) => {
  const {
    containerStyle,
    label,
    labelColor,
    labelStyle,
    errorText,
    errorColor,
    errorStyle,
    style,
    reference,
    // tslint:disable-next-line
    ...rest
  } = props
  return (
    <View style={{ ...styles.field, ...props.containerStyle }}>
      {label && <Text align="left" style={{ ...styles.label, ...props.labelStyle, color: labelColor }} text={label} />}
      {errorText && (
        <Text align="left" style={{ ...styles.error, ...props.errorStyle, color: errorColor }} text={errorText} />
      )}
      <RNTextInput ref={reference || (ref => {})} style={[styles.textValue, style]} {...rest} />
    </View>
  )
}
