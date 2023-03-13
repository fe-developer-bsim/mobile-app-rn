import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NewBankAccComponent from '../../components/Home/NewBankAcc.component';
import {
  getMiniStatement,
  getTimeDeposit,
  getCreditCard,
  getLoanList,
  creditCardStatement,
} from '../../utils/api.util';
import {
  getMiniStatement as processMiniStatementResponse,
  getCacheMiniStatement as processCacheMiniStatementResponse,
  getTimeDeposit as processTimeDepositResponse,
  getCreditCard as processCreditCardResponse,
  prepareTimeDeposit,
  prepareMiniStatement,
  prepareCreditCart,
  getMiniStatementCreditCardNew,
} from '../../utils/middleware.util';
import {
  getBalances,
  refreshStorage,
  triggerAuth as triggerAuthThunk,
  resendBillPayOTP,
  inquirySimasPoin,
  triggerAuthNavigate,
  miniStamemnt,
  updateBalances,
  getTargetAccount,
  goBack,
  confirmActivateCreditCard,
  confirmcvv,
  getDataKeyVCC,
  getCacheBankList,
  getChargeListCache,
  showDormantModal,
} from '../../state/thunks/common.thunks';
import {
  getCreditCardInquiryDashboard,
  linkCreditCard,
  closeTD as closeTDThunk,
  getTdConfig,
  investmentData,
  investmentDataView,
  investmentDataViewSIL,
  getLoanAccounts,
  showUpgradeEmoney,
  inboxPushCounter,
  getMmqData,
  getMmqDataDetail,
  getPinjamanGO,
  holdOpenTimeDeposit,
  emoneyOnboard,
  showDefaultAccountModal,
  showDefaultAccountInfo,
  saveCarouselIndex,
  getSimasTaraDetail,
  investmentDataViewStarInvestama,
  saveAccountCustomer,
} from '../../state/thunks/dashboard.thunks';
import {updateCreditCardTransactionHistory} from '../../state/thunks/transactionHistory.thunks';
import {
  showSpinner,
  hideSpinner,
  setDirtyMiniStatement,
  saveOffersCount,
} from '../../state/actions/index.actions';
import {
  groupAccountsByType,
  getErrorMessage,
  wrapMethodInFunction,
  getOffersPGOLoan,
} from '../../utils/transformer.util';
import {reduxForm} from 'redux-form';
import {
  toLower,
  startsWith,
  startCase,
  noop,
  findIndex,
  find,
  result,
  isEmpty,
  isEqual,
  isArray,
  filter,
} from 'lodash';
import {storageKeys, set, getAccountVisibility} from '../../utils/storage.util';
import {Toast} from '../../utils/RNHelpers.util.js';
import {language} from '../../config/language';
import {NavigationActions} from 'react-navigation';
import {openSavingAccount} from '../../state/thunks/savingAccount.thunks';
import {
  saveLoanDataPgo,
  checkingCustomerKYC,
} from '../../state/thunks/loan.thunks';
import {getLuckyDipTicket} from '../../state/thunks/luckyDip.thunks.js';
import {emoneyQRpermissions} from '../../state/thunks/emoney.thunks';
import {exportTransactionHistory} from '../../state/thunks/transactionHistory.thunks';
import {
  apiInquiryGetOrderList,
  getInquiryStatus,
} from '../../state/thunks/openingAccount.thunks';
import {
  getSavingProductsItems,
  getCreditCardProductsItems,
  getListLoanProduct,
} from '../../state/thunks/digitalAccountOpening.thunks';
import {closeSimasTara} from '../../state/thunks/savingAccount.thunks';
import * as actionCreators from '../../state/actions/index.actions.js';
import {
  populateConfigCacheEFormData,
  populateConfigCacheConfigEmoney,
} from '../../state/thunks/onboarding.thunks';
import {getCreditCardHistory} from '../../state/thunks/creditCardManage.thunks';

const formConfig = {
  form: 'newbankacc',
  onSubmit: (
    values,
    dispatch,
    {currentCarouselIndex, cachedTransactionsDeposit, accountNumber},
  ) => {
    const selectedTimeDeposit = find(
      cachedTransactionsDeposit,
      o => o.carouselIndex === currentCarouselIndex,
    );
    const timeDepositDetail = processTimeDepositResponse(
      result(selectedTimeDeposit, 'data', {}),
    );
    dispatch(closeTDThunk({...values, ...timeDepositDetail, accountNumber}));
  },
};

const DecoratedNewBankAccComponent = reduxForm(formConfig)(NewBankAccComponent);

