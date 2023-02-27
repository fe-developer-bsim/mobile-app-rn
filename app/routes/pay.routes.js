import * as navHeaders from './navHeaders.config';
import {StackNavigator} from 'react-navigation';

import Pay from '../pages/Pay/Pay.page';

import MobileTopupIndex from '../pages/MobileTopupJourney/MobileTopupIndex.page';
import MobileTopupForm from '../pages/MobileTopupJourney/MobileTopupForm.page';
import MobileTopupPayment from '../pages/MobileTopupJourney/MobileTopupPayment.page';
import MobileTopupConfirmationScreen from '../pages/MobileTopupJourney/MobileTopupConfirmation.page';

import MobilePostpaidScreen from '../pages/MobilePostpaidJourney/MobilePostpaid.page';
import MobilePostpaidPaymentPage from '../pages/MobilePostpaidJourney/MobilePostpaidPayment.page';
import MobilePostpaidConfirmationScreen from '../pages/MobilePostpaidJourney/MobilePostpaidConfirmation.page';

import WaterBillScreen from '../pages/WaterBillJourney/WaterBill.page';
import WaterBillSummaryScreen from '../pages/WaterBillJourney/WaterBillSummary.page';
import WaterBillPayment from '../pages/WaterBillJourney/WaterBillPayment.page';

import ElectricityPaymentPage from '../pages/ElectricityJourney/ElectricityPayment.page';
import ElectricityIndex from '../pages/ElectricityJourney/ElectricityIndex.page';
import ElectricityConfirmation from '../pages/ElectricityJourney/ElectricityConfirmation.page';

import CreditCardScreen from '../pages/CreditCardJourney/CreditCardIndex.page';
import CreditCardAccountInputScreen from '../pages/CreditCardJourney/CreditCardAccount.page';
import CreditCardPaymentScreen from '../pages/CreditCardJourney/CreditCardPayment.page';
import CreditCardConfirmationScreen from '../pages/CreditCardJourney/CreditCardConfirmation.page';
import CreditCardSelectBankScreen from '../pages/CreditCardJourney/CreditCardSelectBank.page';

import ProfileRoutes from './profile.routes';

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

import BillerAccount from '../pages/Account/SourceAccount.page';
import BillerAccountLKD from '../pages/Account/SourceAccountLKD.page';

import React from 'react';
import HeaderTitle from '../components/NavHeader/HeaderTitle.component';

import QRPaymentScreen from '../pages/QRPayment/QRPayment.page';
import QRScannerScreen from '../pages/QRPayment/QRScanner.page';
import QRInvoiceDetailScreen from '../pages/QRPayment/QRInvoiceDetail.page';
import QRInputAmountScreen from '../pages/QRPayment/QRInputAmount.page';
import QRInputConfirmationScreen from '../pages/QRPayment/QRConfirmation.page';

// QR GPN
import QRConfirmPage from '../pages/QRGpn/QRConfirmPage.page';

import Authenticate from '../pages/Authenticate/Authenticate.page';
import Homescreen from '../pages/Home/Dashboard.page';
import WithdrawalForm from '../pages/QRGpn/QRWithdrawalForm.page';

import CouponList from '../pages/Coupon/CouponPage.page';
import DetailCouponList from '../pages/Coupon/CouponDetail.page';

import MainGenerateCode from '../pages/GenerateCodeJourney/MainGenerateCode.page';
import GenerateCodeTnc from '../pages/GenerateCodeJourney/GenerateCodeTnc.page';
import GenerateForm from '../pages/GenerateCodeJourney/GenerateForm.page';
import GenerateConfirmation from '../pages/GenerateCodeJourney/GenerateConfirmation.page';


// QR Issuer
import QRCustomer from '../pages/QRGpn/QRCustomer.page';
import QRWithdrawalConfirm from '../pages/QRGpn/QRWithdrawalConfirm.page';
import QRInvoicePage from '../pages/QRGpn/QRInvoice.page';
import QRPaymentStatus from '../pages/QRGpn/QRPaymentStatus.page';
import QRInvoiceTcicoPage from '../pages/QRGpn/QRInvoiceTcico.page';
import QRInvoiceCashout from '../pages/QRGpn/QRInvoiceCashout.page';

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

import FavBiller from '../pages/Account/FavoriteBiller.page';

// Genflix Promo
import GenflixRegistration from '../pages/Genflix/GenflixRegistration.page';
import GenflixConfirmation from '../pages/Genflix/GenflixConfirmation.page';
import GenflixRegistrationContainer from '../pages/Genflix/GenflixRegistration.container';

