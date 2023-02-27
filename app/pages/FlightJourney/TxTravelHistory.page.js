import React from 'react';
import PropTypes from 'prop-types';
import TxTravelHistory from '../../components/FlightJourney/TxTravelHistory.component';
import {connect} from 'react-redux';


const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => dispatch(action),
});

class TxTravelHistoryPage extends React.Component {
  static propTypes = {
    onOfferClick: PropTypes.func,
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
  }

  render () {
    const {navigation = {}, dispatch} = this.props;
    return <TxTravelHistory navigation={navigation} dispatch={dispatch}/>;
  }
}


export default connect(mapDispatchToProps)(TxTravelHistoryPage);
