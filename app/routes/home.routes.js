/* eslint-disable no-dupe-keys */
import * as navHeaders from './navHeaders.config';
import { createStackNavigator } from 'react-navigation-stack';
import {noHeader} from './navHeaders.config';

import CreditCardManagePage from '../pages/CreditCardManageJourney/CreditCardManage.page';
import CreditCardManageInputPage from '../pages/CreditCardManageJourney/CreditCardManageInput.page';
import CreditCardManageConfirmationPage from '../pages/CreditCardManageJourney/CreditCardManageConfirmation.page';

import Homescreen from '../pages/Home/Dashboard.page';
import Transactions from '../pages/Transactions/Transactions.page';
import TransactionsFilter from '../pages/Transactions/TransactionsFilter.page';
import CcHistory from '../pages/CreditCardHistoryJourney/CreditCardHistory.page';
import CcDownloadScreen from '../pages/CreditCardHistoryJourney/CreditCardHistoryOptions.page';
import CcDownloadToScreen from '../pages/CreditCardHistoryJourney/OrderDetail.page';
import CloseTdConfirmation from '../pages/Home/TdCloseConfirmation.page';
import ProfileRoutes from './profile.routes';
import React from 'react';
import HeaderTitle from '../components/NavHeader/HeaderTitle.component';
import TdDisclaimerScreen from '../pages/TdJourney/TdDisclaimer.page';
import MGMScreen from '../pages/Home/ShareReferralCode.page';
import InvestmentScreen from '../pages/InvestmentJourney/InvestmentProduct.page';
import DetailTransactionScreen from '../pages/Transactions/TransactionDetail.page';
import Authenticate from '../pages/Authenticate/Authenticate.page';

import ValidatePassword from '../pages/Profile/ValidatePassword.page';
import ChangeEasyPinNew from '../pages/Profile/ChangeEasyPinNew.page';
import ChangeEasyPinConfirm from '../pages/Profile/ChangeEasyPinConfirm.page';
import ChangeEasyPinPasswordValidate from '../pages/Profile/ChangeEasyPinPasswordValidate.page';
import CreateNewPassword from '../pages/Profile/CreateNewPassword.page.js';
import SimasPoinWEB from '../pages/Profile/SimasPoinWEB.page';

import UpdateEasyPin from '../pages/Profile/UpdateEasyPin.page';

import Helpscreen from '../pages/Help/Help.page';
import FAQform from '../pages/Help/FAQWeb.page';

import FaceRecognitionRoutes from './faceRecognition.routes';

import InsurancePage from '../pages/Insurance/Insurance.page';
import PremiPAPage from '../pages/Insurance/PremiPA.page';
import FormDataPAPage from '../pages/Insurance/formDataPA.page';
import FormDataBeneficiaryPAPage from '../pages/Insurance/FormDataBeneficiaryPA.page';
import ConfirmationPAPage from '../pages/Insurance/ConfirmationPA.page';
import ResultPAPage from '../pages/Insurance/ResultPA.page';
import DetailPAPage from '../components/Insurance/DetailInsurance.component';
import TravelDetailPage from '../pages/Insurance/TravelAssuranceFormDetail.page';
import TravelCustomerFormPage from '../pages/Insurance/TravelAssuranceFormCustomers.page';
import TravelBeneficiaryPage from '../pages/Insurance/TravelAssuranceFormBeneficiary.page';
import TravelConfirmPage from '../pages/Insurance/TravelAssuranceFormConfirm.page';
import TravelResultPage from '../pages/Insurance/TravelAssuranceFormResult.page';
import TravelCustomerPage from '../pages/Insurance/TravelAssuranceCustomer.page';
import TravelInsurancePage from '../pages/Insurance/TravelInsurance.page';
import PlanTravelPage from '../pages/Insurance/PlanTravel.page';
import TravelInsuranceTnC from '../pages/Insurance/TravelInsuranceTnC.page';

import OpenAccountRoutes from './openAccount.routes';
import TdRoutes from './timeDeposit.routes';
import QRGpnRoutes from './QRGpn.routes';
import QRRegisterStatusPage from '../pages/QRGpn/QRRegisterStatus.page';
import QRTerminalStatusPage from '../pages/QRGpn/QRTerminalStatus.page';
import QRRefundStatusPage from '../pages/QRGpn/QRRefundStatus.page';
import QRTrfShow from '../pages/QRGpn/QRTrfShow.page';
import QRTrfConfirm from '../pages/QRGpn/QRTrfConfirm.page';
import QRTerminalEditStatusPage from '../pages/QRGpn/QRTerminalEditStatus.page';


import EmoneyCloseRoutes from './emoneyClose.routes';

import RedeemSmartfrenPage from '../pages/Home/RedeemSmartfren.page';
import RedeemSmartfrenConfirmPage from '../pages/Home/RedeemSmartfrenConfirm.page';
import RedeemSmartfrenResultPage from '../pages/Home/RedeemSmartfrenResult.page';

import FinalizePaydayLoan from '../pages/PaydayLoan/FinalizePaydayLoan.page';
import AboutPaydayLoan from '../pages/PaydayLoan/AboutPayDayLoan.page';
import PayDayLoanIndex from '../pages/PaydayLoan/PaydayLoanIndex.page';
import ConfirmPaydayLoan from '../pages/PaydayLoan/ConfirmPaydayLoan.page';
import PaydayLoanFormFill from '../pages/PaydayLoan/PaydayLoanForm.page';
import ErrorPagePayday from '../pages/Migrate/MigrateError.page';

import TermsEmoney from '../pages/TnCEmoney/TnCEmoney.page';
import FinalizeEmoney from  '../pages/FinalizeEmoney/FinalizeEmoney.page';

import TransactionEmoney from '../pages/TransactionsEmoney/TransactionsEmoney.page';
import TransactionFilterEmoney from '../pages/TransactionsEmoney/TransactionsFilterEmoney.page';
import TransactionDetailEmoney from '../pages/TransactionsEmoney/TransactionDetailEmoney.page';


