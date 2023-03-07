import * as navHeaders from './navHeaders.config';
import { createStackNavigator } from 'react-navigation-stack';
import ProfileRoutes from './profile.routes';
import Help from '../pages/Help/Help.page';
import React from 'react';
import HeaderTitle from '../components/NavHeader/HeaderTitle.component';
import FAQform from '../pages/Help/FAQWeb.page';

const HelpRoutes = createStackNavigator({
  HelpScreen: {
    screen: Help,
    navigationOptions: navHeaders.MainIndexPageNavConfig,
  },
  FAQform: {
    screen: FAQform,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'HELP__FREQUENTLY_ASKED_QUESTIONS'} />,
      tabBarVisible: false
    }
  },
  Profile: {
    screen: ProfileRoutes,
    navigationOptions: {
      tabBarVisible: false
    }
  }
}, {
  cardStyle: {
    backgroundColor: 'white'
  }
});

export default HelpRoutes;
