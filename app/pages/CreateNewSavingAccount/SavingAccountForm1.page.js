import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import SavingAccount, {fields} from '../../components/CreateNewSavingAccount/SavingAccountForm1.component';
import {validateRequiredFields, validateRequiredString, validateNumber, validateNameEform, validateIdNumber, validate17yearsold, validateKtpDukcapil} from '../../utils/validator.util';
import {connect} from 'react-redux';
import {isEmpty, result, find} from 'lodash';
import {hideSpinner, saveOpenAccountData} from '../../state/actions/index.actions.js';
import {checkKtpDukcapil} from '../../state/thunks/savingAccount.thunks';

const formConfig = {
  form: 'SavingForm1',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {navigation}) => {
    dispatch(checkKtpDukcapil(navigation));
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.KTP_NUMBER, fields.MARITAL_STATUS, fields.MOTHERS_MAIDEN])
    };
    const validationFormat = {
      ...validateRequiredString(values, [fields.BIRTH_DATE])
    };
    return {
      mothersMaiden: validateNameEform(values.mothersMaiden),
      ktpId: validateKtpDukcapil(values.ktpId),
      ...validationFormat,
      ...errors,
    };
  }
};

const mapStateToProps = (state) => ({
  serverTime: result(state, 'timeConfig.serverTime', ''),
  dateValue: result(state, 'form.SavingForm1.values.birthDate', ''),
  ktpId: result(state, 'form.SavingForm1.values.ktpId', ''),
  maritalStatusList: result(state, 'configEForm.listConfigEform.maritalStatus', []),
  maritalStatus: result(state, 'form.SavingForm1.values.maritalStatus', {}),
  accountList: result(state, 'accounts', []),
  phoneNumber: result(state, 'openAccountData.mobileNumber', '')
});

const mapDispatchToProps = (dispatch) => ({
  hideSpinner: () => dispatch(hideSpinner()),
  prefilledMobileNumber: (mobileNumber) => {
    dispatch(saveOpenAccountData({mobileNumber}));
  }
});

const SavingAccountForm = reduxForm(formConfig)(SavingAccount);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(SavingAccountForm);

class SavingAccountForm1 extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    statusForm: PropTypes.string,
    serverTime: PropTypes.string,
    dateValue: PropTypes.oneOfType([PropTypes.string, PropTypes.date]),
    hideSpinner: PropTypes.func,
    maritalStatusList: PropTypes.array,
    maritalStatus: PropTypes.object,
    accountList: PropTypes.array,
    prefilledMobileNumber: PropTypes.func,
    phoneNumber: PropTypes.string
  }

  componentDidMount () {
    const {accountList, prefilledMobileNumber, phoneNumber} = this.props;
    const isEmoney = find(accountList, {accountType: 'emoneyAccount'});
    const emoneyAccount = result(isEmoney, 'accountNumber', '');
    const mobileNumber = emoneyAccount.substring(2, emoneyAccount.length);
    if (phoneNumber === '') {
      prefilledMobileNumber(mobileNumber.toString());
    }

    setTimeout(() => {
      this.props.hideSpinner();
    }, 3000);
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('ktpId' === typeField) {
      if (isEmpty(validateNumber(val) || validateIdNumber(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('maritalStatus' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('mothersMaiden' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  render () {
    const {navigation, serverTime, dateValue, maritalStatusList} = this.props;
    const err = validate17yearsold(dateValue, serverTime);
    const disabled = err !== '';
    return (
      <ConnectedForm
        navigation={navigation}
        validationInput={this.validationInput()}
        serverTime={serverTime}
        err={err}
        maritalStatusList={maritalStatusList}
        disabled={disabled}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(SavingAccountForm1);
export default ConnectedFormPage;
