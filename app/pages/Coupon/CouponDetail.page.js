import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TransactionsDetail from '../../components/Coupon/CouponPageDetail.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {validityCoupon, manualValidityCoupon, validityCouponCheck} from '../../state/thunks/common.thunks';
import {currencyFormatter} from '../../utils/transformer.util';

class DetailTransactionsPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    currentLanguage: PropTypes.string,
    useCoupon: PropTypes.func,
    useCouponFromView: PropTypes.func,
    useCouponCheck: PropTypes.func
  }

  goToUseCoupon= () => {
    const {useCoupon, navigation} = this.props;
    const billerCode = result(navigation, 'state.params.billerCode', '');
    const billerCodeQR = billerCode.toString();
    const amount = result(navigation, 'state.params.transactionAmount', '0');
    const amountCoupon = result(navigation, 'state.params.detailVoucher.amount', '0');  
    const id = result(navigation, 'state.params.voucherId', '');
    const fixAmount = result(navigation, 'state.params.detailVoucher.modifierType', '') === 'percent' ? amountCoupon.toString() + '%' : currencyFormatter(amountCoupon);
    const endTime = result(navigation, 'state.params.detailVoucher.endTime', {});
    const ownership = result(navigation, 'state.params.detailVoucher.ownership', {});
    const subendDate = result(navigation, 'state.params.subendDate', '');
    const subenewDate = result(navigation, 'state.params.subenewDate', '');
    const endTimeMod = result(navigation, 'state.params.endTimeMod', {});
    const startTimeMod = result(navigation, 'state.params.startTimeMod', {});
    const fromDetail = '1';
    const currency = result(navigation, 'state.params.currency', '');
    const accountId = result(navigation, 'state.params.accountId', '');
    useCoupon(id, fixAmount, amount, endTime, ownership, fromDetail, subendDate, subenewDate, endTimeMod, startTimeMod, currency, billerCodeQR, accountId);
  }

  goToUseCouponFromView=() => {
    const {useCouponFromView, navigation} = this.props; 
    const amount = result(navigation, 'state.params.transactionAmount', '0');
    const billerCodeQR = result(navigation, 'state.params.detailVoucher.voucherProperties.billerCodes', 0);
    const amountCoupon = result(navigation, 'state.params.detailVoucher.amount', '0');  
    const id = result(navigation, 'state.params.voucherId', '');
    const fixAmount = result(navigation, 'state.params.detailVoucher.modifierType', '') === 'percent' ? amountCoupon.toString() + '%' : currencyFormatter(amountCoupon);
    const endTime = result(navigation, 'state.params.detailVoucher.endTime', {});
    const ownership = result(navigation, 'state.params.detailVoucher.ownership', {});
    const codebillerList = result(navigation, 'state.params.codebillerList', {});
    const subendDate = result(navigation, 'state.params.subendDate', '');
    const subenewDate = result(navigation, 'state.params.subenewDate', '');
    const endTimeMod = result(navigation, 'state.params.endTimeMod', {});
    const startTimeMod = result(navigation, 'state.params.startTimeMod', {});
    const maxAmount = result(navigation, 'state.params.maxAmount', 0);
    const minAmount = result(navigation, 'state.params.minAmount', 0);
    const currency = result(navigation, 'state.params.currency', '');
    // just save, validity later
    useCouponFromView(id, fixAmount, amount, endTime, ownership, codebillerList, subendDate, subenewDate, endTimeMod, startTimeMod, maxAmount, minAmount, currency, billerCodeQR);
  }

  render () {
    const {navigation, currentLanguage} = this.props;
    const detailVoucher = result(navigation, 'state.params.detailVoucher', {});
    const isAvailable = result(navigation, 'state.params.isAvailable', false);
    const subendDate = result(navigation, 'state.params.subendDate', '');
    const subenewDate = result(navigation, 'state.params.subenewDate', '');
    const ownership = result(navigation, 'state.params.ownership', '');
    const shortDescription = result(navigation, 'state.params.shortDesc', '');
    const currency = result(navigation, 'state.params.currency', '');
    return <TransactionsDetail  detailVoucher={detailVoucher} currency={currency} subenewDate={subenewDate} subendDate={subendDate} ownership={ownership} goToUseCouponFromView={this.goToUseCouponFromView} isAvailable={isAvailable} goToUseCoupon={this.goToUseCoupon} currentLanguage={currentLanguage} shortDesc={shortDescription}/>;
  }
}

const mapStateToProps = (state) => ({
  currentLanguage: result(state, 'currentLanguage.id', '')
});

const mapDsipatchToProps = (dispatch) => ({
  useCoupon: (id, fixAmount, amount, endTime, ownership, fromDetail, subendDate, subenewDate, endTimeMod, startTimeMod, currency, billerCodeQR, accountId) => dispatch(validityCoupon(id, fixAmount, amount, endTime, ownership, fromDetail, subendDate, subenewDate, endTimeMod, startTimeMod, currency, billerCodeQR, accountId)),
  useCouponFromView: (id, fixAmount, amount, endTime, ownership, codebillerList, subendDate, subenewDate, endTimeMod, startTimeMod, maxAmount, minAmount, currency) => dispatch(manualValidityCoupon(id, fixAmount, amount, endTime, ownership, codebillerList, subendDate, subenewDate, endTimeMod, startTimeMod, maxAmount, minAmount, currency)),
  useCouponCheck: (id, fixAmount, amount, endTime, ownership, codebillerList, subendDate, subenewDate, endTimeMod, startTimeMod, maxAmount, minAmount) => dispatch(validityCouponCheck(id, fixAmount, amount, endTime, ownership, codebillerList, subendDate, subenewDate, endTimeMod, startTimeMod, maxAmount, minAmount))
});

export default connect(mapStateToProps, mapDsipatchToProps)(DetailTransactionsPage);