import SignatureScreen from '../pages/Signature/Signature.page';
import KTPCameraScreen from '../pages/Camera/KTPCamera.page';

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
import SavingAccountFinalizeScreen from '../pages/CreateNewSavingAccount/SavingAccountFinalize.page';
import SavingDukcapilNotMatch from '../pages/CreateNewSavingAccount/SavingDukcapilNotMatch.page';
import SavingEmailFormScreen from '../pages/CreateNewSavingAccount/SavingEmailForm.page';
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

import CartScreen from '../pages/Egift/Cart.page';
import ShopScreen from '../pages/Profile/Shop.page';
import DetailOrders from '../pages/Egift/OrderDetail.page';
import ProductDetailScreen from '../pages/Egift/ProductDetail.page';
import SimasPoinHistory from '../pages/Egift/SimasPoinHistory.page';
import CouponList from '../pages/Coupon/CouponPage.page';
import DetailCouponList from '../pages/Coupon/CouponDetail.page';
import Locator from '../pages/ATMLocator/Locator.page';
import SearchATMBranch from '../pages/ATMLocator/SearchATMBranch.page';

import OfferScreen from '../pages/Profile/Offers.page';
import OfferDetailScreen from '../pages/Profile/OfferDetail.page';
import QRPromoDetailScreen from '../pages/QRPromo/QRPromoDetail.page';
import QRMerchantLocationScreen from '../pages/QRPromo/merchantLocation.page';
import QRPaymentStatus from '../pages/QRGpn/QRPaymentStatus.page';
import QRTerminalDelStatusPage from '../pages/QRGpn/QRTerminalDelStatus.page';
import LuckyDrawScreen from '../pages/LuckyDraw/LuckyDraw.page.js';
import LuckyDrawTnC from '../pages/LuckyDraw/LuckyDrawTnC.page.js';

import AccountSettings from '../pages/Account/AccountSettings.page';
import LoginPreferenceScreen from '../pages/Profile/LoginPreference.page';
import FaceRecogEULAScreen from '../pages/Profile/FaceRecogEULA.page';
import FingerPrintEULAScreen from '../pages/Profile/FingerPrintEULA.page';

import LanguageSettingScreen from '../pages/Account/LanguageSettings.page';

import MainGenerateCode from '../pages/GenerateCodeJourney/MainGenerateCode.page';
import GenerateCodeOnlineMain from '../pages/GenerateCodeJourney/GenerateCodeOnlineMain.page';
import GenerateCodeTnc from '../pages/GenerateCodeJourney/GenerateCodeTnc.page';
import GenerateForm from '../pages/GenerateCodeJourney/GenerateForm.page';
import ReleaseDeviceQR from '../pages/Profile/ReleaseDeviceQR.page';
import ReleaseDeviceResult from '../pages/Profile/ReleaseDeviceResult.page';

// LuckyDIp
import LuckyDipInformation from '../pages/LuckyDraw/LuckyDipInformation.page';
import LuckyDipMain from '../pages/LuckyDraw/LuckyDip.page';
import LuckyDipInformationDetail from '../pages/LuckyDraw/LuckyDipInformationDetail.page';
import LuckyDipHistory from '../pages/LuckyDraw/LuckyDipItemPrize.page';
import LuckyDipEvoucherDetail from '../pages/LuckyDraw/LuckyDipInformationDetaileVoucher.page';

// import OnboardRoute from './onboarding.routes';

import InquirySIL from '../pages/InvestmentJourney/SimasInvestaLink.page';
import InquirySilEmFund from '../pages/InvestmentJourney/SimasInvestaLinkEmFund.page';
import InquirySilEmFundConfirm from '../pages/InvestmentJourney/SimasInvestaLinkEmFundConfirm.page';
import InquirySilTopUp from '../pages/InvestmentJourney/SimasInvestaLinkTopUp.page';
import TransferAccountSIL from '../pages/InvestmentJourney/SourceAccountSIL.page';
import ConfirmationTransferSIL from '../pages/InvestmentJourney/SILTransferConfirmation.page';

import PaymentStatusNewPage from '../pages/PaymentStatus/PaymentStatusNew.page';

import InvestmentViewScreen from '../pages/Home/ChooseInvestment.page';

import MMQGetDetails from '../pages/Home/MmqDataDetail.page';

import EmoneyUpgrade from './emoneyUpgrade.routes';

// EForm
import EForm from '../pages/CreateNewAccount/RenderEForm.page';
import SourceAccount from '../pages/CreateNewAccount/SourceAccount.page';
import LoanProductsPage from '../pages/ProductOptions/ChooseLoanProduct.page';
import NewEForm from '../pages/CreateNewAccount/RegisterPhoneEmailKTP.page';
import EFormLoanTnC from '../pages/CreateNewAccount/EFormLoanTnC.page';
import LoanSourceAccount from '../pages/CreateNewAccount/LoanSourceAccount.page';
import EFormLoanSuccess from '../pages/CreateNewAccount/EFormLoanSuccess.page';

// Loan
import LoanSummary from '../pages/Loan/LoanSummary.page';
import CreateSignWebView from '../pages/Loan/WebViewCreateSign.page';
import SigningWebView from '../pages/Loan/SignSignatureLoan.page';

// digi sign
import RetakeSelfie from '../pages/Loan/CameraSelfieRetake.page';
import ConfirmRetakeSelfie from '../pages/Loan/ImageConfirmationRetake.page';
import feedbackPage from '../pages/Home/FeedbackGetter.page';
import MyQRScreen from '../pages/Account/MyQrScreen.page';
import QRTerminalResetStatusPage from '../pages/QRGpn/QRTerminalResetStatus.page';
import ChooseServices from '../pages/ManageAtmCard/ChooseServices.page';
import ActiveList from '../pages/ManageAtmCard/ActiveList.page';
import BlockList from '../pages/ManageAtmCard/BlockList.page';
import QRpaymentStatusPage from '../pages/QRGpn/QRPaymentStatus.page';

