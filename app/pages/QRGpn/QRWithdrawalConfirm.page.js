import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import QRWithdrawalConfirms from '../../components/QRGpn/QRWithdrawalConfirm.component';
import {reduxForm} from 'redux-form';
import {QRWithdrawalTrx} from '../../state/thunks/QRGpn.thunks';
import result from 'lodash/result';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';


const formConfig = {
  form: 'QRWithdrawalConfirms',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, props) => {
    const {triggerAuth, QRWithdrawalFinal} = props;
    const navParams = result(props, 'navParams', {});
    const amount = parseInt(result(navParams, 'amountVal', 0));
    const params = {onSubmit: QRWithdrawalFinal, amount: amount, isOtp: false};
    dispatch(NavigationActions.navigate({routeName: 'PayScreen', params: {value: values}}));
    triggerAuth(amount, params);
  },
};

const FormWithdrawalQR = reduxForm(formConfig)(QRWithdrawalConfirms);

class QRInvoicePage extends Component {
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
    QRWithdrawalConfirms: PropTypes.func
  };

  QRWithdrawalFinal = () => {
    const {QRWithdrawalConfirms} = this.props;
    QRWithdrawalConfirms();
  }

  render () {
    const {navigation = {}, accounts, formValues} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const {triggerAuth} = this.props;
    return <FormWithdrawalQR navParams={navParams} accounts={accounts} formValues={formValues} triggerAuth={triggerAuth} QRWithdrawalFinal={this.QRWithdrawalFinal}/>;
  }
}

const mapStateToProps = (state) => ({
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.QRWithdrawalConfirms.values', {}),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, params) => dispatch(triggerAuthNavigate('register-merchant', amount, true, 'AuthDashboard', params)),
  QRWithdrawalConfirms: () => dispatch(QRWithdrawalTrx()),
});

const connectedQRInvoice = connect(mapStateToProps, mapDispatchToProps)(QRInvoicePage);

export default connectedQRInvoice;
