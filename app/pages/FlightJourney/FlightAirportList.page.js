import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import result from 'lodash/result';
import SearchableListAirport from '../../components/SearcheableList/SearchableListAirport.component';
import {language} from '../../config/language';
import noop from 'lodash/noop';
import {setAirport} from '../../state/thunks/flight.thunks';
import filter from 'lodash/filter';

class FlightAirportListPage extends Component {

  static propTypes = {
    airportList: PropTypes.array,
    getAirport: PropTypes.func,
    navigation: PropTypes.object,
  }
 
  render () {
    const {airportList, getAirport} = this.props;
    return <SearchableListAirport
      searchlist={airportList}
      listHeader = {language.FLIGHT__AIRPORT_LIST}
      inputHeader = {language.FLIGHT__CITY_NAME}
      placeholderText = {language.HINTTEXT__FLIGHT_CITY}  
      textKey = 'CityName'
      subtextKey = 'Code'
      onItemClick = {getAirport}
      onChangeText = {noop}
      inputProps={{keyboardType: 'default', maxLength: 30, returnKeyType: 'search'}}
    />;
  }
}

const mapStateToProps = (state) => ({
  airportList: filter(result(state, 'config.airportListConfig', []), {'CountryCode': 'ID'}),
});

const mapDispatchToProps = (dispatch, {navigation}) => ({
  getAirport: (item) => {
    dispatch(setAirport(item, navigation));
  }
});

const ConnectedFlightAirportPage = connect(mapStateToProps, mapDispatchToProps)(FlightAirportListPage);
export default ConnectedFlightAirportPage;
