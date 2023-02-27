import React from 'react';
import PropTypes from 'prop-types';
import TxTravelSeat from '../../components/FlightJourney/TxTravelSeat.component';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {txTravelSeat, txTravelPolicies} from '../../state/thunks/common.thunks';
import * as actionCreators from '../../state/actions/index.actions';

const txTravelDetailSeat = {
  form: 'TxTravelInsurance',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => dispatch(txTravelSeat()),
  initialValues: {
    insurance: true
  },
};

const mapDispatchToProps = (dispatch) => ({
  toPolicies: () => {
    dispatch(txTravelPolicies());
  },
  showAlert: () => {
    const sinarmasModalOptions = {
      heading1: 'Heading',
      text: 'Text',
      button1: 'OK',
      button2: 'Cancle',
      closeOnTouchOutside: false
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  },
});

class TxTravelSeatPage extends React.Component {
  static propTypes = {
    onOfferClick: PropTypes.func,
    navigation: PropTypes.object,
    toPolicies: PropTypes.func,
    showAlert: PropTypes.func,
  }

  render () {
    const {navigation = {}, toPolicies, showAlert} = this.props;
    return <DecoratedTxTravelSeat navigation={navigation} toPolicies={toPolicies} showAlert={showAlert}/>;
  }
}

const DecoratedTxTravelSeat = reduxForm(txTravelDetailSeat)(TxTravelSeat);


export default connect(null, mapDispatchToProps)(TxTravelSeatPage);
