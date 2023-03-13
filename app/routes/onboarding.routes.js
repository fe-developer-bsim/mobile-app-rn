import * as navHeaders from './navHeaders.config';
import {StackNavigator} from 'react-navigation';

import Loginscreen from '../pages/OnboardingJourney/LoginWithUserPassword.page';
import LoginWithEasyPinPage from '../pages/OnboardingJourney/LoginWithEasyPin.page';
import LoginWithEasyPinPageRevamp from '../pages/OnboardingJourney/LoginWithEasyPinRevamp.page';
import LoginWithEasyPinPageSearch from '../pages/OnboardingJourney/LoginWithEasyPinSearch.page';

import RegisterPinPage from '../pages/OnboardingJourney/RegisterPin.page';
import RegisterAtmPage from '../pages/OnboardingJourney/RegisterAtm.page';
import OnboardingOTP from '../pages/OnboardingJourney/OTP.page';
import LoginAccount from '../pages/OnboardingJourney/LoginUserPasswordCreation.page';
import EasyPin from '../pages/OnboardingJourney/EasyPinCreation.page';
import EasyPinConfirm from '../pages/OnboardingJourney/EasyPinCreationConfirm.page';
import EasyPinVerify from '../pages/OnboardingJourney/EasyPinVerify.page';
import CompletedOnboarding from '../pages/OnboardingJourney/CompletedOnboarding.page';
import {noHeader} from './navHeaders.config';
import IntroductionPage from '../pages/NewToBankOnboarding/Introduction.page';
import ConfirmationAccountPage from '../pages/NewToBankOnboarding/ConfirmationAccount.page';
import IdentityPage from '../pages/NewToBankOnboarding/IdentityForm.page';
import IdentitySecondPage from '../pages/NewToBankOnboarding/IdentitySecondForm.page';
import IdentityThirdPage from '../pages/NewToBankOnboarding/IdentityThirdForm.page';
import IdentityFourthPage from '../pages/NewToBankOnboarding/IdentityFourthForm.page';
import IdentityFifthPage from '../pages/NewToBankOnboarding/IdentityFifthForm.page';
import LearnMoreProductPage from '../pages/NewToBankOnboarding/LearnMoreProduct.page';
import React from 'react';
import HeaderTitle from '../components/NavHeader/HeaderTitle.component';
import HeaderCgv from '../components/NavHeader/HeaderCgv.component';
import HowToTransferPage from '../pages/NewToBankOnboarding/HowToTransfer.page';
import LandingPage from '../pages/OnboardingJourney/Landing.page';
import CameraScreen from '../pages/Camera/Camera.page';
import MigrateLandingPage from '../pages/Migrate/MigrateIndex.page';
import MigrateEnded from '../pages/Migrate/MigrateEnded.page';
import MigrateError from '../pages/Migrate/MigrateError.page';
import OfferDetailScreen from '../pages/Profile/OfferDetail.page';
import FAQform from '../pages/Help/FAQWeb.page';
import OfferScreen from '../pages/OnboardingJourney/OnboardingOffers.page';
import NewAccountCameraScreen from '../pages/Camera/OpenNewAccountCamera.page';
import KTPCameraScreen from '../pages/Camera/KTPCamera.page';
import SignatureScreen from '../pages/Signature/Signature.page';
import SmartPromoAbout from '../pages/NewToBankOnboarding/AboutSmartPromo.page';
import QRGpnRoutes from './QRGpn.routes';
import AgreementScreen from '../pages/RegisterEmoneyJourney/AgreementEmoney.page';
import RegisterEmoneyScreen from '../pages/RegisterEmoneyJourney/RegisterEmoney.page';
import ConfirmationEmail from '../pages/RegisterEmoneyJourney/ConfirmationEmail.page';
import ResetByPhoneNumberForm from '../pages/OnboardingJourney/RegisterByPhone.page';
import ResetByPhoneNumberLastForm from '../pages/OnboardingJourney/RegisterByPhoneFinal.page';
import ResetPasswordEmailToken from '../pages/OnboardingJourney/ResetPasswordEmailToken.page';

import Authenticate from '../pages/Authenticate/Authenticate.page';
import ResetPassNoCardForm from '../pages/OnboardingJourney/ResetPassNoCardForm.page';

// Egift routes
import CartScreen from '../pages/Egift/Cart.page';
import ProductDetailScreen from '../pages/Egift/ProductDetail.page';
import TabShopping from '../pages/Profile/TabShopping.page';
import SimasPoinHistory from '../pages/Egift/SimasPoinHistory.page';
import SimasPoinLogin from '../pages/Egift/SimasPoinLogin.page';
import EgiftLogin from '../pages/Egift/EgiftLogin.page';

// Credit Card
import ChooseProducts from '../pages/ProductOptions/ChooseProducts.page';
import ChooseCreditCard from '../pages/ProductOptions/ChooseCreditCard.page';
import ChooseSavingAccount from '../pages/ProductOptions/ChooseSavingAccount.page';
import IndigoTnC from '../pages/ProductOptions/IndigoTnC.page';
import CreateCCAccountScreen from '../pages/CreateNewAccount/RegisterPhoneEmail.page';
import CreateAccountOTPScreen from '../pages/CreateNewAccount/CreateAccountOTP.page';
import CreditCardKTPCamera from '../pages/CreateNewAccount/CreditCardKTPCamera.page';
import CcCheckpoint from '../pages/CreateNewAccount/Checkpoint.page';
import MissingForm from '../pages/CreateNewAccount/MissingForm.page';
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

// Activation
import ActivationForm from '../pages/RegisterEmoneyJourney/ActivationForm.page';
import ActivationSuccess from '../pages/RegisterEmoneyJourney/ActivationSuccess.page';
import VerifyEmailEmoney from '../pages/RegisterEmoneyJourney/VerifyEmailEmoney.page';
import EmoneyActivationOTP from '../pages/RegisterEmoneyJourney/EmoneyActivationOTP.page';
import SelectSeatScreen from '../pages/CGV/SelectSeat.page';
import CgvTabScreen from '../pages/CGV/CgvTab.page';
import CgvMovieDetail from '../pages/CGV/CgvMovieDetail.page';
import CgvSchedule from '../pages/CGV/CgvSchedule.page';
import EmallLogin from '../pages/Emall/EmallLogin.page';
import QRScannerDiscountScreen from '../pages/QRPayment/QRScannerDiscount.page';
import QRInvoiceDataScreen from '../pages/QRPayment/QRInvoiceData.page';
import QRMerchantDealScreen from '../pages/OnboardingJourney/MerchantDeals.page';
import QRDealDetailScreen from '../pages/OnboardingJourney/DealDetail.page';
import QRDiscountEULAScreen from '../pages/OnboardingJourney/QRDiscountEULA.page';
import MerchantListScreen from '../pages/OnboardingJourney/MerchantList.page';
import FlightRoutes from './flight.routes';
import FailedPageActivation from '../pages/RegisterEmoneyJourney/FailActivationPage.page';
import CouponList from '../pages/Coupon/CouponPage.page';
import DetailCouponList from '../pages/Coupon/CouponDetail.page';
import Locator from '../pages/ATMLocator/Locator.page';
import SearchATMBranch from '../pages/ATMLocator/SearchATMBranch.page';

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

// Emoney account
import TermsEmoney from '../pages/TnCEmoney/TnCEmoney.page';

import AccountSettings from '../pages/Account/AccountSettings.page';
import LanguageSettingScreen from '../pages/Account/LanguageSettings.page';
import InternetBankingSettingsScreen from '../pages/Account/InternetBankingSettings.page';

import GenerateCodeTnc from '../pages/GenerateCodeJourney/GenerateCodeTnc.page';
import GenerateCodeTimeout from '../pages/GenerateCodeJourney/GenerateCodeTimeout.page';
import TapGenerateCode from '../pages/GenerateCodeJourney/TapGenerateCode.page';
import TapGenerateCodeNumber from '../pages/GenerateCodeJourney/TapGenerateCodeNumber.page';
import GenerateCodeOfflineMain from '../pages/GenerateCodeJourney/GenerateCodeOfflineMain.page';
import MainGenerateCode from '../pages/GenerateCodeJourney/MainGenerateCode.page';
import GenerateForm from '../pages/GenerateCodeJourney/GenerateForm.page';
import GenerateCode from '../pages/GenerateCodeJourney/GenerateCode.page';

import GeneralLogin from '../pages/GeneralAuthenticateDeeplink/GeneralLogin.page';
import LoginChangeDevice from '../pages/Account/LoginChangeDevice.page';
import LoginChangeDeviceResult from '../pages/Account/LoginChangeDeviceResult.page';
import OTPchangeDevice from '../pages/OnboardingJourney/OTPchangeDevice.page';
import ValidatePassword from '../pages/Profile/ValidatePassword.page';
import EasyPinChangeDevice from '../pages/Account/EasyPinChangeDevice.page';

// EForm
import EForm from '../pages/CreateNewAccount/RenderEForm.page';
import LoanProductsPage from '../pages/ProductOptions/ChooseLoanProduct.page';
import NewEForm from '../pages/CreateNewAccount/RegisterPhoneEmailKTP.page';
import EFormLoanTnC from '../pages/CreateNewAccount/EFormLoanTnC.page';
import SourceAccount from '../pages/CreateNewAccount/SourceAccount.page';
import LoanSourceAccount from '../pages/CreateNewAccount/LoanSourceAccount.page';
import EFormLoanSuccess from '../pages/CreateNewAccount/EFormLoanSuccess.page';
import feedbackPage from '../pages/Home/FeedbackGetter.page';

// LuckyDip
import LuckyDip from '../pages/LuckyDraw/LuckyDip.page';
import LuckyDipInformation from '../pages/LuckyDraw/LuckyDipInformation.page';
import LuckyDipInformationDetail from '../pages/LuckyDraw/LuckyDipInformationDetail.page';
import LuckyDipHistory from '../pages/LuckyDraw/LuckyDipItemPrize.page';
import LuckyDipMain from '../pages/LuckyDraw/LuckyDip.page';

import Pay from '../pages/Pay/Pay.page';

import ProfileRoutes from './profile.routes';

import CreditCardScreen from '../pages/CreditCardJourney/CreditCardIndex.page';
import CreditCardAccountInputScreen from '../pages/CreditCardJourney/CreditCardAccount.page';
import CreditCardPaymentScreen from '../pages/CreditCardJourney/CreditCardPayment.page';
import CreditCardConfirmationScreen from '../pages/CreditCardJourney/CreditCardConfirmation.page';
import CreditCardSelectBankScreen from '../pages/CreditCardJourney/CreditCardSelectBank.page';

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

// TYPE TEN
import BillerTypeTenIndexScreen from '../pages/BillerTypeTenJourney/BillerTypeTenIndex.page';
import BillerTypeTenFormScreen from '../pages/BillerTypeTenJourney/BillerTypeTenForm.page';
import BillerTypeTenPaymentScreen from '../pages/BillerTypeTenJourney/BillerTypeTenPayment.page';
import BillerTypeTenConfirmationScreen from '../pages/BillerTypeTenJourney/BillerTypeTenConfirmation.page';
import BillerTypeTeSearchAreaName from '../pages/BillerTypeTenJourney/AddLocationBiller.page';

import BillerAccount from '../pages/Account/SourceAccount.page';

import QRPaymentScreen from '../pages/QRPayment/QRPayment.page';
import QRInvoiceDetailScreen from '../pages/QRPayment/QRInvoiceDetail.page';
import QRInputAmountScreen from '../pages/QRPayment/QRInputAmount.page';
import QRInputConfirmationScreen from '../pages/QRPayment/QRConfirmation.page';

// QR GPN
import QRConfirmPage from '../pages/QRGpn/QRConfirmPage.page';

import Homescreen from '../pages/Home/Dashboard.page';
import WithdrawalForm from '../pages/QRGpn/QRWithdrawalForm.page';
import GenerateCodeOnline from '../pages/GenerateCodeJourney/GenerateCode.page';

// Insurance
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

// status payment
import PaymentStatusNewPage from '../pages/PaymentStatus/PaymentStatusNew.page';
import QRpaymentStatusPage from '../pages/QRGpn/QRPaymentStatus.page';

// status Revamp payment
import PaymentStatusRevampPage from '../pages/PaymentStatus/PaymentStatusRevamp.page';
import QRpaymentStatusRevampPage from '../pages/QRGpn/QRPaymentStatusRevamp.page';

// status revamp phase2
import NewQrStatusRevamp from '../pages/QRGpn/NewPaymentStatusRevamp.page';

// New revamp payment status
import NewPaymentStatusRevampPage from '../pages/PaymentStatus/NewPaymentStatusRevamp.page';

// merchant journey
import CategoryAlfacart from '../pages/OnboardingJourney/CategoryAlfacart.page';
import DetailProductAlfacart from '../pages/OnboardingJourney/DetailProductAlfacart.page';
import AlfacartCheckout from '../pages/OnboardingJourney/AlfacartCheckout.page';
import AlfacartShippingMethod from '../pages/MerchantJourney/MerchantShippingMethod.page';
import WishlistAlfacart from '../pages/OnboardingJourney/WishlistAlfacart.page';
import AlfacartCart from '../pages/OnboardingJourney/AlfacartCart.page';
import MerchantDashboard from '../pages/MerchantJourney/MerchantDashboard.page';
import DetailProductMerchant from '../pages/MerchantJourney/DetailProductMerchant.page';
import MerchantShippingMethod from '../pages/MerchantJourney/MerchantCart.page';
import MerchantCart from '../pages/MerchantJourney/MerchantCart.page';
import MerchantLogin from '../pages/MerchantJourney/MerchantEstoreLogin.page';
import MerchantCheckout from '../pages/MerchantJourney/MerchantCheckout.page';
import DigitalStorePaymentStatus from '../pages/MerchantJourney/DigitalStorePaymentStatus.page';

