import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {validateRequiredFields, validateBalance} from '../../utils/validator.util';
import {reduxForm, change} from 'redux-form';
import {NavigationActions} from 'react-navigation';
import {getTransferPossibleAccounts, getAccountAmount, generateTipList, currencySymbol, currencyFormatter} from '../../utils/transformer.util';
import forEach from 'lodash/forEach';
import round from 'lodash/round';
import isEmpty from 'lodash/isEmpty';
import QRInvoiceDetail from '../../components/QRPayment/QRInvoiceDetail.component';
import {silentLoginBillpay} from '../../state/thunks/genericBill.thunks';

const formConfig = {
  form: 'QRInvoiceDetail',
  destroyOnUnmount: false,
  validate: (values, {totalAmount}) => {
    const errors = validateRequiredFields(values, ['accountNo']);
    if (result(values, 'accountNo', false)) {
      const selectedAccountBalance = getAccountAmount(values.accountNo);
      errors['accountNo'] = validateBalance(selectedAccountBalance, totalAmount);
    }
    return errors;
  },
  onSubmit: (values, dispatch, props, {isLogin}) => {
    const {selectedCoupon, couponCurrency, totalAmountWithTip, totalCouponAmount, couponAmount,
      couponList, discount, discountAmount, couponType, tipAmount, totalAmount} = props;
    const qrConfirmFunc = () => {
      dispatch(NavigationActions.navigate({routeName: 'QRConfirmation', params: {value: values,
        prop: {selectedCoupon, couponCurrency, totalAmountWithTip, totalCouponAmount, couponAmount,
          couponList, discount, discountAmount, couponType, tipAmount, totalAmount}}}));  
    };
    isLogin ?
      dispatch(NavigationActions.navigate({routeName: 'QRConfirmation', params: {value: values,
        prop: {selectedCoupon, couponCurrency, totalAmountWithTip, totalCouponAmount, couponAmount,
          couponList, discount, discountAmount, couponType, tipAmount, totalAmount}}}))
      : dispatch(silentLoginBillpay(qrConfirmFunc));
  },
  initialValues: {
    tipAmount: 0
  }
};

const DecoratedForm = reduxForm(formConfig)(QRInvoiceDetail);

class QRInvoiceDetailPage extends Component {
  static propTypes = {
    QRInvoice: PropTypes.object,
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    navigation: PropTypes.object,
    setTipAmount: PropTypes.func,
    deleteQRInvoice: PropTypes.func,
    resetManualTip: PropTypes.func,
    userMobileNumber: PropTypes.string,
    tipManualChange: PropTypes.func,
    addCoupon: PropTypes.func,
    removeCoupon: PropTypes.func,
    selectedCoupon: PropTypes.number,
    couponDiscountAmount: PropTypes.number,
    couponDiscountList: PropTypes.array,
    couponList: PropTypes.array,
    couponLength: PropTypes.number,
    addCouponDisabled: PropTypes.bool,
    removeCouponDisabled: PropTypes.bool,
    couponAmount: PropTypes.number,
    totalCouponAmount: PropTypes.number,
    totalAmountNoCoupon: PropTypes.number,
    couponOvercharge: PropTypes.bool,
    totalAmount: PropTypes.number,
    discount: PropTypes.number,
    tipEnabled: PropTypes.bool,
    discountAmount: PropTypes.string,
    couponCurrency: PropTypes.string,
    couponType: PropTypes.string,
  };

  state = {
    inputTipDisabled: true,
    selectedCoupon: 0
  }

  componentDidMount () {
    const {setTipAmount} = this.props;
    setTipAmount({
      value: 0, label: '0'
    });
  }

  checkTipAmount = (tipAmount) => {
    if (result(tipAmount, 'value', '') === 'manual') {
      this.setState({inputTipDisabled: false});
    } else {
      this.setState({inputTipDisabled: true});
      this.props.resetManualTip();
    }
  }

  addCoupon = () => {
    const {selectedCoupon} = this.state;
    this.setState({selectedCoupon: selectedCoupon + 1});
  }

  removeCoupon = () => {
    const {selectedCoupon} = this.state;
    this.setState({selectedCoupon: selectedCoupon - 1});
  }

  getDiscountList = (couponList) => {
    const {QRInvoice} = this.props;
    let amount = result(QRInvoice, 'content.amount', 0);
    let couponDiscountList = [];
    let couponDiscountAmount = 0;
    forEach(couponList, function (value) {
      couponDiscountAmount += (amount * value.amount / 100);
      amount -= couponDiscountAmount;
      couponDiscountList.push(couponDiscountAmount);
    });
    return couponDiscountList;
  }

  render () {
    const {QRInvoice, accounts, formValues, navigation, ...extraProps} = this.props;
    const {selectedCoupon} = this.state;
    const navParams = result(navigation, 'state.params', {});

    const discount = result(QRInvoice, 'content.permanentPercentageDiscount', 0);
    const tipEnabled = result(QRInvoice, 'content.tipEnabled', false);
    const discountAmount = currencySymbol(result(QRInvoice, 'content.currency', 'IDR')) + ' ' + currencyFormatter(result(QRInvoice, 'content.amount', 0) - result(QRInvoice, 'content.correctedInvoiceAmountWithPercentage', 0));
    const tipSelection = generateTipList(QRInvoice);

    const couponList = result(QRInvoice, 'content.couponList', []);
    const couponType = result(couponList, '[0].couponType', '');
    const couponDiscountList = couponType === 'PERCENT' ? this.getDiscountList(couponList) : [];
    const couponDiscountAmount = couponType === 'PERCENT' && !isEmpty(couponDiscountList) && selectedCoupon !== 0 ?  couponDiscountList[selectedCoupon - 1] : 0;

    const couponLength = couponList.length;
    const addCouponDisabled = selectedCoupon >= couponLength;
    const removeCouponDisabled = selectedCoupon === 0;

    const couponAmount = result(couponList, '[0].amount', 0);
    const couponCurrency = currencySymbol(result(couponList, '[0].currency', 'IDR'));

    const totalCouponAmount =  couponType === 'CASH' ? Number(couponAmount) * Number(selectedCoupon) : couponDiscountAmount;

    const totalAmountNoCoupon = discount > 0 ? result(QRInvoice, 'content.correctedInvoiceAmountWithPercentage', 0) : result(QRInvoice, 'content.amount', 0);
    const couponOvercharge = couponType === 'CASH' ? totalAmountNoCoupon < totalCouponAmount + couponAmount + 500 : totalAmountNoCoupon < couponDiscountList[selectedCoupon] + 500;
    const totalAmount = totalAmountNoCoupon > round(totalCouponAmount) ? round(totalAmountNoCoupon - totalCouponAmount) : 0;

    return <DecoratedForm QRInvoice={QRInvoice} accounts={accounts} formValues={formValues} {...navParams}
      inputTipDisabled={this.state.inputTipDisabled} checkTipAmount={this.checkTipAmount} addCoupon={this.addCoupon}
      removeCoupon={this.removeCoupon} selectedCoupon={selectedCoupon} couponDiscountAmount={couponDiscountAmount}
      couponDiscountList={couponDiscountList} couponList={couponList} couponLength={couponLength} addCouponDisabled={addCouponDisabled}
      removeCouponDisabled={removeCouponDisabled} couponAmount={couponAmount} totalCouponAmount={totalCouponAmount}
      totalAmountNoCoupon={totalAmountNoCoupon} couponOvercharge={couponOvercharge} totalAmount={totalAmount}
      discount={discount} tipEnabled={tipEnabled} discountAmount={discountAmount} tipSelection={tipSelection}
      couponCurrency ={couponCurrency} couponType={couponType} {...extraProps}/>;
  }
}

const mapStateToProps = (state) => ({
  QRInvoice: result(state, 'QRInvoice', {}),
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.QRInvoiceDetail.values', {}),
});

const mapDispatchToProps = (dispatch) => ({
  setTipAmount: (tipAmount) => {
    dispatch(change('QRInvoiceDetail', 'tipAmount', tipAmount));
  },
  resetManualTip: () => {
    dispatch(change('QRInvoiceDetail', 'tipAmountManual', ''));
  }
});

const connectedQRInvoiceDetail = connect(mapStateToProps, mapDispatchToProps)(QRInvoiceDetailPage);
export default connectedQRInvoiceDetail;
