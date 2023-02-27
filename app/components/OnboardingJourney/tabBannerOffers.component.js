import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from '../Offers/Offers.styles';
import result from 'lodash/result';
import noop from 'lodash/noop';
import isEmpty from 'lodash/isEmpty';
import Offer from '../Offers/OfferBanner.component';
import {language} from '../../config/language';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import SwiperPage from '../Egift/CarouselSwiper.component';
import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';

class Offers extends React.Component {
  static propTypes = {
    offers: PropTypes.array.isRequired,
    onOfferClick: PropTypes.func,
    clickedOffer: PropTypes.object,
    closeHandler: PropTypes.func,
    isLogin: PropTypes.bool,
    onPromoClick: PropTypes.func,
    qrPromo: PropTypes.array,
    goToOffer: PropTypes.func,
    openDrawer: PropTypes.func
  }
  static defaultProps = {
    offers: [],
    onOfferClick: noop
  }

  renderOffer = (offerDetails, i) => <Offer {...offerDetails} type='offer' key={i} onPress={this.props.onOfferClick(offerDetails)}/>

  render () {
    const offers = result(this.props, 'offers', []);
    const {clickedOffer = {}, closeHandler = noop, isLogin, goToOffer, openDrawer} = this.props;
    const isOfferClicked = !isEmpty(clickedOffer);
    const bannerList = filter(offers, {flag: 1});
    const sortBanner = orderBy(bannerList, 'order', ['asc']);
    return (
      <View style={styles.bannerFlex}>
        {!isEmpty(offers) ?
          <View style={styles.bannerFlex}>
            {!isLogin ? <View style={styles.header}>
              <Text style={styles.headerText}>{language.PROFILE__OPTION_OFFERS}</Text>
              <Touchable style={styles.crossButtonWrapper} onPress={closeHandler}>
                <SimasIcon name='close' style={styles.iconStyle} size={15}/>
              </Touchable>
            </View> : null}
            {isOfferClicked &&
            <View>
              {this.renderOffer(clickedOffer)}
              <View style={styles.separatorContainer}>
                <View style={styles.separator} />
                <Text style={styles.separatorText}>{language.OFFERS__OTHER_OFFERS}</Text>
                <View style={styles.separator} />
              </View>
            </View>}
            <SwiperPage loop={true}>
              {sortBanner.map((offerDetails, i) => (
                <View key={i} style={styles.pager}>
                  <Offer {...offerDetails} key={i} index={i} onPress={this.props.onOfferClick(offerDetails)} type='offer' goToOffer={goToOffer} openDrawer={openDrawer}/>
                </View>
              ))}
            </SwiperPage>
          </View>
          :
          <Offer type='noOffer' goToOffer={goToOffer}/>
        }
      </View>
    );
  }
}

export default Offers;
