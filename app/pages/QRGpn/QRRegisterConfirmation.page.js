import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import QRRegisterConfirmation from '../../components/QRGpn/QRRegisterConfirmation.component';
import {QRRegisterResult} from '../../state/thunks/QRGpn.thunks';
import result from 'lodash/result';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';

const formConfig = {
  form: 'QRRegisterConfirmation',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {triggerAuth, QRMerchantRegister}) => {
    const defaultAmount = 1000;
    const params = {onSubmit: QRMerchantRegister, isOtp: false};
    triggerAuth(defaultAmount, params);
  },
};

const mapStateToProps = (state) => ({
  transRefNum: result(state, 'transRefNum', ''),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, params) => dispatch(triggerAuthNavigate('qrGPNRegister', amount, true, 'AuthDashboard', params)),
  QRMerchantRes: (isRegisterStore, isRegisterTerminal, merchantId, terminal_id, pan) => dispatch(QRRegisterResult(isRegisterStore, isRegisterTerminal, merchantId, terminal_id, pan))
});

class QRRegisterConfirmationPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    QRMerchantRes: PropTypes.func,
    triggerAuth: PropTypes.func
  };

  QRMerchantRegister = () => {
    const {QRMerchantRes, navigation} = this.props;
    const isRegisterStore = result(navigation, 'state.params.isRegisterStore', '');
    const isRegisterTerminal = result(navigation, 'state.params.isRegisterTerminal', '');
    const merchantId = result(navigation, 'state.params.merchantId', '');
    const terminal_id = result(navigation, 'state.params.terminal_id', '');
    const pan = result(navigation, 'state.params.pan', '');
    QRMerchantRes(isRegisterStore, isRegisterTerminal, merchantId, terminal_id, pan);
  }

  render () {
    const {navigation, triggerAuth} = this.props;
    return <QRMerchantConfirmForm
      navigation={navigation} {...this.props} triggerAuth={triggerAuth} QRMerchantRegister={this.QRMerchantRegister}
    />;
  }
}

const QRMerchantConfirmForm = reduxForm(formConfig)(QRRegisterConfirmation);

export default connect(mapStateToProps, mapDispatchToProps)(QRRegisterConfirmationPage);
