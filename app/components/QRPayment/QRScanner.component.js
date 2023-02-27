import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Touchable from '../Touchable.component';
import {SinarmasButtonQr} from '../FormComponents';
import {Text, View, Dimensions, ScrollView, Image, Platform} from 'react-native';
import SimasIcon from '../../assets/fonts/SimasIcon';
import result from 'lodash/result';
import ImagePicker from 'react-native-image-crop-picker';
import {language} from '../../config/language';
import styles from './QRScanner.styles';
import QRCodeScanner from 'react-native-qrcode-scanner';
import qrislogo from '../../assets/images/qrislogoWhite.png';
import {wrapMethodInFunction, getCurrentRouteName} from '../../utils/transformer.util';
import Permissions from 'react-native-permissions';
import {RNCamera} from 'react-native-camera';
import RNQRGenerator from 'rn-qr-generator';
import {Toast} from '../../utils/RNHelpers.util.js';
import {isEmpty} from 'lodash';
import BackgroundTimer from 'react-native-background-timer';
import MyQRCodeOption from './MyQRCodeOption.component';
const totalSeconds = 180;
const SCREEN_WIDTH = Dimensions.get('window').width;

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

class QRScanner extends Component {

  static propTypes = {
    showQR: PropTypes.func,
    isLogin: PropTypes.bool,
    navigation: PropTypes.object,
    showSandTime: PropTypes.bool,
    renewQR: PropTypes.func,
    savingAccounts: PropTypes.array,
    goBack: PropTypes.func,
    onScanQr: PropTypes.func,
    onScanPressed: PropTypes.func,
    onCodePressed: PropTypes.func,
    handleSubmit: PropTypes.func,
    dispatch: PropTypes.func,
    isNewQR: PropTypes.bool,
    dataNewQR: PropTypes.object,
    onGalleryQr: PropTypes.func,
    showPopupQR: PropTypes.func,
    errGallery: PropTypes.func,
    scannerState: PropTypes.bool,
    clearScannerState: PropTypes.func,
    setScannerState: PropTypes.func,
    nav: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    clearCPM: PropTypes.func,
    clearCPMandValues: PropTypes.func,
    isGenerated: PropTypes.bool,
    formValues: PropTypes.object,
    clearGenerated: PropTypes.func,
    changeAccount: PropTypes.func,
    goToExistingQRCPM: PropTypes.func,
    showQRTcico: PropTypes.func,
    tagQrTTS: PropTypes.object,
    hideQRTTS: PropTypes.string
  }

  state = {
    secondsRemaining: 0,
    onScan: true,
    onCode: false,
    isFlashOn: false,
    scanning: true,
    viewFocused: true,
    currentAccountNumber: '',
    currentTotalGenerated: 0,
    checkCounted: 0
  }

  _backQr = () => {
    const {goBack} = this.props;
    this.setState({onScan: true});
    this.setState({onCode: false});
    goBack();
  }

  scanPressed = () => {
    const {clearCPMandValues, dataNewQR, clearGenerated} = this.props;
    this.setState({onScan: true});
    this.setState({onCode: false});
    const minute = this.state.secondsRemaining > 0 ? Math.floor(this.state.secondsRemaining / 60) < 10 ? '0' + Math.floor(this.state.secondsRemaining / 60) : Math.floor(this.state.secondsRemaining / 60) : '00';
    const second = this.state.secondsRemaining > 0 ? (this.state.secondsRemaining % 60) < 10 ? '0' + ((this.state.secondsRemaining % 60)) : ((this.state.secondsRemaining % 60)) : '00';
    const timerShow = minute + ':' + second;
    const data = result(dataNewQR, 'data', '');
    const dataQR = result(dataNewQR, 'dataQR', {});
    const isNewQR = result(dataNewQR, 'isNewQR', false);
    const generated = false;
    const countGenerated = result(dataNewQR, 'addGeneartedTotal', 0);
    clearGenerated(data, dataQR, isNewQR, generated, countGenerated);
    if (timerShow === '00:00') {
      clearCPMandValues();
    }
  }

  reactivateScanner = () => {
    const {setScannerState} = this.props;
    setScannerState();
  }

  componentWillReceiveProps (newProps) {
    const isGenerated = result(newProps, 'dataNewQR.isGenerated', false);
    const {onCode} = this.state;
    if (onCode) {
      const {dataNewQR, clearGenerated} = this.props;
      if (isGenerated) {
        BackgroundTimer.clearInterval(this.interval);
        if (onCode) {
          this.setState({
            secondsRemaining: totalSeconds,
          });
        }
        this.interval = BackgroundTimer.setInterval(this.tick, 1000);
      } else {
        const data = result(dataNewQR, 'data', '');
        const dataQR = result(dataNewQR, 'dataQR', {});
        const isNewQR = result(dataNewQR, 'isNewQR', false);
        const generated = false;
        const countGenerated = result(dataNewQR, 'addGeneartedTotal', 0);
        clearGenerated(data, dataQR, isNewQR, generated, countGenerated);
      }
    }
    
  }

  submit = () => {
    const {dispatch, formValues, dataNewQR, clearGenerated,  ...reduxFormProps} = this.props;
    if (!isEmpty(dataNewQR)) {
      const data = result(dataNewQR, 'data', '');
      const dataQR = result(dataNewQR, 'dataQR', {});
      const isNewQR = result(dataNewQR, 'isNewQR', false);
      const generated = false;
      const countGenerated = result(dataNewQR, 'addGeneartedTotal', 0);
      clearGenerated(data, dataQR, isNewQR, generated, countGenerated);
    }
    const accountNumber = result(formValues, 'accountNo.accountNumber', '');
    const {handleSubmit} = reduxFormProps;
    this.setState({onScan: false});
    this.setState({onCode: true});
    this.setState({currentAccountNumber: accountNumber});
    
    
    dispatch(wrapMethodInFunction(handleSubmit));
  };

  tick = () => {
    const {clearCPM} = this.props;
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      BackgroundTimer.clearInterval(this.interval);
      clearCPM();
    }
  }

  codePressed = () => {
    this.setState({onScan: false});
    this.setState({onCode: true});
  }

  makeSlideOutTranslation (translationType, fromValue) {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * 0.3
      },
      to: {
        [translationType]: fromValue
      }
    };
  }

  triggerFlash = () => {
    const {isFlashOn} =  this.state;
    if (isFlashOn) {
      this.setState({isFlashOn: false});
    } else {
      this.setState({isFlashOn: true});
    }
  }

  openImagePicker = () => {
    const {errGallery, onGalleryQr} = this.props;

    ImagePicker.openPicker({
      compressImageQuality: 0.8,
      width: 500,
      height: 500,
      cropping: true,
      includeBase64: true,
      cropperToolbarTitle: 'Move and Scale',
      mediaType: 'photo',
      cropperActiveWidgetColor: '#FA3F70',
      cropperStatusBarColor: '#FA3F70',
      cropperToolbarColor: '#FA3F70',
      useFrontCamera: true,
      showCropGuidelines: false
    }).then((res) => {
      const PATH_TO_IMAGE = result(res, 'path', '');
      const imageBase64String = result(res, 'data', '');
      RNQRGenerator.detect({
        uri: PATH_TO_IMAGE,
        base64: imageBase64String,
      }).then((response) => {
        const {values} = response;
        const dataQr = result(values, '0', '');
        if (isEmpty(dataQr)) {
          errGallery();
        } else {
          const data = {
            'data': dataQr
          };
          onGalleryQr(data);
        }
      }).catch(() => {
        errGallery();
      });
    });
  }

  choosePic = () => {

    if (Platform.OS === 'android') {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((response) => {
        if (!response) {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((res) => { 
            if (res !== 'granted') {
              Toast.show(language.ERROR_MESSAGE__PERMISSION_PHOTOS);
            } else {
              this.openImagePicker();
            }
          });
        } else {
          this.openImagePicker();
        }
      });
      
    } else {
      Permissions.check('ios.permission.PHOTO_LIBRARY').then((response) => {
        if (response !== 'granted') {
          Permissions.request('ios.permission.PHOTO_LIBRARY').then((response) => {
            if (response !== 'granted') {
              Toast.show(language.ERROR_MESSAGE__PERMISSION_PHOTOS);
            } else {
              this.openImagePicker();
            }
          });
        } else {
          this.openImagePicker();
        }
      });
    }
  }

  handlePress = () => {
    this.setState({scanning: false});
    this.props.clearScannerState();
    this.choosePic();
  }

  handleChange = () => {
    const {dataNewQR, clearGenerated} = this.props;
    const data = result(dataNewQR, 'data', '');
    const dataQR = result(dataNewQR, 'dataQR', {});
    const isNewQR = result(dataNewQR, 'isNewQR', false);
    const generated = false;
    const countGenerated = result(dataNewQR, 'addGeneartedTotal', 0);
    clearGenerated(data, dataQR, isNewQR, generated, countGenerated);
  }

  readQR = (res) => {
    const {onScanQr, scannerState, nav} = this.props;
    this.setState({onScan: true});
    this.setState({onCode: false});
    const currentRouteName = getCurrentRouteName(nav);
    BackgroundTimer.clearInterval(this.interval);
    if (scannerState === true && currentRouteName === 'QRScannerLanding') {
      this.props.clearScannerState();
      onScanQr(res);
    } else {
      this.props.clearScannerState();
      Promise.resolve();
    }
  }

  popupQR = () => {
    const {showPopupQR} = this.props;
    const minute = this.state.secondsRemaining > 0 ? Math.floor(this.state.secondsRemaining / 60) < 10 ? '0' + Math.floor(this.state.secondsRemaining / 60) : Math.floor(this.state.secondsRemaining / 60) : '00';
    const second = this.state.secondsRemaining > 0 ? (this.state.secondsRemaining % 60) < 10 ? '0' + ((this.state.secondsRemaining % 60)) : ((this.state.secondsRemaining % 60)) : '00';
    const timerShow = minute + ':' + second;
    showPopupQR(timerShow);
  }

  render () {
    const {isLogin, dataNewQR, scannerState, setScannerState, nav, goToExistingQRCPM, showQRTcico, tagQrTTS, formValues, hideQRTTS} = this.props;
    let {savingAccounts} = this.props;
    const {onScan, onCode} = this.state;
    const isScanner = getCurrentRouteName(nav) === 'QRScannerLanding';

    let scanner;
    const startScan = () => {
      if (scanner) {
        setScannerState();
        scanner._setScanning(false);
      }
    };
    return (
      <ScrollView scrollEnabled={!!onCode}>
        <View style={ isLogin ? styles.topBgLogin : styles.topBg}>
          <View style={styles.scan}>
            <Touchable onPress={this._backQr}>
              <SimasIcon name={'chevron'} size={25} style={styles.backButton}/>
            </Touchable>
            <Text style={styles.textScan}>{language.EMONEY__DASHBOARD_SCAN}</Text>
          </View>
          { isLogin ?
            <View style={styles.buttonTopContainer}>
              <SinarmasButtonQr onPress={this.scanPressed} style={onScan ? styles.bottonTopStyleLeft : styles.bottonTopStyleLeftTrue}>
                <Text style={ onScan ? styles.textTopScan : styles.textTopScanTrue}>{language.EMONEY__DASHBOARD_SCAN}</Text>
              </SinarmasButtonQr>
              <SinarmasButtonQr onPress={this.codePressed} style={onCode ? styles.bottonTopStyleRightTrue : styles.bottonTopStyleRight}>
                <Text style={onCode ? styles.textTopTrue : styles.textTop}>{language.QR_SCANNER_MYCODE}</Text>
              </SinarmasButtonQr>
            </View> : null
          }
        </View>
        {
          onScan ?  <QRCodeScanner
            reactivateTimeout={7000}
            showMarker
            onRead={this.readQR}
            reactivate={scannerState && isScanner}
            _setScanning={scannerState && isScanner}
            // eslint-disable-next-line react/jsx-no-bind
            ref={(camera) => scanner = camera}
            vibrate={scannerState && isScanner}
            cameraStyle={styles.container}
            customMarker={
              <View style={isLogin ? styles.rectangleContainer : styles.rectangleContainerBl}>
                <View style={styles.topOverlay}>

                  <Text style={{fontSize: 20, color: 'white'}}>
                    {language.QR_SCANNER_BOX_TITLE}
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <View style={styles.leftAndRightOverlay} />

                  <View style={styles.rectangle} />

                  <View style={styles.leftAndRightOverlay} />
                </View>

                <View style={styles.bottomOverlay}>
                  <SinarmasButtonQr onPress={startScan} style={styles.bottonStyleRighta}>
                    <Text style={styles.button}>{language.QR_SCANNER_REACTIVATE}</Text>
                    <SimasIcon name={'auto-debit-filled'} size={28} style={styles.iconFlash}/>
                  </SinarmasButtonQr>
                  <Image source={qrislogo} style={styles.picture}/>
                </View>
              </View>
            }
            flashMode={this.state.isFlashOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}/> 
            : 
            <MyQRCodeOption cpmAccount={savingAccounts} tcicoAccount={savingAccounts} onNextCPM={this.submit} dataNewQR={dataNewQR}
              goToExistingQRCPM={goToExistingQRCPM} showQRTcico={showQRTcico} tagQrTTS={tagQrTTS} formValues={formValues} hideQRTTS={hideQRTTS}/>
          
        }
        {
          onScan ?
            <View style={isLogin ? styles.botContainerLogin : styles.botContainer}>
              <View style={styles.buttonBot}>
                <SinarmasButtonQr onPress={this.handlePress} style={styles.bottonStyleLeft}>
                  <SimasIcon name={'Gallery'} size={20} style={styles.icon}/>
                  <Text style={styles.buttonGallery}>{language.QR_SCANNER_GALLERY}</Text>
                </SinarmasButtonQr>
                <SinarmasButtonQr onPress={this.triggerFlash} style={styles.bottonStyleRight}>
                  <SimasIcon name={'flashlight'} size={28} style={styles.iconFlash2}/>
                  <Text style={styles.button2}>{language.QR_SCANNER_FLASH}</Text>
                </SinarmasButtonQr>
              </View>
            </View>
            : null
        }
        
      </ScrollView>
    );
  }
}

export default QRScanner;
