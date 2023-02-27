import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import EmallTx from '../../components/Emall/EmallTx.component';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {getFlightResult, getConfirmInfo} from '../../state/thunks/flight.thunks';
import {toLandingEmall} from '../../state/thunks/onboarding.thunks';

const mapStateToProps = (state) => ({
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'), 
  simasPoin: result(state, 'simasPoin', {}),
  profile: result(state, 'user.profile', {}),
  departureData: result(state, 'flightDataDetail1', {}),
  returnData: result(state, 'flightDataDetail2', {}),
  originCity: result(state, 'form.FlightIndexForm.values.originCity', ''),
  destinationCity: result(state, 'form.FlightIndexForm.values.destinationCity', ''),
  fareDepart: result(state, 'flightFareDetail1', {}),
  fareReturn: result(state, 'flightFareDetail2', {}),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (defaultAmount, params) => dispatch(triggerAuthNavigate('FlightPayment', defaultAmount, true, 'AuthDashboard', params)),
  getResult: (flightData, accData, reservData, isUseSimas, segmentsReturn) => dispatch(getFlightResult(flightData, accData, reservData, isUseSimas, segmentsReturn)),
  getConfirmInfo: (flightData, accData, reservData, segmentsReturn) => dispatch(getConfirmInfo(flightData, accData, reservData, segmentsReturn)),
  goLanding: () => dispatch(toLandingEmall()),
});

class EmallTxPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    profile: PropTypes.object,
    simasPoin: PropTypes.object,
    getConfirmSimas: PropTypes.func,
    triggerAuth: PropTypes.func,
    goTrigger: PropTypes.func,
    getResult: PropTypes.func,
    getConfirmInfo: PropTypes.func,
    goLanding: PropTypes.func,
    departureData: PropTypes.object,
    returnData: PropTypes.object,
    originCity: PropTypes.string,
    destinationCity: PropTypes.string,
    fareDepart: PropTypes.object,
    fareReturn: PropTypes.object,
  };

  render () {
    const {navigation, accounts, simasPoin, profile, getConfirmSimas, getConfirmInfo, triggerAuth, getResult, goLanding, departureData, returnData, originCity, destinationCity, fareDepart, fareReturn} = this.props;
    const airportOrigin = originCity.substring(0, originCity.indexOf('/'));
    const airportDestination = destinationCity.substring(0, destinationCity.indexOf('/'));
    const cityOrigin = originCity.substring(originCity.indexOf('/') + 1, originCity.indexOf('['));
    const cityDestination = destinationCity.substring(destinationCity.indexOf('/') + 1, destinationCity.indexOf('['));
    return <EmallTx navigation={navigation} accounts={accounts} triggerAuth={triggerAuth}
      simasPoin={simasPoin} getResult={getResult} getConfirmSimas={getConfirmSimas} getConfirmInfo={getConfirmInfo}
      goLanding={goLanding} departureData={departureData} returnData={returnData} 
      airportOrigin={airportOrigin} airportDestination={airportDestination} 
      cityOrigin={cityOrigin} cityDestination={cityDestination} fareDepart={fareDepart} fareReturn={fareReturn}
      profile={profile} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmallTxPage);

