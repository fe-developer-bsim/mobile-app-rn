import * as navHeaders from './navHeaders.config';
import {StackNavigator} from 'react-navigation';
import HeaderTitle from '../components/NavHeader/HeaderTitle.component';
import React from 'react';

import AddPayeeAccount from '../pages/FundTransferJourney/AddPayeeAccount.page';
import AddPayeeBank from '../pages/FundTransferJourney/AddPayeeBank.page';
import AddPayee from '../pages/FundTransferJourney/AddPayee.page';
import FundTransferPayment from '../pages/FundTransferJourney/FundTransferPayment.page';
import SendSourceAcc from '../pages/FundTransferJourney/SendSourceAcc.page';
import FundTransferConfirmation from '../pages/FundTransferJourney/FundTransferConfirmation.page';
import FundTransferMethodScreen from '../pages/FundTransferJourney/FundTransferMethod.page';
import FundTransferScheduleScreen from '../pages/FundTransferJourney/FundTransferSchedule.page';

const splitBillRoutes = StackNavigator({
  
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
}, {
  cardStyle: {
    backgroundColor: 'white'// to change the backgroundColor color of the whole application
  },
});


export default splitBillRoutes;