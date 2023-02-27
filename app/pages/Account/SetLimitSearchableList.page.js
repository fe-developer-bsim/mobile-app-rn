import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import result from 'lodash/result';
import SearchableListSetLimit from '../../components/Account/SearchableListSetLimit.component';
import {language} from '../../config/language';
import noop from 'lodash/noop';
import {change} from 'redux-form';
import {NavigationActions} from 'react-navigation';
import {getAllAccountsExceptEmoney} from '../../utils/transformer.util';

class SetLimitSearchablelist extends Component {

  static propTypes = {
    saveForListSetLimit: PropTypes.func,    
    navigation: PropTypes.object,
    creditAccountList: PropTypes.array
  }

  render () {
    const {saveForListSetLimit,  creditAccountList} = this.props;    
    const filteredAccount = getAllAccountsExceptEmoney(creditAccountList);
    return <SearchableListSetLimit
      searchlist={filteredAccount}        
      inputHeader = {language.SET_LIMIT_NAME}
      placeholderText = {language.SET_LIMIT_NAME}
      textKey = 'name'
      subtextKey = 'accountNumber'
      secondaryText = 'accountType'
      onItemClick = {saveForListSetLimit}
      onChangeText = {noop}
      inputProps={{keyboardType: 'default', maxLength: 30, returnKeyType: 'search'}}
    />;
  }
}

const mapStateToProps = (state) => ({
  creditAccountList: result(state, 'inbankTransferList', []),
});

const mapDispatchToProps = (dispatch) => ({
  saveForListSetLimit: (item) => {
    const name = result(item, 'name', '');
    dispatch(change('setLimitForm1', 'name', name));
    const accountNumber = result(item, 'accountNumber', '');
    dispatch(change('setLimitForm1', 'accountNumber', accountNumber));
    dispatch(NavigationActions.back());
  }
});

const ConnectedSearchablelistPage = connect(mapStateToProps, mapDispatchToProps)(SetLimitSearchablelist);
export default ConnectedSearchablelistPage;