import AlfacartShippingMethodReal from '../pages/OnboardingJourney/AlfacartShippingMethod.page';
import TransferAccount from '../pages/Account/SourceAccount.page';
import FormFillAlfaAddress from '../pages/OnboardingJourney/FormFillAlfaAddress.page';
import FormFillAlfaNewStore from '../pages/OnboardingJourney/FormFillAlfaNewStore.page';
import InputEmailScreen from '../pages/MerchantJourney/InputEmailCustomer.page';

// alfacart
import AlfacartDashboard from '../pages/OnboardingJourney/AlfacartDashboard.page';
import DetailProduct from '../pages/OnboardingJourney/DetailProductAlfacart.page';

// simas catalog
import UltraVoucherWebView from '../pages/OnboardingJourney/UltraVoucherWebView.page';
import UltraVoucherPaymentStatus from '../pages/OnboardingJourney/UltraVoucherPaymentStatus.page';
import UltraVoucherTnc from '../pages/OnboardingJourney/UltraVoucherTnc.page';
import UnipinTnc from '../pages/OnboardingJourney/UnipinTnc.page';

// Migrate OBM
import ObmMigrate from '../pages/Profile/ObmMigrate.page';
import ValasItem from '../pages/Valas/ValasItem.page';

import searchAlfacartPage from '../pages/OnboardingJourney/AlfacartSearch.page';

import AlfacartTnc from '../pages/OnboardingJourney/AlfacartTnc.page';
// new onboarding
import ChooseRegistration from '../pages/NewToBankOnboarding/ChooseRegistration.page';
import EmoneyDashboard from '../pages/OnboardingJourney/EmoneyDashboard.page';
import TransactionEmoney from '../pages/TransactionsEmoney/TransactionsEmoney.page';
import TransactionFilterEmoney from '../pages/TransactionsEmoney/TransactionsFilterEmoney.page';
import TransactionDetailEmoney from '../pages/TransactionsEmoney/TransactionDetailEmoney.page';
import BankAccScreen from '../pages/Home/NewBankAcc.page';
import PaymentStatusNew from '../pages/PaymentStatus/PaymentStatusNew.page';

// upgrade emoney
import EmoneyUpgradeBenefit from '../pages/EmoneyJourney/EmoneyUpgradeBenefit.page';
import EmoneyUpgradeCamera from '../pages/EmoneyJourney/EmoneyUpgradeCamera.page';
import EmoneyUpgradeEmailForm from '../pages/EmoneyJourney/EmoneyUpgradeEmailForm.page';
import EmoneyUpgradeEmailVerification from '../pages/EmoneyJourney/EmoneyUpgradeEmailVerification.page';
import EmoneyKTPCamera from '../pages/EmoneyJourney/EmoneyKTPCamera.page';
import EmoneySelfieCamera from '../pages/EmoneyJourney/EmoneySelfieCamera.page';
import EmoneyKTPSelfieCamera from '../pages/EmoneyJourney/EmoneyKTPSelfieCamera.page';
import EmoneyImageConfirmation from '../pages/EmoneyJourney/EmoneyImageConfirmation.page';
import EmoneyUpgradeSuccessScreen from '../pages/EmoneyJourney/EmoneyUpgradeSuccessScreen.page';
import Transactions from '../pages/Transactions/Transactions.page';
import EmoneyTopUpATMScreen from '../pages/EmoneyJourney/EmoneyTopUpATM.page';

import TransactionsFilter from '../pages/Transactions/TransactionsFilter.page';

import InvestmentViewScreen from '../pages/Home/ChooseInvestment.page';

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

import InquirySIL from '../pages/InvestmentJourney/SimasInvestaLink.page';
import InquirySilEmFund from '../pages/InvestmentJourney/SimasInvestaLinkEmFund.page';
import InquirySilEmFundConfirm from '../pages/InvestmentJourney/SimasInvestaLinkEmFundConfirm.page';
import InquirySilTopUp from '../pages/InvestmentJourney/SimasInvestaLinkTopUp.page';
import TransferAccountSIL from '../pages/InvestmentJourney/SourceAccountSIL.page';
import ConfirmationTransferSIL from '../pages/InvestmentJourney/SILTransferConfirmation.page';
import DetailTransactionScreen from '../pages/Transactions/TransactionDetail.page';
import TdRoutes from './timeDeposit.routes';
import InvestmentScreen from '../pages/InvestmentJourney/InvestmentProduct.page';
import MMQGetDetails from '../pages/Home/MmqDataDetail.page';

// Loan
import LoanSummary from '../pages/Loan/LoanSummary.page';
import CreateSignWebView from '../pages/Loan/WebViewCreateSign.page';
import SigningWebView from '../pages/Loan/SignSignatureLoan.page';

// digi sign
import RetakeSelfie from '../pages/Loan/CameraSelfieRetake.page';
import ConfirmRetakeSelfie from '../pages/Loan/ImageConfirmationRetake.page';

// remittanceTransfer
import PaymentStatusRemittancePage from '../pages/PaymentStatus/PaymentStatusRemittance.page';

// Star Investama
import InquiryStarInvestama from '../pages/InvestmentJourney/StarInvestama.page';
import InquiryStarInvestamaTopUp from '../pages/InvestmentJourney/StarInvestamaTopUp.page';
import TransferAccountStarInvestama from '../pages/InvestmentJourney/SourceAccountStarInvestama.page';
import ConfirmationTransferStarInvestama from '../pages/InvestmentJourney/StarInvestamaConfirmation.page';

// reksadana
import SimasSekuritas from '../pages/InvestmentJourney/SinarmasSekuritas.page';
import BuyReksadana from '../pages/InvestmentJourney/BuyReksadana.page';
import BuyReksadanaConfirmation from '../pages/InvestmentJourney/BuyReksadanaConfirmation.page';
import SellReksadana from '../pages/InvestmentJourney/SellReksadana.page';
import SellReksadanaConfirmation from '../pages/InvestmentJourney/SellReksadanaConfirmation.page';
import SourceAccountReksadana from '../pages/InvestmentJourney/SourceAccountReksadana.page';

// cc Manage
import CreditCardManagePage from '../pages/CreditCardManageJourney/CreditCardManage.page';
import CreditCardManageInputPage from '../pages/CreditCardManageJourney/CreditCardManageInput.page';
import CreditCardConvertInstallmentPage from '../pages/CreditCardManageJourney/CreditCardConvertInstallment.page';
import CreditCardManageSetInstallmentPage from '../pages/CreditCardManageJourney/CreditCardSetInstallment.page';
import CreditCardManageConfirmationPage from '../pages/CreditCardManageJourney/CreditCardManageConfirmation.page';
import CreditCardConfirmInstallmentPage from '../pages/CreditCardManageJourney/CreditCardConfirmInstallment.page';
import CreditCardTransactionManagementPage from '../pages/CreditCardManageJourney/CreditCardTransactionManagement.page';
import CreditCardTransactionDetailPage from '../pages/CreditCardManageJourney/CreditCardTransactionDetail.page';
import CreditCardTransactionSuccessPage from '../pages/CreditCardManageJourney/CreditCardTransactionSuccess.page';
import CcHistory from '../pages/CreditCardHistoryJourney/CreditCardHistory.page';
import CcDownloadScreen from '../pages/CreditCardHistoryJourney/CreditCardHistoryOptions.page';

import CreditCardNotificationSettingsPage from '../pages/CreditCardManageJourney/CreditCardNotificationSettings.page';

// cc CashAdvance
import CreditCardCashAdvancePage from '../pages/CreditCardCashAdvance/CreditCardCashAdvance.page';
import CashAdvanceConfirmPage from '../pages/CreditCardCashAdvance/CashAdvanceConfirm.page';
import CashAdvanceSuccessPage from '../pages/CreditCardCashAdvance/CashAdvanceSuccess.page';

import SilForexHours from '../pages/InvestmentJourney/SILForexHours.page';

import PushNotifInbox from '../pages/Home/PushNotifInbox.page';

// Split Bill
import SplitBillMenu from '../pages/SplitBillJourney/SplitBillMenu.page';
import SplitBillIndex from '../pages/SplitBillJourney/SplitBillIndex.page';
import SplitBillConfirmation from '../pages/SplitBillJourney/SplitBillConfirmation.page';
import DetailSplitBillMenu from '../pages/SplitBillJourney/DetailSplitBillMenu.page';
import DetailSplitBillMenuOwe from '../pages/SplitBillJourney/DetailSplitBillMenuOwe.page';
import AddNewParticipants from '../pages/SplitBillJourney/AddNewParticipants.page';
import FundTransferPayment from '../pages/FundTransferJourney/FundTransferPayment.page';
import FundTransferConfirmation from '../pages/FundTransferJourney/FundTransferConfirmation.page';
import AddPayeeAccount from '../pages/FundTransferJourney/AddPayeeAccount.page';
import AddPayeeBank from '../pages/FundTransferJourney/AddPayeeBank.page';
import AddPayee from '../pages/FundTransferJourney/AddPayee.page';

// Digital Account Opening
import EmoneyRegistration from '../pages/DigitalAccountOpening/EmoneyRegistration.page';
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

// set default AutoDebit
import SetDefaultAutoDebit from '../pages/Home/SetDefaultAutoDebit.page';

// ETAX Journey
import ETax from '../pages/ETaxJourney/ETaxLanding.page';
import IdBillingFormOne from '../pages/ETaxJourney/IdBillingFormOne.page';
import IdBillingFormConfirmation from '../pages/ETaxJourney/IdBillingFormConfirmation.page';
import IdBillingFormPayment from '../pages/ETaxJourney/IdBillingFormPayment.page';
import IdBillingFormPaymentConfirmation from '../pages/ETaxJourney/IdBillingFormPaymentConfirmation.page';
import EtaxPaymentType from '../pages/ETaxJourney/EtaxPaymentType.page';
import EtaxHistoryFilter from '../pages/ETaxJourney/EtaxHistoryFilter.page';
import EtaxHistoryList from '../pages/ETaxJourney/EtaxHistoryList.page';

// liveness
import LivenessSection from '../pages/AAILiveness/AAIIOSLivenessView.page';

import LegalPageAccount from '../pages/Account/LegalPage.page';

import CreditCardTrxManagePage from '../pages/CreditCardManageJourney/CreditCardTrxManage.page';
import CreditCardManageDetail from '../pages/CreditCardManageJourney/CreditCardManageDetail.page';
import CreditCardManageCreatePin from '../pages/CreditCardManageJourney/CreditCardManageCreatePin.page';
import CreditCardManageConfirmPin from '../pages/CreditCardManageJourney/CreditCardManageConfirmPin.page';
import CreditCardManageDeliveryScreen from '../pages/CreditCardManageJourney/CreditCardDelivery.page';

// Menu Search
import MenuHeaderSearch from '../pages/OnboardingJourney/MenuSearch.page';
import OfferScreens from '../pages/Profile/Offers.page';
import SimasTaraSimulation from '../pages/SimasTara/SimasTaraSimulation.page';
import SimasTaraSummary from '../pages/SimasTara/SimasTaraSummary.page';
import PaymentStatusRevamp from '../pages/PaymentStatus/PaymentStatusRevamp.page';
import ShopScreen from '../pages/Profile/Shop.page';
import LuckyDrawScreen from '../pages/LuckyDraw/LuckyDraw.page.js';
import TokenHistory from '../pages/TokenJourney/TokenHistory.page';
import RecurringEditingPage from '../pages/RecurringJourney/RecurringEditing.page';
import RecurringDetailListPage from '../pages/RecurringJourney/RecurringDetailList.page';
import FavBiller from '../pages/Account/FavoriteBiller.page';
import UpdateEasyPin from '../pages/Profile/UpdateEasyPin.page';
import ReleaseDeviceQR from '../pages/Profile/ReleaseDeviceQR.page';
import FaceRecogEULAScreen from '../pages/Profile/FaceRecogEULA.page';
import FingerPrintEULAScreen from '../pages/Profile/FingerPrintEULA.page';
import LoginPreferenceScreen from '../pages/Profile/LoginPreference.page';
import CreateNewPassword from '../pages/Profile/CreateNewPassword.page.js';
import ShareReferralCode from '../pages/Mgm/ShareReferralCodeMgm.page';
import HowReferralWorks from '../pages/Mgm/HowReferralWorks.page';
import MyHistoryReward from '../pages/Mgm/MyHistoryReward.page';
import MyInvitingRecord from '../pages/Mgm/MyInvitingRecord.page';
import FilterCalendarPicker from '../pages/Mgm/FilterCalendarPicker.page';
import DetailTransactionMgm from '../pages/Mgm/TransactionDetailMgm.page';
import MgmTncReferFriend from '../pages/Mgm/MgmTncReferFriend.page';
import LuckyDipEvoucherDetail from '../pages/LuckyDraw/LuckyDipInformationDetaileVoucher.page';
import QRRegisterStatusPage from '../pages/QRGpn/QRRegisterStatus.page';
import QRTerminalStatusPage from '../pages/QRGpn/QRTerminalStatus.page';
import QRRefundStatusPage from '../pages/QRGpn/QRRefundStatus.page';
import QRTrfShow from '../pages/QRGpn/QRTrfShow.page';
import QRTrfConfirm from '../pages/QRGpn/QRTrfConfirm.page';
import QRTerminalEditStatusPage from '../pages/QRGpn/QRTerminalEditStatus.page';
import QRTerminalResetStatusPage from '../pages/QRGpn/QRTerminalResetStatus.page';
import QRTerminalDelStatusPage from '../pages/QRGpn/QRTerminalDelStatus.page';
import FundTransferMethodScreen from '../pages/FundTransferJourney/FundTransferMethod.page';
import FundTransferScheduleScreen from '../pages/FundTransferJourney/FundTransferSchedule.page';
import AccountEditProfile from '../pages/Account/AccountEditProfile.page';
import SuccessVerification from '../pages/Account/SuccessVerification.page';
import ConfirmEditProfile from '../pages/Account/ConfirmEditProfile.page';
import ConfirmEditProfileSelfieCamera from '../pages/Account/ConfirmEditProfileSelfieCamera.page';
import ConfirmImageEditProfile from '../pages/Account/ConfirmImageEditProfile.page';
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
import AddNewAtmChooseSavings from '../pages/ManageAtmCard/AddNewAtmChooseSavings.page';
import AddNewAtmCardChooseAddress from '../pages/ManageAtmCard/AddNewAtmCardChooseAddress.page';
import AddNewAtmSuccessScreen from '../pages/ManageAtmCard/AddNewAtmSuccessScreen.page';
import AddNewAtmCardConfirmation from '../pages/ManageAtmCard/AddNewAtmCardConfirmation.page';
import RemittanceSwiftCode from '../pages/FundTransferJourney/RemittanceSwiftCode.page';
import RemittanceBankInformation from '../pages/FundTransferJourney/RemittanceBankInformation.page';
import RemittanceRecipientData from '../pages/FundTransferJourney/RemittanceRecipientData.page';
import RemittanceSenderData from '../pages/FundTransferJourney/RemittanceSenderData.page';
import RemittanceTransferPayment from '../pages/FundTransferJourney/RemittanceTransferPayment.page';
import RemittanceTransferConfirmation from '../pages/FundTransferJourney/RemittanceTransferConfirmation.page';
import PaymentStatusRemittance from '../pages/PaymentStatus/PaymentStatusRemittance.page';
import FundTransferMethodRemittance from '../pages/FundTransferJourney/FundTransferMethod.page';
import FundTransferRemittanceScheduleScreen from '../pages/FundTransferJourney/FundTransferSchedule.page';