// TYPE ONE
import BillerTypeOneIndexScreen from '../pages/BillerTypeOneJourney/BillerTypeOneIndex.page';
import BillerTypeOnePaymentScreen from '../pages/BillerTypeOneJourney/BillerTypeOnePayment.page';
import BillerTypeOneConfirmationScreen from '../pages/BillerTypeOneJourney/BillerTypeOneConfirmation.page';

import BillerAccount from '../pages/Account/SourceAccount.page';
import GenericBillerListScreen from '../pages/GenericBillerList/GenericBillerList.page';

// Split Bill
// import SplitBillMenu from '../pages/SplitBillJourney/SplitBillMenu.page';
// import SplitBillIndex from '../pages/SplitBillJourney/SplitBillIndex.page';
// import SplitBillConfirmation from '../pages/SplitBillJourney/SplitBillConfirmation.page';
// import DetailSplitBillMenu from '../pages/SplitBillJourney/DetailSplitBillMenu.page';
// import DetailSplitBillMenuOwe from '../pages/SplitBillJourney/DetailSplitBillMenuOwe.page';
// import TransferAccount from '../pages/Account/SourceAccount.page';
// import AddNewParticipants from '../pages/SplitBillJourney/AddNewParticipants.page';


// FUND TRANSFER
import AddPayeeAccount from '../pages/FundTransferJourney/AddPayeeAccount.page';
import AddPayeeBank from '../pages/FundTransferJourney/AddPayeeBank.page';
import AddPayee from '../pages/FundTransferJourney/AddPayee.page';
import FundTransferPayment from '../pages/FundTransferJourney/FundTransferPayment.page';
import SendSourceAcc from '../pages/FundTransferJourney/SendSourceAcc.page';
import FundTransferConfirmation from '../pages/FundTransferJourney/FundTransferConfirmation.page';
import FundTransferMethodScreen from '../pages/FundTransferJourney/FundTransferMethod.page';
import FundTransferScheduleScreen from '../pages/FundTransferJourney/FundTransferSchedule.page';

// alfacart
// import CartAlfacart from '../pages/Egift/CartAlfacart.page';

// New Screen Success
import PaymentStatusRevamp from '../pages/PaymentStatus/PaymentStatusRevamp.page';
import QRPaymentStatusRevamp from '../pages/QRGpn/QRPaymentStatusRevamp.page';
// creditcard
import CreditCardScreen from '../pages/CreditCardJourney/CreditCardIndex.page';
import CreditCardAccountInputScreen from '../pages/CreditCardJourney/CreditCardAccount.page';
import CreditCardPaymentScreen from '../pages/CreditCardJourney/CreditCardPayment.page';
import CreditCardConfirmationScreen from '../pages/CreditCardJourney/CreditCardConfirmation.page';
import CreditCardSelectBankScreen from '../pages/CreditCardJourney/CreditCardSelectBank.page';

import EmoneyUpgradeBenefit from '../pages/EmoneyJourney/EmoneyUpgradeBenefit.page';
import EmoneyUpgradeCamera from '../pages/EmoneyJourney/EmoneyUpgradeCamera.page';
import EmoneyUpgradeEmailForm from '../pages/EmoneyJourney/EmoneyUpgradeEmailForm.page';
import EmoneyUpgradeEmailVerification from '../pages/EmoneyJourney/EmoneyUpgradeEmailVerification.page';
import EmoneyKTPCamera from '../pages/EmoneyJourney/EmoneyKTPCamera.page';
import EmoneySelfieCamera from '../pages/EmoneyJourney/EmoneySelfieCamera.page';
import EmoneyKTPSelfieCamera from '../pages/EmoneyJourney/EmoneyKTPSelfieCamera.page';
import EmoneyImageConfirmation from '../pages/EmoneyJourney/EmoneyImageConfirmation.page';
import EmoneyUpgradeSuccessScreen from '../pages/EmoneyJourney/EmoneyUpgradeSuccessScreen.page';
import SimasTaraSimulation from '../pages/SimasTara/SimasTaraSimulation.page';
import SimasTaraSummary from '../pages/SimasTara/SimasTaraSummary.page';
import BankAccScreen from '../pages/Home/NewBankAcc.page';
import AccountMenu from '../pages/Account/AccountMenu.page';


