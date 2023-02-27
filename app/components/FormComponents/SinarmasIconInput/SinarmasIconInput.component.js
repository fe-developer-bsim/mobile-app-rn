import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import SimasIcon from '../../../assets/fonts/SimasIcon';
import SinarmasInput from '../SinarmasInput/SinarmasInput.component';
import styles from './SinarmasIconInput.styles';

class SinarmasIconInput extends Component {
  render () {
    const {iconName, iconSize = 25, disabled = false, ...extraProps} = this.props;
    const iconStyle = {...styles.icon};
    return (
      <View style={styles.container}>
        {iconName && <SimasIcon name={iconName} size={iconSize} style={iconStyle}/>}
        <View style={styles.inputWrapper}>
          <SinarmasInput disabled={disabled} {...extraProps}/>
        </View>
      </View>
    );
  }
}

SinarmasIconInput.propTypes = {
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  disabled: PropTypes.bool,
};

export default SinarmasIconInput;
