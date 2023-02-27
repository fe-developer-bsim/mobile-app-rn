import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EmoneyUpgradeCameraComp from '../../components/EmoneyJourney/EmoneyUpgradeCamera.component';
import {connect} from 'react-redux';
import {result} from 'lodash';
import {upgradeKYCNew} from '../../state/thunks/emoney.thunks';
import {checkCameraPermission} from '../../state/thunks/emoney.thunks';
import {NavigationActions} from 'react-navigation';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
// import firebase from 'react-native-firebase';
// import {Platform} from 'react-native';
// let Analytics = firebase.analytics();

const mapStateToProps = (state) => ({
  imageKTP: result(state, 'form.CameraKTPForm.values.imageData', {}),
  imageKTPSelfie: result(state, 'form.CameraSelfieKTPForm.values.imageData', {}),
  imageSelfie: result(state, 'form.CameraSelfieForm.values.imageData', {}),
  emailValid: result(state, 'form.OTPEmail.values.emailValid', false)
});

const mapDispatchToProps = (dispatch) => ({
  upgradeKYC: () => {
    // const os = Platform.OS;
    // Analytics.logEvent('UPGRADE_EMONEY', {device: os, step_route: '9'});
    dispatch(upgradeKYCNew());
  },
  goToCamera: (routeName) => () => dispatch(checkCameraPermission(routeName)),
  goToEmailVerification: () => dispatch(NavigationActions.navigate({routeName: 'EmoneyUpgradeEmailForm'})),
  triggerAuth: (params) => dispatch(triggerAuthNavigate('upgradeEmoney', 0, true, 'EmoneyUpgradeAuth', params)),
});

class EmoneyUpgradeCamera extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    goToCamera: PropTypes.func,
    goToEmailVerification: PropTypes.func,
    imageKTP: PropTypes.object,
    imageKTPSelfie: PropTypes.object,
    imageSelfie: PropTypes.object,
    emailValid: PropTypes.bool,
    upgradeKYC: PropTypes.func,
    triggerAuth: PropTypes.func
  }

  componentDidMount () {
    // const {navigation} = this.props;
    // const firebaseEmoney = result(navigation, 'state.params.firebaseEmoney', false);

    // if (firebaseEmoney === true) {
    //   const os = Platform.OS;
    //   Analytics.logEvent('UPGRADE_EMONEY', {device: os, step_route: '3'});
    // }
  }

  upgradeKYCNew = () => {
    const {upgradeKYC, triggerAuth} = this.props;
    const params = {onSubmit: upgradeKYC, amount: 0, isOtp: false};
    triggerAuth(params);
  }

  render () {
    const {goToCamera, goToEmailVerification, imageKTP, imageKTPSelfie, imageSelfie, emailValid} = this.props;
    return (
      <EmoneyUpgradeCameraComp
        backToHome={this.backToHome}
        goToCamera={goToCamera}
        goToEmailVerification={goToEmailVerification}
        imageKTP={imageKTP}
        imageKTPSelfie={imageKTPSelfie}
        imageSelfie={imageSelfie}
        emailValid={emailValid}
        upgradeKYC={this.upgradeKYCNew}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmoneyUpgradeCamera);