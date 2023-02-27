import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';
import LogoImage from '../../assets/images/simobiplus.png';
import styles from './AppLogo.styles';

export default class AppLogo extends Component {
  static propTypes = {
    style: PropTypes.object,
  }

  render () {
    const containerStyles = {
      ...styles.container,
      ...this.props.style
    };
    return (
      <View style={containerStyles}>
        <Image source={LogoImage} style={styles.logoImage}/>
      </View>
    );
  }
}
