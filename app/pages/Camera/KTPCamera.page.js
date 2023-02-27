import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Platform} from 'react-native';
import CameraView from '../../components/Camera/KTPCamera.component';
import result from 'lodash/result';
import {reduxForm, change} from 'redux-form';
import {checkFlipImage} from '../../utils/transformer.util';
import {goToCaptcha, goToCaptchaETB} from '../../state/thunks/onboarding.thunks';
import {showSpinner, hideSpinner} from '../../state/actions/index.actions';
import {triggerAuthNavigate, upgradeEmoneyKyc} from '../../state/thunks/common.thunks';


const formConfig = {
  form: 'CameraKTPForm',
  onSubmit: (values, dispatch, {action, isLockedDevice, params, formData, savingType, dataCust, signatureCust, upgradeEmoney, triggerAuth, upgradeKYC, amount}) => {
    const image = result(values, 'imageData.base64', '');
    const currentPlatform = Platform.OS;
    const orientationCode = '0';
    const flipImage = checkFlipImage(result(values, 'imageData.pictureOrientation', ''), currentPlatform);
    const dataID = {image, orientationCode, params, isLockedDevice, action, flipImage};
    const paramsData = {formData, typeSaving: savingType, dataID, dataCust, signatureCust};  
    if (upgradeEmoney) {
      const params = {onSubmit: upgradeKYC(dataID), amount, isEasypin: true, isOtp: false};
      dispatch(triggerAuth(amount, params));
    } else {
      if (isLockedDevice) {
        dispatch(goToCaptchaETB(paramsData, dataID));
      } else {
        dispatch(goToCaptcha(paramsData, dataID));
      }
      
    }
  }
};

const ConnectedForm = reduxForm(formConfig)(CameraView);

class CameraPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    transRefNum: PropTypes.string,
    userId: PropTypes.number,
    resendBillPayOTP: PropTypes.func,
    setImage: PropTypes.func,
    showSpinner: PropTypes.func,
    hideSpinner: PropTypes.func,
    triggerAuth: PropTypes.func,
    upgradeKYC: PropTypes.func,
    isLockedDevice: PropTypes.bool
  }
  static defaultProps = {
    image: ''
  }

  componentDidMount () {
    this.props.showSpinner();
    setTimeout(() => {
      this.props.hideSpinner();
    }, 3000);
    
   
  }
 

  render () {
    const {setImage, navigation, triggerAuth, upgradeKYC, isLockedDevice} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const formData = result(navigation, 'state.params.values', {});
    const savingType = result(navigation, 'state.params.savingType', {});
    const dataCust = result(navigation, 'state.params.formData.data', {});
    const signatureCust = result(navigation, 'state.params.signature', '');
    const upgradeEmoney = result(navigation, 'state.params.emoneyUpgrade', false);
    return (
      <ConnectedForm
        setImage={setImage}
        camera={this.camera}
        takePicture={this.takePicture}
        formData={formData}
        savingType={savingType}
        dataCust={dataCust}
        signatureCust={signatureCust}
        upgradeEmoney={upgradeEmoney}
        triggerAuth={triggerAuth}
        upgradeKYC={upgradeKYC}
        isLockedDevice={isLockedDevice}
        {...navParams}/>
    );
  }
}

const mapStateToProps = (state) => ({
  image: result(state, 'form.CameraKTPForm.value.image', ''),
  isLockedDevice: Boolean(state.appInitKeys && state.appInitKeys.username && state.appInitKeys.tokenClient && state.appInitKeys.tokenServer),

});

const mapDispatchToProps = (dispatch) => ({
  setImage: (data) => {
    dispatch(change('CameraKTPForm', 'imageData', data));
  },
  showSpinner: () => {
    dispatch(showSpinner());
  },
  hideSpinner: () => {
    dispatch(hideSpinner());
  },
  upgradeKYC: (dataId) => {
    dispatch(upgradeEmoneyKyc(dataId));
  },
  triggerAuth: (billAmounts, params) => dispatch(triggerAuthNavigate('upgradeKyc', null, false, 'AuthDashboard', params)),
 
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraPage);
