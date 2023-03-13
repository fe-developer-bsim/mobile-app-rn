import React from 'react';
import PropTypes from 'prop-types';
import LoginPreference from '../../components/Profile/LoginPreference.component';
import {connect} from 'react-redux';
import {
  faceRecogEULA,
  fingerPrintEULA,
  changeFingerprintOff,
  changeFaceRecognitionOff,
} from '../../state/thunks/profile.thunks';
import result from 'lodash/result';
import {StackActions, NavigationActions} from 'react-navigation';

const mapStateToProps = state => ({
  isFaceRegistered: result(state, 'isFaceRegistered.isFaceRegistered', false),
  isUsingFaceRecog: result(state, 'faceRecognition', false),
  isUsingFingerprint: result(state, 'fingerprint', false),
  hasFingerprint: result(state, 'hasFingerprint', false),
  isFaceRecogEnabled: result(state, 'config.isFaceRecognitionEnabled', false),
});

const mapDispatchToProps = dispatch => ({
  usingFaceRecogUpdate: usingFaceRecog =>
    dispatch(faceRecogEULA(usingFaceRecog)),
  usingFingerprintUpdate: usingFingerprint =>
    dispatch(fingerPrintEULA(usingFingerprint)),
  navigateToFaceRecogEula: (usingFaceRecog, isSearch) => {
    dispatch(
      StackActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({
            routeName: isSearch ? 'Landing' : 'HomeScreen',
          }),
          NavigationActions.navigate({
            routeName: 'FaceRecogEULA',
            params: {usingFaceRecog, isSearch},
          }),
        ],
      }),
    );
  },
  navigateToFingerPrintEULA: (usingFingerprint, isSearch) => {
    dispatch(
      StackActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({
            routeName: isSearch ? 'Landing' : 'HomeScreen',
          }),
          NavigationActions.navigate({
            routeName: 'FingerPrintEULA',
            params: {usingFingerprint, isSearch},
          }),
        ],
      }),
    );
  },
  changeFaceRecognitionOff: usingFaceRecog => {
    dispatch(changeFaceRecognitionOff(usingFaceRecog));
  },
  changeFingerprintOff: usingFingerprint => {
    dispatch(changeFingerprintOff(usingFingerprint));
  },
});
class LoginPreferencePage extends React.Component {
  static propTypes = {
    isFaceRegistered: PropTypes.bool,
    usingFaceRecogUpdate: PropTypes.func,
    usingFingerprintUpdate: PropTypes.func,
    navigateToFaceRecogEula: PropTypes.func,
    changeFaceRecognitionOff: PropTypes.func,
    navigateToFingerPrintEULA: PropTypes.func,
    changeFingerprintOff: PropTypes.func,
    isUsingFingerprint: PropTypes.bool,
    isUsingFaceRecog: PropTypes.bool,
    navigation: PropTypes.object,
  };

  updateFaceSetting = () => {
    const {
      navigateToFaceRecogEula,
      changeFaceRecognitionOff,
      isUsingFaceRecog,
    } = this.props;
    const usingFaceRecog = !isUsingFaceRecog;
    const isSearch = result(
      this.props.navigation,
      'state.params.isSearch',
      false,
    );
    if (usingFaceRecog) {
      navigateToFaceRecogEula(usingFaceRecog, isSearch);
    } else {
      changeFaceRecognitionOff(usingFaceRecog);
    }
  };

  updateFingerSetting = () => {
    const {
      navigateToFingerPrintEULA,
      changeFingerprintOff,
      isUsingFingerprint,
    } = this.props;
    const usingFingerprint = !isUsingFingerprint;
    const isSearch = result(
      this.props.navigation,
      'state.params.isSearch',
      false,
    );
    if (usingFingerprint) {
      navigateToFingerPrintEULA(usingFingerprint, isSearch);
    } else {
      changeFingerprintOff(usingFingerprint);
    }
  };

  render() {
    const isSearch = result(
      this.props.navigation,
      'state.params.isSearch',
      false,
    );
    return (
      <LoginPreference
        updateFaceSetting={this.updateFaceSetting}
        updateFingerSetting={this.updateFingerSetting}
        restartApp={this.restartApp}
        isSearch={isSearch}
        {...this.props}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPreferencePage);
