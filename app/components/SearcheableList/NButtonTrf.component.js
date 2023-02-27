import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Touchable from '../Touchable.component';
import styles from './NButtonTrf.style';
import SimasIcon from '../../assets/fonts/SimasIcon';

const NButtonTrf = ({onPress, disabled, icon, dtActionName, ...extraProps}) => {
  const containerStyle = disabled ? styles.iconContainer : styles.disabledContainer;
  const btnIcon = icon ? icon : 'arrow';
  return (
    <Touchable dtActionName ={dtActionName} {...extraProps} disabled={!disabled} onPress={onPress}>
      <View style={containerStyle}>
        <SimasIcon name={btnIcon} size={30} style={disabled ? styles.iconStyle : styles.iconStyleDisabled}/>
      </View>
    </Touchable>
  );
};

NButtonTrf.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  getContact: PropTypes.func,
  dtActionName: PropTypes.string,
};

export default NButtonTrf;
