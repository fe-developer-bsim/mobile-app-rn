import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ImageBackground, View} from 'react-native';

const styles = {
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  }
};

export default class BackgroundCard extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]),
    backgroundImage: PropTypes.number,
  }

  render () {
    const {children, backgroundImage, ...extraProps} = this.props;
    return (
      <View {...extraProps}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          {children}
        </ImageBackground>
      </View>
    );
  }
}
