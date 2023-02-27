import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FlightSummary from '../../components/FlightJourney/FlightConclusion.component';
import result from 'lodash/result';
import moment from 'moment';
import {txTravelDetailList} from '../../state/thunks/flight.thunks';
import {getDayName} from '../../utils/transformer.util';

const mapStateToProps = (state) => ({
  departDate: moment(result(state, 'form.FlightIndexForm.values.departDate', '')).format('DD MMM YYYY'),
  arrivalDate: moment(result(state, 'form.FlightIndexForm.values.arrivalDate', '')).format('DD MMM YYYY'),
  passenger: result(state, 'userPassenger', {}),
  flightSchedule: result(state, 'flightSchedule', {}),
  flightDataDetail1: result(state, 'flightDataDetail1', {}),
  flightDataDetail2: result(state, 'flightDataDetail2', {}),
  originCity: result(state, 'form.FlightIndexForm.values.originCity', ''),
  destinationCity: result(state, 'form.FlightIndexForm.values.destinationCity', ''),
});

const mapDispatchToProps = (dispatch) => ({
  txTravelContactDetailForm: () => dispatch(txTravelDetailList(true, true))
});

class FlightSummaryPage extends Component {
  state = {
    visible: false,
  }
  static propTypes = {
    navigation: PropTypes.object,
    departDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onItemPress: PropTypes.func,
    arrivalDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    category: PropTypes.string,
    navParams: PropTypes.array,
    passenger: PropTypes.object,
    data: PropTypes.array,
    flightSchedule: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    flightDataDetail1: PropTypes.object,
    flightDataDetail2: PropTypes.object,
    originCity: PropTypes.string,
    destinationCity: PropTypes.string,
    txTravelContactDetailForm: PropTypes.func,
    flag: PropTypes.string
  }

  render () {
    const {departDate, arrivalDate, flightDataDetail1, flightDataDetail2,
      passenger, flightSchedule, originCity, destinationCity, navigation, txTravelContactDetailForm} = this.props;

    const navParams = result(navigation, 'state.params', {});
    const fareDetail1 = result(navParams, 'data1', {});

    const total = result(passenger, 'Total');

    const codeOrigin = originCity.substring(originCity.indexOf('[') + 1, originCity.indexOf(']'));
    const codeDestination = destinationCity.substring(destinationCity.indexOf('[') + 1, destinationCity.indexOf(']'));

    const airportOrigin = originCity.substring(0, originCity.indexOf('/'));
    const airportDestination = destinationCity.substring(0, destinationCity.indexOf('/'));

    const cityOrigin = originCity.substring(originCity.indexOf('/') + 1, originCity.indexOf('['));
    const cityDestination = destinationCity.substring(destinationCity.indexOf('/') + 1, destinationCity.indexOf('['));

    const flag = result(passenger, 'flag', '');

    return (
      <FlightSummary
        data={flightSchedule}
        departDateDisplay={departDate}
        arrivalDateDisplay={arrivalDate}
        dayDepartdate={getDayName(departDate)}
        dayArrivaldate={getDayName(arrivalDate)}
        passenger={passenger}
        flightDataDetail1={flightDataDetail1}
        flightDataDetail2={flightDataDetail2}
        codeOrigin={codeOrigin}
        codeDestination={codeDestination}
        airportOrigin={airportOrigin}
        airportDestination={airportDestination}
        cityOrigin={cityOrigin}
        cityDestination={cityDestination}
        total={total}
        fareDetail1={fareDetail1}
        flag={flag}
        txTravelContactDetailForm={txTravelContactDetailForm}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightSummaryPage);
