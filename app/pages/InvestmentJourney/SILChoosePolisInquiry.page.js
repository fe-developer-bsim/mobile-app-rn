import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SmartInvestaLinkPolisComponent from '../../components/InvestmentJourney/SILChoosePolisInquiry.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {investmentDataViewSIL, getInfoProduct} from '../../state/thunks/dashboard.thunks';
import * as actionCreators from '../../state/actions/index.actions';


const mapStateToProps = (state) => ({
  inquiryData: result(state, 'inquirySIL', {}),
  nav: result(state, 'nav', {}),
  config: result(state, 'config', {}),
  currentLanguage: result(state, 'currentLanguage.id', 'id'),  
});
const mapDispatchToProps = (dispatch) => ({
  goToNextPageInquiry: (items) => {
    dispatch(actionCreators.clearSilIdrUsd());
    dispatch(investmentDataViewSIL(items));
  },
  goToNextPageBuy: () => {
    dispatch(getInfoProduct());
  },
});

class SmartInvestaLinkPolisPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    inquiryData: PropTypes.object,
    goToEmF: PropTypes.func,
    showAlert: PropTypes.func,
    config: PropTypes.object,
    goToTopUp: PropTypes.func,
    goToNextPageInquiry: PropTypes.func,
    goToNextPageBuy: PropTypes.func,

  }
  onGoNext = (items) => () => {
    this.props.goToNextPageInquiry(items);
  }
  
  onGoNextBuy = () => {
    this.props.goToNextPageBuy();
  }
  
  render () {
    const {navigation = {}, goToNextPageInquiry, goToNextPageBuy} = this.props;
    const items = result(navigation, 'state.params.data', {});
    return <SmartInvestaLinkPolisComponent 
      items={items} 
      goToNextPage={goToNextPageInquiry}
      goToNextPageBuy={goToNextPageBuy}
      onGoNext={this.onGoNext}
      onGoNextBuy={this.onGoNextBuy}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartInvestaLinkPolisPage);
