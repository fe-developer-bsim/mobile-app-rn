import * as navHeaders from './navHeaders.config';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';

import {noHeader} from './navHeaders.config';
import HeaderTitle from '../components/NavHeader/HeaderTitle.component';
import Homescreen from '../pages/Home/Dashboard.page';

import EmallSourceAcc from '../pages/Emall/EmallSourceAcc.page';
import EmallCgv from '../pages/Emall/EmallCgv.page';
import EmallCgvInfo from '../pages/Emall/EmallCgvInfo.page';
import EmallCgvStatus from '../pages/Emall/EmallCgvStatus.page';
import Authenticate from '../pages/Authenticate/Authenticate.page';
import EmallTx from '../pages/Emall/EmallTx.page';
import EmallTxInfo from '../pages/Emall/EmallTxInfo.page';
import EmallTxStatus from '../pages/Emall/EmallTxStatus.page';

const EmallRoutes = createStackNavigator({
  EmallSourceAcc: {
    screen: EmallSourceAcc,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, left: null, headerTitle: <HeaderTitle titleBlack={'CGV__TITLE_PAYMENT'} />,
    },
    tabBarVisible: false
  },
  EmallCgv: {
    screen: EmallCgv,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CGV__TITLE_CONFIRMATION' />,
      tabBarVisible: false
    }
  },
  EmallCgvInfo: {
    screen: EmallCgvInfo,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CGV__TITLE_DETAIL' />,
      tabBarVisible: false
    }
  },
  EmallCgvStatus: {
    screen: EmallCgvStatus,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='CGV__TITLE_DETAIL' />,
      tabBarVisible: false
    }
  },
  EmallTx: {
    screen: EmallTx,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='Flight__TITLE_CONFIRMATION' />,
      tabBarVisible: false
    }
  },
  EmallTxInfo: {
    screen: EmallTxInfo,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='Flight__TITLE_DETAIL' />,
      tabBarVisible: false
    }
  },
  EmallEasyPin: {
    screen: Authenticate,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='Flight__TITLE_DETAIL' />,
      tabBarVisible: false
    }
  },
  EmallTxStatus: {
    screen: EmallTxStatus,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  HomeScreen: {
    screen: Homescreen,
    navigationOptions: navHeaders.DashboardNavConfig
  },
}, {
  cardStyle: {
    backgroundColor: 'white'
  },
  headerMode: 'screen',
});

export default EmallRoutes;
