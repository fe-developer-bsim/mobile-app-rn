import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import styles from '../Offers/Offers.styles';
import result from 'lodash/result';
import noop from 'lodash/noop';
import isEmpty from 'lodash/isEmpty';
import Offer from '../Offers/Offer.component';
import {language} from '../../config/language';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import lowerCase from 'lodash/lowerCase';

class Offers extends React.Component {
  static propTypes = {
    offers: PropTypes.array.isRequired,
    onOfferClick: PropTypes.func,
    clickedOffer: PropTypes.object,
    closeHandler: PropTypes.func,
    isLogin: PropTypes.bool,
    onPromoClick: PropTypes.func,
    qrPromo: PropTypes.array,
    goToTncAlfacart: PropTypes.func,
    goToTncSimasCatalog: PropTypes.func,
    goToAlfacart: PropTypes.func,
    checkToogleMenuKoperasi: PropTypes.string,
    checkToogleMenuUV: PropTypes.string,
    checkToogleMenuAlfa: PropTypes.string,
  }
  static defaultProps = {
    offers: [],
    onOfferClick: noop
  }

  renderOffer = (offerDetails, i) => {
    const {goToTncAlfacart = noop, goToTncSimasCatalog = noop, goToAlfacart = noop, checkToogleMenuKoperasi, checkToogleMenuUV, checkToogleMenuAlfa} = this.props;
    const categoryName = result(offerDetails, 'category', '');
    const categoryLifeStyle = categoryName === 'Lifestyle';
    const nameLifestyle = result(offerDetails, 'offersTitle', '');
    const titleLifestyle = nameLifestyle === 'UVOffer' ? language.ULTRA_VOUCHER__TITLE : nameLifestyle === 'AlfaCartOffer' ? language.ALFACART_LANDING : nameLifestyle === 'KoperasiOffer' ? language.GALERI__SINARMAS_HEADER : null;
    const subTitleLifestyle = nameLifestyle === 'UVOffer' ? language.ULTRA_VOUCHER__SUBTITLE : nameLifestyle === 'AlfaCartOffer' ? language.ALFACART__SUBTITLE_TEXT : nameLifestyle === 'KoperasiOffer' ? language.DIGISTORE__SUBTITLE_BANNER : null;
    const TouchableLifestyle = nameLifestyle === 'UVOffer' ? goToTncSimasCatalog : nameLifestyle === 'AlfaCartOffer' ?  goToTncAlfacart : nameLifestyle === 'KoperasiOffer' ? goToAlfacart : noop;
    const toucahbleOffers = categoryLifeStyle ? TouchableLifestyle : this.props.onOfferClick(offerDetails);
    const toogleTouchableLifestyle = !!(nameLifestyle === 'UVOffer' &&  lowerCase(checkToogleMenuUV) === 'yes' || nameLifestyle === 'AlfaCartOffer' &&  lowerCase(checkToogleMenuAlfa) === 'yes' || nameLifestyle === 'KoperasiOffer' &&  lowerCase(checkToogleMenuKoperasi) === 'yes');
    return (
      <Offer {...offerDetails} type='offer' key={i} onPress={toucahbleOffers} titleLifestyle={titleLifestyle} 
        subTitleLifestyle={subTitleLifestyle} categoryLifeStyle={categoryLifeStyle} toogleTouchableLifestyle={toogleTouchableLifestyle}/>
    );
  }

  renderPromo = (promoDetails, i) => <Offer {...promoDetails} type='promo' key={i} onPress={this.props.onPromoClick(promoDetails)}/>

  render () {
    const offers = result(this.props, 'offers', []);
    const {clickedOffer = {}, closeHandler = noop, isLogin, qrPromo = []} = this.props;
    const isOfferClicked = !isEmpty(clickedOffer);
    return (
      <View>
        { isEmpty(offers) ?
          <View style={styles.noOffers}>
            <Text>No Offers for this Category</Text>
          </View>
          :
          <ScrollView>
        
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
            {offers.map(this.renderOffer)}
            {qrPromo.map(this.renderPromo)}
          </ScrollView>
        }
      </View>
    );
  }
}

export default Offers;
