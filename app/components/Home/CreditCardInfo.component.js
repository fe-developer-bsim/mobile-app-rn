import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import {currencyFormatter} from '../../utils/transformer.util';
import {language} from '../../config/language';
import styles from './CreditCardInfo.styles';
import GetTransactionHistory from './GetTransactionHistory.component';
import Touchable from '../Touchable.component';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import SimasIcon from '../../assets/fonts/SimasIcon';
import noop from 'lodash/noop';
import BackgroundTimer from 'react-native-background-timer';
import cvv from '../../assets/images/cvv.png';
import managecc from '../../assets/images/managecc.png';
import instbg from '../../assets/images/instbg.png';
import amountcc from '../../assets/images/amountcc.png';
import statementcc from '../../assets/images/statementcc.png';
import paylatericon from '../../assets/images/paylatericon.png';


const totalSeconds = 15;

class CreditCardInfo extends React.Component {
  static propTypes = {
    creditCardDetail: PropTypes.object,
    settingCC: PropTypes.func,
    payCCBill: PropTypes.func,
    navigateToCcHistory: PropTypes.func,
    transactionsCC: PropTypes.array,
    accountList: PropTypes.array,
    triggerAuthNav: PropTypes.func,
    selectedAccount: PropTypes.object,
    showVCC: PropTypes.func,
    deleteReducer: PropTypes.func,
    numberCVV: PropTypes.object,
    CCtransDetail: PropTypes.func,
    accountInfo: PropTypes.object,
    lang: PropTypes.string,
    iPass: PropTypes.string,
    goToFilter: PropTypes.func,
    dispatch: PropTypes.func,
    navigateToConvert: PropTypes.func,
  }

  state = {
    secondsRemaining: totalSeconds,
  }

  tick = () => {
    const {deleteReducer, numberCVV} = this.props;
    if (!isEmpty(numberCVV)) {
      this.setState({secondsRemaining: this.state.secondsRemaining - 1});
      if (this.state.secondsRemaining <= 0) {
        BackgroundTimer.clearInterval(this.interval);
        deleteReducer();
      }
    }
  }


  componentWillUnmount = () => {
    const {selectedAccount = {}} = this.props;
    const {accountType} = selectedAccount;
    BackgroundTimer.clearInterval(this.interval);
    if (accountType !== 'CreditCardAccount') {
      BackgroundTimer.clearInterval(this.interval);
    }

  }

  goToshowVCC = () => {
    const {showVCC} = this.props;
    showVCC();
    this.interval = BackgroundTimer.setInterval(this.tick, 1000);
    this.setState({
      secondsRemaining: totalSeconds,
    });
  }



  render () {
    const {creditCardDetail, payCCBill, settingCC, navigateToCcHistory = noop, transactionsCC = [], accountList = [], selectedAccount = {}, numberCVV, CCtransDetail, accountInfo, goToFilter, navigateToConvert} = this.props;
    const {cardStatus} = selectedAccount;
    const isNegative = result(creditCardDetail, 'creditState', 'C') === 'D';
    const creditAvailable = parseInt(result(creditCardDetail, 'creditAvailable', '0').replace(/[^0-9.]+/g, ''));
    const creditAvailableShow = isNegative ? '-Rp ' + currencyFormatter(creditAvailable) : 'Rp ' + currencyFormatter(creditAvailable);
    const creditCard = parseInt(result(creditCardDetail, 'creditLimit', '0').replace(/[^0-9.]+/g, ''));
    const creditCardShow = 'Rp ' + currencyFormatter(creditCard);
    const creditLimit = parseInt(result(creditCardDetail, 'creditLimit', '0').replace(/[^0-9.]+/g, ''));
    const selectedAccountsCVV = result(numberCVV, 'selectedAccount.accountNumber', '');
    const isCVV = selectedAccountsCVV === selectedAccount.accountNumber;
    const cardStatusSementara = result(accountInfo, 'cardStatus', '');
    const cardBaseSementara = result(accountInfo, 'cardBase', '');
    const inactive = cardBaseSementara === 'virtualCreditCard' && cardStatusSementara === '0';
    // const billIcon = [{
    //   iconName: 'cc-bill-stroke', iconSize: 25, iconStyle: {color: '#FFFFFF'}},
    // {
    //   iconName: 'cc-bill-fill', iconSize: 25, iconStyle: {color: '#FFBCC1'}
    // }];
    if (isEmpty(creditCardDetail)) return null;
    else
      return (
        <View>
          { inactive || cardStatus === '1' || cardStatus === '4' ?
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginVertical: 20}}>
              <Touchable style={styles.manageCard} onPress={settingCC}>
                <Image source={managecc} style={styles.imagestyle1} />
                <Text style={styles.text1manage}>Manage Card</Text>
              </Touchable>
              <View style={styles.showCVV}>
                { !isEmpty(numberCVV) && isCVV ?
                  <Text style={styles.redCvvStyle}>{language.DASHBOARD__CREDIT_SHOW_TIME}{this.state.secondsRemaining}</Text>
                  :
                  <Touchable style={styles.cvvStyle} onPress={this.goToshowVCC}>
                    <Image source={cvv} style={styles.imagestyle2} />
                    <Text style={styles.redCvvStyle}>Show CVV</Text>
                  </Touchable>
                }
              </View>
            </View> : null}

