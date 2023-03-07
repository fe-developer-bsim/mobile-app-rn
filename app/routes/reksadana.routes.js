import * as navHeaders from './navHeaders.config';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';

import HeaderTitle from '../components/NavHeader/HeaderTitle.component';
import Homescreen from '../pages/Home/Dashboard.page';

import SimasSekuritas from '../pages/InvestmentJourney/SinarmasSekuritas.page';

import BuyReksadana from '../pages/InvestmentJourney/BuyReksadana.page';
import BuyReksadanaConfirmation from '../pages/InvestmentJourney/BuyReksadanaConfirmation.page';

import SellReksadana from '../pages/InvestmentJourney/SellReksadana.page';
import SellReksadanaConfirmation from '../pages/InvestmentJourney/SellReksadanaConfirmation.page';

import SourceAccountReksadana from '../pages/InvestmentJourney/SourceAccountReksadana.page';


import PaymentStatusNewPage from '../pages/PaymentStatus/PaymentStatusNew.page';
import {noHeader} from './navHeaders.config';


const ReksadanaRoutes = createStackNavigator({
  SimasSekuritasView: {
    screen: SimasSekuritas,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: <HeaderTitle titleBlack={'REKSADANA_TOP_UP_TITLE'} />,
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
  HomeScreens: {
    screen: Homescreen,
    navigationOptions: navHeaders.DashboardNavConfig
  },
  PaymentStatusNew: {
    screen: PaymentStatusNewPage,
    navigationOptions: noHeader
  },
}, {
  cardStyle: {
    backgroundColor: 'white'
  },
  headerMode: 'screen',
});

export default ReksadanaRoutes;
