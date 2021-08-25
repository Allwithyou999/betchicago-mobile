import * as React from 'react'
import { Platform, View, Text } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import { News } from '../carousel-pages'
import * as screenStyles from './favorites.styles'

export interface FavoritesScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  dispatch?: () => void
}

export interface FavoritesScreenState {
  isBusy: boolean
}

class FavoritesScreen extends React.Component<FavoritesScreenProps, FavoritesScreenState> {
  constructor(props) {
    super(props)
    this.state = { isBusy: false }
  }

  render() {
    return (
      <View style={screenStyles.ROOT}>
        <View>{Platform.OS === 'ios' && <View style={screenStyles.statusBar} />}</View>
        <Text style={screenStyles.warningText}>Coming soon</Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  status: state.app.status,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FavoritesScreen)