          <View style={styles.bgcontainer}>
            <Image source={instbg} style={styles.imagestyleimg} />
            <Touchable onPress={navigateToConvert} style={styles.borderBottomRowNoLine}>
              <View style={{width: 35, height: 35, marginRight: 10, paddingTop: 10}}>
                <Image source={paylatericon} style={styles.imagestyleicon2}/>
              </View>
              <View>
                <Text style={styles.largeWhiteTextIns}>{language.DASHBOARD__CREDIT_CARD_PAYLATER_TITLE}</Text>
                <Text style={styles.whiteTextIns}>{language.DASHBOARD__CREDIT_CARD_PAYLATER_DESC}</Text>
              </View>
              <Text style={styles.valueBrand1}>
                <SimasIcon name={'arrow'} size={20} style={styles.arrowIconwhite}/>
              </Text>
            </Touchable>
          </View>

          <View style={styles.container}>
            <View style={styles.borderBottomRow2}>
              <View style={{width: 25, height: 25, marginRight: 10, paddingTop: 10}}>
                <Image source={amountcc} style={styles.imagestyleicon1}/>
              </View>
              <View>
                <Text style={styles.whiteText}>{creditAvailable > creditLimit ? language.DASHBOARD__CREDIT_CARD_CREDIT_BALANCE : language.DASHBOARD__CREDIT_CARD_OUTSTANDING_BALANCE}</Text>
                <Text style={styles.largeWhiteText}>Rp {result(creditCardDetail, 'outstandingBalance', 0)}</Text>
              </View>
              <Touchable onPress={payCCBill} style={styles.borderPay}>
                <View style={styles.borderPay2}>
                  <Text style={styles.boldWhiteText}>{language.TAB_TITLE__PAY}</Text>
                </View>
              </Touchable>
            </View>
          </View>

          <View style={styles.container}>
            <Touchable onPress={goToFilter} style={styles.borderBottomRow3}>
              <View style={{width: 25, height: 25, marginRight: 10}}>
                <Image source={statementcc} style={styles.imagestyleicon}/>
              </View>
              <Text style={styles.subTitle2}>{language.DASHBOARD__CREDIT_CARD_STATEMENT}</Text>
              <Text style={styles.valueBrand}>
                <SimasIcon name={'arrow'} size={20} style={styles.arrowIcon}/>
              </Text>
            </Touchable>


            <Text style={styles.title}>{language.DASHBOARD__CREDIT_CARD_INFORMATION_TITLE}</Text>

            <View style={styles.borderBottomRow}>
              <Text style={styles.subTitle}>{language.DASHBOARD__CREDIT_CARD_CREDIT_AVAILABLE}</Text>
              <Text style={isNegative ? styles.valueOrange : styles.value}>{creditAvailableShow}</Text>
            </View>
            <View style={styles.borderBottomRow}>
              <Text style={styles.subTitle}>{language.DASHBOARD__CREDIT_CARD_CREDIT_LIMIT}</Text>
              <Text style={styles.value}>{creditCardShow}</Text>
            </View>

            <Text style={styles.title}>{language.DASHBOARD__TRANSACTION_HISTORY}</Text>
            <View>{!isEmpty(transactionsCC) && <GetTransactionHistory transactions={transactionsCC} hideIcon={true} isCredit={true} CCtransDetail={CCtransDetail} />}</View>
            {accountList.length > 0 &&
            <Touchable onPress={navigateToCcHistory(creditCardDetail, selectedAccount)} style={styles.rowNoBorder}>
              <Text style={styles.viewMore}>{language.DASHBOARD__VIEW_ALL}</Text>
              <SimasIcon name={'arrow'} size={13} style={styles.arrowIcon}/>
            </Touchable>
            }
          </View>

        </View>
      );
  }
}

export default CreditCardInfo;