const mapStateToProps = state => ({
  transactions: state.transactions.last10.slice(0, 4),
  accounts: state.accounts,
  userName: startCase(
    !startsWith(result(state, 'user.profile.customer.cifCode', ''), 'NK')
      ? startCase(toLower(result(state, 'user.profile.title', ''))) +
          ' ' +
          startCase(toLower(result(state, 'user.profile.name', '')))
      : startCase(toLower(result(state, 'user.profile.name', ''))),
  ),
  currentLanguage: result(state, 'currentLanguage.id', ''),
  isConnected: result(state, 'networkStatus.isConnected', true),
  transRefNum: state.transRefNum,
  config: result(state, 'config.tokenConfig', []),
  userId: result(state, 'user.profile.customer.id', 0),
  userMobileNumber: result(state, 'user.profile.mobileNumberMasking', ''),
  referralCode: result(state, 'user.referralCode'),
  dirtyMiniStatement: result(state, 'dirtyMiniStatement'),
  investmentAccounts: result(state, 'investmentAccounts'),
  loanAccounts: result(state, 'loanAccounts', []),
  cif: {cif: result(state, 'user.profile.customer.cifCode', '')},
  serverTime: result(state, 'timeConfig.serverTime', 0),
  emoney: result(state, 'emoney', {}),
  cifString: result(state, 'user.profile.customer.cifCode', ''),
  simasPoin: state.simasPoin,
  isLoading: result(state, 'isLoading', false),
  defaultAccount: result(state, 'defaultAccount', {}),
  getMmq: state.getMmq,
  mmqDetail: state.mmqDetail,
  loanDataPGO: result(state, 'loanDataPGO', {}),
  privateOffers: result(state, 'privateOffers', []),
  offersCount: result(state, 'offersCount', ''),
  luckyDipCounter: result(state, 'counterLuckyDip.currentToken', '0'),
  nav: result(state, 'nav', {}),
  loanMenuEnabledNTB: result(state, 'config.flag.loanMenuNTB', 'INACTIVE'),
  isLuckyDipActive: result(state, 'config.flag.flagLuckyDip', 'INACTIVE'),
  isBillPay: result(state, 'isLoading', false),
  historyIndex: result(state, 'carouselIndex', 0),
  payeeList: result(state, 'payees', []),
  isNewOnboarding: result(state, 'newOnboarding', ''),
  openingSA: result(state, 'allProductOpeningSA', []),
  openingCC: result(state, 'allProductOpeningCC', []),
  creditCardType: result(state, 'productData.creditCardType', ''),
  newSavingNTB:
    result(state, 'config.flag.flagNewSavingNTB', 'INACTIVE') === 'ACTIVE',
  accountsCC: result(state, 'ccAccounts', []),
  numberCVV: state.saveCVVnumber,
  isUsingDigisign:
    result(state, 'config.flag.isUsingDigisign', 'INACTIVE') === 'ACTIVE',
  lang: result(state, 'currentLanguage.id', 'id'),
  iPass: result(state, 'user.ipassport', ''),
  loanMenuEnabledETB: result(state, 'config.flag.loanMenuETB', 'INACTIVE'),
  loanDataNew: result(state, 'userLoanData', []),
  lazyLogin: result(state, 'config.lazyLogin', '') === 'active',
});
const mapDispatchToProps = dispatch => ({
  loadBalancesWithSpinner: () => {
    dispatch(showSpinner());
    return dispatch(getBalances())
      .then(() => dispatch(hideSpinner()))
      .catch(() => dispatch(hideSpinner()));
  },
  loadBalances: () => {
    dispatch(showSpinner());
    return dispatch(refreshStorage())
      .then(() => dispatch(hideSpinner()))
      .catch(() => dispatch(hideSpinner()));
  },
  getTdCreate: () => dispatch(getTdConfig()),
  saveCarouselIndex: carouselIndex =>
    dispatch(saveCarouselIndex(carouselIndex)),
  payCCBill: selectedAccount => () => {
    dispatch(getCreditCardInquiryDashboard(selectedAccount));
  },
  linkCreditCard: () => dispatch(linkCreditCard()),
  navigateToCcHistory: (creditCardDetail, selectedAccount) => () => {
    dispatch(
      updateCreditCardTransactionHistory(creditCardDetail, selectedAccount),
    );
  },
  arrowNavigateToCcHistory: (creditCardDetail, selectedAccount) => {
    dispatch(
      updateCreditCardTransactionHistory(creditCardDetail, selectedAccount),
    );
  },
  triggerAuth: (transactionId, amount) =>
    dispatch(triggerAuthThunk(transactionId, amount)),
  resendOTP: transactionId => dispatch(resendBillPayOTP(transactionId)),
  setDirtyMiniStatement: () => dispatch(setDirtyMiniStatement(false)),
  investmentDataCreate: () => dispatch(investmentData()),
  investmentDataView: code => () => dispatch(investmentDataView(code)),
  investmentView: (item, groupTypes) => () => {
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Landing'})],
      }),
    );
    dispatch(
      NavigationActions.navigate({
        routeName: 'InvestmentView',
        params: {item: item, nextRouteName: groupTypes},
      }),
    );
  },
  investmentDataViewSIL: code => () => dispatch(investmentDataViewSIL(code)),
  investmentDataViewStarInvestama: code => () =>
    dispatch(investmentDataViewStarInvestama(code)),
  getPayday: () => {},
  getLoanAccounts: () => {
    this.setState({showLoader: true});
    dispatch(getLoanAccounts());
  },
  showUpgradeEmoney: () => {
    dispatch(showUpgradeEmoney());
  },
  cardLessWithdrawal: () => {
    dispatch(
      NavigationActions.navigate({routeName: 'CardLessWithdrawalIndex'}),
    );
  },
  goTopUp: () => {
    dispatch(NavigationActions.navigate({routeName: 'EmoneyTopUpATM'}));
  },
  taptoEmoney: () =>
    dispatch(NavigationActions.navigate({routeName: 'TermsEmoney'})),
  goToEmoneyHistory: accountNumber =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'TransactionEmoneyScreen',
        params: {accountNumber: accountNumber},
      }),
    ),
  dispatch,
  inquirySimasPoin: () => dispatch(inquirySimasPoin()),
  goToInboxPushCounter: () => {
    dispatch(inboxPushCounter());
  },
  SimasPoinHistory: () => {
    dispatch(NavigationActions.navigate({routeName: 'SimasPoinHistory'}));
  },
  triggerAuthNav: (transactionId, routeName, params, isEasypin) =>
    dispatch(
      triggerAuthNavigate(transactionId, 0, isEasypin, routeName, params),
    ),
  inquiryLuckyDipCoupon: () => {
    dispatch(
      NavigationActions.navigate({
        routeName: 'LuckyDipMainPage',
        params: {pathRoute: 'HomeScreen'},
      }),
    );
  },
  getMmqData: () => dispatch(getMmqData()),
  getMmqDataDetail: accountInfo => () =>
    dispatch(getMmqDataDetail(accountInfo)),
  getMiniStatementNew: () => dispatch(miniStamemnt()),
  goToSummaryLoan: data => {
    dispatch(checkingCustomerKYC(data));
  },
  getOrderCustomerLoan: dataLoan => {
    dispatch(saveLoanDataPgo(dataLoan));
  },
  showPinjamanGOOffers: () => dispatch(getPinjamanGO()),
  goToLoan: () => dispatch(getListLoanProduct()),
  setDefaultAccount: account => () => {
    dispatch(showDefaultAccountModal(account));
  },
  showDefaultAccountInfo: () => dispatch(showDefaultAccountInfo()),
  goToCreditCard: () => dispatch(getCreditCardProductsItems()),
  holdOpenTimeDeposit: () => dispatch(holdOpenTimeDeposit()),
  welcomeEmoney: () => dispatch(emoneyOnboard()),
  openSaving: nav => {
    dispatch(openSavingAccount(nav));
  },
  upgradeKyc: () => {
    dispatch(NavigationActions.navigate({routeName: 'EmoneyUpgrade'}));
  },
  defaultAccEmoney: () => dispatch(showDefaultAccountModal()),

  goToSavingAccount: () => dispatch(getSavingProductsItems()),
  getOffersCount: () => dispatch(saveOffersCount('1')),
  setDefaultAccEmoney: data => () => {
    dispatch(showDefaultAccountModal(data));
  },
  emoneyQRpermissions: () => dispatch(emoneyQRpermissions()),
  getLuckyDipTicket: () => {
    dispatch(getLuckyDipTicket());
  },
  refreshStorage: () => {
    dispatch(refreshStorage());
  },
  getBalances: () => {
    dispatch(showSpinner());
    return dispatch(updateBalances())
      .then(() => dispatch(hideSpinner()))
      .catch(() => dispatch(hideSpinner()));
  },
  exportTransaction: accNumber => dispatch(exportTransactionHistory(accNumber)),
  getTargetAccount: () => {
    dispatch(getTargetAccount());
  },
  goToSimasTaraDetail: accountInfo => () =>
    dispatch(getSimasTaraDetail(accountInfo)),
  saveAccountCustomer: value => dispatch(saveAccountCustomer(value)),
  getOpeningData: (data, pdLoanData) => {
    dispatch(apiInquiryGetOrderList(data, pdLoanData));
  },
  approveAplication: (allData, checkingNext) => () =>
    dispatch(getInquiryStatus(allData, checkingNext)),
  goToCloseSimasTara: (simasTaraAccNo, productType, sourceAccNoSimasTara) =>
    dispatch(closeSimasTara(simasTaraAccNo, productType, sourceAccNoSimasTara)),
  emoneySuccess: () =>
    dispatch(
      NavigationActions.navigate({routeName: 'EmoneySuccessRegistration'}),
    ),
  goBackOnboard: isFromcc => dispatch(goBack(isFromcc)),
  goBackOnboardCC: () =>
    dispatch(NavigationActions.navigate({routeName: 'Landing'})),
  showVCC: selectedAccount => dispatch(confirmcvv(selectedAccount)),
  deleteReducer: () => dispatch(actionCreators.clearCVVNumber()),
  getKeyVCC: () => dispatch(getDataKeyVCC()),
  navigateToConfirm: selectedAccount => {
    dispatch(confirmActivateCreditCard(selectedAccount));
  },
  getEFormConfig: () => dispatch(populateConfigCacheEFormData()),
  getCacheBankList: () => {
    dispatch(getCacheBankList());
  },
  getChargeListCache: () => {
    dispatch(getChargeListCache());
  },
  getConfigEmoney: () => dispatch(populateConfigCacheConfigEmoney()),
  releaseDormant: selectedAccount =>
    dispatch(showDormantModal(selectedAccount)),
  navigateToConvertInst: selectedAccount =>
    dispatch(getCreditCardHistory(selectedAccount)),
});

