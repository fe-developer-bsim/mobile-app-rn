import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, destroy} from 'redux-form';
import IdentityForm, {fields} from '../../components/NewToBankOnboarding/IdentityForm.component';
import {NavigationActions} from 'react-navigation';
import {validateRequiredFields, validateDateFormat, validateNumber, validateEmail, validatePostalCodeLength, validatePhoneNumber, validateNameEform, validateIdNumber} from '../../utils/validator.util';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';

const formConfig = {
  form: 'IdentityForm',
  destroyOnUnmount: false,
  initialValues: {
    [fields.FIRST_NAME]: '',
    [fields.LAST_NAME]: '',
    [fields.BIRTH_MONTH]: '',
    [fields.ID_CARD_NUMBER]: '',
    [fields.PHONE]: '',
    [fields.E_MAIL]: '',
    [fields.POSTAL_CODE]: '',
  },
  onSubmit: (values, dispatch, {typeSaving}) => {
    if (typeSaving.value === 'Smartfren Promo') {
      dispatch(NavigationActions.navigate({routeName: 'NewAccountCameraPage', params: {values, typeSaving}}));
    } else {
      dispatch(NavigationActions.navigate({routeName: 'IdentitySecondForm', params: {formData: {formData: values}, typeSaving}}));
    }
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.FIRST_NAME, fields.LAST_NAME, fields.BIRTH_MONTH, fields.ID_CARD_NUMBER, fields.PHONE, fields.E_MAIL, fields.POSTAL_CODE])};
    return {
      birthMonth: validateDateFormat(values.birthMonth),
      firstName: validateNameEform(values.firstName),
      lastName: validateNameEform(values.lastName),
      idCardNumber: validateIdNumber(values.idCardNumber),
      phone: validatePhoneNumber(values.phone),
      postalCode: validateNumber(values.postalCode) || validatePostalCodeLength(values.postalCode),
      email: validateEmail(values.email),
      ...errors
    };
  }
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  destroyForm: () => {
    dispatch(destroy('IdentityForm'));
    dispatch(destroy('IdentityThirdForm'));
  }
});

const RegisterForm = reduxForm(formConfig)(IdentityForm);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(RegisterForm);

class IdentityFormPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    setUsername: PropTypes.func,
    goToForgotPassword: PropTypes.func,
    destroyForm: PropTypes.func,
  }

  componentWillUnmount () {
    this.props.destroyForm();
  }

  onLoginPress = () => {
    this.props.navigation.navigate('RegisterAtm');
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('name' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('date' === typeField) {
      if (isEmpty(validateDateFormat(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('idCardNumber' === typeField) {
      if (isEmpty(validateIdNumber(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('phoneNumber' === typeField) {
      if (isEmpty(validatePhoneNumber(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('postalCode' === typeField) {
      if (isEmpty(validateNumber(val) || validatePostalCodeLength(val))) {
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
    }
  }

  render () {
    const {navigation, goToForgotPassword} = this.props;
    const savingType = result(navigation, 'state.params.savingType', {});
    return (
      <ConnectedForm
        forgotPassword={goToForgotPassword}
        navigation={navigation}
        onLoginPress={this.onLoginPress}
        validationInput={this.validationInput()}
        typeSaving={savingType}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(IdentityFormPage);
export default ConnectedFormPage;
