import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import SavingMissingFormComp, {fields} from '../../components/CreateNewSavingAccount/SavingMissingForm.component';
import {validateRequiredFields, validatePostalCodeLength, validateNumber, validateEmail} from '../../utils/validator.util';
import {isEmpty, result} from 'lodash';
import {createCreditCardForm} from '../../state/thunks/savingAccount.thunks';
import {connect} from 'react-redux';

const formConfig = {
  form: 'SavingMissingForm',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => {
    const pageName = 'SavingAccountForm2';
    const statusForm = 'NEXT';
    const postalCode = result(values, 'postalCode', '');
    const email = result(values, 'email', '');
    dispatch(change('SavingForm2', 'postalCode2', postalCode));
    dispatch(change('EmailForm', 'email', email));
    dispatch(createCreditCardForm(statusForm, pageName));
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.POSTAL_CODE, fields.EMAIL])
    };
    return {
      postalCode: validatePostalCodeLength(values.postalCode) || validateNumber(values.postalCode),
      email: validateEmail(values.email),
      ...errors,
    };
  }
};

const mapDispatchToProps = (dispatch) => ({
  prefilledEmail: (email) => {
    dispatch(change('SavingMissingForm', 'email', email));
  }
});

const mapStateToProps = (state) => ({
  email: result(state, 'user.profile.email', '')
});


const SavingMissingForm = reduxForm(formConfig)(SavingMissingFormComp);

class SavingMissingFormPage extends Component {
  static propTypes = {
    postalCode: PropTypes.string,
    email: PropTypes.string,
    prefilledEmail: PropTypes.func
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('postalCode' === typeField) {
      if (isEmpty(val) || validatePostalCodeLength(val) || validateNumber(val)) {
        return true;
      } else {
        return false;
      }
    } else if ('email' === typeField) {
      if (isEmpty(val) || validateEmail(val)) {
        return true;
      } else {
        return false;
      }
    }
  }

  componentDidMount = () => {
    const {email, prefilledEmail} = this.props;
    prefilledEmail(email);
  }

  render () {
    return (
      <SavingMissingForm validationInput={this.validationInput}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavingMissingFormPage);
