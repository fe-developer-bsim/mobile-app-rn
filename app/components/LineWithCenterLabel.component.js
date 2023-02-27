import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {bold, fontSizeMediumStyle} from '../styles/common.styles';
const styles = {
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 30
  },
  text: {
    color: 'red',
    flex: 0,
    paddingHorizontal: 10
  },
  borderStyle: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#989898'
  }
};
const LineWithCenterLabel = ({text = '', style}) => text && (
  <View style={[styles.container, style]}>
    <View style={styles.borderStyle} />
    <Text style={[styles.text, fontSizeMediumStyle, bold]}>
      {text}
    </Text>
    <View style={styles.borderStyle} />
  </View>
);

LineWithCenterLabel.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object
};

export default LineWithCenterLabel;
