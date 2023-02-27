import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import DigitalEFormEmailVerificationComp from '../../components/DigitalAccountOpening/DigitalEFormEmailVerification.component';
import {validatePinCodeLength} from '../../utils/validator.util';
import {result} from 'lodash';
import {connect} from 'react-redux';
import {validateEmailToken, resendEmailToken} from '../../state/thunks/digitalAccountOpening.thunks';

const formConfig = {
  form: 'OTPEmail',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {navigation}) => {
    const pageName = result(navigation, 'state.params.pageName', '');
    dispatch(validateEmailToken(pageName));
  },
  validate: (values) => ({
    emailToken: validatePinCodeLength(values['emailToken'])
  })
};

const mapDispatchToProps = (dispatch) => ({
  resendEmailOTP: () => dispatch(resendEmailToken())
});

const mapStateToProps = (state) => ({
  email: result(state, 'form.DigitalEForm.values.email', ''),
  cif: result(state, 'user.profile.customer.cifCode', ''),
  productCode: result(state, 'productCode', '')
});

const EmailForm = reduxForm(formConfig)(DigitalEFormEmailVerificationComp);

class DigitalEFormEmailVerificationPage extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    resendEmailOTP: PropTypes.func,
    email: PropTypes.string,
    cif: PropTypes.string,
    productCode: PropTypes.string
  }

  render () {
    const {navigation, resendEmailOTP, email, cif, productCode} = this.props;
    return (
      <EmailForm navigation={navigation} resendEmailOTP={resendEmailOTP} email={email} cif={cif} productCode={productCode}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DigitalEFormEmailVerificationPage);
