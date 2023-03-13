import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {StackActions, NavigationActions} from 'react-navigation';
import result from 'lodash/result';
import {Text, View, Image} from 'react-native';
import styles from './QRScanner.styles';
import {language} from '../../config/language';
import {destroy} from 'redux-form';
import * as actionCreators from '../../state/actions/index.actions.js';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {
  getInvoiceDetail,
  invoiceGPN,
  saveQrData,
} from '../../state/thunks/qrpayment.thunk';
import QrisLogo from '../../assets/images/qrislogo.png';
import DimoLogo from '../../assets/images/pay_by_qr.png';

class QRScanner extends Component {
  static propTypes = {
    getInvoice: PropTypes.func,
    inputAmount: PropTypes.func,
    destroyForm: PropTypes.func,
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    getInvoiceDIMO: PropTypes.func,
  };

  onScan = res => {
    const tlvLeng = result(res, 'data', {}).length;
    const {getInvoice, dispatch} = this.props;
    saveQrData({});

    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'PayScreen'})],
      }),
    );

    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };

    const modalOptions = {
      button1: 'OK',
      onButton1Press: hideAlert,
      closeOnTouchOutside: true,
      onClose: hideAlert,
      heading1: 'heading',
      text: 'text',
    };

    if (tlvLeng > 0 && tlvLeng !== '') {
      const is63 = result(res, 'data', {}).substring(tlvLeng - 8, tlvLeng - 6);
      if (is63 === '63') {
        return getInvoice(res); // ke scann payment
      } else {
        dispatch(
          actionCreators.showSinarmasAlert({
            ...modalOptions,
            heading1: language.QR_GPN_NOT_REGISTERED_QR,
            text: language.QR_GPN_NOT_REGISTERED_QR_TEXT,
          }),
        );
      }
    } else {
      dispatch(
        actionCreators.showSinarmasAlert({
          ...modalOptions,
          heading1: language.QR_GPN_FAIL_READ,
          text: language.QR_GPN_FAIL_READ_TEXT,
        }),
      );
    }
  };

  componentWillMount() {
    this.props.destroyForm();
  }

  render() {
    return (
      <QRCodeScanner
        onRead={this.onScan}
        cameraStyle={styles.container}
        reactivate={true}
        reactivateTimeout={7000}
        topContent={
          <View style={styles.topStyle}>
            <Text style={styles.headerText}>
              {language.PAY_BY_QR__POINT_T0_PAY}
            </Text>
          </View>
        }
        bottomContent={
          <View style={styles.detailContainer}>
            <Text style={styles.extraText}>{language.SCAN_QR__TITLE_2}</Text>
            <View style={styles.botStyle}>
              <Image style={styles.iconSize2} source={DimoLogo} />
              <Image style={styles.iconSize} source={QrisLogo} />
            </View>
          </View>
        }
      />
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  getInvoice: res => dispatch(invoiceGPN(res)),
  getInvoiceDIMO: res => dispatch(getInvoiceDetail(res)),
  inputAmount: res =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'QRInputAmount',
        params: {qrData: result(res, 'data', {})},
      }),
    ),
  destroyForm: () => {
    dispatch(destroy('QRInputAmount'));
  },
  dispatch: res => dispatch(res),
});

const connectedQRCustomer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QRScanner);
export default connectedQRCustomer;
