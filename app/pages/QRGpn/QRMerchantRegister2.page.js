import React from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import QRMerchantRegister from '../../components/QRGpn/QRMerchantRegister2.component';
import result from 'lodash/result';
import {getTransferPossibleAccountsNoEmoney} from '../../utils/transformer.util';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {validateRequiredFields, validateNumber, validatePostalCodeLength, validateEmail, validateNikLength, validateNpwpQRGPN, validateNamecashier, validateSiupQRGPN, validateTdpQRGPN} from '../../utils/validator.util';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';

const formConfig = {
  form: 'formQRGPN',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => dispatch(NavigationActions.navigate({routeName: 'QRMerchantRegister3'})),
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, ['merchantName', 'merchantSales', 'businessLine', 'merchantEmail', 'nameOwner', 'nikOwner', 'merchantPhone', 'accountNo'])};
    return {
      postalCode: validateNumber(values.postalCode) || validatePostalCodeLength(values.postalCode),
      merchantEmail: validateEmail(values.merchantEmail),
      merchantSales: validateNumber(values.merchantSales),
      nikOwner: validateNumber(values.nikOwner) || validateNikLength(values.nikOwner),
      merchantNpwp: validateNpwpQRGPN(result(values, 'criteria.value', ''), values.merchantNpwp),
      merchantSiup: validateSiupQRGPN(result(values, 'criteria.value', ''), values.merchantSiup),
      merchantTdp: validateTdpQRGPN(result(values, 'criteria.value', ''), values.merchantTdp),
      merchantName: validateNamecashier(result(values, 'merchantName', '')),
      ...errors
    };
  }
};

const mapStateToProps = (state) => ({
  transRefNum: result(state, 'transRefNum', 0),
  accounts: getTransferPossibleAccountsNoEmoney(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.QRMerchantRegister.values', {}),
  formValuesGPN: result(state, 'form.formQRGPN.values', {}),
  businessLineList: result(state, 'getQRparams.businessLineList', []),
  userMobileNumber: result(state, 'user.profile.mobileNumberMasking', '')
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, params) => dispatch(triggerAuthNavigate('qrGPNRegister', amount, true, 'AuthDashboard', params)),
  dispatch
});

const QRMerchantRegisterForm = reduxForm(formConfig)(QRMerchantRegister);

class QRMerchantRegisterPage2 extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
    QRMerchantUserPage: PropTypes.func,
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    user: PropTypes.object,
    dispatch: PropTypes.func,
    businessLineList: PropTypes.array,
    userMobileNumber: PropTypes.string,
    formValuesGPN: PropTypes.object
  };

  render () {
    const {accounts, formValues, formValuesGPN, navigation = {}, QRMerchantUserPage, businessLineList, userMobileNumber} = this.props;
    return <QRMerchantRegisterForm navigation={navigation} QRMerchantUserPage={QRMerchantUserPage} accounts={accounts} formValues={formValues}
      businessLineList={businessLineList} formValuesGPN={formValuesGPN} userMobileNumber={userMobileNumber}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRMerchantRegisterPage2);
