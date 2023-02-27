import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, PermissionsAndroid} from 'react-native';
import SimasIcon from '../../../assets/fonts/SimasIcon';
import SinarmasInput from '../SinarmasInput/SinarmasInput.component';
import styles from './SinarmasIconInput.styles';
import Touchable from '../../Touchable.component';
import {selectContactPhone} from 'react-native-select-contact';
import {language} from '../../../config/language';
import {Toast} from '../../../utils/RNHelpers.util';
import {formatMobileNumberEmoney} from '../../../utils/transformer.util';
import noop from 'lodash/noop';
import result from 'lodash/result';

class SinarmasIconInput extends Component {


  getContact = () => {
    const {selectMobileNo, name, fieldContactName} = this.props;
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS).
      then((status) => {
        if ([PermissionsAndroid.RESULTS.GRANTED, true].includes(status)) {
          selectContactPhone().then((selection) => {
            if (!selection) {
              return null;
            }
            const contactName = result(selection, 'contact.name', '');
            const number = formatMobileNumberEmoney(result(selection, 'selectedPhone.number', ''));
            selectMobileNo(number, name, fieldContactName, contactName);
          }).catch(noop);
        } else {
          Toast.show(language.PERMISSION_ERROR__CONTACTS, Toast.LONG);
        }
      }).catch(() => {
        Toast.show(language.PERMISSION_ERROR__CONTACTS, Toast.LONG);
      });
  }

  render () {
    const {disabled = false, ...extraProps} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <SinarmasInput disabled={disabled} {...extraProps}/>
          <Touchable onPress={this.getContact} style={styles.contactIcon}>
            <View><SimasIcon name='contact' size={25}/></View>
          </Touchable> 
        </View>
      </View>
    );
  }
}

SinarmasIconInput.propTypes = {
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  disabled: PropTypes.bool,
  selectMobileNo: PropTypes.func,
  name: PropTypes.string,
  fieldContactName: PropTypes.string
};

export default SinarmasIconInput;
