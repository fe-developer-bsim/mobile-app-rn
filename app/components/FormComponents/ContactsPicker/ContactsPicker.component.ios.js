import React from 'react';
import PropTypes from 'prop-types';
import ContactsWrapper from '@tuofeng/react-native-contacts-wrapper';
import Touchable from '../../Touchable.component';
import {Text} from 'react-native';
import noop from 'lodash/noop';
import styles from './ContactsPicker.styles';
import {language} from '../../../config/language';

class ContactsPicker extends React.Component {
  static propTypes = {
    input: PropTypes.object,
    style: PropTypes.object,
    containerStyle: PropTypes.object,
    label: PropTypes.string,
    onContactSelection: PropTypes.func,
  }
  changeReduxForm = (contact) => {
    const {input = {onChange: noop}, onContactSelection = noop} = this.props;
    input.onBlur(contact);
    onContactSelection(contact);
  }
  clickHandler = () => {
    ContactsWrapper.getContact().then(this.changeReduxForm).catch(noop);
  }
  render () {
    const {label = language.MOBILE_TOPUP__OR_SELECT_CONTACT, style = {}, containerStyle = {}} = this.props;
    return (
      <Touchable style={[styles.containerStyle, containerStyle]} onPress={this.clickHandler}><Text style={[styles.contactsPicker, style]}>{label}</Text></Touchable>
    );
  }
}

export default ContactsPicker;
