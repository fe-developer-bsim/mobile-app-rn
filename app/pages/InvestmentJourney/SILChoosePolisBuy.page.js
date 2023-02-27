import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SmartInvestaLinkPolisBuyComponent from '../../components/InvestmentJourney/SILChoosePolisBuy.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {saveSilIdrUsd} from '../../state/actions/index.actions.js';
import {destroySILForm, getUserDetailForNBPolis} from '../../state/thunks/dashboard.thunks';

const mapStateToProps = (state) => ({
  nav: result(state, 'nav', {}),
  config: result(state, 'config', {}),
  currentLanguage: result(state, 'currentLanguage.id', 'id'),
  listProduct: result(state, 'getProductListSil', {}),
});

const mapDispatchToProps = (dispatch) => ({
  goToNextPageBuyUSD: () => {
    dispatch(saveSilIdrUsd('USD'));
    dispatch(destroySILForm());
    dispatch(getUserDetailForNBPolis());
  },
  goToNextPageBuyIDR: () => {
    dispatch(saveSilIdrUsd('IDR'));
    dispatch(destroySILForm());
    dispatch(getUserDetailForNBPolis());
  },
});

class SmartInvestaLinkPolisBuyPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    goToNextPageBuyUSD: PropTypes.func,
    goToNextPageBuyIDR: PropTypes.func,
    listProduct: PropTypes.array,
  }
  
  onGoNextUSD = () => {
    this.props.goToNextPageBuyUSD();
  }
  
  onGoNextIDR = () => {
    this.props.goToNextPageBuyIDR();
  }

  render () {
    const {navigation = {}, listProduct} = this.props;
    const items = result(navigation, 'state.params.data.code');
    let acctPrList = result(navigation, 'state.params.infoProduct.actPrList', []);
    return <SmartInvestaLinkPolisBuyComponent 
      items={items}
      onGoNextUSD={this.onGoNextUSD}
      onGoNextIDR={this.onGoNextIDR}
      listProduct={listProduct}
      acctPrList={acctPrList}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartInvestaLinkPolisBuyPage);
