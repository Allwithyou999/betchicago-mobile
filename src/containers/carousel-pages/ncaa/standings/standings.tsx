import * as React from 'react'
import { View, Animated, ScrollView, Text, RefreshControl, TouchableOpacity } from 'react-native'
import { withNavigation, AnimatedValue } from 'react-navigation'
import { connect } from 'react-redux'
import Modal from 'react-native-root-modal'
import * as Animatable from 'react-native-animatable'
import NCAAActions from '../../../../actions/ncaa'
import { Colors, Metrics } from '../../../../themes'
import { LoadingView, Icon, CrossTable } from '../../../../components'
import { NCAA_STANDINGS_TITLE } from '.././../../../config/constants/ncaa'
import { CURRENTYEAR } from '../../../../config/constants/common'
import * as screenStyles from './standings.styles'

export interface NCAAStandingsScreenProps {
  navigation?: any
  isLoadingStart?: boolean
  ncaaStandingsConfStatus?: string
  ncaaStandingsConf?: Array<object>
  ncaaStandingsTeamsStatus?: string
  ncaaStandingsTeams?: Array<object>
  getncaastandingsconfRequest?: (year: string) => void
  getncaastandingsteamsRequest?: (id: string, year: string) => void
}

export interface NCAAStandingsScreenState {
  isRefreshing: boolean
  isModalVisible: boolean
  selectedConf: number
  modalY: AnimatedValue
}

