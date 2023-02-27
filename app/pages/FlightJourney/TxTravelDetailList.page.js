import React from 'react';
import PropTypes from 'prop-types';
import TxTravelDetailList from '../../components/FlightJourney/TxTravelDetailList.component';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {txTravelDetail, fareDetail, txTravelDetailList} from '../../state/thunks/flight.thunks';
import {result} from 'lodash';
import {changeDataTravel} from '../../utils/transformer.util';
import * as actionCreators from '../../state/actions/index.actions.js';

const txTravelContactDetail = {
  form: 'txTravelList',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => {
    dispatch(fareDetail());
  },
};

const DecoratedTxTravelDetailList = reduxForm(txTravelContactDetail)(TxTravelDetailList);

const mapStateToProps = (state) => ({
  states: state,
});

const mapDispatchToProps = (dispatch) => ({
  txTravelDetail: (index, type, international) => {
    dispatch(actionCreators.showSpinner());
    dispatch(txTravelDetailList(false));
    dispatch(txTravelDetail(index, type, international));
  },
  showSpin: () => {
    dispatch(actionCreators.showSpinner());
  }

});

class OffersDetailPage extends React.Component {
  static propTypes = {
    onOfferClick: PropTypes.func,
    navigation: PropTypes.object,
    txTravelDetail: PropTypes.func,
    states: PropTypes.object,
    showSpin: PropTypes.func,
  }

  render () {
    const {navigation = {}, txTravelDetail, states, showSpin} = this.props;
    const dataBook = changeDataTravel(result(states, 'userPassenger', {}));
    const isInternational = result(states, 'flightSchedule.0.IsInternational', '');
    return <DecoratedTxTravelDetailList navigation={navigation} txTravelDetail={txTravelDetail} states={states} dataBook={dataBook}
      isInternational={isInternational}
      showSpin={showSpin}
    />;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(OffersDetailPage);
