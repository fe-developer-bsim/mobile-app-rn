import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View, Text} from 'react-native';
import offersStyles from '../Offers/Offers.styles';
import noop from 'lodash/noop';
import TabOffers from '../QRPromo/tabOffers.component';
import {result, filter, isEmpty, size, orderBy} from 'lodash';
import Touchable from '../../components/Touchable.component';

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
    listCategoryOffers: PropTypes.array,
    toogleMenuKoperasi: PropTypes.array,
    goToTncAlfacart: PropTypes.func,
    goToTncSimasCatalog: PropTypes.func,
    goToAlfacart: PropTypes.func,
    goToMerchantStore: PropTypes.func,
    goToTncUnipin: PropTypes.func,
  }

  state = {
    categoryOffers: 'Lifestyle'
  }

  setActiveCat = (categoryType) => () => {
    this.setState({categoryOffers: categoryType});
  }

  renderCategory = (cat) => {
    const {categoryOffers} = this.state;
    const categoryType = result(cat, 'categoryName', '');
    const activeCategory = categoryType === categoryOffers;
    const categoryText = categoryType === 'All' ? 'All Deals' : categoryType;
    return (
      <View style={ activeCategory ? offersStyles.categoryActive : offersStyles.categoryInActive}>
        <Touchable onPress={this.setActiveCat(categoryType)}>
          <Text style={activeCategory ? offersStyles.activeText : offersStyles.inActiveText}>{categoryText}</Text>
        </Touchable>
      </View>
    );
  }

  render () {
    const {clickedOffer = {}, closeHandler = noop, onOfferClick = noop, offers = [], listCategoryOffers, toogleMenuKoperasi = [],
      goToTncAlfacart = noop, goToTncSimasCatalog = noop, goToAlfacart = noop, goToMerchantStore = noop, goToTncUnipin = noop} = this.props;
    const {categoryOffers} = this.state;
    const emptyCat = isEmpty(listCategoryOffers);
    let selectedCategory = [];
    if (categoryOffers === 'All') {
      selectedCategory = [...offers, ...toogleMenuKoperasi];
    } else if (categoryOffers === 'Lifestyle') {
      selectedCategory = toogleMenuKoperasi;
    } else {
      selectedCategory = filter(offers, {category: categoryOffers});
    }
    const checkToogleMenuAlfa = size(filter(toogleMenuKoperasi, function (val) {
      const offersTitle = result(val, 'offersTitle', '');
      return offersTitle === 'AlfaCartOffer';
    })) > 0 ? 'yes' : 'no';

    const checkToogleMenuUV = size(filter(toogleMenuKoperasi, function (val) {
      const offersTitle = result(val, 'offersTitle', '');
      return offersTitle === 'UVOffer';
    })) > 0 ? 'yes' : 'no';

    const checkToogleMenuKoperasi = size(filter(toogleMenuKoperasi, function (val) {
      const offersTitle = result(val, 'offersTitle', '');
      return offersTitle === 'KoperasiOffer';
    })) > 0 ? 'yes' : 'no';

    const checkToggleMenuUnipin = size(filter(toogleMenuKoperasi, function (val) {
      const offersTitle = result(val, 'offersTitle', '');
      return offersTitle === 'UnipinOffer';
    })) > 0 ? 'yes' : 'no';

    const checkToogleMenuCMI = size(filter(toogleMenuKoperasi, function (val) {
      const offersTitle = result(val, 'offersTitle', '');
      return offersTitle === 'CMIOffer';
    })) > 0 ? 'yes' : 'no';

    const lifeStyleOffers = filter(selectedCategory, {category: 'Lifestyle'});
    const sortLifestyleOffers = orderBy(lifeStyleOffers, 'order', ['asc']);
    const bannerList = categoryOffers === 'Lifestyle' ? sortLifestyleOffers : categoryOffers === 'All' ?  [...offers, ...sortLifestyleOffers] : [...selectedCategory];
    
    return (
      <View>
        {
          emptyCat ? 
            null
            :
            <ScrollView horizontal={true} style={offersStyles.categoryTabContainer}>                    
              {listCategoryOffers.map(this.renderCategory)}
            </ScrollView>             
        }
        <ScrollView style={offersStyles.container} contentContainerStyle={offersStyles.scrollContainer}>
          <View style={offersStyles.OffersContainer}>
            <TabOffers offers={bannerList} clickedOffer={clickedOffer}
              closeHandler={closeHandler} onOfferClick={onOfferClick} isLogin={true}
              goToTncAlfacart={goToTncAlfacart} goToTncSimasCatalog={goToTncSimasCatalog} categoryOffers={categoryOffers}
              goToAlfacart={goToAlfacart} checkToogleMenuAlfa={checkToogleMenuAlfa} checkToogleMenuUV={checkToogleMenuUV}
              checkToogleMenuKoperasi={checkToogleMenuKoperasi} checkToogleMenuCMI={checkToogleMenuCMI} checkToggleMenuUnipin={checkToggleMenuUnipin}
              goToMerchantStore={goToMerchantStore} goToTncUnipin={goToTncUnipin}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Offers;
