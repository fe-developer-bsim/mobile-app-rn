import React from 'react';
import PropTypes from 'prop-types';
import {Platform, View, ScrollView, PermissionsAndroid} from 'react-native';
import styles from './Offers.styles';
import result from 'lodash/result';
import noop from 'lodash/noop';
import {language} from '../../config/language';
import {ScrollableTabBar, ScrollableTabView} from '@valdio/react-native-scrollable-tabview';
import TabOffers from '../QRPromo/tabOffers.component';
import TabMerchant from '../QRPromo/tabMerchant.component';
import {theme} from '../../styles/core.styles';
import {wrapObjectInFunction} from '../../utils/transformer.util';

let LocationServices;

if (Platform.OS === 'android') {
  LocationServices = require('react-native-android-location-services-dialog-box').default;
}

const tabBarConfig = {
  tabBarBackgroundColor: theme.white,
  tabBarActiveTextColor: theme.black,
  tabBarInactiveTextColor: theme.textGrey,
  tabBarUnderlineStyle: {
    backgroundColor: theme.brand
  },
  tabBarTextStyle: styles.tabText
};

class Offers extends React.Component {
  static propTypes = {
    offers: PropTypes.array.isRequired,
    offerID: PropTypes.string,
    onOfferClick: PropTypes.func,
    clickedOffer: PropTypes.object,
    closeHandler: PropTypes.func,
    isLogin: PropTypes.bool,
    changeTab: PropTypes.func,
    qrPromo: PropTypes.array,
    onPromoClick: PropTypes.func,
    merchantList: PropTypes.array,
    goToMaps: PropTypes.func,
    getMerchantList: PropTypes.func,
  }
  static defaultProps = {
    offers: [],
    onOfferClick: noop
  }

  state = {
    tabsRef: {}
  }

  renderTabBar = wrapObjectInFunction(<ScrollableTabBar />)

  changeTab = (res) => {
    const {getMerchantList = noop} = this.props;
    if (Platform.OS === 'android') {
      res.i === 1 && PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((response) => {
        if (response === 'granted') {
          LocationServices.checkLocationServicesIsEnabled({
            message: language.QR_PROMO__ACCESS_LOCATION,
            ok: language.GENERIC__YES,
            cancel: language.GENERIC__NO,
            enableHighAccuracy: false,
            showDialog: true,
            openLocationServices: true
          }).then(() => {
            getMerchantList();
          }).catch(() => {
            this.state.tabsRef.goToPage(0);
          });
        } else {
          this.state.tabsRef.goToPage(0);
        }
      });
    } else {
      res.i === 1 && getMerchantList();
    }
  }

  componentWillMount () {
    this.setState({tabsRef: this.refs.Tabs});
  }

  render () {
    const offers = result(this.props, 'offers', []);
    const {clickedOffer = {}, closeHandler = noop, isLogin, qrPromo = [], onOfferClick = noop, onPromoClick = noop, merchantList = [], goToMaps = noop} = this.props;
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
        <ScrollableTabView {...tabBarConfig} locked={true} renderTabBar={this.renderTabBar} onChangeTab={this.changeTab} ref={'Tabs'}>
          <View style={styles.OffersContainer} tabLabel={language.QR_TAB_PROMO}>
            <TabOffers  offers={offers} clickedOffer={clickedOffer}
              closeHandler={closeHandler} isLogin={isLogin} qrPromo={qrPromo} onOfferClick={onOfferClick} onPromoClick={onPromoClick}/>
          </View>
          <TabMerchant tabLabel={language.QR_TAB_MERCHANT} merchantList={merchantList} goToMaps={goToMaps}/>
        </ScrollableTabView>
      </ScrollView>
    );
  }
}

export default Offers;
