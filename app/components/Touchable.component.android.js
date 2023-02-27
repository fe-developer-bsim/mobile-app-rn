import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableNativeFeedback, View, Platform} from 'react-native';
import {theme} from '../styles/core.styles';
import noop from 'lodash/noop';

class Touchable extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    children: PropTypes.node,
    highlightColor: PropTypes.string,
    dtActionName: PropTypes.string,
  }

  state = {
    isCalled: false,
    timer: 0
  }

  componentWillUnmount () {
    clearTimeout(this.state.timer);
  }

  callOnceInInterval = (functionTobeCalled, interval = 600) => (...args) => {
    if (!this.state.isCalled) {
      this.setState({isCalled: true});
      clearTimeout(this.state.timer);
      this.setState({timer: setTimeout(() => {
        this.setState({isCalled: false});
      }, interval)});
      return functionTobeCalled(...args);
    }
    return;
  };

  renderWithDtAction = (extraProps, dtActionName, onpressHandler, disabled, foregroundRippleSupport, background, children) => (
    <TouchableNativeFeedback dtActionName={dtActionName} onPress={onpressHandler} disabled={disabled} useForeground={foregroundRippleSupport} background={background}>
      <View {...extraProps}>
        {children}
      </View>
    </TouchableNativeFeedback>
  )

  renderWithoutDtAction = (extraProps, onpressHandler, disabled, foregroundRippleSupport, background, children) => (
    <TouchableNativeFeedback onPress={onpressHandler} disabled={disabled} useForeground={foregroundRippleSupport} background={background}>
      <View {...extraProps}>
        {children}
      </View>
    </TouchableNativeFeedback>
  )
    
  render () {
    const {onPress = noop, disabled, children, highlightColor = theme.inputBackground, dtActionName, ...extraProps} = this.props;
    const onpressHandler = this.callOnceInInterval(onPress);
    const background = (Platform.Version >= 21) ? TouchableNativeFeedback.Ripple(highlightColor) : TouchableNativeFeedback.SelectableBackground();
    const foregroundRippleSupport = TouchableNativeFeedback.canUseNativeForeground();
    return dtActionName !== '' ? this.renderWithDtAction(extraProps, dtActionName, onpressHandler, disabled, foregroundRippleSupport, background, children) : this.renderWithoutDtAction(extraProps, onpressHandler, disabled, foregroundRippleSupport, background, children);
  }
}

export default Touchable;
