import * as navHeaders from './navHeaders.config';
import {StackNavigator} from 'react-navigation';
import {noHeader} from './navHeaders.config';
import React from 'react';
import HeaderTitle from '../components/NavHeader/HeaderTitle.component';
import CardLessWithdrawalIndex from '../pages/CardLessWithdrawalJourney/CardLessWithdrawalIndex.page';
import CardLessWithdrawalAccount from '../pages/CardLessWithdrawalJourney/CardLessWithdrawalAccount.page';
import CardLessWithdrawalPayment from '../pages/CardLessWithdrawalJourney/CardLessWithdrawalPayment.page';
import CardLessWithdrawalConfirmation from '../pages/CardLessWithdrawalJourney/CardLessWithdrawalConfirmation.page';
import Authenticate from '../pages/Authenticate/Authenticate.page';
import FundTransfer from '../pages/CardLessWithdrawalJourney/CardLessWithdrawalIndex.page';
import CardLessWithdrawalSourceAccScreen from '../pages/CardLessWithdrawalJourney/CardLessWithdrawalSourceAccount.page';
import CardLessWithdrawalSourceAccScreenLKD from '../pages/CardLessWithdrawalJourney/CardLessWithdrawalSourceAccountLKD.page';
import MainGenerateCode from '../pages/GenerateCodeJourney/MainGenerateCode.page';
import GenerateCodeTnc from '../pages/GenerateCodeJourney/GenerateCodeTnc.page';
import TapGenerateCode from '../pages/GenerateCodeJourney/TapGenerateCode.page';
import TapGenerateCodeNumber from '../pages/GenerateCodeJourney/TapGenerateCodeNumber.page';
import GenerateCodeOnline from '../pages/GenerateCodeJourney/GenerateCode.page';
import GenerateForm from '../pages/GenerateCodeJourney/GenerateForm.page';
import feedbackPage from '../pages/Home/FeedbackGetter.page';
import GenerateConfirmation from '../pages/GenerateCodeJourney/GenerateConfirmation.page';
import QRConfirmPage from '../pages/QRGpn/QRConfirmPage.page';
import PaymentStatusNewPage from '../pages/PaymentStatus/PaymentStatusNew.page';
import SourceMerchant from '../pages/GenerateCodeJourney/SourceMerchant.page';
import EmoneyUpgrade from './emoneyUpgrade.routes';
import PaymentStatusRevampPage from '../pages/PaymentStatus/PaymentStatusRevamp.page';
import SimasPoinLogin from '../pages/Egift/SimasPoinLogin.page';
import IntroductionPage from '../pages/NewToBankOnboarding/Introduction.page';

import ValidatePassword from '../pages/Profile/ValidatePassword.page';
import ProductsList from '../pages/DigitalAccountOpening/ProductsList.page';
import ChooseProductsItem from '../pages/DigitalAccountOpening/ChooseProductsItem.page';
import ProductsTnC from '../pages/DigitalAccountOpening/ProductsTnC.page';
import CurrentSection from '../pages/DigitalAccountOpening/CurrentSectionForm.page';
import DigitalEForm from '../pages/DigitalAccountOpening/RenderDigitalEForm.page';
import CameraImageConfirmation from '../pages/DigitalAccountOpening/CameraImageConfirmation.page';
import DigitalEFormEmailVerification from '../pages/DigitalAccountOpening/DigitalEFormEmailVerification.page';
import DigitalEFormSuccessScreen from '../pages/DigitalAccountOpening/DigitalEFormSuccessScreen.page';

