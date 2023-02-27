import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image} from 'react-native';
import {language} from '../../config/language';
import styles from './AccountInfoItem.styles';
import {creditCardNumberFormat, formatForexAmount, balanceFormatter, dateFormatter, currencyFormatter, formatForexAmountMiniStatement, wrapMethodInFunction, copyToCLipboard} from '../../utils/transformer.util';
import {result, find, noop} from 'lodash';
import Touchable from '../Touchable.component';
import moment from 'moment';
import {getCreditCard} from '../../utils/middleware.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import isEmpty from 'lodash/isEmpty';
import chip from '../../assets/images/chip.png';

export default class AccountInfoItemDetails extends React.Component {
  static propTypes = {
    balances: PropTypes.object,
    accountType: PropTypes.string,
    itemTheme: PropTypes.object,
    accountInfo: PropTypes.object,
    setVisibility: PropTypes.func,
    accountVisible: PropTypes.bool,
    navigateToCcHistory: PropTypes.func,
    creditCardDetail: PropTypes.object,
    NamaProgram: PropTypes.string,
    getMmqDataDetail: PropTypes.func,
    typeOfLoan: PropTypes.string,
    navigateToConfirm: PropTypes.func,
    details: PropTypes.object,
    numberCVV: PropTypes.object,
    goToshowDormantModal: PropTypes.func,
  }

