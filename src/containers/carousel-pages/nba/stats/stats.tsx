import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { LoadingView } from '../../../../components'
import * as screenStyles from './stats.styles'

export interface NBAStatsScreenProps {
  navigation?: any
  isLoadingStart?: boolean
}

export interface NBAStatsScreenState {}

class NBAStats extends React.Component<NBAStatsScreenProps, NBAStatsScreenState> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {} = this.state

    return (
      <View style={screenStyles.ROOT}>
        <Text>NBA Stats</Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NBAStats)