class NewBankAcc extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    transactions: PropTypes.array,
    accounts: PropTypes.array,
    loadBalancesWithSpinner: PropTypes.func,
    loadBalances: PropTypes.func,
    updateBalances: PropTypes.func,
    userName: PropTypes.string,
    getTdCreate: PropTypes.func,
    linkCreditCard: PropTypes.func,
    setDirtyMiniStatement: PropTypes.func,
    payCCBill: PropTypes.func,
    isConnected: PropTypes.bool,
    dirtyMiniStatement: PropTypes.bool,
    navigateToCcHistory: PropTypes.func,
    biller: PropTypes.array,
    userId: PropTypes.number,
    transRefNum: PropTypes.string,
    config: PropTypes.array,
    formValues: PropTypes.object,
    resendOTP: PropTypes.func,
    triggerAuth: PropTypes.func,
    closeTD: PropTypes.func,
    userMobileNumber: PropTypes.string,
    referralCode: PropTypes.string,
    dispatch: PropTypes.func,
    investmentDataCreate: PropTypes.func,
    investmentAccounts: PropTypes.object,
    investmentDataView: PropTypes.func,
    investmentDataViewSIL: PropTypes.func,
    getPayday: PropTypes.func,
    getLoanAccounts: PropTypes.func,
    loanAccounts: PropTypes.array,
    cif: PropTypes.object,
    serverTime: PropTypes.string,
    cifString: PropTypes.string,
    emoney: PropTypes.object,
    showUpgradeEmoney: PropTypes.func,
    cardLessWithdrawal: PropTypes.func,
    goTopUp: PropTypes.func,
    taptoEmoney: PropTypes.func,
    goToEmoneyHistory: PropTypes.func,
    simasPoin: PropTypes.object,
    inquirySimasPoin: PropTypes.func,
    goToInboxPushCounter: PropTypes.func,
    SimasPoinHistory: PropTypes.func,
    currentLanguage: PropTypes.string,
    triggerAuthNav: PropTypes.func,
    arrowNavigateToCcHistory: PropTypes.func,
    isLoading: PropTypes.bool,
    inquiryLuckyDipCoupon: PropTypes.func,
    couponCustomerCounting: PropTypes.func,
    setDefaultAccount: PropTypes.func,
    showDefaultAccountInfo: PropTypes.func,
    defaultAccount: PropTypes.object,
    investmentView: PropTypes.func,
    getMmqData: PropTypes.func,
    getMmq: PropTypes.object,
    getMmqDataDetail: PropTypes.func,
    mmqDetail: PropTypes.object,
    topUp: PropTypes.func,
    getMiniStatementNew: PropTypes.func,
    showPinjamanGOOffers: PropTypes.func,
    goToLoan: PropTypes.func,
    loanDataPGO: PropTypes.object,
    getOrderCustomerLoan: PropTypes.func,
    privateOffers: PropTypes.array,
    goToSummaryLoan: PropTypes.func,
    sendTrackingFivePointTwo: PropTypes.func,
    nav: PropTypes.object,
    openSaving: PropTypes.func,
    upgradeKyc: PropTypes.func,
    goToSavingAccount: PropTypes.func,
    welcomeEmoney: PropTypes.func,
    goToCreditCard: PropTypes.func,
    holdOpenTimeDeposit: PropTypes.func,
    defaultAccEmoney: PropTypes.func,
    getOffersCount: PropTypes.func,
    offersCount: PropTypes.string,
    luckyDipCounter: PropTypes.string,
    getLuckyDipTicket: PropTypes.func,
    loanMenuEnabledNTB: PropTypes.string,
    setDefaultAccEmoney: PropTypes.func,
    emoneyQRpermissions: PropTypes.func,
    isLuckyDipActive: PropTypes.string,
    isBillPay: PropTypes.bool,
    refreshStorage: PropTypes.func,
    getBalances: PropTypes.func,
    saveCarouselIndex: PropTypes.func,
    historyIndex: PropTypes.number,
    exportTransaction: PropTypes.func,
    payeeList: PropTypes.array,
    getTargetAccount: PropTypes.func,
    goToSimasTaraDetail: PropTypes.func,
    investmentDataViewStarInvestama: PropTypes.func,
    saveAccountCustomer: PropTypes.func,
    getOpeningData: PropTypes.func,
    isNewOnboarding: PropTypes.string,
    openingSA: PropTypes.array,
    openingCC: PropTypes.array,
    approveAplication: PropTypes.func,
    emoneySuccess: PropTypes.func,
    isUsingDigisign: PropTypes.bool,
    goBack: PropTypes.func,
    goToCreditCardFormNkyc: PropTypes.func,
    goToLoanFormNkyc: PropTypes.func,
    goToSectionPage: PropTypes.func,
    creditCardType: PropTypes.string,
    newSavingNTB: PropTypes.bool,
    goToSavingAccountFormNkyc: PropTypes.func,
    showVCC: PropTypes.func,
    navigateToConfirm: PropTypes.func,
    accountsCC: PropTypes.array,
    navigateToConfirmAcc: PropTypes.func,
    numberCVV: PropTypes.object,
    deleteReducer: PropTypes.func,
    getKeyVCC: PropTypes.func,
    settingCC: PropTypes.func,
    lang: PropTypes.string,
    iPass: PropTypes.string,
    goToFilter: PropTypes.func,
    goToCloseSimasTara: PropTypes.func,
    goBackOnboard: PropTypes.func,
    goBackOnboardCC: PropTypes.func,
    loanMenuEnabledETB: PropTypes.string,
    loanDataNew: PropTypes.array,
    lazyLogin: PropTypes.bool,
    getEFormConfig: PropTypes.func,
    getCacheBankList: PropTypes.func,
    getConfigEmoney: PropTypes.func,
    getChargeListCache: PropTypes.func,
    goToshowDormantModal: PropTypes.func,
    releaseDormant: PropTypes.func,
    navigateToConvertInst: PropTypes.func,
  };

  carouselRefs = {
    savingAccount: null,
    currentAccount: null,
    timeDepositAccount: null,
    creditCardAccount: null,
    rdn: null,
    loan: null,
    investmentProduct: null,
  };
  tabNames = !startsWith(this.props.cifString, 'NK')
    ? [
        'savingAccount',
        'timeDepositAccount',
        'creditCardAccount',
        'loan',
        'rdn',
        'investmentProduct',
        '',
      ]
    : ['savingAccount', 'creditCardAccount', 'loan'];

  state = {
    groupedAcc: {},
    activeTab: 'savingAccount',
    lastTransactions: [],
    lastTransactionsCC: [],
    timeDepositDetail: null,
    creditCardDetail: {},
    loadingError: false,
    showReload: false,
    showLoader: false,
    dashboardRefreshing: false,
    selectedAccount: {}, // Selected account
    cachedAccount: {
      lastTransactionsSavings: [],
      lastTransactionsRdn: [],
      lastTransactionsDeposit: [],
      lastTransactionsCreditCardMiniStatement: [],
      lastTransactionsCreditCardDetail: [],
    },
    accountVisibility: {
      savingAccount: [],
      timeDepositAccount: [],
      rdn: [],
      loan: [],
    },
    paydayLoan: false,
    curentTabCarousel: 0,
  };

  _goToEmoneyHistoryNavigate = () => {
    const {goToEmoneyHistory, accounts} = this.props;
    const accountEmoney = find(accounts, {productType: 'Emoney Account'});
    const accountNumber = result(accountEmoney, 'accountNumber', '');
    goToEmoneyHistory(accountNumber);
  };

  _onDashboardRefresh = () => {
    this.setState({dashboardRefreshing: true});
    this.props
      .loadBalances()
      .then(() => {
        this.setState({
          cachedAccount: {
            lastTransactionsSavings: [],
            lastTransactionsRdn: [],
            lastTransactionsDeposit: [],
            lastTransactionsCreditCardMiniStatement: [],
            lastTransactionsCreditCardDetail: [],
          },
        });
        this._onReloadPress();
      })
      .catch(() => {
        this.setState({dashboardRefreshing: false});
      });
    this.props.getOpeningData('SA');
    this.props.getEFormConfig();
    this.props.getConfigEmoney();
  };

  _setTransactions = res => {
    const transactions = processMiniStatementResponse(res.data);
    this.setState({lastTransactions: transactions.slice(0, 4)});
    this.setState({loadingError: false, showReload: false, showLoader: false});
  };

  _setTimeDepositDetail = res => {
    this.setState({timeDepositDetail: processTimeDepositResponse(res.data)});
    this.setState({loadingError: false, showReload: false, showLoader: false});
  };

  _setCreditTransactions = res => {
    this.setState({
      lastTransactionsCC: getMiniStatementCreditCardNew(res.data).slice(0, 4),
    });
    this.setState({loadingError: false, showReload: false, showLoader: false});
  };

  _setCreditCardDetail = (res, selectedAccount) => {
    this.setState({
      creditCardDetail: processCreditCardResponse(res.data, selectedAccount),
    });
    this.setState({loadingError: false, showReload: false, showLoader: false});
  };

  _getAccNumberAndReset = carouselIndex => {
    const {activeTab, groupedAcc} = this.state;
    const selectedAccounts = groupedAcc[activeTab];
    this.setState({
      lastTransactions: [],
      timeDepositDetail: null,
      creditCardDetail: null,
      loadingError: false,
      lastTransactionsCC: [],
    });
    if (!(isArray(selectedAccounts) && selectedAccounts[carouselIndex])) {
      return this.setState({loadingError: true});
    }

    const account = selectedAccounts[carouselIndex];
    if (account.id) {
      this.setState({selectedAccount: account});
    }
    return account;
  };

  _fetchTransactions = carouselIndex => {
    const {dispatch} = this.props;
    const {activeTab} = this.state;
    this._setCarouselIndex(carouselIndex);
    this.setState({showReload: false});
    const selectedAccount = this._getAccNumberAndReset(carouselIndex);
    if (!selectedAccount || !selectedAccount.accountNumber) {
      return;
    }
    this.setState({showLoader: true});
    const checkIndexCurrent = findIndex(
      result(this, 'state.cachedAccount.lastTransactionsCurrent'),
      {carouselIndex: carouselIndex, activeTab: activeTab},
    );
    const checkIndexRdn = findIndex(
      result(this, 'state.cachedAccount.lastTransactionsRdn'),
      {carouselIndex: carouselIndex, activeTab: activeTab},
    );

    if (activeTab === 'currentAccount') {
      if (checkIndexCurrent < 0) {
        getMiniStatement(prepareMiniStatement(selectedAccount), dispatch)
          .then(res => {
            this.state.cachedAccount.lastTransactionsCurrent.push({
              activeTab: this.state.activeTab,
              carouselIndex,
              data: {
                miniStatementData: processCacheMiniStatementResponse(res.data),
              },
            });
            this._setTransactions(res);
          })
          .catch(() => {
            this.setState({showLoader: false});
            this.setState({showReload: true});
            this.setState({loadingError: true});
          });
      } else {
        this._setTransactions(
          result(
            this,
            `state.cachedAccount.lastTransactionsCurrent[${checkIndexCurrent}]`,
          ),
        );
      }
    }

    if (activeTab === 'rdn') {
      if (checkIndexRdn < 0) {
        getMiniStatement(prepareMiniStatement(selectedAccount), dispatch)
          .then(res => {
            this.state.cachedAccount.lastTransactionsRdn.push({
              activeTab: this.state.activeTab,
              carouselIndex,
              data: {
                miniStatementData: processCacheMiniStatementResponse(res.data),
              },
            });
            this._setTransactions(res);
          })
          .catch(() => {
            this.setState({showLoader: false});
            this.setState({showReload: true});
            this.setState({loadingError: true});
          });
      } else {
        this._setTransactions(
          result(
            this,
            `state.cachedAccount.lastTransactionsRdn[${checkIndexRdn}]`,
          ),
        );
      }
    }
  };

  _setCarouselIndex = carouselIndex => {
    const {saveCarouselIndex} = this.props;
    const checkEmpty = carouselIndex === null || carouselIndex === undefined;
    const index = checkEmpty ? 0 : carouselIndex;
    saveCarouselIndex(index);
  };

  _transactionFour = carouselIndex => {
    const {activeTab} = this.state;
    const {dispatch} = this.props;
    this._setCarouselIndex(carouselIndex);
    this.setState({showReload: false});
    const selectedAccount = this._getAccNumberAndReset(carouselIndex);
    if (!selectedAccount || !selectedAccount.accountNumber) {
      return;
    }
    this.setState({showLoader: true});
    const checkIndexSavings = findIndex(
      result(this, 'state.cachedAccount.lastTransactionsSavings'),
      {carouselIndex: carouselIndex, activeTab: activeTab},
    );
    if (checkIndexSavings < 0) {
      getMiniStatement(prepareMiniStatement(selectedAccount), dispatch)
        .then(res => {
          let cachedAccount = this.state.cachedAccount;
          const lastTransactionsSavings = [
            ...cachedAccount.lastTransactionsSavings,
            {
              activeTab: this.state.activeTab,
              carouselIndex,
              data: {
                miniStatementData: processCacheMiniStatementResponse(res.data),
              },
            },
          ];
          cachedAccount.lastTransactionsSavings = lastTransactionsSavings;
          this.setState({cachedAccount});
          this.state.cachedAccount.lastTransactionsSavings.push({
            activeTab: this.state.activeTab,
            carouselIndex,
            data: {
              miniStatementData: processCacheMiniStatementResponse(res.data),
            },
          });
          this._setTransactions(res);
        })
        .catch(() => {
          this.setState({showLoader: false});
          this.setState({showReload: true});
          this.setState({loadingError: true});
        });
    } else {
      this._setTransactions(
        result(
          this,
          `state.cachedAccount.lastTransactionsSavings[${checkIndexSavings}]`,
        ),
      );
    }
  };

  _setVisibility = carouselIndex => () => {
    const {activeTab, accountVisibility} = this.state;
    let tempArray = this.state.accountVisibility;
    const checkIndex = findIndex(tempArray[`${activeTab}`], {
      index: carouselIndex,
    });
    if (
      this.state.accountVisibility[`${activeTab}`][`${checkIndex}`] ===
      undefined
    ) {
      let accountVisibility = this.state.accountVisibility;
      accountVisibility[`${activeTab}`] = [
        ...this.state.accountVisibility[`${activeTab}`],
        {index: carouselIndex, visible: false},
      ];
      this.setState({accountVisibility});
    } else {
      tempArray[`${activeTab}`][`${checkIndex}`].visible =
        !this.state.accountVisibility[`${activeTab}`][`${checkIndex}`].visible;
      this.setState({accountVisibility: tempArray});
    }
    setTimeout(() => {
      set(storageKeys.ACCOUNT_VISIBILITY, accountVisibility).catch(err => {
        Toast.show(
          getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
          ),
          Toast.LONG,
        );
      });
    }, 500);
  };

  _onSnapToCASA = snappedCarouselIndex => {
    this._fetchTransactions(snappedCarouselIndex);
  };

  _fetchTimeDeposit = carouselIndex => {
    this.setState({showReload: false});
    this._setCarouselIndex(carouselIndex);
    const selectedAccount = this._getAccNumberAndReset(carouselIndex);
    if (!selectedAccount || !selectedAccount.id) {
      return;
    }
    this.setState({showLoader: true});
    const checkIndexDeposit = findIndex(
      result(this, 'state.cachedAccount.lastTransactionsDeposit'),
      {carouselIndex: carouselIndex},
    );
    if (checkIndexDeposit < 0) {
      getTimeDeposit(prepareTimeDeposit(selectedAccount), this.props.dispatch)
        .then(res => {
          let cachedAccount = this.state.cachedAccount;
          const lastTransactionsDeposit = cachedAccount.lastTransactionsDeposit;
          cachedAccount.lastTransactionsDeposit = [
            ...lastTransactionsDeposit,
            {
              carouselIndex,
              data: res.data,
            },
          ];
          this.setState({cachedAccount});
          this._setTimeDepositDetail(res);
        })
        .catch(() => {
          this.setState({
            showLoader: false,
            showReload: true,
            loadingError: true,
          });
        });
    } else {
      this._setTimeDepositDetail(
        result(
          this,
          `state.cachedAccount.lastTransactionsDeposit[${checkIndexDeposit}]`,
        ),
      );
    }
  };

  _fetchCreditCart = carouselIndex => {
    const {numberCVV, deleteReducer} = this.props;
    this.setState({showReload: false});
    this._setCarouselIndex(carouselIndex);
    const selectedAccount = this._getAccNumberAndReset(carouselIndex);
    const selectedAccountsCVV = result(
      numberCVV,
      'selectedAccount.accountNumber',
      '',
    );
    const selectedAccountCard = result(selectedAccount, 'accountNumber', '');
    const isCVV = selectedAccountsCVV === selectedAccountCard;
    if (!isCVV) {
      deleteReducer();
    }
    const checkCCDetail = findIndex(
      result(this, 'state.cachedAccount.lastTransactionsCreditCardDetail'),
      {carouselIndex: carouselIndex},
    );
    const checkCCMini = findIndex(
      result(
        this,
        'state.cachedAccount.lastTransactionsCreditCardMiniStatement',
      ),
      {carouselIndex: carouselIndex},
    );
    if (!selectedAccount || !selectedAccount.id) {
      return;
    }
    this.setState({showLoader: true});
    if (checkCCDetail < 0 && checkCCMini < 0) {
      Promise.all([
        getCreditCard(prepareCreditCart(selectedAccount), this.props.dispatch),
        creditCardStatement(
          prepareMiniStatement(selectedAccount),
          this.props.dispatch,
        ),
      ])
        .then(res => {
          this.state.cachedAccount.lastTransactionsCreditCardDetail.push({
            carouselIndex,
            data: res[0].data,
            account: selectedAccount,
          });
          this.state.cachedAccount.lastTransactionsCreditCardMiniStatement.push(
            {
              carouselIndex,
              data: res[1].data,
            },
          );
          this._setCreditCardDetail(res[0], selectedAccount);
          this._setCreditTransactions(res[1]);
          this.setState({showLoader: false});
        })
        .catch(() => {
          this.setState({
            showLoader: false,
            showReload: true,
            loadingError: true,
          });
        });
    } else {
      this._setCreditCardDetail(
        result(
          this,
          `state.cachedAccount.lastTransactionsCreditCardDetail[${checkCCDetail}]`,
        ),
        selectedAccount,
      );
      this._setCreditTransactions(
        result(
          this,
          `state.cachedAccount.lastTransactionsCreditCardMiniStatement[${checkCCMini}]`,
        ),
      );
    }
  };

  _fetchLoanAccounts = () => {
    const {dispatch, cif} = this.props;
    this.setState({showLoader: true, loadingError: false});
    getLoanList(cif, dispatch)
      .then(res => {
        const dataLoan = result(res, 'data.data', []);
        this.props.getOpeningData('Loan', dataLoan);
        this.setState({showLoader: false});
      })
      .catch(() => {
        this.props.getOpeningData('Loan');
        this.setState({showLoader: false});
        this.setState({showLoader: false, loadingError: true});
      });
  };

  _onReloadPress = () => {
    const {cachedAccount} = this.state;
    const currentCarouselIndex = result(
      this.carouselRefs,
      `${this.state.activeTab}.currentIndex`,
    );
    if (this.state.activeTab === 'timeDepositAccount') {
      (() => {
        this.setState({
          dashboardRefreshing: false,
          cachedAccount: {
            lastTransactionsSavings: cachedAccount.lastTransactionsSavings,
            lastTransactionsRdn: cachedAccount.lastTransactionsRdn,
            lastTransactionsDeposit: [],
            lastTransactionsCreditCardMiniStatement: [],
            lastTransactionsCreditCardDetail: [],
          },
        });
        return Promise.resolve();
      })().then(() => this._fetchTimeDeposit(currentCarouselIndex));
    } else if (this.state.activeTab === 'creditCardAccount') {
      (() => {
        this.setState({
          dashboardRefreshing: false,
          cachedAccount: {
            lastTransactionsSavings: cachedAccount.lastTransactionsSavings,
            lastTransactionsRdn: cachedAccount.lastTransactionsRdn,
            lastTransactionsDeposit: cachedAccount.lastTransactionsDeposit,
            lastTransactionsCreditCardMiniStatement: [],
            lastTransactionsCreditCardDetail: [],
          },
        });
        return Promise.resolve();
      })().then(
        wrapMethodInFunction(this._fetchCreditCart, currentCarouselIndex),
      );
    } else if (this.state.activeTab === 'currentAccount') {
      (() => {
        this.setState({
          dashboardRefreshing: false,
        });
        return Promise.resolve();
      })().then(() => this._fetchTransactions(currentCarouselIndex));
    } else if (this.state.activeTab === 'rdn') {
      (() => {
        this.setState({
          dashboardRefreshing: false,
          cachedAccount: {
            lastTransactionsSavings: cachedAccount.lastTransactionsSavings,
            lastTransactionsRdn: [],
            lastTransactionsDeposit: cachedAccount.lastTransactionsDeposit,
            lastTransactionsCreditCardMiniStatement:
              cachedAccount.lastTransactionsCreditCardMiniStatement,
            lastTransactionsCreditCardDetail:
              cachedAccount.lastTransactionsCreditCardDetail,
          },
        });
        return Promise.resolve();
      })().then(
        wrapMethodInFunction(this._fetchTransactions, currentCarouselIndex),
      );
    } else if (this.state.activeTab === 'loan') {
      this._fetchLoanAccounts();
    } else {
      (() => {
        this.setState({
          dashboardRefreshing: false,
          cachedAccount: {
            lastTransactionsSavings: [],
            lastTransactionsRdn: cachedAccount.lastTransactionsRdn,
            lastTransactionsDeposit: cachedAccount.lastTransactionsDeposit,
            lastTransactionsCreditCardMiniStatement:
              cachedAccount.lastTransactionsCreditCardMiniStatement,
            lastTransactionsCreditCardDetail:
              cachedAccount.lastTransactionsCreditCardDetail,
          },
        });
        return Promise.resolve();
      })().then(
        wrapMethodInFunction(this._transactionFour, currentCarouselIndex),
      );
    }
  };

  _onChangeTab = ({i, from}) => {
    if (i === from) {
      return;
    }
    const activeTab = this.tabNames[i];
    this.setState({activeTab}, () => {
      const currentCarouselIndex = result(
        this.carouselRefs,
        `${activeTab}.currentIndex`,
        0,
      );
      if (activeTab === 'timeDepositAccount') {
        this._fetchTimeDeposit(currentCarouselIndex);
      } else if (activeTab === 'creditCardAccount') {
        this._fetchCreditCart(currentCarouselIndex),
          isEmpty(this.props.payeeList) ? this.props.getTargetAccount() : null,
          this.props.getOpeningData('CC'),
          this.props.linkCreditCard();
      } else if (activeTab === 'loan') {
        this._fetchLoanAccounts();
      } else if (activeTab === 'investmentProduct') {
        this.props.investmentDataCreate();
      } else if (activeTab === 'rdn') {
      } else {
        this._fetchTransactions(currentCarouselIndex);
      } // fetch transaction for first card on tab change
    });
  };

  _setCarouselReferenceFor = refType => ref => {
    this.carouselRefs[refType] = ref;
  };

  _navigateToConfirm = () => {
    const carouselIndex = result(
      this.carouselRefs,
      `${this.state.activeTab}.currentIndex`,
    );
    const selectedAccount = this._getAccNumberAndReset(carouselIndex);
    this.props.navigateToConfirm(selectedAccount);
  };

  componentDidMount() {
    const {isLoading, accounts, saveAccountCustomer} = this.props;
    this._groupAccountsAndFetchTrans(accounts);
    if (isLoading) {
      return;
    }
    this.props.getPayday();
    saveAccountCustomer(accounts);
  }
  _groupAccountsAndFetchTrans = newAccounts => {
    const {accountsCC} = this.props;
    this.setState(
      {
        groupedAcc: groupAccountsByType(newAccounts, accountsCC),
      },
      () => {},
    );
  };

  _showVCC = () => {
    const {selectedAccount} = this.state;
    this.props.showVCC(selectedAccount);
  };

  clearCache = () => {
    const currentCarouselIndex = result(
      this.carouselRefs,
      `${this.state.activeTab}.currentIndex`,
    );
    this.setState({
      cachedAccount: {
        lastTransactionsSavings: [],
        lastTransactionsRdn: [],
        lastTransactionsDeposit: [],
        lastTransactionsCreditCardMiniStatement: [],
        lastTransactionsCreditCardDetail: [],
      },
    });
    if (this.state.activeTab === 'timeDepositAccount') {
      this._fetchTimeDeposit(currentCarouselIndex);
    } else if (this.state.activeTab === 'creditCardAccount') {
      this._fetchCreditCart(currentCarouselIndex);
    } else if (this.state.activeTab === 'rdn') {
      this._fetchTransactions(currentCarouselIndex);
    } else {
      this._fetchTransactions(currentCarouselIndex);
    }
  };

  componentWillReceiveProps(newProps) {
    const {setDirtyMiniStatement} = this.props;
    if (
      'balances' in result(newProps, 'accounts[0]', {}) &&
      (!isEqual(this.props.accounts, newProps.accounts) ||
        isEmpty(this.state.groupedAcc))
    ) {
      // fetch transactions only when the balances are there, which means that the update balance api has been called successfully,
      this._groupAccountsAndFetchTrans(newProps.accounts);
    }
    if (newProps.dirtyMiniStatement) {
      this.clearCache();
      setDirtyMiniStatement();
    }
  }

  _navigateToTransactions = accountInfo => () => {
    const selectedAccount = accountInfo;
    this.props.navigation.navigate('Transactions', {
      accountNumber: accountInfo.accountNumber,
      currency: accountInfo.currency,
      selectedAccount,
      reload: true,
    });
  };

  _navigateToTransactionsFilter = accountInfo => () => {
    this.props.navigation.navigate('TransactionsFilter', {
      accountInfo: accountInfo,
    });
  };

  _navigateToCcHistory = creditCardDetail => () => {
    const detail = result(creditCardDetail[0], 'data', {});
    const selectedAccount = result(creditCardDetail[0], 'account', {});
    this.props.arrowNavigateToCcHistory(detail, selectedAccount);
  };

  _linkCreditCard = () =>
    this.props.linkCreditCard().then(() => {
      const goTofirstIndex = result(
        this.carouselRefs,
        'creditCardAccount.snapToItem',
      );
      goTofirstIndex && goTofirstIndex(0);
    });

  _navigateToCreditCardManage = () => {
    const {selectedAccount} = this.state;
    this.props.navigation.navigate('CreditCardManage', {
      selectedAccount: selectedAccount,
    });
  };

  _goToFilter = () => {
    const {selectedAccount} = this.state;
    this.props.navigation.navigate('CcDownloadOptions', {
      selectedAccount: selectedAccount,
    });
  };

  _navigateToConvert = () => {
    const {selectedAccount} = this.state;
    this.props.navigateToConvertInst(selectedAccount);
  };

  _navigateToCreditCardTransactionDetail = params => {
    const {selectedAccount} = this.state;
    this.props.navigation.navigate('CreditCardTransactionDetail', {
      selectedAccount: selectedAccount,
      params: {...params},
    });
  };

  _navigateToCloseTD = () => {
    const {timeDepositDetail, selectedAccount} = this.state;
    const accountNumber = result(selectedAccount, 'accountNumber', '');
    this.props.navigation.navigate('CloseTdConfirmation', {
      timeDepositDetail: {accountNumber, ...timeDepositDetail},
      tabAccounts: this.state.groupedAcc.timeDepositAccount,
      setCarouselReference: this._setCarouselReferenceFor('timeDepositAccount'),
    });
  };

  _showingPinjamanGOOffers = () => {
    this.props.showPinjamanGOOffers();
  };

  _releaseDormant = () => {
    const carouselIndex = result(
      this.carouselRefs,
      `${this.state.activeTab}.currentIndex`,
    );
    const selectedAccount = this._getAccNumberAndReset(carouselIndex);
    this.props.releaseDormant(selectedAccount);
  };

  cardLessWithdrawal = () => {
    if (!this.state.cardlessDisabled) {
      this.setState({cardlessDisabled: true});
      this.props.cardLessWithdrawal();
      setTimeout(() => {
        this.setState({cardlessDisabled: false});
      }, 2000);
    }
  };

  goToTopUp = () => {
    const {goTopUp} = this.props;
    goTopUp();
  };

  componentWillMount() {
    const {
      isLoading,
      accounts,
      privateOffers,
      getOffersCount,
      offersCount,
      isLuckyDipActive,
      isBillPay,
      getMmq,
      getOpeningData,
      isNewOnboarding,
      welcomeEmoney,
      cifString,
      lazyLogin,
      getEFormConfig,
      getCacheBankList,
      getChargeListCache,
    } = this.props;
    const firstIndex = 0;
    this._setCarouselIndex(firstIndex);
    if (lazyLogin !== true) {
      if (isEmpty(getMmq)) {
        this.props.getMmqData();
      }
    }
    const isPGOLoan = getOffersPGOLoan(privateOffers);
    if (isLoading) {
      return;
    }
    this.props.goToInboxPushCounter();
    getAccountVisibility().then(res => {
      if (res) {
        this.setState({accountVisibility: res});
      }
    });
    this._groupAccountsAndFetchTrans(accounts);

    if (isNewOnboarding === 'yes') {
      this.props.emoneySuccess();
    } else if (isNewOnboarding === 'no') {
      return Promise.resolve();
    } else {
      if (startsWith(cifString, 'NK')) {
        welcomeEmoney();
      }
    }
    if (isPGOLoan) {
      if (offersCount === '') {
        getOffersCount();
        this._showingPinjamanGOOffers();
      }
    }
    if (isLuckyDipActive === 'active' || isLuckyDipActive === 'ACTIVE') {
      this.props.getLuckyDipTicket();
    }
    if (isBillPay === true) {
      this.props.refreshStorage();
    }
    if (lazyLogin !== true) {
      getOpeningData('SA');
      getEFormConfig();
      getCacheBankList();
      getChargeListCache();
    }
    if (startsWith(cifString, 'NK')) {
      getEFormConfig();
    }
  }

  processOpenTd = () => {
    const {accounts, getTdCreate} = this.props;
    const savingsAccounts = filter(accounts, {accountType: 'SavingAccount'});
    const isSavingAccount = !isEmpty(savingsAccounts);
    isSavingAccount ? getTdCreate() : getTdCreate();
  };
  reloadBalances = () => {
    const {loadBalances, lazyLogin} = this.props;
    loadBalances();
    if (lazyLogin) {
      this.props.getMmqData();
      this.props.getOpeningData('SA');
      this.props.getEFormConfig();
      this.props.getCacheBankList();
      this.props.getChargeListCache();
    }
  };

  sendMail = accNumber => () => {
    const {exportTransaction} = this.props;
    exportTransaction(accNumber);
  };

  _goBack = () => {
    const {navigation, goBackOnboard, goBackOnboardCC} = this.props;
    const isFromcc = result(navigation, 'state.params.isFromcc', false);
    isFromcc === true ? goBackOnboardCC() : goBackOnboard();
  };

  render() {
    const {
      navigation,
      isConnected,
      userId,
      transRefNum,
      config,
      formValues,
      resendOTP = noop,
      accounts,
      goToInboxPushCounter,
      triggerAuth = noop,
      userMobileNumber,
      referralCode,
      investmentAccounts,
      loanAccounts,
      serverTime,
      cifString,
      showUpgradeEmoney,
      taptoEmoney,
      simasPoin,
      inquirySimasPoin,
      SimasPoinHistory,
      triggerAuthNav,
      investmentView,
      getMmqData,
      getMmq,
      getMmqDataDetail,
      mmqDetail,
      goToLoan,
      goToSummaryLoan,
      privateOffers,
      nav,
      openSaving,
      upgradeKyc,
      goToSavingAccount,
      goToCreditCard,
      defaultAccEmoney,
      loanMenuEnabledNTB,
      setDefaultAccEmoney,
      showDefaultAccountInfo,
      emoneyQRpermissions,
      setDefaultAccount,
      defaultAccount,
      inquiryLuckyDipCoupon,
      luckyDipCounter,
      isLuckyDipActive,
      historyIndex,
      goToSimasTaraDetail,
      openingSA,
      openingCC,
      approveAplication,
      isUsingDigisign,
      accountsCC,
      navigateToConfirmAcc,
      numberCVV,
      deleteReducer,
      getKeyVCC,
      lang,
      iPass,
      dispatch,
      goToCloseSimasTara,
      loanMenuEnabledETB,
      loanDataNew,
      lazyLogin,
    } = this.props;
    const currentCarouselIndex = result(
      this.carouselRefs,
      `${this.state.activeTab}.currentIndex`,
    );
    const emoneyAccount = find(accounts, function (o) {
      return o.accountType === 'emoneyAccount';
    });

    return (
      <DecoratedNewBankAccComponent
        setCarouselReferenceFor={this._setCarouselReferenceFor}
        tabAccounts={this.state.groupedAcc}
        historyIndex={historyIndex}
        userName={this.props.userName}
        onSnapToItem={this._onSnapToCASA}
        onSnapToTimeDepositItem={this._fetchTimeDeposit}
        onSnapToCreditCardItem={this._fetchCreditCart}
        onChangeTab={this._onChangeTab}
        navigateToTransactions={this._navigateToTransactions}
        transactions={this.state.lastTransactions}
        timeDepositDetail={this.state.timeDepositDetail}
        creditCardDetail={this.state.creditCardDetail}
        loadingError={this.state.loadingError}
        showReload={this.state.showReload}
        onReloadPress={this._onReloadPress}
        fetchTransactionsHistory={this._onChangeTab}
        showLoader={this.state.showLoader}
        onNewTD={this.processOpenTd}
        initialTab={result(navigation, 'state.params.initialTab', 0)}
        isConnected={isConnected}
        loadBalancesWithSpinner={this.props.loadBalancesWithSpinner}
        linkCreditCard={this._linkCreditCard}
        dashboardRefreshing={this.state.dashboardRefreshing}
        onDashboardRefresh={this._onDashboardRefresh}
        payCCBill={this.props.payCCBill(this.state.selectedAccount)}
        settingCC={this._navigateToCreditCardManage}
        CCtransDetail={this._navigateToCreditCardTransactionDetail}
        transactionsCC={this.state.lastTransactionsCC}
        activeTab={this.state.activeTab}
        navigateToCcHistory={this.props.navigateToCcHistory}
        serverTime={serverTime}
        userId={userId}
        transRefNum={transRefNum}
        cachedTransactions={this.state.cachedAccount}
        cachedTransactionsDeposit={
          this.state.cachedAccount.lastTransactionsDeposit
        }
        config={config}
        triggerAuth={triggerAuth}
        selectedAccount={this.state.selectedAccount}
        formValues={formValues}
        resendOTP={resendOTP}
        onCloseTD={this._navigateToCloseTD}
        accountNumber={result(this.state.selectedAccount, 'accountNumber')}
        userMobileNumber={userMobileNumber}
        referralCode={referralCode}
        investmentData={this.props.investmentDataCreate}
        investmentAccounts={investmentAccounts}
        investmentDataView={this.props.investmentDataView}
        investmentDataViewSIL={this.props.investmentDataViewSIL}
        setVisibility={this._setVisibility}
        accountVisibility={this.state.accountVisibility}
        loanAccounts={loanAccounts}
        emoney={emoneyAccount}
        cifString={cifString}
        accounts={accounts}
        goToInboxPushCounter={goToInboxPushCounter}
        showUpgradeEmoney={showUpgradeEmoney}
        cardLessWithdrawal={this.cardLessWithdrawal}
        taptoEmoney={taptoEmoney}
        goToEmoneyHistoryNavigate={this._goToEmoneyHistoryNavigate}
        simasPoin={simasPoin}
        inquirySimasPoin={inquirySimasPoin}
        SimasPoinHistory={SimasPoinHistory}
        triggerAuthNav={triggerAuthNav}
        arrowNavigateToCcHistory={this._navigateToCcHistory}
        investmentView={investmentView}
        getMmqData={getMmqData}
        getMmq={getMmq}
        getMmqDataDetail={getMmqDataDetail}
        mmqDetail={mmqDetail}
        goToLoan={goToLoan}
        goToSummaryLoan={goToSummaryLoan}
        privateOffers={privateOffers}
        goToTopUp={this.goToTopUp}
        openSaving={openSaving}
        nav={nav}
        upgradeKyc={upgradeKyc}
        goToSavingAccount={goToSavingAccount}
        goToCreditCard={goToCreditCard}
        defaultAccEmoney={defaultAccEmoney}
        loanMenuEnabledNTB={loanMenuEnabledNTB}
        setDefaultAccEmoney={setDefaultAccEmoney}
        showDefaultAccountInfo={showDefaultAccountInfo}
        emoneyQRpermissions={emoneyQRpermissions}
        setDefaultAccount={setDefaultAccount}
        defaultAccount={defaultAccount}
        inquiryLuckyDipCoupon={inquiryLuckyDipCoupon}
        luckyDipCounter={luckyDipCounter}
        isLuckyDipActive={isLuckyDipActive}
        loadBalances={this.reloadBalances}
        currentCarouselIndex={currentCarouselIndex}
        sendMail={this.sendMail}
        goToSimasTaraDetail={goToSimasTaraDetail}
        investmentDataViewStarInvestama={
          this.props.investmentDataViewStarInvestama
        }
        openingSA={openingSA}
        openingCC={openingCC}
        approveAplication={approveAplication}
        isUsingDigisign={isUsingDigisign}
        goBack={this._goBack}
        navigateToConfirm={this._navigateToConfirm}
        showVCC={this._showVCC}
        accountsCC={accountsCC}
        navigateToConfirmAcc={navigateToConfirmAcc}
        numberCVV={numberCVV}
        deleteReducer={deleteReducer}
        getKeyVCC={getKeyVCC}
        lang={lang}
        iPass={iPass}
        goToFilter={this._goToFilter}
        dispatch={dispatch}
        navigateToTransactionsFilter={this._navigateToTransactionsFilter}
        goToCloseSimasTara={goToCloseSimasTara}
        loanMenuEnabledETB={loanMenuEnabledETB}
        loanDataNew={loanDataNew}
        goToshowDormantModal={this._releaseDormant}
        lazyLogin={lazyLogin}
        navigateToConvert={this._navigateToConvert}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewBankAcc);
