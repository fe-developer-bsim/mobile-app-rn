import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  container: {
  },
  text: {
    fontSize: 15,
    fontWeight: '600'
  }
};
const Label = ({text, style}) => (<View style={styles.container}><Text style={[styles.text, style]}>{text}</Text></View>);

Label.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.object
};

export default Label;
