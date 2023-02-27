import React from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';
import styles from './Banner.component.style';

class Banner extends React.Component {
  static propTypes = {
    imageLink: PropTypes.string
  }
  render () {
    const {imageLink, ...extraProps} = this.props;
    return (
      imageLink
        ? <View style={[extraProps.style, styles.container]}>
          <Image resizeMode={'contain'} style={styles.image} source={{uri: imageLink}}/>
        </View>
        : null
    );
  }
}

export default Banner;
