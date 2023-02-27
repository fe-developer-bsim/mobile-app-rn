import * as navHeaders from './navHeaders.config';
import {StackNavigator} from 'react-navigation';

import React from 'react';
import HeaderTitle from '../components/NavHeader/HeaderTitle.component';

import EmoneyUpgradeForm from '../pages/EmoneyJourney/EmoneyUpgradeForm1.page';
import EmoneyUpgradeForm2 from '../pages/EmoneyJourney/EmoneyUpgradeForm2.page';
import EmoneyUpgradeForm3 from '../pages/EmoneyJourney/EmoneyUpgradeForm3.page';
import SignatureScreen from '../pages/Signature/Signature.page';
import KTPPassportCamera from '../pages/Camera/KTPPassportCamera.page';
import EmoneyUpgradeFinalizeScreen from '../pages/EmoneyJourney/EmoneyUpgradeFinalize.page';
import {noHeader} from './navHeaders.config';
import EmoneyImageConfirmation from '../pages/EmoneyJourney/EmoneyImageConfirmation.page';
import Authenticate from '../pages/Authenticate/Authenticate.page';


const EmoneyUpgrade = StackNavigator({
  KTPPassportCameraPage: {
    screen: KTPPassportCamera,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBlackCamera,
      tabBarVisible: false
    }
  },
  EmoneyImageConfirmation: {
    screen: EmoneyImageConfirmation,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  EmoneyUpgradeForm: {
    screen: EmoneyUpgradeForm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TITLE__EMONEY_UPGRADE' />,
      tabBarVisible: false
    }
  },
  EmoneyUpgradeForm2: {
    screen: EmoneyUpgradeForm2,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TITLE__EMONEY_UPGRADE' />,
      tabBarVisible: false
    }
  },
  EmoneyUpgradeForm3: {
    screen: EmoneyUpgradeForm3,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TITLE__EMONEY_UPGRADE' />,
      tabBarVisible: false
    }
  },
  SignatureSendPage: {
    screen: SignatureScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TITLE__EMONEY_UPGRADE'/>,
      tabBarVisible: false
    }
  },
  EmoneyUpgradeFinalize: {
    screen: EmoneyUpgradeFinalizeScreen,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    },
  },
  AuthEmoney: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
}, {
  cardStyle: {
    backgroundColor: 'white'// to change the backgroundColor color of the whole application
  },
  headerMode: 'none'
});

export default EmoneyUpgrade;
