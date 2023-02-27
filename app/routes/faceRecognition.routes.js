import React from 'react';
import * as navHeaders from './navHeaders.config';
import {StackNavigator} from 'react-navigation';
import CameraScreen from '../pages/Camera/Camera.page';
import CommonOTPScreen from '../pages/OTP/CommonOTP.page';
import HeaderTitle from '../components/NavHeader/HeaderTitle.component';

const ProfileRoutes = StackNavigator({
  ProfileCameraPage: {
    screen: CameraScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'REGISTER_FACE__TITLE'} />,
      tabBarVisible: false
    }
  },
  CommonOTP: {
    screen: CommonOTPScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerGreen,
      tabBarVisible: false
    }
  },
}, {
  cardStyle: {
    backgroundColor: 'white'
  },
  headerMode: 'none',
});

export default ProfileRoutes;
