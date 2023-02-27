import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './QRInvoice.styles';
import {SinarmasButton} from '../FormComponents';
import noop from 'lodash/noop';
import {language} from '../../config/language';
import result from 'lodash/result';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class WithdrawalForm extends React.Component {
  static propTypes = {
    accounts: PropTypes.array,
    navParams: PropTypes.object,
    inputTipDisabled: PropTypes.bool,
    submitting: PropTypes.bool,
  }

  render () {
    const {navParams, submitting, ...reduxFormProps} = this.props;
    const {handleSubmit = noop, invalid = false} = reduxFormProps;
    const accountNo = result(navParams, 'accountNo.name', '');
    const amountVal = result(navParams, 'amountVal', '');
    const noteRes = result(navParams, 'note', '');
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraHeight={200}>
        <View style={styles.mainContainer}>
          <View style={styles.mainLabel}>
            <Text style={styles.tittleHeader}>{language.QR_GPN__WITHDRAWAL_CONFIRM_QR}</Text>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.mainLabel}>
            <Text>{language.QR_GPN__WITHDRAWAL_FROM}</Text>
            <Text>{accountNo}</Text>
          </View>
          <View style={styles.mainLabel}>
            <Text>{language.QR_GPN__WITHDRAWAL_AMOUNT}</Text>
            <Text>{amountVal}</Text>
          </View>
          <View style={styles.mainLabel}>
            <Text>{language.QR_GPN__WITHDRAWAL_NOTE}</Text>
            <Text>{noteRes}</Text>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.btnConfirm}>
            <SinarmasButton onPress={handleSubmit} disabled={invalid || submitting} >
              <Text style={styles.buttonLargeTextStyle}>{language.QR_GPN_PAYMENT_NEXT_BTN}</Text>
            </SinarmasButton>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}


export default WithdrawalForm;
