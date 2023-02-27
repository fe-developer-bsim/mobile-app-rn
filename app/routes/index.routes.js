import {StackNavigator} from 'react-navigation';
import OnboardingRoutes from './onboarding.routes';
import {noHeader, offersHeader, shopHeader, transactionsNavConfig} from './navHeaders.config';
import MainRoutes from './mainTabs.routes';
import EmoneyRoutes from './emoneyTabs.routes';
import PaymentStatusPage from '../pages/PaymentStatus/PaymentStatus.page';
import PaymentStatusNewPage from '../pages/PaymentStatus/PaymentStatusNew.page';
import React from 'react';
import AppVersionUpdator from '../pages/AppVersionUpdator/AppVersionUpdator.page';
import Offers from '../pages/Profile/Offers.page';
import Shop from '../pages/Profile/Shop.page';
import Transactions from '../pages/Transactions/Transactions.page';
import CloseEmoneyFinishScreen from '../pages/Emoney/EmoneyClosingFinish.page';
import EmallRoutes from './emallConfirm.routes';
import EgiftRoutes from './eGift.routes';
import GenerateCodeTimeout from '../pages/GenerateCodeJourney/GenerateCodeTimeout.page';
// import ReksadanaRoutes from './reksadana.routes';
import MerchantEstoreRoutes from './merchantEstore.routes';
import alfacartEstoreRoutes from './alfacartEstore.routes';


export default StackNavigator({
  Main: {
    screen: MainRoutes,
    navigationOptions: noHeader
  },
  MainEmoney: {
    screen: EmoneyRoutes,
    navigationOptions: noHeader
  },
  AppVersionUpdator: {
    screen: AppVersionUpdator,
    navigationOptions: noHeader
  },
  PaymentStatus: {
    screen: PaymentStatusPage,
    navigationOptions: noHeader
  },
  PaymentStatusNew: {
    screen: PaymentStatusNewPage,
    navigationOptions: noHeader
  },
  Offers: {
    screen: Offers,
    navigationOptions: offersHeader
  },
  Shop: {
    screen: Shop,
    navigationOptions: shopHeader
  },
  TransactionsIndex: {
    screen: Transactions,
    navigationOptions: transactionsNavConfig,
  },
  CloseEmoneyFinish: {
    screen: CloseEmoneyFinishScreen,
    navigationOptions: noHeader
  },
  EmallRoutes: {
    screen: EmallRoutes,
    navigationOptions: noHeader
  },
  EgiftConfirm: {
    screen: EgiftRoutes,
    navigationOptions: noHeader
  },
  MerchantEstoreRoutes: {
    screen: MerchantEstoreRoutes,
    navigationOptions: noHeader
  },
  alfacartEstoreRoutes: {
    screen: alfacartEstoreRoutes,
    navigationOptions: noHeader    
  },
  GenerateCodeTimeout: {
    screen: GenerateCodeTimeout,
    navigationOptions: noHeader
  },
  Onboarding: {
    screen: OnboardingRoutes,
    navigationOptions: noHeader
  },
}, {
  mode: 'modal',
  navigationOptions: {
    gesturesEnabled: false,
  },
  cardStyle: {
    backgroundColor: 'white'
  }
});
