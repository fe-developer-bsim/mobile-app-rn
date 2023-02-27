import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {createNavigationReducer} from 'react-navigation-redux-helpers';
import {CLEAN_APP_STATE} from '../actions/index.actions';
import {getDataAccountLS} from '../../utils/middleware.util';
import config from './config.reducer';
import user from './user.reducer';
import accounts from './accounts.reducer';
import payees from './payees.reducer';
import promos from './promos.reducer';
import billerConfig from './billerConfig.reducer';
import lastRecharges from './lastRecharges.reducer';
import lastWaterPayments from './lastWaterPayments.reducer';
import Navigator from '../../routes/index.routes';
import paymentModal from './paymentModal.reducer';
import lastPostpaidPayments from './lastPostpaidPayments.reducer';
import lastElectricityPayments from './lastElectricityPayments.reducer';
import lastFundTransactions from './lastFundTransactions.reducer';
import lastCreditCardTransactions from './lastCreditCardTransactions.reducer';
import creditCardHistory from './creditCardHistory.reducer';
import appInitKeys from './appInitKeys.reducer';
import transactions from './transactions.reducer';
import showSpinner from './showSpinner.reducer';
import tdConfig from './tdConfig.reducer';
import transRefNum from './transRefNum.reducer';
import language from './language.reducer';
import networkStatus from './networkStatus.reducer';
import additionalApiPayload from './additionalApiPayload.reducer';
import highlightText from './highlightText.reducer';
import feedback from './feedback.reducer';
import sinarmasAlert from './sinarmasAlert.reducer';
import userApiKey from './userApiKey.reducer';
import captcha from './captcha.reducer';
import dirtyMiniStatement from './dirtyMiniStatement.reducer';
import QRInvoice from './QRInvoice.reducer';
import introductionTriggered from './introductionTriggered.reducer';
import passwordRegex from './passwordRegex.reducer';
import appTimeout from './appTimeout.reducer';
import gapTimeServer from './gapTimeServer.reducer';
import investmentAccounts from './investmentAccounts.reducer';
import drawer from './drawer.reducer';
import isFaceRegistered from './faceRegistered.reducer';
import qrPromoList from './qrPromoList.reducer';
import qrMerchantList from './qrMerchantList.reducer';
import tokenSimobi from './tokenSimbobiMigration.reducer';
import faceRecognition from './faceRecognition.reducer';
import fingerprint from './fingerprint.reducer';
import hasFingerprint from './hasFingerprint.reducer';
import insuranceTravel from './insuranceTravel.reducer';
import insurancePA from './insurancePA.reducer';
import insuranceDataPA from './insuranceDataPA.reducer';
import cardlessWithdrawal from './cardlessWithdrawal.reducer';
import paydayLoan from './paydayLoan.reducer';
import loanAccounts from './loanAccounts.reducer';
import openAccountConfig from './openAccountConfig.reducer';
import paydayLoanData from './paydayLoanData.reducer';
import lastSuccessfulLogin from './lastSuccessfulLogin.reducer';
import selfieImage from './imageSelfieCamera.reducer';
import ktpImage from './imageKTPCamera.reducer';
import recurringTransfer from './recurringTransferData.reducer';
import emoney from './emoney.reducer';
import transactionsEmoney from './transactionsEmoney.reducer';
import egiftList from './egiftList.reducer';
import egiftCart from './egiftCart.reducer';
import simasPoin from './simasPoin.reducer';
import paymentStatus from './paymentStatus.reducer';
import myDataOrder from './myDataOrderList.reducer';
import listCity from './listCity.reducer';
import listProvince from './listProvince.reducer';
import listCity2 from './listCity2.reducer';
import listProvince2 from './listProvince2.reducer';
import signature from './signature.reducer';
import maritalStatus from './maritalStatus.reducer';
import checkpoint from './checkpoint.reducer';
import listDukcapil from './listDukcapil.reducer';
import openAccountData from './openAccountData.reducer';
import provinceList from './provinceList.reducer';
import cityList from './cityList.reducer';
import districtList from './districtList.reducer';
import subDistrictList from './subDistrictList.reducer';
import ccCode from './ccCode.reducer';
import numberMeter from './meterNumberElectricity.reducer';
import mobileNumber from './mobileNumberPostpaid.reducer';
import qrMerchant from './qrMerchant.reducer';
import movieCgv from './movieCgv.reducer';
import cinemaCgv from './cinemaCgv.reducer';
import comingSoonCgv from './comingSoonCgv.reducer';
import cgvCoupon from './cgvCoupon.reducer';
import egiftListPage from './egiftListPage.reducer';
import inboxCounter from './inboxCounter.reducer';
import regisTempName from './regisTempName.reducer';
import showCardlessGuide from './showCardlessGuide.reducer';
import simasPoinHistory from './simasPoinHistory.reducer';
import qrDiscount from './qrDiscount.reducer';
import qrMerchantListByCity from './qrMerchantListByCity.reducer';
import customerIdOrami from './customerIdOrami.reducer';
import couponCheck from './couponCheck.reducer';
import billerCode from './billerCode.reducer';
import deepLinkbillerCode from './deeplinkbillerCode.reducer';
import isUsingVoucherUI from './checkUsingVoucherFromUI.reducer';
import billpayHistory from './billpayHistory.reducer';
import payeeStatus from './payeeStatus.reducer';
import insuranceDataTravel from './insuranceDataTravel.reducer';
import insuranceAddParty from './insuranceAddParty.reducer';
import userPassenger from './passenger.reducer';
import flightData from './flightData.reducer';
import flightDataDetail1 from './flightDataDetail1.reducer';
import flightDataDetail2 from './flightDataDetail2.reducer';
import flightSchedule from './flightSchedule.reducer';
import txTravelDetail from './txTravelDetail.reducer';
import flightFareDetail1 from './flightFareDetail1.reducer';
import flightFareDetail2 from './flightFareDetail2.reducer';
import txTravelListPassenger from './txTravelListPassenger.reducer';
import txTravelCountryIso from './txTravelCountryIso.reducer';
import usernameAvailability from './usernameAvailability.reducer';
import getQRparams from './getQRparams.reducer';
import storenameAvailability from './storenameAvailability.reducer';
import showNewBurgerMenuIcon from './showNewBurgerMenuIcon.reducer';
import savePicture from './savePicture.reducer';
import generateCodeOnboard from './generateCodeOnboard.reducer';
import generateCode from './generateCode.reducer';
import sinarmasInputAlert from './sinarmasInputAlert.reducer';
import isLoading from './isLoading.reducer';
import genflixData from './genflixData.reducer';
import billerDescFav from './billerDescFav.reducer';
import billerFavorite from './billerFavorite.reducer';
import typeActivationDeeplink from './typeActivationDeeplink.reducer';
import saveReksadanaTransaction from './reksadanaSummaryDetailLastTrans.reducer';
import CouponPaymentStatus from './CouponPaymentStatus.reducer';
import couponCounterDetail from './couponCounterDetail.reducer';
import voucherCustList from './voucherCustList.reducer';
import paramsDeeplink from './paramsDeeplink.reducer';
import isDeeplinkExist from './isDeeplinkExist.reducer';
import paramsDeeplinkObject from './paramsDeeplinkSavingOrCC.reducer';
import qrGpnIssuer from './qrGpnIssuer.reducer';
import releaseQR from './releaseQR.reducer';
import listSavingProducts from './listSavingProducts.reducer';
import listLoanProducts from './listLoanProducts.reducer';
import savingData from './savingData.reducer';
import autoDebitList from './autoDebitList.reducer';
import counterLuckyDip from './luckyDip.reducer';
import luckyDipSaveAddress from './luckyDipAddressStore.reducer';
import ccType from './ccType.reducer';
import saveCVVnumber from './saveCVVnumber.reducer';
import ccAccounts from './ccAccounts.reducer';
import inquirySIL from './inquirySIL.reducer';
import moduleConfig from './moduleConfig.reducer';
import EForm from './EForm.reducer';
import demoAccount from './demoAccount.reducer';
import defaultAccount from './defaultAccount.reducer';
import loginData from './loginData.reducer';
import inquiryBL from './inquiryBL.reducer';
import obmStatus from './obmStatus.reducer';
import getMmq from './getMmq.reducer';
import getMmqDetail from './getMmqDetail.reducer';
import geoLocation from './geoLocation.reducer';
import listAPPuser from './listAPPuser.reducer';
import jobTypeList from './jobTypeList.reducer';
import ipAddress from './ipAddress.reducer';
import loanDataPGO from './loanAccountsPGO.reducer';
import checkingPGOModal from './checkingPGOModal.reducer';
import privateOffers from './listPrivateOffers.reducer';
import contacts from './contacts.reducer';
import selectedContacts from './selectedContacts.reducer';
import splitBillBySender from './splitBillBySender.reducer';
import splitBillByReceiver from './splitBillByReceiver.reducer';
import generateCodeTag from './generateCodeTag.reducer';
import utmAndDataLink from './utmAndRefferalCode.reducer';
import offersCount from './pgoLoanCount.reducer';
import category from './alfacartCategory.reducer';
import listAllProduct from './alfacartAllProduct.reducer';
import detailProduct from './alfacartDetailProduct.reducer';
import cartAlfacart from './cartAlfacart.reducer';
import wishlistAlfacart from './wishlistAlfacart.reducer';
import saleproductAlfacart from './saleproductAlfacart.reducer';
import allproductAlfacart from './allproductAlfacart.reducer';
import loginPreference from './loginPreference.reducer';
import obmPin from './obmPin.reducer';
import accTypeList from './accTypeList.reducer';
import tutorialProduct from './tutorialProduct.reducer';
import checkStatusInvoice from './checkStatusInvoice.reducer';
import isPgoVa from './isPGOVa.reducer';
import saveStatusSplitBill from './saveStatusSplitBill.reducer';
import labelNewSplitBill from './labelNewSplitBill.reducer';
import allProductMerchant from './allProductMerchant.reducer';
import allProductMerchantFilter from './allProductMerchantFilter.reducer';
import allProductMerchantCategory from './allProductMerchantCategory.reducer';
import merchantCart from './merchantCartProduct.reducer';
import shipmentAdressMerchant from './shipmentAddressMerchant.reducer';
import toogleMenuKoperasi from './toogleMenuKoperasi.reducer';
import confirmCheckoutAlfaProduct from './ConfrimCheckoutAlfa.reducer';
import alfacartShipmentAddress from './alfacartShipmentAddress.reducer';
import alfaShowTimeSlot from './alfaShowTimeSlot.reducer';
import defaultAddressAlfa from './alfaShowTimeSlot.reducer';
import saveResultStockAlfa from './saveResultStockAlfa.reducer';
import categoryAlfacart from './categoryAlfacart.reducer';
import paginationAlfaDashboard from './alfaCartPaginationDashboard.reducer';
import paginationAlfaSearch from './alfaCartPaginationSearch.reducer';
import listAllProductSearch from './alfacartAllProductSearch.reducer';
import counterTrxData from './counterTrxData.reducer';
import timeConfig from './timeConfig.reducer';
import newSourceofFund from './newSourceofFund.reducer';
import directDebitPartnerList from './directDebitPartnerList.reducer';
import primaryToogleAccount from './primaryAccountToogle.reducer';
import checkingCIFbeforeLogin from './checkCifbeforeLogin.reducer';
import deatilLockedAmount from './detailLockedAmount.reducer';
import priorityConfig from './priorityConfig.reducer';
import saveValueBillNew from './saveValueBillNew.reducer';
import saveListSelectedContacts from './saveListSelectedContacts.reducer';
import saveNewParticipants from './addNewList.reducer';
import utmCode from './utm.reducer';
import smartInvestasiLinkPolis from './inquirySILPolis.reducer';
import getProductListSil from './getProductListSil.reducer';
import silIdrUsd from './silChooseIdrOrUsd.reducer';
import getDropList from './getDropList.reducer';
import getProfileQuestion from './silRiskQuestion.reducer';
import getMoneyInsuredSil from './getMoneyInsuredSil.reducer';
import healthQuestion from './healthQuestion.reducer';
import cityListSIL from './getCityListSil.reducer';
import silStorage from './silStorage.reducer';
import inputPolisIndividu from './inputPolisIndividu.reducer';
import uniqueCode from './uniqueCode.reducer';
import referralCode from './referralCode.reducer';
import egiftMostSold from './egiftMostSold.reducer';
import carouselIndex from './carouselIndex.reducer';
import pushNotif from './pushNotif.reducer';
import currencyRates from './currencyRates.reducer';
import payeeCurrency from './payeeCurrency.reducer';
import saveisCutOffTimeDay from './reksadanaIsCutOffTimeDay.reducer';
import saveisResponseUnit from './reksadanaIsResponseUnit.reducer';
import provinceListStore from './provinceListStore.reducer';
import cityListStore from './cityListStore.reducer';
import districtListStore from './districtListStore.reducer';
import subDistrictListStore from './subDistrictListStore.reducer';
import getLuckyDipCache from './getCacheLuckydip.reducer';
import configVersion from './configVersion.reducer';
import inquiryStarInvestama from './inquiryStarInvestama.reducer';
import creditCardTrxManageReducer from './creditCardTransactionManage.reducer';
import creditCardBalance from './creditCardBalance.reducer';
import ccNotifSettings from './ccNotifSettings.reducer';
import timeoutReducer from './appTimeoutReducer.reducer';
import currencyPurposeRemittance from './currencyPurposeRemittance.reducer';
import senderDataRemittance from './senderDataRemittance.reducer';
import exchangeCurrencyRemittance from './exchangeCurrencyRemittance.reducer';
import getCurrencyNBSil from './getCurrencySil.reducer';

import setLimitTransactionAdd from './setLimitTransactionAdd.reducer';
import setLimitTransactionEdit from './setLimitTransactionEdit.reducer';
import setLimitTransactionDelete from './setLimitTransactionDelete.reducer';
import setLimitTransactionList from './setLimitTransactionList.reducer';

import inbankTransferList from './inbankTransferList.reducer';
import updateListLimit from './updateListLimit.reducer';
import listLimit from './listLimit.reducer';
import mPinOtp from './mPinOtp.reducer';


import setLimitStorage from './setLimitStorage.reducer';



import productCode from './productCode.reducer';
import productItems from './productItems.reducer';
import productData from './productData.reducer';
import currentSection from './currentSection.reducer';
import newOnboarding from './newOnboarding.reducer';
import deviceData from './deviceData.reducer';
import phoneBook from './listPhoneBook.reducer';
import allProductOpeningCC from './allOpeningAccountCC.reducer';
import allProductOpeningSA from './allOpeningAccountSA.reducer';
import tutorialOnboard from './tutorialOnboard.reducer';
import checkReceipt from './checkReceiptSplitBill.reducer';
import payeeStatusRemittance from './payeeStatusRemittance.reducer';
import toogleRemittance from './toogleRemittance.reducer';
import payeesRemittance from './payeesRemittance.reducer';
import productItemsSimasValas from './productItemsSimasValas.reducer';
import dataConvertSimasValas from './dataConvertSimasValas.reducer';
import autoSave from './autoSave.reducer';
import tokenRegister from './tokenRegister.reducer';
import etaxBilling from './etaxBilling.reducer';
import etaxDepositType from './etaxDepositType.reducer';
import landingOffersCount from './landingOffersCount.reducer';
import internetBankingToggle from './internetBanking.reducer';
import offerCachePosition from './offerCachePosition.reducer';
import scannerState from './scannerState.reducer';
import filteredCalendar from './filterCalendar.reducer';
import referralCodeMgm from './referralCodeMgm.reducer';
import rewardBalanceMgm from './getRewardBalanceMgm.reducer';
import historyReferralListMgm from './referralListMgm.reducer';
import totalRewardMgm from './getTotalRewardMgm.reducer';
import historyClaimRewardMgm from './claimRewardMgm.reducer';
import flagAutoDebit from './flagAutoDebit.reducer';
import autoDebitHistory from './autoDebitHistory.reducer';
import searchMetaData from './searchMetaData.reducer';
import updateRecentSearch from './updateRecentSearch.reducer';
import valueRecentSearch from './valueRecentSearch.reducer';
import valueTDSearch from './valueTimeDepositSearch.reducer';
import confirmFields from './confirmFields.reducer';
import valueOpenMerchantSearch from './valueOpenMerchantSearch.reducer';
import addFavoriteTrxSearch from './addFavoriteTrxSearch.reducer';
import randomNumber from './randomNumber.reducer';
import filteredSimplifiedIndustryList from './listIndustryNew.reducer';
import filteredSimplifiedJobList from './listJobNew.reducer';
import geolocationSimasCatalog from './geolocationSimasCatalog.reducer';
import ccInstallmentDisable from './ccInstallmentDisable.reducer';
import livenessTrxID from './livenessTrxID.reducer';
import inquiryProxyByEDW from './inquiryProxyByEDW.reducer';
import detailByCustNo from './detailByCustNo.reducer';
import addProxyAddress from './addProxyAddress.reducer';
import proxyResolution from './proxyResolution.reducer';
import proxyResolutionCT from './proxyResolutionCT.reducer';
import payeeStatusProxyAddress from './payeeStatusProxyAddress.reducer';
import payeeProxyAddress from './payeeProxyAddress.reducer';
import payeeBiFast from './payeeBiFast.reducer';
import proxyInputBiFast from './proxyInputBiFast.reducer';
import generateQRTTSTag from './generateQRTTSTag.reducer';
import ccPeriodInst from './ccPeriodInst.reducer';
import userLoanData from './userLoanData.reducer';
import currentMerchant from './currentMerchant.reducer';
import cartCMI from './cartCMI.reducer';
import wishlistCMI from './wishlistCMI.reducer';
import configEForm from './configEForm.reducer';
import valueBankList from './bankList.reducer';
import configEmoney from './configEmoney.reducer';
import chargeList from './chargeList.reducer';
import memberUser from './memberUser.reducer';
import etaxInformation from './etaxInformation.reducer';
import closeCard from './closeCard.reducer';
import closeAccountConfig from './closeAccount.reducer';

