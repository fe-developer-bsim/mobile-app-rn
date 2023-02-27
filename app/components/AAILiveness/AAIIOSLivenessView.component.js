/* eslint-disable */
import React, {Component} from 'react';
import {StyleSheet, requireNativeComponent, NativeModules, NativeEventEmitter, UIManager, findNodeHandle, Platform} from 'react-native';
import PropTypes from 'prop-types';

let IOSLivenessView; 
if (Platform.OS === 'ios') {
  IOSLivenessView = requireNativeComponent('RNAAILivenessView');
}
export default class AAIIOSLivenessView extends Component {
  static propTypes = {
    onCameraPermissionDenied: PropTypes.func,
    onDetectionComplete: PropTypes.func,
    onDetectionFailed: PropTypes.func,
    livenessViewBeginRequest: PropTypes.func,
    onLivenessViewRequestFailed: PropTypes.func,
    livenessViewEndRequest: PropTypes.func,
    style: PropTypes.style,
    children: PropTypes.object
  }



  static defaultProps = {
        // This field is used to control whether to show the default loading view when sending a network request
    showHUD: true,
        // Sequence of actions detected.
        // eg: ["AAIDetectionTypeMouth", "AAIDetectionTypeBlink", "AAIDetectionTypePosYaw"]
    detectionActions: []
  };

  constructor (props) {
    super(props);
      
      // Callback
    this.sdkEventCallback = {
      onCameraPermission: (errorInfo) => {
        if (errorInfo && !errorInfo.authed) {
          // Permission denied
          if (this.props.onCameraPermissionDenied) {
            this.props.onCameraPermissionDenied(errorInfo.key, errorInfo.message);
          }            
        }
      },
      onDetectionReady: () => {
        // log('onDetectionReady: ', info)
      },
      onFrameDetected: () => {
        // {"key": "xxx", "state": "xxx"}
        // log('onFrameDetected: ', info)
      },
      onDetectionTypeChanged: () => {
        // {"key": "xxx", "state": "xxx"}
        // log('onDetectionTypeChanged: ', info)
      },
      onDetectionComplete: (info) => {
        if (this.props.onDetectionComplete) {
          this.props.onDetectionComplete(info.livenessId, info.img);
        }
      },
      onDetectionFailed: (errorInfo) => {
        // Show alert view
        if (this.props.onDetectionFailed) {
          this.props.onDetectionFailed(errorInfo.key, errorInfo.message);
        }
      },
      livenessViewBeginRequest: (info) => {
        // Show loading view
        if (this.props.livenessViewBeginRequest) {
          this.props.livenessViewBeginRequest();
        }
      },
      onLivenessViewRequestFailed: (errorInfo) => {
        // Auth request failed
        if (this.props.onLivenessViewRequestFailed) {
          this.props.onLivenessViewRequestFailed(errorInfo.code, errorInfo.message);
        }
      },
      livenessViewEndRequest: (errorInfo) => {
        // Close loading view
        if (this.props.livenessViewEndRequest) {
          this.props.livenessViewEndRequest();
        }
      },
    };
    this._onSDKEventCallback = this.onSDKEventCallback.bind(this);
    if (Platform.OS === 'ios') {
      const sdkEmitter = new NativeEventEmitter(NativeModules.RNAAILivenessSDKEvent);
      this.sdkEventListener = sdkEmitter.addListener('RNAAILivenessSDKEvent', this._onSDKEventCallback);
    }
  }
  
  onSDKEventCallback (info) {
    this.sdkEventCallback[info.name](info.body);
  }
  
  componentDidMount () {
    if (Platform.OS === 'ios') {
      // Set screen brightness
      UIManager.dispatchViewManagerCommand(
        this._iosLivenessView,
        UIManager.RNAAILivenessView.Commands.graduallySetBrightness,
        [1]
      );
    }
  }
  
  componentWillUnmount () {
    if (Platform.OS === 'ios') {
      // Resume brightness
      UIManager.dispatchViewManagerCommand(
        this._iosLivenessView,
        UIManager.RNAAILivenessView.Commands.graduallyResumeBrightness, []
      );
      // Reset view state
      UIManager.dispatchViewManagerCommand(
        this._iosLivenessView,
        UIManager.RNAAILivenessView.Commands.rnViewDidDisappear, []
      );
      if (this.sdkEventListener) {
        this.sdkEventListener.remove();
      }
    }
  }
  
  render () {
    return <IOSLivenessView ref={(ref) => { 
      this._iosLivenessView = findNodeHandle(ref); 
    }} style={[styles.container, this.props.style]} {...this.props} >
      {this.props.children}
    </IOSLivenessView>;
  }
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  }
});
  