// SMART SIL
import SmartInvestaLinkIDR from '../pages/InvestmentJourney/SILIlustrasiForm1.page';
import SmartInvestaLinkUSD from '../pages/InvestmentJourney/SILIlustrasiForm1.page';
import InquiryBuyPolis from '../pages/InvestmentJourney/SILChoosePolisInquiry.page';
import SmartInvestaLinkBuyPolis from '../pages/InvestmentJourney/SILChoosePolisBuy.page';
import SmartInvestaLinkBuyPolisTnCIDR from '../pages/InvestmentJourney/SILChooseTnc.page';
import SmartInvestaLinkBuyPolisTnCUSD from '../pages/InvestmentJourney/SILChooseTnc.page';
import SmartInvestaLinkIDRProduct from '../pages/InvestmentJourney/SILIlustrasiForm2.page';
import SmartInvestaLinkUSDProduct from '../pages/InvestmentJourney/SILIlustrasiForm2.page';
import SmartInvestaLinkIDRPolis from '../pages/InvestmentJourney/SILeSPAJForm1.page';
import SmartInvestaLinkUSDPolis from '../pages/InvestmentJourney/SILeSPAJForm1.page';
import SmartInvestaLinkPolisForm2IDR from '../pages/InvestmentJourney/SILeSPAJForm2.page';
import SmartInvestaLinkPolisForm2USD from '../pages/InvestmentJourney/SILeSPAJForm2.page';
import SmartInvestaLinkPolisForm3IDR from '../pages/InvestmentJourney/SILeSPAJForm3.page';
import SmartInvestaLinkPolisForm3USD from '../pages/InvestmentJourney/SILeSPAJForm3.page';
import SmartInvestaLinkPolisForm4IDR from '../pages/InvestmentJourney/SILeSPAJForm4.page';
import SmartInvestaLinkPolisForm4USD from '../pages/InvestmentJourney/SILeSPAJForm4.page';
import SmartInvestaLinkHealthIdr from '../pages/InvestmentJourney/SILesPAJForm5.page';
import SmartInvestaLinkHealthUsd from '../pages/InvestmentJourney/SILesPAJForm5.page';
import SmartInvestaLinkRiskQuestionIdr from '../pages/InvestmentJourney/SILeSPAJForm6.page';
import SmartInvestaLinkRiskQuestionUsd from '../pages/InvestmentJourney/SILeSPAJForm6.page';
import PaymentBuyPolisSIL from '../pages/InvestmentJourney/SILPaymentBuyPolis.page';
import ConfirmationPaymentBuyPolisSILIDR from '../pages/InvestmentJourney/SILPaymentConfirmation.page';
import ConfirmationPaymentBuyPolisSILUSD from '../pages/InvestmentJourney/SILPaymentConfirmation.page';
import ESigning from '../pages/Signature/RenderESigning.page';
import ConfirmationBuyPolisSILIDR from '../pages/InvestmentJourney/SILConfirmation.page';
import ConfirmationBuyPolisSILUSD from '../pages/InvestmentJourney/SILConfirmation.page';
import SmartInvestaLinkPolisInformasiTnCIDR from '../pages/InvestmentJourney/SILInformasiTnC.page';
import SmartInvestaLinkPolisInformasiTnCUSD from '../pages/InvestmentJourney/SILInformasiTnC.page';
import SILSearchableList from '../pages/InvestmentJourney/SILSearchableList.page';
// set default AutoDebit
import SetDefaultAutoDebit from '../pages/Home/SetDefaultAutoDebit.page';
import ValasItem from '../pages/Valas/ValasItem.page';
import SilForexHours from '../pages/InvestmentJourney/SILForexHours.page';
// reksadana
import SimasSekuritas from '../pages/InvestmentJourney/SinarmasSekuritas.page';
import BuyReksadana from '../pages/InvestmentJourney/BuyReksadana.page';
import BuyReksadanaConfirmation from '../pages/InvestmentJourney/BuyReksadanaConfirmation.page';
import SellReksadana from '../pages/InvestmentJourney/SellReksadana.page';
import SellReksadanaConfirmation from '../pages/InvestmentJourney/SellReksadanaConfirmation.page';
import SourceAccountReksadana from '../pages/InvestmentJourney/SourceAccountReksadana.page';


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

import CreditCardTrxManagePage from '../pages/CreditCardManageJourney/CreditCardTrxManage.page';
import CreditCardManageDetail from '../pages/CreditCardManageJourney/CreditCardManageDetail.page';
import CreditCardManageCreatePin from '../pages/CreditCardManageJourney/CreditCardManageCreatePin.page';
import CreditCardManageConfirmPin from '../pages/CreditCardManageJourney/CreditCardManageConfirmPin.page';
import CreditCardManageDeliveryScreen from '../pages/CreditCardManageJourney/CreditCardDelivery.page';


