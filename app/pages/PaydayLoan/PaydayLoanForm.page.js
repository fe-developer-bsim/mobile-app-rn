import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import PaydayLoanForm, {fields} from '../../components/PaydayLoan/PaydayLoanForm.component';
import {NavigationActions} from 'react-navigation';
import {validateRequiredFields, validatePhoneNumber, validateNumber, validateEmail, validatePostalCodeLength, validateNpwpLength} from '../../utils/validator.util';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';

const formConfig = {
  form: 'PaydayLoanForm',
  destroyOnUnmount: false,
  initialValues: {
    [fields.NPWP]: '',
    [fields.E_MAIL]: '',
    [fields.POSTAL_CODE]: '',
    [fields.CITY]: '',
  },
  onSubmit: (values, dispatch, {amountLoan}) => {
    dispatch(NavigationActions.navigate({routeName: 'ConfirmPaydayLoan', params: {values: values, amountLoan: amountLoan}}));
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.NPWP, fields.E_MAIL, fields.POSTAL_CODE, fields.CITY])};
    return {
      npwp: validatePhoneNumber(values.npwp) || validateNpwpLength(values.npwp),
      postalCode: validateNumber(values.postalCode) || validatePostalCodeLength(values.postalCode),
      email: validateEmail(values.email),
      ...errors
    };
  }
};

const RegisterForm = reduxForm(formConfig)(PaydayLoanForm);

class PaydayLoanFormPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    setUsername: PropTypes.func,
    paydayLoanData: PropTypes.object,
    setEmail: PropTypes.func,
    setNPWP: PropTypes.func,
    setCity: PropTypes.func,
    setPostalCode: PropTypes.func
  }

  state={
    isEmailDisabled: false,
    isNPWPDisabled: false,
    isPostalCodeDisabled: false,
    isDatiDisabled: false
  }
  onLoginPress = () => {
    this.props.navigation.navigate('RegisterAtm');
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('npwp' === typeField) {
      if (isEmpty(validatePhoneNumber(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('email' === typeField) {
      if (isEmpty(validateEmail(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('postalCode' === typeField) {
      if (isEmpty(validatePostalCodeLength(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  render () {
    const {navigation} = this.props;
    const configPostal = result(navigation, 'state.params.configPostal.configPostal', []);
    const amountLoan = result(navigation, 'state.params.paydayLoanForm.amountPayloan', '');
    return (
      <RegisterForm
        navigation={navigation}
        onLoginPress={this.onLoginPress}
        validationInput={this.validationInput()}
        amountLoan={amountLoan}
        configPostal={configPostal}
        isDatiDisabled={this.state.isDatiDisabled}
        isEmailDisabled={this.state.isEmailDisabled}
        isNPWPDisabled={this.state.isNPWPDisabled}
        isPostalCodeDisabled={this.state.isPostalCodeDisabled}/>
    );
  }
}

export default PaydayLoanFormPage;
