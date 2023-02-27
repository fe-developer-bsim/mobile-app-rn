import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import QRTerminalRegister from '../../components/QRGpn/QRTerminalRegister.component';
import {QRTerminalConfirmation} from '../../state/thunks/QRGpn.thunks';
import {validateRequiredFields, isValidTerminalName} from '../../utils/validator.util';
import result from 'lodash/result';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';

const formConfig = {
  form: 'QRTerminalRegister',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, props) => dispatch(QRTerminalConfirmation(result(props.navigation, 'state.params.merchantId', ''), result(props.navigation, 'state.params.merchant_criteria', ''), result(props.navigation, 'state.params.terminalList', []))),
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, ['merchant_pan_name', 'username', 'mobile_number'])};
    return {
      username: isValidTerminalName(values.username),
      ...errors
    };
  }
};

const mapStateToProps = ({state, user}) => ({
  transRefNum: result(state, 'transRefNum', 0), user
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, params) => dispatch(triggerAuthNavigate('qrGPNRegister', amount, true, 'AuthDashboard', params)),
});

const QRTerminalRegisterForm = reduxForm(formConfig)(QRTerminalRegister);

class QRTerminalRegisterPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
    dispatch: PropTypes.func
  };

  render () {
    const {navigation, dispatch} = this.props;
    return <QRTerminalRegisterForm navigation={navigation} dispatch={dispatch}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRTerminalRegisterPage);
