import * as navHeaders from './navHeaders.config';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';

import HeaderTitle from '../components/NavHeader/HeaderTitle.component';

import OpenAndromaxPage from '../pages/OpenNewAccount/OpenAndromax.page';
import OpenAndromaxFormPage from '../pages/OpenNewAccount/OpenAndromaxForm.page';
import OpenAndromaxConfirmationPage from '../pages/OpenNewAccount/OpenAndromaxConfirmation.page';

import Authenticate from '../pages/Authenticate/Authenticate.page';

const OpenAccountRoutes = createStackNavigator({
  OpenAndromaxScreen: {
    screen: OpenAndromaxPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'OPEN_NEW_ACCOUNT__TITLE'} />,
      tabBarVisible: false
    }
  },
  OpenAndromaxForm: {
    screen: OpenAndromaxFormPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'OPEN_NEW_ACCOUNT__TITLE'} />,
      tabBarVisible: false
    }
  },
  OpenAndromaxConfirmation: {
    screen: OpenAndromaxConfirmationPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'OPEN_NEW_ACCOUNT__TITLE'} />,
      tabBarVisible: false
    }
  },
  AuthOpenAccount: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
}, {
  cardStyle: {
    backgroundColor: 'white'// to change the backgroundColor color of the whole application
  },
  headerMode: 'none',
});


export default OpenAccountRoutes;
