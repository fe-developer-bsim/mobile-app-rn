import * as navHeaders from './navHeaders.config';
import { createStackNavigator } from 'react-navigation-stack';
import HeaderTitle from '../components/NavHeader/HeaderTitle.component';
import React from 'react';
import {noHeader} from './navHeaders.config';
import LoginWithEasyPinAccount from '../pages/OnboardingJourney/LoginWithEasyPinAccount.page';

import AccountMenu from '../pages/Account/AccountMenu.page';
import Authenticate from '../pages/Authenticate/Authenticate.page';
import RecurringDetailListPage from '../pages/RecurringJourney/RecurringDetailList.page';
import RecurringEditingPage from '../pages/RecurringJourney/RecurringEditing.page';
import CouponList from '../pages/Coupon/CouponPage.page';
import DetailCouponList from '../pages/Coupon/CouponDetail.page';
import ShopScreen from '../pages/Profile/Shop.page';
import DetailOrders from '../pages/Egift/OrderDetail.page';
import ProductDetailScreen from '../pages/Egift/ProductDetail.page';
import LuckyDrawScreen from '../pages/LuckyDraw/LuckyDraw.page.js';
import LuckyDrawTnC from '../pages/LuckyDraw/LuckyDrawTnC.page.js';
import FavBiller from '../pages/Account/FavoriteBiller.page';
import AutodebitList from '../pages/Account/AutoDebitList.page';
import AutodebitDetail from '../pages/Account/AutoDebitDetail.page';
import AutodebitSearch from '../pages/Account/AutoDebitListSearch.page';
import AutoDebitTransactions from '../pages/Account/AutoDebitTransactions.page';

import GenericBillerListScreen from '../pages/GenericBillerList/GenericBillerList.page';

// TYPE ONE
import BillerTypeOneIndexScreen from '../pages/BillerTypeOneJourney/BillerTypeOneIndex.page';
import BillerTypeOnePaymentScreen from '../pages/BillerTypeOneJourney/BillerTypeOnePayment.page';
import BillerTypeOneConfirmationScreen from '../pages/BillerTypeOneJourney/BillerTypeOneConfirmation.page';

// TYPE TWO
import BillerTypeTwoIndexScreen from '../pages/BillerTypeTwoJourney/BillerTypeTwoIndex.page';
import BillerTypeTwoPaymentScreen from '../pages/BillerTypeTwoJourney/BillerTypeTwoPayment.page';
import BillerTypeTwoConfirmationScreen from '../pages/BillerTypeTwoJourney/BillerTypeTwoConfirmation.page';

// TYPE THREE
import BillerTypeThreeIndexScreen from '../pages/BillerTypeThreeJourney/BillerTypeThreeIndex.page';
import BillerTypeThreePaymentScreen from '../pages/BillerTypeThreeJourney/BillerTypeThreePayment.page';
import BillerTypeThreeConfirmationScreen from '../pages/BillerTypeThreeJourney/BillerTypeThreeConfirmation.page';

// TYPE SIX
import BillerTypeSixIndexScreen from '../pages/BillerTypeSixJourney/BillerTypeSixIndex.page';
import BillerTypeSixPaymentScreen from '../pages/BillerTypeSixJourney/BillerTypeSixPayment.page';
import BillerTypeSixConfirmationScreen from '../pages/BillerTypeSixJourney/BillerTypeSixConfirmation.page';

// TYPE SEVEN
import BillerTypeSevenIndexScreen from '../pages/BillerTypeSevenJourney/BillerTypeSevenIndex.page';
import BillerTypeSevenPaymentScreen from '../pages/BillerTypeSevenJourney/BillerTypeSevenPayment.page';
import BillerTypeSevenConfirmationScreen from '../pages/BillerTypeSevenJourney/BillerTypeSevenConfirmation.page';

// TYPE EIGHT
import BillerTypeEightIndexScreen from '../pages/BillerTypeEightJourney/BillerTypeEightIndex.page';
import BillerTypeEightPaymentScreen from '../pages/BillerTypeEightJourney/BillerTypeEightPayment.page';
import BillerTypeEightConfirmationScreen from '../pages/BillerTypeEightJourney/BillerTypeEightConfirmation.page';

// TYPE NINE
import BillerTypeNineIndexScreen from '../pages/BillerTypeNineJourney/BillerTypeNineIndex.page';
import BillerTypeNinePaymentScreen from '../pages/BillerTypeNineJourney/BillerTypeNinePayment.page';
import BillerTypeNineConfirmationScreen from '../pages/BillerTypeNineJourney/BillerTypeNineConfirmation.page';

import BillerTypeTenIndexScreen from '../pages/BillerTypeTenJourney/BillerTypeTenIndex.page';
import BillerTypeTenFormScreen from '../pages/BillerTypeTenJourney/BillerTypeTenForm.page';
import BillerTypeTenPaymentScreen from '../pages/BillerTypeTenJourney/BillerTypeTenPayment.page';
import BillerTypeTenConfirmationScreen from '../pages/BillerTypeTenJourney/BillerTypeTenConfirmation.page';
import BillerTypeTeSearchAreaName from '../pages/BillerTypeTenJourney/AddLocationBiller.page';

import BillerAccount from '../pages/Account/SourceAccount.page';

// FUND TRANSFER
import AddPayeeAccount from '../pages/FundTransferJourney/AddPayeeAccount.page';
import AddPayeeBank from '../pages/FundTransferJourney/AddPayeeBank.page';
import AddPayee from '../pages/FundTransferJourney/AddPayee.page';
import FundTransferPayment from '../pages/FundTransferJourney/FundTransferPayment.page';
import FundTransferPaymentFromSetLimit from '../pages/FundTransferJourney/FundTransferPaymentFromSetLimit.page';
import FundTransferConfirmationFromSetLimit from '../pages/FundTransferJourney/FundTransferPaymentConfirmationFromSetLimit.page';
import SendSourceAcc from '../pages/FundTransferJourney/SendSourceAcc.page';
import FundTransferConfirmation from '../pages/FundTransferJourney/FundTransferConfirmation.page';

import FundTransferMethodScreen from '../pages/FundTransferJourney/FundTransferMethod.page';
import FundTransferScheduleScreen from '../pages/FundTransferJourney/FundTransferSchedule.page';

import TransferAccount from '../pages/Account/SourceAccount.page';
import feedbackPage from '../pages/Home/FeedbackGetter.page';

// LuckyDIp
import LuckyDipInformation from '../pages/LuckyDraw/LuckyDipInformation.page';
import LuckyDipMain from '../pages/LuckyDraw/LuckyDip.page';
import LuckyDipInformationDetail from '../pages/LuckyDraw/LuckyDipInformationDetail.page';
import LuckyDipHistory from '../pages/LuckyDraw/LuckyDipItemPrize.page';
import LuckyDipEvoucherDetail from '../pages/LuckyDraw/LuckyDipInformationDetaileVoucher.page';
import IntroductionPage from '../pages/NewToBankOnboarding/Introduction.page';

// routes
import OpenAccountRoutes from './openAccount.routes';
import TdRoutes from './timeDeposit.routes';

// Insurance
import InsurancePage from '../pages/Insurance/Insurance.page';
import PremiPAPage from '../pages/Insurance/PremiPA.page';
import FormDataPAPage from '../pages/Insurance/formDataPA.page';
import FormDataBeneficiaryPAPage from '../pages/Insurance/FormDataBeneficiaryPA.page';
import ConfirmationPAPage from '../pages/Insurance/ConfirmationPA.page';
import ResultPAPage from '../pages/Insurance/ResultPA.page';
import DetailPAPage from '../components/Insurance/DetailInsurance.component';
import PlanTravelPage from '../pages/Insurance/PlanTravel.page';

// QR
import QRGpnRoutes from './QRGpn.routes';
import QRRegisterStatusPage from '../pages/QRGpn/QRRegisterStatus.page';
import QRTerminalStatusPage from '../pages/QRGpn/QRTerminalStatus.page';
import QRRefundStatusPage from '../pages/QRGpn/QRRefundStatus.page';
import QRTrfShow from '../pages/QRGpn/QRTrfShow.page';
import QRTrfConfirm from '../pages/QRGpn/QRTrfConfirm.page';
import QRTerminalEditStatusPage from '../pages/QRGpn/QRTerminalEditStatus.page';
import QRTerminalResetStatusPage from '../pages/QRGpn/QRTerminalResetStatus.page';
import QRTerminalDelStatusPage from '../pages/QRGpn/QRTerminalDelStatus.page';

