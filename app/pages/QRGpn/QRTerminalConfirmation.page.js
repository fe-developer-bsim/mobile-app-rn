import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import QRTerminalConfirmation from '../../components/QRGpn/QRTerminalConfirmation.component';
import {QRTerminalResult} from '../../state/thunks/QRGpn.thunks';
import result from 'lodash/result';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';

const formConfig = {
  form: 'QRTerminalConfirmation',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {triggerAuth, QRTerminalRegister}) => {
    const defaultAmount = 1000;
    const params = {onSubmit: QRTerminalRegister, isOtp: false};
    triggerAuth(defaultAmount, params);
  },
};

const mapStateToProps = (state) => ({
  transRefNum: result(state, 'transRefNum', ''),
});

const mapDispatchToProps = (dispatch, props) => ({
  triggerAuth: (amount, params) => dispatch(triggerAuthNavigate('qrGPNRegister', amount, true, 'AuthDashboard', params)),
  QRTerminalRes: () => dispatch(QRTerminalResult(result(props.navigation, 'state.params.merchantId', ''), result(props.navigation, 'state.params.merchant_criteria', ''), result(props.navigation, 'state.params.terminalList', [])))
});

class QRTerminalConfirmationPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    QRTerminalRes: PropTypes.func,
    triggerAuth: PropTypes.func,
    dispatch: PropTypes.func
  };

  QRTerminalRegister = () => {
    const {QRTerminalRes} = this.props;
    QRTerminalRes();
  }

  render () {
    const {navigation, triggerAuth, dispatch} = this.props;
    return <QRTerminalConfirmForm
      navigation={navigation} {...this.props} triggerAuth={triggerAuth} QRTerminalRegister={this.QRTerminalRegister} dispatch={dispatch}
    />;
  }
}

const QRTerminalConfirmForm = reduxForm(formConfig)(QRTerminalConfirmation);

export default connect(mapStateToProps, mapDispatchToProps)(QRTerminalConfirmationPage);
