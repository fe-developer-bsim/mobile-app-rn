import * as navHeaders from './navHeaders.config';
import { createStackNavigator } from 'react-navigation-stack';
import {noHeader} from './navHeaders.config';

import FundTransfer from '../pages/FundTransferJourney/AddPayeeAccount.page';
import AddPayeeAccount from '../pages/FundTransferJourney/AddPayeeAccount.page';
import AddPayeeBank from '../pages/FundTransferJourney/AddPayeeBank.page';
import AddPayee from '../pages/FundTransferJourney/AddPayee.page';
import FundTransferPayment from '../pages/FundTransferJourney/FundTransferPayment.page';
import FundTransferPaymentFromSetLimit from '../pages/FundTransferJourney/FundTransferPaymentFromSetLimit.page';
import FundTransferConfirmationFromSetLimit from '../pages/FundTransferJourney/FundTransferPaymentConfirmationFromSetLimit.page';
import SendSourceAcc from '../pages/FundTransferJourney/SendSourceAcc.page';
import FundTransferConfirmation from '../pages/FundTransferJourney/FundTransferConfirmation.page';
import ProfileRoutes from './profile.routes';
import React from 'react';
import HeaderTitle from '../components/NavHeader/HeaderTitle.component';


import EmoneyTopupScreen from '../pages/FundTransferJourney/EmoneyTopup.page';
import EmoneyTopUpScreenNew from '../pages/EmoneyJourney/EmoneyTopUp.page';
import EmoneyTopUpBankBranchScreen from '../pages/EmoneyJourney/EmoneyTopUpBankBranch.page';

import FundTransferMethodScreen from '../pages/FundTransferJourney/FundTransferMethod.page';
import FundTransferScheduleScreen from '../pages/FundTransferJourney/FundTransferSchedule.page';
import RecurringEditingPage from '../pages/RecurringJourney/RecurringEditing.page';
import RecurringDetailListPage from '../pages/RecurringJourney/RecurringDetailList.page';

import Authenticate from '../pages/Authenticate/Authenticate.page';

import TransferAccount from '../pages/Account/SourceAccount.page';

import FavBiller from '../pages/Account/FavoriteBiller.page';
import feedbackPage from '../pages/Home/FeedbackGetter.page';

import EmoneyUpgrade from './emoneyUpgrade.routes';
import FundTransferValasPayment from '../pages/FundTransferJourney/FundTransferValasPayment.page';
import FundTransferValasConfirmation from '../pages/FundTransferJourney/FundTransferValasConfirmation.page';

import SimasPoinLogin from '../pages/Egift/SimasPoinLogin.page';
import RemittanceSwiftCode from '../pages/FundTransferJourney/RemittanceSwiftCode.page';
import RemittanceBankInformation from '../pages/FundTransferJourney/RemittanceBankInformation.page';
import RemittanceRecipientData from '../pages/FundTransferJourney/RemittanceRecipientData.page';
import RemittanceSenderData from '../pages/FundTransferJourney/RemittanceSenderData.page';
import IntroductionPage from '../pages/NewToBankOnboarding/Introduction.page';


import SetEditLimitFundTransfer from '../pages/FundTransferJourney/SetEditLimitFundTransfer.page';
import SetEditLimitFromSetLimit from '../pages/FundTransferJourney/SetEditFromSetLimit.page';
import SetLimitFromTransferConfirmation from '../pages/FundTransferJourney/SetLimitFromTransferConfirmation.page';
import EasyPinSetLimit from '../pages/Authenticate/SetLimitAuthenticate.page';
import EasyPinSetLimitHighValue from '../pages/Authenticate/SetLimitAuthenticateHighValue.page';
import EasyPinSetLimitEdit from '../pages/Authenticate/SetLimitAuthenticateEdit.page';
import EasyPinSetLimitEditFund from '../pages/Authenticate/SetLimitAuthenticateEditFund.page';
import EasyPinSetLimitEditConfirm from '../pages/Authenticate/SetLimitAuthenticateEditFundConfirm.page';
import FundTransferPaymentSetLimit from '../pages/FundTransferJourney/FundTransferPaymentSetLimit.page';
import FundTransferConfirmationSetLimit from '../pages/FundTransferJourney/FundTransferConfirmationSetLimit.page';

import RemittanceTransferPayment from '../pages/FundTransferJourney/RemittanceTransferPayment.page';
import RemittanceTransferConfirmation from '../pages/FundTransferJourney/RemittanceTransferConfirmation.page';
import FundTransferRevamp from '../pages/FundTransferJourney/FundTransferRevamp.page';
import PaymentStatusRemittance from '../pages/PaymentStatus/PaymentStatusRemittance.page';
import FundTransferMethodRemittance from '../pages/FundTransferJourney/FundTransferMethod.page';
import FundTransferRemittanceScheduleScreen from '../pages/FundTransferJourney/FundTransferSchedule.page';

