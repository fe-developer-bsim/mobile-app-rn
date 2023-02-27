import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import TapGenerateCode from '../../components/GenerateCodeJourney/TapGenerateCode.component';
import {result} from 'lodash';
import {NavigationActions} from 'react-navigation';
import {goToGenerateTimeout, checkReleaseDeviceStatus} from '../../state/thunks/generateCode.thunks.js';
import BackgroundTimer from 'react-native-background-timer';

const formConfig = {
  form: 'TapGenerateCode',
  destroyOnUnmount: false,
};

const mapStateToProps = (state) =>  {
  const isSuccess = result(state, 'checkStatusInvoice', {});
  return {
    isSuccess
  };
};

const mapDispatchToProps = (dispatch) => ({
  finish: () => {
    dispatch(NavigationActions.back());
  },
  timeout: (payload, isLogin, code, tipeCode) => {
    dispatch(goToGenerateTimeout(payload, isLogin, code, tipeCode));
  },
  checkReleaseDevice: (code, payload) => {
    dispatch(checkReleaseDeviceStatus(code, payload));
  },
});

const DecoratedForm = reduxForm(formConfig)(TapGenerateCode);

class GenerateCodePage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    generateNewCode: PropTypes.func,
    genCode: PropTypes.func,
    finish: PropTypes.func,
    codes: PropTypes.object,
    timerShow: PropTypes.object,
    checkReleaseDevice: PropTypes.func,
    checkReleaseQr: PropTypes.object,
    releaseQR: PropTypes.object,
    showSpinner: PropTypes.func,
    goToReleaseDeviceResult: PropTypes.func,
    dispatch: PropTypes.func,
    hideSpinner: PropTypes.func,
    isSuccess: PropTypes.bool
  };

  state = {
    apiTimer: 0,
    timeout: 0, // timeout every call api
    callApiTimer: 0,
    callApi: 0, // call every second
    maxShowQR: 299,
    maxShowTimer: 0,
    maxShowOtpTimer: 0,
    showSandTime: false,
    showCountdown: 0,
    showLoading: false,
    showPopupQR: false,
  }

  tick = () => {
    const {checkReleaseDevice, checkReleaseQr, navigation} = this.props;
    const code = result(navigation, 'state.params.code');
    const payload = result(navigation, 'state.params.payload');
    this.state.showCountdown > 0 ? this.setState({showCountdown: this.state.showCountdown - 1}) : null;
    const validOTPStatus = result(checkReleaseQr, 'validOTPStatus', false);
    this.state.showPopupQR ? this.showPopupQR() : null;

    if (this.state.maxShowTimer <= this.state.maxShowQR) {
      this.setState({showSandTime: false});
      if (this.state.apiTimer === this.state.callApiTimer) {
        (!validOTPStatus && !this.state.showLoading) ? checkReleaseDevice(code, payload) : null;
        this.setState({callApiTimer: (this.state.callApiTimer + this.state.callApi)});
      } else {
        this.setState({showLoading: false});
        checkReleaseDevice(code, payload);
        this.setState({showSandTime: true, showLoading: false});
        if (this.state.apiTimer === 299 || this.state.maxShowTimer === 299) {
          BackgroundTimer.clearInterval(this.interval);
        }
      }
      this.setState({apiTimer: this.state.apiTimer + 1});
      this.setState({maxShowTimer: this.state.maxShowTimer + 1});
    }
  }
  componentDidMount = () => {
    const {releaseQR} = this.props;
    const generateTimeLimit = parseInt(result(releaseQR, 'generateTimeLimit', '299'));
    const checkvalidTimeLimit = parseInt(result(releaseQR, 'checkvalidTimeLimit', '299'));
    const maxShowQR = parseInt(result(releaseQR, 'qrDisplayTime', '299'));
    this.interval = BackgroundTimer.setInterval(this.tick, 1000);
    this.setState({timeout: generateTimeLimit});
    this.setState({callApi: checkvalidTimeLimit});
    this.setState({maxShowQR: maxShowQR});
    this.setState({showCountdown: maxShowQR});
  }

  componentWillUnmount = () => {
    BackgroundTimer.clearInterval(this.interval);
  }

  componentWillReceiveProps (newProps) {
    const respoonseCodeSuccess = result(newProps, 'isSuccess.responseCode', false);
    if (respoonseCodeSuccess === true) {
      BackgroundTimer.clearInterval(this.interval);
    } else if (this.state.callApiTimer < 0 || this.state.callApi < 0) {
      BackgroundTimer.clearInterval(this.interval);
    }
  }

  render () {
    const {navigation, finish, timerShow, checkReleaseDevice, isSuccess} = this.props;
    const code = result(navigation, 'state.params.code', '');
    return <DecoratedForm
      navigation = {navigation}
      finish={finish}
      codes={code}
      timerShow={timerShow}
      checkReleaseDevice={checkReleaseDevice}
      isSuccess={isSuccess}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenerateCodePage);