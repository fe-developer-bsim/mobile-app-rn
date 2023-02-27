import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SearcheableList from '../../components/SearcheableList/SearcheableList.component';
import {populateConfigData, getPayeeNameCc} from '../../state/thunks/common.thunks';
import result from 'lodash/result';
import noop from 'lodash/noop';
import {NavigationActions} from 'react-navigation';
import {language} from '../../config/language';
import {getFilteredBillerData} from '../../utils/transformer.util';
import {change} from 'redux-form';

class AddPayeeBankPage extends Component {
  static propTypes = {
    populateAppConfig: PropTypes.func,
    goToAccountCreditCard: PropTypes.func,
    bankList: PropTypes.array,
    biller: PropTypes.array
  }
  componentDidMount () {
    this.props.populateAppConfig();
  }
  render () {
    const {bankList, goToAccountCreditCard, biller, ...extraProps} = this.props;
    return <SearcheableList
      searchlist={bankList}
      listHeader = {language.TRANSFER__OR_SELECT_FROM_BELOW}
      inputHeader = {language.TRANSFER__BANK_OR_CODE}
      textKey = 'bankName'
      subtextKey = 'bankCode'
      onItemClick = {goToAccountCreditCard(biller)}
      onChangeText = {noop}
      {...extraProps}/>;
  }
}

const mapStateToProps = (state) => ({
  bankList: result(state, 'valueBankList.bankList', []),
  biller: getFilteredBillerData(state, 'CC')
});

const mapDispatchToProps = (dispatch) => ({
  populateAppConfig: () => {
    dispatch(populateConfigData());
  },
  goToAccountCreditCard: () => (bank) => {
    dispatch(getPayeeNameCc());
    dispatch(NavigationActions.back());
    dispatch(change('creditcard', 'bank', bank));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPayeeBankPage);