  render () {
    const {accountType, itemTheme, accountInfo, NamaProgram, setVisibility = noop, accountVisible = true, creditCardDetail, navigateToCcHistory, typeOfLoan, navigateToConfirm, numberCVV, goToshowDormantModal} = this.props;
    const balances = currencyFormatter(result(accountInfo, 'balances.availableBalance', ''));
    if (accountType === 'CreditCardAccount') {
      const {cardStatus} = accountInfo;
      const expDate = dateFormatter(moment(accountInfo.expiryDate, 'YYYYMM'), 'MM/YY');
      const selectedData = find(creditCardDetail, (detail) => result(detail, 'account.accountNumber', '') === result(accountInfo, 'accountNumber', ''));
      const creditCardRaw = result(selectedData, 'data', {});
      const selectedAccount = result(selectedData, 'account', {});
      const creditCardData = getCreditCard(creditCardRaw, selectedAccount);
      const cvv2Number = result(numberCVV, 'cvvNumber', '');
      const selectedAccountsCVV = result(numberCVV, 'selectedAccount.accountNumber', '');
      const isCVV = selectedAccountsCVV === selectedAccount.accountNumber;
      return (
        <View>
          { cardStatus === '1' ?
            <Image source={!isEmpty(numberCVV) && isCVV === true ? null : chip} style={styles.imagestyle} /> : null}
          <View style={{flexDirection: 'row'}}>
            <Text style={styles[`${itemTheme.styleType}AccountNumberValue`]}>{!isEmpty(numberCVV) && isCVV === true ? null : creditCardNumberFormat(accountInfo.accountNumber)}</Text>
            <Touchable onPress={wrapMethodInFunction(copyToCLipboard, accountInfo.accountNumber)} style={{paddingLeft: 5}}>
              {!isEmpty(numberCVV) && isCVV === true ?
                null :
                <SimasIcon style={styles[`${itemTheme.styleType}AccountNumberValue`]} name={'copy'} size={5} />}
            </Touchable>
          </View>
          { !isEmpty(numberCVV) && isCVV === true ?
            <View style={{flexDirection: 'row'}}>
              <View style={styles.cvvNumber2}>
                <Text style={styles.textWhite}>CVV</Text>
              </View>
              <View style={styles.cvvNumber}>
                <Text style={styles.textBlack}>{cvv2Number}</Text>
              </View>
            </View>
            :
            <View style={{flexDirection: 'row'}}>
              <View style={{paddingRight: 5}}>
                <Text style={styles[`${itemTheme.styleType}ExpiryTitle`]}>Expiry</Text>
                <Text style={styles[`${itemTheme.styleType}ExpiryTitle`]}>Date</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles[`${itemTheme.styleType}Expiry`]}>{expDate}</Text>
              </View>
            </View> }
          <View style={{flexDirection: 'row'}}>
            {!isEmpty(numberCVV) && isCVV === true ?
              null :
              <View style={{marginTop: 10}}>
                <Text style={styles[`${itemTheme.styleType}AccountName`]}>{accountInfo.name}</Text>
              </View>}

            {cardStatus === '2' || cardStatus === '0' || cardStatus === '3' || cardStatus === '5' ?
              <Touchable onPress={navigateToConfirm} style={cardStatus === '1' ? styles.arrowIconContainer2 : styles.arrowIconContainer}>
                <SimasIcon name={'arrow'} size={13} style={styles[`${itemTheme.styleType}ArrowIcon`]}/>
              </Touchable>
              :
              <Touchable onPress={navigateToCcHistory(creditCardData, selectedAccount)} style={cardStatus === '1' ? styles.arrowIconContainer2 : styles.arrowIconContainer}>
                <SimasIcon name={'arrow'} size={13} style={styles[`${itemTheme.styleType}ArrowIcon`]}/>
              </Touchable>
            }
          </View>
        </View>
      );
    }  else  if (accountType === 'VirtualCreditCardAccount') {
      const {numberCVV} = this.props;
      const {cardStatus, cardBase} = accountInfo;
      const expDate = dateFormatter(moment(accountInfo.expiryDate, 'YYYYMM'), 'MM/YY');
      const selectedData = find(creditCardDetail, (detail) => result(detail, 'account.accountNumber', '') === result(accountInfo, 'accountNumber', ''));
      const creditCardRaw = result(selectedData, 'data', {});
      const selectedAccount = result(selectedData, 'account', {});
      const creditCardData = getCreditCard(creditCardRaw, selectedAccount);
      const cvv2Number = result(numberCVV, 'cvvNumber', '');
      const selectedAccountsCVV = result(numberCVV, 'selectedAccount.accountNumber', '');
      const isCVV = selectedAccountsCVV === selectedAccount.accountNumber;
      const inactive = cardBase === 'virtualCreditCard' && cardStatus === '0';
      return (
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles[`${itemTheme.styleType}AccountNumberValue`]}>{!isEmpty(numberCVV) && isCVV === true ? null : creditCardNumberFormat(accountInfo.accountNumber)}</Text>
            <Touchable onPress={wrapMethodInFunction(copyToCLipboard, accountInfo.accountNumber)} style={{paddingLeft: 5}}>
              {!isEmpty(numberCVV) && isCVV === true ?
                null :
                <SimasIcon style={styles[`${itemTheme.styleType}AccountNumberValue`]} name={'copy'} size={5} />}
            </Touchable>
          </View>
          { !isEmpty(numberCVV) && isCVV === true ?
            <View style={styles.cvvNumber}>
              <Text style={styles.textBlack}>{cvv2Number}</Text>
            </View>
            :
            <View style={{flexDirection: 'row'}}>
              <View style={{paddingRight: 5}}>
                <Text style={styles[`${itemTheme.styleType}ExpiryTitle`]}>Expiry</Text>
                <Text style={styles[`${itemTheme.styleType}ExpiryTitle`]}>Date</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles[`${itemTheme.styleType}Expiry`]}>{expDate}</Text>
              </View>
            </View>
          }
          <View style={{flexDirection: 'row'}}>
            { !isEmpty(numberCVV) && isCVV === true ?
              null  :
              <View style={{marginTop: 20}}>
                <Text style={styles[`${itemTheme.styleType}AccountName`]}>{accountInfo.name}</Text>
              </View>}
            {
              inactive ?
                null
                : cardStatus === '2' || cardStatus === '0' || cardStatus === '3' || cardStatus === '5' ?
                  <Touchable onPress={navigateToConfirm} style={cardStatus === '1' ? styles.arrowIconContainer2 : styles.arrowIconContainer}>
                    <SimasIcon name={'arrow'} size={13} style={styles[`${itemTheme.styleType}ArrowIcon`]}/>
                  </Touchable>
                  :
                  <Touchable onPress={navigateToCcHistory(creditCardData, selectedAccount)} style={cardStatus === '1' ? styles.arrowIconContainer2 : styles.arrowIconContainer}>
                    <SimasIcon name={'arrow'} size={13} style={styles[`${itemTheme.styleType}ArrowIcon`]}/>
                  </Touchable>
            }
          </View>
        </View>


      );
    } else if (accountType === 'Rekening Dana Nasabah (RDN)') {
      const balancesDas = currencyFormatter(result(accountInfo, 'balances.availableBalance', ''));
      return (
        <View>
          <View style={styles.valueRow}>
            {
              accountVisible ?
                <Text style={styles[`${itemTheme.styleType}Value`]}>{accountInfo.currency} {formatForexAmount(balancesDas, accountInfo.currency)}</Text>
                :
                <Text style={styles.accountHiddenText}>{language.DASHBOARD__BALANCE_HIDDEN}</Text>
            }
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles[`${itemTheme.styleType}AccountNumberText`]}>{language.DASHBOARD__ACCOUNT_NUMBER}</Text>
            <Text style={styles[`${itemTheme.styleType}AccountNumberValue`]}>{accountInfo.accountNumber}</Text>
          </View>

        </View>
      );
    } else if (accountType === 'ListLoan') {
      const repayLoan = result(accountInfo, 'restRepay', 0) === null || result(accountInfo, 'restRepay', 0) === '' ? result(accountInfo, 'contractAmount', 0) : result(accountInfo, 'restRepay', 0);
      const status = result(accountInfo, 'loanStatus', '');
      const checkStatus = status === 'LOAN_SUCCESS' || status === 'SUCCESS_REPAY' || status === 'OVERDUE' ? '1' : '0';
      const repayDateString = checkStatus === '1' ? moment.unix(result(accountInfo, 'repayTime', '') / 1000).format('D MMM YYYY') : 'TBA';
      return (
        <View>
          {typeOfLoan === 'PGO' ?
            <View>
              <View style={styles.valueRow}>
                <Text style={styles.loanAmountGo}>Rp {balanceFormatter(repayLoan)}</Text>
              </View>
              <Text style={styles[`${itemTheme.styleType}Desc`]}>{language.PGO__DISPLAY_REPAYMENT}</Text>
              <Text style={styles[`${itemTheme.styleType}Value`]}>{repayDateString}</Text>
            </View>
            :
            <View>
              <View style={styles.valueRow}>
                {
                  accountVisible ?
                    <Text style={styles[`${itemTheme.styleType}ValueLarge`]}>Rp {balanceFormatter(accountInfo.end_balance)}</Text>
                    :
                    <Text style={styles.accountHiddenText}>{language.DASHBOARD__BALANCE_HIDDEN}</Text>
                }
                <Touchable onPress={setVisibility}  style={styles.visibilityPadding}>
                  <View>
                    <Text style={styles.visibility}>{accountVisible ? 'Hide' : 'Show'}</Text>
                  </View>
                </Touchable>
              </View>
              <Text style={styles[`${itemTheme.styleType}AccountNumberText`]}>{result(balances, 'accountNumber', '')}</Text>
              <Text style={styles[`${itemTheme.styleType}AccountNumberValue`]}>{result(accountInfo, 'rdnDetail', '')}</Text>
            </View>
          }
        </View>
      );
    } else if (NamaProgram === 'MudharabahMuqayyadah') {
      const expDate = dateFormatter(moment(accountInfo.TanggalJatuhTempo, 'YYYYMM'), 'MM/YY');
      return (
        <View>
          {typeOfLoan === 'PGO' ?
            <View>
              <View style={styles.valueRow}>
                <Text style={styles.loanAmountGo}>Rp {currencyFormatter(accountInfo.contractAmount)}</Text>
              </View>
              <Text style={styles[`${itemTheme.styleType}Desc`]}>{language.PGO__DISPLAY_REPAYMENT}</Text>
              <Text style={styles[`${itemTheme.styleType}Value`]}>{moment.unix(result(accountInfo, 'repayTime', '') / 1000).format('D MMM YYYY')}</Text>
              <Text style={styles[`${itemTheme.styleType}Desc`]}>{language.PGO__DISPLAY_REPAYMENT_ACCOUNT}</Text>
              <Text style={styles[`${itemTheme.styleType}Value`]}>{accountInfo.va}</Text>
            </View>
            :
            <View>
              <View style={styles.valueRow}>
                {
                  accountVisible ?
                    <Text style={styles[`${itemTheme.styleType}ValueLarge`]}>Rp {currencyFormatter(accountInfo.Nominal)}</Text>
                    :
                    <Text style={styles.accountHiddenText}>{language.DASHBOARD__BALANCE_HIDDEN}</Text>
                }
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{paddingRight: 5}}>
                  <Text style={styles[`${itemTheme.styleType}ExpiryTitle`]}>Due</Text>
                  <Text style={styles[`${itemTheme.styleType}ExpiryTitle`]}>Date</Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles[`${itemTheme.styleType}Expiry`]}>{expDate}</Text>
                </View>
              </View>
              <View style={{marginTop: 10}}>
                <Text style={styles[`${itemTheme.styleType}AccountName`]}>{accountInfo.NamaInvestor}</Text>
              </View>
            </View>
          }
        </View>
      );
    } else {
      const accountNumber = result(accountInfo, 'accountNumber', '');
      const balancesDas = currencyFormatter(result(accountInfo, 'balances.availableBalance', ''));
      const balancesValas = result(accountInfo, 'balances.availableBalance', '');
      const currency = result(accountInfo, 'currency', '');
      const accType = result(accountInfo, 'accountType', '');
      const accStatus = result(accountInfo, 'accountStatus');
      return (
        <View style={styles.card}>
          <View style={styles.valueRow}>
            {
              accountVisible ?
                <View>
                  { accType === 'CurrentAccount' || accType === 'TimeDepositAccount' ?
                    <Text style={styles[`${itemTheme.styleType}Value`]}>{currency} {currency === 'IDR' ? formatForexAmount(balancesDas, currency) : formatForexAmountMiniStatement(balancesValas, currency)}</Text>
                    : <Text style={styles[`${itemTheme.styleType}Value`]}>{currency} {formatForexAmountMiniStatement(balancesDas, currency)}</Text> }
                </View>
                :
                <Text style={styles.accountHiddenText}>{language.DASHBOARD__BALANCE_HIDDEN}</Text>
            }
          </View>
          {
            accType !== 'CurrentAccount' && accType !== 'SavingAccount' && accType !== 'SimasSavingPlanAccount' && accType !== 'savingAccount' ?
              <View style={styles.rowContainer}>
                <Text style={styles[`${itemTheme.styleType}AccountNumberText`]}>{language.DASHBOARD__ACCOUNT_NUMBER}</Text>
                <Text style={styles[`${itemTheme.styleType}AccountNumberValue`]}>{accountNumber}</Text>
                <View style={styles.containerCode}>
                  <Text style={styles.codeMerchant}>{itemTheme.merchant}</Text>
                </View>
              </View>
              : null
          }
          { accStatus === 'dormant' ?
            <Touchable onPress={goToshowDormantModal} style={styles.arrowIconContainer} /> : null
          }
        </View>
      );
    }
  }
}
