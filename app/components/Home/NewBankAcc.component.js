import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, RefreshControl, View, ImageBackground, Text} from 'react-native';
import {ScrollableTabView, ScrollableTabBar} from '@valdio/react-native-scrollable-tabview';
import {language} from '../../config/language';
import TabCasa from './TabCasa.component';
import TabDeposit from './TabDeposit.component';
import TabCreditCard from './TabCreditCard.component';
import TabInvestment from './TabInvestment.component';
import TabLoan from './TabLoan.component';
import styles from './Dashboard.styles';
import {theme} from '../../styles/core.styles';
import noop from 'lodash/noop';
import result from 'lodash/result';
import startsWith from 'lodash/startsWith';
import {wrapObjectInFunction, getOffersPGOLoan} from '../../utils/transformer.util';
import LuckyImage from '../../assets/images/IconBoxLuckyDip.png';
import moment from 'moment';
import CountDown from 'react-native-countdown-component';
import Touchable from '../Touchable.component';
import Summary from './Summary.component';
import isEmpty from 'lodash/isEmpty';

const tabBarConfig = {
  tabBarBackgroundColor: theme.white,
  tabBarActiveTextColor: theme.darkBlue,
  tabBarInactiveTextColor: theme.blue,
  tabBarUnderlineStyle: {
    backgroundColor: theme.brand,
    borderRadius: 5
  },
  tabBarTextStyle: styles.tabText
};

class NewBankAcc extends React.Component {
  static propTypes = {
    tabAccounts: PropTypes.object.isRequired,
    navigateToTransactions: PropTypes.func,
    onSnapToItem: PropTypes.func,
    onSnapToTimeDepositItem: PropTypes.func,
    onSnapToCreditCardItem: PropTypes.func,
    setCarouselReferenceFor: PropTypes.func,
    onReloadPress: PropTypes.func,
    fetchTransactionsHistory: PropTypes.func,
    onNewTD: PropTypes.func,
    payCCBill: PropTypes.func,
    settingCC: PropTypes.func,
    onChangeTab: PropTypes.func,
    onDashboardRefresh: PropTypes.func,
    linkCreditCard: PropTypes.func,
    transactions: PropTypes.array,
    timeDepositDetail: PropTypes.object,
    creditCardDetail: PropTypes.object,
    loadingError: PropTypes.bool,
    showReload: PropTypes.bool,
    showLoader: PropTypes.bool,
    userName: PropTypes.string,
    initialTab: PropTypes.number,
    isConnected: PropTypes.bool,
    dashboardRefreshing: PropTypes.bool,
    transactionsCC: PropTypes.array,
    navigateToCcHistory: PropTypes.func,
    activeTab: PropTypes.string,
    tdPromoLink: PropTypes.string,
    transRefNum: PropTypes.string,
    userId: PropTypes.number,
    resendOTP: PropTypes.func,
    config: PropTypes.array,
    triggerAuth: PropTypes.func,
    handleSubmit: PropTypes.func,
    accountNumber: PropTypes.string,
    userMobileNumber: PropTypes.string,
    investmentData: PropTypes.func,
    investmentAccounts: PropTypes.object,
    investmentDataView: PropTypes.func,
    investmentDataViewSIL: PropTypes.func,
    cachedTransactions: PropTypes.object,
    setVisibility: PropTypes.func,
    accountVisibility: PropTypes.object,
    loanAccounts: PropTypes.array,
    serverTime: PropTypes.string,
    cifString: PropTypes.string,
    getBalanceEmoney: PropTypes.func,
    emoney: PropTypes.object,
    accounts: PropTypes.array,
    showUpgradeEmoney: PropTypes.func,
    cardLessWithdrawal: PropTypes.func,
    goToTopUp: PropTypes.func,
    taptoEmoney: PropTypes.func,
    goToEmoneyHistoryNavigate: PropTypes.func,
    simasPoin: PropTypes.object,
    inquirySimasPoin: PropTypes.func,
    SimasPoinHistory: PropTypes.func,
    triggerAuthNav: PropTypes.func,
    arrowNavigateToCcHistory: PropTypes.func,
    cachedTransactionsDeposit: PropTypes.array,
    inquiryLuckyDipCoupon: PropTypes.func,
    luckyDipCounter: PropTypes.string,
    setDefaultAccount: PropTypes.func,
    showDefaultAccountInfo: PropTypes.func,
    showDormantInfo: PropTypes.func,
    defaultAccount: PropTypes.object,
    investmentView: PropTypes.func,
    getMmq: PropTypes.object,
    mmqDetail: PropTypes.object,
    getMmqDataDetail: PropTypes.func,
    goToLoan: PropTypes.func,
    goToSummaryLoan: PropTypes.func,
    privateOffers: PropTypes.array,
    nav: PropTypes.object,
    openSaving: PropTypes.func,
    upgradeKyc: PropTypes.func,
    goToSavingAccount: PropTypes.func,
    goToCreditCard: PropTypes.func,
    checkEULAandNavigate: PropTypes.func,
    loanMenuEnabledNTB: PropTypes.string,
    setDefaultAccEmoney: PropTypes.func,
    emoneyQRpermissions: PropTypes.func,
    isLuckyDipActive: PropTypes.string,
    loadBalances: PropTypes.func,
    currentCarouselIndex: PropTypes.number,
    historyIndex: PropTypes.number,
    sendMail: PropTypes.func,
    goToSimasTaraDetail: PropTypes.func,
    investmentDataViewStarInvestama: PropTypes.func,
    CCtransDetail: PropTypes.func,
    openingSA: PropTypes.array,
    openingCC: PropTypes.array,
    approveAplication: PropTypes.func,
    navigateToTransactionsFilter: PropTypes.func,
    goToCloseSimasTara: PropTypes.func,
    isUsingDigisign: PropTypes.bool,
    goBack: PropTypes.func,
    showVCC: PropTypes.func,
    navigateToConfirm: PropTypes.func,
    accountsCC: PropTypes.array,
    numberCVV: PropTypes.object,
    deleteReducer: PropTypes.func,
    lang: PropTypes.string,
    iPass: PropTypes.string,
    goToFilter: PropTypes.func,
    dispatch: PropTypes.func,
    loanMenuEnabledETB: PropTypes.string,
    loanDataNew: PropTypes.array,
    goToshowDormantModal: PropTypes.func,
    navigateToConvert: PropTypes.func,
  }

