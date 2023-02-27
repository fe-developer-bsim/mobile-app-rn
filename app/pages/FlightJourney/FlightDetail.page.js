import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FlightDetail from '../../components/FlightJourney/FlightDetail.component';
import result from 'lodash/result';

const mapStateToProps = (state) => ({
  passenger: result(state, 'userPassenger', {}),
  originCity: result(state, 'form.FlightIndexForm.values.originCity', ''),
  destinationCity: result(state, 'form.FlightIndexForm.values.destinationCity', ''),
  flightData: result(state, 'flightData', {}),
  category: result(state, 'form.FlightIndexForm.values.category.label', ''),
});


class FlightDetailPage extends Component {
  state = {
    visible: false
  }
  static propTypes = {
    navigation: PropTypes.object,
    departDate: PropTypes.string,
    arrivalDate: PropTypes.string,
    onItemPress: PropTypes.func,
    navParams: PropTypes.array,
    passenger: PropTypes.object,
    origin: PropTypes.string,
    destination: PropTypes.string,
    flightData: PropTypes.object,
    originCity: PropTypes.string,
    destinationCity: PropTypes.string,
    category: PropTypes.string
  }
  
  render () {
    const {navigation, passenger, originCity, destinationCity, flightData, category} = this.props;
    const navParams = result(navigation, 'state.params', []); 
    const adult = result(passenger, 'Adult', '0');
    const child = result(passenger, 'Child', '0');
    const infant = result(passenger, 'Infant', '0');

    const foreignTotal = result(navParams, 'ForeignTotal', '');
    const foreignTotalCurrency = result(navParams, 'ForeignTotalCurrency', '');
    const data = result(navParams, 'data', '');
    const flag = result(navParams, 'flag', '');
    const detail = result(data, 'Details', []);
    const total = result(data, 'Total', '');
    
    const codeOrigin = originCity.substring(originCity.indexOf('[') + 1, originCity.indexOf(']'));
    const codeDestination = destinationCity.substring(destinationCity.indexOf('[') + 1, destinationCity.indexOf(']'));
    
    const airportOrigin = originCity.substring(0, originCity.indexOf('/'));
    const airportDestination = destinationCity.substring(0, destinationCity.indexOf('/'));
    
    const cityOrigin = originCity.substring(originCity.indexOf('/') + 1, originCity.indexOf('['));
    const cityDestination = destinationCity.substring(destinationCity.indexOf('/') + 1, destinationCity.indexOf('['));
    
    return (
      <FlightDetail 
        detail={detail}
        adult={adult}
        child={child}
        infant={infant}
        codeOrigin={codeOrigin}
        codeDestination={codeDestination} 
        airportOrigin={airportOrigin}
        airportDestination={airportDestination}
        cityOrigin={cityOrigin}
        cityDestination={cityDestination}
        foreignTotal={foreignTotal} 
        foreignTotalCurrency={foreignTotalCurrency}
        total={total}
        flightData={flightData}
        category={category}
        flag={flag}
        
      />
    );
  }
}

export default connect(mapStateToProps, null)(FlightDetailPage);
