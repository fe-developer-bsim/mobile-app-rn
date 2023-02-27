import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SearcheableListTrf from '../../components/SearcheableList/SearcheableListTrf.component';
import {NavigationActions} from 'react-navigation';
import {sortPayees, payeesAddSecondaryText} from '../../utils/transformer.util';
import result from 'lodash/result';
import find from 'lodash/find';
import noop from 'lodash/noop';
import {setupFundTransfer}  from '../../state/thunks/fundTransfer.thunks';
import {language} from '../../config/language';
import {getTargetAccount} from '../../state/thunks/common.thunks';

class AddPayeeAccountPage extends Component {
  static propTypes = {
    goToAddPayee: PropTypes.func,
    selectExistingPayee: PropTypes.func,
    payeeList: PropTypes.array,
    getTargetAccount: PropTypes.func,
  }

  findPayee = (accountNumber) => {
    const {goToAddPayee, selectExistingPayee, payeeList} = this.props;
    const foundPayee = find(payeeList, {accountNumber});
    foundPayee ? selectExistingPayee(foundPayee) : goToAddPayee(accountNumber);
  }

  render () {
    const {payeeList = [], selectExistingPayee, getTargetAccount} = this.props;
    return <SearcheableListTrf
      searchlist={payeesAddSecondaryText(sortPayees(payeeList))}
      listHeader = {language.TRANSFER__OR_PICK_FROM_ADDED_PAYEE}
      inputHeader = {language.TRANSFER__PAYEE_ACCOUNT_NUMBER}
      placeholderText = {language.HINTTEXT__PAYEE_ACCOUNT_NUMBER}
      placeholderSearch = {language.TRANSFER__SEARCH_ACCOUNT_PLACEHOLDER}
      placeholderAdd = {language.TRANSFER__ADD_ACCOUNT_PLACEHOLDER}
      labelSearch = {language.TRANSFER__SEARCH_ACCOUNT_LABEL}
      labelAdd = {language.TRANSFER__ADD_ACCOUNT_LABEL}
      labelTitlle = {language.TRANSFER__MENU_TITTLE}
      tittleSearch = {language.TRANSFER__SEARCH_TITTLE}
      btnNewAcc = {language.TRANSFER_BTN_ADD_NEW_ACCOUNT}
      buttonText = {language.TRANSFER_BTN_CONTINUE}
      textKey = 'name'
      subtextKey = 'accountNumber'
      onNextClick = {this.findPayee}
      onItemClick = {selectExistingPayee}
      onChangeText = {noop}
      minLength={6}
      inputProps={{keyboardType: 'default', maxLength: 30, returnKeyType: 'search'}}
      inputPropsAdd={{keyboardType: 'phone-pad', maxLength: 30}}
      getTargetAccount={getTargetAccount}
    />;
  }
}

const mapStateToProps = (state) => ({
  payeeList: result(state, 'payees', []),
  language: state.currentLanguage,
});

const mapDispatchToProps = (dispatch) => ({
  goToAddPayee: (payeeAccNo) => {
    dispatch(NavigationActions.navigate({routeName: 'AddPayee', params: {payeeAccNo}}));
  },
  selectExistingPayee: (payee) => {
    dispatch(setupFundTransfer(payee));
  },
  getTargetAccount: () => dispatch(getTargetAccount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPayeeAccountPage);
