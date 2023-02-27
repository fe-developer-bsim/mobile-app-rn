import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import EasyPinVerifyForm from '../../components/Account/EasyPinChangeDevice.component';
import {resetEasyPinFromVerify} from '../../state/thunks/onboarding.thunks';
import {updateReleaseDeviceQRRevamp} from '../../state/thunks/common.thunks';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {validatePinCodeLength} from '../../utils/validator.util';

const formConfig = {
  form: 'easyPinChangeDeviceForm',
  destroyOnUnmount: false,
  initialValues: {
    easyPin: '',
  },
  onSubmit: (values, dispatch, {randNumCode, deviceInfo}) => dispatch(updateReleaseDeviceQRRevamp({randNumCode, values}, deviceInfo)),
  validate: (values) => ({
    easyPin: validatePinCodeLength(values['easyPin'])
  }),
};

const mapStateToProps = ({currentLanguage}) => ({currentLanguage});

const mapDispatchToProps = (dispatch) => ({
  forgotEasyPin: (maskedUsername) => {
    dispatch(resetEasyPinFromVerify(maskedUsername));
  }
});

const DecoratedForm = reduxForm(formConfig)(EasyPinVerifyForm);

class EasyPinVerify extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    forgotEasyPin: PropTypes.func,
  }

  goToResetEasyPin = () => () => {
    const maskedUsername = result(this.props.navigation, 'state.params.maskedUsername', '');
    this.props.forgotEasyPin(maskedUsername);
  }

  render () {
    const isOBM = result(this.props.navigation, 'state.params.isOBM', '');
    const randNumCode = result(this.props.navigation, 'state.params.sourceType', '');
    const deviceInfo = result(this.props.navigation, 'state.params.deviceInfo', '');
    return (
      <DecoratedForm forgotEasyPin={this.goToResetEasyPin} isOBM={isOBM} randNumCode={randNumCode} deviceInfo={deviceInfo}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EasyPinVerify);
