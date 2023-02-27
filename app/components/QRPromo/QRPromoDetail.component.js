import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, View} from 'react-native';
import {language} from '../../config/language';
import Image from 'react-native-image-progress';
import Bar from 'react-native-progress/Bar';
import {theme} from '../../styles/core.styles';
import styles from './QRPromoDetail.styles';
import TabDetail from './tabDetail.component.js';
import TabOutlets from './tabOutlets.component.js';
import TabCoupon from './tabCoupon.component.js';
import {wrapObjectInFunction} from '../../utils/transformer.util';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

const loadError = () => <Text>{language.ERROR_MESSAGE__IMAGE_LOAD}</Text>;

const tabBarConfig = {
  tabBarBackgroundColor: theme.white,
  tabBarActiveTextColor: theme.black,
  tabBarInactiveTextColor: theme.textGrey,
  tabBarUnderlineStyle: {
    backgroundColor: theme.brand
  },
  tabBarTextStyle: styles.tabText
};

class QRPromoDetail extends React.Component {
  static propTypes = {
    promo: PropTypes.object,
  }

  renderTabBar = wrapObjectInFunction(<ScrollableTabBar />)

  render () {
    const {promo = {}} = this.props;
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
        <View>
          <Image source={{uri: 'https://' + promo.imageName}} resizeMode={'stretch'} renderError={loadError} indicator={Bar} indicatorProps={{
            showsText: true,
            color: theme.brand,
            size: 50,
            thickness: 2
          }} style={styles.imageSize} />
        </View>
        <ScrollableTabView {...tabBarConfig} locked={true} renderTabBar={this.renderTabBar}>
          <TabDetail tabLabel='DETAILS' promo={promo}/>
          <TabOutlets tabLabel='OUTLET' promo={promo}/>
          {
            promo.permanentPercentageDiscount === 0 ?
              <TabCoupon tabLabel={language.QR_TAB_COUPON} promo={promo}/> : null
          }
        </ScrollableTabView>
      </ScrollView>
    );
  }
}

export default QRPromoDetail;
