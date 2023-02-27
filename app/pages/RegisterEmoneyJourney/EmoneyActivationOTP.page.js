import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import EMoneyActivationOTP from '../../components/RegisterEmoneyJourney/EmoneyActivationOTP.component';
import {
  resendOtpActivation,
  verifyOtpActivation,
  verifyOtpResetPassword,
} from '../../state/thunks/onboarding.thunks';
import result from 'lodash/result';
import {validatePinCodeLength} from '../../utils/validator.util';
import {connect} from 'react-redux';
import {moreInfo} from '../../state/thunks/common.thunks';

// import {Platform} from 'react-native';

const formConfig = {
  form: 'ActivationOTP',
  destroyOnUnmount: true,
  initialValues: {
    OTP: ''
  },
  onSubmit: (
    values,
    dispatch,
    {navigation, typeActivation, firebaseEmoney}
  ) => {
    const emailToken = result(
      navigation,
      'state.params.payload.tokenEmail',
      ''
    );
    const transRefNum = result(navigation, 'state.params.transRefNum', '');
    const unmaskedMobileNum = result(
      navigation,
      'state.params.unmaskedMobileNum',
      ''
    );
    const noCard = result(navigation, 'state.params.noCard', false);
    if (typeActivation === '003') {
      dispatch(
        verifyOtpResetPassword(
          emailToken,
          transRefNum,
          typeActivation,
          unmaskedMobileNum,
          noCard
        )
      );
    } else {
      dispatch(
        verifyOtpActivation(
          emailToken,
          transRefNum,
          firebaseEmoney,
          typeActivation
        )
      );
      if (firebaseEmoney === true) {
        // const os = Platform.OS;
        // Analytics.logEvent('REGIST_EMONEY', {device: os, step_route: '5'});
      }
    }
  },
  validate: (values) => ({
    OTP: validatePinCodeLength(values.OTP)
  })
};

const mapStateToProps = ({currentLanguage, transRefNum}) => ({
  currentLanguage,
  transRefNum
});

const mapDispatchToProps = (dispatch) => ({
  resendOTP: (payload) => dispatch(resendOtpActivation(payload)),
  moreInfo: () => dispatch(moreInfo()),
});

const DecoratedForm = reduxForm(formConfig)(EMoneyActivationOTP);

class OTPScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    transRefNum: PropTypes.string,
    setOTP: PropTypes.func,
    resendOTP: PropTypes.func,
    moreInfo: PropTypes.func,
    currentLanguage: PropTypes.object,
  };

  componentDidMount () {
    const {navigation} = this.props;
    const firebaseEmoney = result(
      navigation,
      'state.params.firebaseEmoney',
      false
    );
    if (firebaseEmoney === true) {
      // const os = Platform.OS;
      // Analytics.logEvent('REGIST_EMONEY', {device: os, step_route: '4'});
    }
  }

  render () {
    const {
      navigation,
      transRefNum = '',
      resendOTP,
      moreInfo,
      currentLanguage,
    } = this.props;
    const TXID = result(navigation, 'state.params.TXID', '');
    const currentLang = result(currentLanguage, 'id', '');
    const phoneNumber = result(navigation, 'state.params.mobileNumber', '');
    const typeActivation = result(
      navigation,
      'state.params.typeActivation',
      ''
    );
    const firebaseEmoney = result(
      navigation,
      'state.params.firebaseEmoney',
      false
    );
    return (
      <DecoratedForm
        navigation={navigation}
        resendOTP={resendOTP}
        setOTP={this.props.setOTP}
        phoneNumber={phoneNumber}
        transRefNum={transRefNum}
        TXID={TXID}
        moreInfo={moreInfo}
        currentLanguage={currentLang}
        typeActivation={typeActivation}
        firebaseEmoney={firebaseEmoney}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OTPScreen);
