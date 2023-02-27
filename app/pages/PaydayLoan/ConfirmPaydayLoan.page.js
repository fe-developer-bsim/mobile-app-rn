import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import IdentityForm from '../../components/PaydayLoan/ConfirmPaydayLoan.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {paydayLoanDisburse} from '../../state/thunks/PaydayLoan.thunks';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {NavigationActions} from 'react-navigation';

const formConfig = {
  form: 'PaydayLoanIndexForm',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {triggerAuth, payBill, amount}) => {
    const params = {onSubmit: payBill, amount, isOtp: true};
    triggerAuth(amount, params);
  }
};

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
  setAmount: (amount) => dispatch(change('PaydayLoanIndexForm', 'amountPayloan', amount)),
  paydayLoanDisburse: (data) => dispatch(paydayLoanDisburse(data)),
  triggerAuth: (billAmount, params) => dispatch(triggerAuthNavigate('paydayloan', billAmount, false, 'AuthDashboard', params)),
  goToFinalize: () => dispatch(NavigationActions.navigate({routeName: 'FinalizePaydayLoan'})),
});

const RegisterForm = reduxForm(formConfig)(IdentityForm);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(RegisterForm);

class IdentityFormPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    setAmount: PropTypes.func,
    payGenericBillTypeNine: PropTypes.func,
    triggerAuth: PropTypes.func,
    goToFinalize: PropTypes.func,
    paydayLoanDisburse: PropTypes.func,
    state: PropTypes.object,
  }

  onLoginPress = () => {
    this.props.navigation.navigate('RegisterAtm');
  }

  payBill = () => {
    const {navigation, paydayLoanDisburse} = this.props;
    const navparams = result(navigation, 'state.params', {});
    paydayLoanDisburse(navparams);
  }

  render () {
    const {navigation, triggerAuth, state} = this.props;
    const name = result(state, 'paydayLoanData.data.nama_sesuai_identitas', '');
    const numberAccount = result(state, 'paydayLoanData.data.nomor_rek_payroll', '');
    const dataForm = result(navigation, 'state.params.paydayLoanForm', {});
    const amountLoan = result(navigation, 'state.params.amountLoan', '');
    const amountPayloan = result(navigation, 'state.params.paydayLoanForm.amountPayloan', '');
    const amount = amountLoan ? amountLoan : amountPayloan;
    return (
      <ConnectedForm
        navigation={navigation}
        onLoginPress={this.onLoginPress}
        dataForm={dataForm}
        payBill={this.payBill}
        triggerAuth={triggerAuth}
        amountLoan={amountLoan}
        amount={amount}
        name={name}
        numberAccount={numberAccount}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(IdentityFormPage);
export default ConnectedFormPage;
