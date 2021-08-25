import * as React from 'react'
import Icons from 'react-native-vector-icons/FontAwesome'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'

interface IconProps {
  iconType?: 'font' | 'ionic' | 'material' | 'evil' | 'simpleLine' | 'entypo' | 'fontAwesome5' | 'feather'
  name?: string
  size?: number
  color?: string
  style?: object
}

export class Icon extends React.Component<IconProps, {}> {
  render() {
    const { iconType, name, size, color, style } = this.props

    switch (iconType) {
      case 'font':
        return <Icons name={name} size={size} color={color} style={style} />

      case 'ionic':
        return <IonIcons name={name} size={size * 1.5} color={color} style={style} />

      case 'material':
        return <MaterialIcons name={name} size={size} color={color} style={style} />

      case 'evil':
        return <EvilIcons name={name} size={size} color={color} style={style} />

      case 'simpleLine':
        return <SimpleLineIcons name={name} size={size} color={color} style={style} />

      case 'entypo':
        return <Entypo name={name} size={size} color={color} style={style} />

      case 'fontAwesome5':
        return <FontAwesome5 name={name} size={size} color={color} style={style} />

      case 'feather':
        return <Feather name={name} size={size} color={color} style={style} />

      default:
        return <Icons name={name} size={size} color={color} style={style} />
    }
  }
}
