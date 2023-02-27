import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Transactions from '../../components/Coupon/CouponPage.component';
import {validityCoupon, getDetailCouponCustomer} from '../../state/thunks/common.thunks';
import result from 'lodash/result';

const DEFAULT_TRANSACTION_FILTER = {selectedRange: {value: 'lastMonth', label: 'Last Month'}};

class TransactionsPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    useCoupon: PropTypes.func,
    couponDetail: PropTypes.func,
    transactionAmount: PropTypes.string,
    billerCode: PropTypes.string,
    currentLanguage: PropTypes.string,
    useCouponQR: PropTypes.func
  }

  viewCouponDetail=(id, ownership, codebillerList, subendDate, subenewDate, endTimeMod, startTimeMod, maxAmount, minAmount, shortDesc, currency) => {
    const {couponDetail, navigation} = this.props;
    const transactionAmount = result(navigation, 'state.params.transactionAmount', '0');
    const isAvailable = result(navigation, 'state.params.isAvailable', false);
    const billerCode = result(navigation, 'state.params.billerCode', '');
    const accountId = result(navigation, 'state.params.accountId', '');
    couponDetail(id, transactionAmount, isAvailable, ownership, codebillerList, subendDate, subenewDate, endTimeMod, startTimeMod, maxAmount, minAmount, shortDesc, currency, billerCode, accountId);
  }

  render () {
    const {navigation, currentLanguage} = this.props;
    const publicCoupon = result(navigation, 'state.params.publicVoucher', []);
    const ownCoupon = result(navigation, 'state.params.privateVoucher', []);
    const isAvailable = result(navigation, 'state.params.isAvailable', false);
    return <Transactions goToUseCoupon={this.goToUseCoupon} currentLanguage={currentLanguage} viewCouponDetail={this.viewCouponDetail} isAvailable={isAvailable} publicCoupon={publicCoupon} ownCoupon={ownCoupon} />;
  }
}

const mapStateToProps = (state) => {
  const selectedTransactionFilter = result(state, 'transactionsEmoney.filters.selectedRange', DEFAULT_TRANSACTION_FILTER);
  const transactions = state.transactionsEmoney[selectedTransactionFilter.value];
  return {
    transactions,
    selectedTransactionFilter,
    filters: state.transactionsEmoney.filters,
    currentLanguage: result(state, 'currentLanguage.id', ''),
  };
};

const mapDispatchToProps = (dispatch) => ({
  useCoupon: (id, fixAmount, amount, endTime, ownership, billerCode) => dispatch(validityCoupon(id, fixAmount, amount, endTime, ownership, billerCode)),
  couponDetail: (id, transactionAmount, isAvailable, ownership, codebillerList, subendDate, subenewDate, endTimeMod, startTimeMod, maxAmount, minAmount, shortDesc, currency, billerCode, accountId) => dispatch(getDetailCouponCustomer(id, transactionAmount, isAvailable, ownership, codebillerList, subendDate, subenewDate, endTimeMod, startTimeMod, maxAmount, minAmount, shortDesc, currency, billerCode, accountId)),
});

const ConnectedTransactionsPage = connect(mapStateToProps, mapDispatchToProps)(TransactionsPage);

export default ConnectedTransactionsPage;
