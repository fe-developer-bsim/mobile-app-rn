import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PayComponent from '../../components/Pay/Pay.component';
import {setupPayment, setupPaymentGopay, getBillpayHistory, payByHistory, deleteBillpayHistory, tokenInvoiceHistory} from '../../state/thunks/common.thunks';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {goToSDK as goToSDKThunk, checkEULA} from '../../state/thunks/qrpayment.thunk';
import {PermissionsAndroid} from 'react-native';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';
import {genericBillerNavigate} from '../../utils/genericBiller.util';
import {getFilteredBillerDataRevamp, upperCase} from '../../utils/transformer.util';
import {getFavBiller} from '../../state/thunks/dashboard.thunks';
import isEmpty from 'lodash/isEmpty';
import {messageBillerNK} from '../../state/thunks/genericBill.thunks';


const mapStateToProps = (state) => ({
  currentLanguage: state.currentLanguage,
  userApiKey: result(state, 'userApiKey', ''),
  billerMenuOrderRevamp: result(state, 'config.billerMenuOrderRevamp', []),
  billpayHistory: result(state, 'billpayHistory', {}),
  billerConfig: result(state, 'billerConfig', {}),
  haveEmoney: result(state, 'generateCode', {}),
  flagLKDPurchase: upperCase(result(state, 'config.flag.flagLKDPurchase', 'INACTIVE')) === upperCase('ACTIVE'),
  transactionTypeLKD: result(state, 'config.transactionTypeLKD', {}),
  drawer: result(state, 'drawer', false),
  isLogin: !isEmpty(result(state, 'user', {})),
  cifString: result(state, 'user.profile.customer.cifCode', ''),
});

const mapDispatchToProps = (dispatch) => ({
  setupPaymentGopayForNavigation: (route, isGopay) => {
    dispatch(getFavBiller());
    dispatch(setupPaymentGopay(route, isGopay));
  },
  setupPaymentForNavigation: (route, billerTypeId) => {
    dispatch(getFavBiller());
    dispatch(setupPayment(route, billerTypeId));
  },
  goToQrPayment: () => {
    dispatch(goToSDKThunk());
  },
  checkEULAandNavigate: () => {
    dispatch(checkEULA());
  },
  getBillpayHistory: () => dispatch(getBillpayHistory()),
  deleteBillpayHistory: (history) => () => dispatch(deleteBillpayHistory(history)),
  goToIndex: (biller, subscriberNo, description) => () => {
    dispatch(getFavBiller());
    dispatch(payByHistory(biller, subscriberNo, description));
  },
  goToBiller: (biller) => {
    dispatch(getFavBiller());
    genericBillerNavigate(dispatch, biller);
  },
  toPushInvoiceHistory: () => {
    dispatch(tokenInvoiceHistory());
  },
  messageNK: () => {
    dispatch(messageBillerNK());
  }
});

class PayPage extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    setupPaymentForNavigation: PropTypes.func,
    setupPaymentGopayForNavigation: PropTypes.func,
    goToQrPayment: PropTypes.func,
    userApiKey: PropTypes.string,
    checkEULAandNavigate: PropTypes.func,
    billerMenuOrderRevamp: PropTypes.array,
    goPayNavigateTo: PropTypes.func,
    getBillpayHistory: PropTypes.func,
    billpayHistory: PropTypes.object,
    billerConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    goToIndex: PropTypes.func,
    deleteBillpayHistory: PropTypes.func,
    goToBiller: PropTypes.func,
    haveEmoney: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ]),
    flagLKDPurchase: PropTypes.bool,
    transactionTypeLKD: PropTypes.object,
    toPushInvoiceHistory: PropTypes.func,
    getFavBiller: PropTypes.func,
    drawer: PropTypes.bool,
    isLogin: PropTypes.bool,
    cifString: PropTypes.string,
    messageNK: PropTypes.func
  }

  onBuyMobileTopTop = () => {
    this.props.setupPaymentForNavigation('MobileTopup');
  }

  navigateTo = (routeName, billerTypeId) => () => {
    this.props.setupPaymentForNavigation(routeName, billerTypeId);
  }

  goPayNavigateTo = (routeName, isGopay) => () => {
    this.props.setupPaymentGopayForNavigation(routeName, isGopay);
  }

  goToBiller = (billerName) => () => {
    const {billerConfig} = this.props;
    const biller = getFilteredBillerDataRevamp(billerConfig, billerName)[0];
    this.props.goToBiller(biller);
  }

  onQR = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA).
      then((status) => {
        if ([PermissionsAndroid.RESULTS.GRANTED, true].includes(status)) {
          this.props.checkEULAandNavigate();
        } else {
          Toast.show(language.PERMISSION_ERROR__CONTACTS);
        }
      }).catch(() => {
        Toast.show(language.PERMISSION_ERROR__CONTACTS);
      });
  }
  messageNK = () => () => {
    Toast.show(language.EMONEY__CANNOTGETBILL, Toast.SHORT);
  }

  componentWillMount () {
    this.props.getBillpayHistory();
  }

  render () {
    const {goToQrPayment, billerMenuOrderRevamp, billpayHistory, billerConfig, goToIndex, cifString, isLogin,
      deleteBillpayHistory, getBillpayHistory, haveEmoney, flagLKDPurchase, transactionTypeLKD, drawer, toPushInvoiceHistory} = this.props;
    const billerList = result(billerConfig, 'billerList', []);
    return (
      <PayComponent
        serviceList={this.serviceList}
        navigateTo={this.navigateTo}
        onBuyMobileTopTop={this.onBuyMobileTopTop}
        goToQrPayment={goToQrPayment}
        onQR={this.onQR}
        goPayNavigateTo={this.goPayNavigateTo}
        billerMenuOrder={billerMenuOrderRevamp}
        billpayHistory={billpayHistory}
        billerConfig={billerConfig}
        billerList={billerList}
        goToIndex={goToIndex}
        deleteBillpayHistory={deleteBillpayHistory}
        goToBiller={this.goToBiller}
        reloadHistory={getBillpayHistory}
        haveEmoney={haveEmoney}
        flagLKDPurchase= {flagLKDPurchase}
        transactionTypeLKD= {transactionTypeLKD}
        toPushInvoiceHistory={toPushInvoiceHistory}
        drawer = {drawer}
        isLogin={isLogin}
        cifString={cifString}
        messageNK={this.messageNK}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayPage);
