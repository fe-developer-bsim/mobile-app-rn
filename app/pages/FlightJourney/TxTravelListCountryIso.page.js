import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import result from 'lodash/result';
import SearchableListCountryIso from '../../components/SearcheableList/SearchableListCountryIso.component';
import {language} from '../../config/language';
import noop from 'lodash/noop';
import {changeCountryIso, changeCOI} from '../../state/thunks/flight.thunks';
import * as actionCreators from '../../state/actions/index.actions.js';

class TxTravelListCountry extends Component {

  static propTypes = {
    countryList: PropTypes.array,
    changeCountry: PropTypes.func,
    navigation: PropTypes.object,
    changeCountriyOfIso: PropTypes.func,
    showSpin: PropTypes.func,
    hideSpin: PropTypes.func,
  }


  render () {
    const {countryList, changeCountry, navigation, changeCountriyOfIso, showSpin, hideSpin} = this.props;
    const tipe = result(navigation, 'state.params.tipe', '');
    return <SearchableListCountryIso
      searchlist={countryList}
      showSpin={showSpin}
      hideSpin={hideSpin}
      listHeader = {language.TX_TRAVEL_LIST_NATIONALITY_PICKER}
      inputHeader = {language.FLIGHT__CITY_NAME}
      placeholderText = {language.HINTTEXT__FLIGHT_CITY}
      textKey = 'name'
      subtextKey = 'code'
      onItemClick = {tipe === 'nationality' ? changeCountry : changeCountriyOfIso}
      onChangeText = {noop}
      inputProps={{keyboardType: 'default', maxLength: 30, returnKeyType: 'search'}}
    />;
  }
}

const mapStateToProps = (state) => ({
  countryList: result(state, 'txTravelCountryIso.data.result', []),
});

const mapDispatchToProps = (dispatch, {navigation}) => ({
  changeCountry: (item) => {
    dispatch(changeCountryIso(item, navigation));
  },
  changeCountriyOfIso: (item) => {
    dispatch(changeCOI(item, navigation));
  },
  showSpin: () => {
    dispatch(actionCreators.showSpinner());
  },
  hideSpin: () => {
    dispatch(actionCreators.hideSpinner());
  }
});

const ConnectedFlightAirportPage = connect(mapStateToProps, mapDispatchToProps)(TxTravelListCountry);
export default ConnectedFlightAirportPage;
