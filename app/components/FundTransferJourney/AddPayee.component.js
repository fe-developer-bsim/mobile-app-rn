import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasInput, SinarmasButton} from '../FormComponents';
import Touchable from '../Touchable.component';
import {Field} from 'redux-form';
import {noop, isEmpty} from 'lodash';
import {wrapMethodInFunction, formatFieldName, checkNumber, formatPayeeName} from '../../utils/transformer.util';
import styles from './AddPayee.component.style';
import {language} from '../../config/language';
import result from 'lodash/result';
import SimasIcon from '../../assets/fonts/SimasIcon';


class AddPayee extends React.Component {
  static propTypes = {
    payeeNameDisabled: PropTypes.bool,
    onPayeeAccountPress: PropTypes.func,
    onBankNamePress: PropTypes.func,
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    payeeTypeList: PropTypes.array,
    providerList: PropTypes.array,
    bankList: PropTypes.array,
    payeeType: PropTypes.string,
    getPayeeDetail: PropTypes.func,
    clearBank: PropTypes.func,
    emoneyAccount: PropTypes.object,
    payeeName: PropTypes.string,
    unregisteredName: PropTypes.string,
    payeeForm: PropTypes.object,
    originalName: PropTypes.string,
    bankNameText: PropTypes.string,
    isBiFast: PropTypes.bool,
  }

  formatBank = (bank = '') => bank.bankName || ''

  render () {
    const {invalid, submitting, handleSubmit = noop, onPayeeAccountPress = noop, onBankNamePress = noop,
      payeeName, payeeForm, originalName, isBiFast} = this.props;
    const isPayeeNumber = checkNumber(payeeName);
    const isPayeeNameDisabled = result(payeeForm, 'payeeNameDisabled', false);
    const payeeNameDisabled = isPayeeNumber ? false : isPayeeNameDisabled;
    const checkAcc = isEmpty(result(payeeForm, 'bank', {}));
    const bankNameText = result(payeeForm, 'bank.bankName', '');
    return (
      <View style={styles.outerContainer}>
        <View style={styles.topContainer}>
          <View style={styles.headerRow}>
            <SimasIcon name={'sendto'} size={30} style={styles.headerIcon}/>
            <Text style={styles.title}>{language.TRANSFER__NEW_TRANSFER}</Text>
          </View>

          {
            isBiFast ?
              <View style={styles.formContainer}>
                <Field
                  name='proxyAddress'
                  label='Proxy Number / Email Address'
                  placeholder='Proxy Number / Email Address'
                  disabled={true}
                  component={SinarmasInput}
                />
                <Field
                  name='bankName'
                  label={language.TRANSFER__BANK_BI_FAST}
                  placeholder={language.TRANSFER__BANK_BI_FAST}
                  disabled={true}
                  component={SinarmasInput}
                />
                <Field
                  name='accountNumberBiFast'
                  label={language.TRANSFER__PAYEE_ACCOUNT_NUMBER}
                  placeholder={language.HINTTEXT__PAYEE_ACCOUNT_NUMBER}
                  disabled={true}
                  component={SinarmasInput}
                  keyboardType='numeric'
                />
                <Field
                  name='payeeNameBiFast'
                  label={language.TRANSFER__NAME}
                  placeholder={language.HINTTEXT__PAYEE_NAME}
                  normalize={formatPayeeName(originalName)}
                  disabled={true}
                  component={SinarmasInput}
                />
              </View> 
              :
              <View style={styles.formContainer}>
                <Touchable onPress={onPayeeAccountPress}>
                  <Field
                    name='payeeAccNo'
                    label={language.TRANSFER__PAYEE_ACCOUNT_NUMBER}
                    placeholder={language.HINTTEXT__PAYEE_ACCOUNT_NUMBER}
                    disabled={true}
                    component={SinarmasInput}
                    keyboardType='numeric'
                  />
                </Touchable>

                <Touchable onPress={onBankNamePress}>
                  <View>
                    {
                      checkAcc ?
                        <View style={styles.bankContainer}>
                          <Text style={[styles.roboto, styles.black]}>{language.TRANSFER__BANK_OR_CODE}</Text>
                          <SimasIcon name='arrow' style={styles.arrowDownStyle} />
                        </View>
                        :
                        <View style={styles.bankContainer}>
                          <Text style={[styles.roboto, styles.black]}>{bankNameText}</Text>
                          <SimasIcon name='arrow' style={styles.arrowDownStyle} />
                        </View>
                    }
                    <View style={styles.greyLineLeft} />
                  </View>
                </Touchable>

                { isPayeeNumber ?
                  <Field
                    name='payeeName2'
                    label={language.TRANSFER__NAME}
                    placeholder={language.HINTTEXT__PAYEE_NAME}
                    disabled={payeeNameDisabled}
                    format={formatFieldName}
                    normalize={formatFieldName}
                    component={SinarmasInput}
                  />
                  :
                  <Field
                    name='payeeName'
                    label={language.TRANSFER__NAME}
                    placeholder={language.HINTTEXT__PAYEE_NAME}
                    disabled={payeeNameDisabled}
                    normalize={formatPayeeName(originalName)}
                    component={SinarmasInput}
                  />
                }
              </View>
          }
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.warningContainer}>
            <SimasIcon name={'caution-circle'} size={25} style={styles.warningIcon}/>
            <Text style={styles.warningText}>{language.HINTTEXT__PAYEE_NAME}</Text>
          </View>
          <View style={styles.buttonBottom}>
            <SinarmasButton dtActionName='Button Add Payee' disabled={invalid || submitting} onPress={wrapMethodInFunction(handleSubmit)} text={language.SERVICE__NEXT_BUTTON}/>
          </View>
        </View>
      </View>
    );
  }
}

export default AddPayee;