// manage atm cardData
import ChooseServices from '../pages/ManageAtmCard/ChooseServices.page';
import ActiveList from '../pages/ManageAtmCard/ActiveList.page';
import BlockList from '../pages/ManageAtmCard/BlockList.page';
import CloseCard from '../pages/ManageAtmCard/CloseCard.page';
import ChooseCloseCard from '../pages/ManageAtmCard/ChooseCloseCard.page';
import ClosingTnc from '../pages/ManageAtmCard/ClosingTnc.page';

// autodebitList
import AutodebitList from '../pages/Account/AutoDebitList.page';
import AutodebitSearch from '../pages/Account/AutoDebitListSearch.page';
import EmoneySuccessRegistration from '../pages/DigitalAccountOpening/EmoneySuccessRegistration.page';

// Special Deals Linking
import SpecialDealsLogin from '../pages/OnboardingJourney/LoginWithEasyPinSpecialDeals.page';
import CcDownloadToScreen from '../pages/CreditCardHistoryJourney/OrderDetail.page';
import ProductAll from '../pages/OnboardingJourney/OnboardingProduct.page';
import SimasValasProductTypeSelections from '../pages/SimasValas/ProductTypeSelections.page';
import SimasValasChooseCurrency from '../pages/SimasValas/SimasValasChooseCurrency.page';
import MembershipDetail from '../pages/Account/MembershipDetail.page';
import LuckyDrawTnC from '../pages/LuckyDraw/LuckyDrawTnC.page.js';

