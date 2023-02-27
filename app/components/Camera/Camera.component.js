import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import {RNCamera} from 'react-native-camera';
import styles from './Camera.style';
import {Toast} from '../../utils/RNHelpers.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import tracker from '../../utils/googleAnalytics.util';

class CameraView extends Component {
  static propTypes = {
    camera: PropTypes.func,
    takePicture: PropTypes.func,
    action: PropTypes.string,
    setImage: PropTypes.func,
    cameraConfirm: PropTypes.func,
    handleSubmit: PropTypes.func
  }

  cameraCapture = (cam) => {
    this.camera = cam;
  };

  takePicture = () => {
    const {setImage, handleSubmit} = this.props;
    const options = {quality: 0.7, base64: true, fixOrientation: true, forceUpOrientation: true};
    this.camera.takePictureAsync(options).
      then((data) => {
        tracker.trackEvent('CAMERA_CAPTURE', 'CAMERA_CAPTURE_SUCCESS', null, {});
        setImage(data);
        handleSubmit();
      }).catch(() => {
        tracker.trackEvent('CAMERA_CAPTURE', 'CAMERA_CAPTURE_FAILED', null, {});
        Toast.show(language.ERROR_MESSAGE__COULD_NOT_TAKE_PICTURE, Toast.LONG);
      });
  }

  render () {
    const {action} = this.props;
    const isRegister = action === 'Register' || action === 'RegisterExisting' || action === 'RegisterLockdown' || action === 'RegisterDrawer';
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          {
            isRegister ?
              <View>
                <Text style={styles.title}>{language.CAMERA__TITLE}</Text>
                <Text style={styles.subtitle}>{language.CAMERA__SUBTITLE}</Text>
              </View>
              :
              <Text style={styles.title}>{language.CAMERA__LOGIN}</Text>
          }

        </View>
        <View style={styles.cameraView}>
          <RNCamera
            ref={this.cameraCapture}
            style={styles.preview}
            mirrorImage={true}
            type={RNCamera.Constants.Type.front}
            base64={true}
            captureAudio={false}
          >
            <View style={styles.borderContainer}>
              <View style={styles.border}/>
            </View>
          </RNCamera>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.iconContainer}>
            <SimasIcon style={styles.iconColor} name='caution-circle' size={24}/>
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.info}>{language.CAMERA__INFO}</Text>
          </View>
        </View>
        <View style={styles.capture}>
          <SinarmasButton onPress={this.takePicture} text={isRegister ? language.CAMERA__TAKE_PHOTO : language.CAMERA__LOGIN_BUTTON} />
        </View>
      </View>
    );
  }
}

export default CameraView;
