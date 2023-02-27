import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FlightSchedule from '../../components/FlightJourney/FlightAvailability1.component';
import result from 'lodash/result';
import moment from 'moment';
import {getFareDetail, changeDate, goNextPage, goSummaryFlight} from '../../state/thunks/flight.thunks';
import {getDayName} from '../../utils/transformer.util';
import forEach from 'lodash/forEach';
import filter from 'lodash/filter';
import {showSpinner, hideSpinner} from '../../state/actions/index.actions';
import {language} from '../../config/language';

const mapStateToProps = (state) => ({
  departDate: result(state, 'form.FlightIndexForm.values.departDate', ''),
  arrivalDate: result(state, 'form.FlightIndexForm.values.arrivalDate', ''),
  category: result(state, 'form.FlightIndexForm.values.category.label', ''),
  passenger: result(state, 'userPassenger', {}),
  flightSchedule: result(state, 'flightSchedule', []),
  originCity: result(state, 'form.FlightIndexForm.values.originCity', ''),
  destinationCity: result(state, 'form.FlightIndexForm.values.destinationCity', ''),
});

const mapDispatchToProps = (dispatch) => ({
  onItemPress: (value) => dispatch(getFareDetail(value)),
  changeDateFunc: (date, flag) => dispatch(changeDate(date, flag)),
  onNextPage: (value) => dispatch(goNextPage(value)),
  goToSummary: () => dispatch(goSummaryFlight),
  showSpinner: () => dispatch(showSpinner()),
  hideSpinner: () => dispatch(hideSpinner()),  
});

const sort = [
  {label: 'Lowest Price', value: 'LP'},
  {label: 'Shortest Duration', value: 'SD'},
  {label: 'Earliest Arrival', value: 'EA'},
  {label: 'Latest Arrival', value: 'LA'},
];

class FlightAvailabilityPage1 extends Component {
  state = {
    visible: false,
    visibleDatePicker: false,
  }
  static propTypes = {
    navigation: PropTypes.object, 
    departDate: PropTypes.oneOfType([PropTypes.date, PropTypes.func]),
    arrivalDate: PropTypes.oneOfType([PropTypes.date, PropTypes.func]),
    onItemPress: PropTypes.func,
    category: PropTypes.string,
    navParams: PropTypes.array,
    passenger: PropTypes.object,
    data: PropTypes.object,
    changeDateFunc: PropTypes.func,
    onNextPage: PropTypes.func,
    flag: PropTypes.string,
    flightSchedule: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    goToSummary: PropTypes.func,
    showSpinner: PropTypes.func,
    hideSpinner: PropTypes.func,
    originCity: PropTypes.string,
    destinationCity: PropTypes.string
  }
  
  render () {
    const {departDate, arrivalDate, onItemPress, category, changeDateFunc, passenger, flightSchedule,
      goToSummary, onNextPage, showSpinner, hideSpinner, originCity, destinationCity} = this.props;
    const flights = result(flightSchedule[0], 'Flights', []);
    forEach(flights, function (object) {
      const fullDepart = new Date(result(object, 'DepartDate', '').replace(/-/g, '/') + ' ' + result(object, 'DepartTime', ''));
      const fullArrive = new Date(result(object, 'ArriveDate', '').replace(/-/g, '/') + ' ' + result(object, 'ArriveTime', ''));
      const start = new moment(fullDepart);
      const end = new moment(fullArrive);
      const durationMinutes = moment.duration(end.diff(start)).asMinutes();
      const durationHours = moment.duration(end.diff(start)).hours();
      const durationDays = moment.duration(end.diff(start)).days();
      const durationRest = durationMinutes -  (durationHours * 60) - (durationDays * 24 * 60);
      const durationDisplay = durationDays !== 0 ? 
        durationDays + ' ' + language.FLIGHT__DAY + ' ' + durationHours + ' ' + language.FLIGHT__HOUR + 
      ' ' + durationRest + ' ' + language.FLIGHT__MINUTE : 
        durationHours + ' ' + language.FLIGHT__HOUR + ' ' + durationRest + ' ' + language.FLIGHT__MINUTE;
      const duration = moment.duration(end.diff(start)).asHours();
      object['fullDepart'] = fullDepart;
      object['fullArrive'] = fullArrive;
      object['durationMinutes'] = durationMinutes;
      object['durationHours'] = durationHours;
      object['durationDays'] = durationDays;
      object['durationDisplay'] = durationDisplay;
      object['duration'] = duration;
    });
    const filteredFlights = filter(flights, function (objectFlight) { 
      const classObjects = result(objectFlight, 'ClassObjects[0]', {});
      const connectingFlights = result(objectFlight, 'ConnectingFlights[0]', {});
      if (classObjects !== {}) {
        return (result(classObjects, 'Category', '') === category && result(classObjects, 'Seat', 0) > 0);
      } else if (connectingFlights !== {}) {
        return (result(connectingFlights, 'ClassObjects[0].Category', '') === category && result(connectingFlights, 'ClassObjects[0].Seat', 0) > 0);
      }
    });
    
    const cityOrigin = originCity.substring(originCity.indexOf('/') + 1, originCity.indexOf('['));
    const cityDestination = destinationCity.substring(destinationCity.indexOf('/') + 1, destinationCity.indexOf('['));
    
    return (
      <FlightSchedule 
        data={flightSchedule}
        flights={filteredFlights}
        departDate={departDate}
        arrivalDate={arrivalDate}
        onItemPress={onItemPress}
        category={category}
        visibleDatePicker={this.state.visibleDatePicker}
        sorting={sort}
        changeDateFunc={changeDateFunc}
        dayDepartdate={getDayName(departDate)}
        dayArrivaldate={getDayName(arrivalDate)}
        onNextPage={onNextPage}
        passenger={passenger}
        goToSummary={goToSummary}
        showSpinner={showSpinner}
        hideSpinner={hideSpinner}
        cityOrigin={cityOrigin}
        cityDestination={cityDestination}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightAvailabilityPage1);
