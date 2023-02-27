import React, {Component} from 'react';
import {change, reduxForm} from 'redux-form';
import {checkShariaAccount, getTransferPossibleAccounts} from '../../utils/transformer.util';
import {createIDBilling, goToLanding, payTax} from '../../state/thunks/common.thunks';
import {isEmpty, result, indexOf} from 'lodash';
import {confirmGenericBillTypeOne, payBillerEtax} from '../../state/thunks/genericBill.thunks';
import IdBillingFormPaymentConfirmation from '../../components/ETaxJourney/IdBillingFormPaymentConfirmation.component';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {triggerAuthBillpay} from '../../state/thunks/genericBill.thunks';
import {Toast} from '../../utils/RNHelpers.util.js';
import {language} from '../../config/language';

const formConfig = {
  form: 'IdBillingFormPaymentConfirmation',
  destroyOnUnmount: true,
  onSubmit: (values, dispatch, {amount, payBill, currentAmount, navigation, confirmData, isLogin, isSyariah, state}) => {
    const params = {onSubmit: payBill, amount, isOtp: false};
    const resDataTemp = result(navigation, 'state.params.resData', {});
    const confirmFunction = () => {
      dispatch(confirmGenericBillTypeOne({...confirmData, resDataTemp}, true)).then(() => {
        dispatch(triggerAuthBillpay(currentAmount, triggerAuthData, isSyariah));
      });
    };
    const checkingCIF = result(state, 'checkingCIFbeforeLogin', false);
    const limitBeforeLogin = result(state, 'config.limitConfigAutoDebetAccount', '');
    const searchIndexComma = indexOf(limitBeforeLogin, ',');
    const setLimitCIF = checkingCIF ? limitBeforeLogin.substring(0, searchIndexComma) : limitBeforeLogin.substring(searchIndexComma + 1, limitBeforeLogin.length);
    const allAmount = result(resDataTemp, 'amount', 0);
    const triggerAuthData = {amount, params};
    if (Number(setLimitCIF) < Number(allAmount) && !isLogin) {
      Toast.show(language.SET_AUTODEBIT_EXCEED_LIMIT, Toast.LONG);
    } else {
      if (isLogin) {
        dispatch(triggerAuthBillpay(currentAmount, triggerAuthData, isSyariah));
      } else {
        dispatch(confirmFunction);
      }
    }
  },
};

const mapStateToProps = (state) => ({
  formValues: result(state, 'form.IdBillingFormPayment.values'),
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
  currency: result(state, 'couponCheck.currency', 'simaspoin'),
  isLogin: !isEmpty(result(state, 'user', {})),
  state
});

const mapDispatchToProps = (dispatch) => ({
  createIDBilling: () => dispatch(createIDBilling()),
  setDataConfirmation: (confirmationData) => {
    dispatch(change('IdBillingFormPaymentConfirmation', 'idBilling', confirmationData.idBilling));
    dispatch(change('IdBillingFormPaymentConfirmation', 'npwp', confirmationData.npwp));
    dispatch(change('IdBillingFormPaymentConfirmation', 'nama', confirmationData.taxName));
    dispatch(change('IdBillingFormPaymentConfirmation', 'alamat', confirmationData.taxAddress));
    dispatch(change('IdBillingFormPaymentConfirmation', 'nop', confirmationData.nopNumber));
    dispatch(change('IdBillingFormPaymentConfirmation', 'jenisPajak', confirmationData.taxType));
    dispatch(change('IdBillingFormPaymentConfirmation', 'jenisSetoran', confirmationData.depositType));
    dispatch(change('IdBillingFormPaymentConfirmation', 'dateStart', confirmationData.fromDate));
    dispatch(change('IdBillingFormPaymentConfirmation', 'dateEnd', confirmationData.endDate));
    dispatch(change('IdBillingFormPaymentConfirmation', 'tahunPajak', confirmationData.taxYear));
    dispatch(change('IdBillingFormPaymentConfirmation', 'nomorKetetapan', confirmationData.regularityNumber));
    dispatch(change('IdBillingFormPaymentConfirmation', 'jumlahSetor', confirmationData.amount));
    dispatch(change('IdBillingFormPaymentConfirmation', 'terbilang', confirmationData.amountText));
    dispatch(change('IdBillingFormPaymentConfirmation', 'berita', confirmationData.notes));
  },
  goHome: () => dispatch(goToLanding()),
  billerAccount: () => dispatch(NavigationActions.navigate({routeName: 'BillerAccount', params: {formName: 'IdBillingFormPayment', fieldName: 'accountNo', sourceType: 'genericBiller'}})),
  payTax: (data, isBillPay) => dispatch(payTax(data, isBillPay)),
  payBillerEtax: (data, isBillPay) => dispatch(payBillerEtax(data, isBillPay)),

});



const DecoratedForm = reduxForm(formConfig)(IdBillingFormPaymentConfirmation);

class IdBillingForm extends Component {
  static propTypes = {
    createIDBilling: PropTypes.func,
    formValues: PropTypes.object,
    navigation: PropTypes.oject,
    setDataConfirmation: PropTypes.func,
    dispatch: PropTypes.func,
    goHome: PropTypes.func,
    billerAccount: PropTypes.func,
    accounts: PropTypes.array,
    isLogin: PropTypes.bool,
    currency: PropTypes.string,
    payTax: PropTypes.func,
    payGenericBillTypeThree: PropTypes.func,
    isUseSimas: PropTypes.bool,
    state: PropTypes.object,
    payBillerEtax: PropTypes.func
  }
  
  payBill = () => {
    const {payBillerEtax, isLogin, navigation, isUseSimas} = this.props;
    const navParams = navigation.state.params;
    const isEtax = true;
    const data = {...navParams, isUseSimas, isEtax};
    const isBillPay = !isLogin;
    payBillerEtax(data, isBillPay);
  }

  render () {
    const {navigation, createIDBilling, accounts, formValues, goHome, billerAccount, currency, isLogin, state} = this.props;
    const paramsData = result(navigation, 'state.params', {});
    const amount = parseInt(result(navigation, 'state.params.resData.amountNumber', '0'));
    const isSyariah = checkShariaAccount(result(formValues, 'accountNo', {})) && currency !== 'simaspoin';
    const isUseSimas = result(paramsData, 'accountNo.isUseSimas', '');
    return (
      <DecoratedForm
        currentAmount={amount} {...paramsData}
        createIDBilling={createIDBilling} isSyariah={isSyariah}
        formValues={formValues} isLogin={isLogin}
        goHome={goHome} isUseSimas={isUseSimas} 
        billerAccount={billerAccount}
        accounts={accounts} navigation={navigation}
        paramsData={paramsData}
        payBill={this.payBill}
        amount={amount} state={state}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdBillingForm);