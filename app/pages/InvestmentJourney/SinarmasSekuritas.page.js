import React from 'react';
import PropTypes from 'prop-types';
import SinarmasSekuritas from '../../components/InvestmentJourney/SinarmasSekuritas.component';
import {investmentDataView, checkCutOffTimeReksadana} from '../../state/thunks/dashboard.thunks';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {destroy} from 'redux-form';

const mapStateToProps = (state) => ({
  currentLanguage: result(state, 'currentLanguage.id', 'id'),
  productList: result(state, 'saveReksadanaTransaction', []),
  lastTransaction: result(state, 'reksadanaLastTransaction', []),
  appConfig: result(state, 'config', {}),
  reksadanaSummaryDetailLastTrans: result(state, 'reksadanaLastTransaction', []),
});


const mapDispatchToProps = (dispatch) => ({
  investmentDataView: (code) => () => dispatch(investmentDataView(code)),
  goToBuyReksadana: (item, isCutOffTimeDay, toogle, dataNavQuery) => {

    dispatch(checkCutOffTimeReksadana(item, isCutOffTimeDay, toogle, dataNavQuery));
    dispatch(destroy('buyReksadana'));
  },
  goToSellReksadana: (item, toogle, dataNavQuery) => {
    dispatch(checkCutOffTimeReksadana(item, 'goToSell', toogle, dataNavQuery)); 
    dispatch(destroy('sellReksadana'));
  }
});

class SinarmasSekuritasform extends React.Component {
  static propTypes = {
    investmentDataView: PropTypes.func,
    goToBuyReksadana: PropTypes.func,
    goBuyReksadana: PropTypes.func,
    goToSellReksadana: PropTypes.func,
    goSellReksadana: PropTypes.func,
    productList: PropTypes.array,
    lastTransaction: PropTypes.array,
    gapTimeServer: PropTypes.number,
    navigation: PropTypes.object,
    appConfig: PropTypes.object,
    reksadanaSummaryDetailLastTrans: PropTypes.object,
  }
  
  goBuyReksadana = (item) => () => {
    const {goToBuyReksadana, navigation, appConfig} = this.props;
    const goToNextRoute = 'goToBuy';
    const toogle = result(appConfig, 'toogleMedallion');
    const dataNavQuery = result(navigation, 'state.params.toogleQuery');
 

    goToBuyReksadana(item, goToNextRoute, toogle, dataNavQuery);
  }

  goSellReksadana = (item) => () => {
    const {goToSellReksadana, navigation, appConfig} = this.props;
    const toogle = result(appConfig, 'toogleMedallion');
    const dataNavQuery = result(navigation, 'state.params.toogleQuery');



    goToSellReksadana(item, toogle, dataNavQuery);
  }

  render () {
    const {investmentDataView, productList, gapTimeServer, reksadanaSummaryDetailLastTrans} = this.props;

    return (
      <SinarmasSekuritas investmentDataView={investmentDataView} productList={productList} 
        goBuyReksadana={this.goBuyReksadana} goSellReksadana={this.goSellReksadana} gapTime={gapTimeServer} reksadanaSummaryDetailLastTrans={reksadanaSummaryDetailLastTrans}/>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SinarmasSekuritasform);
