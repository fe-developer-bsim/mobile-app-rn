import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReleaseDeviceQR from '../../components/Profile/ReleaseDeviceQR.component';
import {connect} from 'react-redux';
import {getReleaseDeviceQRRevamp, checkReleaseDeviceStatusRevamp, toReleaseDeviceResult, renewQR} from '../../state/thunks/common.thunks';
import {result} from 'lodash';
import {NavigationActions} from 'react-navigation';
import BackgroundTimer from 'react-native-background-timer';
import * as actionCreators from '../../state/actions/index.actions.js';
import {releaseDeviceSpinner} from '../../utils/storage.util';
import {language} from '../../config/language';
import {totalSeconds} from '../../components/OnboardingJourney/OTPchangeDevice.component';

const mapDispatchToProps = (dispatch) => ({
  goToReleaseDeviceResult: () => {
    dispatch(toReleaseDeviceResult());
  },
  callApiQR: (loginName) => {
    dispatch(getReleaseDeviceQRRevamp(loginName, false, false));
  },
  checkReleaseDevice: () => {
    dispatch(checkReleaseDeviceStatusRevamp());
  },
  showSpinner: () => {
    dispatch(actionCreators.showSpinner());
  },
  hideSpinner: () => {
    dispatch(actionCreators.hideSpinner());
  },
  dispatch: (data) => dispatch(data),
  renewQr: () => dispatch(renewQR())
});

const mapStateToProps = (state) => ({
  code: result(state, 'releaseQR.dataQrShow.getQrCodeMap.randNumCode', ''),
  releaseQR: result(state, 'releaseQR', {}),
  dataReleaseQr: result(state, 'releaseQR', {}),
  checkReleaseQr: result(state, 'releaseQR.dataCheckQr.checkReleaseQRStatusMap', {}),
  dataErr: result(state, 'releaseQR.dataErr', {}),
  isLoading: result(state, 'showSpinner', false),
});

