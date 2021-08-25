import * as React from 'react'
import { View } from 'react-native'
import * as screenStyles from './section-divider.styles'

interface SectionDividerProp {
  style?: object
  type?: string
}

export class SectionDivider extends React.Component<SectionDividerProp, {}> {
  render() {
    const { style, type } = this.props

    return (
      <View
        style={[type == 'line' && screenStyles.lineDivider, type != 'line' && screenStyles.sectionDivider, style]}
      />
    )
  }
}
