import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import QRTerminalEditConfirm from '../../components/QRGpn/QRTerminalEditConfirm.component';
import {getTerminalEditResult} from '../../state/thunks/QRGpn.thunks';
import result from 'lodash/result';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';

const formConfig = {
  form: 'QRTerminalEditConfirm',
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
  QRTerminalRes: () => dispatch(getTerminalEditResult(result(props.navigation, 'state.params.detailData', {})))
});

class QRTerminalEditConfirmPage extends React.Component {
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
    return <QRTerminalEditConfirmForm
      navigation={navigation} {...this.props} triggerAuth={triggerAuth} QRTerminalRegister={this.QRTerminalRegister} dispatch={dispatch}
    />;
  }
}

const QRTerminalEditConfirmForm = reduxForm(formConfig)(QRTerminalEditConfirm);

export default connect(mapStateToProps, mapDispatchToProps)(QRTerminalEditConfirmPage);
