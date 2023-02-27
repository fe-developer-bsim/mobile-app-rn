import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {destroy} from 'redux-form';
import result from 'lodash/result';
import {Text, View} from 'react-native';
import styles from './QRScanner.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {NavigationActions} from 'react-navigation';
import {deviceInfo} from '../../utils/device.util';

class LoginChangeDevice extends Component {
  static propTypes = {
    getInvoice: PropTypes.func,
    inputAmount: PropTypes.func,
    destroyForm: PropTypes.func,
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    updateReleaseDeviceQRRevamp: PropTypes.func,

  };

  onScan = (stringQr) => {
    const {updateReleaseDeviceQRRevamp} = this.props;
    updateReleaseDeviceQRRevamp(deviceInfo, result(stringQr, 'data', ''));
  }

  render () {
    return <QRCodeScanner
      cameraStyle={styles.containerDevice}
      onRead={this.onScan}
      bottomContent={
        <View style={styles.botStyle}>
          <SimasIcon style={styles.iconBottom} name={'caution-circle'} size={25} />
          <Text style={styles.textBottom} >{language.QR_RELEASE_SCANN_NOTICE}</Text>
        </View>
      }
    />;
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  updateReleaseDeviceQRRevamp: (deviceInfo, dataQr) => {
    dispatch(NavigationActions.reset({
      index: 2,
      actions: [
        NavigationActions.navigate({routeName: 'Login'}),
        NavigationActions.navigate({routeName: 'AccountSettings'}),
        NavigationActions.navigate({routeName: 'EasyPinChangeDevice', params: {deviceInfo, sourceType: dataQr}})
      ]
    }));
    dispatch(destroy('easyPinChangeDeviceForm'));
  }
    
});

const connectedLoginChangeDevice = connect(mapStateToProps, mapDispatchToProps)(LoginChangeDevice);
export default connectedLoginChangeDevice;
