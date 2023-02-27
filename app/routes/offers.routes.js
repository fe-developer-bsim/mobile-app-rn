import * as navHeaders from './navHeaders.config';
import {StackNavigator} from 'react-navigation';

import OfferScreen from '../pages/Profile/Offers.page';
import OfferDetailScreen from '../pages/Profile/OfferDetail.page';
import HeaderTitle from '../components/NavHeader/HeaderTitle.component';
import QRPromoDetailScreen from '../pages/QRPromo/QRPromoDetail.page';
import QRMerchantLocationScreen from '../pages/QRPromo/merchantLocation.page';
import React from 'react';

const OffersRoutes = StackNavigator({
  Offers: {
    screen: OfferScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite,
      headerTitle: (<HeaderTitle titleBlack={'OPEN_NEW_ACCOUNT__TITLE'} />),
      tabBarVisible: false
    }
  },
  OfferDetail: {
    screen: OfferDetailScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'OFFERS__OFFER_DETAIL'} />,
      tabBarVisible: false
    }
  },
  QRPromoDetail: {
    screen: QRPromoDetailScreen,
    navigationOptions: {
      ...navHeaders.qrPromoHeader,
      tabBarVisible: false
    }
  },
  QRMerchantLocation: {
    screen: QRMerchantLocationScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'QR_PROMO__MERCHANT_LOCATION'} />,
      tabBarVisible: false
    }
  },
}, {
  cardStyle: {
    backgroundColor: 'white'
  }
});


export default OffersRoutes;
