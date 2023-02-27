import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import {RNCamera} from 'react-native-camera';
import styles from './KTPCamera.style';
import {Toast} from '../../utils/RNHelpers.util';
import tracker from '../../utils/googleAnalytics.util';

class CameraView extends Component {
  static propTypes = {
    camera: PropTypes.func,
    takePicture: PropTypes.func,
    setImage: PropTypes.func,
    cameraConfirm: PropTypes.func,
    handleSubmit: PropTypes.func,
    idType: PropTypes.string,
    triggerAuth: PropTypes.func,

  }

  cameraCapture = (cam) => {
    this.camera = cam;
  };

  takePicture = () => {
    const {setImage} = this.props;
    const options = {quality: 0.7, base64: true, fixOrientation: true, forceUpOrientation: true};
    this.camera.takePictureAsync(options).
      then((data) => {
        tracker.trackEvent('CAMERA_CAPTURE', 'CAMERA_CAPTURE_SUCCESS', null, {});
        setImage(data);

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
        >
          <View style={styles.cameraInfo}>
            <View style={styles.topContainer}/>
            <View style={styles.middleContainer}>
              <View style={styles.sideContainer}>
                <Text style={styles.leftText}>
                  {language.CAMERA__OPEN_ACCOUNT_KTP_INFO}
                </Text>
              </View>
              <View style={styles.sideContainer}>
                <Text style={styles.rightText}>
                  {language.CAMERA__OPEN_ACCOUNT_KTP_TITLE}
                </Text>
              </View>
            </View>
            <View style={styles.capture}>
              <SinarmasButton onPress={this.takePicture} text={language.CAMERA__TAKE_PHOTO} />
            </View>
          </View>
        </RNCamera>

      </View>
    );
  }
}

export default CameraView;
