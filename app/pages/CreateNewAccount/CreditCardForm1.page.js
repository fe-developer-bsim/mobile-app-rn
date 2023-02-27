import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import CreditCard, {fields} from '../../components/CreateNewAccount/CreditCardForm1.component';
import {validateRequiredFields, validateRequiredStringDOB, validateNumber, validateNameEform,
  validateIdNumber, validate21yearsold, validateKtpDukcapil} from '../../utils/validator.util';
import {connect} from 'react-redux';
import {result, isEmpty, find} from 'lodash';
import {checkKtpDukcapil} from '../../state/thunks/ccEform.thunks';
import {hideSpinner, saveOpenAccountData} from '../../state/actions/index.actions.js';

const formConfig = {
  form: 'CCForm1',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {navigation}) => {
    const value = result(navigation, 'state.params.value', {});
    dispatch(checkKtpDukcapil(navigation, value));
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.KTP_NUMBER, fields.MARITAL_STATUS, fields.MOTHERS_MAIDEN])
    };
    const validationFormat = {
      ...validateRequiredStringDOB(values, [fields.BIRTH_DATE])
    };
    return {
      mothersMaiden: validateNameEform(values.mothersMaiden),
      ktpId: validateKtpDukcapil(values.ktpId),
      birthDate: validate21yearsold(values.birthDate, new Date(), result(values.maritalStatus, 'code', 0)),
      ...validationFormat,
      ...errors,
    };
  }
};

const mapStateToProps = (state) => ({
  ktpId: result(state, 'form.CCForm1.values.ktpId', ''),
  maritalStatusList: result(state, 'configEForm.listConfigEform.maritalStatus', []),
  maritalStatus: result(state, 'form.CCForm1.values.maritalStatus', {}),
  accountList: result(state, 'accounts', []),
  phoneNumber: result(state, 'openAccountData.mobileNumber', '')
});

const mapDispatchToProps = (dispatch) => ({
  hideSpinner: () => dispatch(hideSpinner()),
  prefilledMobileNumber: (mobileNumber) => {
    dispatch(saveOpenAccountData({mobileNumber}));
  }
});

const CreditCardForm = reduxForm(formConfig)(CreditCard);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(CreditCardForm);

class CreditCardForm1 extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    statusForm: PropTypes.string,
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
    const {navigation, maritalStatusList} = this.props;
    return (
      <ConnectedForm
        navigation={navigation}
        validationInput={this.validationInput()}
        maritalStatusList={maritalStatusList}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(CreditCardForm1);
export default ConnectedFormPage;
