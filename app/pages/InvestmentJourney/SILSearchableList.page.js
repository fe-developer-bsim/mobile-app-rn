import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import result from 'lodash/result';
import SearchableListSIL from '../../components/SearcheableList/SearchableListSil.component';
import {language} from '../../config/language';
import noop from 'lodash/noop';
import {change} from 'redux-form';
import {NavigationActions} from 'react-navigation';

class SilSearchablelist extends Component {

  static propTypes = {
    cityListSIL: PropTypes.array,
    saveCity: PropTypes.func,
    navigation: PropTypes.object,
  }

  render () {
    const {cityListSIL, saveCity} = this.props;
    return <SearchableListSIL
      searchlist={cityListSIL}
      listHeader = {language.EMONEY__CITY}
      inputHeader = {language.EMONEY__CITY}
      placeholderText = {language.EMONEY__CITY}
      textKey = 'cityName'
      subtextKey = 'Code'
      onItemClick = {saveCity}
      onChangeText = {noop}
      inputProps={{keyboardType: 'default', maxLength: 30, returnKeyType: 'search'}}
    />;
  }
}

const mapStateToProps = (state) => ({
  cityListSIL: result(state, 'cityListSIL', []),
});

const mapDispatchToProps = (dispatch) => ({
  saveCity: (item) => {
    const city = result(item, 'cityName', '');
    dispatch(change('SileSPAJForm2', 'city', city));
    const provinceName = result(item, 'provinceName', '');
    dispatch(change('SileSPAJForm2', 'province', provinceName));
    dispatch(change('SileSPAJForm2', 'cityObject', item));
    dispatch(NavigationActions.back());
  }
});

const ConnectedSearchablelistPage = connect(mapStateToProps, mapDispatchToProps)(SilSearchablelist);
export default ConnectedSearchablelistPage;