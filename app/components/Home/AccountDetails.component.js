import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import noop from 'lodash/noop';
import isEmpty from 'lodash/isEmpty';
import {language} from '../../config/language';
import Touchable from '../Touchable.component';
import {getCreditCard, getMiniStatementCreditCardNew, getTimeDeposit} from '../../utils/middleware.util';
import result from 'lodash/result';
import {theme} from '../../styles/core.styles';
import styles from './Tabs.styles';
import TimeDepositInfo from './TimeDepositInfo.component';
import CreditCardInfo from './CreditCardInfo.component';
import LoanDetails from './GetLoanDetails.component';
import MmqDetails from './MmqDetails.component';
import find from 'lodash/find';
import SimasIcon from '../../assets/fonts/SimasIcon';
import forEach from 'lodash/forEach';
import BackgroundTimer from 'react-native-background-timer';
import cvv from '../../assets/images/cvv.png';
import managecc from '../../assets/images/managecc.png';
import trxHistory from '../../assets/images/trxHistory.png';


const totalSeconds = 15;

// This Component returns redux-field specifying which component to use: easypin or smsOTP
export default class AccountDetails extends React.Component {
  static propTypes = {
    showLoader: PropTypes.bool,
    loadingError: PropTypes.bool,
    onReloadPress: PropTypes.func,
    showReload: PropTypes.bool,
    transactions: PropTypes.array,
    index: PropTypes.number,
    getTimeDeposit: PropTypes.func,
    timeDepositDetail: PropTypes.array,
    isConnected: PropTypes.bool,
    transRefNum: PropTypes.string,
    userId: PropTypes.number,
    resendOTP: PropTypes.func,
    config: PropTypes.array,
    triggerAuth: PropTypes.func,
    handleSubmit: PropTypes.func,
    accountNumber: PropTypes.string,
    userMobileNumber: PropTypes.string,
    transactionsCC: PropTypes.array,
    creditCardDetail: PropTypes.array,
    payCCBill: PropTypes.func,
    navigateToCcHistory: PropTypes.func,
    navigateToConfirm: PropTypes.func,
    accountList: PropTypes.array,
    settingCC: PropTypes.func,
    activeTab: PropTypes.string,
    navigateToTransactions: PropTypes.func,
    accountInfo: PropTypes.object,
    serverTime: PropTypes.string,
    triggerAuthNav: PropTypes.func,
    getMmqDataDetail: PropTypes.func,
    fetchTransactionsHistory: PropTypes.func,
    goToSimasTaraDetail: PropTypes.func,
    sendMail: PropTypes.func,
    dataList: PropTypes.array,
    showVCC: PropTypes.func,
    deleteReducer: PropTypes.func,
    numberCVV: PropTypes.object,
    CCtransDetail: PropTypes.func,
    lang: PropTypes.string,
    iPass: PropTypes.string,
    goToFilter: PropTypes.func,
    dispatch: PropTypes.func,
    navigateToTransactionsFilter: PropTypes.func,
    loanDataNew: PropTypes.array,
    navigateToConvert: PropTypes.func,
  }

  state = {
    refresh: false,
    secondsRemaining: totalSeconds,
  }