// Email Verification
import EmailVerificationPage from '../pages/EmailVerification/EmailVerification.page';
import EmailAuthenticate from '../pages/Authenticate/EmailAuthenticate.page';
import feedbackPage from '../pages/Home/FeedbackGetter.page';

// Split Bill
import SplitBillIndex from '../pages/SplitBillJourney/SplitBillIndex.page';
import SplitBillConfirmation from '../pages/SplitBillJourney/SplitBillConfirmation.page';
import AccountMenuSplitBill from '../pages/Account/AccountMenu.page';


// QR Screen Success
import QRPaymentStatusRevamp from '../pages/QRGpn/QRPaymentStatusRevamp.page';
import MyQRScreen from '../pages/Account/MyQrScreen.page';


const PayRoutes = StackNavigator({
  PayScreen: {
    screen: Pay,
    navigationOptions: navHeaders.PayHeaderConfig,
  },
  AccountMenu: {
    screen: Pay,
    navigationOptions: navHeaders.PayHeaderConfig
  },
  QRPayment: {
    screen: QRPaymentScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PAY_QRPAYMENT__TITLE'} />,
      tabBarVisible: false
    }
  },
  MobileTopup: {
    screen: MobileTopupIndex,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'MOBILE_TOPUP_TITLE'} />,
      tabBarVisible: false
    }
  },
  MobileTopupForm: {
    screen: MobileTopupForm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'MOBILE_TOPUP_TITLE'} />,
      tabBarVisible: false
    }
  },
  MobileTopupPayment: {
    screen: MobileTopupPayment,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'MOBILE_TOPUP_TITLE'} />,
      tabBarVisible: false
    }
  },
  MobileTopupConfirmation: {
    screen: MobileTopupConfirmationScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__MOBILE_TOPUP_CONFIRMATION'} />,
      tabBarVisible: false
    }
  },
  MobilePostpaid: {
    screen: MobilePostpaidScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PAY_BILLS__MOBILE_POSTPAID'} />,
      tabBarVisible: false
    }
  },
  MobilePostpaidPayment: {
    screen: MobilePostpaidPaymentPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PAY_BILLS__MOBILE_POSTPAID'} />,
      tabBarVisible: false
    }
  },
  MobilePostpaidConfirmation: {
    screen: MobilePostpaidConfirmationScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PAY_BILLS__MOBILE_POSTPAID'} />,
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
  WaterBill: {
    screen: WaterBillScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__WATER_BILL_PAY'} />,
      tabBarVisible: false
    }
  },
  WaterBillPayment: {
    screen: WaterBillPayment,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__WATER_BILL_PAY'} />,
      tabBarVisible: false
    }
  },
  WaterBillSummary: {
    screen: WaterBillSummaryScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__WATER_BILL_PAY'} />,
      tabBarVisible: false
    }
  },
  Electricity: {
    screen: ElectricityIndex,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__ELECTRICITY_BILL_PAY'} />,
      tabBarVisible: false
    }
  },
  ElectricityPayment: {
    screen: ElectricityPaymentPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__ELECTRICITY_BILL_PAY'} />,
      tabBarVisible: false
    }
  },
  ElectricityConfirmation: {
    screen: ElectricityConfirmation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__ELECTRICITY_CONFIRMATION'} />,
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
  Profile: {
    screen: ProfileRoutes,
    navigationOptions: {
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
  QRScanner: {
    screen: QRScannerScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILL_PAY'} />,
      tabBarVisible: false
    }
  },
  QRInvoiceDetail: {
    screen: QRInvoiceDetailScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILL_PAY'} />,
      tabBarVisible: false
    }
  },
  QRInputAmount: {
    screen: QRInputAmountScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILL_PAY'} />,
      tabBarVisible: false
    }
  },
  QRConfirmation: {
    screen: QRInputConfirmationScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp, headerTitle: <HeaderTitle titleWhiteTrf='QR_GPN_ISSUER_CONFIRM'/>,
      tabBarVisible: false
    }
  },
  Auth: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
  HomeScreen: {
    screen: Homescreen,
    navigationOptions: navHeaders.DashboardNavConfig
  },
  QRConfirm: {
    screen: QRConfirmPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp, headerTitle: <HeaderTitle titleWhiteTrf='QR_GPN_ISSUER_CONFIRM'/>,
      tabBarVisible: false
    }
  },
  WithdrawalForm: {
    screen: WithdrawalForm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN_ISSUER_CONFIRM' />,
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
  BillerAccountLKD: {
    screen: BillerAccountLKD,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__BILL_PAY'} />,
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
  resultPA: {
    screen: ResultPAPage,
    navigationOptions: {
      headerLeft: null,
      tabBarVisible: false
    }
  },
  MainGenerateCode0: {
    screen: MainGenerateCode,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'GENERATE_FORM_MERCHANT'} />,
      tabBarVisible: false
    }
  },
  GenerateForm0: {
    screen: GenerateForm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'GENERATE_CODE_FORM'} />,
      tabBarVisible: false
    }
  },
  GenerateForm: {
    screen: GenerateForm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'GENERATE_CODE__WITHDRAW'} />,
      tabBarVisible: false
    }
  },
  GenerateConfirmation: {
    screen: GenerateConfirmation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'GENERATE_CONFIRMATION_HEADER'} />,
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
  DetailPA: {
    screen: DetailPAPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE_DETAIL'} />,
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
  TravelCustomerForm: {
    screen: TravelCustomerFormPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE__TRAVEL'} />,
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
  PlanTravel: {
    screen: PlanTravelPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE'} />,
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
  TravelInsurance: {
    screen: TravelInsurancePage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack={'PROFILE__INSURANCE__TRAVEL'} />,
      tabBarVisible: false
    }
  },
  TravelInsuranceTnC: {
    screen: TravelInsuranceTnC,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack={'TERMS_AND_CONDITION__HEADER'} />,
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
  TravelResult: {
    screen: TravelResultPage,
    navigationOptions: {
      ...navHeaders.noHeader,
      tabBarVisible: false,
    }
  },
  FavBiller: {
    screen: FavBiller,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'FAVORITE_TRANSACTION'} />,
      tabBarVisible: false
    }
  },
  genflixRegistration: {
    screen: GenflixRegistration,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack={'GENFLIX__REGISTRATION_HEADER'} />,
      tabBarVisible: false
    }
  },
  genflixConfirmation: {
    screen: GenflixConfirmation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack={'GENFLIX__CONFIRMATION_HEADER'} />,
      tabBarVisible: false
    }
  },
  verifyEmail: {
    screen: EmailVerificationPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack={'VERIFY_EMAIL__HEADER'} />,
      tabBarVisible: false
    }
  },
  genflixInit: {
    screen: GenflixRegistrationContainer,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack={'GENFLIX__REGISTRATION_HEADER'} />,
      tabBarVisible: false
    }
  },
  EmailAuth: {
    screen: EmailAuthenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
  EmallEasyPin: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
  SplitBillIndex: {
    screen: SplitBillIndex,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack={'SPLITBILL__HEADER'} />,
      tabBarVisible: false
    }
  },
  SplitBillConfirmation: {
    screen: SplitBillConfirmation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack={'SPLITBILL__HEADER'} />,
      tabBarVisible: false
    }
  },
  // QR Issuer
  QRPaymentStatus: {
    screen: QRPaymentStatus,
    navigationOptions: {
      ...navHeaders.noHeader,
      tabBarVisible: false
    }
  },
  QRScanScreen: {
    screen: QRCustomer,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN_ISSUER_SIMAS' />,
      tabBarVisible: false
    }
  },
  QRInvoice: {
    screen: QRInvoicePage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='PAY_QRPAYMENT__TITLE' />,
      tabBarVisible: false
    }
  },
  QRInvoiceTcicoCashout: {
    screen: QRInvoiceTcicoPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp, headerTitle: <HeaderTitle titleWhiteTrf={'QR_CASHOUT_TITLE'} />,
      tabBarVisible: false
    }
  },
  QRInvoiceTcico: {
    screen: QRInvoiceTcicoPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp, headerTitle: <HeaderTitle titleWhiteTrf={'QR_TRANSFER_TITLE'} />,
      tabBarVisible: false
    }
  },
  QRInvoiceCashout: {
    screen: QRInvoiceCashout,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp, headerTitle: <HeaderTitle titleWhiteTrf={'QRTCICO_CASHOUT_TITLE'} />,
      tabBarVisible: false
    }
  },
  QRWithdrawalConfirm: {
    screen: QRWithdrawalConfirm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN_ISSUER_CONFIRM' />,
      tabBarVisible: false
    }
  },
  feedbackPage: {
    screen: feedbackPage,
    navigationOptions: {
      ...navHeaders.noHeader,
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
  TransferScreen: {
    screen: Pay,
    navigationOptions: navHeaders.MainIndexPageNavConfig
  },
  MyQRScreen: {
    screen: MyQRScreen,
    navigationOptions: navHeaders.qrHeader
  },
  HomeScreenSplitBill: {
    screen: AccountMenuSplitBill,
    path: 'index',
    navigationOptions: navHeaders.LandingHeaderNew
  },
}, {
  cardStyle: {
    backgroundColor: 'white'
  },

});


export default PayRoutes;
