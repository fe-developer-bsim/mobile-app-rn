import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {goToDiscountInvoice} from '../../state/thunks/common.thunks';
import {NavigationActions} from 'react-navigation';
import result from 'lodash/result';
import {Text, View, Image} from 'react-native';
import styles from './QRScanner.styles';
import {language} from '../../config/language';
import {destroy} from 'redux-form';
import Touchable from '../../components/Touchable.component';
import {goToDiscountQREULA} from '../../state/thunks/common.thunks';
import QRCodeScanner from 'react-native-qrcode-scanner';
import SimasPoin from '../../assets/images/logo-simaspoin.png';

class QRScannerPage extends Component {
  static propTypes = {
    getInvoice: PropTypes.func,
    inputAmount: PropTypes.func,
    destroyForm: PropTypes.func,
    goToDiscountQREULA: PropTypes.func,
  };

  onScan = (res) => {
    const {getInvoice} = this.props;
    getInvoice(res);
  }

  componentWillMount () {
    this.props.destroyForm();
  }

  render () {
    const {goToDiscountQREULA} = this.props;
    return <QRCodeScanner onRead={this.onScan}
      topContent={
        <View>
          <Image style={styles.simaspoin} source={SimasPoin}/>
        </View>}
      bottomContent={
        <View>
          <View><Text style={styles.headerText}>{language.QR_DISCOUNT__SCANNER_TEXT}</Text></View>
          <Touchable onPress={goToDiscountQREULA()}><Text style={styles.buttonText}>{language.QR_DISCOUNT__LEARN_MORE}</Text></Touchable>
        </View>
      }/>;
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  getInvoice: (res) => dispatch(goToDiscountInvoice(res)),
  inputAmount: (res) => dispatch(NavigationActions.navigate({routeName: 'QRInputAmount', params: {qrData: result(res, 'data', {})}})),
  destroyForm: () => {
    dispatch(destroy('QRInputAmount'));
    dispatch(destroy('QRInvoiceData'));
  },
  goToDiscountQREULA: () => () => {
    dispatch(goToDiscountQREULA(true));
  }
});

const connectedQRScannerPage = connect(mapStateToProps, mapDispatchToProps)(QRScannerPage);
export default connectedQRScannerPage;
