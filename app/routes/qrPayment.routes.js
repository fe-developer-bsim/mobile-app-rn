import React from 'react';
import {StackNavigator} from 'react-navigation';
import HeaderTitle from '../components/NavHeader/HeaderTitle.component';
import Homescreen from '../pages/Home/Dashboard.page';
import * as navHeaders from './navHeaders.config';
import QRConfirmPage from '../pages/QRGpn/QRConfirmPage.page';
import QRTcicoConfirmPage from '../pages/QRGpn/QRTcicoConfirmPage.page';
import QRTerminalDelStatusPage from '../pages/QRGpn/QRTerminalDelStatus.page';
import QRPaymentStatus from '../pages/QRGpn/QRPaymentStatus.page';
import QRRegisterStatusPage from '../pages/QRGpn/QRRegisterStatus.page';
import Pay from '../pages/Pay/Pay.page';
import QRPaymentStatusRevamp from '../pages/QRGpn/QRPaymentStatusRevamp.page';
import QRPaymentScreen from '../pages/QRPayment/QRPayment.page';
import QRScannerScreen from '../pages/QRPayment/QRScanner.page';
import QRInvoiceDetailScreen from '../pages/QRPayment/QRInvoiceDetail.page';
import QRInputAmountScreen from '../pages/QRPayment/QRInputAmount.page';
import QRInputConfirmationScreen from '../pages/QRPayment/QRConfirmation.page';
import QRpaymentStatusRevampPage from '../pages/QRGpn/QRPaymentStatusRevamp.page';
import QRpaymentStatusPage from '../pages/QRGpn/QRPaymentStatus.page';
import PaymentStatusNewPage from '../pages/PaymentStatus/PaymentStatusNew.page';
import Authenticate from '../pages/Authenticate/Authenticate.page';
import {noHeader} from './navHeaders.config';
import OnboardingRoutes from './onboarding.routes';
import MyQRScreen from '../pages/Account/MyQrScreen.page';
import NewQrStatusRevamp from '../pages/QRGpn/NewPaymentStatusRevamp.page';
import PaymentStatusRevampPage from '../pages/PaymentStatus/PaymentStatusRevamp.page';
import NewPaymentStatusRevampPage from '../pages/PaymentStatus/NewPaymentStatusRevamp.page';
// Coupon

import CouponList from '../pages/Coupon/CouponPage.page';
import DetailCouponList from '../pages/Coupon/CouponDetail.page';

// QR GPN
import QRInvoicePage from '../pages/QRGpn/QRInvoice.page';
import QRInvoiceTcicoPage from '../pages/QRGpn/QRInvoiceTcico.page';
import QRInvoiceCashout from '../pages/QRGpn/QRInvoiceCashout.page';

import QRCustomer from '../pages/QRGpn/QRCustomer.page';

import QrTcico from '../pages/Account/QrTcico.page';

const qrPayment = StackNavigator({
  QRScannerLanding: {
    screen: QRScannerScreen,
    navigationOptions: {
      ...navHeaders.noHeader,
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
  Onboarding: {
    screen: OnboardingRoutes,
    navigationOptions: noHeader
  },
  Auth: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
  HomeScreen: {
    screen: Homescreen,
    navigationOptions: navHeaders.DashboardNavConfig
  },
  QRInvoice: {
    screen: QRInvoicePage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp, headerTitle: <HeaderTitle titleWhiteTrf='GENERATE_CODE_MAIN_OFFLINE_PAY'/>,
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
  QRInvoiceTcicoCashout: {
    screen: QRInvoiceTcicoPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp, headerTitle: <HeaderTitle titleWhiteTrf={'QR_CASHOUT_TITLE'} headerQR={true}/>,
      tabBarVisible: false
    }
  },
  QRInvoiceTcico: {
    screen: QRInvoiceTcicoPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp, headerTitle: <HeaderTitle titleWhiteTrf={'QR_TRANSFER_TITLE'} headerQR={true}/>,
      tabBarVisible: false
    }
  },
  QRInvoiceCashout: {
    screen: QRInvoiceCashout,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp, headerTitle: <HeaderTitle titleWhiteTrf={'QRTCICO_CASHOUT_TITLE'} headerQR={true}/>,
      tabBarVisible: false
    }
  },
  PaymentStatusNewOnboarding: {
    screen: PaymentStatusNewPage,
    navigationOptions: noHeader
  },
  PaymentStatusRevampOnboarding: {
    screen: PaymentStatusRevampPage,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  NewPaymentStatusRevampOnboarding: {
    screen: NewPaymentStatusRevampPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandPaymentStatus, headerTitle: <HeaderTitle titlePaymentStatus='QR_TCICO_TRANSACTION_TITLE' />,
      tabBarVisible: false
    }
  },
  QRConfirm: {
    screen: QRConfirmPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp, headerTitle: <HeaderTitle titleWhiteTrf='QR_GPN_ISSUER_CONFIRM'/>,
      tabBarVisible: false
    }
  },
  QRTcicoConfirm: {
    screen: QRTcicoConfirmPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp, headerTitle: <HeaderTitle titleWhiteTrf='TITLE__TRANSFER_CONFIRMATION' headerQR={true}/>,
      tabBarVisible: false
    }
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
    }
  },
  QRRegisterStatus: {
    screen: QRRegisterStatusPage,
    navigationOptions: {
      ...navHeaders.noHeader,
      tabBarVisible: false
    }
  },
  QrPaymentStatusNewOnboarding: {
    screen: QRpaymentStatusPage,
    navigationOptions: noHeader
  },
  PayScreenNew: {
    screen: Pay,
    navigationOptions: navHeaders.PayHeaderConfig,
  },
  QRPaymentStatusRevamp: {
    screen: QRPaymentStatusRevamp,
    navigationOptions: {
      ...navHeaders.noHeader,
      tabBarVisible: false
    }
  },
  QrPaymentStatusOnboarding: {
    screen: QRpaymentStatusRevampPage,
    navigationOptions: noHeader
  },
  QRPayment: {
    screen: QRPaymentScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PAY_QRPAYMENT__TITLE'} />,
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
  MyQRScreen: {
    screen: MyQRScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp, headerTitle: <HeaderTitle titleWhiteTrf='QRTICO_HEADER_TITLE' headerQR={true}/>,
      tabBarVisible: false
    }
  },
  QrTcico: {
    screen: QrTcico,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp, headerTitle: <HeaderTitle titleWhiteTrf={'QRTICO_HEADER_TITLE'} headerQR={true}/>,
      tabBarVisible: false
    }
  },
  QrPaymentStatusOnboardingRevamp: {
    screen: NewQrStatusRevamp,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrandRevamp, headerTitle: <HeaderTitle titleWhiteTrf='PAYMENT_STATUS__QR_TITLE'/>,
      tabBarVisible: false
    }
  },
}, {
  cardStyle: {
    backgroundColor: 'white'
  },
});

export default qrPayment;
