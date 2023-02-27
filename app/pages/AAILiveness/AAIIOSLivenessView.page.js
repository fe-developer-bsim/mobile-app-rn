/* eslint-disable */;
import React, {Component} from 'react';
import {StyleSheet, NativeModules} from 'react-native';
// 1. Import SDK (react-native >= 0.60)
// import AAIIOSLivenessView from 'react-native-aaiios-liveness-sdk';
// Import SDK (react-native < 0.60)
import AAIIOSLivenessView from '../../components/AAILiveness/AAIIOSLivenessView.component';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {result} from 'lodash';
import {getLivenessIdIOS} from '../../state/thunks/digitalAccountOpening.thunks';
import {NavigationActions} from 'react-navigation';
import {Toast} from '../../utils/RNHelpers.util.js';
import env from '../../config/env.config';

class AAIIOS extends Component {
  state = {
    message: '--',
    version: '',
    rootPage: true,
    errCode: '',
    errKey: ''
  };

  constructor (props) {
    super(props);
    
    // 2. Init SDK. eg: NativeModules.RNAAILivenessSDK.init("abcdef1234567890", "1234567890abcdef", "AAILivenessMarketIndonesia")
    //
    // Market available value are as follows
    // "AAILivenessMarketIndonesia"
    // "AAILivenessMarketIndia"
    // "AAILivenessMarketPhilippines"
    // "AAILivenessMarketVietnam"
    // "AAILivenessMarketThailand"
    if (env.ENV === 'dev') {
        NativeModules.RNAAILivenessSDK.init('2ccbe59580579d6b', '8506c186a6c87e31', 'AAILivenessMarketIndonesia');
    } else {
        NativeModules.RNAAILivenessSDK.init('8cde198e6671d0ee', '511f41ea2fc8eb34', 'AAILivenessMarketIndonesia');
    }

  }
  static propTypes = {
    goToPreviousPage: PropTypes.func,
    goToBackPage: PropTypes.func,
    navigation: PropTypes.object
  }

  componentDidMount () {
    // Get SDK version
    NativeModules.RNAAILivenessSDK.sdkVersion((message) => {
      this.setState({
        version: message,
      });
    });
  }

  render () {
    const {navigation} = this.props;
    const pageCode = result(navigation, 'state.params.pageCode', '');

    return <AAIIOSLivenessView showHUD={true} style={styles.sdkContent}
    onCameraPermissionDenied={(errorKey, errorMessage) => {
      this.setState({
        rootPage: true,
        message: errorMessage,
        errKey: errorKey
      });
    }}

    livenessViewBeginRequest={() => {
      return Promise.resolve();
    }}

    livenessViewEndRequest={() => {
      return Promise.resolve();
    }}

    onDetectionComplete={(livenessId) => {
      this.setState({
        rootPage: true,
        message: livenessId
      });
      // case success
      this.props.goToNextPage(pageCode, livenessId);
    }}

    onDetectionFailed={(errorCode, errorMessage) => {
      this.setState({
        rootPage: true,
        message: errorMessage,
        errCode: errorCode
      });
      // case gagal
      Toast.show(errorMessage, Toast.LONG);
      this.props.goToBackPage();
    }}

    onLivenessViewRequestFailed={(errorCode, errorMessage) => {
      this.setState({
        rootPage: true,
        message: errorMessage,
        errCode: errorCode
      });
      // case gagal
      Toast.show(errorMessage, Toast.LONG);
      this.props.goToBackPage();
    }}
  />;
  }
}
const mapDispatchToProps = (dispatch) => ({
  goToNextPage: (pageCode, livenessId) => {
    dispatch(getLivenessIdIOS(pageCode, livenessId));
  },
  goToBackPage: () => {
    dispatch(NavigationActions.back());
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  sdkContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  }
});

export default connect(null, mapDispatchToProps)(AAIIOS);