import OfferScreen from '../pages/Profile/Offers.page';
import OfferDetailScreen from '../pages/Profile/OfferDetail.page';
import FAQform from '../pages/Help/FAQWeb.page';
import Locator from '../pages/ATMLocator/Locator.page';
import SearchATMBranch from '../pages/ATMLocator/SearchATMBranch.page';

// setting
import AccountSettings from '../pages/Account/AccountSettings.page';
import LanguageSettingScreen from '../pages/Account/LanguageSettings.page';
import LoginPreferenceScreen from '../pages/Profile/LoginPreference.page';
import FaceRecogEULAScreen from '../pages/Profile/FaceRecogEULA.page';
import FingerPrintEULAScreen from '../pages/Profile/FingerPrintEULA.page';
import InternetBankingSettingsScreen from '../pages/Account/InternetBankingSettings.page';


import ChooseProducts from '../pages/ProductOptions/ChooseProducts.page';
import ChooseCreditCard from '../pages/ProductOptions/ChooseCreditCard.page';
import ChooseSavingAccount from '../pages/ProductOptions/ChooseSavingAccount.page';
import IndigoTnC from '../pages/ProductOptions/IndigoTnC.page';
import CreateCCAccountScreen from '../pages/CreateNewAccount/RegisterPhoneEmail.page';
import CreateAccountOTPScreen from '../pages/CreateNewAccount/CreateAccountOTP.page';
import CreditCardKTPCamera from '../pages/CreateNewAccount/CreditCardKTPCamera.page';
import CcCheckpoint from '../pages/CreateNewAccount/Checkpoint.page';
import MissingForm from '../pages/CreateNewAccount/MissingForm.page';
import UpdateCifDataScreen from '../pages/CreateNewAccount/UpdateCifData.page';
import EmailFormScreen from '../pages/CreateNewAccount/EmailForm.page';
import CreditCardForm1 from '../pages/CreateNewAccount/CreditCardForm1.page';
import CreditCardForm2 from '../pages/CreateNewAccount/CreditCardForm2.page';
import CreditCardForm3 from '../pages/CreateNewAccount/CreditCardForm3.page';
import CreditCardForm4 from '../pages/CreateNewAccount/CreditCardForm4.page';
import CreditCardForm5 from '../pages/CreateNewAccount/CreditCardForm5.page';
import CreditCardForm6 from '../pages/CreateNewAccount/CreditCardForm6.page';
import CreditCardForm7 from '../pages/CreateNewAccount/CreditCardForm7.page';
import CreditCardForm8 from '../pages/CreateNewAccount/CreditCardForm8.page';
import CreditCardForm9 from '../pages/CreateNewAccount/CreditCardForm9.page';
import CreditCardNPWPCameraScreen from '../pages/CreateNewAccount/CreditCardNPWPCamera.page';
import CreditCardDeliveryScreen from '../pages/CreateNewAccount/CreditCardDelivery.page';
import CreditCardFinalizeScreen from '../pages/CreateNewAccount/CreditCardFinalizeForm.page';
import DukcapilNotMatch from '../pages/CreateNewAccount/DukcapilNotMatch.page';
import ImageConfirmationScreen from '../pages/CreateNewAccount/ImageConfirmation.page';

// Saving Account
import SavingTnC from '../pages/ProductOptions/SavingTnC.page';
import CreateSavingAccountScreen from '../pages/CreateNewSavingAccount/RegisterPhoneEmailSaving.page';
import CreateSavingAccountOTPScreen from '../pages/CreateNewSavingAccount/SavingAccountOTP.page';
import SavingKTPCamera from '../pages/CreateNewSavingAccount/SavingKTPCamera.page';
import SavingImageConfirmationScreen from '../pages/CreateNewSavingAccount/SavingImageConfirmation.page';
import SavingAccountForm1 from '../pages/CreateNewSavingAccount/SavingAccountForm1.page';
import SavingAccountForm2 from '../pages/CreateNewSavingAccount/SavingAccountForm2.page';
import SavingAccountForm3 from '../pages/CreateNewSavingAccount/SavingAccountForm3.page';
import SavingAccountForm4 from '../pages/CreateNewSavingAccount/SavingAccountForm4.page';
import SavingAccountForm5 from '../pages/CreateNewSavingAccount/SavingAccountForm5.page';
import SavingAccountForm7 from '../pages/CreateNewSavingAccount/SavingAccountForm7.page';
import SavingNPWPCamera from '../pages/CreateNewSavingAccount/SavingNPWPCamera.page';
import SavingCheckpoint from '../pages/CreateNewSavingAccount/SavingCheckpoint.page';
import SavingMissingForm from '../pages/CreateNewSavingAccount/SavingMissingForm.page';
import SavingEmailFormScreen from '../pages/CreateNewSavingAccount/SavingEmailForm.page';
import SavingAccountFinalizeScreen from '../pages/CreateNewSavingAccount/SavingAccountFinalize.page';
import SavingDukcapilNotMatch from '../pages/CreateNewSavingAccount/SavingDukcapilNotMatch.page';
import SavingAccountConfirmation from '../pages/CreateNewSavingAccount/SavingAccountConfirmation.page';
import SavingSourceAccount from '../pages/CreateNewSavingAccount/SavingSourceAccount.page';
import SmartPromoAbout from '../pages/NewToBankOnboarding/AboutSmartPromo.page';

import IdentityPage from '../pages/NewToBankOnboarding/IdentityForm.page';
import IdentitySecondPage from '../pages/NewToBankOnboarding/IdentitySecondForm.page';
import IdentityThirdPage from '../pages/NewToBankOnboarding/IdentityThirdForm.page';
import IdentityFourthPage from '../pages/NewToBankOnboarding/IdentityFourthForm.page';
import IdentityFifthPage from '../pages/NewToBankOnboarding/IdentityFifthForm.page';
import LearnMoreProductPage from '../pages/NewToBankOnboarding/LearnMoreProduct.page';
import NewAccountCameraScreen from '../pages/Camera/OpenNewAccountCamera.page';
import HowToTransferPage from '../pages/NewToBankOnboarding/HowToTransfer.page';

// EForm
import EForm from '../pages/CreateNewAccount/RenderEForm.page';
import SourceAccount from '../pages/CreateNewAccount/SourceAccount.page';
import LoanProductsPage from '../pages/ProductOptions/ChooseLoanProduct.page';
import NewEForm from '../pages/CreateNewAccount/RegisterPhoneEmailKTP.page';
import EFormLoanTnC from '../pages/CreateNewAccount/EFormLoanTnC.page';
import LoanSourceAccount from '../pages/CreateNewAccount/LoanSourceAccount.page';
import EFormLoanSuccess from '../pages/CreateNewAccount/EFormLoanSuccess.page';
import PaymentStatusNewPage from '../pages/PaymentStatus/PaymentStatusNew.page';
import UpdateEasyPin from '../pages/Profile/UpdateEasyPin.page';
import ValidatePassword from '../pages/Profile/ValidatePassword.page';
import CreateNewPassword from '../pages/Profile/CreateNewPassword.page.js';

import OnboardingRoutes from './onboarding.routes';
import ReleaseDeviceQR from '../pages/Profile/ReleaseDeviceQR.page';

// manage atm cardData
import ChooseServices from '../pages/ManageAtmCard/ChooseServices.page';
import ActiveList from '../pages/ManageAtmCard/ActiveList.page';
import BlockList from '../pages/ManageAtmCard/BlockList.page';
import CloseCard from '../pages/ManageAtmCard/CloseCard.page';
import ChooseCloseCard from '../pages/ManageAtmCard/ChooseCloseCard.page';
import ClosingTnc from '../pages/ManageAtmCard/ClosingTnc.page';

import EmoneyCloseRoutes from './emoneyClose.routes';
import ValasItem from '../pages/Valas/ValasItem.page';
import SendRoutes from './send.routes';

import TokenHistory from '../pages/TokenJourney/TokenHistory.page';
import TokenPaymentForm from '../pages/TokenJourney/TokenForm.page';
import TokenFormPayment from '../pages/TokenJourney/TokenFormPayment.page';

import MerchantList from '../pages/TokenJourney/MerchantListHistory.page';
import MMQGetDetails from '../pages/Home/MmqDataDetail.page';


// Loan
import LoanSummary from '../pages/Loan/LoanSummary.page';
import CreateSignWebView from '../pages/Loan/WebViewCreateSign.page';
import SigningWebView from '../pages/Loan/SignSignatureLoan.page';

// digi sign
import RetakeSelfie from '../pages/Loan/CameraSelfieRetake.page';
import ConfirmRetakeSelfie from '../pages/Loan/ImageConfirmationRetake.page';

// Split Bill
import SplitBillMenu from '../pages/SplitBillJourney/SplitBillMenu.page';
import SplitBillIndex from '../pages/SplitBillJourney/SplitBillIndex.page';
import SplitBillConfirmation from '../pages/SplitBillJourney/SplitBillConfirmation.page';
import DetailSplitBillMenu from '../pages/SplitBillJourney/DetailSplitBillMenu.page';
import DetailSplitBillMenuOwe from '../pages/SplitBillJourney/DetailSplitBillMenuOwe.page';
import AddNewParticipants from '../pages/SplitBillJourney/AddNewParticipants.page';
import AddPayeeSplitBill from '../pages/FundTransferJourney/AddPayee.page';

// status Revamp payment
import PaymentStatusRevampPage from '../pages/PaymentStatus/PaymentStatusRevamp.page';

import LandingRevamp from '../pages/OnboardingJourney/Landing.page';

// add new atm
import AddNewAtmChooseSavings from '../pages/ManageAtmCard/AddNewAtmChooseSavings.page';
import AddNewAtmCardChooseAddress from '../pages/ManageAtmCard/AddNewAtmCardChooseAddress.page';
import AddNewAtmSuccessScreen from '../pages/ManageAtmCard/AddNewAtmSuccessScreen.page';
import AddNewAtmCardConfirmation from '../pages/ManageAtmCard/AddNewAtmCardConfirmation.page';

// simas tara
import SimasTaraSimulation from '../pages/SimasTara/SimasTaraSimulation.page';
import SimasTaraSummary from '../pages/SimasTara/SimasTaraSummary.page';

import PaymentStatusRevamp from '../pages/PaymentStatus/PaymentStatusRevamp.page';

// set default AutoDebit
import SetDefaultAutoDebit from '../pages/Home/SetDefaultAutoDebit.page';

// ETAX Journey
import ETax from '../pages/ETaxJourney/ETaxLanding.page';
import IdBillingFormOne from '../pages/ETaxJourney/IdBillingFormOne.page';

import QrTcico from '../pages/Account/QrTcico.page';
// set Limit Transaction
import SourceAccountSetLimit from '../pages/Account/SourceAccountSetLimit.page';
import SetLimitForm1 from '../pages/Account/SetLimitForm1.page';
import SetLimitEdit from '../pages/Account/SetLimitEdit.page';
import HighValue from '../pages/Account/HighValueTransfer.page';
import SetLimitSearchableList from '../pages/Account/SetLimitSearchableList.page';
import SetLimitSearchableListHighValue from '../pages/Account/SetLimitSearchableListHighValue.page';


// Digital Account Opening
import ProductsList from '../pages/DigitalAccountOpening/ProductsList.page';
import ChooseProductsItem from '../pages/DigitalAccountOpening/ChooseProductsItem.page';
import ProductsTnC from '../pages/DigitalAccountOpening/ProductsTnC.page';
import CurrentSection from '../pages/DigitalAccountOpening/CurrentSectionForm.page';
import DigitalEForm from '../pages/DigitalAccountOpening/RenderDigitalEForm.page';
import CameraImageConfirmation from '../pages/DigitalAccountOpening/CameraImageConfirmation.page';
import DigitalEFormEmailVerification from '../pages/DigitalAccountOpening/DigitalEFormEmailVerification.page';
import DigitalEFormSuccessScreen from '../pages/DigitalAccountOpening/DigitalEFormSuccessScreen.page';

// opening account digisign
import ApproveScreenOpening from '../pages/OpeningAccountJourney/AccSuccessOpening.page';
import AccountActivationOpening from '../pages/OpeningAccountJourney/WebViewCreateSign.page';
import AccountSignDocumentOpening from '../pages/OpeningAccountJourney/SignSignatureOpeningAcc.page';
import RetakeCameraOpeningAccount from '../pages/OpeningAccountJourney/CameraSelfieRetake.page';
import ConfirmationImageOpeningAccount from '../pages/OpeningAccountJourney/ImageConfirmationRetake.page';

import EasyPinSetLimit from '../pages/Authenticate/SetLimitAuthenticate.page';
import EasyPinSetLimitHighValue from '../pages/Authenticate/SetLimitAuthenticateHighValue.page';
import EasyPinSetLimitEdit from '../pages/Authenticate/SetLimitAuthenticateEdit.page';
import EasyPinSetLimitEditFund from '../pages/Authenticate/SetLimitAuthenticateEditFund.page';
import EasyPinSetLimitEditFundConfirm from '../pages/Authenticate/SetLimitAuthenticateEditFundConfirm.page';
import FundTransferPaymentSetLimit from '../pages/FundTransferJourney/FundTransferPaymentSetLimit.page';
import FundTransferConfirmationSetLimit from '../pages/FundTransferJourney/FundTransferConfirmationSetLimit.page';
import SetLimitFromTransferConfirmation from '../pages/FundTransferJourney/SetLimitFromTransferConfirmation.page';
// open saving simas valas
import SimasValasProductTypeSelections from '../pages/SimasValas/ProductTypeSelections.page';
import SimasValasChooseCurrency from '../pages/SimasValas/SimasValasChooseCurrency.page';

import LegalPageAccount from '../pages/Account/LegalPage.page';
import Homescreen from '../pages/Home/Dashboard.page';

// Share Referral Code Mgm
import ShareReferralCode from '../pages/Mgm/ShareReferralCodeMgm.page';
import HowReferralWorks from '../pages/Mgm/HowReferralWorks.page';
import MyHistoryReward from '../pages/Mgm/MyHistoryReward.page';
import MyInvitingRecord from '../pages/Mgm/MyInvitingRecord.page';
import FilterCalendarPicker from '../pages/Mgm/FilterCalendarPicker.page';
import DetailTransactionMgm from '../pages/Mgm/TransactionDetailMgm.page';
import MgmTncReferFriend from '../pages/Mgm/MgmTncReferFriend.page';
import EmoneyUpgradeBenefit from '../pages/EmoneyJourney/EmoneyUpgradeBenefit.page';
import EmoneyUpgradeCamera from '../pages/EmoneyJourney/EmoneyUpgradeCamera.page';
import EmoneyUpgradeEmailForm from '../pages/EmoneyJourney/EmoneyUpgradeEmailForm.page';
import EmoneyUpgradeEmailVerification from '../pages/EmoneyJourney/EmoneyUpgradeEmailVerification.page';
import EmoneyKTPCamera from '../pages/EmoneyJourney/EmoneyKTPCamera.page';
import EmoneySelfieCamera from '../pages/EmoneyJourney/EmoneySelfieCamera.page';
import EmoneyKTPSelfieCamera from '../pages/EmoneyJourney/EmoneyKTPSelfieCamera.page';
import EmoneyImageConfirmation from '../pages/EmoneyJourney/EmoneyImageConfirmation.page';
import EmoneyUpgradeSuccessScreen from '../pages/EmoneyJourney/EmoneyUpgradeSuccessScreen.page';
import SimasPoinHistoryMgm from '../pages/Egift/SimasPoinHistoryMgm.page';
import AccountEditProfile from '../pages/Account/AccountEditProfile.page';
import SuccessVerification from '../pages/Account/SuccessVerification.page';
import ConfirmEditProfile from '../pages/Account/ConfirmEditProfile.page';
import ConfirmEditProfileSelfieCamera from '../pages/Account/ConfirmEditProfileSelfieCamera.page';
import ConfirmImageEditProfile from '../pages/Account/ConfirmImageEditProfile.page';

// liveness
import LivenessSection from '../pages/AAILiveness/AAIIOSLivenessView.page';

// BI Fast
import ManageBIFast from '../pages/BIFast/ManageBIFast.page';
import AddProxyBIFast from '../pages/BIFast/AddProxyBIFast.page';
import EditProxyBIFast from '../pages/BIFast/EditProxyBIFast.page';
import UnlinkProxyBIFast from '../pages/BIFast/UnlinkProxyBIFast.page';
import SelectProxyBIFast from '../pages/BIFast/SelectProxyBIFast.page';
import NewProxyConfirmationBIFast from '../pages/BIFast/NewProxyConfirmationBIFast.page';
import EasyPinBiFast from '../pages/Authenticate/BiFastEasyPin.page';
import EmailAuthenticate from '../pages/Authenticate/EmailAuthenticate.page';
import EditProxyConfirmationBIFast from '../pages/BIFast/EditProxyConfirmationBIFast.page';
import FAQformBiFast from '../pages/BIFast/FAQWebBiFast.page';

import PushNotifInbox from '../pages/Home/PushNotifInbox.page';
import MembershipDetail from '../pages/Account/MembershipDetail.page';

import UltraVoucherWebView from '../pages/OnboardingJourney/UltraVoucherWebView.page';
import UltraVoucherPaymentStatus from '../pages/OnboardingJourney/UltraVoucherPaymentStatus.page';
import UltraVoucherTnc from '../pages/OnboardingJourney/UltraVoucherTnc.page';

// Score NilaiQ
import ScoreNilaiQ from '../pages/Account/ScoreNilaiQ.page';
import FAQScoreNilaiQ from '../pages/Account/FAQScoreNilaiQ.page';
import LoginWithEasyPinPageSearch from '../pages/OnboardingJourney/LoginWithEasyPinSearch.page';

const AccountRoutes = createStackNavigator({
  AccountMenu: {
    screen: AccountMenu,
    navigationOptions: navHeaders.LandingHeaderNew2
  },
  RecurringDetailList: {
    screen: RecurringDetailListPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack='RECURRING__HEADER_TITLE' />,
      tabBarVisible: false
    }
  },
  RecurringEditing: {
    screen: RecurringEditingPage,
    navigationOptions: navHeaders.EditTransferHeader,
  },
  CouponList: {
    screen: CouponList,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='HEADER__COUPON' />,
      tabBarVisible: false
    }
  },
  DetailCouponList: {
    screen: DetailCouponList,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='HEADER__COUPON' />,
      tabBarVisible: false
    }
  },
  Shops: {
    screen: ShopScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp, headerTitle: <HeaderTitle titleWhite={'TAB_TITLE_LANDING__EVOUCHER'} />,
      tabBarVisible: false
    }
  },
  LoginWithEasyPinAccount: {
    screen: LoginWithEasyPinAccount,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand,
      tabBarVisible: false
    },
  },
  ShopProductDetail: {
    screen: ProductDetailScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'EGIFT__REDEEM_SIMAS_POIN'} />,
      tabBarVisible: false
    }
  },
  DetailOrder: {
    screen: DetailOrders,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE__SIMAS_POIN_ORDER_DETAIL'} />,
      tabBarVisible: false
    },
  },
  LuckyDipInformationPage: {
    screen: LuckyDipInformation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'LUCKY__DIP_TITLE'} />,
      tabBarVisible: false
    }
  },
  LuckyDipMainPage: {
    screen: LuckyDipMain,
    navigationOptions: navHeaders.LuckyDipRightHeader
  },
  LuckyDipInformationDetailPage: {
    screen: LuckyDipInformationDetail,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'LUCKY__DIP_TITLE'} />,
      tabBarVisible: false
    }
  },
  LuckyDipHistoryPage: {
    screen: LuckyDipHistory,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'LUCKY__DIP_TITLE'} />,
      tabBarVisible: false
    }
  },
  LuckyDipEvoucherDetailPage: {
    screen: LuckyDipEvoucherDetail,
    navigationOptions: navHeaders.EVoucherHeader,
  },
  Auth: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
  AuthSetLimit: {
    screen: Authenticate,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerGreen,
      tabBarVisible: false}
  },
  TransferScreen: {
    screen: AccountMenu,
    navigationOptions: {
      ...navHeaders.noHeader,
    }
  },
  HomeScreen: {
    screen: AccountMenu,
    navigationOptions: navHeaders.LandingHeaderNew
  },
  Onboarding: {
    screen: OnboardingRoutes,
    navigationOptions: noHeader
  },
  ReleaseDeviceQR: {
    screen: ReleaseDeviceQR,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='RELEASE__DEVICE__QR'/>,
      tabBarVisible: false
    }
  },
  LuckyDrawScreen: {
    screen: LuckyDrawScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'LUCKYDRAW__TITLE'} />,
      tabBarVisible: false
    }
  },
  LuckyDrawTnC: {
    screen: LuckyDrawTnC,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'HELP__FREQUENTLY_ASKED_QUESTIONS'} />,
      tabBarVisible: false
    }
  },
  FavBiller: {
    screen: FavBiller,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'FAVORITE_TRANSACTION'} />,
      tabBarVisible: false
    }
  },
  GenericBiller: {
    screen: GenericBillerListScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
      tabBarVisible: false
    }
  },
  PayScreen: {
    screen: AccountMenu,
    navigationOptions: {
      ...navHeaders.noHeader,
    }
  },
  // TYPE ONE
  BillerTypeOne: {
    screen: BillerTypeOneIndexScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
      tabBarVisible: false
    }
  },
  BillerTypeOnePayment: {
    screen: BillerTypeOnePaymentScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
      tabBarVisible: false
    }
  },
  BillerTypeOneConfirmation: {
    screen: BillerTypeOneConfirmationScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER_CONFIRMATION'} />,
      tabBarVisible: false
    }
  },

  // TYPE TWO
  BillerTypeTwo: {
    screen: BillerTypeTwoIndexScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
      tabBarVisible: false
    }
  },
  BillerTypeTwoPayment: {
    screen: BillerTypeTwoPaymentScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
      tabBarVisible: false
    }
  },
  BillerTypeTwoConfirmation: {
    screen: BillerTypeTwoConfirmationScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER_CONFIRMATION'} />,
      tabBarVisible: false
    }
  },

  // TYPE THREE
  BillerTypeThree: {
    screen: BillerTypeThreeIndexScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
      tabBarVisible: false
    }
  },
  BillerTypeThreePayment: {
    screen: BillerTypeThreePaymentScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
      tabBarVisible: false
    }
  },
  BillerTypeThreeConfirmation: {
    screen: BillerTypeThreeConfirmationScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER_CONFIRMATION'} />,
      tabBarVisible: false
    }
  },

  // TYPE SIX
  BillerTypeSix: {
    screen: BillerTypeSixIndexScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
      tabBarVisible: false
    }
  },
  BillerTypeSixPayment: {
    screen: BillerTypeSixPaymentScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
      tabBarVisible: false
    }
  },
  BillerTypeSixConfirmation: {
    screen: BillerTypeSixConfirmationScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER_CONFIRMATION'} />,
      tabBarVisible: false
    }
  },

  // TYPE SEVEN
  BillerTypeSeven: {
    screen: BillerTypeSevenIndexScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
      tabBarVisible: false
    }
  },
  BillerTypeSevenPayment: {
    screen: BillerTypeSevenPaymentScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
      tabBarVisible: false
    }
  },
  BillerTypeSevenConfirmation: {
    screen: BillerTypeSevenConfirmationScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER_CONFIRMATION'} />,
      tabBarVisible: false
    }
  },

  // TYPE EIGHT
  BillerTypeEight: {
    screen: BillerTypeEightIndexScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
      tabBarVisible: false
    }
  },
  BillerTypeEightPayment: {
    screen: BillerTypeEightPaymentScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
      tabBarVisible: false
    }
  },
  BillerTypeEightConfirmation: {
    screen: BillerTypeEightConfirmationScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER_CONFIRMATION'} />,
      tabBarVisible: false
    }
  },

  // TYPE NINE
  BillerTypeNine: {
    screen: BillerTypeNineIndexScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
      tabBarVisible: false
    }
  },
  BillerTypeNinePayment: {
    screen: BillerTypeNinePaymentScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
      tabBarVisible: false
    }
  },
  BillerTypeNineConfirmation: {
    screen: BillerTypeNineConfirmationScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER_CONFIRMATION'} />,
      tabBarVisible: false
    }
  },

  // TYPE TEN
  BillerTypeTen: {
    screen: BillerTypeTenIndexScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
      tabBarVisible: false
    }
  },
  BillerTypeTenForm: {
    screen: BillerTypeTenFormScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
      tabBarVisible: false
    }
  },
  BillerTypeTenPayment: {
    screen: BillerTypeTenPaymentScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
      tabBarVisible: false
    }
  },
  BillerTypeTenConfirmation: {
    screen: BillerTypeTenConfirmationScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER_CONFIRMATION'} />,
      tabBarVisible: false
    }
  },
  BillerTypeTeSearchAreaName: {
    screen: BillerTypeTeSearchAreaName,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'GENERIC_BILLER__INPUT_AREA__HEADER'} />,
      tabBarVisible: false
    }
  },
  BillerAccount: {
    screen: BillerAccount,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILL_PAY'} />,
      tabBarVisible: false
    }
  },
  AddPayee: {
    screen: AddPayee,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__SELECT_PAYEE'} />,
      tabBarVisible: false
    }
  },
  AddPayeeAccount: {
    screen: AddPayeeAccount,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__SELECT_PAYEE_ACCOUNT'} />,
      tabBarVisible: false
    }
  },
  AddPayeeBank: {
    screen: AddPayeeBank,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__SELECT_BANK'} />,
      tabBarVisible: false
    }
  },
  FundTransferPayment: {
    screen: FundTransferPayment,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
      tabBarVisible: false
    }
  },
  SendSourceAcc: {
    screen: SendSourceAcc,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
      tabBarVisible: false
    }
  },
  FundTransferConfirmation: {
    screen: FundTransferConfirmation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_CONFIRMATION'} />,
      tabBarVisible: false
    }
  },
  FundTransferMethod: {
    screen: FundTransferMethodScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
      tabBarVisible: false
    }
  },
  FundTransferSchedule: {
    screen: FundTransferScheduleScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
      tabBarVisible: false
    }
  },
  TransferSourceAccount: {
    screen: TransferAccount,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
      tabBarVisible: false
    }
  },
  EmallEasyPin: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
  ListAutodebit: {
    screen: AutodebitList,
    navigationOptions: navHeaders.listAutoDebitHeader
  },
  DetailAutodebit: {
    screen: AutodebitDetail,
    navigationOptions: navHeaders.listAutoDebitHeader
  },
  SearchAutodebit: {
    screen: AutodebitSearch,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'AUTODEBIT__LIST_TITLE'} />,
      tabBarVisible: false
    }
  },
  AutoDebitTransactions: {
    screen: AutoDebitTransactions,
    navigationOptions: navHeaders.autoDebitTransactionsHeader
  },
  TokenHistory: {
    screen: TokenHistory,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: (<HeaderTitle titleBlack={'PUSH_BILLING__TRANSACTION_MENU'} />),
      tabBarVisible: false
    }
  },
  TokenFormIndex: {
    screen: TokenPaymentForm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: (<HeaderTitle titleBlack={'TITLE__TRANSFER_CONFIRMATION'} />),
      tabBarVisible: false
    }
  },
  TokenFormPayment: {
    screen: TokenFormPayment,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: (<HeaderTitle titleBlack={'TOKEN_PAYMENT_FORM'} />),
      tabBarVisible: false
    }
  },
  MerchantList: {
    screen: MerchantList,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp,
      headerTitle: (<HeaderTitle titleWhite={'GENERATE_FORM_MERCHANT'} />),
      tabBarVisible: false
    }
  },
  // navigationOptions: {
  //   ...navHeaders.navigationOptions.headerBrandRevamp,
  //   headerTitle: <HeaderTitle titleWhite='EDIT__PROFILE'/>,
  //   tabBarVisible: false
  // }
  feedbackPage: {
    screen: feedbackPage,
    navigationOptions: {
      ...navHeaders.noHeader,
      tabBarVisible: false
    }
  },
  Introduction: {
    screen: IntroductionPage,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    },
  },
  OpenAccountScreen: {
    screen: OpenAccountRoutes,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  TdForm: {
    screen: TdRoutes,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  Insurance: {
    screen: InsurancePage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE'} />,
      tabBarVisible: false
    }
  },
  PremiPA: {
    screen: PremiPAPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE'} />,
      tabBarVisible: false
    }
  },
  formDataPA: {
    screen: FormDataPAPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE'} />,
      tabBarVisible: false
    }
  },
  FormDataBeneficiaryPA: {
    screen: FormDataBeneficiaryPAPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE'} />,
      tabBarVisible: false
    }
  },
  confirmationPA: {
    screen: ConfirmationPAPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE'} />,
      tabBarVisible: false
    }
  },
  resultPA: {
    screen: ResultPAPage,
    navigationOptions: {
      headerLeft: null,
      tabBarVisible: false
    }
  },
  PlanTravel: {
    screen: PlanTravelPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE'} />,
      tabBarVisible: false
    }
  },
  DetailPA: {
    screen: DetailPAPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE_DETAIL'} />,
      tabBarVisible: false
    }
  },
  QRGpnScreen: {
    screen: QRGpnRoutes,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  QRRegisterStatus: {
    screen: QRRegisterStatusPage,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  QRTerminalStatus: {
    screen: QRTerminalStatusPage,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  QRTerminalEditStatus: {
    screen: QRTerminalEditStatusPage,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  QRRefundStatus: {
    screen: QRRefundStatusPage,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  QRTerminalResetStatus: {
    screen: QRTerminalResetStatusPage,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  QRTerminalDelStatus: {
    screen: QRTerminalDelStatusPage,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    },
  },
  showQRTrf: {
    screen: QRTrfShow,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='DETAIL_TRANSACTION__HEADER' />,
      tabBarVisible: false
    }
  },
  QRTrfConfirm: {
    screen: QRTrfConfirm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='DETAIL_TRANSACTION__HEADER' />,
      tabBarVisible: false
    }
  },
  Offers: {
    screen: OfferScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE__OPTION_OFFERS'} />,
      tabBarVisible: false
    }
  },
  OfferDetail: {
    screen: OfferDetailScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'OFFERS__OFFER_DETAIL'} />,
      tabBarVisible: false
    }
  },
  EmoneyCloseRoutes: {
    screen: EmoneyCloseRoutes,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  FAQform: {
    screen: FAQform,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'HELP__FREQUENTLY_ASKED_QUESTIONS'} />,
      tabBarVisible: false
    }
  },
  WebForm: {
    screen: FAQform,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='DRAWER__TERM_CONDITION_LINK' />,
      tabBarVisible: false
    }
  },
  Locator: {
    screen: Locator,
    navigationOptions: navHeaders.atmLocator,
  },
  SearchATMBranch: {
    screen: SearchATMBranch,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'ATM_LOCATOR__SEARCHBYLOC'} />,
      tabBarVisible: false
    }
  },
  AccountSettings: {
    screen: AccountSettings,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack='ACCOUNT__SETTING_TITLE' />,
      tabBarVisible: false
    }
  },
  LanguageSetting: {
    screen: LanguageSettingScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE__SELECT_LANGUAGE'} />,
      tabBarVisible: false
    }
  },
  LoginPreference: {
    screen: LoginPreferenceScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE__LOGIN_PREFERENCES'} />,
      tabBarVisible: false
    }
  },
  FaceRecogEULA: {
    screen: FaceRecogEULAScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'DISCLAIMER_FACE_RECOGNITION_TITLE'} />,
      tabBarVisible: false
    }
  },
  FingerPrintEULA: {
    screen: FingerPrintEULAScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'DISCLAIMER_FINGER_PRINT_TITLE'} />,
      tabBarVisible: false
    }
  },
  InternetBankingSettings: {
    screen: InternetBankingSettingsScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE_INTERNET_BANKING'} />,
      tabBarVisible: false
    }
  },
  Landing: {
    screen: AccountMenu,
    navigationOptions: {
      ...navHeaders.noHeader,
    }
  },
  ChooseProducts: {
    screen: ChooseProducts,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='PRODUCTS__SELECTIONS'/>,
      tabBarVisible: false,
    }
  },
  ChooseCreditCard: {
    screen: ChooseCreditCard,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PRODUCTS__CREDITCARD_TITLE'} />,
      tabBarVisible: false
    }
  },
  ChooseSavingAccount: {
    screen: ChooseSavingAccount,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PRODUCTS__SAVING_TITLE'} />,
      tabBarVisible: false
    }
  },
  IndigoTnC: {
    screen: IndigoTnC,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PRODUCTS__CREDITCARD_TITLE'} />,
      tabBarVisible: false
    }
  },
  ProductDetail: {
    screen: ProductDetailScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'EGIFT__REDEEM_SIMAS_POIN'} />,
      tabBarVisible: false
    }
  },
  CreateCCAccount: {
    screen: CreateCCAccountScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'CREDITCARD__NAVBAR'} />,
      tabBarVisible: false
    }
  },
  CreateAccountOTP: {
    screen: CreateAccountOTPScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerGreen,
      tabBarVisible: false
    }
  },
  UpdateCifData: {
    screen: UpdateCifDataScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  CreditCardKTPCamera: {
    screen: CreditCardKTPCamera,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  EmailForm: {
    screen: EmailFormScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  Checkpoint: {
    screen: CcCheckpoint,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  MissingForm: {
    screen: MissingForm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  CreditCardForm1: {
    screen: CreditCardForm1,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  CreditCardForm2: {
    screen: CreditCardForm2,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  CreditCardForm3: {
    screen: CreditCardForm3,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  CreditCardForm4: {
    screen: CreditCardForm4,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  CreditCardForm5: {
    screen: CreditCardForm5,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  CreditCardForm6: {
    screen: CreditCardForm6,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  CreditCardForm7: {
    screen: CreditCardForm7,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  CreditCardForm8: {
    screen: CreditCardForm8,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  CreditCardForm9: {
    screen: CreditCardForm9,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  CreditCardNPWPCamera: {
    screen: CreditCardNPWPCameraScreen,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    },
  },
  CreditCardDelivery: {
    screen: CreditCardDeliveryScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  CreditCardFinalize: {
    screen: CreditCardFinalizeScreen,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    },
  },
  DukcapilNotMatch: {
    screen: DukcapilNotMatch,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  ImageConfirmation: {
    screen: ImageConfirmationScreen,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  SavingTnC: {
    screen: SavingTnC,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PRODUCTS__SAVING_TITLE'} />,
      tabBarVisible: false
    }
  },
  CreateSavingAccount: {
    screen: CreateSavingAccountScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'CREDITCARD__NAVBAR'} />,
      tabBarVisible: false
    }
  },
  SavingAccountOTP: {
    screen: CreateSavingAccountOTPScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerGreen,
      tabBarVisible: false
    }
  },
  SavingKTPCamera: {
    screen: SavingKTPCamera,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    },
  },
  SavingImageConfirmation: {
    screen: SavingImageConfirmationScreen,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    },
  },
  SavingEmailForm: {
    screen: SavingEmailFormScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  SavingAccountForm1: {
    screen: SavingAccountForm1,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  SavingAccountForm2: {
    screen: SavingAccountForm2,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  SavingAccountForm3: {
    screen: SavingAccountForm3,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  SavingAccountForm4: {
    screen: SavingAccountForm4,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  SavingAccountForm5: {
    screen: SavingAccountForm5,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  SavingAccountForm7: {
    screen: SavingAccountForm7,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  SavingNPWPCamera: {
    screen: SavingNPWPCamera,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    },
  },
  SavingCheckpoint: {
    screen: SavingCheckpoint,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  SavingMissingForm: {
    screen: SavingMissingForm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  SavingAccountFinalize: {
    screen: SavingAccountFinalizeScreen,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    },
  },
  SavingDukcapilNotMatch: {
    screen: SavingDukcapilNotMatch,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  SavingAccountConfirmation: {
    screen: SavingAccountConfirmation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  SavingAccountEasyPIN: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
  SavingSourceAccount: {
    screen: SavingSourceAccount,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
      tabBarVisible: false
    }
  },
  SmartPromoAbout: {
    screen: SmartPromoAbout,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='IDENTITYTHIRDFORM__LEARN_ABOUT_PRODUCT_WEB_PAGE'/>,
      tabBarVisible: false
    }
  },
  IdentityForm: {
    screen: IdentityPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='IDENTITYFIFTHFORM__TITLE_HEADER_BAR'/>,
      tabBarVisible: false
    }
  },
  IdentitySecondForm: {
    screen: IdentitySecondPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='IDENTITYFIFTHFORM__TITLE_HEADER_BAR'/>,
      tabBarVisible: false
    }
  },
  IdentityThirdForm: {
    screen: IdentityThirdPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='IDENTITYFIFTHFORM__TITLE_HEADER_BAR'/>,
      tabBarVisible: false
    }
  },
  IdentityFourthForm: {
    screen: IdentityFourthPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='IDENTITYFIFTHFORM__TITLE_HEADER_BAR'/>,
      tabBarVisible: false
    }
  },
  IdentityFifthForm: {
    screen: IdentityFifthPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='IDENTITYFIFTHFORM__TITLE_HEADER'/>,
      tabBarVisible: false
    }
  },
  NewAccountCameraPage: {
    screen: NewAccountCameraScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='OPEN_NEW_ACCOUNT__TITLE'/>,
      tabBarVisible: false
    }
  },
  LearnMoreProductPage: {
    screen: LearnMoreProductPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='IDENTITYTHIRDFORM__LEARN_ABOUT_PRODUCT_WEB_PAGE'/>,
      tabBarVisible: false
    }
  },
  HowToTransferPage: {
    screen: HowToTransferPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='HOWTOTRANSFER__TITLE'/>,
    }
  },
  EForm: {
    screen: EForm,
    navigationOptions: navHeaders.eformHeaderPGO,
  },
  SourceAccount: {
    screen: SourceAccount,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'CREDITCARD__NAVBAR'} />,
      tabBarVisible: false
    }
  },
  ChooseLoanAccount: {
    screen: LoanProductsPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PRODUCTS__LOAN_TITLE'} />,
      tabBarVisible: false
    }
  },
  NewEForm: {
    screen: NewEForm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'CREDITCARD__NAVBAR'} />,
      tabBarVisible: false
    }
  },
  LoanSourceAccount: {
    screen: LoanSourceAccount,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'CREDITCARD__NAVBAR'} />,
      tabBarVisible: false
    }
  },
  EFormLoanTnC: {
    screen: EFormLoanTnC,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PGO__TITLE_LOAN'} />,
      tabBarVisible: false
    }
  },
  EFormLoanSuccess: {
    screen: EFormLoanSuccess,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PGO__TITLE_LOAN'} />,
      tabBarVisible: false
    }
  },
  PaymentStatusNew: {
    screen: PaymentStatusNewPage,
    navigationOptions: {
      header: null,
      tabBarVisible: false
    }
  },
  UpdateEasyPin: {
    screen: UpdateEasyPin,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='PROFILE__EASYPIN_TITLE'/>,
      tabBarVisible: false
    }
  },
  ValidatePassword: {
    screen: ValidatePassword,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'CHANGE_PASSWORD__TITLE'} />,
      tabBarVisible: false
    },
  },
  CreateNewPassword: {
    screen: CreateNewPassword,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'CHANGE_PASSWORD__TITLE'} />,
      tabBarVisible: false
    },
  },
  AuthDashboard: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
  ChooseServices: {
    screen: ChooseServices,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp, headerTitle: <HeaderTitle titleWhite={'SERVICES__SELECTIONS'} />,
      tabBarVisible: false
    }
  },
  ActiveList: {
    screen: ActiveList,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'HEADER__ACTIVATE_ATM_CARD'} />,
      tabBarVisible: false
    }
  },
  BlockList: {
    screen: BlockList,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'HEADER__BLOCKED_ATM_CARD'} />,
      tabBarVisible: false
    }
  },
  ValasItem: {
    screen: ValasItem,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='DRAWER__EXCHANGE_RATES'/>,
      tabBarVisible: false
    }
  },
  QrTcico: {
    screen: QrTcico,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp, headerTitle: <HeaderTitle titleWhiteTrf={'QRTICO_HEADER_TITLE'} />,
      tabBarVisible: false
    }
  },
  SendRoutes: {
    screen: SendRoutes,
    navigationOptions: noHeader
  },
  SplitBillMenu: {
    screen: SplitBillMenu,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle titleWhiteTrf={'BURGER_MENU__SPLITBILL'} />,
      tabBarVisible: false
    }
  },
  SplitBillIndex: {
    screen: SplitBillIndex,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle titleWhiteTrf={'SPLITBILL__INDEX_HEADER'} />,
      tabBarVisible: false
    }
  },
  FromQRSplitBillIndex: {
    screen: SplitBillIndex,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle titleWhiteTrf={'SPLITBILL__INDEX_HEADER'} />,
      tabBarVisible: false
    }
  },
  FromQRSplitBillConfirmation: {
    screen: SplitBillConfirmation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'BURGER_MENU__SPLITBILL'} />,
      tabBarVisible: false
    }
  },
  SplitBillConfirmation: {
    screen: SplitBillConfirmation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle titleWhiteTrf={'BURGER_MENU__SPLITBILL'} />,
      tabBarVisible: false
    }
  },
  AddNewParticipants: {
    screen: AddNewParticipants,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle titleWhiteTrf={'SPLITBILL__INDEX_HEADER'} />,
      tabBarVisible: false
    }
  },
  DetailSplitBillMenu: {
    screen: DetailSplitBillMenu,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle titleWhiteTrf={'BURGER_MENU__SPLITBILL'} />,
      tabBarVisible: false
    }
  },
  DetailSplitBillMenuOwe: {
    screen: DetailSplitBillMenuOwe,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle titleWhiteTrf={'BURGER_MENU__SPLITBILL'} />,
      tabBarVisible: false
    }
  },
  TransferSourceAccountSplitBill: {
    screen: TransferAccount,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
      tabBarVisible: false
    }
  },
  // Masih Error disini nih transfernya
  FundTransferPaymentSplitBill: {
    screen: FundTransferPayment,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle titleWhiteTrf={'GENERATE_CODE_MAIN_OFFLINE_PAY'} />,
      tabBarVisible: false
    }
  },
  ConfirmScreenSplitBill: {
    screen: FundTransferConfirmation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle titleWhiteTrf={'TITLE__TRANSFER_CONFIRMATION'} />,
      tabBarVisible: false
    }
  },
  AuthTransferBill: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
  TransferScreenBill: {
    screen: AccountMenu,
    path: 'index',
    navigationOptions: navHeaders.LandingHeaderNew
  },
  PaymentStatusRevampOnboarding: {
    screen: PaymentStatusRevampPage,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  AddNewAtmChooseSavings: {
    screen: AddNewAtmChooseSavings,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp, headerTitle: <HeaderTitle titleWhiteTrf={'HEADER__ADD_NEW_ATM_CARD'}/>,
      tabBarVisible: false
    }
  },
  AddNewAtmCardChooseAddress: {
    screen: AddNewAtmCardChooseAddress,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      tabBarVisible: false
    }
  },
  MMQGetDetailsPage: {
    screen: MMQGetDetails,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='HEADER__MMQ_CERTIFICATE' />,
      tabBarVisible: false
    }
  },
  LoanSummaryPage: {
    screen: LoanSummary,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  HomeScreenSplitBill: {
    screen: AccountMenu,
    navigationOptions: navHeaders.LandingHeaderNew
  },
  LandingRevamp: {
    screen: LandingRevamp,
    path: 'index',
    navigationOptions: navHeaders.LandingHeaderNew
  },
  ProfileSplitBill: {
    screen: AccountMenu,
    navigationOptions: navHeaders.LandingHeaderNew
  },
  AddPayeeSplitBill: {
    screen: AddPayeeSplitBill,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__SELECT_PAYEE'} />,
      tabBarVisible: false
    }
  },

  CreateSignWebViewPage: {
    screen: CreateSignWebView,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='DIGI_SIGN_HEADER' />,
      tabBarVisible: false
    }
  },
  SigningWebViewPage: {
    screen: SigningWebView,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='DIGI_SIGN_HEADER' />,
      tabBarVisible: false
    }
  },
  RetakeSelfiePage: {
    screen: RetakeSelfie,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  ConfirmRetakeSelfiePage: {
    screen: ConfirmRetakeSelfie,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  PaymentStatusRevamp: {
    screen: PaymentStatusRevamp,
    navigationOptions: {
      header: null,
      tabBarVisible: false
    }
  },
  SimasTaraSimulationPage: {
    screen: SimasTaraSimulation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='HEADER__SIMAS_TARA_SIMULATION' />,
      tabBarVisible: false
    }
  },
  SimasTaraSummaryPage: {
    screen: SimasTaraSummary,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='HEADER__SIMAS_TARA_SUMMARY' />,
      tabBarVisible: false
    }
  },
  SetDefaultAutoDebitScreen: {
    screen: SetDefaultAutoDebit,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp, headerTitle: <HeaderTitle titleWhiteTrf={'SET_AUTODEBIT_TITTLE'} />,
      tabBarVisible: false
    }
  },
  SourceAccountSetLimit: {
    screen: SourceAccountSetLimit,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerPinkBrand, headerTitle: <HeaderTitle titleWhite={'TIME_DEPOSIT__PAY_FROM'} />,
      tabBarVisible: false
    }
  },
  SetLimitForm1: {
    screen: SetLimitForm1,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerPinkBrand, headerTitle: <HeaderTitle titleWhite={'SET_TRANSFER_LIMIT'} />,
      tabBarVisible: false
    }
  },
  SetLimitEdit: {
    screen: SetLimitEdit,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerPinkBrand, headerTitle: <HeaderTitle titleWhite={'SET_TRANSFER_LIMIT'} />,
      tabBarVisible: false
    }
  },

  HighValue: {
    screen: HighValue,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerPinkBrand, headerTitle: <HeaderTitle titleWhite={'SET_TRANSFER_LIMIT'} isTrfLimit={true}/>,
      tabBarVisible: false
    }
  },
  SetLimitSearchableList: {
    screen: SetLimitSearchableList,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerPinkBrand, headerTitle: <HeaderTitle titleWhite={'TRANSFER_TO_LIMIT'} />,
    }
  },
  SetLimitSearchableListHighValue: {
    screen: SetLimitSearchableListHighValue,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerPinkBrand, headerTitle: <HeaderTitle titleWhite={'TRANSFER_TO_LIMIT'} />,
    }
  },

  ETax: {
    screen: ETax,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp, headerTitle: <HeaderTitle titleWhiteTrf='E_TAX_HEADER' />,
      tabBarVisible: false
    }
  },

  IdBillingFormOne: {
    screen: IdBillingFormOne,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp, headerTitle: <HeaderTitle titleWhiteTrf='E_TAX_HEADER' />,
      tabBarVisible: false
    }
  },

  // Digital Account Opening - Start here
  ProductsList: {
    screen: ProductsList,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle langKey={'PRODUCTS__SELECTIONS'} />,
      tabBarVisible: false
    }
  },
  ChooseProductsItem: {
    screen: ChooseProductsItem,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle langKey={'PRODUCTS__SELECTIONS'} />,
      tabBarVisible: false
    }
  },
  ProductsTnC: {
    screen: ProductsTnC,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle langKey={'GENERIC__TERM_AND_CONDITION'} />,
      tabBarVisible: false
    }
  },
  CurrentSection: {
    screen: CurrentSection,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle langKey={'EFORM__NAVBAR'} />,
      tabBarVisible: false
    }
  },
  DigitalEForm: {
    screen: DigitalEForm,
    navigationOptions: navHeaders.eformHeader,
  },
  CameraImageConfirmation: {
    screen: CameraImageConfirmation,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    },
  },
  DigitalEFormEmailVerification: {
    screen: DigitalEFormEmailVerification,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'EFORM__NAVBAR'} />,
      tabBarVisible: false
    }
  },
  DigitalEFormSuccessScreen: {
    screen: DigitalEFormSuccessScreen,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  ApproveAplicationPage: {
    screen: ApproveScreenOpening,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='' />,
      tabBarVisible: false
    }
  },
  ActivationAccountPage: {
    screen: AccountActivationOpening,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='' />,
      tabBarVisible: false
    }
  },
  SigningWebViewAccountOpeningPage: {
    screen: AccountSignDocumentOpening,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='' />,
      tabBarVisible: false
    }
  },
  RetakeCameraOpeningAccountPage: {
    screen: RetakeCameraOpeningAccount,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  ConfirmationImageOpeningAccountPage: {
    screen: ConfirmationImageOpeningAccount,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  SimasValasProductTypeSelections: {
    screen: SimasValasProductTypeSelections,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PRODUCTS__SELECTIONS'} />,
      tabBarVisible: false
    }
  },
  SimasValasChooseCurrency: {
    screen: SimasValasChooseCurrency,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='HEADER_OPEN_SAVING_SIMAS_VALAS' />,
      tabBarVisible: false
    }
  },
  TnCPageAccount: {
    screen: LegalPageAccount,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle langKey={'LEGAL_MENU_TERMS'} />,
      tabBarVisible: false
    }
  },
  PrivacyPageAccount: {
    screen: LegalPageAccount,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle langKey={'LEGAL_MENU_PRIVACY'} />,
      tabBarVisible: false
    }
  },
  EasyPinSetLimit: {
    screen: EasyPinSetLimit,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand,
      tabBarVisible: false}
  },
  EasyPinSetLimitHighValue: {
    screen: EasyPinSetLimitHighValue,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand,
      tabBarVisible: false}
  },
  EasyPinSetLimitEdit: {
    screen: EasyPinSetLimitEdit,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand,
      tabBarVisible: false}
  },
  EasyPinSetLimitEditFund: {
    screen: EasyPinSetLimitEditFund,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand,
      tabBarVisible: false}
  },
  EasyPinSetLimitEditFundConfirm: {
    screen: EasyPinSetLimitEditFundConfirm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand,
      tabBarVisible: false}
  },
  FundTransferPaymentSetLimit: {
    screen: FundTransferPaymentSetLimit,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
      tabBarVisible: false
    }
  },
  FundTransferConfirmationSetLimit: {
    screen: FundTransferConfirmationSetLimit,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_CONFIRMATION'} />,
      tabBarVisible: false
    }
  },
  SetLimitFromTransferConfirmation: {
    screen: SetLimitFromTransferConfirmation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerPinkBrand, headerTitle: <HeaderTitle titleWhite={'SET_TRANSFER_LIMIT'} />,
      tabBarVisible: false
    }
  },
  FundTransferPaymentFromSetLimit: {
    screen: FundTransferPaymentFromSetLimit,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
      tabBarVisible: false
    }
  },
  FundTransferConfirmationFromSetLimit: {
    screen: FundTransferConfirmationFromSetLimit,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_CONFIRMATION'} />,
      tabBarVisible: false
    }
  },
  ShareReferralCode: {
    screen: ShareReferralCode,
    navigationOptions: navHeaders.mgmReferFriend,
  },
  HowReferralWorks: {
    screen: HowReferralWorks,
    navigationOptions: navHeaders.mgmHowReferral,
  },
  MyHistoryReward: {
    screen: MyHistoryReward,
    navigationOptions: navHeaders.mgmHistoryReward,
  },
  MyInvitingRecord: {
    screen: MyInvitingRecord,
    navigationOptions: navHeaders.mgmInvitingRecord,
  },
  FilterCalendarPicker: {
    screen: FilterCalendarPicker,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  DetailTransactionMgm: {
    screen: DetailTransactionMgm,
    navigationOptions: navHeaders.mgmDetailTrans,
  },
  MgmTncReferFriend: {
    screen: MgmTncReferFriend,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  EmoneyUpgradeBenefit: {
    screen: EmoneyUpgradeBenefit,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'UPGRADE__EMONEY'} />,
      tabBarVisible: false
    }
  },
  EmoneyUpgradeCamera: {
    screen: EmoneyUpgradeCamera,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'EMONEY__UPGRADE'} />,
      tabBarVisible: false
    }
  },
  EmoneyUpgradeEmailForm: {
    screen: EmoneyUpgradeEmailForm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'EMONEY__UPGRADE'} />,
      tabBarVisible: false
    }
  },
  EmoneyUpgradeEmailVerification: {
    screen: EmoneyUpgradeEmailVerification,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'EMONEY__UPGRADE'} />,
      tabBarVisible: false
    }
  },
  EmoneyKTPCamera: {
    screen: EmoneyKTPCamera,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  EmoneyKTPSelfieCamera: {
    screen: EmoneyKTPSelfieCamera,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  EmoneySelfieCamera: {
    screen: EmoneySelfieCamera,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  EmoneyImageConfirmation: {
    screen: EmoneyImageConfirmation,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  EmoneyUpgradeAuth: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
  EmoneyUpgradeSuccessScreen: {
    screen: EmoneyUpgradeSuccessScreen,
    navigationOptions: navHeaders.closeHeader
  },
  HomeScreens: {
    screen: Homescreen,
    navigationOptions: navHeaders.DashboardNavConfig
  },
  SimasPoinHistory: {
    screen: SimasPoinHistoryMgm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp, headerTitle: <HeaderTitle titleWhiteTrf='SIMAS_POIN__HISTORY'/>,
      tabBarVisible: false
    }
  },
  AccountEditProfile: {
    screen: AccountEditProfile,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp,
      headerTitle: <HeaderTitle titleWhite='EDIT__PROFILE'/>,
      tabBarVisible: false
    }
  },
  SuccessVerification: {
    screen: SuccessVerification,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  ConfirmEditProfile: {
    screen: ConfirmEditProfile,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp,
      headerTitle: <HeaderTitle titleWhite='REQUEST__DATA_CHANGE'/>,
      tabBarVisible: false
    }
  },
  ConfirmEditProfileSelfieCamera: {
    screen: ConfirmEditProfileSelfieCamera,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  ConfirmImageEditProfile: {
    screen: ConfirmImageEditProfile,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  ConfirmationAuth: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
  AddNewAtmSuccessScreen: {
    screen: AddNewAtmSuccessScreen,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  TransferScreenSetLimit: {
    screen: AccountMenu,
    navigationOptions: {
      ...navHeaders.noHeader,
    }
  },
  LandingSetLimit: {
    screen: AccountMenu,
    navigationOptions: {
      ...navHeaders.noHeader,
    }
  },
  AuthTransfer: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
  LivenessSection: {
    screen: LivenessSection,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={''} />,
      tabBarVisible: false
    }
  },
  ManageBIFast: {
    screen: ManageBIFast,
    navigationOptions: {
      ...navHeaders.noHeader,
      tabBarVisible: false
    }
  },
  AddProxyBIFast: {
    screen: AddProxyBIFast,
    navigationOptions: {
      ...navHeaders.noHeader,
      tabBarVisible: false
    }
  },
  EditProxyBIFast: {
    screen: EditProxyBIFast,
    navigationOptions: {
      ...navHeaders.noHeader,
      tabBarVisible: false
    }
  },
  UnlinkProxyBIFast: {
    screen: UnlinkProxyBIFast,
    navigationOptions: {
      ...navHeaders.noHeader,
      tabBarVisible: false
    }
  },
  SelectProxyBIFast: {
    screen: SelectProxyBIFast,
    navigationOptions: {
      ...navHeaders.noHeader,
      tabBarVisible: false
    }
  },
  NewProxyConfirmationBIFast: {
    screen: NewProxyConfirmationBIFast,
    navigationOptions: navHeaders.confirmTransferProxy
  },
  EasyPinBiFast: {
    screen: EasyPinBiFast,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand,
      tabBarVisible: false}
  },
  AuthBiFast: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
  EmailAuth: {
    screen: EmailAuthenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
  EditProxyConfirmationBIFast: {
    screen: EditProxyConfirmationBIFast,
    navigationOptions: navHeaders.confirmTransferProxy
  },
  PushNotifInbox: {
    screen: PushNotifInbox,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand, headerTitle: <HeaderTitle titleBold='LOGIN__APPNAME'/>,
      tabBarVisible: false
    }
  },
  FAQformBiFast: {
    screen: FAQformBiFast,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'HELP__FREQUENTLY_ASKED_QUESTIONS'} />,
      tabBarVisible: false
    }
  },
  MembershipDetail: {
    screen: MembershipDetail,
    navigationOptions: navHeaders.membershipHeader
  },
  ScoreNilaiQ: {
    screen: ScoreNilaiQ,
    navigationOptions: navHeaders.scoreNilaiQHeader
  },
  FAQScoreNilaiQ: {
    screen: FAQScoreNilaiQ,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'HELP__FREQUENTLY_ASKED_QUESTIONS'} />,
      tabBarVisible: false
    }
  },
  LoginWithEasyPinSearch: {
    screen: LoginWithEasyPinPageSearch,
    navigationOptions: navHeaders.LoginPasswordInHeader
  },
  UltraVoucherWebView: {
    screen: UltraVoucherWebView,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },

  UltraVoucherPaymentStatus: {
    screen: UltraVoucherPaymentStatus,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  UltraVoucherTnc: {
    screen: UltraVoucherTnc,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'ALFACART_TEXT_TNC_TITLE'} />,
    }
  },
  AddNewAtmCardConfirmation: {
    screen: AddNewAtmCardConfirmation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      tabBarVisible: false
    }
  },
  ProductsListUpgradeEmoney: {
    screen: ProductsList,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle langKey={'UPGRADE__EMONEY'} />,
      tabBarVisible: false
    }
  },
  CloseCard: {
    screen: CloseCard,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'CLOSE__SAVING_ACCOUNT'} />,
      tabBarVisible: false
    }
  },
  ChooseCloseCard: {
    screen: ChooseCloseCard,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, 
      headerTitle: <HeaderTitle titleBlack={'CLOSE__SAVING_ACCOUNT'} />,
      tabBarVisible: false
    }
  },
  ClosingTnc: {
    screen: ClosingTnc,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'GENERIC__TERMS_AND_CONDITIONS'}/>,
      tabBarVisible: false
    }
  },
  ClosingAccAuth: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  }
}, {
  cardStyle: {
    backgroundColor: 'white'
  }
});


export default AccountRoutes;
