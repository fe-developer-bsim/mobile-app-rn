import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {validateRequiredFields, validateRequiredString} from '../../utils/validator.util';
import result from 'lodash/result';
import FlightIndex, {fields} from '../../components/FlightJourney/FlightIndex.component';
import {NavigationActions} from 'react-navigation';
import {getFlightAvailability, switchOriginDestination} from '../../state/thunks/flight.thunks';

const classes = [
  {label: 'Economy', value: 'Economy'},
  {label: 'Business', value: 'Business'},
  {label: 'First Class', value: 'First Class'}
];

const formConfig = {
  form: 'FlightIndexForm',
  destroyOnUnmount: false,
  validate: (values, {tabRefs}) => {
    const errorOneWay = {
      ...validateRequiredFields(values, [fields.ORIGIN_CITY, fields.DESTINATION_CITY, fields.CATEGORY]),
      ...validateRequiredString(values, [fields.DEPART_DATE]),
    };
    const errorTwoWay = {
      ...validateRequiredFields(values, [fields.ORIGIN_CITY, fields.DESTINATION_CITY, fields.CATEGORY]),
      ...validateRequiredString(values, [fields.DEPART_DATE, fields.ARRIVAL_DATE]),
    };
    // if (result(values, 'arrivalTime') === '') {
    //   return errorOneWay;
    // } else if (result(values, 'arrivalTime') !== '') {
    //   return errorTwoWay;
    // }
    if (tabRefs === 0) {
      return errorOneWay;
    } else if (tabRefs === 1) {
      return errorTwoWay;
    }
  },
  onSubmit: (values, dispatch, {adult, child, infant}) => {
    dispatch(getFlightAvailability(adult, child, infant, 'new'));
  },
  initialValues: {
     
  }
};

  
const FlightIndexForm = reduxForm(formConfig)(FlightIndex);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(FlightIndexForm);

class FlightIndexPage extends Component {
  state = {
    adult: 1,
    child: 0,
    infant: 0,
    today: '',
    tabRefs: 0
  }
  static propTypes = {
    classes: PropTypes.array,
    today: PropTypes.object,
    goToAirportListOrigin: PropTypes.func,
    goToAirportListDestination: PropTypes.func,
    originCity: PropTypes.string,
    destinationCity: PropTypes.string,
    child: PropTypes.number,
    adult: PropTypes.number,
    infant: PropTypes.number,
    addAdult: PropTypes.func,
    minusAdult: PropTypes.func,
    addChild: PropTypes.func,
    minusChild: PropTypes.func,
    addInfant: PropTypes.func,
    minusInfat: PropTypes.func,
    switchOriginDestination: PropTypes.func,
    switchTrip: PropTypes.func,
    tabRefs: PropTypes.number,
    departDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    arrivalDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  }
  componentWillMount () {
    const today = new Date();
    this.setState({
      today: today,
    });
  }
  changeIndexTab = (index) => {
    this.setState({tabRefs: index});
  }
  addAdult = () => {
    const adult = this.state.adult;
    this.setState({adult: adult + 1});
  }
  minusAdult = () => {
    const adult = this.state.adult;
    adult === 0 ? 0 : this.setState({adult: adult - 1});
  }
  addChild = () => {
    const child = this.state.child;
    this.setState({child: child + 1});
  }
  minusChild = () => {
    const child = this.state.child;
    child === 0 ? 0 : this.setState({child: child - 1});
  }
  addInfant = () => {
    const infant = this.state.infant;
    this.setState({infant: infant + 1});
  }
  minusInfant = () => {
    const infant = this.state.infant;
    infant === 0 ? 0 : this.setState({infant: infant - 1});
  }

  render () {
    const {goToAirportListOrigin, goToAirportListDestination,
      originCity, destinationCity, switchTrip, departDate, arrivalDate} = this.props;
    return <ConnectedForm 
      classes = {classes}
      originCity={originCity}
      destinationCity={destinationCity}
      today = {this.state.today} 
      adult={this.state.adult}
      child={this.state.child}
      infant={this.state.infant}
      addAdult={this.addAdult}
      minusAdult={this.minusAdult}
      addChild={this.addChild}
      minusChild={this.minusChild}
      addInfant={this.addInfant}
      minusInfant={this.minusInfant}
      goToAirportListOrigin= {goToAirportListOrigin}
      goToAirportListDestination= {goToAirportListDestination}
      switchTrip={switchTrip}
      changeIndexTab={this.changeIndexTab}
      tabRefs={this.state.tabRefs}
      departDate={departDate}
      arrivalDate={arrivalDate}
    />;
  }
}

const mapStateToProps = (state) => ({
  originCity: result(state, 'form.FlightIndexForm.values.originCity', ''),
  destinationCity: result(state, 'form.FlightIndexForm.values.destinationCity', ''),
  departDate: result(state, 'form.FlightIndexForm.values.departDate', ''),
  arrivalDate: result(state, 'form.FlightIndexForm.values.arrivalDate', ''),
});

const mapDispatchToProps = (dispatch) => ({
  goToAirportListOrigin: () => dispatch(NavigationActions. navigate({routeName: 'FlightAirportList', params: {flag: 'origin'}})),
  goToAirportListDestination: () => dispatch(NavigationActions. navigate({routeName: 'FlightAirportList', params: {flag: 'destination'}})),
  getFlightSchedule: () => dispatch(getFlightAvailability()),
  switchTrip: () => dispatch(switchOriginDestination())
});

const ConnectedFlightIndexPage = connect(mapStateToProps, mapDispatchToProps)(FlightIndexPage);
export default ConnectedFlightIndexPage;
