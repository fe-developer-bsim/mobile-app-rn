import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SearcheableListQR from '../../components/SearcheableList/SearcheableListQR.component';
import {getMerchantListByCity} from '../../state/thunks/common.thunks';
import result from 'lodash/result';
import noop from 'lodash/noop';
import {NavigationActions} from 'react-navigation';
import {language} from '../../config/language';
import {change} from 'redux-form';
import {cityList} from '../../config/qrMerchantList.config';

class MerchantListScreen extends Component {
  static propTypes = {
    goToTabAll: PropTypes.func,
    checkedCity: PropTypes.object,
  }
  
  render () {
    const {goToTabAll, checkedCity, ...extraProps} = this.props;
    return <SearcheableListQR
      searchlist={cityList}
      labelSearch = {language.QR_DISCOUNT__SEARCH_HINTTEXT}
      placeholderSearch = {language.QR_DISCOUNT__SEARCH}
      textKey = 'name'
      onItemClick = {goToTabAll}
      onChangeText = {noop}
      checkedCity = {checkedCity}
      {...extraProps}/>;
  }
}

const mapStateToProps = (state) => ({
  checkedCity: result(state, 'form.merchantDeals.values.city', {})
});

const mapDispatchToProps = (dispatch) => ({
  goToTabAll: (city) => {
    const data = {page: 1, cityCode: result(city, 'code', '')};
    dispatch(change('merchantDeals', 'city', city));
    dispatch(getMerchantListByCity(data));
    dispatch(NavigationActions.back());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MerchantListScreen);
