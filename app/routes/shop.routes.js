import * as navHeaders from './navHeaders.config';
import {StackNavigator} from 'react-navigation';

import ShopScreen from '../pages/Profile/Shop.page';
import HeaderTitle from '../components/NavHeader/HeaderTitle.component';
import DetailOrders from '../pages/Egift/OrderDetail.page';
import CartScreen from '../pages/Egift/Cart.page';
import ProductDetailScreen from '../pages/Egift/ProductDetail.page';
import React from 'react';

// alfacart
import CartAlfacart from '../pages/Egift/CartAlfacart.page';


const OffersRoutes = StackNavigator({
  Shops: {
    screen: ShopScreen,
    navigationOptions: navHeaders.offersShopHeader
  },
  ShopProductDetail: {
    screen: ProductDetailScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'EGIFT__REDEEM_SIMAS_POIN'} />,
      tabBarVisible: false
    }
  },
  EgiftCart: {
    screen: CartScreen,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'EGIFT__CART_HEADER'} />,
      tabBarVisible: false
    }
  },
  CartAlfacart: {
    screen: CartAlfacart,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'EGIFT__CART_HEADER'} />,
      tabBarVisible: false
    }
  },
  DetailOrder: {
    screen: DetailOrders,
    navigationOptions: {
      ...navHeaders.navigationOptions.headerWhite, headerTitle: <HeaderTitle titleBlack={'PROFILE__SIMAS_POIN_ORDER_DETAIL'} />,
      tabBarVisible: false
    },
  },
}, {
  cardStyle: {
    backgroundColor: 'white'
  }
});


export default OffersRoutes;
