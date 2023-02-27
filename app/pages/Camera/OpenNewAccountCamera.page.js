import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Platform} from 'react-native';
import {connect} from 'react-redux';
import CameraView from '../../components/Camera/OpenNewAccountCamera.component';
import result from 'lodash/result';
import {reduxForm, change} from 'redux-form';
import {goSignature, goSignatureETB} from '../../state/thunks/onboarding.thunks';
import {checkFlipImage} from '../../utils/transformer.util';
import {showSpinner, hideSpinner} from '../../state/actions/index.actions';

const formConfig = {
  form: 'CameraCustForm',
  onSubmit: (values, dispatch, {action, isLockedDevice, params, formData, savingType}) => {
    const image = result(values, 'imageData.base64', '');
    const currentPlatform = Platform.OS;
    const orientationCode = '0';
    const flipImage = checkFlipImage(result(values, 'imageData.pictureOrientation', ''), currentPlatform);
    const data = {image, orientationCode, params, isLockedDevice, action, flipImage};
    const dataAll = {formData, savingType};
    if (isLockedDevice) {
      dispatch(goSignatureETB(dataAll, data));
    } else {
      dispatch(goSignature(dataAll, data));
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
    sendOtp: PropTypes.func,
    showSpinner: PropTypes.func,
    hideSpinner: PropTypes.func,
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
    const {setImage, navigation, isLockedDevice} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const formData = result(navigation, 'state.params.values', {});
    const savingType = result(navigation, 'state.params.typeSaving', {});
    return (
      <ConnectedForm
        setImage={setImage}
        camera={this.camera}
        takePicture={this.takePicture}
        formData={formData}
        savingType={savingType}
        isLockedDevice={isLockedDevice}
        {...navParams}/>
    );
  }
}

const mapStateToProps = (state) => ({
  image: result(state, 'form.CameraCustForm.value.image', ''),
  isLockedDevice: Boolean(state.appInitKeys && state.appInitKeys.username && state.appInitKeys.tokenClient && state.appInitKeys.tokenServer),
});

const mapDispatchToProps = (dispatch) => ({
  setImage: (data) => {
    dispatch(change('CameraCustForm', 'imageData', data));
  },
  showSpinner: () => {
    dispatch(showSpinner());
  },
  hideSpinner: () => {
    dispatch(hideSpinner());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraPage);
