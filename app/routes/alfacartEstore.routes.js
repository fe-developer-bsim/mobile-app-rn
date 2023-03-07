import * as navHeaders from './navHeaders.config';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import HeaderTitle from '../components/NavHeader/HeaderTitle.component';
import Homescreen from '../pages/Home/Dashboard.page';
import AlfacartCheckout from '../pages/OnboardingJourney/AlfacartCheckout.page'; 
import AlfacartShippingMethodReal from '../pages/OnboardingJourney/AlfacartShippingMethod.page';
import TransferAccount from '../pages/Account/SourceAccount.page';
import FormFillAlfaAddress from '../pages/OnboardingJourney/FormFillAlfaAddress.page';
import FormFillAlfaNewStore from '../pages/OnboardingJourney/FormFillAlfaNewStore.page';
import DigitalStorePaymentStatus from '../pages/MerchantJourney/DigitalStorePaymentStatus.page';
import CouponList from '../pages/Coupon/CouponPage.page';
import DetailCouponList from '../pages/Coupon/CouponDetail.page';
import InputEmailScreen from '../pages/MerchantJourney/InputEmailCustomer.page';
import Authenticate from '../pages/Authenticate/Authenticate.page';
import LandingPage from '../pages/OnboardingJourney/Landing.page';

const EgiftRoutes = createStackNavigator({
  AlfacartCheckout: {
    screen: AlfacartCheckout,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='ALFACART_CHECKOUT_TITTLE'/>,
      tabBarVisible: false
    }
  },
  DigitalStorePaymentStatus: {
    screen: DigitalStorePaymentStatus,
    navigationOptions: navHeaders.noHeader
  },
  AlfacartShippingMethodReal: {
    screen: AlfacartShippingMethodReal,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='ALFACART_SHIPPING_METHOD__TITTLE'/>,
      tabBarVisible: false
    },
  },
  AlfaSourceAccount: {
    screen: TransferAccount,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
      tabBarVisible: false
    }
  },
  FormFillAlfaAddress: {
    screen: FormFillAlfaAddress,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='ALFACART_SHIPPING_METHOD__TITTLE' />,
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
  FormFillAlfaNewStore: {
    screen: FormFillAlfaNewStore,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='ALFACART_SHIPPING_METHOD__TITTLE' />,
      tabBarVisible: false
    }
  },
  MerchantInputCustomerEmail: {
    screen: InputEmailScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'EGIFT__TITLE_PAYMENT'} />,
      tabBarVisible: false
    }
  },
  HomeScreen: {
    screen: Homescreen,
    navigationOptions: {
      ...navHeaders.DashboardNavConfig,
      tabBarVisible: true
    }
  },
  AlfaAuthenticate: {
    screen: Authenticate,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand,
      tabBarVisible: false
    }
  },
  Landing: {
    screen: LandingPage,
    path: 'index',
    navigationOptions: navHeaders.LandingHeaderNew
  },
}, {
  cardStyle: {
    backgroundColor: 'white'// to change the backgroundColor color of the whole application
  },
  headerMode: 'screen'
});


export default EgiftRoutes;
