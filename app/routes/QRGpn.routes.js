import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HeaderTitle from '../components/NavHeader/HeaderTitle.component';
import Homescreen from '../pages/Home/Dashboard.page';
import QRMerchantRegister from '../pages/QRGpn/QRMerchantRegister.page';
import QRMerchantRegister1 from '../pages/QRGpn/QRMerchantRegister1.page';
import QRMerchantRegister2 from '../pages/QRGpn/QRMerchantRegister2.page';
import QRMerchantRegister3 from '../pages/QRGpn/QRMerchantRegister3.page';
import QRMerchantRegister4 from '../pages/QRGpn/QRMerchantRegister4.page';
import QRRegisterConfirmation from '../pages/QRGpn/QRRegisterConfirmation.page';
import QRTerminalRegister from '../pages/QRGpn/QRTerminalRegister.page';
import QRTerminalConfirmation from '../pages/QRGpn/QRTerminalConfirmation.page';
import QRTerminalEdit from '../pages/QRGpn/QRTerminalEdit.page';
import QRTerminalEditConfirm from '../pages/QRGpn/QRTerminalEditConfirm.page';
import * as navHeaders from './navHeaders.config';
import QRConfirmPage from '../pages/QRGpn/QRConfirmPage.page';
import QRMerchantList from '../pages/QRGpn/QRMerchantList.page';
import QRMerchantTerminal from '../pages/QRGpn/QRMerchantTerminal.page';
import QRMerchantDetail from '../pages/QRGpn/QRMerchantDetail.page';
import QRTerminalDelStatusPage from '../pages/QRGpn/QRTerminalDelStatus.page';
import QRRefundCode from '../pages/QRGpn/QRRefundCode.page';
import QRRefundCreate from '../pages/QRGpn/QRRefundCreate.page';
import QRRefundInfo from '../pages/QRGpn/QRRefundInfo.page';
import QROnboard from '../pages/QRGpn/QROnboard.page';
import QRStoreList from '../pages/QRGpn/QRStoreList.page';
import QRPaymentStatus from '../pages/QRGpn/QRPaymentStatus.page';
import QRRegisterStatusPage from '../pages/QRGpn/QRRegisterStatus.page';
import Pay from '../pages/Pay/Pay.page';
import QRPaymentStatusRevamp from '../pages/QRGpn/QRPaymentStatusRevamp.page';

const QRGpnRoutes = createStackNavigator({
  QRMerchantList: {
    screen: QRMerchantList,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN' />,
      tabBarVisible: false
    }
  },
  QRStoreList: {
    screen: QRStoreList,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN__OUTLET' />,
      tabBarVisible: false
    }
  },
  QROnboard: {
    screen: QROnboard,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN' />,
      tabBarVisible: false
    }
  },
  QRRefundCode: {
    screen: QRRefundCode,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN' />,
      tabBarVisible: false
    }
  },
  QRRefundCreate: {
    screen: QRRefundCreate,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN' />,
      tabBarVisible: false
    }
  },
  QRRefundInfo: {
    screen: QRRefundInfo,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN' />,
      tabBarVisible: false
    }
  },
  QRMerchantRegister: {
    screen: QRMerchantRegister,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN__MERCHANT_REGISTRATION' />,
      tabBarVisible: false
    }
  },
  QRMerchantRegister1: {
    screen: QRMerchantRegister1,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN__MERCHANT_REGISTRATION' />,
      tabBarVisible: false
    }
  },
  QRMerchantRegister2: {
    screen: QRMerchantRegister2,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN__MERCHANT_REGISTRATION' />,
      tabBarVisible: false
    }
  },
  QRMerchantRegister3: {
    screen: QRMerchantRegister3,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN__MERCHANT_REGISTRATION' />,
      tabBarVisible: false
    }
  },
  QRMerchantRegister4: {
    screen: QRMerchantRegister4,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN__MERCHANT_REGISTRATION' />,
      tabBarVisible: false
    }
  },
  QRRegisterConfirmation: {
    screen: QRRegisterConfirmation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN__MERCHANT_REGISTRATION' />,
      tabBarVisible: false
    }
  },
  QRMerchantTerminal: {
    screen: QRMerchantTerminal,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN__HEADER_TERMINAL' />,
      tabBarVisible: false
    }
  },
  QRMerchantDetail: {
    screen: QRMerchantDetail,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN__HEADER_TERMINAL' />,
      tabBarVisible: false
    }
  },
  QRTerminalRegister: {
    screen: QRTerminalRegister,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN__HEADER_TERMINAL_REG' />,
      tabBarVisible: false
    }
  },
  QRTerminalConfirmation: {
    screen: QRTerminalConfirmation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN__HEADER_TERMINAL_REG' />,
      tabBarVisible: false
    }
  },
  QRTerminalEdit: {
    screen: QRTerminalEdit,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN__HEADER_TERMINAL_EDIT' />,
      tabBarVisible: false
    }
  },
  QRTerminalEditConfirm: {
    screen: QRTerminalEditConfirm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN__HEADER_TERMINAL_EDIT' />,
      tabBarVisible: false
    }
  },
  QRConfirm: {
    screen: QRConfirmPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN' />,
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
  HomeScreen: {
    screen: Homescreen,
    navigationOptions: navHeaders.DashboardNavConfig
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
}, {
  cardStyle: {
    backgroundColor: 'white'
  },
  headerMode: 'none',
});

export default QRGpnRoutes;