const cardlessWithdrawal = StackNavigator({
  CardLessWithdrawalIndex: {
    screen: CardLessWithdrawalIndex,
    navigationOptions: navHeaders.noHeader,
  },
  CardLessWithdrawalAccount: {
    screen: CardLessWithdrawalAccount,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'CARDLESSWITHDRAWAL__TITLE'} />,
      tabBarVisible: false,
    }
  },
  CardLessWithdrawalPayment: {
    screen: CardLessWithdrawalPayment,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'CARDLESSWITHDRAWAL__TITLE'} />,
      tabBarVisible: false,
    }
  },
  CardLessWithdrawalConfirmation: {
    screen: CardLessWithdrawalConfirmation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'CARDLESSWITHDRAWAL__TITLE_CONFIRMATION'} />,
      tabBarVisible: false,
    }
  },
  AuthTransfer: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader,
  },
  TransferScreen: {
    screen: FundTransfer,
    navigationOptions: navHeaders.noHeader,
  },
  CardLessWithdrawalSourceAcc: {
    screen: CardLessWithdrawalSourceAccScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'CARDLESSWITHDRAWAL__TITLE'} />,
      tabBarVisible: false,
    },
  },
  CardLessWithdrawalSourceAccLKD: {
    screen: CardLessWithdrawalSourceAccScreenLKD,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'CARDLESSWITHDRAWAL__TITLE'} />,
      tabBarVisible: false,
    },
  },
  MainGenerateCode1: {
    screen: MainGenerateCode,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'GENERATE_FORM_MERCHANT'} />,
      tabBarVisible: false,
    }
  },
  GenerateForm1: {
    screen: GenerateForm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'GENERATE_CODE__WITHDRAW'} />,
      tabBarVisible: false,
    }
  },
  feedbackPage: {
    screen: feedbackPage,
    navigationOptions: {
      ...navHeaders.noHeader,
      tabBarVisible: false,
    }
  },
  GenerateForm: {
    screen: GenerateForm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'GENERATE_CODE__WITHDRAW'} />,
      tabBarVisible: false,
    }
  },
  SourceMerchant: {
    screen: SourceMerchant,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'GENERATE_FORM_MERCHANT'} />,
      tabBarVisible: false,
    }
  },
  GenerateCodeOnline: {
    screen: GenerateCodeOnline,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'GENERATE_CODE__WITHDRAW'} />,
      tabBarVisible: false,
    }
  },
  TapGenerateCode: {
    screen: TapGenerateCode,
    navigationOptions: {
      ...navHeaders.noHeader, headerTitle: <HeaderTitle titleBlack={''} />,
      tabBarVisible: false,
    }
  },
  TapGenerateCodeNumber: {
    screen: TapGenerateCodeNumber,
    navigationOptions: {
      ...navHeaders.noHeader, headerTitle: <HeaderTitle titleBlack={''} />,
      tabBarVisible: false,
    }
  },
  GenerateCodeTnc: {
    screen: GenerateCodeTnc,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'GENERATE_CODE_TNC'} />,
      tabBarVisible: false,
    }
  },
  EmoneyUpgrade: {
    screen: EmoneyUpgrade,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
  GenerateConfirmation: {
    screen: GenerateConfirmation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'GENERATE_CONFIRMATION_HEADER'} />,
      tabBarVisible: false,
    }
  },

  QRConfirm: {
    screen: QRConfirmPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='QR_GPN' />,
      tabBarVisible: false,
    }
  },
  PaymentStatusNewPage: {
    screen: PaymentStatusNewPage,
    navigationOptions: {
      header: null,
      tabBarVisible: false,
    }
  },
  SimasPoinLogin: {
    screen: SimasPoinLogin,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand,
      tabBarVisible: false,
    },
  },
  PaymentStatusRevampPage: {
    screen: PaymentStatusRevampPage,
    navigationOptions: {
      header: null,
      tabBarVisible: false,
    }
  },
  Introduction: {
    screen: IntroductionPage,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false,
    },
  },
  ValidatePassword: {
    screen: ValidatePassword,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false,
    }
  },
  ProductsListUpgradeEmoney: {
    screen: ProductsList,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle langKey={'UPGRADE__EMONEY'} />,
      tabBarVisible: false,
    }
  },
  ChooseProductsItem: {
    screen: ChooseProductsItem,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle langKey={'PRODUCTS__SELECTIONS'} />,
      tabBarVisible: false,
    }
  },
  ProductsTnC: {
    screen: ProductsTnC,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle langKey={'GENERIC__TERM_AND_CONDITION'} />,
      tabBarVisible: false,
    }
  },
  CurrentSection: {
    screen: CurrentSection,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle langKey={'EFORM__NAVBAR'} />,
      tabBarVisible: false,
    }
  },
  DigitalEForm: {
    screen: DigitalEForm,
    navigationOptions: navHeaders.eformHeader,
  },
  CameraImageConfirmation: {
    screen: CameraImageConfirmation,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false,
    },
  },
  DigitalEFormEmailVerification: {
    screen: DigitalEFormEmailVerification,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'EFORM__NAVBAR'} />,
      tabBarVisible: false,
    }
  },
  DigitalEFormSuccessScreen: {
    screen: DigitalEFormSuccessScreen,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false,
    }
  },
});

cardlessWithdrawal.navigationOptions = ({navigation}) => {
  let tabBarVisible;
  navigation.state.routes.map(route => {
    if (
      route.routeName === 'CardLessWithdrawalIndex' ||
      route.routeName === 'TransferScreen'
    ) {
      tabBarVisible = true;
    } else {
      tabBarVisible = false;
    }
  });

  return {
    tabBarVisible,
    backBehavior: 'history',
  };
};

export default cardlessWithdrawal;
