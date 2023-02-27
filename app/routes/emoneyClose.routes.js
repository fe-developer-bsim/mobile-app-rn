import * as navHeaders from './navHeaders.config';
import {StackNavigator} from 'react-navigation';
import React from 'react';

import HeaderTitle from '../components/NavHeader/HeaderTitle.component';

import ConfirmClosingEmoneyScreen from '../pages/Emoney/EmoneyClosingConfirmation.page';

import Authenticate from '../pages/Authenticate/Authenticate.page';

const OpenAccountRoutes = StackNavigator({
  ConfirmClosingEmoney: {
    screen: ConfirmClosingEmoneyScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'EMONEY__CLOSING_EMONEY'} />,
      tabBarVisible: false
    }
  },
  AuthEmoneyClose: {
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
