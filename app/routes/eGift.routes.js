import * as navHeaders from './navHeaders.config';
import {StackNavigator} from 'react-navigation';
import React from 'react';

import HeaderTitle from '../components/NavHeader/HeaderTitle.component';
import Homescreen from '../pages/Home/Dashboard.page';

import EgiftSrcAcc from '../pages/Egift/EgiftSrcAcc.page';
import PaymentScreen from '../pages/Egift/Payment.page';
import ConfirmationScreen from '../pages/Egift/Confirmation.page';
import PaymentStatusScreen from '../pages/Egift/EgiftPaymentStatus.page';
import Authenticate from '../pages/Authenticate/Authenticate.page';
import LandingPage from '../pages/OnboardingJourney/Landing.page';

const EgiftRoutes = StackNavigator({
  EgiftSrcAcc: {
    screen: EgiftSrcAcc,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerLeft: null, headerTitle: <HeaderTitle titleBlack={'EGIFT__TITLE_PAYMENT'} />,
    },
    tabBarVisible: false
  },
  EgiftPayment: {
    screen: PaymentScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'EGIFT__TITLE_PAYMENT'} />,
      tabBarVisible: false
    }
  },
  EgiftConfirmation: {
    screen: ConfirmationScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'EGIFT__CONFIRMATION_PAYMENT'} />,
      tabBarVisible: false
    }
  },
  EgiftEasyPin: {
    screen: Authenticate,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand,
      tabBarVisible: false
    }
  },
  EgiftPaymentStatus: {
    screen: PaymentStatusScreen,
    navigationOptions: navHeaders.noHeader
  },
  HomeScreen: {
    screen: Homescreen,
    navigationOptions: navHeaders.DashboardNavConfig
  },
  Landing: {
    screen: LandingPage,
    navigationOptions: navHeaders.LandingHeaderNew
  },
}, {
  cardStyle: {
    backgroundColor: 'white'// to change the backgroundColor color of the whole application
  },
  headerMode: 'screen'
});


export default EgiftRoutes;
