import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import WithdrawalForm from '../../components/QRGpn/QRWithdrawalForm.component';
import {reduxForm} from 'redux-form';
import {QRWithdrawalConfirm, WithdrawalForOther} from '../../state/thunks/QRGpn.thunks';
import result from 'lodash/result';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';
import {validateRequiredFields} from '../../utils/validator.util';


const formConfig = {
  form: 'WithdrawalForm',
  destroyOnUnmount: false,
  validate: (values) => {
    let errors = {
      ...validateRequiredFields(values, ['amountVal', 'accountNo']),
    };
    return {
      ...errors
    };
  },
  onSubmit: (values, dispatch, props) => {
    const {navigation} = props;
    const jsonDt = result(navigation, 'state.params.data');
    dispatch(QRWithdrawalConfirm(values, jsonDt));
  },
};

const FormWithdrawalQR = reduxForm(formConfig)(WithdrawalForm);

class QRWithdrawalForms extends Component {
  static propTypes = {
    QRInvoice: PropTypes.object,
    navigation: PropTypes.object,
    confirmData: PropTypes.func,
    triggerAuth: PropTypes.func,
    setTipAmount: PropTypes.func,
    setAmount: PropTypes.func,
    resetManualTip: PropTypes.func,
    tipManualChange: PropTypes.func,
    tipEnabled: PropTypes.bool,
    accounts: PropTypes.array,
    amountVal: PropTypes.string,
    formValues: PropTypes.object,
    setTip: PropTypes.func,
    changeBank: PropTypes.func,
    WithdrawalForOther: PropTypes.func,
  };


  render () {
    const {navigation = {}, accounts, formValues} = this.props;
    const {triggerAuth, WithdrawalForOther} = this.props;
    return <FormWithdrawalQR navigation={navigation} accounts={accounts} formValues={formValues} triggerAuth={triggerAuth} WithdrawalForOther={WithdrawalForOther}/>;
  }
}

const mapStateToProps = (state) => ({
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.WithdrawalForm.values', {}),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, params) => dispatch(triggerAuthNavigate('register-merchant', amount, true, 'AuthDashboard', params)),
  WithdrawalForOther: () => dispatch(WithdrawalForOther()),
});

const connectedQRInvoice = connect(mapStateToProps, mapDispatchToProps)(QRWithdrawalForms);

export default connectedQRInvoice;
