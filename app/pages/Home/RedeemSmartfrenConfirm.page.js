import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import RedeemSmartfrenConfirm from '../../components/Home/RedeemSmartfrenConfirm.component';
import {reduxForm} from 'redux-form';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {redeemSmartfrenResult} from '../../state/thunks/dashboard.thunks';

const formConfig = {
  form: 'RedeemSmartfrenConfirm',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {triggerAuth, redeemSmartfren}) => {
    const defaultAmount = 1000;
    const params = {onSubmit: redeemSmartfren, amount: defaultAmount, isOtp: false};
    triggerAuth(defaultAmount, params);
  },
};

const mapStateToProps = (state) => ({
  transRefNum: result(state, 'transRefNum', ''),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, params) => dispatch(triggerAuthNavigate('SFRedeem', amount, true, 'AuthDashboard', params)),
  redeemSmartfrenRes: () => dispatch(redeemSmartfrenResult())
});

class RedeemSmartfrenConfirmPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    redeemSmartfrenRes: PropTypes.func,
    triggerAuth: PropTypes.func
  };

  redeemSmartfren = () => {
    const {redeemSmartfrenRes} = this.props;
    redeemSmartfrenRes();
  }

  render () {
    const {navigation} = this.props;
    return <RedeemSmartfrenConfirmForm
      navigation={navigation} {...this.props} redeemSmartfren={this.redeemSmartfren}
    />;
  }
}

const RedeemSmartfrenConfirmForm = reduxForm(formConfig)(RedeemSmartfrenConfirm);

export default connect(mapStateToProps, mapDispatchToProps)(RedeemSmartfrenConfirmPage);