const navReducer = createNavigationReducer(Navigator);

const appReducers = combineReducers({
  form: formReducer,
  config,
  user,
  accounts,
  payees,
  billerConfig,
  lastRecharges,
  nav: navReducer,
  paymentModal,
  lastWaterPayments,
  lastPostpaidPayments,
  lastElectricityPayments,
  lastFundTransactions,
  lastCreditCardTransactions,
  appInitKeys,
  transactions,
  showSpinner,
  tdConfig,
  transRefNum,
  currentLanguage: language,
  networkStatus,
  additionalApiPayload,
  highlightText,
  creditCardHistory,
  feedback,
  promos,
  sinarmasAlert,
  userApiKey,
  captcha,
  dirtyMiniStatement,
  QRInvoice,
  introductionTriggered,
  passwordRegex,
  appTimeout,
  gapTimeServer,
  investmentAccounts,
  drawer,
  isFaceRegistered,
  qrPromoList,
  qrMerchantList,
  tokenSimobi,
  faceRecognition,
  fingerprint,
  hasFingerprint,
  insuranceTravel,
  insurancePA,
  insuranceDataPA,
  cardlessWithdrawal,
  paydayLoan,
  loanAccounts,
  openAccountConfig,
  paydayLoanData,
  lastSuccessfulLogin,
  selfieImage,
  ktpImage,
  recurringTransfer,
  emoney,
  transactionsEmoney,
  egiftList,
  egiftCart,
  simasPoin,
  paymentStatus,
  myDataOrder,
  listCity,
  listProvince,
  listCity2,
  listProvince2,
  signature,
  maritalStatus,
  checkpoint,
  listDukcapil,
  openAccountData,
  provinceList,
  cityList,
  districtList,
  subDistrictList,
  ccCode,
  numberMeter,
  mobileNumber,
  qrMerchant,
  movieCgv,
  cinemaCgv,
  comingSoonCgv,
  cgvCoupon,
  egiftListPage,
  simasPoinHistory,
  qrDiscount,
  inboxCounter,
  regisTempName,
  showCardlessGuide,
  qrMerchantListByCity,
  customerIdOrami,
  couponCheck,
  billerCode,
  deepLinkbillerCode,
  isUsingVoucherUI,
  billpayHistory,
  payeeStatus,
  insuranceDataTravel,
  insuranceAddParty,
  userPassenger,
  flightData,
  flightDataDetail1,
  flightDataDetail2,
  flightSchedule,
  txTravelDetail,
  flightFareDetail1,
  flightFareDetail2,
  txTravelListPassenger,
  txTravelCountryIso,
  usernameAvailability,
  getQRparams,
  storenameAvailability,
  showNewBurgerMenuIcon,
  savePicture,
  generateCodeOnboard,
  generateCode,
  sinarmasInputAlert,
  isLoading,
  typeActivationDeeplink,
  saveReksadanaTransaction,
  genflixData,
  billerDescFav,
  billerFavorite,
  CouponPaymentStatus,
  couponCounterDetail,
  voucherCustList,
  paramsDeeplink,
  isDeeplinkExist,
  paramsDeeplinkObject,
  qrGpnIssuer,
  releaseQR,
  listSavingProducts,
  savingData,
  autoDebitList,
  counterLuckyDip,
  ccType,
  saveCVVnumber,
  ccAccounts,
  inquirySIL,
  demoAccount,
  defaultAccount,
  loginData,
  inquiryBL,
  obmStatus,
  getMmq,
  getMmqDetail,
  geoLocation,
  moduleConfig,
  EForm,
  listLoanProducts,
  listAPPuser,
  jobTypeList,
  ipAddress,
  loanDataPGO,
  checkingPGOModal,
  privateOffers,
  contacts,
  selectedContacts,
  splitBillBySender,
  splitBillByReceiver,
  generateCodeTag,
  utmAndDataLink,
  offersCount,
  loginPreference,
  obmPin,
  luckyDipSaveAddress,
  accTypeList,
  tutorialProduct,
  checkStatusInvoice,
  isPgoVa,
  saveStatusSplitBill,
  labelNewSplitBill,
  category,
  listAllProduct,
  detailProduct,
  cartAlfacart,
  wishlistAlfacart,
  saleproductAlfacart,
  allproductAlfacart,
  allProductMerchant,
  allProductMerchantFilter,
  allProductMerchantCategory,
  merchantCart,
  shipmentAdressMerchant,
  toogleMenuKoperasi,
  timeConfig,
  newSourceofFund,
  confirmCheckoutAlfaProduct,
  alfacartShipmentAddress,
  alfaShowTimeSlot,
  defaultAddressAlfa,
  saveResultStockAlfa,
  categoryAlfacart,
  paginationAlfaDashboard,
  paginationAlfaSearch,
  listAllProductSearch,
  counterTrxData,
  directDebitPartnerList,
  deatilLockedAmount,
  priorityConfig,
  smartInvestasiLinkPolis,
  getProductListSil,
  silIdrUsd,
  getDropList,
  getProfileQuestion,
  getMoneyInsuredSil,
  healthQuestion,
  cityListSIL,
  silStorage,
  inputPolisIndividu,
  saveValueBillNew,
  saveListSelectedContacts,
  saveNewParticipants,
  pushNotif,
  primaryToogleAccount,
  checkingCIFbeforeLogin,
  utmCode,
  uniqueCode,
  referralCode,
  egiftMostSold,
  carouselIndex,
  provinceListStore,
  cityListStore,
  districtListStore,
  subDistrictListStore,
  currencyRates,
  payeeCurrency,
  setLimitTransactionAdd,
  setLimitTransactionEdit,
  setLimitTransactionDelete,
  setLimitTransactionList,
  inbankTransferList,
  updateListLimit,
  listLimit,
  mPinOtp,
  saveisCutOffTimeDay,
  saveisResponseUnit,
  getLuckyDipCache,
  configVersion,
  inquiryStarInvestama,
  creditCardTrxManageReducer,
  creditCardBalance,
  ccNotifSettings,
  timeoutReducer,
  setLimitStorage,
  getCurrencyNBSil,
  currencyPurposeRemittance,
  senderDataRemittance,
  exchangeCurrencyRemittance,
  productCode,
  productItems,
  productData,
  currentSection,
  newOnboarding,
  deviceData,
  phoneBook,
  allProductOpeningCC,
  allProductOpeningSA,
  tutorialOnboard,
  tokenRegister,
  etaxBilling,
  etaxDepositType,
  checkReceipt,
  payeeStatusRemittance,
  toogleRemittance,
  payeesRemittance,
  productItemsSimasValas,
  dataConvertSimasValas,
  autoSave,
  landingOffersCount,
  internetBankingToggle,
  offerCachePosition,
  scannerState,
  filteredCalendar,
  referralCodeMgm,
  rewardBalanceMgm,
  historyReferralListMgm,
  totalRewardMgm,
  historyClaimRewardMgm,
  flagAutoDebit,
  autoDebitHistory,
  searchMetaData,
  updateRecentSearch,
  valueRecentSearch,
  valueTDSearch,
  confirmFields,
  valueOpenMerchantSearch,
  addFavoriteTrxSearch,
  randomNumber,
  filteredSimplifiedIndustryList,
  filteredSimplifiedJobList,
  geolocationSimasCatalog,
  ccInstallmentDisable,
  livenessTrxID,
  inquiryProxyByEDW,
  detailByCustNo,
  addProxyAddress,
  proxyResolution,
  proxyResolutionCT,
  payeeStatusProxyAddress,
  payeeProxyAddress,
  payeeBiFast,
  proxyInputBiFast,
  generateQRTTSTag,
  ccPeriodInst,
  userLoanData,
  currentMerchant,
  cartCMI,
  wishlistCMI,
  configEForm,
  valueBankList,
  configEmoney,
  memberUser,
  chargeList,
  closeCard,
  closeAccountConfig,
  etaxInformation
});

