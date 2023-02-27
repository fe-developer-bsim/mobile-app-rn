import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';

const styles = {
  imageDefault: {
    width: 380,
    height: 160
  }
};
export default class TopBanner extends Component {
  static propTypes = {
    source: PropTypes.number,
    imageStyle: PropTypes.object,
    imagePointerEvents: PropTypes.string
  }
  render () {
    const {source, imageStyle, ...extraProps} = this.props;
    const updatedImageStyle = {
      ...styles.imageDefault,
      ...imageStyle
    };
    return (
      <View {...extraProps}>
        {source && <Image source={source} style={updatedImageStyle}/>}
      </View>
    );
  }
}