const OnboardingRoutes = StackNavigator(
  {
    Landing: {
      screen: LandingPage,
      path: 'index',
      navigationOptions: navHeaders.noHeader,
    },
    LuckyDip: {
      screen: LuckyDip,
      navigationOptions: navHeaders.LuckyDipRightHeader,
    },
    LuckyDipInformationPage: {
      screen: LuckyDipInformation,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'LUCKYDRAW__TITLE'} />,
        tabBarVisible: false,
      },
    },
    LuckyDipHistoryPage: {
      screen: LuckyDipHistory,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'LUCKYDRAW__TITLE'} />,
        tabBarVisible: false,
      },
    },
    LuckyDipInformationDetailPage: {
      screen: LuckyDipInformationDetail,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'LUCKYDRAW__TITLE'} />,
        tabBarVisible: false,
      },
    },
    Login: {
      screen: Loginscreen,
      navigationOptions: navHeaders.LandingHeaderNewOnboarding,
    },
    VerifyEmailEmoney: {
      screen: VerifyEmailEmoney,
      navigationOptions: {
        ...navHeaders.noHeader,
        tabBarVisible: false,
      },
    },
    EmoneyActivationOTP: {
      screen: EmoneyActivationOTP,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerGreen,
        tabBarVisible: false,
      },
    },
    ActivationForm: {
      screen: ActivationForm,
      navigationOptions: {
        ...navHeaders.noHeader,
        tabBarVisible: false,
      },
    },
    CouponList: {
      screen: CouponList,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="HEADER__COUPON" />,
        tabBarVisible: false,
      },
    },
    DetailCouponList: {
      screen: DetailCouponList,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="HEADER__COUPON" />,
        tabBarVisible: false,
      },
    },
    MerchantDashboard: {
      screen: MerchantDashboard,
      navigationOptions: navHeaders.merchantHeader,
    },
    MerchantShippingMethod: {
      screen: MerchantShippingMethod,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="ALFACART_SHIPPING_METHOD__TITTLE" />
        ),
        tabBarVisible: false,
      },
    },
    MerchantCart: {
      screen: MerchantCart,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="ALFACART_SHIPPING_METHOD__TITTLE" />
        ),
        tabBarVisible: false,
      },
    },
    DetailProductMerchant: {
      screen: DetailProductMerchant,
      navigationOptions: navHeaders.merchantHeader,
    },
    FailedPageActivation: {
      screen: FailedPageActivation,
      navigationOptions: {
        ...navHeaders.noHeader,
        tabBarVisible: false,
      },
    },
    ActivationSuccess: {
      screen: ActivationSuccess,
      navigationOptions: navHeaders.noHeader,
    },
    // ChooseProductsIntroduction: {
    //   screen: ChooseProducts,
    //   navigationOptions: navHeaders.chooseProduct
    // },
    RegisterWithATMReceipt: {
      screen: Loginscreen,
      navigationOptions: navHeaders.EasyPinInHeader,
    },
    Introduction: {
      screen: IntroductionPage,
      navigationOptions: {
        ...navHeaders.noHeader,
        tabBarVisible: false,
      },
    },
    ConfirmationAccount: {
      screen: ConfirmationAccountPage,
    },
    IdentityForm: {
      screen: IdentityPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="IDENTITYFIFTHFORM__TITLE_HEADER_BAR" />
        ),
      },
    },
    IdentitySecondForm: {
      screen: IdentitySecondPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="IDENTITYFIFTHFORM__TITLE_HEADER_BAR" />
        ),
      },
    },
    IdentityThirdForm: {
      screen: IdentityThirdPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="IDENTITYFIFTHFORM__TITLE_HEADER_BAR" />
        ),
      },
    },
    IdentityFourthForm: {
      screen: IdentityFourthPage,
    },
    IdentityFifthForm: {
      screen: IdentityFifthPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="IDENTITYFIFTHFORM__TITLE_HEADER" />
        ),
      },
    },
    LearnMoreProductPage: {
      screen: LearnMoreProductPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="IDENTITYTHIRDFORM__LEARN_ABOUT_PRODUCT_WEB_PAGE" />
        ),
      },
    },
    HowToTransferPage: {
      screen: HowToTransferPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="HOWTOTRANSFER__TITLE" />,
      },
    },
    LoginWithEasyPin: {
      screen: LoginWithEasyPinPage,
      navigationOptions: navHeaders.LoginPasswordInHeader,
    },
    LoginWithEasyPinRevamp: {
      screen: LoginWithEasyPinPageRevamp,
      navigationOptions: navHeaders.LoginPasswordInHeaderRevamp,
    },
    RegisterAtm: {
      screen: RegisterAtmPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerNewBrand,
        headerTitle: <HeaderTitle langKey={''} />,
        tabBarVisible: false,
      },
    },
    RegisterByPhone: {
      screen: ResetByPhoneNumberForm,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerNewBrand,
        headerTitle: <HeaderTitle langKey={''} />,
        tabBarVisible: false,
      },
    },
    RegisterByPhoneLastForm: {
      screen: ResetByPhoneNumberLastForm,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerNewBrand,
        headerTitle: <HeaderTitle langKey={''} />,
        tabBarVisible: false,
      },
    },
    ResetPasswordEmailToken: {
      screen: ResetPasswordEmailToken,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerNewBrand,
        headerTitle: <HeaderTitle langKey={''} />,
        tabBarVisible: false,
      },
    },
    RegisterPin: {
      screen: RegisterPinPage,
      navigationOptions: {
        ...navHeaders.RegisterInHeader,
        tabBarVisible: false,
      },
    },
    OTP: {
      screen: OnboardingOTP,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerGreen,
        tabBarVisible: false,
      },
    },
    TermsEmoney: {
      screen: TermsEmoney,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="TERMS_AND_CONDITION" />,
      },
    },
    LoginAccount: {
      screen: LoginAccount,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        tabBarVisible: false,
      },
    },
    EasyPin: {
      screen: EasyPin,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrand,
        tabBarVisible: false,
      },
    },
    EasyPinConfirm: {
      screen: EasyPinConfirm,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrand,
        tabBarVisible: false,
      },
    },
    EasyPinVerify: {
      screen: EasyPinVerify,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrand,
        tabBarVisible: false,
      },
    },
    CompletedOnboarding: {
      screen: CompletedOnboarding,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
    CameraPage: {
      screen: CameraScreen,
      navigationOptions: navHeaders.FaceRecognitionLoginTitle,
    },
    NewAccountCameraPage: {
      screen: NewAccountCameraScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="OPEN_NEW_ACCOUNT__TITLE" />,
      },
    },
    KTPCameraPage: {
      screen: KTPCameraScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="OPEN_NEW_ACCOUNT__TITLE" />,
      },
    },
    SignaturePage: {
      screen: SignatureScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="OPEN_NEW_ACCOUNT__TITLE" />,
      },
    },
    MigrateLandingPage: {
      screen: MigrateLandingPage,
      navigationOptions: noHeader,
    },
    MigrateEnded: {
      screen: MigrateEnded,
      navigationOptions: noHeader,
    },
    MigrateError: {
      screen: MigrateError,
      navigationOptions: noHeader,
    },
    AlfacartTnc: {
      screen: AlfacartTnc,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'ALFACART_TEXT_TNC_TITLE'} />,
        tabBarVisible: false,
      },
    },
    OfferDetail: {
      screen: OfferDetailScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'OFFERS__OFFER_DETAIL'} />,
        tabBarVisible: false,
      },
    },
    FAQform: {
      screen: FAQform,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="HELP__FREQUENTLY_ASKED_QUESTIONS" />
        ),
        tabBarVisible: false,
      },
    },
    WebForm: {
      screen: FAQform,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="DRAWER__TERM_CONDITION_LINK" />,
        tabBarVisible: false,
      },
    },
    Offers: {
      screen: OfferScreen,
      navigationOptions: navHeaders.offerSeeall,
    },
    QRGpnScreen: {
      screen: QRGpnRoutes,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'QR_GPN'} />,
        tabBarVisible: false,
      },
    },
    SmartPromoAbout: {
      screen: SmartPromoAbout,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="IDENTITYTHIRDFORM__LEARN_ABOUT_PRODUCT_WEB_PAGE" />
        ),
      },
    },
    AgreementScreen: {
      screen: AgreementScreen,
      navigationOptions: noHeader,
    },
    RegisterEmoneyScreen: {
      screen: RegisterEmoneyScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="EMONEY__REGISTER" />,
        tabBarVisible: false,
      },
    },
    ConfirmEmailScreen: {
      screen: ConfirmationEmail,
      navigationOptions: noHeader,
    },
    ChooseProducts: {
      screen: ChooseProducts,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="PRODUCTS__SELECTIONS" />,
        tabBarVisible: false,
      },
    },
    ChooseCreditCard: {
      screen: ChooseCreditCard,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PRODUCTS__CREDITCARD_TITLE'} />,
        tabBarVisible: false,
      },
    },
    ChooseSavingAccount: {
      screen: ChooseSavingAccount,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PRODUCTS__SAVING_TITLE'} />,
        tabBarVisible: false,
      },
    },
    IndigoTnC: {
      screen: IndigoTnC,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PRODUCTS__CREDITCARD_TITLE'} />,
        tabBarVisible: false,
      },
    },
    ProductDetail: {
      screen: ProductDetailScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'EGIFT__REDEEM_SIMAS_POIN'} />,
        tabBarVisible: false,
      },
    },
    EgiftCart: {
      screen: CartScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'EGIFT__CART_HEADER'} />,
        tabBarVisible: false,
      },
    },
    TabShopping: {
      screen: TabShopping,
      navigationOptions: navHeaders.offersShopHeader,
    },
    CreateCCAccount: {
      screen: CreateCCAccountScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'CREDITCARD__NAVBAR'} />,
        tabBarVisible: false,
      },
    },
    CreateAccountOTP: {
      screen: CreateAccountOTPScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerGreen,
        tabBarVisible: false,
      },
    },
    CreditCardKTPCamera: {
      screen: CreditCardKTPCamera,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    MissingForm: {
      screen: MissingForm,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CREDITCARD__NAVBAR" />,
        tabBarVisible: false,
      },
    },
    CreditCardForm1: {
      screen: CreditCardForm1,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CREDITCARD__NAVBAR" />,
        tabBarVisible: false,
      },
    },
    Checkpoint: {
      screen: CcCheckpoint,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CREDITCARD__NAVBAR" />,
        tabBarVisible: false,
      },
    },
    AuthCCForm: {
      screen: Authenticate,
      navigationOptions: navHeaders.AuthenticateHeader,
    },
    AuthDashboard: {
      screen: Authenticate,
      navigationOptions: navHeaders.AuthenticateHeader,
    },
    CreditCardForm2: {
      screen: CreditCardForm2,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CREDITCARD__NAVBAR" />,
        tabBarVisible: false,
      },
    },
    CreditCardForm3: {
      screen: CreditCardForm3,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CREDITCARD__NAVBAR" />,
        tabBarVisible: false,
      },
    },
    CreditCardForm4: {
      screen: CreditCardForm4,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CREDITCARD__NAVBAR" />,
        tabBarVisible: false,
      },
    },
    CreditCardForm5: {
      screen: CreditCardForm5,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CREDITCARD__NAVBAR" />,
        tabBarVisible: false,
      },
    },
    CreditCardForm6: {
      screen: CreditCardForm6,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CREDITCARD__NAVBAR" />,
        tabBarVisible: false,
      },
    },
    CreditCardForm7: {
      screen: CreditCardForm7,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CREDITCARD__NAVBAR" />,
        tabBarVisible: false,
      },
    },
    CreditCardForm8: {
      screen: CreditCardForm8,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CREDITCARD__NAVBAR" />,
        tabBarVisible: false,
      },
    },
    CreditCardForm9: {
      screen: CreditCardForm9,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CREDITCARD__NAVBAR" />,
        tabBarVisible: false,
      },
    },
    CreditCardNPWPCamera: {
      screen: CreditCardNPWPCameraScreen,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    CreditCardDelivery: {
      screen: CreditCardDeliveryScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CREDITCARD__NAVBAR" />,
        tabBarVisible: false,
      },
    },
    CreditCardFinalize: {
      screen: CreditCardFinalizeScreen,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    DukcapilNotMatch: {
      screen: DukcapilNotMatch,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    ImageConfirmation: {
      screen: ImageConfirmationScreen,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    SelectSeat: {
      screen: SelectSeatScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CGV__SELECT_SEAT" />,
        headerRight: <HeaderCgv />,
        tabBarVisible: false,
      },
    },
    CgvTab: {
      screen: CgvTabScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'CGV_TAB_OFFER'} />,
        headerRight: <HeaderCgv />,
        tabBarVisible: false,
      },
    },
    EmallLogin: {
      screen: EmallLogin,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrand,
        tabBarVisible: false,
      },
      tabBarVisible: false,
    },
    GeneralLogin: {
      screen: GeneralLogin,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrand,
      },
      tabBarVisible: false,
    },
    CgvMovieDetail: {
      screen: CgvMovieDetail,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'CGV_TAB_MOVIE_DETAIL'} />,
        headerRight: <HeaderCgv />,
      },
    },
    CgvSchedule: {
      screen: CgvSchedule,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'CGV_TAB_SCHEDULE_TITTLE'} />,
        headerRight: <HeaderCgv />,
      },
    },
    SimasPoinHistory: {
      screen: SimasPoinHistory,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: <HeaderTitle titleWhiteTrf="SIMAS_POIN__HISTORY" />,
        tabBarVisible: false,
      },
    },
    SimasPoinLogin: {
      screen: SimasPoinLogin,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrand,
        tabBarVisible: false,
      },
    },
    QRScannerDiscount: {
      screen: QRScannerDiscountScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'QR_DISCOUNT__SCANNER_TITLE'} />,
        tabBarVisible: false,
      },
    },
    QRDiscountEULA: {
      screen: QRDiscountEULAScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'QR_DISCOUNT__SCANNER_TITLE'} />,
        tabBarVisible: false,
      },
    },
    QRInvoiceData: {
      screen: QRInvoiceDataScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'QR_DISCOUNT__INVOICE_TITLE'} />,
        headerLeft: null,
        tabBarVisible: false,
      },
    },
    QRMerchantDeals: {
      screen: QRMerchantDealScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'QR_DISCOUNT__DEALS_TITLE'} />,
        tabBarVisible: false,
      },
    },
    QRDealDetail: {
      screen: QRDealDetailScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'QR_DISCOUNT__DEALS_TITLE'} />,
        tabBarVisible: false,
      },
    },
    FlightMain: {
      screen: FlightRoutes,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'FLIGHT__TITLE'} />,
        tabBarVisible: false,
      },
    },
    MerchantListScreen: {
      screen: MerchantListScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'QR_DISCOUNT__DEALS_TITLE'} />,
        tabBarVisible: false,
      },
    },
    EgiftLogin: {
      screen: EgiftLogin,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrand,
        tabBarVisible: false,
      },
    },
    MerchantLogin: {
      screen: MerchantLogin,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrand,
        tabBarVisible: false,
      },
    },
    SavingTnC: {
      screen: SavingTnC,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PRODUCTS__SAVING_TITLE'} />,
        tabBarVisible: false,
      },
    },
    CreateSavingAccount: {
      screen: CreateSavingAccountScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'CREDITCARD__NAVBAR'} />,
        tabBarVisible: false,
      },
    },
    SavingAccountOTP: {
      screen: CreateSavingAccountOTPScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerGreen,
        tabBarVisible: false,
      },
    },
    SavingKTPCamera: {
      screen: SavingKTPCamera,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    SavingImageConfirmation: {
      screen: SavingImageConfirmationScreen,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    SavingEmailForm: {
      screen: SavingEmailFormScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CREDITCARD__NAVBAR" />,
        tabBarVisible: false,
      },
    },
    SavingAccountConfirmation: {
      screen: SavingAccountConfirmation,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CREDITCARD__NAVBAR" />,
        tabBarVisible: false,
      },
    },
    SavingSourceAccount: {
      screen: SavingSourceAccount,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CREDITCARD__NAVBAR" />,
        tabBarVisible: false,
      },
    },
    SavingAccountEasyPIN: {
      screen: Authenticate,
      navigationOptions: navHeaders.AuthenticateHeader,
    },
    SavingAccountForm1: {
      screen: SavingAccountForm1,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CREDITCARD__NAVBAR" />,
        tabBarVisible: false,
      },
    },
    SavingAccountForm2: {
      screen: SavingAccountForm2,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CREDITCARD__NAVBAR" />,
        tabBarVisible: false,
      },
    },
    SavingAccountForm3: {
      screen: SavingAccountForm3,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CREDITCARD__NAVBAR" />,
        tabBarVisible: false,
      },
    },
    SavingAccountForm4: {
      screen: SavingAccountForm4,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CREDITCARD__NAVBAR" />,
        tabBarVisible: false,
      },
    },
    SavingAccountForm5: {
      screen: SavingAccountForm5,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CREDITCARD__NAVBAR" />,
        tabBarVisible: false,
      },
    },
    SavingAccountForm7: {
      screen: SavingAccountForm7,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CREDITCARD__NAVBAR" />,
        tabBarVisible: false,
      },
    },
    SavingNPWPCamera: {
      screen: SavingNPWPCamera,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    SavingCheckpoint: {
      screen: SavingCheckpoint,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CREDITCARD__NAVBAR" />,
        tabBarVisible: false,
      },
    },
    SavingMissingForm: {
      screen: SavingMissingForm,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="CREDITCARD__NAVBAR" />,
        tabBarVisible: false,
      },
    },
    SavingAccountFinalize: {
      screen: SavingAccountFinalizeScreen,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    SavingDukcapilNotMatch: {
      screen: SavingDukcapilNotMatch,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    Locator: {
      screen: Locator,
      navigationOptions: navHeaders.atmLocator,
    },
    SearchATMBranch: {
      screen: SearchATMBranch,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'ATM_LOCATOR__SEARCHBYLOC'} />,
        tabBarVisible: false,
      },
    },
    AccountSettings: {
      screen: AccountSettings,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="ACCOUNT__SETTING_TITLE" />,
        tabBarVisible: false,
      },
    },
    LanguageSetting: {
      screen: LanguageSettingScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PROFILE__SELECT_LANGUAGE'} />,
        tabBarVisible: false,
      },
    },
    InternetBankingSettings: {
      screen: InternetBankingSettingsScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE_INTERNET_BANKING'} />,
        tabBarVisible: false,
      },
    },
    MainGenerateCodeOffline: {
      screen: GenerateCodeOfflineMain,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack={'GENERATE_CODE_MAIN_MENU_OFFLINE'} />
        ),
        tabBarVisible: false,
      },
    },
    GenerateCodeTnc: {
      screen: GenerateCodeTnc,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'GENERATE_CODE_TNC'} />,
        tabBarVisible: false,
      },
    },
    MainGenerateCode: {
      screen: MainGenerateCode,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'GENERATE_FORM_MERCHANT'} />,
        tabBarVisible: true,
      },
    },
    GenerateForm: {
      screen: GenerateForm,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'GENERATE_CODE_FORM'} />,
        tabBarVisible: false,
      },
    },
    GenerateCodeOffLine: {
      screen: GenerateCode,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'GENERATE_CODE_OFFLINE'} />,
        tabBarVisible: false,
      },
    },
    GenerateCodeTimeout: {
      screen: GenerateCodeTimeout,
      navigationOptions: navHeaders.noHeader,
    },
    TapGenerateCode: {
      screen: TapGenerateCode,
      navigationOptions: navHeaders.noHeader,
    },
    TapGenerateCodeNumber: {
      screen: TapGenerateCodeNumber,
      navigationOptions: navHeaders.noHeader,
    },
    GenerateCode: {
      screen: GenerateCode,
      navigationOptions: navHeaders.noHeader,
    },
    LoginChangeDevice: {
      screen: LoginChangeDevice,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'RELEASE__DEVICE__QR'} />,
        tabBarVisible: false,
      },
    },
    LoginChangeDeviceResult: {
      screen: LoginChangeDeviceResult,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'RELEASE__DEVICE__QR'} />,
        tabBarVisible: false,
      },
    },
    OTPchangeDevice: {
      screen: OTPchangeDevice,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerGreen,
        tabBarVisible: false,
      },
    },
    EasyPinChangeDevice: {
      screen: EasyPinChangeDevice,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrand,
        tabBarVisible: false,
      },
    },
    PayScreenOnboard: {
      screen: Pay,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack={'DETAIL_TRANSACTION__TITLE_BILL_PAYMENT'} />
        ),
        tabBarVisible: false,
      },
    },
    QRPayment: {
      screen: QRPaymentScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PAY_QRPAYMENT__TITLE'} />,
        tabBarVisible: false,
      },
    },
    Profile: {
      screen: ProfileRoutes,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
    CreditCard: {
      screen: CreditCardScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__CREDIT_CARD_BILL_PAY'} />,
        tabBarVisible: false,
      },
    },
    CreditCardAccountInput: {
      screen: CreditCardAccountInputScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__CREDIT_CARD_BILL_PAY'} />,
        tabBarVisible: false,
      },
    },
    CreditCardPayment: {
      screen: CreditCardPaymentScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__CREDIT_CARD_BILL_PAY'} />,
        tabBarVisible: false,
      },
    },
    CreditCardConfirmation: {
      screen: CreditCardConfirmationScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack={'TITLE__CREDIT_CARD_CONFIRMATION'} />
        ),
        tabBarVisible: false,
      },
    },
    CreditCardSelectBank: {
      screen: CreditCardSelectBankScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__CREDIT_CARD_BILL_PAY'} />,
        tabBarVisible: false,
      },
    },

    GenericBiller: {
      screen: GenericBillerListScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
        tabBarVisible: false,
      },
    },

    // TYPE ONE
    BillerTypeOne: {
      screen: BillerTypeOneIndexScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
        tabBarVisible: false,
      },
    },
    BillerTypeOnePayment: {
      screen: BillerTypeOnePaymentScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
        tabBarVisible: false,
      },
    },
    BillerTypeOneConfirmation: {
      screen: BillerTypeOneConfirmationScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER_CONFIRMATION'} />,
        tabBarVisible: false,
      },
    },

    // TYPE TWO
    BillerTypeTwo: {
      screen: BillerTypeTwoIndexScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
        tabBarVisible: false,
      },
    },
    BillerTypeTwoPayment: {
      screen: BillerTypeTwoPaymentScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
        tabBarVisible: false,
      },
    },
    BillerTypeTwoConfirmation: {
      screen: BillerTypeTwoConfirmationScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER_CONFIRMATION'} />,
        tabBarVisible: false,
      },
    },

    // TYPE THREE
    BillerTypeThree: {
      screen: BillerTypeThreeIndexScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
        tabBarVisible: false,
      },
    },
    BillerTypeThreePayment: {
      screen: BillerTypeThreePaymentScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
        tabBarVisible: false,
      },
    },
    BillerTypeThreeConfirmation: {
      screen: BillerTypeThreeConfirmationScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER_CONFIRMATION'} />,
        tabBarVisible: false,
      },
    },

    // TYPE SIX
    BillerTypeSix: {
      screen: BillerTypeSixIndexScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
        tabBarVisible: false,
      },
    },
    BillerTypeSixPayment: {
      screen: BillerTypeSixPaymentScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
        tabBarVisible: false,
      },
    },
    BillerTypeSixConfirmation: {
      screen: BillerTypeSixConfirmationScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER_CONFIRMATION'} />,
        tabBarVisible: false,
      },
    },

    // TYPE SEVEN
    BillerTypeSeven: {
      screen: BillerTypeSevenIndexScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
        tabBarVisible: false,
      },
    },
    BillerTypeSevenPayment: {
      screen: BillerTypeSevenPaymentScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
        tabBarVisible: false,
      },
    },
    BillerTypeSevenConfirmation: {
      screen: BillerTypeSevenConfirmationScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER_CONFIRMATION'} />,
        tabBarVisible: false,
      },
    },

    // TYPE EIGHT
    BillerTypeEight: {
      screen: BillerTypeEightIndexScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
        tabBarVisible: false,
      },
    },
    BillerTypeEightPayment: {
      screen: BillerTypeEightPaymentScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
        tabBarVisible: false,
      },
    },
    BillerTypeEightConfirmation: {
      screen: BillerTypeEightConfirmationScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER_CONFIRMATION'} />,
        tabBarVisible: false,
      },
    },

    // TYPE NINE
    BillerTypeNine: {
      screen: BillerTypeNineIndexScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
        tabBarVisible: false,
      },
    },
    BillerTypeNinePayment: {
      screen: BillerTypeNinePaymentScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
        tabBarVisible: false,
      },
    },
    BillerTypeNineConfirmation: {
      screen: BillerTypeNineConfirmationScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER_CONFIRMATION'} />,
        tabBarVisible: false,
      },
    },

    // TYPE TEN
    BillerTypeTen: {
      screen: BillerTypeTenIndexScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
        tabBarVisible: false,
      },
    },
    BillerTypeTenForm: {
      screen: BillerTypeTenFormScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
        tabBarVisible: false,
      },
    },
    BillerTypeTenPayment: {
      screen: BillerTypeTenPaymentScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER'} />,
        tabBarVisible: false,
      },
    },
    BillerTypeTenConfirmation: {
      screen: BillerTypeTenConfirmationScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILLER_CONFIRMATION'} />,
        tabBarVisible: false,
      },
    },
    BillerTypeTeSearchAreaName: {
      screen: BillerTypeTeSearchAreaName,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack={'GENERIC_BILLER__INPUT_AREA__HEADER'} />
        ),
        tabBarVisible: false,
      },
    },
    QRInvoiceDetail: {
      screen: QRInvoiceDetailScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILL_PAY'} />,
        tabBarVisible: false,
      },
    },
    QRInputAmount: {
      screen: QRInputAmountScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILL_PAY'} />,
        tabBarVisible: false,
      },
    },
    QRConfirmation: {
      screen: QRInputConfirmationScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILL_PAY'} />,
        tabBarVisible: false,
      },
    },
    Auth: {
      screen: Authenticate,
      navigationOptions: navHeaders.AuthenticateHeader,
    },
    HomeScreen: {
      screen: Homescreen,
      navigationOptions: navHeaders.DashboardNavConfig,
    },
    PaymentStatusNewOnboarding: {
      screen: PaymentStatusNewPage,
      navigationOptions: {
        ...navHeaders.noHeader,
        tabBarVisible: false,
      },
    },
    NewPaymentStatusNewOnboarding: {
      screen: NewPaymentStatusRevampPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: (
          <HeaderTitle titleWhiteTrf="EMONEY_TOPUP_SIMAS_SP_7__WORD_1" />
        ),
        tabBarVisible: false,
      },
    },
    QRConfirm: {
      screen: QRConfirmPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: <HeaderTitle titleWhiteTrf="QR_GPN_ISSUER_CONFIRM" />,
        tabBarVisible: false,
      },
    },
    WithdrawalForm: {
      screen: WithdrawalForm,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="QR_GPN_ISSUER_CONFIRM" />,
        tabBarVisible: false,
      },
    },
    BillerAccount: {
      screen: BillerAccount,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__BILL_PAY'} />,
        tabBarVisible: false,
      },
    },
    Insurance: {
      screen: InsurancePage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE'} />,
        tabBarVisible: false,
      },
    },
    resultPA: {
      screen: ResultPAPage,
      navigationOptions: {
        headerLeft: null,
        tabBarVisible: false,
      },
    },
    MainGenerateCode0: {
      screen: MainGenerateCode,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'GENERATE_CODE_MAIN_MENU'} />,
        tabBarVisible: false,
      },
    },
    GenerateCodeOnline: {
      screen: GenerateCodeOnline,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'OFFLINE_TRX_TITLE'} />,
        tabBarVisible: false,
      },
    },
    PremiPA: {
      screen: PremiPAPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE'} />,
        tabBarVisible: false,
      },
    },
    formDataPA: {
      screen: FormDataPAPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE'} />,
        tabBarVisible: false,
      },
    },
    FormDataBeneficiaryPA: {
      screen: FormDataBeneficiaryPAPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE'} />,
        tabBarVisible: false,
      },
    },
    confirmationPA: {
      screen: ConfirmationPAPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE'} />,
        tabBarVisible: false,
      },
    },
    DetailPA: {
      screen: DetailPAPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE_DETAIL'} />,
        tabBarVisible: false,
      },
    },
    TravelDetail: {
      screen: TravelDetailPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE__TRAVEL'} />,
        tabBarVisible: false,
      },
    },
    TravelCustomerForm: {
      screen: TravelCustomerFormPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE__TRAVEL'} />,
        tabBarVisible: false,
      },
    },
    TravelConfirm: {
      screen: TravelConfirmPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE__TRAVEL'} />,
        tabBarVisible: false,
      },
    },
    PlanTravel: {
      screen: PlanTravelPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE'} />,
        tabBarVisible: false,
      },
    },
    TravelCustomer: {
      screen: TravelCustomerPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE__TRAVEL'} />,
        tabBarVisible: false,
      },
    },
    TravelInsurance: {
      screen: TravelInsurancePage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE__TRAVEL'} />,
        tabBarVisible: false,
      },
    },
    TravelInsuranceTnC: {
      screen: TravelInsuranceTnC,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TERMS_AND_CONDITION__HEADER'} />,
        tabBarVisible: false,
      },
    },
    TravelBeneficiary: {
      screen: TravelBeneficiaryPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE__TRAVEL'} />,
        tabBarVisible: false,
      },
    },
    TravelResult: {
      screen: TravelResultPage,
      navigationOptions: {
        ...navHeaders.noHeader,
        tabBarVisible: false,
      },
    },
    // ChooseProductsEmoney: {
    //   screen: ChooseProducts,
    //   navigationOptions: navHeaders.LandingChooseProductEmoney
    // },
    EForm: {
      screen: EForm,
      navigationOptions: navHeaders.eformHeaderPGO,
    },
    SourceAccount: {
      screen: SourceAccount,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'CREDITCARD__NAVBAR'} />,
        tabBarVisible: false,
      },
    },
    ChooseLoanAccount: {
      screen: LoanProductsPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PRODUCTS__LOAN_TITLE'} />,
        tabBarVisible: false,
      },
    },
    NewEForm: {
      screen: NewEForm,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PRODUCTS__LOAN_TITLE'} />,
        tabBarVisible: false,
      },
    },
    LoanSourceAccount: {
      screen: LoanSourceAccount,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'CREDITCARD__NAVBAR'} />,
        tabBarVisible: false,
      },
    },
    EFormLoanTnC: {
      screen: EFormLoanTnC,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PGO__TITLE_LOAN'} />,
        tabBarVisible: false,
      },
    },
    EFormLoanSuccess: {
      screen: EFormLoanSuccess,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PGO__TITLE_LOAN'} />,
      },
    },

    QrPaymentStatusNewOnboarding: {
      screen: QRpaymentStatusPage,
      navigationOptions: noHeader,
    },

    AlfacartDashboard: {
      screen: AlfacartDashboard,
      navigationOptions: navHeaders.digitalStoreHeader,
    },

    WishlistAlfacart: {
      screen: WishlistAlfacart,
      navigationOptions: navHeaders.wishlistAlfacartCartHeader,
    },
    AlfacartCart: {
      screen: AlfacartCart,
      navigationOptions: navHeaders.alfacartCartHeader,
    },

    AlfacartCheckout: {
      screen: AlfacartCheckout,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'ALFACART__HEADER_TITTLE'} />,
        tabBarVisible: false,
      },
    },
    AlfacartShippingMethod: {
      screen: AlfacartShippingMethod,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="ALFACART_SHIPPING_METHOD__TITTLE" />
        ),
        tabBarVisible: false,
      },
    },

    CategoryAlfacart: {
      screen: CategoryAlfacart,
      navigationOptions: navHeaders.digitalStoreHeader,
    },

    DetailProductAlfacart: {
      screen: DetailProductAlfacart,
      navigationOptions: navHeaders.digitalStoreHeader,
    },
    DetailProduct: {
      screen: DetailProduct,
      navigationOptions: navHeaders.alfacartHeaderReal,
    },

    ValidatePassword: {
      screen: ValidatePassword,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    feedbackPage: {
      screen: feedbackPage,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    PaymentStatusRevampOnboarding: {
      screen: PaymentStatusRevampPage,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    Transactions: {
      screen: Transactions,
      navigationOptions: navHeaders.transactionsNavConfig,
    },
    QrPaymentStatusOnboarding: {
      screen: QRpaymentStatusRevampPage,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    QrPaymentStatusOnboardingRevamp: {
      screen: NewQrStatusRevamp,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    QrPaymentStatusOnboardingRevampSuccess: {
      screen: NewQrStatusRevamp,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: (
          <HeaderTitle titleWhiteTrf="QRCROSSBORDER_PAYMENT_HEADER_SUCCESS" />
        ),
        tabBarVisible: false,
      },
    },
    QrPaymentStatusOnboardingRevampPending: {
      screen: NewQrStatusRevamp,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: (
          <HeaderTitle titleWhiteTrf="QRCROSSBORDER_PAYMENT_HEADER_PENDING" />
        ),
        tabBarVisible: false,
      },
    },
    SearchAlfacartPage: {
      screen: searchAlfacartPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack={'ALFACART_SEARCH_PRODUCT_HEADER'} />
        ),
        tabBarVisible: false,
      },
    },
    ObmMigrate: {
      screen: ObmMigrate,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },

    // simas catalog
    UltraVoucherWebView: {
      screen: UltraVoucherWebView,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },

    UltraVoucherPaymentStatus: {
      screen: UltraVoucherPaymentStatus,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    UltraVoucherTnc: {
      screen: UltraVoucherTnc,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'ALFACART_TEXT_TNC_TITLE'} />,
        tabBarVisible: false,
      },
    },

    UnipinTnc: {
      screen: UnipinTnc,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'ALFACART_TEXT_TNC_TITLE'} />,
        tabBarVisible: false,
      },
    },
    // New Onboarding E-Money
    ChooseRegistration: {
      screen: ChooseRegistration,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerNewBrand,
        headerTitle: <HeaderTitle langKey={'EMONEY__REGISTER'} />,
        tabBarVisible: false,
      },
    },
    EmoneyDashboard: {
      screen: EmoneyDashboard,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerNewBrand,
        headerTitle: <HeaderTitle langKey={'EMONEY__BRAND'} />,
        tabBarVisible: false,
      },
    },
    TransactionEmoneyScreen: {
      screen: TransactionEmoney,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerNewBrand,
        headerTitle: <HeaderTitle langKey={'DASHBOARD__TRANSACTION_HEADER'} />,
        tabBarVisible: false,
      },
    },
    TransactionFilterEmoneyScreen: {
      screen: TransactionFilterEmoney,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="TRANSACTION_FILTER_TITLE" />,
        tabBarVisible: false,
      },
    },
    TransactionDetailEmoneyScreen: {
      screen: TransactionDetailEmoney,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="DETAIL_TRANSACTION__HEADER" />,
        tabBarVisible: false,
      },
    },
    homeRoutes: {
      screen: BankAccScreen,
      navigationOptions: {
        ...noHeader,
        // ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle langKey={'DASHBOARD__NEW_BANK_ACC'} />,
      },
    },
    PaymentStatusNew: {
      screen: PaymentStatusNew,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
      },
    },
    EmoneyUpgradeBenefit: {
      screen: EmoneyUpgradeBenefit,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'UPGRADE__EMONEY'} />,
        tabBarVisible: false,
      },
    },
    EmoneyUpgradeCamera: {
      screen: EmoneyUpgradeCamera,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'EMONEY__UPGRADE'} />,
        tabBarVisible: false,
      },
    },
    EmoneyUpgradeEmailForm: {
      screen: EmoneyUpgradeEmailForm,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'EMONEY__UPGRADE'} />,
        tabBarVisible: false,
      },
    },
    EmoneyUpgradeEmailVerification: {
      screen: EmoneyUpgradeEmailVerification,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'EMONEY__UPGRADE'} />,
        tabBarVisible: false,
      },
    },
    EmoneyKTPCamera: {
      screen: EmoneyKTPCamera,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    EmoneyKTPSelfieCamera: {
      screen: EmoneyKTPSelfieCamera,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    EmoneySelfieCamera: {
      screen: EmoneySelfieCamera,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    EmoneyImageConfirmation: {
      screen: EmoneyImageConfirmation,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    EmoneyUpgradeAuth: {
      screen: Authenticate,
      navigationOptions: navHeaders.AuthenticateHeader,
    },
    EmoneyUpgradeSuccessScreen: {
      screen: EmoneyUpgradeSuccessScreen,
      navigationOptions: navHeaders.closeHeader,
    },
    QRPaymentStatusRevamp: {
      screen: QRpaymentStatusRevampPage,
      navigationOptions: {
        ...navHeaders.noHeader,
        tabBarVisible: false,
      },
    },
    EmoneyTopUpATM: {
      screen: EmoneyTopUpATMScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'EMONEY_TOPUP__TITLE'} />,
        tabBarVisible: false,
      },
    },
    TransactionsFilter: {
      screen: TransactionsFilter,
      navigationOptions: navHeaders.transactionsFilterHeader,
    },
    InvestmentView: {
      screen: InvestmentViewScreen,
      navigationOptions: navHeaders.investmentHeader,
    },
    InquiryBuyPolis: {
      screen: InquiryBuyPolis,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="SINARMAS_ASJ" />,
        tabBarVisible: false,
      },
    },
    InquirySILScreen: {
      screen: InquirySIL,
      navigationOptions: navHeaders.InquirySil,
    },
    SmartInvestaLinkIDR: {
      screen: SmartInvestaLinkIDR,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="SIL__SMART__INVESMENT_LINK_IDR" />
        ),
        tabBarVisible: false,
      },
    },
    SmartInvestaLinkUSD: {
      screen: SmartInvestaLinkUSD,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="SIL__SMART__INVESMENT_LINK_USD" />
        ),
        tabBarVisible: false,
      },
    },
    SmartInvestaLinkBuyPolis: {
      screen: SmartInvestaLinkBuyPolis,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="SINARMAS__BUY_POLIS" />,
        tabBarVisible: false,
      },
    },
    SmartInvestaLinkBuyPolisTnCIDR: {
      screen: SmartInvestaLinkBuyPolisTnCIDR,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="SIL__SMART__INVESMENT_LINK_IDR" />
        ),
        tabBarVisible: false,
      },
    },
    SmartInvestaLinkBuyPolisTnCUSD: {
      screen: SmartInvestaLinkBuyPolisTnCUSD,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="SIL__SMART__INVESMENT_LINK_USD" />
        ),
        tabBarVisible: false,
      },
    },
    SmartInvestaLinkIDRProduct: {
      screen: SmartInvestaLinkIDRProduct,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="SIL__SMART__INVESMENT_LINK_IDR" />
        ),
        tabBarVisible: false,
      },
    },
    SmartInvestaLinkUSDProduct: {
      screen: SmartInvestaLinkUSDProduct,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="SIL__SMART__INVESMENT_LINK_USD" />
        ),
        tabBarVisible: false,
      },
    },
    SmartInvestaLinkIDRPolis: {
      screen: SmartInvestaLinkIDRPolis,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="SIL__SMART__INVESMENT_LINK_IDR" />
        ),
        tabBarVisible: false,
      },
    },
    SmartInvestaLinkUSDPolis: {
      screen: SmartInvestaLinkUSDPolis,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="SIL__SMART__INVESMENT_LINK_USD" />
        ),
        tabBarVisible: false,
      },
    },
    SmartInvestaLinkPolisForm2IDR: {
      screen: SmartInvestaLinkPolisForm2IDR,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="SIL__SMART__INVESMENT_LINK_IDR" />
        ),
        tabBarVisible: false,
      },
    },
    SmartInvestaLinkPolisForm2USD: {
      screen: SmartInvestaLinkPolisForm2USD,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="SIL__SMART__INVESMENT_LINK_USD" />
        ),
        tabBarVisible: false,
      },
    },
    SmartInvestaLinkPolisForm3IDR: {
      screen: SmartInvestaLinkPolisForm3IDR,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="SIL__SMART__INVESMENT_LINK_IDR" />
        ),
        tabBarVisible: false,
      },
    },
    SmartInvestaLinkPolisForm3USD: {
      screen: SmartInvestaLinkPolisForm3USD,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="SIL__SMART__INVESMENT_LINK_USD" />
        ),
        tabBarVisible: false,
      },
    },
    SmartInvestaLinkPolisForm4IDR: {
      screen: SmartInvestaLinkPolisForm4IDR,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="SIL__SMART__INVESMENT_LINK_IDR" />
        ),
        tabBarVisible: false,
      },
    },
    SmartInvestaLinkPolisForm4USD: {
      screen: SmartInvestaLinkPolisForm4USD,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="SIL__SMART__INVESMENT_LINK_USD" />
        ),
        tabBarVisible: false,
      },
    },
    SmartInvestaLinkRiskQuestionIdr: {
      screen: SmartInvestaLinkRiskQuestionIdr,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="SIL__SMART__INVESMENT_LINK_IDR" />
        ),
        tabBarVisible: false,
      },
    },
    SmartInvestaLinkRiskQuestionUsd: {
      screen: SmartInvestaLinkRiskQuestionUsd,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="SIL__SMART__INVESMENT_LINK_USD" />
        ),
        tabBarVisible: false,
      },
    },
    SmartInvestaLinkHealthIdr: {
      screen: SmartInvestaLinkHealthIdr,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="SIL__SMART__INVESMENT_LINK_IDR" />
        ),
        tabBarVisible: false,
      },
    },
    SmartInvestaLinkHealthUsd: {
      screen: SmartInvestaLinkHealthUsd,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="SIL__SMART__INVESMENT_LINK_USD" />
        ),
        tabBarVisible: false,
      },
    },
    PaymentBuyPolisSIL: {
      screen: PaymentBuyPolisSIL,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="PAYMENT_BUY_POLIS" />,
        tabBarVisible: false,
      },
    },
    ConfirmationPaymentBuyPolisSILIDR: {
      screen: ConfirmationPaymentBuyPolisSILIDR,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="SIL__HEADER_PAYMENT_CONFIRM" />,
        tabBarVisible: false,
      },
    },
    ConfirmationPaymentBuyPolisSILUSD: {
      screen: ConfirmationPaymentBuyPolisSILUSD,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="SIL__HEADER_PAYMENT_CONFIRM" />,
        tabBarVisible: false,
      },
    },
    ESigning: {
      screen: ESigning,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={''} />,
        tabBarVisible: false,
      },
    },
    SmartInvestaLinkPolisInformasiTnCIDR: {
      screen: SmartInvestaLinkPolisInformasiTnCIDR,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="SIL__SMART__INVESMENT_LINK_IDR" />
        ),
        tabBarVisible: false,
      },
    },
    SmartInvestaLinkPolisInformasiTnCUSD: {
      screen: SmartInvestaLinkPolisInformasiTnCUSD,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="SIL__SMART__INVESMENT_LINK_USD" />
        ),
        tabBarVisible: false,
      },
    },
    ConfirmationBuyPolisSILIDR: {
      screen: ConfirmationBuyPolisSILIDR,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="SIL__SMART__INVESMENT_LINK_IDR" />
        ),
        tabBarVisible: false,
      },
    },
    ConfirmationBuyPolisSILUSD: {
      screen: ConfirmationBuyPolisSILUSD,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="SIL__SMART__INVESMENT_LINK_USD" />
        ),
        tabBarVisible: false,
      },
    },
    SILSearchableList: {
      screen: SILSearchableList,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="SMART__INVESMENT_LINK_IDR" />,
        tabBarVisible: false,
      },
    },
    InquirySilEmFundScreen: {
      screen: InquirySilEmFund,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="INQUIRY__SIL_EMERGENCY_FUND_HEADER" />
        ),
        tabBarVisible: false,
      },
    },
    InquirySilEmFundConfirmScreen: {
      screen: InquirySilEmFundConfirm,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="INQUIRY__SIL_EM_FUND_CONFIRM_TITLE" />
        ),
        tabBarVisible: false,
      },
    },
    InquirySilTopUpScreen: {
      screen: InquirySilTopUp,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="INQUIRY__SIL_TOP_UP_HEADER" />,
        tabBarVisible: false,
      },
    },
    TransferAccountSIL: {
      screen: TransferAccountSIL,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'AUTODEBIT__LIST_ACCOUNT'} />,
        tabBarVisible: false,
      },
    },
    ConfirmationTransferSILScreen: {
      screen: ConfirmationTransferSIL,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="SIL__HEADER_PAYMENT_CONFIRM" />,
        tabBarVisible: false,
      },
    },
    DetailTransactionPage: {
      screen: DetailTransactionScreen,
      navigationOptions: navHeaders.detailTransactionHeader,
    },
    ValasItem: {
      screen: ValasItem,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="DRAWER__EXCHANGE_RATES" />,
        tabBarVisible: false,
      },
    },
    TdForm: {
      screen: TdRoutes,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
    Investment: {
      screen: InvestmentScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: (
          <HeaderTitle
            titleWhiteTrf="INVESTMENT__NAV_HEADER"
            headerMSIG={true}
          />
        ),
        tabBarVisible: false,
      },
    },
    SplitBillMenu: {
      screen: SplitBillMenu,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerNewBrand,
        headerTitle: <HeaderTitle titleWhiteTrf={'BURGER_MENU__SPLITBILL'} />,
        tabBarVisible: false,
      },
    },
    SplitBillIndex: {
      screen: SplitBillIndex,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerNewBrand,
        headerTitle: <HeaderTitle titleWhiteTrf={'SPLITBILL__INDEX_HEADER'} />,
        tabBarVisible: false,
      },
    },
    SplitBillConfirmation: {
      screen: SplitBillConfirmation,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerNewBrand,
        headerTitle: <HeaderTitle titleWhiteTrf={'BURGER_MENU__SPLITBILL'} />,
        tabBarVisible: false,
      },
    },
    AddNewParticipants: {
      screen: AddNewParticipants,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerNewBrand,
        headerTitle: <HeaderTitle titleWhiteTrf={'SPLITBILL__INDEX_HEADER'} />,
        tabBarVisible: false,
      },
    },
    DetailSplitBillMenu: {
      screen: DetailSplitBillMenu,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerNewBrand,
        headerTitle: <HeaderTitle titleWhiteTrf={'BURGER_MENU__SPLITBILL'} />,
        tabBarVisible: false,
      },
    },
    DetailSplitBillMenuOwe: {
      screen: DetailSplitBillMenuOwe,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerNewBrand,
        headerTitle: <HeaderTitle titleWhiteTrf={'BURGER_MENU__SPLITBILL'} />,
        tabBarVisible: false,
      },
    },
    TransferSourceAccountSplitBill: {
      screen: TransferAccount,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
        tabBarVisible: false,
      },
    },
    // // Masih Error disini nih transfernya
    FundTransferPaymentSplitBill: {
      screen: FundTransferPayment,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerNewBrand,
        headerTitle: <HeaderTitle titleWhiteTrf={'PAY_BILLS__TITLE'} />,
        tabBarVisible: false,
      },
    },
    ConfirmScreenSplitBill: {
      screen: FundTransferConfirmation,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerNewBrand,
        headerTitle: (
          <HeaderTitle titleWhiteTrf={'TITLE__TRANSFER_CONFIRMATION'} />
        ),
        tabBarVisible: false,
      },
    },
    AuthTransferBill: {
      screen: Authenticate,
      navigationOptions: navHeaders.AuthenticateHeader,
    },
    TransferScreenBill: {
      screen: LandingPage,
      navigationOptions: navHeaders.LandingHeaderNew,
    },
    HomeScreenSplitBill: {
      screen: LandingPage,
      navigationOptions: navHeaders.LandingHeaderNew,
    },

    MMQGetDetailsPage: {
      screen: MMQGetDetails,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="HEADER__MMQ_CERTIFICATE" />,
        tabBarVisible: false,
      },
    },
    AuthCC: {
      screen: Authenticate,
      navigationOptions: navHeaders.AuthenticateHeader,
    },
    LoanSummaryPage: {
      screen: LoanSummary,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    CreateSignWebViewPage: {
      screen: CreateSignWebView,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="DIGI_SIGN_HEADER" />,
        tabBarVisible: false,
      },
    },
    SigningWebViewPage: {
      screen: SigningWebView,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="DIGI_SIGN_HEADER" />,
        tabBarVisible: false,
      },
    },
    RetakeSelfiePage: {
      screen: RetakeSelfie,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    ConfirmRetakeSelfiePage: {
      screen: ConfirmRetakeSelfie,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    AddPayee: {
      screen: AddPayee,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__SELECT_PAYEE'} />,
        tabBarVisible: false,
      },
    },
    AddPayeeAccount: {
      screen: AddPayeeAccount,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__SELECT_PAYEE_ACCOUNT'} />,
        tabBarVisible: false,
      },
    },
    AddPayeeBank: {
      screen: AddPayeeBank,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__SELECT_BANK'} />,
        tabBarVisible: false,
      },
    },
    PaymentStatusRemittanceOnboarding: {
      screen: PaymentStatusRemittancePage,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    InquiryStarInvestamaScreen: {
      screen: InquiryStarInvestama,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="SINARMAS_AJSI" />,
        tabBarVisible: false,
      },
    },
    InquiryStarInvestamaTopUpScreen: {
      screen: InquiryStarInvestamaTopUp,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="INQUIRY__SIL_TOP_UP_HEADER" />,
        tabBarVisible: false,
      },
    },
    TransferAccountStarInvestama: {
      screen: TransferAccountStarInvestama,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack={'OPEN_NEW_ACCOUNT__SOURCE_ACCOUNT'} />
        ),
        tabBarVisible: false,
      },
    },
    ConfirmationTransferStarInvestamaScreen: {
      screen: ConfirmationTransferStarInvestama,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="SIL__HEADER_PAYMENT_CONFIRM" />,
        tabBarVisible: false,
      },
    },
    SimasSekuritasView: {
      screen: SimasSekuritas,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'SINARMAS__HEADER_TITLE'} />,
        tabBarVisible: false,
      },
    },
    BuyReksadanaView: {
      screen: BuyReksadana,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'REKSADANA_TOP_UP_TITLE'} />,
        tabBarVisible: false,
      },
    },
    BuyReksadanaConfirmation: {
      screen: BuyReksadanaConfirmation,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack={'TITLE__TRANSFER_CONFIRMATION'} />
        ),
        tabBarVisible: false,
      },
    },
    SellReksadanaView: {
      screen: SellReksadana,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'REKSADANA_REDEMPTION_TITLE'} />,
        tabBarVisible: false,
      },
    },
    SellReksadanaConfirmation: {
      screen: SellReksadanaConfirmation,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack={'TITLE__TRANSFER_CONFIRMATION'} />
        ),
        tabBarVisible: false,
      },
    },
    SourceAccountReksadana: {
      screen: SourceAccountReksadana,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
        tabBarVisible: false,
      },
    },
    CreditCardManage: {
      screen: CreditCardManagePage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: (
          <HeaderTitle titleWhiteTrf="DASHBOARD__CREDIT_CARD_MANAGE_TITLE" />
        ),
        tabBarVisible: false,
      },
    },
    CreditCardManageInput: {
      screen: CreditCardManageInputPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: (
          <HeaderTitle titleWhiteTrf="DASHBOARD__CREDIT_CARD_MANAGE_TITLE" />
        ),
        tabBarVisible: false,
      },
    },
    CreditCardConvertInstallment: {
      screen: CreditCardConvertInstallmentPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: (
          <HeaderTitle titleWhiteTrf="DASHBOARD__CREDIT_CARD_CONVERT_SELECT" />
        ),
        tabBarVisible: false,
      },
    },
    CreditCardManageSetInstallment: {
      screen: CreditCardManageSetInstallmentPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: (
          <HeaderTitle titleWhiteTrf="DASHBOARD__CREDIT_CARD_CONVERT_SET" />
        ),
        tabBarVisible: false,
      },
    },
    CreditCardManageConfirmation: {
      screen: CreditCardManageConfirmationPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: (
          <HeaderTitle titleWhiteTrf="DASHBOARD__CREDIT_CARD_MANAGE_TITLE" />
        ),
        tabBarVisible: false,
      },
    },
    CreditCardConfirmInstallment: {
      screen: CreditCardConfirmInstallmentPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: (
          <HeaderTitle titleWhiteTrf="CREDIT_CARD_MANAGE__CONFIRMATION_CREDIT_CARD_BUTTON" />
        ),
        tabBarVisible: false,
      },
    },
    CreditCardTransactionManagement: {
      screen: CreditCardTransactionManagementPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: (
          <HeaderTitle titleWhiteTrf="DASHBOARD__CREDIT_CARD_MANAGEMENT" />
        ),
        tabBarVisible: false,
      },
    },
    CreditCardTransactionDetail: {
      screen: CreditCardTransactionDetailPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: (
          <HeaderTitle titleWhiteTrf="DASHBOARD__CREDIT_CARD_TRANSACTION_DETAIL" />
        ),
        tabBarVisible: false,
      },
    },
    CreditCardTransactionSuccess: {
      screen: CreditCardTransactionSuccessPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: (
          <HeaderTitle titleWhiteTrf="DASHBOARD__CREDIT_CARD_TRANSACTION_SUCCESS" />
        ),
        tabBarVisible: false,
      },
    },
    CcHistory: {
      screen: CcHistory,
      navigationOptions: navHeaders.ccHistoryNavConfig,
    },
    CcDownloadOptions: {
      screen: CcDownloadScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="CREDIT_CARD__DOWNLOAD_BILLING_STATEMENTS" />
        ),
        tabBarVisible: false,
      },
    },
    CcHistoryFund: {
      screen: CcHistory,
      navigationOptions: navHeaders.ccHistoryNavConfig,
    },
    NewPaymentStatusRevampOnboarding: {
      screen: NewPaymentStatusRevampPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: <HeaderTitle titleWhiteTrf="QR_TCICO_TRANSACTION_TITLE" />,
        tabBarVisible: false,
      },
    },
    CreditCardCashAdvance: {
      screen: CreditCardCashAdvancePage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: (
          <HeaderTitle titleWhiteTrf="CREDITCARD__CASH_ADVANCE_TITLE" />
        ),
        tabBarVisible: false,
      },
    },
    CreditCardCashAdvanceConfirm: {
      screen: CashAdvanceConfirmPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: <HeaderTitle titleWhiteTrf="TITLE__BILLER_CONFIRMATION" />,
        tabBarVisible: false,
      },
    },
    CreditCardCashAdvanceSuccess: {
      screen: CashAdvanceSuccessPage,
      navigationOptions: {
        ...navHeaders.noHeader,
        tabBarVisible: false,
      },
    },
    CreditCardNotificationSettings: {
      screen: CreditCardNotificationSettingsPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: (
          <HeaderTitle titleWhiteTrf="DASHBOARD__CREDIT_CARD_NOTIFICATION" />
        ),
        tabBarVisible: false,
      },
    },
    PushNotifInbox: {
      screen: PushNotifInbox,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrand,
        headerTitle: <HeaderTitle titleBold="LOGIN__APPNAME" />,
        tabBarVisible: false,
      },
    },
    SilForexHours: {
      screen: SilForexHours,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={''} />,
        tabBarVisible: false,
      },
    },
    EmoneyRegistration: {
      screen: EmoneyRegistration,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerNewBrand,
        headerTitle: <HeaderTitle langKey={'EFORM__NAVBAR'} />,
        tabBarVisible: false,
      },
    },
    ProductsListOnboarding: {
      screen: ProductsList,
      navigationOptions: navHeaders.chooseProduct,
    },
    ProductsListUpgradeEmoney: {
      screen: ProductsList,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerNewBrand,
        headerTitle: <HeaderTitle langKey={'UPGRADE__EMONEY'} />,
        tabBarVisible: false,
      },
    },
    ChooseProductsItem: {
      screen: ChooseProductsItem,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerNewBrand,
        headerTitle: <HeaderTitle langKey={'PRODUCTS__SELECTIONS'} />,
        tabBarVisible: false,
      },
    },
    ProductsTnC: {
      screen: ProductsTnC,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerNewBrand,
        headerTitle: <HeaderTitle langKey={'GENERIC__TERM_AND_CONDITION'} />,
        tabBarVisible: false,
      },
    },
    CurrentSection: {
      screen: CurrentSection,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerNewBrand,
        headerTitle: <HeaderTitle langKey={'EFORM__NAVBAR'} />,
        tabBarVisible: false,
      },
    },
    DigitalEForm: {
      screen: DigitalEForm,
      navigationOptions: navHeaders.eformHeader,
    },
    CameraImageConfirmation: {
      screen: CameraImageConfirmation,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    DigitalEFormEmailVerification: {
      screen: DigitalEFormEmailVerification,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'EFORM__NAVBAR'} />,
        tabBarVisible: false,
      },
    },
    DigitalEFormSuccessScreen: {
      screen: DigitalEFormSuccessScreen,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    ApproveAplicationPage: {
      screen: ApproveScreenOpening,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={''} />,
        tabBarVisible: false,
      },
    },
    ActivationAccountPage: {
      screen: AccountActivationOpening,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="" />,
        tabBarVisible: false,
      },
    },
    SigningWebViewAccountOpeningPage: {
      screen: AccountSignDocumentOpening,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="" />,
        tabBarVisible: false,
      },
    },
    RetakeCameraOpeningAccountPage: {
      screen: RetakeCameraOpeningAccount,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    ConfirmationImageOpeningAccountPage: {
      screen: ConfirmationImageOpeningAccount,
      navigationOptions: {
        ...noHeader,
      },
    },
    SetDefaultAutoDebitScreen: {
      screen: SetDefaultAutoDebit,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrand,
        headerTitle: <HeaderTitle langKey={'SET_AUTODEBIT_TITTLE'} />,
        tabBarVisible: false,
      },
    },
    DigitalStorePaymentStatus: {
      screen: DigitalStorePaymentStatus,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    MerchantCheckout: {
      screen: MerchantCheckout,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="ALFACART_CHECKOUT_TITTLE" />,
        tabBarVisible: false,
      },
    },
    AlfacartShippingMethodReal: {
      screen: AlfacartShippingMethodReal,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="ALFACART_SHIPPING_METHOD__TITTLE" />
        ),
        tabBarVisible: false,
      },
    },
    AlfaSourceAccount: {
      screen: TransferAccount,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
        tabBarVisible: false,
      },
    },
    FormFillAlfaAddress: {
      screen: FormFillAlfaAddress,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="ALFACART_SHIPPING_METHOD__TITTLE" />
        ),
        tabBarVisible: false,
      },
    },
    FormFillAlfaNewStore: {
      screen: FormFillAlfaNewStore,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="ALFACART_SHIPPING_METHOD__TITTLE" />
        ),
        tabBarVisible: false,
      },
    },
    MerchantInputCustomerEmail: {
      screen: InputEmailScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'EGIFT__TITLE_PAYMENT'} />,
        tabBarVisible: false,
      },
    },
    AlfaAuthenticate: {
      screen: Authenticate,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrand,
        tabBarVisible: false,
      },
    },
    TnCPageAccount: {
      screen: LegalPageAccount,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerNewBrand,
        headerTitle: <HeaderTitle langKey={'LEGAL_MENU_TERMS'} />,
        tabBarVisible: false,
      },
    },
    PrivacyPageAccount: {
      screen: LegalPageAccount,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerNewBrand,
        headerTitle: <HeaderTitle langKey={'LEGAL_MENU_PRIVACY'} />,
        tabBarVisible: false,
      },
    },

    ETax: {
      screen: ETax,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: (
          <HeaderTitle titleWhiteTrf="E_TAX_HEADER" headerEtax={true} />
        ),
        tabBarVisible: false,
      },
    },
    EtaxPaymentType: {
      screen: EtaxPaymentType,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: (
          <HeaderTitle titleWhiteTrf="E_TAX_HEADER_PAYMENT_TYPE_HEADER" />
        ),
        tabBarVisible: false,
      },
    },
    EtaxHistoryFilter: {
      screen: EtaxHistoryFilter,
      navigationOptions: {
        ...navHeaders.noHeader,
        tabBarVisible: false,
      },
    },
    EtaxHistoryList: {
      screen: EtaxHistoryList,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: (
          <HeaderTitle titleWhiteTrf="DASHBOARD__TRANSACTION_HEADER" />
        ),
        tabBarVisible: false,
      },
    },
    IdBillingFormOne: {
      screen: IdBillingFormOne,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: (
          <HeaderTitle titleWhiteTrf="E_TAX_HEADER" headerEtax={true} />
        ),
        tabBarVisible: false,
      },
    },

    IdBillingFormConfirmation: {
      screen: IdBillingFormConfirmation,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: (
          <HeaderTitle titleWhiteTrf="E_TAX_HEADER" headerEtax={true} />
        ),
        tabBarVisible: false,
      },
    },
    IdBillingFormPayment: {
      screen: IdBillingFormPayment,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: (
          <HeaderTitle titleWhiteTrf="E_TAX_HEADER" headerEtax={true} />
        ),
        tabBarVisible: false,
      },
    },
    IdBillingFormPaymentConfirmation: {
      screen: IdBillingFormPaymentConfirmation,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: <HeaderTitle titleWhiteTrf="QR_GPN_CONFIRM_BTN" />,
        tabBarVisible: false,
      },
    },
    CreditCardTrxManage: {
      screen: CreditCardTrxManagePage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="DASHBOARD__CREDIT_CARD_MANAGE_TITLE" />
        ),
        tabBarVisible: false,
      },
    },

    CreditCardManageDetail: {
      screen: CreditCardManageDetail,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="DASHBOARD__CREDIT_CARD_MANAGE_TITLE" />
        ),
        tabBarVisible: false,
      },
    },
    CreditCardManageCreatePin: {
      screen: CreditCardManageCreatePin,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="DASHBOARD__CREDIT_CARD_MANAGE_TITLE" />
        ),
        tabBarVisible: false,
      },
    },
    CreditCardManageConfirmPin: {
      screen: CreditCardManageConfirmPin,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="DASHBOARD__CREDIT_CARD_MANAGE_TITLE" />
        ),
        tabBarVisible: false,
      },
    },
    CreditCardManageDeliveryScreen: {
      screen: CreditCardManageDeliveryScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="DASHBOARD__CREDIT_CARD_MANAGE_TITLE" />
        ),
        tabBarVisible: false,
      },
    },
    MenuHeaderSearch: {
      screen: MenuHeaderSearch,
      navigationOptions: navHeaders.HomeMenuSearch,
    },
    Offer: {
      screen: OfferScreens,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PROFILE__OPTION_OFFERS'} />,
        tabBarVisible: false,
      },
    },
    SimasTaraSimulationPage: {
      screen: SimasTaraSimulation,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="HEADER__SIMAS_TARA_SIMULATION" />,
        tabBarVisible: false,
      },
    },
    SimasTaraSummaryPage: {
      screen: SimasTaraSummary,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="HEADER__SIMAS_TARA_SUMMARY" />,
        tabBarVisible: false,
      },
    },
    ChooseServices: {
      screen: ChooseServices,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'SERVICES__SELECTIONS'} />,
        tabBarVisible: false,
      },
    },
    ActiveList: {
      screen: ActiveList,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'HEADER__ACTIVATE_ATM_CARD'} />,
        tabBarVisible: false,
      },
    },
    BlockList: {
      screen: BlockList,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'HEADER__BLOCKED_ATM_CARD'} />,
        tabBarVisible: false,
      },
    },
    ListAutodebit: {
      screen: AutodebitList,
      navigationOptions: navHeaders.listAutoDebitHeader,
    },
    SearchAutodebit: {
      screen: AutodebitSearch,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'AUTODEBIT__LIST_TITLE'} />,
        tabBarVisible: false,
      },
    },
    Shops: {
      screen: ShopScreen,
      navigationOptions: navHeaders.EVoucherHeader,
    },
    LuckyDrawScreen: {
      screen: LuckyDrawScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'LUCKYDRAW__TITLE'} />,
        tabBarVisible: false,
      },
    },
    LuckyDipMainPage: {
      screen: LuckyDipMain,
      navigationOptions: navHeaders.LuckyDipRightHeader,
    },
    TokenHistory: {
      screen: TokenHistory,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TOKEN_HISTORY'} />,
        tabBarVisible: false,
      },
    },
    FavBiller: {
      screen: FavBiller,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'FAVORITE_TRANSACTION'} />,
        tabBarVisible: false,
      },
    },
    RecurringEditing: {
      screen: RecurringEditingPage,
      navigationOptions: navHeaders.EditTransferHeader,
    },
    RecurringDetailList: {
      screen: RecurringDetailListPage,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="RECURRING__HEADER_TITLE" />,
        tabBarVisible: false,
      },
    },
    AccountMenu: {
      screen: LandingPage,
      navigationOptions: navHeaders.LandingHeaderNew,
    },
    ValidatePasswordBoarding: {
      screen: ValidatePassword,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="PROFILE__PASSWORD_TITLE" />,
        tabBarVisible: false,
      },
    },
    CreateNewPassword: {
      screen: CreateNewPassword,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'CHANGE_PASSWORD__TITLE'} />,
        tabBarVisible: false,
      },
    },
    UpdateEasyPin: {
      screen: UpdateEasyPin,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="PROFILE__EASYPIN_TITLE" />,
        tabBarVisible: false,
      },
    },
    ReleaseDeviceQR: {
      screen: ReleaseDeviceQR,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="RELEASE__DEVICE__QR" />,
        tabBarVisible: false,
      },
    },
    LoginPreference: {
      screen: LoginPreferenceScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PROFILE__LOGIN_PREFERENCES'} />,
        tabBarVisible: false,
      },
    },
    FaceRecogEULA: {
      screen: FaceRecogEULAScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack={'DISCLAIMER_FACE_RECOGNITION_TITLE'} />
        ),
        tabBarVisible: false,
      },
    },
    FingerPrintEULA: {
      screen: FingerPrintEULAScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack={'DISCLAIMER_FINGER_PRINT_TITLE'} />
        ),
        tabBarVisible: false,
      },
    },
    PaymentStatusRevamp: {
      screen: PaymentStatusRevamp,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
      },
    },
    EmoneySuccessRegistration: {
      screen: EmoneySuccessRegistration,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
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
        tabBarVisible: false,
      },
    },
    DetailTransactionMgm: {
      screen: DetailTransactionMgm,
      navigationOptions: navHeaders.mgmDetailTrans,
    },
    MgmTncReferFriend: {
      screen: MgmTncReferFriend,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    LuckyDipEvoucherDetailPage: {
      screen: LuckyDipEvoucherDetail,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerGreySoft,
        headerTitle: <HeaderTitle titleBlack={'LUCKY__DIP_TITLE_EVOUCHER'} />,
        tabBarVisible: false,
      },
    },
    LoginWithEasyPinSearch: {
      screen: LoginWithEasyPinPageSearch,
      navigationOptions: navHeaders.LoginPasswordInHeader,
    },
    ResetPassNoCardForm: {
      screen: ResetPassNoCardForm,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerNewBrand,
        headerTitle: <HeaderTitle langKey={''} />,
        tabBarVisible: false,
      },
    },
    QRRegisterStatus: {
      screen: QRRegisterStatusPage,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    QRTerminalStatus: {
      screen: QRTerminalStatusPage,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    QRTerminalEditStatus: {
      screen: QRTerminalEditStatusPage,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    QRRefundStatus: {
      screen: QRRefundStatusPage,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    QRTerminalResetStatus: {
      screen: QRTerminalResetStatusPage,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    QRTerminalDelStatus: {
      screen: QRTerminalDelStatusPage,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    showQRTrf: {
      screen: QRTrfShow,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="DETAIL_TRANSACTION__HEADER" />,
        tabBarVisible: false,
      },
    },
    QRTrfConfirm: {
      screen: QRTrfConfirm,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack="DETAIL_TRANSACTION__HEADER" />,
        tabBarVisible: false,
      },
    },
    EmallEasyPin: {
      screen: Authenticate,
      navigationOptions: navHeaders.AuthenticateHeader,
    },
    SpecialDealsLogin: {
      screen: SpecialDealsLogin,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrand,
        tabBarVisible: false,
      },
    },
    CcDownloadScreens: {
      screen: CcDownloadToScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="CREDIT_CARD__DOWNLOAD_BILLING_STATEMENTS" />
        ),
        tabBarVisible: false,
      },
    },
    LivenessSection: {
      screen: LivenessSection,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={''} />,
      },
    },
    ProductSeall: {
      screen: ProductAll,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrand,
        headerTitle: (
          <HeaderTitle titleWhiteTrf={'ACCOUNT_MENU_PRODUCT_SERVICES'} />
        ),
        tabBarVisible: false,
      },
    },
    SimasValasProductTypeSelections: {
      screen: SimasValasProductTypeSelections,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'PRODUCTS__SELECTIONS'} />,
        tabBarVisible: false,
      },
    },
    SimasValasChooseCurrency: {
      screen: SimasValasChooseCurrency,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack="HEADER_OPEN_SAVING_SIMAS_VALAS" />
        ),
        tabBarVisible: false,
      },
    },
    FundTransferPayment: {
      screen: FundTransferPayment,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
        tabBarVisible: false,
      },
    },
    TransferSourceAccount: {
      screen: TransferAccount,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
        tabBarVisible: false,
      },
    },
    FundTransferMethod: {
      screen: FundTransferMethodScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
        tabBarVisible: false,
      },
    },
    FundTransferConfirmation: {
      screen: FundTransferConfirmation,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack={'TITLE__TRANSFER_CONFIRMATION'} />
        ),
        tabBarVisible: false,
      },
    },
    FundTransferSchedule: {
      screen: FundTransferScheduleScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
        tabBarVisible: false,
      },
    },
    TransferScreen: {
      screen: LandingPage,
      navigationOptions: {
        ...navHeaders.noHeader,
      },
    },
    AuthTransfer: {
      screen: Authenticate,
      navigationOptions: navHeaders.AuthenticateHeader,
    },
    MembershipDetail: {
      screen: MembershipDetail,
      navigationOptions: navHeaders.membershipHeader,
    },
    LuckyDrawTnC: {
      screen: LuckyDrawTnC,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack={'HELP__FREQUENTLY_ASKED_QUESTIONS'} />
        ),
        tabBarVisible: false,
      },
    },
    CloseCard: {
      screen: CloseCard,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'CLOSE__SAVING_ACCOUNT'} />,
        tabBarVisible: false,
      },
    },
    ChooseCloseCard: {
      screen: ChooseCloseCard,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'CLOSE__SAVING_ACCOUNT'} />,
        tabBarVisible: false,
      },
    },
    ClosingTnc: {
      screen: ClosingTnc,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack={'GENERIC__TERMS_AND_CONDITIONS'} />
        ),
        tabBarVisible: false,
      },
    },
    ClosingAccAuth: {
      screen: Authenticate,
      navigationOptions: navHeaders.AuthenticateHeader,
    },
    AccountEditProfile: {
      screen: AccountEditProfile,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: <HeaderTitle titleWhite="EDIT__PROFILE" />,
        tabBarVisible: false,
      },
    },
    SuccessVerification: {
      screen: SuccessVerification,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    ConfirmEditProfile: {
      screen: ConfirmEditProfile,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: <HeaderTitle titleWhite="REQUEST__DATA_CHANGE" />,
        tabBarVisible: false,
      },
    },
    ConfirmEditProfileSelfieCamera: {
      screen: ConfirmEditProfileSelfieCamera,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    ConfirmImageEditProfile: {
      screen: ConfirmImageEditProfile,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    ConfirmationAuth: {
      screen: Authenticate,
      navigationOptions: navHeaders.AuthenticateHeader,
    },
    ManageBIFast: {
      screen: ManageBIFast,
      navigationOptions: {
        ...navHeaders.noHeader,
        tabBarVisible: false,
      },
    },
    AddProxyBIFast: {
      screen: AddProxyBIFast,
      navigationOptions: {
        ...navHeaders.noHeader,
        tabBarVisible: false,
      },
    },
    EditProxyBIFast: {
      screen: EditProxyBIFast,
      navigationOptions: {
        ...navHeaders.noHeader,
        tabBarVisible: false,
      },
    },
    UnlinkProxyBIFast: {
      screen: UnlinkProxyBIFast,
      navigationOptions: {
        ...navHeaders.noHeader,
        tabBarVisible: false,
      },
    },
    SelectProxyBIFast: {
      screen: SelectProxyBIFast,
      navigationOptions: {
        ...navHeaders.noHeader,
        tabBarVisible: false,
      },
    },
    NewProxyConfirmationBIFast: {
      screen: NewProxyConfirmationBIFast,
      navigationOptions: navHeaders.confirmTransferProxy,
    },
    EasyPinBiFast: {
      screen: EasyPinBiFast,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrand,
        tabBarVisible: false,
      },
    },
    AuthBiFast: {
      screen: Authenticate,
      navigationOptions: navHeaders.AuthenticateHeader,
    },
    EmailAuth: {
      screen: EmailAuthenticate,
      navigationOptions: navHeaders.AuthenticateHeader,
    },
    EditProxyConfirmationBIFast: {
      screen: EditProxyConfirmationBIFast,
      navigationOptions: navHeaders.confirmTransferProxy,
    },
    FAQformBiFast: {
      screen: FAQformBiFast,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: (
          <HeaderTitle titleBlack={'HELP__FREQUENTLY_ASKED_QUESTIONS'} />
        ),
        tabBarVisible: false,
      },
    },
    AddNewAtmChooseSavings: {
      screen: AddNewAtmChooseSavings,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerBrandRevamp,
        headerTitle: <HeaderTitle titleWhiteTrf={'HEADER__ADD_NEW_ATM_CARD'} />,
        tabBarVisible: false,
      },
    },
    AddNewAtmCardChooseAddress: {
      screen: AddNewAtmCardChooseAddress,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        tabBarVisible: false,
      },
    },
    AddNewAtmSuccessScreen: {
      screen: AddNewAtmSuccessScreen,
      navigationOptions: {
        ...noHeader,
        tabBarVisible: false,
      },
    },
    AddNewAtmCardConfirmation: {
      screen: AddNewAtmCardConfirmation,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        tabBarVisible: false,
      },
    },
    RemittanceSwiftCode: {
      screen: RemittanceSwiftCode,
      navigationOptions: navHeaders.remittanceHeader,
    },
    RemittanceBankInformation: {
      screen: RemittanceBankInformation,
      navigationOptions: {
        ...navHeaders.noHeader,
        tabBarVisible: false,
      },
    },
    RemittanceRecipientData: {
      screen: RemittanceRecipientData,
      navigationOptions: {
        ...navHeaders.noHeader,
        tabBarVisible: false,
      },
    },
    RemittanceSenderData: {
      screen: RemittanceSenderData,
      navigationOptions: {
        ...navHeaders.noHeader,
        tabBarVisible: false,
      },
    },
    RemittanceTransferPayment: {
      screen: RemittanceTransferPayment,
      navigationOptions: navHeaders.remittanceHeader,
    },
    RemittanceTransferConfirmation: {
      screen: RemittanceTransferConfirmation,
      navigationOptions: navHeaders.remittanceConfirmHeader,
    },
    PaymentStatusRemittance: {
      screen: PaymentStatusRemittance,
      ...navHeaders.noHeader,
      tabBarVisible: false,
    },
    FundTransferMethodRemittance: {
      screen: FundTransferMethodRemittance,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__REMITTANCE'} />,
        tabBarVisible: false,
      },
    },
    FundTransferRemittanceSchedule: {
      screen: FundTransferRemittanceScheduleScreen,
      navigationOptions: {
        ...navHeaders.navigationOptions.headerWhite,
        headerTitle: <HeaderTitle titleBlack={'TITLE__REMITTANCE'} />,
        tabBarVisible: false,
      },
    },
  },
  {
    // navigationOptions: {
    //   ...navHeaders.navigationOptions,
    //   ...navHeaders.chooseProduct
    // },
    cardStyle: {
      backgroundColor: 'white',
    },
    headerMode: 'screen',
  },
);

