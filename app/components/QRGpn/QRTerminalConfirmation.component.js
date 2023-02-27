import {Text, View, ScrollView} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {SinarmasButton} from '../FormComponents';
import styles from './QRTerminalConfirmation.styles';
import {language} from '../../config/language';
import result from 'lodash/result';
import noop from 'lodash/noop';
import {wrapMethodInFunction} from '../../utils/transformer.util';

class QRTerminalConfirmation extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    navigation: PropTypes.object,
    dispatch: PropTypes.func
  }

  state = {
    disabled: false,
  }

  submit = () => {
    this.setState({disabled: true}, () => {
      const {handleSubmit = noop} = this.props;
      wrapMethodInFunction(handleSubmit());
      setTimeout(() => {
        this.setState({disabled: false});
      }, 7000);
    });
  };

  render () {
    const {navigation} = this.props;
    const {invalid} = this.props;
    const formQRGPN = result(navigation, 'state.params.form', {});
    const merchant_pan_name = result(formQRGPN, 'merchant_pan_name', '');
    const mobile_number = result(formQRGPN, 'mobile_number', '');
    const username = result(formQRGPN, 'mobile_number', '');
    return (
      <ScrollView keyboardShouldPersistTaps='handled'  contentContainerStyle={styles.containerContent}>
        <View style={styles.containerInner}>
          <View style={styles.container}>
            <Text style={styles.titles}>{language.QR_GPN__MERCHANT_DETAIL}</Text>
          </View>
          <View style={styles.containerText}>
            <Text style={styles.headText}>{language.QR_GPN__TERMINAL_NAME}</Text>
            <Text style={styles.subText}>{merchant_pan_name}</Text>
          </View>
          <View style={styles.containerText}>
            <Text style={styles.headText}>{language.QR_GPN__TERMINAL_PHONE}</Text>
            <Text style={styles.subText}>{mobile_number}</Text>
          </View>
          <View style={styles.containerText}>
            <Text style={styles.headText}>{language.QR_GPN__TERMINAL_USERNAME_01}</Text>
            <Text style={styles.subText}>{username}</Text>
          </View>
        </View>
        <View style={styles.buttonNext}>
          <SinarmasButton onPress={this.submit} disabled={invalid} text={language.BUTTON__CONFIRM}/>
        </View>
      </ScrollView>
    );
  }
}


export default QRTerminalConfirmation;
