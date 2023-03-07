import * as navHeaders from './navHeaders.config';
import { createStackNavigator } from 'react-navigation-stack';
import {noHeader} from './navHeaders.config';

import CreditCardManagePage from '../pages/CreditCardManageJourney/CreditCardManage.page';
import CreditCardManageInputPage from '../pages/CreditCardManageJourney/CreditCardManageInput.page';
import CreditCardManageConfirmationPage from '../pages/CreditCardManageJourney/CreditCardManageConfirmation.page';

import Homescreen from '../pages/Home/EmoneyDashboard.page';
import Transactions from '../pages/Transactions/Transactions.page';
import TransactionsFilter from '../pages/Transactions/TransactionsFilter.page';
import CcHistory from '../pages/CreditCardHistoryJourney/CreditCardHistory.page';
import CcDownloadScreen from '../pages/CreditCardHistoryJourney/CreditCardHistoryOptions.page';
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

import Helpscreen from '../pages/Help/Help.page';
import FAQform from '../pages/Help/FAQWeb.page';

import FaceRecognitionRoutes from './faceRecognition.routes';

import LoginPreferenceScreen from '../pages/Profile/LoginPreference.page';

import FaceRecogEULAScreen from '../pages/Profile/FaceRecogEULA.page';
import FingerPrintEULAScreen from '../pages/Profile/FingerPrintEULA.page';

import InsurancePage from '../pages/Insurance/Insurance.page';
import PremiPAPage from '../pages/Insurance/PremiPA.page';
import FormDataPAPage from '../pages/Insurance/formDataPA.page';
import FormDataBeneficiaryPAPage from '../pages/Insurance/FormDataBeneficiaryPA.page';
import ConfirmationPAPage from '../pages/Insurance/ConfirmationPA.page';
import ResultPAPage from '../pages/Insurance/ResultPA.page';
import DetailPAPage from '../components/Insurance/DetailInsurance.component';

import OpenAccountRoutes from './openAccount.routes';
import TdRoutes from './timeDeposit.routes';
import GPNIssuer from './QRIssuer.routes';
import QRGpnRoutes from './QRGpn.routes';
import QRRegisterStatusPage from '../pages/QRGpn/QRRegisterStatus.page';
import QRTerminalStatusPage from '../pages/QRGpn/QRTerminalStatus.page';
import QRRefundStatusPage from '../pages/QRGpn/QRRefundStatus.page';
import QRTrfShow from '../pages/QRGpn/QRTrfShow.page';
import QRTrfConfirm from '../pages/QRGpn/QRTrfConfirm.page';
import QRTerminalEditStatusPage from '../pages/QRGpn/QRTerminalEditStatus.page';
import QROnboard from '../pages/QRGpn/QROnboard.page';

import EmoneyCloseRoutes from './emoneyClose.routes';

import PlanTravelPage from '../pages/Insurance/PlanTravel.page';
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

import EmoneyUpgradeForm from '../pages/EmoneyJourney/EmoneyUpgradeForm.page';
import EmoneyUpgradeForm2 from '../pages/EmoneyJourney/EmoneyUpgradeForm2.page';
import EmoneyUpgradeForm3 from '../pages/EmoneyJourney/EmoneyUpgradeForm3.page';
import KTPPassportCamera from '../pages/Camera/KTPPassportCamera.page';
import EmoneyUpgradeFinalizeScreen from '../pages/EmoneyJourney/EmoneyUpgradeFinalize.page';

// alfacart
import CartAlfacart from '../pages/Egift/CartAlfacart.page';

const HomeRoutes = createStackNavigator({
  HomeScreen: {
    screen: Homescreen,
    path: 'index',
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
  Investment: {
    screen: InvestmentScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='INVESTMENT__NAV_HEADER' />,
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
      ...navHeaders.validatePasswordHeader,
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
  Insurance: {
    screen: InsurancePage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE'} />,
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
  EmoneyCloseRoutes: {
    screen: EmoneyCloseRoutes,
    navigationOptions: {
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
  AboutPaydayLoan: {
    screen: AboutPaydayLoan,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='PAYDAY_LOAN__ONBOARDING__TEXT3' />,
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
  CartAlfacart: {
    screen: CartAlfacart,
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
      headerVisible: false,
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
      headerVisible: false,
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
      headerVisible: false,
      tabBarVisible: false
    }
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
      headerVisible: false,
      tabBarVisible: false
    },
  },
  DukcapilNotMatch: {
    screen: DukcapilNotMatch,
    navigationOptions: noHeader
  },
  ImageConfirmation: {
    screen: ImageConfirmationScreen,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },

  // QR
  QROnboard: {
    screen: QROnboard,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN' />,
      tabBarVisible: false
    }
  },
  QRGpnScreen: {
    screen: QRGpnRoutes,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  GPNIssuer: {
    screen: GPNIssuer,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  QRRegisterStatus: {
    screen: QRRegisterStatusPage,
    navigationOptions: {
      headerVisible: false,
      tabBarVisible: false
    }
  },
  QRTerminalStatus: {
    screen: QRTerminalStatusPage,
    navigationOptions: {
      headerVisible: false,
      tabBarVisible: false
    }
  },
  QRTerminalEditStatus: {
    screen: QRTerminalEditStatusPage,
    navigationOptions: {
      headerVisible: false,
      tabBarVisible: false
    }
  },
  QRRefundStatus: {
    screen: QRRefundStatusPage,
    navigationOptions: {
      headerVisible: false,
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
    }
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
    navigationOptios: navHeaders.onboardProductHeader
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
    navigationOptions: noHeader,
    tabBarVisible: false
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
    navigationOptions: {
      ...navHeaders.AuthenticateHeader,
      tabBarVisible: false
    }
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
  OfferDetail: {
    screen: OfferDetailScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'OFFERS__OFFER_DETAIL'} />,
      tabBarVisible: false
    }
  },
  QRPromoDetail: {
    screen: QRPromoDetailScreen,
    navigationOptions: {
      ...navHeaders.qrPromoHeader,
      tabBarVisible: false
    }
  },
  QRMerchantLocation: {
    screen: QRMerchantLocationScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'QR_PROMO__MERCHANT_LOCATION'} />,
      tabBarVisible: false
    }
  },
  EmoneyUpgradeForm: {
    screen: EmoneyUpgradeForm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TITLE__EMONEY_UPGRADE' />,
      tabBarVisible: false
    }
  },
  EmoneyUpgradeForm2: {
    screen: EmoneyUpgradeForm2,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TITLE__EMONEY_UPGRADE' />,
      tabBarVisible: false
    }
  },
  EmoneyUpgradeForm3: {
    screen: EmoneyUpgradeForm3,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TITLE__EMONEY_UPGRADE' />,
      tabBarVisible: false
    }
  },
  SignatureSendPage: {
    screen: SignatureScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TITLE__EMONEY_UPGRADE'/>,
      tabBarVisible: false
    }
  },

  KTPPassportCameraPage: {
    screen: KTPPassportCamera,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TITLE__EMONEY_UPGRADE'/>,
      tabBarVisible: false
    }
  },
  AuthEmoney: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
  EmoneyUpgradeFinalize: {
    screen: EmoneyUpgradeFinalizeScreen,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    },
  },
}, {
  headerMode: 'screen',
  cardStyle: {
    backgroundColor: 'white'// to change the backgroundColor color of the whole application
  },
});

export default HomeRoutes;
