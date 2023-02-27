import * as navHeaders from './navHeaders.config';
import {StackNavigator} from 'react-navigation';
import React from 'react';
import HeaderTitle from '../components/NavHeader/HeaderTitle.component';

import FlightIndex from '../pages/FlightJourney/FlightIndex.page';
import FlightAvailability1 from '../pages/FlightJourney/FlightAvailability1.page';
import FlightAvailability2 from '../pages/FlightJourney/FlightAvailability2.page';
import FlightAirportList from '../pages/FlightJourney/FlightAirportList.page';
import FlightDetail from '../pages/FlightJourney/FlightDetail.page';
import FlightSummary from '../pages/FlightJourney/FlightConclusion.page';

import TxTravelContact from '../pages/FlightJourney/TxTravelContact.page';
import TxTravelDetail from '../pages/FlightJourney/TxTravelDetail.page';
import TxTravelDetailList from '../pages/FlightJourney/TxTravelDetailList.page';
import TxTravelSeat from '../pages/FlightJourney/TxTravelSeat.page';
import TxTravelHistory from '../pages/FlightJourney/TxTravelHistory.page';
import TxTravelListCountryIso from '../pages/FlightJourney/TxTravelListCountryIso.page';

const FlightRoutes = StackNavigator({
  FlightMain: {
    screen: FlightIndex,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'FLIGHT__TITLE'} />,
      tabBarVisible: false
    }
  },
  FlightSchedule1: {
    screen: FlightAvailability1,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'FLIGHT__TITLE'} />,
      tabBarVisible: false
    }
  },
  FlightSchedule2: {
    screen: FlightAvailability2,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'FLIGHT__TITLE'} />,
      tabBarVisible: false
    }
  },
  FlightAirportList: {
    screen: FlightAirportList,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'FLIGHT__TITLE'} />,
      tabBarVisible: false
    }
  },
  FlightDetail: {
    screen: FlightDetail,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'FLIGHT__TITLE'} />,
      tabBarVisible: false
    }
  },
  FlightSummary: {
    screen: FlightSummary,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'FLIGHT__TITLE'} />,
      tabBarVisible: false
    }
  },
  TxTravelDetail: {
    screen: TxTravelDetail,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TX_TRAVEL_CONTACT_DETAIL' />,
      tabBarVisible: false
    }
  },
  TxTravelDetailList: {
    screen: TxTravelDetailList,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TX_TRAVEL_CONTACT_DETAIL' />,
      tabBarVisible: false
    }
  },
  TxTravelSeat: {
    screen: TxTravelSeat,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TX_TRAVEL_CONTACT_DETAIL' />,
      tabBarVisible: false
    }
  },
  TxTravelHistory: {
    screen: TxTravelHistory,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TX_TRAVEL_POLICIES' />,
      tabBarVisible: false
    }
  },
  TxTravelListCountryIso: {
    screen: TxTravelListCountryIso,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TX_TRAVEL_POLICIES' />,
      tabBarVisible: false
    }
  },
  TxTravelContact: {
    screen: TxTravelContact,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack='TX_TRAVEL_CONTACT_DETAIL' />,
    },
  },
}, {
  cardStyle: {
    backgroundColor: 'white'// to change the backgroundColor color of the whole application
  },
  headerMode: 'none'
});


export default FlightRoutes;
