import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, StatusBar, Animated, Easing, AppState} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import noop from 'lodash/noop';
import {theme} from '../../styles/core.styles';
import styles from './OfflineBar.styles';
import {language} from '../../config/language';
import result from 'lodash/result';

export default class OfflineBar extends Component {
  static propTypes = {
    setNetworkStatus: PropTypes.func,
    networkStatus: PropTypes.object,
    resetNetworkBar: PropTypes.func,
    highlightText: PropTypes.bool
  }

  animationConstants = {
    DURATION: 800,
    TO_VALUE: 4,
    INPUT_RANGE: [0, .5, 1, 1.5, 2, 2.5, 3, 3.5, 4],
    OUTPUT_RANGE: [0, -15, 0, 15, 0, -15, 0, 15, 0]
  }
  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      NetInfo.fetch().then(this.props.setNetworkStatus);
    }
  }
  componentWillMount () {
    // NetInfo.addEventListener('connectionChange', this.props.setNetworkStatus);
    AppState.addEventListener('change', this._handleAppStateChange);
    this.animation = new Animated.Value(0);
  }
  componentWillUnMount () {
    // NetInfo.removeEventListener('connectionChange', this.props.setNetworkStatus);
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  componentWillReceiveProps (newProps) {
    if (newProps.highlightText) {
      const {resetNetworkBar = noop} = this.props;
      this.triggerAnimation();
      resetNetworkBar();
    }
  }
  // Took Reference from https://egghead.io/lessons/react-create-a-button-shake-animation-in-react-native#/tab-code
  triggerAnimation = () => {
    this.animation.setValue(0);
    Animated.timing(this.animation, {
      duration: this.animationConstants.DURATION,
      toValue: this.animationConstants.TO_VALUE,
      useNativeDriver: true,
      ease: Easing.bounce
    }).start();
  }

  render () {
    const interpolated = this.animation.interpolate({
      inputRange: this.animationConstants.INPUT_RANGE,
      outputRange: this.animationConstants.OUTPUT_RANGE
    });
    const animationStyle = {
      transform: [{translateX: interpolated}]
    };
    const isConnected = result(this.props, 'networkStatus.isConnected', true);
    return !isConnected ?
      <View style={[styles.container]}>
        <StatusBar backgroundColor={theme.barBG} />
        <Animated.Text style={[styles.offlineText, animationStyle]}>{language.OFFLINE__ERROR}</Animated.Text>
      </View> : null;
  }
}
