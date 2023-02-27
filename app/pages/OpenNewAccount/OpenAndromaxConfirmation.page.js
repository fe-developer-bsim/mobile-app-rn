import React from 'react';
import PropTypes from 'prop-types';
import OpenAndromaxConfirmation from '../../components/OpenNewAccount/OpenAndromaxConfirmation.component';
import {openAccountAndromax} from '../../state/thunks/openAccount.thunks';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import result from 'lodash/result';

const formConfig = {
  form: 'OpenAndromaxConfirmationForm',
  onSubmit: (values, dispatch, {responseData = {}, triggerAuth, openAccount}) => {
    const amount = result(responseData, 'initialDeposit', '0');
    const params = {onSubmit: openAccount, amount, isOtp: false};
    triggerAuth(amount, params);
  }
};

const ConnectedForm = reduxForm(formConfig)(OpenAndromaxConfirmation);

class OpenAndromaxConfirmationPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    triggerAuth: PropTypes.func,
    openAccountAndromax: PropTypes.func,
    openAccountConfig: PropTypes.object,
  };

  openAccount = () => {
    const {openAccountAndromax} = this.props;
    openAccountAndromax();
  }

  render () {
    const navParams = result(this.props, 'navigation.state.params', {});
    const {triggerAuth, openAccountConfig} = this.props;
    return <ConnectedForm {...navParams} openAccountConfig={openAccountConfig} triggerAuth={triggerAuth} openAccount={this.openAccount}/>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, params) => dispatch(triggerAuthNavigate('onlineOpenAccount', amount, true, 'AuthOpenAccount', params)),
  openAccountAndromax: (data) => dispatch(openAccountAndromax(data))
});
const mapStateToProps = ({transRefNum, config, user, openAccountConfig}) => ({
  transRefNum, config: result(config, 'tokenConfig', []),
  userId: result(user, 'profile.customer.id', 0),
  openAccountConfig,
});

export default connect(mapStateToProps, mapDispatchToProps)(OpenAndromaxConfirmationPage);
