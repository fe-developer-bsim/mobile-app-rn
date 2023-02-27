import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, reset} from 'redux-form';
import QRMerchantRegister from '../../components/QRGpn/QRMerchantRegister1.component';
import {result, isEmpty} from 'lodash';
import {getTransferPossibleAccountsNoEmoney} from '../../utils/transformer.util';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {validateRequiredFields} from '../../utils/validator.util';
import {NavigationActions} from 'react-navigation';
import {getParam} from '../../state/thunks/QRGpn.thunks';
import PropTypes from 'prop-types';

const formConfig = {
  form: 'formQRGPN',
  destroyOnUnmount: false,
  initialValues: {
    criteria: '',
  },
  onSubmit: (values, dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'QRMerchantRegister2'}));
  },
  validate: (values) => {

    let errors = {
      ...validateRequiredFields(values, ['netWorth', 'salesPer', 'employeesNo'])
    };
    errors = result(values, 'netWorth.code', '') !== 0 ? {...errors, netWorth: 'Field\'s doesn\'t match'} : {...errors};
    errors = result(values, 'salesPer.code', '') !== 0 ? {...errors, salesPer: 'Field\'s doesn\'t match'} : {...errors};
    errors = result(values, 'employeesNo.code', '') !== 0 ? {...errors, employeesNo: 'Field\'s doesn\'t match'} : {...errors};
    return {
      ...errors
    };
  }
};

const mapStateToProps = (state) => ({
  transRefNum: result(state, 'transRefNum', 0),
  accounts: getTransferPossibleAccountsNoEmoney(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.QRMerchantRegister.values', {}),
  paramsQR: result(state, 'getQRparams', {}),
  formValuesV2: result(state, 'form.formQRGPN.values', {}),
  userMobileNumber: result(state, 'user.profile.mobileNumberMasking', ''),
  criteriaList: result(state, 'getQRparams.criteriaList.0', {}),
  disabled: isEmpty(result(state, 'form.formQRGPN.values.criteria', {}))
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, params) => dispatch(triggerAuthNavigate('qrGPNRegister', amount, true, 'AuthDashboard', params)),
  getParam: () => dispatch(getParam()),
  resetFormQRGPN: () => dispatch(reset('formQRGPN'))
});

const QRMerchantRegisterForm = reduxForm(formConfig)(QRMerchantRegister);

class QRMerchantRegisterPage1 extends React.Component {

  componentDidMount () {
    this.props.getParam();
    this.props.resetFormQRGPN();
  }
  static propTypes = {
    navigation: PropTypes.object,
    QRMerchantUserPage: PropTypes.func,
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    user: PropTypes.object,
    dispatch: PropTypes.func,
    getParam: PropTypes.func,
    paramsQR: PropTypes.object,
    userMobileNumber: PropTypes.string,
    criteriaList: PropTypes.object,
    resetFormQRGPN: PropTypes.func,
    formValuesV2: PropTypes.object,
    disabled: PropTypes.object
  };


  render () {
    const {accounts, formValues, formValuesV2, navigation = {}, QRMerchantUserPage, getParam, paramsQR, userMobileNumber, criteriaList, disabled} = this.props;
    return <QRMerchantRegisterForm navigation={navigation} QRMerchantUserPage={QRMerchantUserPage} accounts={accounts}
      formValues={formValues} formValuesV2={formValuesV2} getParam={getParam} paramsQR={paramsQR} criteriaList={criteriaList} initialValues={{merchantPhone: userMobileNumber}} disabled={disabled}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRMerchantRegisterPage1);
