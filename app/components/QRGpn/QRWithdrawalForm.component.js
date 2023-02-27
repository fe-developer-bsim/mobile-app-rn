import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './QRInvoice.styles';
import {SinarmasButton} from '../FormComponents';
import noop from 'lodash/noop';
import {language} from '../../config/language';
import result from 'lodash/result';
import {Field} from 'redux-form';
import {generateAccountLabel, balanceFormatter, getUnformattedAccountAmount, formatFieldAmount, normalizeAmount} from '../../utils/transformer.util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasPickerLine, SinarmasInput} from '../FormComponents';

class WithdrawalForm extends React.Component {
  static propTypes = {
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    navigation: PropTypes.object,
    inputTipDisabled: PropTypes.bool,
    submitting: PropTypes.bool,
    WithdrawalForOther: PropTypes.func,
  }

  forOther = () => {
    const {WithdrawalForOther} = this.props;
    WithdrawalForOther();
  }

  render () {
    const {accounts, navigation, formValues, submitting, ...reduxFormProps} = this.props;
    const {handleSubmit = noop, invalid = false} = reduxFormProps;
    const availableBalance = getUnformattedAccountAmount(result(formValues, 'accountNo', {}));
    const navParams = result(navigation, 'state.jsonData', {});
    const bankCode = result(navParams, '26.01', '');
    const isSinarmas = bankCode ? bankCode.substring(5, 8) === '153' : '';
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraHeight={200}>
        <View style={styles.mainContainer}>
          <View style={styles.mainLabel}>
            <Text style={styles.tittleHeader}>{language.QR_GPN__WITHDRAWAL}</Text>
          </View>
          <View style={styles.summaryContainer}>
            <Field
              name='accountNo'
              rightIcon='arrow'
              component={SinarmasPickerLine}
              labelText={language.GENERIC_BILLER__SOURCE_ACC}
              placeholder={language.GENERIC_BILLER__SELECT_ACCOUNT_PLACEHOLDER}
              labelKey='display'
              itemList={generateAccountLabel(accounts)} />
            <Text style={styles.availableBalanceText}>{language.GENERIC_BILLER__AVAILABLE_BALANCE} : {language.QR_GPN__REFUND_RP}{balanceFormatter(availableBalance)}</Text>
          </View>
          <View style={styles.mainLabel}>
            <Field
              name='amountVal'
              component={SinarmasInput}
              keyboardType='numeric'
              label={language.QR_GPN_INPUT_AMOUNT_VALUE}
              placeholder={language.QR_GPN_INPUT_AMOUNT_VALUE}
              format={formatFieldAmount}
              normalize={normalizeAmount}
            />
          </View>
          <View style={styles.mainLabel}>
            <Field
              name='note'
              component={SinarmasInput}
              label={language.QR_GPN__WITHDRAWAL_NOTE}
              placeholder={language.QR_GPN__WITHDRAWAL_NOTE}
            />
          </View>
          { isSinarmas ?
            <View style={styles.mainLabel}>
              <SinarmasButton onPress={this.forOther} >
                <Text>{language.QR_GPN__CARDLESS_OTHER}</Text>
              </SinarmasButton>
            </View>
            :
            null

          }
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
