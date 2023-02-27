import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FlightSchedule from '../../components/FlightJourney/FlightAvailability2.component';
import result from 'lodash/result';
import moment from 'moment';
import {getFareDetail, changeDate, goSummaryFlight} from '../../state/thunks/flight.thunks';
import {getDayName} from '../../utils/transformer.util';
import forEach from 'lodash/forEach';
import {language} from '../../config/language';
import filter from 'lodash/filter';

const mapStateToProps = (state) => ({
  departDate: result(state, 'form.FlightIndexForm.values.departDate', ''),
  arrivalDate: result(state, 'form.FlightIndexForm.values.arrivalDate', new Date()),
  category: result(state, 'form.FlightIndexForm.values.category.label', ''),
  passenger: result(state, 'userPassenger', {}),
  flightSchedule: result(state, 'flightSchedule', []),
  originCity: result(state, 'form.FlightIndexForm.values.originCity', ''),
  destinationCity: result(state, 'form.FlightIndexForm.values.destinationCity', ''),
  flightDataDetail1: result(state, 'flightDataDetail1', {}),
});

const mapDispatchToProps = (dispatch) => ({
  onItemPress: (value) => dispatch(getFareDetail(value)), 
  changeDateFunc: (date, flag) => dispatch(changeDate(date, flag)),
  goToSummary: (value) => dispatch(goSummaryFlight(value)),  
});

const sort = [
  {label: 'Lowest Price', value: 'LP'},
  {label: 'Shortest Duration', value: 'SD'},
  {label: 'Earliest Arrival', value: 'EA'},
  {label: 'Latest Arrival', value: 'LA'},
];

class FlightAvailabilityPage2 extends Component {
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
    data: PropTypes.array,
    changeDateFunc: PropTypes.func,
    onNextPage: PropTypes.func,
    flag: PropTypes.string,
    flightSchedule: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    goToSummary: PropTypes.func,
    originCity: PropTypes.string,
    destinationCity: PropTypes.string,
    flightDataDetail1: PropTypes.object,
    flights: PropTypes.array
  }
  
  render () {
    const {departDate, arrivalDate, onItemPress, category, changeDateFunc, 
      passenger, flightSchedule, goToSummary, originCity, destinationCity, flightDataDetail1} = this.props;
    const rawFlights = result(flightSchedule[1], 'Flights', []);
    forEach(rawFlights, function (object) {
      const fullDepart = new Date(result(object, 'DepartDate', '').replace(/-/g, '/') + ' ' + result(object, 'DepartTime', ''));
      const fullArrive = new Date(result(object, 'ArriveDate', '').replace(/-/g, '/') + ' ' + result(object, 'ArriveTime', ''));
      const start = new moment(fullDepart);
      const end = new moment(fullArrive);
      const durationMinutes = moment.duration(end.diff(start)).asMinutes();
      const durationHours = moment.duration(end.diff(start)).hours();
      const durationDays = moment.duration(end.diff(start)).days();      
      const durationRest = durationMinutes - (durationHours * 60) - (durationDays * 24 * 60);
      const durationDisplay = durationDays !== 0 ?
        durationDays + ' ' + language.FLIGHT__DAY + ' ' + durationHours + ' ' + language.FLIGHT__HOUR +
         ' ' + durationRest + ' ' + language.FLIGHT__MINUTE :
        durationHours + ' ' + language.FLIGHT__HOUR + ' ' + durationRest + ' ' + language.FLIGHT__MINUTE;
      const duration = moment.duration(end.diff(start)).asHours();
      object['fullDepart'] = fullDepart;
      object['fullArrive'] = fullArrive;
      object['durationMinutes'] = durationMinutes;
      object['durationDays'] = durationDays;
      object['durationHours'] = durationHours;
      object['durationDisplay'] = durationDisplay;
      object['duration'] = duration;
    });
    const fullArrive1 = result(flightDataDetail1, 'fullArrive', {});
    const cityOrigin = originCity.substring(originCity.indexOf('/') + 1, originCity.indexOf('['));
    const cityDestination = destinationCity.substring(destinationCity.indexOf('/') + 1, destinationCity.indexOf('['));
    const flights = filter(rawFlights, function (o) {
      const start = new moment(fullArrive1);
      const end = new moment(o.fullDepart);
      const duration = moment.duration(end.diff(start)).asHours();
      return duration > 1;
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
        changeDateFunc= {changeDateFunc}
        dayDepartdate={getDayName(departDate)}
        dayArrivaldate={getDayName(arrivalDate)}
        passenger={passenger}
        goToSummary={goToSummary}
        cityOrigin={cityOrigin}
        cityDestination={cityDestination}
        flightDataDetail1={flightDataDetail1}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightAvailabilityPage2);
