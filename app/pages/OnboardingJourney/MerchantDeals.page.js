import React from 'react';
import PropTypes from 'prop-types';
import MerchantDeals from '../../components/OnboardingJourney/MerchantDeals.component.js';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {getMerchantDiscount, getMerchantListByCity, getMerchantDiscountByTitle, goToDiscountMerchantDetail, searchMerchantDiscountByCity} from '../../state/thunks/common.thunks';
import {reduxForm} from 'redux-form';
import {NavigationActions} from 'react-navigation';

const formConfig = {
  form: 'merchantDeals',
  destroyOnUnmount: true,
  initialValues: {
    city: {},
  },
};

const DecoratedMerchantDeals = reduxForm(formConfig)(MerchantDeals);

const mapStateToProps = (state) => ({
  discountMerchant: result(state, 'qrDiscount', []),
  qrMerchantListByCity: result(state, 'qrMerchantListByCity', []),
  city: result(state, 'form.merchantDeals.values.city', {}),
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantDiscount: (merchantData) => dispatch(getMerchantDiscount(merchantData)),
  getMerchantListByCity: (merchantData) => {
    dispatch(getMerchantListByCity(merchantData));
  },
  getMerchantListByTitle: (merchantData) => {
    dispatch(getMerchantDiscountByTitle(merchantData));
  },
  searchMerchantDiscountByCity: (merchantData) => {
    dispatch(searchMerchantDiscountByCity(merchantData));
  },
  onCityNamePress: () => dispatch(NavigationActions.navigate({routeName: 'MerchantListScreen'})),
  goToDiscountMerchantDetail: (merchantData) => () => dispatch(goToDiscountMerchantDetail(merchantData)),
});

class MerchantDealsPage extends React.Component {
  componentDidMount () {
    this.props.getMerchantDiscount();
  }

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
    city: PropTypes.object,
    goToDiscountMerchantDetail: PropTypes.func,
    navigation: PropTypes.object,
  }

  render () {
    const {discountMerchant, getMerchantDiscount, qrMerchantListByCity, getMerchantListByCity, isLoadingQRListNearby, isLoadingQRListAll, getMerchantListByTitle, onCityNamePress, goToDiscountMerchantDetail, navigation, city, searchMerchantDiscountByCity} = this.props;
    return <DecoratedMerchantDeals discountMerchant={discountMerchant} getMerchantDiscount={getMerchantDiscount} city={city}
      qrMerchantListByCity={qrMerchantListByCity} getMerchantListByCity={getMerchantListByCity}
      isLoadingQRListNearby={isLoadingQRListNearby} isLoadingQRListAll={isLoadingQRListAll} getMerchantListByTitle={getMerchantListByTitle}
      onCityNamePress={onCityNamePress} goToDiscountMerchantDetail={goToDiscountMerchantDetail} navigation={navigation} searchMerchantDiscountByCity={searchMerchantDiscountByCity}/>;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MerchantDealsPage);