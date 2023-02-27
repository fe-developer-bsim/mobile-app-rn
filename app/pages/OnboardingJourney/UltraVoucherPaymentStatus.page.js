import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import UltraVoucherPaymentStatus from '../../components/OnboardingJourney/UltraVoucherPaymentStatus.component';
import {setDirtyMiniStatement, clearPaymentStatus} from '../../state/actions/index.actions';
import {NavigationActions} from 'react-navigation';
import {hidePaymentModal} from '../../state/actions/index.actions.js';
import {goToEasyPinUltraVoucher, goToLogin, gotoOrderHistorySimasCatalog} from '../../state/thunks/digitalStore.thunks';
import {result, isEmpty} from 'lodash';
import moment from 'moment';
import {currencyFormatter} from '../../utils/transformer.util';
import {Platform} from 'react-native';
let adjustAndroid;

if (Platform.OS === 'android') {
  adjustAndroid = require('react-native-adjust');
}

const mapStateToProps = (state) => ({
  data: result(state, 'paymentStatus', {}),
  cif: result(state, 'user.profile.customer.cifCode', ''),
});

const mapDispatchToProps = (dispatch) => ({
  onClose: () => {
    dispatch(setDirtyMiniStatement(true));
    dispatch(NavigationActions.back());
    dispatch(hidePaymentModal());
    dispatch(clearPaymentStatus());
  },

  onCheckout: (orderNumber, isLogin) => {
    if (isLogin) {
      dispatch(goToEasyPinUltraVoucher(orderNumber));
    } else {
      dispatch(goToLogin('ultravoucher', orderNumber));
    }
  },
  goToOrderHistory: (merchant) => dispatch(gotoOrderHistorySimasCatalog(merchant))

});

class PaymentStatusPage extends React.Component {
  static propTypes = {
    onClose: PropTypes.func,
    data: PropTypes.object,
    onCheckout: PropTypes.func,
    cif: PropTypes.string,
    goToOrderHistory: PropTypes.func
  }

  componentDidMount = () => {
    const {cif} = this.props;
    let adjustEvent;
    if (Platform.OS === 'android') {
      adjustEvent = new adjustAndroid.AdjustEvent('m2wd5a');
      adjustEvent.addCallbackParameter('page_id', 'tr-uv-2-3');
      adjustEvent.addCallbackParameter('cif', cif);
      adjustAndroid.Adjust.trackEvent(adjustEvent);
    }
  }

  render () {
    const {onClose, onCheckout, data, goToOrderHistory} = this.props;
    const orderNumber = result(data, 'orderNumber', '');
    const status = result(data, 'status', '');
    const email = result(data, 'emailNew', '');
    const storeName = result(data, 'storeName', '');
    const transRefNum = result(data, 'transRefNum', '');
    const dateTime = result(data, 'date', moment().format('DD MMM YYYY, hh:mm:ss '));
    const date = !isEmpty(result(data, 'date', '')) ? moment(dateTime, 'DD/MM/YYYY hh:mm:ss').format('DD MMM YYYY') : '';
    const day = !isEmpty(result(data, 'date', '')) ? moment(dateTime, 'DD/MM/YYYY hh:mm:ss').format('dddd') : '';
    const time = !isEmpty(result(data, 'date', '')) ? moment(dateTime, 'DD/MM/YYYY hh:mm:ss').format('hh:mm A') : '';
    const total = currencyFormatter(result(data, 'total', ''));
    const totalItems = result(data, 'totalItems', '');
    const description = result(data, 'description', '');
    const sourceAccount = result(data, 'sourceAcc', {});
    const voucherValidity = result(data, 'voucherValidity', false);
    const voucherDetail = result(data, 'voucherDetail', {});
    const voucherCurrency = result(voucherDetail, 'voucherData.voucher.currency', '');
    const voucherRedeemAmount = currencyFormatter(result(voucherDetail, 'voucherData.voucher.redeemAmount', '0').toString());
    const note = result(data, 'note', '');
    return (
      <UltraVoucherPaymentStatus
        sourceAccount={sourceAccount} description={description} resultData={data}
        onClose={onClose} onCheckout={onCheckout} orderNumber={orderNumber} note={note}
        status={status} email={email} storeName={storeName} transRefNum={transRefNum}
        day={day} date={date} time={time} total={total} totalItems={totalItems}
        voucherRedeemAmount={voucherRedeemAmount} voucherValidity={voucherValidity} 
        voucherCurrency={voucherCurrency} goToOrderHistory={goToOrderHistory}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentStatusPage);