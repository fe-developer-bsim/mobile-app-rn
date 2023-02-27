import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import {RNCamera} from 'react-native-camera';
import styles from './EForm.styles';
import {Toast} from '../../utils/RNHelpers.util';
import tracker from '../../utils/googleAnalytics.util';
import {connect} from 'react-redux';
import {confirmImage} from '../../state/thunks/EForm.thunks';
import filter from 'lodash/filter';
import {wrapMethodInFunction} from '../../utils/transformer.util';

class EFormCamera extends Component {
  static propTypes = {
    setImage: PropTypes.func,
    page: PropTypes.object, 
    dataUser: PropTypes.object,
    pageName: PropTypes.string, 
    formid: PropTypes.string,
  }

  cameraCapture = (cam) => {
    this.camera = cam;
  };

  takePicture = (dataUser, fieldName, pageName, formid) => {
    const {setImage} = this.props;
    const options = {quality: 0.3, base64: true, fixOrientation: true, forceUpOrientation: true};
    this.camera.takePictureAsync(options).
      then((data) => {
        tracker.trackEvent('CAMERA_CAPTURE', 'CAMERA_CAPTURE_SUCCESS', null, {});
        setImage(dataUser, fieldName, pageName, formid, data);
      }).catch(() => {
        tracker.trackEvent('CAMERA_CAPTURE', 'CAMERA_CAPTURE_FAILED', null, {});
        Toast.show(language.ERROR_MESSAGE__COULD_NOT_TAKE_PICTURE, Toast.LONG);
      });
  }

  render () {
    const {page, dataUser, pageName, formid} = this.props;
    const {fields, header, footer} = page;
    const field = filter(fields, (obj) => obj.component === 'selfieCamera')[0] || fields[0]; // fields that uses camera or the first field if none specified
    const {code: fieldName, ...otherProps} = field;
    !fieldName && alert('no camera fields');

    return (
      <View style={styles.container}>
        <RNCamera
          {...otherProps}
          ref={this.cameraCapture}
          style={styles.preview}
          captureAudio={false}
          type={RNCamera.Constants.Type.front}
        >
          <View style={styles.cameraInfo}>
            {
              !!header && 
              <View style={styles.sideContainerSelfie}>
                <Text style={styles.normalText}>
                  {language[header]}
                </Text>
              </View>
            }
            <View style={styles.capture}>
              {
                !!footer &&
                <View style={styles.mb20}>
                  <Text style={styles.footerText}>
                    {language[footer]}
                  </Text>
                </View>
              }
              <SinarmasButton onPress={wrapMethodInFunction(this.takePicture, dataUser, fieldName, pageName, formid)} text={language.CAMERA__TAKE_PHOTO} />
            </View>
          </View>
        </RNCamera>
      </View>
    );
  }
}

const cameraState = () => ({});

const cameraDispatch = (dispatch) => ({
  setImage: (dataUser, fieldName, pageName, formid, base64) => {
    dispatch(confirmImage(dataUser, fieldName, pageName, formid, base64));
  },
});

const ConnectedEFormCamera = connect(cameraState, cameraDispatch)(EFormCamera);

export default ConnectedEFormCamera;