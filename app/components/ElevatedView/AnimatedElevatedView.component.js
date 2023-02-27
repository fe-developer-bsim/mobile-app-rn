import React from 'react';
import PropTypes from 'prop-types';
import {Platform, Animated} from 'react-native';

export default class ElevatedView extends React.Component {
  static propTypes = {
    elevation: PropTypes.number,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };
  static defaultProps = {
    elevation: 0
  };

  render () {
    const {elevation, style, ...otherProps} = this.props;

    if (Platform.OS === 'android') {
      return (
        <Animated.View elevation={elevation} style={[{elevation, backgroundColor: 'white'}, style]} {...otherProps}>
          {this.props.children}
        </Animated.View>
      );
    }

    if (elevation === 0) {
      return (
        <Animated.View style={style} {...otherProps}>
          {this.props.children}
        </Animated.View>
      );
    }

    const iosShadowElevation = {
      shadowOpacity: 0.0015 * elevation + 0.18,
      shadowRadius: 0.54 * elevation,
      shadowOffset: {
        height: 0.6 * elevation,
      },
    };

    return (
      <Animated.View style={[iosShadowElevation, style]} {...otherProps}>
        {this.props.children}
      </Animated.View>
    );
  }
}
