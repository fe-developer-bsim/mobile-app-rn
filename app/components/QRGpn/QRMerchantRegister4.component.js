import {View, Text} from 'react-native';
import React from 'react';
import {SinarmasInput, SinarmasButton} from '../FormComponents';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import {Field} from 'redux-form';
import styles from './QRMerchantRegister4.styles';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

class QRMerchantRegister4 extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    formValues: PropTypes.object,
    availName: PropTypes.func,
    availUsername: PropTypes.func,
    status: PropTypes.string,
    navigation: PropTypes.object,
    confirmation: PropTypes.func,
    availStorename: PropTypes.func,
  }


  confirmation = () => {
    const {navigation, confirmation} = this.props;
    const params = result(navigation, 'state.params', {});
    const isRegisterStore = result(params, 'isRegisterStore');
    const isRegisterTerminal = result(params, 'isRegisterTerminal');
    const merchantId = result(navigation, 'state.params.merchantId', '');
    const terminal_id = result(navigation, 'state.params.terminal_id', '');
    const pan = result(navigation, 'state.params.pan', '');
    confirmation(isRegisterStore, isRegisterTerminal, merchantId, terminal_id, pan);
  }

  render () {
    const {availUsername, status, navigation, ...reduxFormProps} = this.props;
    const {handleSubmit, submitting, invalid} = reduxFormProps;
    const params = result(navigation, 'state.params', {});
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraHeight={120}>
        <View style={styles.formContainer}>
          <View style={styles.containerInner}>
            <Text style={styles.titles}>{language.QR_GPN__MERCHANT_DETAIL_06}</Text>
            <Text style={styles.titles2}>{language.QR_GPN__TERMINAL_CASHIERS}</Text>
            <View>
              <Field
                name='cashierName'
                label={language.QR_GPN__MERCHANT_CASHIER_NAME}
                placeholder={language.QR_GPN__TERMINAL_CASHIERS}
                component={SinarmasInput}
                maxLength={25}
              />
            </View>
            <View>
              <Field
                name='loginCashierName'
                label={language.QR_GPN__MERCHANT_LOGIN_CASHIER_NAME}
                placeholder={language.QR_GPN__MERCHANT_LOGIN_CASHIER_NAME}
                component={SinarmasInput}
                maxLength={20}
                whenBlur={availUsername}
              />

            </View>
            { status === '1' ?
              <View style={styles.textcontainer}>
                <Text style={styles.textavailable}>{language.QR_GPN__USERNAME_AVAILABLE}</Text>
              </View>
              : status === '2' ?
                <View style={styles.textcontainer}>
                  <Text style={styles.textnotavail}>{language.QR_GPN__USERNAME_NOT_AVAILABLE}</Text>
                </View>
                : null
            }
            <Field
              name='securityPhone'
              label={language.QR_GPN__MERCHANT_CASHIER_PHONE}
              placeholder={language.QR_GPN__MERCHANT_CASHIER_PHONE}
              component={SinarmasInput}
              maxLength={14}
              keyboardType='numeric'
            />
            <View style={styles.textcontainerPhone}>
              <Text style={styles.textavailablePhone}>{language.QR__PHONE_INFORMATION}</Text>
            </View>
          </View>
        </View>
        { isEmpty(params) ?
          <View style={styles.containerBtn}>
            <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={submitting || invalid} text={language.GENERIC__CONTINUE}/>
          </View>
          : (status !== '1') ?
            <View style={styles.containerBtn}>
              <SinarmasButton disabled={true} text={language.GENERIC__CONTINUE}/>
            </View>
            :
            <View style={styles.containerBtn}>
              <SinarmasButton onPress={this.confirmation} disabled={submitting || invalid} text={language.GENERIC__CONTINUE}/>
            </View>
        }

      </KeyboardAwareScrollView>
    );
  }
}




export default QRMerchantRegister4;