  openSaving = () => {
    const {nav, openSaving} = this.props;
    openSaving(nav);
  }

  state={
    isEnabled: 'yes',
    timeoutCountdown: false
  }

  onFinishTime=() => {
    this.setState({timeoutCountdown: !this.state.timeoutCountdown});
  }
  renderTabBar = wrapObjectInFunction(<ScrollableTabBar style={styles.scrollStyle} tabStyle={styles.tabStyle}/>)

  render () {
    const {
      tabAccounts, navigateToTransactions, transactions, timeDepositDetail, creditCardDetail, onSnapToItem, historyIndex,
      onSnapToTimeDepositItem, onSnapToCreditCardItem, onChangeTab, loadingError, setCarouselReferenceFor = noop,
      showReload, onReloadPress = noop, fetchTransactionsHistory = noop, showLoader, onNewTD, initialTab, isConnected, cachedTransactions = [],
      dashboardRefreshing = false, onDashboardRefresh = noop, linkCreditCard = noop, transactionsCC, payCCBill, settingCC, CCtransDetail, activeTab = '', navigateToCcHistory, tdPromoLink = null,
      transRefNum, userId, resendOTP, config, triggerAuth, handleSubmit = noop, accountNumber, userMobileNumber, investmentData, investmentAccounts, investmentDataView, investmentDataViewSIL,
      setVisibility = noop, accountVisibility, loanAccounts, serverTime, triggerAuthNav, currentCarouselIndex, navigateToTransactionsFilter,
      arrowNavigateToCcHistory, cachedTransactionsDeposit, investmentView, getMmq, mmqDetail, getMmqDataDetail, goToLoan, goToSummaryLoan, privateOffers, cifString, inquiryLuckyDipCoupon, luckyDipCounter, goToSavingAccount, goToCreditCard, loanMenuEnabledNTB,
      defaultAccount, showDefaultAccountInfo, setDefaultAccount, showDormantInfo, isLuckyDipActive, loadBalances, sendMail, userName, simasPoin, inquirySimasPoin, SimasPoinHistory, goToSimasTaraDetail, investmentDataViewStarInvestama, approveAplication, openingSA, openingCC,
      isUsingDigisign, goBack, goToCloseSimasTara, showVCC, numberCVV, deleteReducer, navigateToConfirm, lang, iPass, goToFilter, dispatch, loanMenuEnabledETB, loanDataNew, goToshowDormantModal, navigateToConvert
    } = this.props;
    const commonTabProps = {navigateToTransactions, loadingError, showLoader, setCarouselReferenceFor, showReload, onReloadPress, linkCreditCard, fetchTransactionsHistory};
    const forTimeDepositProps = {transRefNum, userId, resendOTP, config, triggerAuth, timeDepositDetail, handleSubmit,
      accountNumber, userMobileNumber, triggerAuthNav};
    const savings = isEmpty(openingSA) ? result(tabAccounts, 'savingAccount', []) : [...result(tabAccounts, 'savingAccount', []), ...openingSA];
    const creditCardAcc = isEmpty(openingCC) ? result(tabAccounts, 'creditCardAccount', []) : [...result(tabAccounts, 'creditCardAccount', []), ...openingCC];
    const nowDate = moment(serverTime).format('YYYY/MM/DD H:mm');
    const rawnextDate = moment(serverTime).format('YYYY/MM/DD');
    const nextDate = rawnextDate + ' ' + '23:59';
    const diff = moment(nextDate).diff(moment(nowDate));
    const gapTime = Math.round(moment.duration(diff).asSeconds());
    const isVerified = !startsWith(cifString, 'NK');
    const loanMenuNTB = loanMenuEnabledNTB === 'ACTIVE';
    const loanMenuETB = getOffersPGOLoan(privateOffers);
    const showLoanMenu = isVerified ? loanMenuETB : loanMenuNTB;
    const flagLuckyDip = isLuckyDipActive === 'active' || isLuckyDipActive === 'ACTIVE' ? '1' : '0';
    const bankAccount = '' + language.NEW_BANK_ACC_ACCOUNT;
    return (
      <ScrollView keyboardShouldPersistTaps='handled' style={styles.container}
        refreshControl={<RefreshControl refreshing={dashboardRefreshing} onRefresh={onDashboardRefresh}
          tintColor={theme.brand} colors={[theme.brand]} enabled/>}>
        <View style={styles.header}>
          <Summary accounts={tabAccounts} userName={userName} simasPoin={simasPoin} inquirySimasPoin={inquirySimasPoin}
            SimasPoinHistory={SimasPoinHistory} loadBalances={loadBalances} goBack={goBack}/>
        </View>
        {
          isVerified ?
            <ScrollableTabView {...tabBarConfig} locked={true} renderTabBar={this.renderTabBar} onChangeTab={onChangeTab} initialPage={initialTab}>
              <TabCasa setCarouselReference={setCarouselReferenceFor('savingAccount')} tabLabel={bankAccount}
                accountList={savings} {...commonTabProps} onSnapToItem={onSnapToItem} transactions={transactions}  fetchTransactionsHistory={fetchTransactionsHistory}
                cachedTransactions={cachedTransactions} activeTab={activeTab} setVisibility={setVisibility}
                accountVisibility={accountVisibility} openSaving={this.openSaving} cif={cifString}
                goToSavingAccount={goToSavingAccount}  setDefaultAccount={setDefaultAccount}
                defaultAccount={defaultAccount} showDefaultAccountInfo={showDefaultAccountInfo} showDormantInfo={showDormantInfo}
                loadBalances={loadBalances} currentCarouselIndex={currentCarouselIndex} historyIndex={historyIndex} sendMail={sendMail} goToSimasTaraDetail={goToSimasTaraDetail}
                approveAplication={approveAplication} isUsingDigisign={isUsingDigisign} goToCloseSimasTara={goToCloseSimasTara} navigateToTransactionsFilter={navigateToTransactionsFilter} goToshowDormantModal={goToshowDormantModal}/>
              <TabDeposit onNewTD={onNewTD} setCarouselReference={setCarouselReferenceFor('timeDepositAccount')}
                tabLabel={language.NEW_BANK_ACC_TD} accountList={tabAccounts.timeDepositAccount} tdPromoLink={tdPromoLink}
                {...commonTabProps} onSnapToItem={onSnapToTimeDepositItem} isConnected={isConnected}
                {...forTimeDepositProps} cachedTransactions={cachedTransactions} activeTab={activeTab}
                setVisibility={setVisibility} accountVisibility={accountVisibility} historyIndex={historyIndex}
                cachedTransactionsDeposit={cachedTransactionsDeposit} loadBalances={loadBalances} />
              <TabCreditCard setCarouselReference={setCarouselReferenceFor('creditCardAccount')}
                tabLabel={language.NEW_BANK_ACC_CC} accountList={creditCardAcc}
                onSnapToCreditCardItem={onSnapToCreditCardItem} creditCardDetail={creditCardDetail}
                payCCBill={payCCBill} settingCC={settingCC} CCtransDetail={CCtransDetail} navigateToCcHistory={navigateToCcHistory}
                activeTab={activeTab} transactionsCC={transactionsCC} {...commonTabProps} historyIndex={historyIndex}
                cachedTransactions={cachedTransactions} arrowNavigateToCcHistory={arrowNavigateToCcHistory} navigateToConfirm={navigateToConfirm}
                goToCreditCard={goToCreditCard} cif={cifString} loadBalances={loadBalances} approveAplication={approveAplication} goToCloseSimasTara={goToCloseSimasTara}
                showVCC={showVCC} numberCVV={numberCVV}
                deleteReducer={deleteReducer} lang={lang} iPass={iPass} goToFilter={goToFilter} dispatch={dispatch} navigateToConvert={navigateToConvert} accountVisibility={accountVisibility}/>
              <TabLoan setCarouselReference={setCarouselReferenceFor('loan')} tabLabel={language.NEW_BANK_ACC_LOAN}
                accountList={loanAccounts} setCarouselReferenceFor={setCarouselReferenceFor} onSnapToItem={onSnapToItem}
                activeTab={activeTab} setVisibility={setVisibility} accountVisibility={accountVisibility} onReloadPress={onReloadPress}
                showLoader={showLoader} loadingError={loadingError} serverTime={serverTime} goToLoan={goToLoan} historyIndex={historyIndex}
                goToSummaryLoan={goToSummaryLoan} privateOffers={privateOffers} loanMenuEnabledNTB={loanMenuEnabledNTB} loadBalances={loadBalances}
                approveAplication={approveAplication} loanMenuEnabledETB={loanMenuEnabledETB} loanDataNew={loanDataNew} lang={lang}/>
              <TabCasa setCarouselReference={setCarouselReferenceFor('rdn')} tabLabel={language.NEW_BANK_ACC_INVESMENTS}
                accountList={tabAccounts.rdn} {...commonTabProps} onSnapToItem={onSnapToItem} transactions={transactions} navigateToTransactionsFilter={navigateToTransactionsFilter}
                cachedTransactions={cachedTransactions} activeTab={activeTab} setVisibility={setVisibility} historyIndex={historyIndex}
                accountVisibility={accountVisibility} getMmq={getMmq} mmqDetail={mmqDetail} getMmqDataDetail={getMmqDataDetail} loadBalances={loadBalances} sendMail={sendMail} goToshowDormantModal={goToshowDormantModal}  />
              <TabInvestment setCarouselReference={setCarouselReferenceFor('investmentProduct')} investmentData={investmentData}
                tabLabel={language.NEW_BANK_ACC_OTHER} investmentAccounts={investmentAccounts} investmentDataView={investmentDataView}
                investmentDataViewSIL={investmentDataViewSIL} investmentView={investmentView} loadBalances={loadBalances} investmentDataViewStarInvestama={investmentDataViewStarInvestama}/>
            </ScrollableTabView>
            :
            <ScrollableTabView {...tabBarConfig} locked={true} renderTabBar={this.renderTabBar} onChangeTab={onChangeTab} initialPage={initialTab}>
              <TabCasa setCarouselReference={setCarouselReferenceFor('savingAccount')} tabLabel={language.NEW_BANK_ACC_ACCOUNT}
                accountList={savings} {...commonTabProps} onSnapToItem={onSnapToItem} transactions={transactions}
                cachedTransactions={cachedTransactions} activeTab={activeTab} setVisibility={setVisibility}
                accountVisibility={accountVisibility} openSaving={this.openSaving} cif={cifString}
                goToSavingAccount={goToSavingAccount} historyIndex={historyIndex} sendMail={sendMail} approveAplication={approveAplication} isUsingDigisign={isUsingDigisign}
                goToCloseSimasTara={goToCloseSimasTara} goToshowDormantModal={goToshowDormantModal}/>
              <TabCreditCard setCarouselReference={setCarouselReferenceFor('creditCardAccount')}
                tabLabel={language.NEW_BANK_ACC_CC} accountList={creditCardAcc}
                onSnapToCreditCardItem={onSnapToCreditCardItem} creditCardDetail={creditCardDetail}
                payCCBill={payCCBill} settingCC={settingCC} navigateToCcHistory={navigateToCcHistory}
                activeTab={activeTab} transactionsCC={transactionsCC} {...commonTabProps}
                cachedTransactions={cachedTransactions} arrowNavigateToCcHistory={arrowNavigateToCcHistory} navigateToConfirm={navigateToConfirm}
                cif={cifString} goToCreditCard={goToCreditCard} historyIndex={historyIndex} approveAplication={approveAplication} goToCloseSimasTara={goToCloseSimasTara}
                showVCC={showVCC}
                numberCVV={numberCVV} deleteReducer={deleteReducer} lang={lang} iPass={iPass} goToFilter={goToFilter} dispatch={dispatch} navigateToConvert={navigateToConvert} accountVisibility={accountVisibility}/>
              {showLoanMenu ?
                <TabLoan setCarouselReference={setCarouselReferenceFor('loan')} tabLabel={language.NEW_BANK_ACC_LOAN}
                  accountList={loanAccounts} setCarouselReferenceFor={setCarouselReferenceFor} onSnapToItem={onSnapToItem}
                  activeTab={activeTab} setVisibility={setVisibility} accountVisibility={accountVisibility} onReloadPress={onReloadPress}
                  showLoader={showLoader} loadingError={loadingError} serverTime={serverTime} cif={cifString} goToLoan={goToLoan}
                  goToSummaryLoan={goToSummaryLoan} loanMenuEnabledNTB={loanMenuEnabledNTB} historyIndex={historyIndex}
                  approveAplication={approveAplication} loanMenuEnabledETB={loanMenuEnabledETB} loanDataNew={loanDataNew} lang={lang}/>
                : null
              }

            </ScrollableTabView>
        }
        {luckyDipCounter === '' || luckyDipCounter === '0'  || luckyDipCounter === undefined || flagLuckyDip === '0' || this.state.timeoutCountdown ?
          null :
          <View style={styles.floatLuckydip}>
            <Touchable onPress={inquiryLuckyDipCoupon}>
              <ImageBackground source={LuckyImage} style={styles.imageLucky}>
                <View style={styles.shadowRow}>
                  <View/>
                  <View style={styles.redRound}>
                    <Text style={styles.counterTextLuckyDip}>{luckyDipCounter}</Text>
                  </View>
                </View>
                <View style={styles.countdown}>
                  <CountDown
                    until={gapTime}
                    size={8}
                    digitStyle={{backgroundColor: 'transparent', borderRadius: 100}}
                    digitTxtStyle={{color: 'white', fontSize: 10, fontFamily: 'roboto'}}
                    timeToShow={['H', 'M', 'S']}
                    timeLabels={{}}
                    separatorStyle={{fontSize: 10, color: 'white', fontFamily: 'roboto'}}
                    showSeparator
                    style={styles.clockBox}
                    onFinish={this.onFinishTime}
                  />
                </View>
              </ImageBackground>
            </Touchable>
          </View>}
      </ScrollView>
    );
  }
}

export default NewBankAcc;