class NCAAStandings extends React.Component<NCAAStandingsScreenProps, NCAAStandingsScreenState> {
  animatedValue = new Animated.Value(0)

  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
      isModalVisible: false,
      selectedConf: 0,
      modalY: new Animated.Value(0),
    }
  }

  initialize() {
    this.props.getncaastandingsconfRequest(CURRENTYEAR)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoadingStart !== nextProps.isLoadingStart && nextProps.isLoadingStart) {
      this.initialize()
    }

    if (this.props.ncaaStandingsConfStatus !== nextProps.ncaaStandingsConfStatus) {
      if (nextProps.ncaaStandingsConfStatus === 'done') {
        let selectedConf = nextProps.ncaaStandingsConf['selectedConf']
        this.setState(
          {
            selectedConf,
          },
          () => {
            let id = nextProps.ncaaStandingsConf['conferences'][selectedConf]['id']
            if (id) this.props.getncaastandingsteamsRequest(id, CURRENTYEAR)
          },
        )
      }
    }

    if (this.props.ncaaStandingsTeamsStatus !== nextProps.ncaaStandingsTeamsStatus) {
      if (this.state.isRefreshing && nextProps.ncaaStandingsTeamsStatus === 'done') {
        this.setState({ isRefreshing: false })
      }
    }
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true })
    this.onGetTeamsData()
  }

  onGetTeamsData = () => {
    let id = this.props.ncaaStandingsConf['conferences'][this.state.selectedConf]['id']
    if (id) this.props.getncaastandingsteamsRequest(id, CURRENTYEAR)
  }

  onToggleConf = (close?: boolean) => () => {
    if (!this.state.isModalVisible) {
      this.setState(
        {
          isModalVisible: !this.state.isModalVisible,
        },
        () => {
          this.state.modalY.setValue(Metrics.screenHeight)
          Animated.spring(this.state.modalY, {
            toValue: 0,
          }).start()
        },
      )
    } else {
      Animated.spring(this.state.modalY, {
        toValue: Metrics.screenHeight,
      }).start(() => {
        this.setState(
          {
            isModalVisible: false,
          },
          () => {
            if (!close) this.onGetTeamsData()
          },
        )
      })
    }
  }

  onSelectConf = index => () => {
    this.setState(
      {
        selectedConf: index,
      },
      () => {
        this.onToggleConf()()
      },
    )
  }

  onViewTeamInfo = id => {
    this.props.navigation.navigate('ncaa_teams', { teamID: id })
  }

  render() {
    const {
      isLoadingStart,
      ncaaStandingsConfStatus,
      ncaaStandingsConf,
      ncaaStandingsTeamsStatus,
      ncaaStandingsTeams,
    } = this.props
    const { isRefreshing, selectedConf, isModalVisible, modalY } = this.state

    return (
      <React.Fragment>
        <ScrollView
          style={screenStyles.ROOT}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onPageRefresh}
              colors={[Colors.active]}
              tintColor={Colors.active}
            />
          }
        >
          <View style={screenStyles.scrollContents}>
            {ncaaStandingsConf &&
              ncaaStandingsConf['conferences'] && (
                <View style={screenStyles.topConfMenu}>
                  <TouchableOpacity style={screenStyles.selectButton} onPress={this.onToggleConf()}>
                    <Text style={screenStyles.buttonText}>{ncaaStandingsConf['conferences'][selectedConf].title}</Text>
                    <Icon
                      style={screenStyles.downArrow}
                      iconType="fontAwesome5"
                      name="caret-down"
                      size={17}
                      color={Colors.black}
                    />
                  </TouchableOpacity>
                  <Text style={screenStyles.topConfMenuDesc}>Click to change conference</Text>
                </View>
              )}
            {ncaaStandingsTeams && (
              <CrossTable
                titles={NCAA_STANDINGS_TITLE}
                list={ncaaStandingsTeams}
                style={screenStyles.standingsTable}
                iconSize={{ width: 29, height: 29 }}
                onSelected={this.onViewTeamInfo}
              />
            )}
            <View style={screenStyles.glossary}>
              <Text style={screenStyles.glossaryTitle}>Glossary</Text>
              <View style={screenStyles.lineWrapper}>
                <Text style={screenStyles.lineTitle}>W-L:</Text>
                <Text style={screenStyles.lineContent}>Overall team record</Text>
              </View>
              <View style={screenStyles.lineWrapper}>
                <Text style={screenStyles.lineTitle}>CONF:</Text>
                <Text style={screenStyles.lineContent}>Record within the conference</Text>
              </View>
              <View style={screenStyles.lineWrapper}>
                <Text style={screenStyles.lineTitle}>ATS:</Text>
                <Text style={screenStyles.lineContent}>Wins and Losses against the spread</Text>
              </View>
              <View style={screenStyles.lineWrapper}>
                <Text style={screenStyles.lineTitle}>O-U:</Text>
                <Text style={screenStyles.lineContent}>Number of games the over and under has won</Text>
              </View>
            </View>

            <Modal style={screenStyles.confModal} visible={isModalVisible}>
              <Animated.View
                style={[
                  screenStyles.confAnimationView,
                  {
                    transform: [{ translateY: modalY }],
                  },
                ]}
              >
                <View style={screenStyles.modalContent}>
                  <Animated.View style={screenStyles.modalHeader}>
                    <Text style={screenStyles.modalSubject}>Select Conference</Text>
                    <TouchableOpacity style={screenStyles.closeButton} onPress={this.onToggleConf(true)}>
                      <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
                        <Icon iconType="material" name="close" size={30} color={Colors.white} />
                      </Animatable.View>
                    </TouchableOpacity>
                  </Animated.View>
                  <ScrollView>
                    <View style={screenStyles.modalBody}>
                      {ncaaStandingsConf &&
                        ncaaStandingsConf['conferences'] &&
                        ncaaStandingsConf['conferences'].map((item, index) => (
                          <TouchableOpacity
                            key={index}
                            style={screenStyles.modalItemWrapper}
                            onPress={this.onSelectConf(index)}
                          >
                            <Icon
                              style={[screenStyles.dotIndicator, selectedConf === index ? screenStyles.itemActive : {}]}
                              iconType="entypo"
                              name="controller-record"
                              size={13}
                              color={Colors.active}
                            />
                            <Text
                              style={[
                                screenStyles.modalItemText,
                                selectedConf === index ? screenStyles.itemActive : {},
                              ]}
                            >
                              {item.title}
                            </Text>
                          </TouchableOpacity>
                        ))}
                    </View>
                  </ScrollView>
                </View>
              </Animated.View>
            </Modal>
          </View>
        </ScrollView>
        <LoadingView
          isVisible={
            !isRefreshing &&
            (!isLoadingStart || ncaaStandingsConfStatus === 'pending' || ncaaStandingsTeamsStatus === 'pending')
          }
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  ncaaStandingsConfStatus: state.ncaa.ncaaStandingsConfStatus,
  ncaaStandingsConf: state.ncaa.ncaaStandingsConf,
  ncaaStandingsTeamsStatus: state.ncaa.ncaaStandingsTeamsStatus,
  ncaaStandingsTeams: state.ncaa.ncaaStandingsTeams,
})

const mapDispatchToProps = dispatch => ({
  getncaastandingsconfRequest: (year: string) => dispatch(NCAAActions.getncaastandingsconfRequest(year)),
  getncaastandingsteamsRequest: (id: string, year: string) =>
    dispatch(NCAAActions.getncaastandingsteamsRequest(id, year)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(NCAAStandings))
