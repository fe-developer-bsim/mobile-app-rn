import React from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import QRMerchantRegister from '../../components/QRGpn/QRMerchantRegister4.component';
import result from 'lodash/result';
import {getTransferPossibleShariaAccounts} from '../../utils/transformer.util';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {validateRequiredFields, validateNumber, validatePostalCodeLength, validatePhoneNumber, validateNamecashier} from '../../utils/validator.util';
import {availUsername, QRRegisterConfirmation, availStorename} from '../../state/thunks/QRGpn.thunks';
import PropTypes from 'prop-types';

const formConfig = {
  form: 'formQRGPN',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => dispatch(QRRegisterConfirmation()),
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, ['cashierName', 'loginCashierName', 'securityPhone'])};
    return {
      postalCode: validateNumber(values.postalCode) || validatePostalCodeLength(values.postalCode),
      securityPhone: validatePhoneNumber(values.securityPhone) || validateNumber(values.securityPhone),
      cashierName: validateNamecashier(result(values, 'cashierName', '')),
      ...errors
    };
  }
};

const mapStateToProps = (state) => ({
  transRefNum: result(state, 'transRefNum', 0),
  accounts: getTransferPossibleShariaAccounts(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.QRMerchantRegister.values', {}),
  status: result(state, 'usernameAvailability.status', ''),
  nameStatus: result(state, 'storenameAvailability.nameStatus', ''),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, params) => dispatch(triggerAuthNavigate('qrGPNRegister', amount, true, 'AuthDashboard', params)),
  availUsername: () => {
    dispatch(availUsername());
  },
  availStorename: () => () => {
    dispatch(availStorename());
  },
  confirmation: (isRegisterStore, isRegisterTerminal, merchantId, terminal_id, pan) => dispatch(QRRegisterConfirmation(isRegisterStore, isRegisterTerminal, merchantId, terminal_id, pan)),
  dispatch
});

const QRMerchantRegisterForm = reduxForm(formConfig)(QRMerchantRegister);

class QRMerchantRegisterPage4 extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
    QRMerchantUserPage: PropTypes.func,
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    user: PropTypes.object,
    dispatch: PropTypes.func,
    setPasporWNI: PropTypes.string,
    setPasporWNA: PropTypes.string,
    availUsername: PropTypes.func,
    status: PropTypes.bool,
    confirmation: PropTypes.func,
    availStorename: PropTypes.func,
    nameStatus: PropTypes.bool,
  };


  render () {
    const {accounts, formValues, navigation = {}, QRMerchantUserPage, availUsername, status, confirmation, availStorename, nameStatus} = this.props;
    return <QRMerchantRegisterForm navigation={navigation} QRMerchantUserPage={QRMerchantUserPage} accounts={accounts} formValues={formValues} availUsername={availUsername} status={status} confirmation={confirmation} availStorename={availStorename} nameStatus={nameStatus}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRMerchantRegisterPage4);
