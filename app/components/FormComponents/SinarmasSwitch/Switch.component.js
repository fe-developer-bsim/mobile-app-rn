import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-native-customisable-switch';
import noop from 'lodash/noop';
import styles from './Switch.style';
import {View} from 'react-native';

const CustomSwitch = ({onChangeHandler = noop, defaultValue = false, noText, switchWidth = 60, switchHeight = 29, buttonWidth = 23, buttonHeight = 23, colorBrand = false}) => {
  const onText = noText ? '' : 'ON';
  const offText = noText ? '' : 'OFF';
  return (
    <View style={styles.container}>
      <Switch
        value={defaultValue}
        activeText={onText}
        inactiveText={offText}
        fontSize={12}
        switchWidth={switchWidth}
        switchHeight={switchHeight}
        buttonWidth={buttonWidth}
        buttonHeight={buttonHeight}
        onChangeValue={onChangeHandler}
        activeBackgroundColor={colorBrand ? styles.enabledColorBrand : styles.enabledColor}
        inactiveBackgroundColor={styles.disabledColor}
      />
    </View>
  );
};


CustomSwitch.propTypes = {
  onChangeHandler: PropTypes.func,
  defaultValue: PropTypes.bool,
  noText: PropTypes.bool,
  switchWidth: PropTypes.number,
  switchHeight: PropTypes.number, 
  buttonWidth: PropTypes.number, 
  buttonHeight: PropTypes.number,
  colorBrand: PropTypes.bool
};

export default CustomSwitch;
