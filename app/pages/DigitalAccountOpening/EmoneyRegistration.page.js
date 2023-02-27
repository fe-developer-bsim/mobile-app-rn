import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import EmoneyRegistrationComp, {
  fields,
} from '../../components/DigitalAccountOpening/EmoneyRegistration.component';
import {generateCaptchaOpenProduct as generateCaptchaTransformer} from '../../utils/transformer.util';
import {connect} from 'react-redux';
import {result, isEmpty, startsWith} from 'lodash';
import * as actionCreators from '../../state/actions/index.actions';
import {
  validateRequiredFields,
  validatePhoneNumber,
  validateAlphanumeric,
  validateName,
} from '../../utils/validator.util';
import {checkPhoneNumber} from '../../state/thunks/digitalAccountOpening.thunks';
import {language} from '../../config/language';

// import {Platform} from 'react-native';

const formConfig = {
  form: 'EmoneyRegistrationForm',
  onSubmit: (values, dispatch, {firebaseEmoney}) => {
    dispatch(checkPhoneNumber(firebaseEmoney));
    if (firebaseEmoney === true) {
      // Analytics.logEvent('REGIST_EMONEY', {device: Platform.OS, step_route: '4'});
    }
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [
        fields.NAME,
        fields.PHONE,
        fields.CAPTCHAINPUT,
      ]),
    };
    return {
      phone: validatePhoneNumber(values.phone),
      referralCode: validateAlphanumeric(
        values.referralCode,
        language.VALIDATE__REFERRAL_CODE
      ),
      ...errors
    };
  }
};

const mapDispatchToProps = (dispatch) => ({
  generateCaptcha: () => {
    const captcha = generateCaptchaTransformer();
    return dispatch(actionCreators.setCaptcha(captcha));
  },
  addPromoPhone: (phoneNumber) => {
    dispatch(change('EmoneyRegistrationForm', 'phone', phoneNumber));
  }
});

const mapStateToProps = (state) => ({
  currentLanguage: result(state, 'currentLanguage.id', ''),
  captcha: result(state, 'captcha', ''),
  utmPhone: result(state, 'utmCode.phoneNum', ''),
  utm: result(state, 'utmCode.utm', '')
});

const ConnectedForm = reduxForm(formConfig)(EmoneyRegistrationComp);

class EmoneyRegistration extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    generateCaptcha: PropTypes.func,
    captcha: PropTypes.object,
    addPromoPhone: PropTypes.func,
    utm: PropTypes.string,
    utmPhone: PropTypes.string
  };

  componentWillMount () {
    this.props.generateCaptcha();
  }

  componentDidMount = () => {
    const {utm, utmPhone} = this.props;
    // const firebaseEmoney = result(
    //   navigation,
    //   'state.params.firebaseEmoney',
    //   false
    // );
    if (
      (utm !== '' && utmPhone !== '' && !startsWith(utmPhone, 'NA')) ||
      (utmPhone !== '' && !startsWith(utmPhone, 'NA'))
    ) {
      this.props.addPromoPhone(utmPhone);
    }
    // if (firebaseEmoney === true) {
    //   Analytics.logEvent('REGIST_EMONEY', {device: Platform.OS, step_route: '3'});
    // }
  };

  refreshCaptcha = () => {
    const {generateCaptcha} = this.props;
    generateCaptcha();
  };

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('name' === typeField) {
      if (isEmpty(validateName(val))) {
        return true;
      } else {
        return false;
      }
    }
    if ('phone' === typeField) {
      if (isEmpty(validatePhoneNumber(val))) {
        return true;
      } else {
        return false;
      }
    }
    if ('referralCode' === typeField) {
      if (validateAlphanumeric(val, language.VALIDATE__REFERRAL_CODE)) {
        return true;
      } else {
        return false;
      }
    }
  };

  render () {
    const {captcha, navigation} = this.props;
    const firebaseEmoney = result(
      navigation,
      'state.params.firebaseEmoney',
      false
    );
    const promoAllState = result(navigation, 'state.params.promoFix', '');
    return (
      <ConnectedForm
        validationInput={this.validationInput}
        simasCaptcha={captcha}
        refreshCaptcha={this.refreshCaptcha}
        promoAllState={promoAllState}
        firebaseEmoney={firebaseEmoney}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmoneyRegistration);
