import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './BuyReksadana.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import * as Utils from '../../utils/transformer.util';
import {SinarmasButton} from '../FormComponents';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SinarmasInputBox from '../FormComponents/SinarmasInputBox/SinarmasInputBox.component';
import Touchable from '../Touchable.component';
import moment from 'moment';

class Casa extends React.Component {
  static propTypes = {
    formValues: PropTypes.object,
    goToConfirmation: PropTypes.func,
    getSourceAcc: PropTypes.func,
    invalid: PropTypes.bool,
    disabled: PropTypes.bool,
    errors: PropTypes.array,
    submitting: PropTypes.bool,
    item: PropTypes.object,
    errorMsg: PropTypes.string,
    errValBalance: PropTypes.string,
    selectSourceAcc: PropTypes.func
  }

  render () {
    const {formValues, goToConfirmation, invalid, submitting, disabled, item, errorMsg, errors, selectSourceAcc} = this.props;
    const checkAcc = isEmpty(result(formValues, 'myAccount', {}));
    const sendAccountNumber = result(formValues, 'myAccount.accountNumber', '');
    const sendAccountName = result(formValues, 'myAccount.name', '');
    const sendAccountType = result(formValues, 'myAccount.accountType', '');
    const sendAccountAvailableBalance = result(formValues, 'myAccount.balances.availableBalance', '');
    const detailPortfolio = result(item, 'detailPortfolio', {});
    const NABDate = moment(result(detailPortfolio, 'portfolio.0.NAB_Date')).format('DD/MM/YYYY');
    const NABPerUnit = result(detailPortfolio, 'portfolio.0.NAB_Per_Unit', 0);
    const errorTextLess = result(errors, 'amountLess', '');
    const errorText = result(errors, 'amount', '');
    const errorMaxAmount = result(errors, 'amountMaxMedal', '');
    const isLessAmount = !isEmpty(errorText) || !isEmpty(errorTextLess) || !isEmpty(errorMaxAmount);
    const fundCurrency = result(detailPortfolio, 'portfolio.0.Fund_Currency', '');
    const isTypeCurrency = fundCurrency === 'IDR' ? 'Rp' : '$';

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraScrollHeight={100} enableOnAndroid={true}>
        <View>
          <View style={styles.amountContainer}>
            <View style={styles.headerRow}>
              {fundCurrency === 'IDR' ?
                <SimasIcon name={'amount'} size={30} style={styles.headerIcon} />
                :
                <View style={styles.circle}>
                  <Text style={styles.usdIcon}>USD</Text>
                </View>
              }
              <Text style={styles.title}>{language.TRANSFER__TRANSFER_SET_AMOUNT}</Text>
            </View>
            <View style={styles.textInputContainerPadding}>
              <View style={styles.textInputAmount}>
                {fundCurrency === 'IDR' ?
                  <Field
                    name='amount'
                    placeholder={language.HINTTEXT__TRANSFER_AMOUNT_PLACEHOLDER}
                    format={Utils.formatFieldAmount}
                    normalize={Utils.normalizeAmount}
                    keyboardType='numeric'
                    component={SinarmasInputBox}
                    iconName={'edit-amount'}
                    leftIcon='Rp'
                    textPosition='center'
                    maxLength={13}
                  />
                  :
                  <Field
                    name='amount'
                    placeholder={language.HINTTEXT__TRANSFER_AMOUNT_PLACEHOLDER}
                    format={Utils.formatFieldAmount}
                    normalize={Utils.normalizeAmount}
                    keyboardType='numeric'
                    component={SinarmasInputBox}
                    iconName={'edit-amount'}
                    leftIcon='$'
                    textPosition='center'
                    maxLength={13}
                  />
                }
                
              </View>
            </View>
            <View style={styles.unitContainer}>
              <Text style={styles.unitNAB}>NAB {NABDate}</Text>
              <Text style={styles.unitPrice}>1 unit = {NABPerUnit} {fundCurrency}</Text>
            </View>
          </View>
          <View style={styles.greyLine} />
          <View style={styles.selectAccountContainer}>
            <View style={styles.headerRow}>
              <SimasIcon name={'wallet'} size={30} style={styles.walletIcon} />
              <Text style={styles.title}>{language.GENERIC_BILLER__WALLET}</Text>
            </View>
            <Touchable onPress={selectSourceAcc}>
              <View style={styles.sendAccountDetailContainer}>
                {
                  checkAcc ?
                    <View>
                      <Text style={[styles.roboto, styles.black]}>{language.GENERIC_BILLER__WALLET}</Text>
                    </View>
                    :
                    <View>
                      <Text style={styles.sendAccNumber}>{sendAccountNumber}</Text>
                      <Text style={styles.sendAccNameType}>{sendAccountName}</Text>
                      <Text style={styles.sendAccNameType}>{sendAccountType}</Text>
                      <Text style={styles.availableBalanceText}>{language.SEND__AVAILABLE_BALANCE}: {isTypeCurrency} {Utils.currencyFormatter(sendAccountAvailableBalance)}</Text>
                    </View>
                }
                <SimasIcon name='more-menu' size={15} style={styles.black} />
              </View>
            </Touchable>
            { errorText !== '' && errorTextLess === '' || errorMsg !== '' ?
              <View style={styles.row}>
                <SimasIcon name='input-error' style={styles.errIcon}/>
                <Text style={styles.redText}>{errorMsg}</Text>
              </View>
              :
              errorTextLess !== '' ?
                <View style={styles.row}>
                  <SimasIcon name='input-error' style={styles.errIcon}/>
                  <Text style={styles.redText}>{errorTextLess}</Text>
                </View>
                :
                errorMaxAmount !== '' ?
                  <View style={styles.row}>
                    <SimasIcon name='input-error' style={styles.errIcon}/>
                    <Text style={styles.redText}>{errorMaxAmount}</Text>
                  </View>
                  :
                  null
            }
          </View>
          <View style={styles.greyLine} />            
        </View>
        <View style={styles.buttonBottom}>
          <SinarmasButton disabled={invalid || submitting || disabled || !isEmpty(errorMsg) || isLessAmount} onPress={goToConfirmation} text={language.SERVICE__NEXT_BUTTON} />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default Casa;