OnboardingRoutes.navigationOptions = ({navigation}) => {
  let tabBarVisible;
  navigation.state.routes.map(route => {
    if (
      route.routeName === 'Landing' ||
      route.routeName === 'LivenessSection' ||
      route.routeName === 'AccountMenu' ||
      route.routeName === 'HomeScreenSplitBill' ||
      route.routeName === 'TransferScreenBill' ||
      route.routeName === 'homeRoutes' ||
      route.routeName === 'QrPaymentStatusNewOnboarding' ||
      route.routeName === 'EFormLoanSuccess' ||
      route.routeName === 'HomeScreen' ||
      route.routeName === '' ||
      route.routeName === 'GenerateCode' ||
      route.routeName === 'TapGenerateCodeNumber' ||
      route.routeName === 'TapGenerateCode' ||
      route.routeName === 'GenerateCodeTimeout' ||
      route.routeName === 'CgvMovieDetail' ||
      route.routeName === 'CgvSchedule' ||
      route.routeName === 'TabShopping' ||
      route.routeName === 'ConfirmEmailScreen' ||
      route.routeName === 'AgreementScreen' ||
      route.routeName === 'SmartPromoAbout' ||
      route.routeName === 'MigrateLandingPage' ||
      route.routeName === 'MigrateEnded' ||
      route.routeName === 'MigrateError' ||
      route.routeName === 'CameraPage' ||
      route.routeName === 'TermsEmoney' ||
      route.routeName === 'HowToTransferPage' ||
      route.routeName === 'LearnMoreProductPage' ||
      route.routeName === 'IdentityFifthForm' ||
      route.routeName === 'IdentityFourthForm' ||
      route.routeName === 'IdentityThirdForm' ||
      route.routeName === 'IdentitySecondForm' ||
      route.routeName === 'IdentityForm' ||
      route.routeName === 'ConfirmationAccount' ||
      route.routeName === 'RegisterWithATMReceipt' ||
      route.routeName === 'ActivationSuccess' ||
      route.routeName === 'MerchantDashboard' ||
      route.routeName === 'MainGenerateCode'
    ) {
      tabBarVisible = true;
    } else {
      tabBarVisible = false;
    }
  });

  return {
    tabBarVisible,
    backBehavior: 'history',
  };
};

export default OnboardingRoutes;
