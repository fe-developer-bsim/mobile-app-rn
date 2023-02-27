import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import styles from './NButton.style';

const NButton = ({onPress, enabled, ...extraProps}) => {
  const containerStyle = enabled ? styles.iconContainer : styles.disabledContainer;
  return (<Touchable {...extraProps} disabled={!enabled} onPress={onPress}>
    <View style={containerStyle}>
      <SimasIcon style={styles.inputIcon} name='arrow' />
    </View>
  </Touchable>);
};

NButton.propTypes = {
  onPress: PropTypes.func,
  enabled: PropTypes.bool
};

export default NButton;
