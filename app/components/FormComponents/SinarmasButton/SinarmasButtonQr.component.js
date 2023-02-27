import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './SinarmasButtonQr.component.styles';
import Touchable from '../../Touchable.component';

const Button = ({
  children,
  disabled = false,
  onPress,
  highlightColor = 'white',
  highlightOpacity = 0.5,
  disabledStyle,
  buttonType = 'primary',
  text,
  ...extraProps
}) => {
  let viewStyle = {};
  let buttontextStyle = styles[buttonType + 'ButtonText'];
  if (disabled) {
    viewStyle = disabledStyle || styles[buttonType + 'ButtonDisabled'];
    buttontextStyle = [
      styles[buttonType + 'ButtonText'],
      styles[buttonType + 'ButtonTextDisabled'],
    ];
  }
  const nestedChildren = children || (
    <Text style={buttontextStyle}>{text}</Text>
  );
  return (
    <Touchable
      onPress={onPress}
      disabled={disabled}
      highlightColor={highlightColor}
      activeOpacity={highlightOpacity}
    >
      <View
        {...extraProps}
        style={[styles[buttonType + 'Button'], extraProps.style, viewStyle]}
      >
        {nestedChildren}
      </View>
    </Touchable>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  children: PropTypes.node,
  highlightColor: PropTypes.string,
  highlightOpacity: PropTypes.number,
  disabledStyle: PropTypes.object,
  text: PropTypes.string,
  buttonType: PropTypes.string
};

export default Button;
