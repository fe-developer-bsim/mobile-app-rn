import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import noop from 'lodash/noop';

class Touchable extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    children: PropTypes.node,
    highlightOpacity: PropTypes.number,
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

  renderWithDtAction = (extraProps, dtActionName, onpressHandler, disabled, highlightOpacity, children) => (
    <TouchableOpacity {...extraProps} dtActionName={dtActionName} onPress={onpressHandler} disabled={disabled} useForeground={true} activeOpacity={highlightOpacity}>
      {children}
    </TouchableOpacity>
  )

  renderWithoutDtAction = (extraProps, onpressHandler, disabled, highlightOpacity, children) => (
    <TouchableOpacity {...extraProps} onPress={onpressHandler} disabled={disabled} useForeground={true} activeOpacity={highlightOpacity}>
      {children}
    </TouchableOpacity>
  )
  render () {
    const {onPress = noop, disabled, children, highlightOpacity, dtActionName, ...extraProps} = this.props;
    const onpressHandler = this.callOnceInInterval(onPress);
    return dtActionName !== '' ? this.renderWithDtAction(extraProps, dtActionName, onpressHandler, disabled, highlightOpacity, children) : this.renderWithoutDtAction(extraProps, onpressHandler, disabled, highlightOpacity, children);
  }
}

export default Touchable;
