import {TabNavigator} from 'react-navigation';
import SendRoutes from './send.routes';
import HomeRoutes from './onboarding.routes';
import PayRoutes from './qrPayment.routes';
import WithdrawalRoutes from './cardlessWithdrawal.routes';
import * as navHeaders from './navHeaders.config';
import {language} from '../config/language';
import AccountRoutes from './account.routes';

export default TabNavigator({
  Home: {
    screen: HomeRoutes,
    path: 'home/index',
    navigationOptions: (navProps) => {
      const options = {
        tabBarLabel: language.TAB_TITLE__OVERVIEW,
        tabBarIcon: navHeaders.generatedIcon('new-home-active', 'new-home', false, navProps),
        tabBarVisible: navProps.navigationOptions.tabBarVisible
      };
      return options;
    }
  },
  Send: {
    screen: SendRoutes,
    navigationOptions: (navProps) => {
      const options = {
        tabBarLabel: language.TAB_TITLE__SEND,
        tabBarIcon: navHeaders.generatedIcon('new-send-active', 'new-send', false, navProps),
        tabBarVisible: navProps.navigationOptions.tabBarVisible
      };
      return options;
    }
  },
  Pay: {
    screen: PayRoutes,
    navigationOptions: (navProps) => {
      const isScan = true;
      const options = {
        tabBarLabel: language.SCAN_QR__TITLE,
        tabBarIcon: navHeaders.generatedIcon('scan-to-pay-e-money', 'scan-to-pay-e-money', isScan, navProps),
        tabBarVisible: navProps.navigationOptions.tabBarVisible
      };
      return options;
    }
  },
  Withdraw: {
    screen: WithdrawalRoutes,
    navigationOptions: (navProps) => {
      const options = {
        tabBarLabel: language.TAB_TITLE__WITHDRAW,
        tabBarIcon: navHeaders.generatedIcon('new-cash-active', 'new-cash', false, navProps),
        tabBarVisible: navProps.navigationOptions.tabBarVisible
      };
      return options;
    }
  },
  Account: {
    screen: AccountRoutes,
    navigationOptions: (navProps) => {
      const options = {
        tabBarLabel: language.TAB_TITLE__SETTING,
        tabBarIcon: navHeaders.generatedIcon('gear-setting', 'gear-setting', false, navProps),
        tabBarVisible: navProps.navigationOptions.tabBarVisible
      };
      return options;
    }
  },
}, navHeaders.tabsOptions);