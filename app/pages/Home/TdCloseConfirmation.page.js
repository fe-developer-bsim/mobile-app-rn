import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CloseTdConfirmation from '../../components/Home/CloseTdConfirmation.component';
import {triggerAuth as triggerAuthThunk, resendBillPayOTP} from '../../state/thunks/common.thunks';
import {reduxForm} from 'redux-form';
import noop from 'lodash/noop';
import {closeTD} from '../../state/thunks/dashboard.thunks';
import filter from 'lodash/filter';

const formConfig = {
  form: 'CloseTdConfirmationForm',
  onSubmit: (values, dispatch, {timeDepositDetail}) => dispatch(closeTD({...values, ...timeDepositDetail}))
};

const DecoratedCloseTdConfirmationForm = reduxForm(formConfig)(CloseTdConfirmation);

const mapStateToProps = (state) => ({
  transRefNum: state.transRefNum,
  config: result(state, 'config.tokenConfig', []),
  userId: result(state, 'user.profile.customer.id', 0),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount) => dispatch(triggerAuthThunk('billpay', amount)),
  resendOTP: (transactionId) => dispatch(resendBillPayOTP(transactionId))
});

class TdClosePage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    transRefNum: PropTypes.string,
    userId: PropTypes.number,
    resendOTP: PropTypes.func,
    config: PropTypes.array,
    triggerAuth: PropTypes.func,
  };

  render () {
    const {
      navigation, userId, transRefNum,
      config, resendOTP = noop,
      triggerAuth = noop} = this.props;
    const timeDepositDetail = result(navigation, 'state.params.timeDepositDetail');
    const accountList = filter(result(navigation, 'state.params.tabAccounts'), function (account) {
      return result(account, 'accountNumber') === result(timeDepositDetail, 'accountNumber') ? result(account, 'accountNumber') : undefined;
    });
    return <DecoratedCloseTdConfirmationForm
      userId={userId} transRefNum={transRefNum}
      config={config} timeDepositDetail={timeDepositDetail} resendOTP={resendOTP}
      triggerAuth={triggerAuth} accountList={accountList}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TdClosePage);
