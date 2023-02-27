import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import {RNCamera} from 'react-native-camera';
import styles from './EmoneyCamera.styles';
import {Toast} from '../../utils/RNHelpers.util';
import tracker from '../../utils/googleAnalytics.util';

class EmoneySelfieCamera extends Component {
  static propTypes = {
    camera: PropTypes.func,
    takePicture: PropTypes.func,
    setImage: PropTypes.func
  }

  cameraCapture = (cam) => {
    this.camera = cam;
  };

  takePicture = () => {
    const {setImage} = this.props;
    const options = {quality: 0.3, base64: true, fixOrientation: true, forceUpOrientation: true};
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
          type={RNCamera.Constants.Type.front}
        >
          <View style={styles.cameraInfo}>
            <View style={styles.sideContainerSelfie}>
              <Text style={styles.normalText}>
                {language.CAMERA__SELFIE_WITH_KTP}
              </Text>
            </View>
            <View style={styles.capture}>
              <View style={styles.mb20}>
                <Text style={styles.footerText}>
                  {language.CAMERA__SELFIE_WITH_KTP_FOOTER}
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

export default EmoneySelfieCamera;