const HomeRoutes = createStackNavigator({
  BankAccScreen: {
    screen: BankAccScreen,
    navigationOptions: navHeaders.BankAccNavConfig,
  },
  HomeScreen: {
    screen: Homescreen,
    navigationOptions: navHeaders.DashboardNavConfig
  },
  CreditCardManage: {
    screen: CreditCardManagePage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='DASHBOARD__CREDIT_CARD_MANAGE_TITLE'/>,
      tabBarVisible: false
    }
  },
  CreditCardManageInput: {
    screen: CreditCardManageInputPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='DASHBOARD__CREDIT_CARD_MANAGE_TITLE'/>,
      tabBarVisible: false
    }
  },
  CreditCardManageConfirmation: {
    screen: CreditCardManageConfirmationPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='DASHBOARD__CREDIT_CARD_MANAGE_TITLE'/>,
      tabBarVisible: false
    }
  },
  Transactions: {
    screen: Transactions,
    navigationOptions: navHeaders.transactionsNavConfig,
  },
  TransactionsFilter: {
    screen: TransactionsFilter,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      tabBarVisible: false
    }
  },
  CcHistory: {
    screen: CcHistory,
    navigationOptions: navHeaders.ccHistoryNavConfig,
  },
  CcDownloadOptions: {
    screen: CcDownloadScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDIT_CARD__DOWNLOAD_BILLING_STATEMENTS' />,
      tabBarVisible: false
    }
  },
  CcDownloadScreens: {
    screen: CcDownloadToScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDIT_CARD__DOWNLOAD_BILLING_STATEMENTS' />,
      tabBarVisible: false
    }
  },
  CloseTdConfirmation: {
    screen: CloseTdConfirmation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TIME_DEPOSIT__NAV_HEADER' />,
      tabBarVisible: false
    }
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
  MMQGetDetailsPage: {
    screen: MMQGetDetails,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='HEADER__MMQ_CERTIFICATE' />,
      tabBarVisible: false
    }
  },
  Profile: {
    screen: ProfileRoutes,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  TdDisclaimer: {
    screen: TdDisclaimerScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TIME_DEPOSIT_TC__NAV_HEADER' />,
      tabBarVisible: false
    }
  },
  ShareReferralCode: {
    screen: MGMScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='REFERRALCODE__HEADER' />,
      tabBarVisible: false
    }
  },
  AuthDashboard: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
  Auth: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
  Investment: {
    screen: InvestmentScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='INVESTMENT__NAV_HEADER' />,
      tabBarVisible: false
    }
  },
  PayScreen: {
    screen: Homescreen,
    navigationOptions: navHeaders.MainIndexPageNavConfig,
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
  BillerAccount: {
    screen: BillerAccount,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILL_PAY'} />,
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
  ApproveAplicationPage: {
    screen: ApproveScreenOpening,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={''} />,
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
  ActivationAccountPage: {
    screen: AccountActivationOpening,
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
  SigningWebViewAccountOpeningPage: {
    screen: AccountSignDocumentOpening,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='DIGI_SIGN_HEADER' />,
      tabBarVisible: false
    }
  },
  DetailTransactionPage: {
    screen: DetailTransactionScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='DASHBOARD__TRANSACTION_HISTORY'/>,
      tabBarVisible: false
    }
  },
  ValidatePassword: {
    screen: ValidatePassword,
    navigationOptions: {
      ...noHeader,
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
  CreateNewPassword: {
    screen: CreateNewPassword,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'CHANGE_PASSWORD__TITLE'} />,
      tabBarVisible: false
    },
  },
  ChangeEasyPinNew: {
    screen: ChangeEasyPinNew,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand,
      tabBarVisible: false
    }
  },
  ChangeEasyPinConfirm: {
    screen: ChangeEasyPinConfirm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand,
      tabBarVisible: false
    }
  },
  ChangeEasyPinPasswordValidate: {
    screen: ChangeEasyPinPasswordValidate,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE__EASYPIN_TITLE'} />,
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
  SimasPoinWebView: {
    screen: SimasPoinWEB,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE__SIMAS_POIN_HEAD'} />,
      tabBarVisible: false
    }
  },
  Help: {
    screen: Helpscreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'HELP__TITLE'} />,
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
  ProfileCameraPage: {
    screen: FaceRecognitionRoutes,
    navigationOptions: {
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
  ErrorPagePayday: {
    screen: ErrorPagePayday,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand,
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
  PaymentStatusNew: {
    screen: PaymentStatusNewPage,
    navigationOptions: {
      header: null,
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
  OpenAccountScreen: {
    screen: OpenAccountRoutes,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  SignaturePage: {
    screen: SignatureScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='OPEN_NEW_ACCOUNT__TITLE'/>,
      tabBarVisible: false
    }
  },
  SignatureHomePage: {
    screen: SignatureScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='OPEN_NEW_ACCOUNT__TITLE'/>,
    }
  },
  KTPCameraPage: {
    screen: KTPCameraScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='OPEN_NEW_ACCOUNT__TITLE'/>,
      tabBarVisible: false
    }
  },
  KTPCameraHomePage: {
    screen: KTPCameraScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='OPEN_NEW_ACCOUNT__TITLE'/>,
    }
  },
  TdForm: {
    screen: TdRoutes,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  TravelDetail: {
    screen: TravelDetailPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE__TRAVEL'} />,
      tabBarVisible: false
    }
  },
  EmoneyCloseRoutes: {
    screen: EmoneyCloseRoutes,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  TravelCustomerForm: {
    screen: TravelCustomerFormPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE__TRAVEL'} />,
      tabBarVisible: false
    }
  },
  RedeemSmartfren: {
    screen: RedeemSmartfrenPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE_REDEEM_SMARTFREN'} />,
      tabBarVisible: false
    }
  },

  TravelBeneficiary: {
    screen: TravelBeneficiaryPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE__TRAVEL'} />,
      tabBarVisible: false
    }
  },
  AboutPaydayLoan: {
    screen: AboutPaydayLoan,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='PAYDAY_LOAN__ONBOARDING__TEXT3' />,
      tabBarVisible: false
    }
  },
  TravelConfirm: {
    screen: TravelConfirmPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE__TRAVEL'} />,
      tabBarVisible: false
    }
  },
  RedeemSmartfrenConfirm: {
    screen: RedeemSmartfrenConfirmPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE_REDEEM_SMARTFREN_CONFIRM'} />,
      tabBarVisible: false
    }
  },
  TravelResult: {
    screen: TravelResultPage,
    navigationOptions: {
      ...navHeaders.noHeader,
      tabBarVisible: false,
    }
  },
  PayDayLoanIndex: {
    screen: PayDayLoanIndex,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='PAYDAY_LOAN__ONBOARDING__TEXT3' />,
      tabBarVisible: false
    }
  },
  RedeemSmartfrenResult: {
    screen: RedeemSmartfrenResultPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerLeft: null,
      tabBarVisible: false
    }
  },
  ConfirmPaydayLoan: {
    screen: ConfirmPaydayLoan,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='PAYDAY_LOAN__ONBOARDING__TEXT3' />,
      tabBarVisible: false
    }
  },
  FinalizePaydayLoan: {
    screen: FinalizePaydayLoan,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='PAYDAY_LOAN__ONBOARDING__TEXT3' />,
      tabBarVisible: false
    }
  },
  PaydayLoanFormFill: {
    screen: PaydayLoanFormFill,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='PAYDAY_LOAN__ONBOARDING__TEXT3' />,
      tabBarVisible: false
    }
  },
  TermsEmoney: {
    screen: TermsEmoney,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TERMS_AND_CONDITION' />,
      tabBarVisible: false
    }
  },
  TransactionEmoneyScreen: {
    screen: TransactionEmoney,
    navigationOptions: navHeaders.transactionsEmoneyNavConfig,
  },
  TransactionFilterEmoneyScreen: {
    screen: TransactionFilterEmoney,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TRANSACTION_FILTER_TITLE' />,
      tabBarVisible: false
    }
  },
  TransactionDetailEmoneyScreen: {
    screen: TransactionDetailEmoney,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='DETAIL_TRANSACTION__HEADER' />,
      tabBarVisible: false
    }
  },
  EgiftCart: {
    screen: CartScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'EGIFT__CART_HEADER'} />,
      tabBarVisible: false
    }
  },

  Shops: {
    screen: ShopScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE__SIMAS_POIN_MYORDER'} />,
      tabBarVisible: false
    }
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
  FinalizeEmoney: {
    screen: FinalizeEmoney,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    },
  },
  ChooseProducts: {
    screen: ChooseProducts,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PRODUCTS__SELECTIONS'} />,
      tabBarVisible: false
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

  // QR

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
  CgvEasyPin: {
    screen: Authenticate,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand,
      tabBarVisible: false
    }
  },
  SimasPoinHistory: {
    screen: SimasPoinHistory,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp, headerTitle: <HeaderTitle titleBlack='SIMAS_POIN__HISTORY'/>,
      tabBarVisible: false
    }
  },
  SavingTnc: {
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
    navigationOptions: navHeaders.onboardProductHeader
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
  SavingEmailForm: {
    screen: SavingEmailFormScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CREDITCARD__NAVBAR'/>,
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
  Offers: {
    screen: OfferScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE__OPTION_OFFERS'} />,
      tabBarVisible: false
    }
  },
  // SplitBillMenu: {
  //   screen: SplitBillMenu,
  //   navigationOptions: {
  //     ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'BURGER_MENU__SPLITBILL'} />,
  //     tabBarVisible: false
  //   }
  // },
  // SplitBillIndex: {
  //   screen: SplitBillIndex,
  //   navigationOptions: {
  //     ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'SPLITBILL__INDEX_HEADER'} />,
  //     tabBarVisible: false
  //   }
  // },
  // SplitBillConfirmation: {
  //   screen: SplitBillConfirmation,
  //   navigationOptions: {
  //     ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'BURGER_MENU__SPLITBILL'} />,
  //     tabBarVisible: false
  //   }
  // },
  // AddNewParticipants: {
  //   screen: AddNewParticipants,
  //   navigationOptions: {
  //     ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'SPLITBILL__INDEX_HEADER'} />,
  //     tabBarVisible: false
  //   }
  // },
  // DetailSplitBillMenu: {
  //   screen: DetailSplitBillMenu,
  //   navigationOptions: {
  //     ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'BURGER_MENU__SPLITBILL'} />,
  //     tabBarVisible: false
  //   }
  // },
  // DetailSplitBillMenuOwe: {
  //   screen: DetailSplitBillMenuOwe,
  //   navigationOptions: {
  //     ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'BURGER_MENU__SPLITBILL'} />,
  //     tabBarVisible: false
  //   }
  // },
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

  OfferDetail: {
    screen: OfferDetailScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'OFFERS__OFFER_DETAIL'} />,
      tabBarVisible: false
    }
  },
  QRPromoDetail: {
    screen: QRPromoDetailScreen,
    navigationOptions: navHeaders.qrPromoHeader,
  },
  QRPaymentStatus: {
    screen: QRPaymentStatus,
    navigationOptions: {
      ...navHeaders.noHeader,
      tabBarVisible: false
    }
  },
  QRTerminalDelStatus: {
    screen: QRTerminalDelStatusPage,
    navigationOptions: {
      headerVisible: false,
      tabBarVisible: false
    },
  },
  QRMerchantLocation: {
    screen: QRMerchantLocationScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'QR_PROMO__MERCHANT_LOCATION'} />,
      tabBarVisible: false
    }
  },
  TravelCustomer: {
    screen: TravelCustomerPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE__TRAVEL'} />,
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
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'LUCKYDRAW__TITLE'} />,
      tabBarVisible: false
    }
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
    navigationOptions: {
      ...navHeaders.navigationOptions.headerGreySoft, headerTitle: <HeaderTitle titleBlack={'LUCKY__DIP_TITLE_EVOUCHER'} />,
      tabBarVisible: false
    }
  },
  TravelInsurance: {
    screen: TravelInsurancePage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE__TRAVEL'} />,
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
  LanguageSetting: {
    screen: LanguageSettingScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE__SELECT_LANGUAGE'} />,
      tabBarVisible: false
    }
  },
  GenerateCodeOnlineMainAll: {
    screen: GenerateCodeOnlineMain,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'GENERATE_CODE_MAIN_MENU_OFFLINE'} />,
      tabBarVisible: false
    }
  },
  MainGenerateCodeX: {
    screen: MainGenerateCode,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'GENERATE_FORM_MERCHANT'} />,
      tabBarVisible: false
    }
  },
  GenerateFormX: {
    screen: GenerateForm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'GENERATE_CODE_FORM'} />,
      tabBarVisible: false
    }
  },
  GenerateForm: {
    screen: GenerateForm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'GENERATE_CODE_FORM'} />,
      tabBarVisible: false
    }
  },
  GenerateCodeTnc: {
    screen: GenerateCodeTnc,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'GENERATE_CODE_TNC'} />,
      tabBarVisible: false
    }
  },
  CreditCardTrxManage: {
    screen: CreditCardTrxManagePage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='DASHBOARD__CREDIT_CARD_MANAGE_TITLE'/>,
      tabBarVisible: false
    }
  },

  CreditCardManageDetail: {
    screen: CreditCardManageDetail,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='DASHBOARD__CREDIT_CARD_MANAGE_TITLE'/>,
      tabBarVisible: false
    }
  },
  CreditCardManageCreatePin: {
    screen: CreditCardManageCreatePin,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='DASHBOARD__CREDIT_CARD_MANAGE_TITLE'/>,
      tabBarVisible: false
    }
  },
  CreditCardManageConfirmPin: {
    screen: CreditCardManageConfirmPin,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='DASHBOARD__CREDIT_CARD_MANAGE_TITLE'/>,
      tabBarVisible: false
    }
  },
  CreditCardManageDeliveryScreen: {
    screen: CreditCardManageDeliveryScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='DASHBOARD__CREDIT_CARD_MANAGE_TITLE'/>,
      tabBarVisible: false
    }
  },

  TokenPaymentStatus: {
    screen: PaymentStatusNewPage,
    navigationOptions: {
      ...navHeaders.noHeader,
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
  TravelInsuranceTnC: {
    screen: TravelInsuranceTnC,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE__TRAVEL'} />,
      tabBarVisible: false
    }
  },
  InvestmentView: {
    screen: InvestmentViewScreen,
    navigationOptions: navHeaders.investmentHeader
  },

  SimasSekuritasView: {
    screen: SimasSekuritas,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack={'SINARMAS__HEADER_TITLE'} />,
      tabBarVisible: false
    }
  },
  BuyReksadanaView: {
    screen: BuyReksadana,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack={'REKSADANA_TOP_UP_TITLE'} />,
      tabBarVisible: false
    }
  },
  BuyReksadanaConfirmation: {
    screen: BuyReksadanaConfirmation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_CONFIRMATION'} />,
      tabBarVisible: false
    }
  },
  SellReksadanaView: {
    screen: SellReksadana,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack={'REKSADANA_REDEMPTION_TITLE'} />,
      tabBarVisible: false
    }
  },
  SellReksadanaConfirmation: {
    screen: SellReksadanaConfirmation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_CONFIRMATION'} />,
      tabBarVisible: false
    }
  },
  SourceAccountReksadana: {
    screen: SourceAccountReksadana,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
      tabBarVisible: false
    }
  },

  ReleaseDeviceQR: {
    screen: ReleaseDeviceQR,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='RELEASE__DEVICE__QR'/>,
      tabBarVisible: false
    }
  },
  ReleaseDeviceResult: {
    screen: ReleaseDeviceResult,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='RELEASE__DEVICE__QR'/>,
      tabBarVisible: false
    }
  },
  MyQRScreen: {
    screen: MyQRScreen,
    navigationOptions: navHeaders.qrHeader
  },
  InquirySILScreen: {
    screen: InquirySIL,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SINARMAS_ASJ'/>,
      tabBarVisible: false
    }
  },
  InquirySilEmFundScreen: {
    screen: InquirySilEmFund,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='INQUIRY__SIL_EMERGENCY_FUND_HEADER'/>,
      tabBarVisible: false
    }
  },
  InquirySilEmFundConfirmScreen: {
    screen: InquirySilEmFundConfirm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='INQUIRY__SIL_EM_FUND_CONFIRM_TITLE'/>,
      tabBarVisible: false
    }
  },
  EmoneyUpgrade: {
    screen: EmoneyUpgrade,
    navigationOptions: {
      tabBarVisible: false
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
  TransferAccountSIL: {
    screen: TransferAccountSIL,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'AUTODEBIT__LIST_ACCOUNT'} />,
      tabBarVisible: false
    }
  },
  ConfirmationTransferSILScreen: {
    screen: ConfirmationTransferSIL,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__HEADER_PAYMENT_CONFIRM' />,
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
  QrPaymentStatusNewOnboarding: {
    screen: QRpaymentStatusPage,
    navigationOptions: noHeader,
    tabBarVisible: false,
  },

  EFormLoanSuccess: {
    screen: EFormLoanSuccess,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PGO__TITLE_LOAN'} />,
      tabBarVisible: false
    }
  },
  feedbackPage: {
    screen: feedbackPage,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  // EmoneyTopUpATM: {
  //   screen: EmoneyTopUpATMScreen,
  //   navigationOptions: {
  //     ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'EMONEY_TOPUP__TITLE'} />,
  //     tabBarVisible: false
  //   }
  // },


  // TransferSourceAccountSplitBill: {
  //   screen: TransferAccount,
  //   navigationOptions: {
  //     ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
  //     tabBarVisible: false
  //   }
  // },
  // // Masih Error disini nih transfernya
  // FundTransferPaymentSplitBill: {
  //   screen: FundTransferPayment,
  //   navigationOptions: {
  //     ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
  //     tabBarVisible: false
  //   }
  // },
  // ConfirmScreenSplitBill: {
  //   screen: FundTransferConfirmation,
  //   navigationOptions: {
  //     ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_CONFIRMATION'} />,
  //     tabBarVisible: false
  //   }
  // },
  // AuthTransferBill: {
  //   screen: Authenticate,
  //   navigationOptions: navHeaders.AuthenticateHeader
  // },
  // TransferScreenBill: {
  //   screen: Homescreen,
  //   navigationOptions: navHeaders.MainIndexPageNavConfig
  // },


  // Send: {
  //   screen: SendRoutes,
  //   navigationOptions: {
  //     ...navHeaders.noHeader,
  //     tabBarVisible: false
  //   }
  // },

  PaymentStatusRevamp: {
    screen: PaymentStatusRevamp,
    navigationOptions: {
      header: null,
      tabBarVisible: false
    }
  },
  QRPaymentStatusRevamp: {
    screen: QRPaymentStatusRevamp,
    navigationOptions: {
      ...navHeaders.noHeader,
      tabBarVisible: false
    }
  },
  CreditCard: {
    screen: CreditCardScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__CREDIT_CARD_BILL_PAY'} />,
      tabBarVisible: false
    }
  },
  CreditCardAccountInput: {
    screen: CreditCardAccountInputScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__CREDIT_CARD_BILL_PAY'} />,
      tabBarVisible: false
    }
  },
  CreditCardPayment: {
    screen: CreditCardPaymentScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__CREDIT_CARD_BILL_PAY'} />,
      tabBarVisible: false
    }
  },
  CreditCardConfirmation: {
    screen: CreditCardConfirmationScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__CREDIT_CARD_CONFIRMATION'} />,
      tabBarVisible: false
    }
  },
  CreditCardSelectBank: {
    screen: CreditCardSelectBankScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__CREDIT_CARD_BILL_PAY'} />,
      tabBarVisible: false
    }
  },
  CcHistoryFund: {
    screen: CcHistory,
    navigationOptions: navHeaders.ccHistoryNavConfig,
  },
  InquirySilTopUpScreen: {
    screen: InquirySilTopUp,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='INQUIRY__SIL_TOP_UP_HEADER'/>,
      tabBarVisible: false
    }
  },
  EmoneyUpgradeBenefit: {
    screen: EmoneyUpgradeBenefit,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'EMONEY__UPGRADE'} />,
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

  InquiryBuyPolis: {
    screen: InquiryBuyPolis,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SINARMAS_ASJ'/>,
      tabBarVisible: false
    }
  },
  SmartInvestaLinkIDR: {
    screen: SmartInvestaLinkIDR,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__SMART__INVESMENT_LINK_IDR'/>,
      tabBarVisible: false
    }
  },
  SmartInvestaLinkUSD: {
    screen: SmartInvestaLinkUSD,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__SMART__INVESMENT_LINK_USD'/>,
      tabBarVisible: false
    }
  },
  SmartInvestaLinkBuyPolis: {
    screen: SmartInvestaLinkBuyPolis,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SINARMAS__BUY_POLIS'/>,
      tabBarVisible: false
    }
  },
  SmartInvestaLinkBuyPolisTnCIDR: {
    screen: SmartInvestaLinkBuyPolisTnCIDR,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__SMART__INVESMENT_LINK_IDR'/>,
      tabBarVisible: false
    }
  },
  SmartInvestaLinkBuyPolisTnCUSD: {
    screen: SmartInvestaLinkBuyPolisTnCUSD,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__SMART__INVESMENT_LINK_USD'/>,
      tabBarVisible: false
    }
  },
  SmartInvestaLinkIDRProduct: {
    screen: SmartInvestaLinkIDRProduct,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__SMART__INVESMENT_LINK_IDR'/>,
      tabBarVisible: false
    }
  },
  SmartInvestaLinkUSDProduct: {
    screen: SmartInvestaLinkUSDProduct,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__SMART__INVESMENT_LINK_USD'/>,
      tabBarVisible: false
    }
  },
  SmartInvestaLinkIDRPolis: {
    screen: SmartInvestaLinkIDRPolis,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__SMART__INVESMENT_LINK_IDR'/>,
      tabBarVisible: false
    }
  },
  SmartInvestaLinkUSDPolis: {
    screen: SmartInvestaLinkUSDPolis,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__SMART__INVESMENT_LINK_USD'/>,
      tabBarVisible: false
    }
  },
  SmartInvestaLinkPolisForm2IDR: {
    screen: SmartInvestaLinkPolisForm2IDR,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__SMART__INVESMENT_LINK_IDR'/>,
      tabBarVisible: false
    }
  },
  SmartInvestaLinkPolisForm2USD: {
    screen: SmartInvestaLinkPolisForm2USD,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__SMART__INVESMENT_LINK_USD'/>,
      tabBarVisible: false
    }
  },
  SmartInvestaLinkPolisForm3IDR: {
    screen: SmartInvestaLinkPolisForm3IDR,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__SMART__INVESMENT_LINK_IDR'/>,
      tabBarVisible: false
    }
  },
  SmartInvestaLinkPolisForm3USD: {
    screen: SmartInvestaLinkPolisForm3USD,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__SMART__INVESMENT_LINK_USD'/>,
      tabBarVisible: false
    }
  },
  SmartInvestaLinkPolisForm4IDR: {
    screen: SmartInvestaLinkPolisForm4IDR,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__SMART__INVESMENT_LINK_IDR'/>,
      tabBarVisible: false
    }
  },
  SmartInvestaLinkPolisForm4USD: {
    screen: SmartInvestaLinkPolisForm4USD,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__SMART__INVESMENT_LINK_USD'/>,
      tabBarVisible: false
    }
  },
  SmartInvestaLinkRiskQuestionIdr: {
    screen: SmartInvestaLinkRiskQuestionIdr,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__SMART__INVESMENT_LINK_IDR'/>,
      tabBarVisible: false
    }
  },
  SmartInvestaLinkRiskQuestionUsd: {
    screen: SmartInvestaLinkRiskQuestionUsd,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__SMART__INVESMENT_LINK_USD'/>,
      tabBarVisible: false
    }
  },
  SmartInvestaLinkHealthIdr: {
    screen: SmartInvestaLinkHealthIdr,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__SMART__INVESMENT_LINK_IDR'/>,
      tabBarVisible: false
    }
  },
  SmartInvestaLinkHealthUsd: {
    screen: SmartInvestaLinkHealthUsd,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__SMART__INVESMENT_LINK_USD'/>,
      tabBarVisible: false
    }
  },
  PaymentBuyPolisSIL: {
    screen: PaymentBuyPolisSIL,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='PAYMENT_BUY_POLIS'/>,
      tabBarVisible: false
    }
  },
  ConfirmationPaymentBuyPolisSILIDR: {
    screen: ConfirmationPaymentBuyPolisSILIDR,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__HEADER_PAYMENT_CONFIRM'/>,
      tabBarVisible: false
    }
  },
  ConfirmationPaymentBuyPolisSILUSD: {
    screen: ConfirmationPaymentBuyPolisSILUSD,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__HEADER_PAYMENT_CONFIRM'/>,
      tabBarVisible: false
    }
  },
  ESigning: {
    screen: ESigning,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={''} />,
      tabBarVisible: false
    }
  },
  SmartInvestaLinkPolisInformasiTnCIDR: {
    screen: SmartInvestaLinkPolisInformasiTnCIDR,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__SMART__INVESMENT_LINK_IDR'/>,
      tabBarVisible: false
    }
  },
  SmartInvestaLinkPolisInformasiTnCUSD: {
    screen: SmartInvestaLinkPolisInformasiTnCUSD,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__SMART__INVESMENT_LINK_USD'/>,
      tabBarVisible: false
    }
  },
  ConfirmationBuyPolisSILIDR: {
    screen: ConfirmationBuyPolisSILIDR,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__SMART__INVESMENT_LINK_IDR'/>,
      tabBarVisible: false
    }
  },
  ConfirmationBuyPolisSILUSD: {
    screen: ConfirmationBuyPolisSILUSD,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SIL__SMART__INVESMENT_LINK_USD'/>,
      tabBarVisible: false
    }
  },
  SILSearchableList: {
    screen: SILSearchableList,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='SMART__INVESMENT_LINK_IDR'/>,
      tabBarVisible: false
    },
  },
  ChooseServices: {
    screen: ChooseServices,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'SERVICES__SELECTIONS'} />,
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
  SetDefaultAutoDebitScreen: {
    screen: SetDefaultAutoDebit,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'SET_AUTODEBIT_TITTLE'} />,
      tabBarVisible: false
    }
  },
  AccountMenu: {
    screen: AccountMenu,
    navigationOptions: navHeaders.LandingHeaderNew
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
    }
  },
  SilForexHours: {
    screen: SilForexHours,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={''} />,
      tabBarVisible: false
    }
  },
  EasyPinSetLimit: {
    screen: EasyPinSetLimit,
    navigationOptions: navHeaders.AuthenticateHeader
  },
},
{
  headerMode: 'screen',
  cardStyle: {
    backgroundColor: 'white'// to change the backgroundColor color of the whole application
  },
},
);

export default HomeRoutes;
