import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import {RNCamera} from 'react-native-camera';
import styles from './CameraSelfieRetake.style';
import {Toast} from '../../utils/RNHelpers.util';
import tracker from '../../utils/googleAnalytics.util';
import {connect} from 'react-redux';
import {confirmImageRetakeOpeningAccount} from '../../state/thunks/openingAccount.thunks';

class EFormCamera extends Component {
  static propTypes = {
    camera: PropTypes.func,
    takePicture: PropTypes.func,
    setImage: PropTypes.func,
    cameraConfirm: PropTypes.func,
    handleSubmit: PropTypes.func,
    idType: PropTypes.string,
    triggerAuth: PropTypes.func,
    dataAccount: PropTypes.object
  }

  cameraCapture = (cam) => {
    this.camera = cam;
  };

  takePicture = () => {
    const {setImage, dataAccount} = this.props;
    const options = {quality: 0.7, base64: true, fixOrientation: true, forceUpOrientation: true};
    this.camera.takePictureAsync(options).
      then((data) => {
        tracker.trackEvent('CAMERA_CAPTURE', 'CAMERA_CAPTURE_SUCCESS', null, {});
        setImage(data, dataAccount);
      }).catch(() => {
        tracker.trackEvent('CAMERA_CAPTURE', 'CAMERA_CAPTURE_FAILED', null, {});
        Toast.show(language.ERROR_MESSAGE__COULD_NOT_TAKE_PICTURE, Toast.LONG);
      });
  }

  render () {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={this.cameraCapture}
          style={styles.preview}
          captureAudio={false}
          type={RNCamera.Constants.Type.front}
        >
          <View style={styles.cameraInfo}>
            <View style={styles.sideContainerSelfie}>
              <Text style={styles.normalText}>
                Take a selfie
              </Text>
            </View>
            <View style={styles.capture}>
              <View style={styles.mb20}>
                <Text style={styles.footerText}>
                  Make sure your face\nis inside the box and clearly captured
                </Text>
              </View>
              <SinarmasButton onPress={this.takePicture} text={language.CAMERA__TAKE_PHOTO} />
            </View>
          </View>
        </RNCamera>

      </View>
    );
  }
}

const cameraState = () => ({});

const cameraDispatch = (dispatch) => ({
  setImage: (base64, dataAccount) => {
    dispatch(confirmImageRetakeOpeningAccount(base64, dataAccount));
  },
});

const ConnectedEFormCamera = connect(cameraState, cameraDispatch)(EFormCamera);

export default ConnectedEFormCamera;
