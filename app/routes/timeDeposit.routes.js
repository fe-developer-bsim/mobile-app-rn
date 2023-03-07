import * as navHeaders from './navHeaders.config';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';

import HeaderTitle from '../components/NavHeader/HeaderTitle.component';

import TdForm from '../pages/TdJourney/TdForm.page';
import TdFAQScreen from '../pages/TdJourney/TdFAQ.page';
import TdConfirmation from '../pages/TdJourney/TdConfirmation.page';

import Authenticate from '../pages/Authenticate/Authenticate.page';



const OpenAccountRoutes = createStackNavigator({
  TdForm: {
    screen: TdForm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TIME_DEPOSIT__NAV_HEADER' />,
      tabBarVisible: false
    }
  },
  TdFAQ: {
    screen: TdFAQScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TIME_DEPOSIT_TC__NAV_HEADER' />,
      tabBarVisible: false
    }
  },
  TdSummary: {
    screen: TdConfirmation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TIME_DEPOSIT__NAV_HEADER' />,
      tabBarVisible: false
    }
  },
  AuthTd: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
  TdFormNkycUser: {
    screen: TdForm,
    navigationOptions: {
      ...navHeaders.noHeader,
      tabBarVisible: false
    }
  },
}, {
  cardStyle: {
    backgroundColor: 'white'// to change the backgroundColor color of the whole application
  },
  headerMode: 'none',
});


export default OpenAccountRoutes;
