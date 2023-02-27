import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import CreditCardIndex from '../../components/CreditCardJourney/CreditCardIndex.component';
import {result, isEmpty} from 'lodash';
import {getCreditCardInquiry, getTargetAccount} from '../../state/thunks/common.thunks';
import {getFilteredBillerData, isSimasPayee} from '../../utils/transformer.util';

class CreditCardIndexPage extends Component {
  static propTypes = {
    goToAddccBill: PropTypes.func,
    selectRecentBill: PropTypes.func,
    lastTransactions: PropTypes.array,
    biller: PropTypes.array,
    bankList: PropTypes.array,
    payeeList: PropTypes.array,
    getTargetAccount: PropTypes.func,
  }

  componentDidMount () {
    const {payeeList} = this.props;
    if (isEmpty(payeeList)) {
      this.props.getTargetAccount();
    }
  }

  render () {
    const {goToAddccBill, lastTransactions, selectRecentBill, biller, bankList, ...extraProps} = this.props;
    return <CreditCardIndex biller={biller} onNewccBill={goToAddccBill(biller)} onRecentBill={selectRecentBill(biller, bankList)} recentTransactionList={lastTransactions} {...extraProps}/>;
  }
}

const mapStateToProps = (state) => {
  const {billerConfig} = state;
  const biller = getFilteredBillerData(billerConfig, 'CC');
  return {
    biller,
    lastTransactions: result(state, 'lastCreditCardTransactions.recentTransactions', []),
    language: state.currentLanguage,
    bankList: result(state, 'valueBankList.bankList', []),
    payeeList: result(state, 'payees', []),
  };
};

const mapDispatchToProps = (dispatch) => ({
  goToAddccBill: (biller) => () => {
    dispatch(NavigationActions.navigate({routeName: 'CreditCardAccountInput', params: {biller}}));
  },
  getTargetAccount: () => dispatch(getTargetAccount()),
  selectRecentBill: (biller, bankList) => (payTo) => {
    const bank = result(payTo, 'bank');
    const name = payTo.name;
    if (isSimasPayee(payTo.accNo, bankList)) {
      dispatch(getCreditCardInquiry(bank, payTo.accNo, biller, name, result(payTo, 'id')));
    } else {
      dispatch(NavigationActions.navigate({routeName: 'CreditCardPayment', params: {accNo: payTo.accNo, name, bank, id: result(payTo, 'id')}}));
    }
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(CreditCardIndexPage);
