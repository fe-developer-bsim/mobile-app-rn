import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';
import {View, Text} from 'react-native';
import {SinarmasButton, SinarmasInput} from '../FormComponents';
import {formatFieldName, formatFieldAccount} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import styles from './CreditCardAccount.style';
import noop from 'lodash/noop';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {wrapMethodInFunction, isInBin, isNetworkEnabled, selectedBank} from '../../utils/transformer.util';
import result from 'lodash/result';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import {Alert} from '../../utils/RNHelpers.util';

class CreditCardAccountView extends Component {
  static propTypes = {
    onNext: PropTypes.func,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
    handleCardClick: PropTypes.func,
    scanCard: PropTypes.func,
    submitting: PropTypes.bool,
    recentTransactions: PropTypes.array,
    payees: PropTypes.array,
    formValues: PropTypes.object,
    bankList: PropTypes.array,
    onBankPress: PropTypes.func,
    payeeNameDisabled: PropTypes.bool,
    getPayeeDetails: PropTypes.func,
    updateName: PropTypes.func,
    updateBank: PropTypes.func,
    updatePayeeDisabled: PropTypes.func
  }

  getBankName = (accountNumber) => {
    if (!isEmpty(accountNumber)) {
      const {payees, bankList, getPayeeDetails, updateName, updateBank, updatePayeeDisabled} = this.props;
      const payee = filter(payees, {'accountNumber': accountNumber});
      const bank = selectedBank(accountNumber, bankList);
      if (accountNumber.length === 16) {
        if (isInBin(accountNumber, bankList)) {
          updateBank(result(bank, '[0]'));
        }
        if (payee.length > 0) {
          const name = result(payee, '[0]name');
          updateName(name);
        } else {
          const networkEnabled = isNetworkEnabled(accountNumber, bankList);
          if (networkEnabled) {
            getPayeeDetails(result(bank, '[0]'), accountNumber);
          } else {
            updatePayeeDisabled(false);
          }
        }
      } else {
        updateBank('');
        updateName('');
      }
    }
  }

  bankCheck = () => {
    const {formValues, handleSubmit = noop, bankList} = this.props;
    const bank = result(formValues, 'bank');
    const accountNumber = result(formValues, 'accNo', '');
    const isSupported = isInBin(accountNumber, bankList) ? (bank.sknCC || bank.networkCC || bank.rtgsCC || bank.isSinarmas) : (bank.sknEnabled || bank.networkEnabled || bank.rtgsEnabled || bank.isSinarmas);
    if (!isSupported) {
      Alert.alert(language.VALIDATE__BANK_NOT_SUPPORTED, language.VALIDATE__CREDIT_CARD_NOT_SUPPORTED, [{
        text: language.GENERIC__OK
      }]);
    } else {
      handleSubmit();
    }
  }


  formatBank = (bank = {}) => bank.bankName || ''

  render () {
    const {invalid, submitting, onBankPress, formValues, scanCard = noop} = this.props;
    const payeeDisabled = result(formValues, 'payeeNameDisabled', true);
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraHeight={120}>
        <Text style={styles.title}>{language.CREDIT_CARD__PAY_NEW_BILL}</Text>
        <Text style={styles.subtext}>{language.CREDIT_CARD__ENTER_CARD_DETAILS}</Text>
        <View style={styles.formContainer}>
          <Field
            name='accNo'
            label={language.CREDIT_CARD__ACCOUNT_NUMBER}
            placeholder={language.HINTTEXT__CREDIT_CARD_NUMBER}
            format={formatFieldAccount}
            normalize={formatFieldAccount}
            component={SinarmasInput}
            keyboardType='numeric'
            maxLength={16}
            onInputChange={this.getBankName}
          />
          <Touchable onPress={scanCard} style={styles.cameraIconStyle}><SimasIcon name='camera' size={20}/></Touchable>
          <View>
            <Touchable onPress={onBankPress}>
              <Field
                name='bank'
                label={language.TRANSFER__BANK_OR_CODE}
                placeholder={language.HINTTEXT__BANK_NAME_OR_CODE}
                format={this.formatBank}
                disabled={true}
                component={SinarmasInput}
                keyboardType='numeric'
              />
            </Touchable>
          </View>
          <View>
            <Field
              name='name'
              label={language.CREDIT_CARD__INPUT_NAME}
              placeholder={language.HINTTEXT__PAYEE_NAME}
              disabled={payeeDisabled}
              format={formatFieldName}
              normalize={formatFieldName}
              component={SinarmasInput}
            />
          </View>
        </View>
        <SinarmasButton onPress={wrapMethodInFunction(this.bankCheck)} disabled={invalid || submitting} text={language.SERVICE__NEXT_BUTTON} />
      </KeyboardAwareScrollView>
    );
  }
}

export default CreditCardAccountView;
