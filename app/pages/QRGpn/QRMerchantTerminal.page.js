import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import QRMerchantTerminal from '../../components/QRGpn/QRMerchantTerminal.component';
import {QRTerminalRegister, getStoreDetail, getTerminalEdit, goToRefundCreate, goToRefundCode} from '../../state/thunks/QRGpn.thunks';
import {triggerAuthNavigate, confirmDeleteTerminal, confirmResetTerminal} from '../../state/thunks/common.thunks';
import {NavigationActions} from 'react-navigation';

const mapStateToProps = (state) => ({
  transRefNum: result(state, 'transRefNum', ''),
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantTerminal: (merchantId, merchant_criteria, terminalList) => dispatch(QRTerminalRegister(merchantId, merchant_criteria, terminalList)),
  getStoreDetail: (merchantId, terminalId) => dispatch(getStoreDetail(merchantId, terminalId)),
  goToTerminalEdit: (value) => dispatch(getTerminalEdit(value)),
  goToTerminalReset: (value) => {
    dispatch(confirmResetTerminal(value));
  },
  goToTerminalRes: (value) => {
    dispatch(confirmDeleteTerminal(value));
  },
  triggerAuth: (amount, params) => dispatch(triggerAuthNavigate('qrGPNRegister', amount, true, 'AuthDashboard', params)),
  getRefundCreate: (merchantId) => dispatch(goToRefundCreate(merchantId)),
  getRefundCode: (merchantId) => dispatch(goToRefundCode(merchantId)),
  addNewCashier: (isRegisterStore, isRegisterTerminal, merchantId, terminal_id, pan) => dispatch(NavigationActions.navigate({routeName: 'QRMerchantRegister4', params: {isRegisterStore, isRegisterTerminal, merchantId, terminal_id, pan}})),
});


class QRMerchantTerminalPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    getMerchantTerminal: PropTypes.func,
    getStoreDetail: PropTypes.func,
    goToTerminalRes: PropTypes.func,
    QRTerminalRegister: PropTypes.func,
    goToTerminalEdit: PropTypes.func,
    goToTerminalReset: PropTypes.func,
    triggerAuth: PropTypes.func,
    dispatch: PropTypes.func,
    getRefundCreate: PropTypes.func,
    getRefundCode: PropTypes.func,
    addNewCashier: PropTypes.func,
  };

  render () {
    const {navigation, getMerchantTerminal, getStoreDetail, goToTerminalRes, getRefundCode, getRefundCreate, goToTerminalEdit, goToTerminalReset, triggerAuth, dispatch, addNewCashier} = this.props;
    return <QRMerchantTerminal navigation={navigation} getRefundCode={getRefundCode} getRefundCreate={getRefundCreate} getMerchantTerminal={getMerchantTerminal} getStoreDetail={getStoreDetail} QRTerminalRegister={QRTerminalRegister} goToTerminalRes={goToTerminalRes} goToTerminalEdit={goToTerminalEdit} goToTerminalReset={goToTerminalReset} triggerAuth={triggerAuth} dispatch={dispatch} addNewCashier={addNewCashier}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRMerchantTerminalPage);