class ReleaseDeviceQRFormClass extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    goToReleaseDeviceResult: PropTypes.func,
    callApiQR: PropTypes.func,
    checkReleaseDevice: PropTypes.func,
    code: PropTypes.object,
    releaseQR: PropTypes.object,
    dataReleaseQr: PropTypes.object,
    checkReleaseQr: PropTypes.object,
    dispatch: PropTypes.func,
    showSpinner: PropTypes.func,
    hideSpinner: PropTypes.func,
    dataErr: PropTypes.object,
    renewQr: PropTypes.func,
    isLoading: PropTypes.bool,
  }

  state = {
    apiTimer: 0,
    timeout: 0, // timeout every call api
    callApiTimer: 0,
    callApi: 0, // call every second
    maxShowQR: 50,
    maxShowTimer: 0,
    maxShowOtpTimer: 0,
    showSandTime: false,
    showCountdown: 0,
    showLoading: false,
    showPopupQR: false,
  }

  tick = () => {
    const {callApiQR, checkReleaseDevice, releaseQR, goToReleaseDeviceResult, showSpinner, dispatch, hideSpinner} = this.props;
    const generateTimeLimit = parseInt(result(releaseQR, 'dataQrShow.getQrCodeMap.generateTimeLimit', '20'));
    this.state.showCountdown > 0 ? this.setState({showCountdown: this.state.showCountdown - 1}) : null;
    const validOTPStatus = result(releaseQR, 'dataCheckQr.responseCode', false) === '00';
    const validQRStatus = result(releaseQR, 'dataCheckQr.responseCode', false) === '00' || result(releaseQR, 'dataCheckQr.responseCode', false) === '03';
    this.checkSpinner();


    const hideAlertPopUp = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      this.setState({showPopupQR: false});
    };

    this.state.showPopupQR ? this.showPopupQR() : null;

    if (this.state.maxShowTimer <= this.state.maxShowQR) {
      if (validQRStatus) {
        this.setState({maxShowOtpTimer: this.state.maxShowOtpTimer + 1});
        if (this.state.maxShowOtpTimer >= (totalSeconds - 1)) {
          hideSpinner();
          this.showAlertOtpFailed();
          dispatch(NavigationActions.back());
          BackgroundTimer.clearInterval(this.interval);
        } else if (validOTPStatus) {
          goToReleaseDeviceResult();
          BackgroundTimer.clearInterval(this.interval);
          hideSpinner();
        } else if (this.state.maxShowOtpTimer !== 0 && this.state.maxShowOtpTimer % 5 === 0) {
          !validOTPStatus && checkReleaseDevice();
        } else {
          showSpinner();
        }
      } else {
        this.setState({showSandTime: false});
        if (this.state.apiTimer === this.state.callApiTimer) {
          (!validOTPStatus && !this.state.showLoading) ? checkReleaseDevice() : null;
          this.setState({callApiTimer: (this.state.callApiTimer + this.state.callApi)});
        }
        this.setState({apiTimer: this.state.apiTimer + 1});
        if (this.state.apiTimer >= this.state.timeout) {
          this.state.showSandTime ? null : callApiQR();
          this.setState({apiTimer: 0});
          this.setState({timeout: generateTimeLimit});
          this.setState({callApiTimer: 0});
        }
        this.setState({maxShowTimer: this.state.maxShowTimer + 1});
      }
    } else {
      this.setState({showLoading: false});
      !validOTPStatus ? checkReleaseDevice() : null;
      if (validQRStatus) {
        !validOTPStatus ? checkReleaseDevice() : null;
        if (validOTPStatus) {
          goToReleaseDeviceResult();
          BackgroundTimer.clearInterval(this.interval);
        }
      } else {
        this.setState({showSandTime: true, showLoading: false});
        dispatch(hideAlertPopUp);
        BackgroundTimer.clearInterval(this.interval);
      }
    }
  }

  componentDidMount = () => {
    const {releaseQR} = this.props;
    const generateTimeLimit = parseInt(result(releaseQR, 'dataQrShow.getQrCodeMap.generateTimeLimit', '20'));
    const checkvalidTimeLimit = parseInt(result(releaseQR, 'checkvalidTimeLimit', '5'));
    const maxShowQR = parseInt(result(releaseQR, 'qrDisplayTime', '300'));
    this.interval = BackgroundTimer.setInterval(this.tick, 1000);
    this.setState({timeout: generateTimeLimit});
    this.setState({callApi: checkvalidTimeLimit});
    this.setState({maxShowQR: maxShowQR});
    this.setState({showCountdown: maxShowQR});
  }

  componentWillUnmount = () => {
    const {dispatch} = this.props;
    BackgroundTimer.clearInterval(this.interval);
    dispatch(actionCreators.saveReleaseDeviceQR({}));
  }

  checkSpinner = () => {
    releaseDeviceSpinner().then((res) => {
      this.setState({showLoading: res});
    });
  }

  showInstructions = () => {
    const {dispatch} = this.props;

    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const modalOptions = {
      button1: language.BUTTON_OK,
      onButton1Press: hideAlert,
      onClose: hideAlert,
      heading1: language.QR_INSTRUCTION_TITLE,
      isInstructions: true,
      text: language.QR_INSTRUCTION_ONE,
      text1: language.QR_INSTRUCTION_TWO,
      text2: language.QR_INSTRUCTION_THREE,
      text3: language.QR_INSTRUCTION_FOUR,
    };
    dispatch(actionCreators.showSinarmasAlert({...modalOptions}));
  }

  showAlertOtpFailed = () => {
    const {dispatch} = this.props;

    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const modalOptions = {
      button1: language.BUTTON_OK,
      onButton1Press: hideAlert,
      onClose: hideAlert,
      heading1: language.OTP__EXPIRE,
      text: language.OTP__EXPIRE_DETAIL,
    };
    dispatch(actionCreators.showSinarmasAlert({...modalOptions}));
  }

  showPopupQR = () => {
    const {dispatch, code} = this.props;

    const minute = this.state.showCountdown > 0 ? Math.floor(this.state.showCountdown / 60) < 10 ? '0' + Math.floor(this.state.showCountdown / 60) : Math.floor(this.state.showCountdown / 60) : '00';
    const second = this.state.showCountdown > 0 ? (this.state.showCountdown % 60) < 10 ? '0' + ((this.state.showCountdown % 60)) : ((this.state.showCountdown % 60)) : '00';
    const timerShow = minute + ':' + second;
    this.setState({showPopupQR: true});

    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      this.setState({showPopupQR: false});
    };
    const modalOptions = {
      onButton1Press: hideAlert,
      onClose: hideAlert,
      valueQR: code,
      timer: timerShow,
      showLoading: this.state.showLoading,
      textTimer: language.TIME_REMAINING_CHANGE_DEVICE,
    };
    dispatch(actionCreators.showSinarmasAlert({...modalOptions, image: 'QR'}));
  }

  render () {
    const {code, goToReleaseDeviceResult, releaseQR, renewQr, isLoading} = this.props;
    const minute = this.state.showCountdown > 0 ? Math.floor(this.state.showCountdown / 60) < 10 ? '0' + Math.floor(this.state.showCountdown / 60) : Math.floor(this.state.showCountdown / 60) : '00';
    const second = this.state.showCountdown > 0 ? (this.state.showCountdown % 60) < 10 ? '0' + ((this.state.showCountdown % 60)) : ((this.state.showCountdown % 60)) : '00';
    const timerShow = minute + ':' + second;

    return <ReleaseDeviceQR
      toReleaseQr={goToReleaseDeviceResult}
      code={this.state.showLoading ? '' : code}
      releaseQR={releaseQR}
      showLoading={this.state.showLoading}
      showSandTime={this.state.showSandTime}
      showCountdown={timerShow}
      renewQR={renewQr}
      showInstructions={this.showInstructions}
      showPopupQR={this.showPopupQR}
      showAlertOtpFailed={this.showAlertOtpFailed}
      isLoading={isLoading}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseDeviceQRFormClass);
