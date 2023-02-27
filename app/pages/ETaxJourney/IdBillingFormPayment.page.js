import React, {Component} from 'react';
import {change, reduxForm} from 'redux-form';
import {checkShariaAccount, getTransferPossibleAccounts} from '../../utils/transformer.util';
import {createIDBilling, goToLanding, payTax} from '../../state/thunks/common.thunks';
import {isEmpty, result} from 'lodash';
import {validateRequiredFields} from '../../utils/validator.util';
import {confirmGenericBillTypeOne, detailGenericBillTypeOne, silentLoginBillpay} from '../../state/thunks/genericBill.thunks';
import IdBillingFormPayment from '../../components/ETaxJourney/IdBillingFormPayment.component';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const formConfig = {
  form: 'IdBillingFormPayment',
  destroyOnUnmount: true,
  validate: (values) => {
    const errors = validateRequiredFields(values, ['accountNo']);
    return errors;
  },
  onSubmit: (values, dispatch, {isUseSimas, isLogin, biller, billDetails, dataConfirmation}) => {
    const subscriberNo = result(values, 'idBilling', '');
    const etaxAmount = result(billDetails, 'billAmount', 0);
    const isEtax = true;
    const detailGenericBillTypeOneFunc = () => {
      dispatch(detailGenericBillTypeOne({subscriberNo, values, biller, typeVA: billDetails.vaInputMode, uniqueCode: billDetails.uniqueCode, isUseSimas, isEtax, dataConfirmation, etaxAmount: etaxAmount}));
    };
    if (isLogin) {
      dispatch(confirmGenericBillTypeOne({subscriberNo, values, biller, typeVA: billDetails.vaInputMode, isUseSimas, isEtax, dataConfirmation}));
    } else {
      dispatch(silentLoginBillpay(detailGenericBillTypeOneFunc));
    }
  },
};

const mapStateToProps = (state) => ({
  formValues: result(state, 'form.IdBillingFormPayment.values'),
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
  currency: result(state, 'couponCheck.currency', 'simaspoin'),
  isLogin: !isEmpty(result(state, 'user', {})),
});

const mapDispatchToProps = (dispatch) => ({
  createIDBilling: () => dispatch(createIDBilling()),
  setDataConfirmation: (confirmationData) => {
    dispatch(change('IdBillingFormPayment', 'billAmount', confirmationData.amount));
    dispatch(change('IdBillingFormPayment', 'amount', 0));
    dispatch(change('IdBillingFormPayment', 'idBilling', confirmationData.idBilling));
    dispatch(change('IdBillingFormPayment', 'berita', confirmationData.notes));
    dispatch(change('IdBillingFormPayment', 'npwp', confirmationData.npwp));
    dispatch(change('IdBillingFormPayment', 'nama', confirmationData.taxName));
    dispatch(change('IdBillingFormPayment', 'alamat', confirmationData.taxAddress));
    dispatch(change('IdBillingFormPayment', 'nop', confirmationData.nopNumber));
    dispatch(change('IdBillingFormPayment', 'jenisPajak', confirmationData.taxType));
    dispatch(change('IdBillingFormPayment', 'jenisSetoran', confirmationData.depositType));
    dispatch(change('IdBillingFormPayment', 'dateStart', confirmationData.fromDate));
    dispatch(change('IdBillingFormPayment', 'dateEnd', confirmationData.endDate));
    dispatch(change('IdBillingFormPayment', 'tahunPajak', confirmationData.taxYear));
    dispatch(change('IdBillingFormPayment', 'nomorKetetapan', confirmationData.regularityNumber));
    dispatch(change('IdBillingFormPayment', 'jumlahSetor', confirmationData.amount));
    dispatch(change('IdBillingFormPayment', 'terbilang', confirmationData.amountText));
  },
  goHome: () => dispatch(goToLanding()),
  billerAccount: () => dispatch(NavigationActions.navigate({routeName: 'BillerAccount', params: {formName: 'IdBillingFormPayment', fieldName: 'accountNo', sourceType: 'etaxBiller'}})),
  payTax: (data, isBillPay) => dispatch(payTax(data, isBillPay)),

});



const DecoratedForm = reduxForm(formConfig)(IdBillingFormPayment);

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
    payTax: PropTypes.func
  }
  
  payBill = () => {
    const {payTax, isLogin, formValues} = this.props;
    const data = {formValues};
    const isBillPay = !isLogin;
    payTax(data, isBillPay);
  }

  componentWillMount () {
    const {navigation, setDataConfirmation} = this.props;
    const confirmationData = result(navigation, 'state.params.dataConfirmation', {});
    if (confirmationData) {
      setDataConfirmation(confirmationData);
    }
  }

  render () {
    const {navigation, createIDBilling, accounts, formValues, goHome, billerAccount, currency, isLogin} = this.props;
    const paramsData = result(navigation, 'state.params', {});
    const amount = result(formValues, 'jumlahSetor', '');
    const isSyariah = checkShariaAccount(result(formValues, 'accountNo', {})) && currency !== 'simaspoin';
    const isUseSimas = result(formValues, 'accountNo.isUseSimas', '');
    const dataConfirmation = result(paramsData, 'dataConfirmation', {});
    return (
      <DecoratedForm
        currentAmount={amount} {...paramsData}
        createIDBilling={createIDBilling} isSyariah={isSyariah}
        formValues={formValues} isLogin={isLogin}
        goHome={goHome} isUseSimas={isUseSimas} 
        billerAccount={billerAccount}
        accounts={accounts} dataConfirmation={dataConfirmation}
        paramsData={paramsData}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdBillingForm);