import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import result from 'lodash/result';
import ResetPaswword, {fields} from '../../components/OnboardingJourney/RegisterByPhoneFinal.component';
import {NavigationActions} from 'react-navigation';
import {validateRequiredString, validateIdNumber} from '../../utils/validator.util';
import isEmpty from 'lodash/isEmpty';
import {validateKtpDobResetPassword} from '../../state/thunks/common.thunks';

const formConfig = {
  form: 'registerByPhoneFormFinal',
  destroyOnUnmount: true,
  initialValues: {
    [fields.IDNUMBER]: '',
    [fields.BIRTHDATE]: '',
  },
  onSubmit: (values, dispatch, {mobileNumber}) => {
    dispatch(validateKtpDobResetPassword(values, mobileNumber));
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredString(values, [fields.BIRTHDATE, fields.IDNUMBER])};
    return {
      idCard: validateIdNumber(values.idCard),
      ...errors
    };
  }
};

const ResetPasswordForm = reduxForm(formConfig)(ResetPaswword);

const mapStateToProps = (state) => ({
  currentLanguage: result(state, 'currentLanguage', ''),
});

const mapDispatchToProps = (dispatch) => ({
  goToAtmRegistration: () => {
    dispatch(NavigationActions.navigate({routeName: 'RegisterAtm'}));
  },
});

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);

class ResetPasswordscreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    forgotPassword: PropTypes.func,
    destroy: PropTypes.func,
    regisATM: PropTypes.string,
    goToAtmRegistration: PropTypes.func,
    isLockedDevice: PropTypes.bool,
  }

  goRegister = () => {
    this.props.navigation.navigate('RegisterAtm');
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('idCard' === typeField) {
      if (isEmpty(validateIdNumber(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  render () {
    const {navigation} = this.props;
    const mobileNumber = result(navigation, 'state.params.mobileNumber', '');
    return (
      <ConnectedForm
        mobileNumber={mobileNumber}
        goRegister={this.goRegister}
        goToAtmRegistration={this.props.goToAtmRegistration}
        validationInput={this.validationInput}
      />);
  }
}

const ConnectedLoginscreen = connect(mapStateToProps, mapDispatchToProps)(ResetPasswordscreen);

export default ConnectedLoginscreen;
