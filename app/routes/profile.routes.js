import React from 'react';
import {profileHeader, navigationOptions, HeaderTitle, HeaderWhite} from './navHeaders.config';
import { createStackNavigator } from 'react-navigation-stack';
import ProfileScreen from '../pages/Profile/Profile.page';
import ValidatePassword from '../pages/Profile/ValidatePassword.page';
import ChangeEasyPinNew from '../pages/Profile/ChangeEasyPinNew.page';
import ChangeEasyPinConfirm from '../pages/Profile/ChangeEasyPinConfirm.page';
import ChangeEasyPinPasswordValidate from '../pages/Profile/ChangeEasyPinPasswordValidate.page';
import CreateNewPassword from '../pages/Profile/CreateNewPassword.page.js';
import SimasPoinWEB from '../pages/Profile/SimasPoinWEB.page';
import * as navHeaders from './navHeaders.config';
import CameraScreen from '../pages/Camera/Camera.page';
import UpdateEasyPin from '../pages/Profile/UpdateEasyPin.page';

const ProfileRoutes = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: (nav) => {
      const options = {
        ...profileHeader(nav),
        headerTitle: <HeaderWhite langKey={'PROFILE__TITLE'} />
      };
      return options;
    }
  },
  ValidatePassword: {
    screen: ValidatePassword,
    navigationOptions: {
      ...navHeaders.validatePasswordHeader,
    }
  },
  CreateNewPassword: {
    screen: CreateNewPassword,
    navigationOptions: {
      ...navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'CHANGE_PASSWORD__TITLE'} />
    }
  },
  ChangeEasyPinNew: {
    screen: ChangeEasyPinNew,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand,
    }
  },
  ChangeEasyPinConfirm: {
    screen: ChangeEasyPinConfirm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand,
    }
  },
  ChangeEasyPinPasswordValidate: {
    screen: ChangeEasyPinPasswordValidate,
    navigationOptions: {
      ...navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE__EASYPIN_TITLE'} />
    }
  },
  UpdateEasyPin: {
    screen: UpdateEasyPin,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='PROFILE__EASYPIN_TITLE'/>,
      tabBarVisible: false
    }
  },
  SimasPoinWebView: {
    screen: SimasPoinWEB,
    navigationOptions: {
      ...navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE__SIMAS_POIN_HEAD'} />
    }
  },
  ProfileCameraPage: {
    screen: CameraScreen,
    navigationOptions: {
      ...navigationOptions.headerWhite, headerTitle: <HeaderTitle langKey={'REGISTER_FACE__TITLE'} />
    }
  },
}, {
  cardStyle: {
    backgroundColor: 'white'
  },
  headerMode: 'none',
});

export default ProfileRoutes;
