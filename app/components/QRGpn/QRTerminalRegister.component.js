import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {SinarmasButton} from '../FormComponents';
import styles from './QRTerminalRegister.styles';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasInput} from '../FormComponents';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import {Field} from 'redux-form';
import {SinarmasIconInput} from '../FormComponents';
import result from 'lodash/result';

class QRTerminalRegister extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    navigation: PropTypes.object,
    dispatch: PropTypes.func
  }

  state = {
    merchantId: ''
  }

  submit = () => {
    const {navigation, dispatch, ...reduxFormProps} = this.props;
    const {handleSubmit} = reduxFormProps;
    const detailData = result(navigation, 'state.params', {});
    const merchantId = result(detailData, 'merchantId', '');
    this.setState({merchantId: merchantId});
    dispatch(wrapMethodInFunction(handleSubmit));
  };

  render () {
    const {...reduxFormProps} = this.props;
    const {submitting, invalid} = reduxFormProps;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraHeight={120}>
        <View style={styles.formContainer}>
          <View style={styles.containerInner}>
            <Text style={styles.titles}>{language.QR_GPN__MERCHANT_DETAIL}</Text>
            <Field
              name='merchant_pan_name'
              label={language.QR_GPN__TERMINAL_NAME}
              placeholder={language.HINTTEXT__QR_GPN_TERMINAL_NAME}
              component={SinarmasInput}
              maxLength={25}
            />
            <Field
              name='mobile_number'
              label={language.QR_GPN__TERMINAL_PHONE}
              placeholder={language.HINTTEXT__QR_GPN_TERMINAL_PHONE}
              keyboardType='numeric'
              maxLength={13}
              component={SinarmasInput}
            />
            <Field
              name='username'
              component={SinarmasIconInput}
              label={language.QR_GPN__TERMINAL_USERNAME_02}
              placeholder={language.HINTTEXT__QR_GPN_TERMINAL_USERNAME}
            />
          </View>
        </View>
        <View style={styles.containerBtn}>
          <SinarmasButton onPress={this.submit} disabled={invalid || submitting} text={language.SERVICE__NEXT_BUTTON}/>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default QRTerminalRegister;