  goToshowVCC = () => {
    const {showVCC} = this.props;
    showVCC();
    this.interval = BackgroundTimer.setInterval(this.tick, 1000);
    this.setState({
      secondsRemaining: totalSeconds,
    });
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


  componentWillReceiveProps (props) {
    if (this.props !== props) {
      this.setState({refresh: !this.state.refresh});
    }
  }


  showHistory = () => { // for current, savings, and rdn/investment
    const {navigateToTransactionsFilter = noop,  accountInfo = {}} = this.props;
    return (
      <View style={styles.transactionsContainerHistory}>
        <View style={styles.greyLineHeader} />
        <Touchable style={[styles.menu, styles.rowCenter]} onPress={navigateToTransactionsFilter(accountInfo)}>
          <View style={styles.rowCenter}>
            <View style={styles.width}>
              <Image source={trxHistory} style={styles.pictureIcon2}/>
            </View>
            <View>
              <Text style={[styles.menuTitle, styles.roboto]}>{language.DASHBOARD__TRANSACTION_HEADER_HISTORY}</Text>
            </View>
          </View>
          <View style={styles.rowCenter}>
            <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
          </View>
        </Touchable>
        <View style={styles.greyLine} />
      </View>
    );
  }

  showTD = () => { // for timed deposit
    const {showLoader, loadingError, onReloadPress, showReload, timeDepositDetail = [], isConnected,
      transRefNum, userId, resendOTP, config, triggerAuth, handleSubmit, accountNumber, userMobileNumber, index, triggerAuthNav, accountInfo} = this.props;
    const selected = find(timeDepositDetail, (o) => o.carouselIndex === index);
    const timeDepositData = getTimeDeposit(result(selected, 'data', {}));
    return (showLoader && !timeDepositData.maturityType ?
      <View style={styles.transactionsContainer}><ActivityIndicator color={theme.primary} size={theme.spinnerSizeLarge}/></View> :
      loadingError ?
        <View style={styles.transactionsContainer}>
          {showReload && <Touchable onPress={onReloadPress}><Text style={styles.reload}>{'\n'}{language.DASHBOARD__SHOW_TD_DETAIL}</Text></Touchable>}
        </View> :
        !isEmpty(timeDepositDetail) &&
        <View>
          <TimeDepositInfo timeDepositDetail={timeDepositData} isConnected={isConnected}
            transRefNum={transRefNum} userId={userId} resendOTP={resendOTP} config={config}
            triggerAuth={triggerAuth} handleSubmit={handleSubmit}
            accountNumber={accountNumber} userMobileNumber={userMobileNumber} triggerAuthNav={triggerAuthNav} accountInfo={accountInfo}
          />
        </View>
    );
  }

  showCC = () => { // for credit card
    const {
      showLoader, loadingError, onReloadPress, transactionsCC = [], creditCardDetail = [], accountInfo,
      showReload, payCCBill, navigateToCcHistory, accountList, settingCC, index, showVCC, navigateToConfirm, deleteReducer, numberCVV, CCtransDetail, lang, iPass, goToFilter, dispatch, navigateToConvert} = this.props;
    const selectedData = find(creditCardDetail, (detail) => result(detail, 'account.accountNumber', '') === result(accountInfo, 'accountNumber', ''));
    const creditCardRaw = result(selectedData, 'data', {});
    const selectedAccount = result(selectedData, 'account', {});
    const creditCardData = getCreditCard(creditCardRaw, selectedAccount);
    const transactionsCCData = getMiniStatementCreditCardNew(result(transactionsCC[`${index}`], 'data', {})).slice(0, 4);
    const {cardStatus} = selectedAccount;
    const cardStatusSementara = result(accountInfo, 'cardStatus', '');
    const cardBaseSementara = result(accountInfo, 'cardBase', '');
    const selectedAccountsCVV = result(numberCVV, 'selectedAccount.accountNumber', '');
    const isCVV = selectedAccountsCVV === selectedAccount.accountNumber;
    const inactive = cardBaseSementara === 'virtualCreditCard' && cardStatusSementara === '0';

    return (showLoader && !creditCardData.accountNumber ?
      <View style={styles.transactionsContainer}><ActivityIndicator color={theme.primary} size={theme.spinnerSizeLarge}/></View> :
      loadingError ?
        <View style={styles.transactionsContainer}>
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
          {showReload && <Touchable onPress={onReloadPress}><Text style={styles.reload}>{'\n'}{language.DASHBOARD__SHOW_TD_DETAIL}</Text></Touchable>}
        </View> :
        <View>
          {
            !isEmpty(creditCardData) &&
              <CreditCardInfo
                transactionsCC={transactionsCCData}
                payCCBill={payCCBill}
                navigateToCcHistory={navigateToCcHistory}
                accountList={accountList}
                creditCardDetail={creditCardData}
                settingCC={settingCC}
                selectedAccount={selectedAccount}
                showVCC={showVCC}
                navigateToConfirm={navigateToConfirm}
                deleteReducer={deleteReducer}
                numberCVV={numberCVV}
                CCtransDetail={CCtransDetail}
                accountInfo={accountInfo}
                lang={lang}
                iPass={iPass}
                goToFilter={goToFilter}
                dispatch={dispatch}
                navigateToConvert={navigateToConvert}
              />
          }</View>);
  }

  showLoanDetails = () => {
    const {accountInfo, serverTime, loanDataNew} = this.props;
    const accType = result(accountInfo, 'accountType', '');
    const productCode = result(accountInfo, 'productCode', '');

    return (accType === 'loanType' ?
      !isEmpty(loanDataNew) ?
        <LoanDetails accountInfo={accountInfo} serverTime={serverTime} loanDataNew={loanDataNew}/> :
        <Touchable><Text style={styles.reload}>{'\n'}{language.DASHBOARD__TRANSACTION_HEADER}</Text></Touchable>
      :
      productCode === 'LOAN' ?
        null :
        <LoanDetails accountInfo={accountInfo} serverTime={serverTime}/>
    );
  }

  showMMQ = () => {
    const {accountInfo, getMmqDataDetail} = this.props;
    return (
      <View>
        {
          isEmpty(accountInfo) ?
            null
            :
            <MmqDetails accountInfo={accountInfo} getMmqDataDetail={getMmqDataDetail}/>
        }
      </View>
    );
  }

  render () {
    const {activeTab = '', accountInfo = {}, dataList} = this.props;
    let currentTab = '';
    forEach(dataList, (value) => {
      currentTab = result(value, 'typeOpening', '');
    });
    if (activeTab === 'currentAccount' || activeTab === 'savingAccount') {
      return (
        <View style={styles.detailContainer}>
          {currentTab === 'openingSA' || currentTab === 'openingCC' ?
            null :
            <View>
              {this.showHistory()}
            </View>
          }
        </View>
      );
    } else if (activeTab === 'timeDepositAccount') {
      return (
        <View style={styles.detailContainer}>
          <Text style={styles.title}>{language.DASHBOARD__TIME_DEPOSIT_INFORMATION}</Text>
          {this.showTD()}
        </View>
      );
    } else if (activeTab === 'creditCardAccount') {
      return (
        <View style={styles.detailContainerCc}>
          {this.showCC()}
        </View>
      );
    } else if (activeTab === 'rdn') {
      const {accountType} = accountInfo;
      return (
        <View>
          { isEmpty(accountType) ?
            <View style={styles.detailContainerCc}>
              {this.showMMQ()}
            </View>
            :
            <View style={styles.detailContainer}>
              {this.showHistory()}
            </View>
          }
        </View>
      );
    } else if (activeTab === 'loan') {
      return (
        <View style={styles.detailContainer}>
          {this.showLoanDetails()}
        </View>
      );
    } else {
      return (
        <View/>
      );
    }
  }
}
