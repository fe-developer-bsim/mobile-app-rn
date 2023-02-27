import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './MerchantDeals.styles';
import {language} from '../../config/language';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import TabNearby from './TabNearby.component';
import TabAll from './TabAll.component';
import {theme} from '../../styles/core.styles';
import {wrapObjectInFunction} from '../../utils/transformer.util';

const tabBarConfig = {
  tabBarBackgroundColor: theme.white,
  tabBarActiveTextColor: theme.black,
  tabBarInactiveTextColor: theme.textGrey,
  tabBarUnderlineStyle: {
    backgroundColor: theme.brand,
  },
  tabBarTextStyle: styles.tabText
};

class MerchantDeals extends React.Component {
  static propTypes = {
    discountMerchant: PropTypes.array,
    qrMerchantListByCity: PropTypes.array,
    getMerchantDiscount: PropTypes.func,
    getMerchantListByCity: PropTypes.func,
    getMerchantListByTitle: PropTypes.func,
    searchMerchantDiscountByCity: PropTypes.func,
    isLoadingQRListNearby: PropTypes.bool,
    isLoadingQRListAll: PropTypes.bool,
    onCityNamePress: PropTypes.func,
    goToDiscountMerchantDetail: PropTypes.func,
    navigation: PropTypes.object,
    city: PropTypes.object,
  }

  renderTabBar = wrapObjectInFunction(<ScrollableTabBar />)

  componentWillMount () {
    this.setState({tabsRef: this.refs.Tabs});
  }

  render () {
    const {discountMerchant, getMerchantDiscount, qrMerchantListByCity, getMerchantListByCity, getMerchantListByTitle, isLoadingQRListNearby, isLoadingQRListAll, onCityNamePress, goToDiscountMerchantDetail, navigation, city, searchMerchantDiscountByCity} = this.props;
    return (
      <View style={styles.container}>
        <ScrollableTabView {...tabBarConfig} locked={true} renderTabBar={this.renderTabBar} onChangeTab={this.changeTab} ref={'Tabs'}>
          <TabNearby tabLabel={language.QR_DISCOUNT__TAB_NEARBY} discountMerchant={discountMerchant} getMerchantDiscount={getMerchantDiscount} getMerchantListByTitle={getMerchantListByTitle} isLoadingQRListNearby={isLoadingQRListNearby} goToDiscountMerchantDetail={goToDiscountMerchantDetail}/>
          <TabAll tabLabel={language.QR_DISCOUNT__TAB_ALL} qrMerchantListByCity={qrMerchantListByCity}
            getMerchantListByCity={getMerchantListByCity} getMerchantListByTitle={getMerchantListByTitle} isLoadingQRListAll={isLoadingQRListAll}
            onCityNamePress={onCityNamePress} goToDiscountMerchantDetail={goToDiscountMerchantDetail} navigation={navigation} city={city} searchMerchantDiscountByCity={searchMerchantDiscountByCity}/>
        </ScrollableTabView>
      </View>
    );
  }
}

export default MerchantDeals;
