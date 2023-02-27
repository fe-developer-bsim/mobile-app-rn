import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SearcheableList from '../../components/SearcheableList/SearcheableList.component';
import {populateConfigData} from '../../state/thunks/common.thunks';
import result from 'lodash/result';
import noop from 'lodash/noop';
import groupBy from 'lodash/groupBy';
import {NavigationActions} from 'react-navigation';
import {language} from '../../config/language';
import {change} from 'redux-form';
import {getPayeeName} from '../../state/thunks/fundTransfer.thunks';

class AddPayeeBankPage extends Component {
  static propTypes = {
    populateAppConfig: PropTypes.func,
    goToAddPayee: PropTypes.func,
    bankListData: PropTypes.array
  }
  // componentDidMount () {
  //   this.props.populateAppConfig();
  // }
  render () {
    const {bankListData, goToAddPayee, ...extraProps} = this.props;
    const isBank = groupBy(bankListData, (obj) => (result(obj, 'isBank', true)));
    const bankList = result(isBank, 'true', []);
    return <SearcheableList
      searchlist={bankList}
      listHeader = {language.TRANSFER__OR_SELECT_FROM_BELOW}
      inputHeader = {language.TRANSFER__BANK_OR_CODE}
      placeholderText = {language.HINTTEXT__BANK_NAME_OR_CODE}
      textKey = 'bankName'
      subtextKey = 'bankCode'
      onItemClick = {goToAddPayee}
      onChangeText = {noop}
      {...extraProps}/>;
  }
}

const mapStateToProps = (state) => ({
  bankListData: result(state, 'valueBankList.bankList', [])
});

const mapDispatchToProps = (dispatch) => ({
  populateAppConfig: () => {
    dispatch(populateConfigData());
  },
  goToAddPayee: (bank) => {
    dispatch(change('addPayee', 'bank', bank));
    dispatch(getPayeeName());
    dispatch(NavigationActions.back());
  },
  getPayeeDetails: () => dispatch(getPayeeName())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPayeeBankPage);
