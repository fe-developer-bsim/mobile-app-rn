import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-checkbox';
import checkedImage from '../../../assets/images/checkbox-checked.png';// TODO: get images from designers
import uncheckedImage from '../../../assets/images/checkbox-unchecked.png';
import styles from './checkbox.styles';
import noop from 'lodash/noop';
import Touchable from '../../Touchable.component';

const CustomCheckBox = ({input = {}, containerStyle = {}, labelStyle = {}, disabled = false, customCheckedImage = undefined, customUncheckedImage = undefined, ...extraProps}) => {
  const changeHandler = !disabled ? (changedVal) => input.onChange(!changedVal) : noop; // Done due to behaviour of react-native-checkbox
  return (
    <Touchable onPress={noop}>
      <CheckBox underlayColor='transparent' labelStyle={[styles.labelStyle, labelStyle]}
        checkedImage={customCheckedImage ? customCheckedImage : checkedImage} uncheckedImage={customUncheckedImage ? customUncheckedImage : uncheckedImage} checked={!!input.value}
        containerStyle={[styles.containerStyle, containerStyle]} onChange={changeHandler} {...extraProps}/>
    </Touchable>

  );
};

CustomCheckBox.propTypes = {
  input: PropTypes.object,
  containerStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  disabled: PropTypes.bool,
  customCheckedImage: PropTypes.number,
  customUncheckedImage: PropTypes.number,
};

export default CustomCheckBox;