const rootReducer = (state, action) => {
  if (action.type === CLEAN_APP_STATE) {
    let additionalApiPayload = state.additionalApiPayload;
    additionalApiPayload.ipassport = null;
    return appReducers({
      appInitKeys: state.appInitKeys,
      currentLanguage: state.currentLanguage,
      networkStatus: state.networkStatus,
      additionalApiPayload: additionalApiPayload,
      promos: state.promos,
      faceRecognition: state.faceRecognition,
      fingerprint: state.fingerprint,
      hasFingerprint: state.hasFingerprint,
      config: state.config,
      moduleConfig: state.moduleConfig,
      lastSuccessfulLogin: state.lastSuccessfulLogin,
      simasPoin: state.simasPoin,
      egiftList: state.egiftList,
      generateCodeOnboard: state.generateCodeOnboard,
      toogleMenuKoperasi: state.toogleMenuKoperasi,
      merchantCart: state.merchantCart,
      counterTrxData: state.counterTrxData,
      primaryToogleAccount: state.primaryToogleAccount,
      insuranceDataTravel: state.insuranceDataTravel,
      accounts: getDataAccountLS(state.accounts),
      timeConfig: state.timeConfig,
      getLuckyDipCache: state.getLuckyDipCache,
      timeoutReducer: state.timeoutReducer,
      appTimeout: state.timeoutReducer,
      randomNumber: state.randomNumber,
      inquirySIL: state.inquirySIL,
      configEForm: state.configEForm,
      valueBankList: state.valueBankList,
      configEmoney: state.configEmoney,
      chargeList: state.chargeList

    }, action);
  }
  return appReducers(state, action);
};

export default rootReducer;
