import * as navHeaders from './navHeaders.config';
import {StackNavigator} from 'react-navigation';
import React from 'react';

import HeaderTitle from '../components/NavHeader/HeaderTitle.component';
import Homescreen from '../pages/Home/Dashboard.page';

import ConfirmationScreen from '../pages/Egift/Confirmation.page';
import PaymentStatusScreen from '../pages/Egift/EgiftPaymentStatus.page';
import Authenticate from '../pages/Authenticate/Authenticate.page';

import InputEmailScreen from '../pages/MerchantJourney/InputEmailCustomer.page';
import MerchantCheckout from '../pages/MerchantJourney/MerchantCheckout.page';
import TransferAccount from '../pages/Account/SourceAccount.page';
import AlfacartShippingMethod from '../pages/MerchantJourney/MerchantShippingMethod.page';
import DigitalStorePaymentStatus from '../pages/MerchantJourney/DigitalStorePaymentStatus.page';

import CouponList from '../pages/Coupon/CouponPage.page';
import DetailCouponList from '../pages/Coupon/CouponDetail.page';
import AlfacartCheckout from '../pages/OnboardingJourney/AlfacartCheckout.page'; 

import PaymentStatusRevampPage from '../pages/PaymentStatus/PaymentStatusRevamp.page';
import {noHeader} from './navHeaders.config';

import DigitalStorePaymentStatusKoperasi from '../pages/MerchantJourney/DigitalStorePaymentStatusKoperasi.page';
import LandingPage from '../pages/OnboardingJourney/Landing.page';




const EgiftRoutes = StackNavigator({
  MerchantCheckout: {
    screen: MerchantCheckout,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='ALFACART_CHECKOUT_TITTLE'/>,
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
  AlfacartShippingMethod: {
    screen: AlfacartShippingMethod,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='ALFACART_CHECKOUT_TITTLE'/>,
      tabBarVisible: false
    },
  },
  
  EgiftConfirmation: {
    screen: ConfirmationScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'EGIFT__CONFIRMATION_PAYMENT'} />,
      tabBarVisible: false
    }
  },
  MerchantEasyPin: {
    screen: Authenticate,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand,
      tabBarVisible: false
    }
  },
  DigitalStorePaymentStatus: {
    screen: DigitalStorePaymentStatus,
    navigationOptions: navHeaders.noHeader
  },
  EgiftPaymentStatus: {
    screen: PaymentStatusScreen,
    navigationOptions: navHeaders.noHeader
  },
  MerchantInputCustomerEmail: {
    screen: InputEmailScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'EGIFT__TITLE_PAYMENT'} />,
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
  AlfacartCheckout: {
    screen: AlfacartCheckout,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='ALFACART_CHECKOUT_TITTLE'/>,
      tabBarVisible: false
    }
  },
  PaymentStatusRevampOnboarding: {
    screen: PaymentStatusRevampPage,
    navigationOptions: noHeader
  },
  DigitalStorePaymentStatusKoperasi: {
    screen: DigitalStorePaymentStatusKoperasi,
    navigationOptions: navHeaders.noHeader
  },
  HomeScreen: {
    screen: Homescreen,
    navigationOptions: {
      ...navHeaders.DashboardNavConfig,
      tabBarVisible: true
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