import ValidatePassword from '../pages/Profile/ValidatePassword.page';
import ProductsList from '../pages/DigitalAccountOpening/ProductsList.page';
import ChooseProductsItem from '../pages/DigitalAccountOpening/ChooseProductsItem.page';
import ProductsTnC from '../pages/DigitalAccountOpening/ProductsTnC.page';
import CurrentSection from '../pages/DigitalAccountOpening/CurrentSectionForm.page';
import DigitalEForm from '../pages/DigitalAccountOpening/RenderDigitalEForm.page';
import CameraImageConfirmation from '../pages/DigitalAccountOpening/CameraImageConfirmation.page';
import DigitalEFormEmailVerification from '../pages/DigitalAccountOpening/DigitalEFormEmailVerification.page';
import DigitalEFormSuccessScreen from '../pages/DigitalAccountOpening/DigitalEFormSuccessScreen.page';

const SendRoutes = createStackNavigator({
  FundTransferRevamp: {
    screen: FundTransferRevamp,
    navigationOptions: {
      ...navHeaders.noHeader,
    }
  },
  TransferScreen: {
    screen: FundTransferRevamp,
    navigationOptions: {
      ...navHeaders.noHeader,
    }
  },
  AddPayee: {
    screen: AddPayee,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__SELECT_PAYEE'} />,
      tabBarVisible: false
    }
  },
  AddPayeeAccount: {
    screen: AddPayeeAccount,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__SELECT_PAYEE_ACCOUNT'} />,
      tabBarVisible: false
    }
  },
  AddPayeeBank: {
    screen: AddPayeeBank,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__SELECT_BANK'} />,
      tabBarVisible: false
    }
  },
  FundTransferPayment: {
    screen: FundTransferPayment,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
      tabBarVisible: false
    }
  },
  SendSourceAcc: {
    screen: SendSourceAcc,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
      tabBarVisible: false
    }
  },
  FundTransferConfirmation: {
    screen: FundTransferConfirmation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_CONFIRMATION'} />,
      tabBarVisible: false
    }
  },
  Profile: {
    screen: ProfileRoutes,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  AuthTransfer: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
  AuthTransferSetLimit: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
  FundTransferMethod: {
    screen: FundTransferMethodScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
      tabBarVisible: false
    }
  },
  FundTransferSchedule: {
    screen: FundTransferScheduleScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
      tabBarVisible: false
    }
  },
  RecurringEditing: {
    screen: RecurringEditingPage,
    navigationOptions: navHeaders.EditTransferHeader,
  },
  RecurringDetailList: {
    screen: RecurringDetailListPage,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='RECURRING__HEADER_TITLE' />,
      tabBarVisible: false
    }
  },
  EmoneyTopup: {
    screen: EmoneyTopupScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TITLE__TRANSFER_TITLE' />,
      tabBarVisible: false
    }
  },
  EmoneyTopUpNew: {
    screen: EmoneyTopUpScreenNew,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TITLE__TRANSFER_TITLE' />,
      tabBarVisible: false
    }
  },

  TransferSourceAccount: {
    screen: TransferAccount,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
      tabBarVisible: false
    }
  },
  EmoneyTopUpBankBranch: {
    screen: EmoneyTopUpBankBranchScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PRODUCTS__CREDITCARD_TITLE'} />,
      tabBarVisible: false
    }
  },
  AuthEmoney: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
  FavBiller: {
    screen: FavBiller,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'FAVORITE_TRANSACTION'} />,
      tabBarVisible: false
    }
  },
  EmallEasyPin: {
    screen: Authenticate,
    navigationOptions: navHeaders.AuthenticateHeader
  },
  feedbackPage: {
    screen: feedbackPage,
    navigationOptions: {
      ...navHeaders.noHeader,
      tabBarVisible: false
    }
  },
  EmoneyUpgrade: {
    screen: EmoneyUpgrade,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  SimasPoinLogin: {
    screen: SimasPoinLogin,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand,
      tabBarVisible: false
    },
  },
  FundTransferValasPayment: {
    screen: FundTransferValasPayment,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
      tabBarVisible: false
    }
  },
  FundTransferValasConfirmation: {
    screen: FundTransferValasConfirmation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_CONFIRMATION'} />,
      tabBarVisible: false
    }
  },
  FundTransferRev: {
    screen: FundTransfer,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      tabBarVisible: false
    }
  },
  RemittanceSwiftCode: {
    screen: RemittanceSwiftCode,
    navigationOptions: navHeaders.remittanceHeader
  },
  RemittanceBankInformation: {
    screen: RemittanceBankInformation,
    navigationOptions: {
      ...navHeaders.noHeader,
      tabBarVisible: false
    }
  },
  RemittanceRecipientData: {
    screen: RemittanceRecipientData,
    navigationOptions: {
      ...navHeaders.noHeader,
      tabBarVisible: false
    }
  },
  RemittanceSenderData: {
    screen: RemittanceSenderData, 
    navigationOptions: {
      ...navHeaders.noHeader,
      tabBarVisible: false
    }
  },
  RemittanceTransferPayment: {
    screen: RemittanceTransferPayment,
    navigationOptions: navHeaders.remittanceHeader
  },
  RemittanceTransferConfirmation: {
    screen: RemittanceTransferConfirmation,
    navigationOptions: navHeaders.remittanceConfirmHeader
  },
  PaymentStatusRemittance: {
    screen: PaymentStatusRemittance,
    ...navHeaders.noHeader,
    tabBarVisible: false
  },
  FundTransferMethodRemittance: {
    screen: FundTransferMethodRemittance,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__REMITTANCE'} />,
      tabBarVisible: false
    }
  },
  FundTransferRemittanceSchedule: {
    screen: FundTransferRemittanceScheduleScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__REMITTANCE'} />,
      tabBarVisible: false
    }
  },
  Introduction: {
    screen: IntroductionPage,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    },
  },
  SetEditLimitFundTransfer: {
    screen: SetEditLimitFundTransfer,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerPinkBrand, headerTitle: <HeaderTitle titleWhite={'SET_TRANSFER_LIMIT'} />,
      tabBarVisible: false
    }
  },
  SetEditLimitFromSetLimit: {
    screen: SetEditLimitFromSetLimit,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerPinkBrand, headerTitle: <HeaderTitle titleWhite={'SET_TRANSFER_LIMIT'} />,
      tabBarVisible: false
    }
  },
  SetLimitFromTransferConfirmation: {
    screen: SetLimitFromTransferConfirmation,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerPinkBrand, headerTitle: <HeaderTitle titleWhite={'SET_TRANSFER_LIMIT'} />,
      tabBarVisible: false
    }
  },
  EasyPinSetLimit: {
    screen: EasyPinSetLimit,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand,
      tabBarVisible: false}
  },  
  EasyPinSetLimitHighValue: {
    screen: EasyPinSetLimitHighValue,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand,
      tabBarVisible: false}
  },
  EasyPinSetLimitEdit: {
    screen: EasyPinSetLimitEdit,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand,
      tabBarVisible: false}
  },
  EasyPinSetLimitEditFund: {
    screen: EasyPinSetLimitEditFund,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand,
      tabBarVisible: false}
  },
  EasyPinSetLimitEditConfirm: {
    screen: EasyPinSetLimitEditConfirm,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerBrand,
      tabBarVisible: false}
  },
  FundTransferPaymentSetLimit: {
    screen: FundTransferPaymentSetLimit,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
      tabBarVisible: false}
  },  
  FundTransferConfirmationSetLimit: {
    screen: FundTransferConfirmationSetLimit,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_CONFIRMATION'} />,
      tabBarVisible: false
    }
  },  
  FundTransferPaymentFromSetLimit: {
    screen: FundTransferPaymentFromSetLimit,
    navigationOptions: {     
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_TITLE'} />,
      tabBarVisible: false
    }
  },
  FundTransferConfirmationFromSetLimit: {
    screen: FundTransferConfirmationFromSetLimit,
    navigationOptions: {     
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'TITLE__TRANSFER_CONFIRMATION'} />,
      tabBarVisible: false
    }
  },
  AccountMenu: {
    screen: FundTransfer,
    navigationOptions: navHeaders.LandingHeaderNew
  },
  ValidatePassword: {
    screen: ValidatePassword,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
  ProductsListUpgradeEmoney: {
    screen: ProductsList,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle langKey={'UPGRADE__EMONEY'} />,
      tabBarVisible: false
    }
  },
  ChooseProductsItem: {
    screen: ChooseProductsItem,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle langKey={'PRODUCTS__SELECTIONS'} />,
      tabBarVisible: false
    }
  },
  ProductsTnC: {
    screen: ProductsTnC,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle langKey={'GENERIC__TERM_AND_CONDITION'} />,
      tabBarVisible: false
    }
  },
  CurrentSection: {
    screen: CurrentSection,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerNewBrand, headerTitle: <HeaderTitle langKey={'EFORM__NAVBAR'} />,
      tabBarVisible: false
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
      tabBarVisible: false
    },
  },
  DigitalEFormEmailVerification: {
    screen: DigitalEFormEmailVerification,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'EFORM__NAVBAR'} />,
      tabBarVisible: false
    }
  },
  DigitalEFormSuccessScreen: {
    screen: DigitalEFormSuccessScreen,
    navigationOptions: {
      ...noHeader,
      tabBarVisible: false
    }
  },
}, {
  cardStyle: {
    backgroundColor: 'white'
  }
});

export default SendRoutes;
