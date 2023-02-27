import React from 'react';
import PropTypes from 'prop-types';
import SimasInvestaLinkEmFundConfirm from '../../components/InvestmentJourney/SimasInvestaLinkEmFundConfirm.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {triggerAuthNavigate, getTransRefNumAndOTPNavigate} from '../../state/thunks/common.thunks';
import {simasLinkInvestasiEmFund} from '../../state/thunks/dashboard.thunks';

const formConfig = {
  form: 'emFund',
  onSubmit: (values, dispatch, {emFundBill, triggerAuth, amount, isNewPayee, isOwnAccount}) => {
    const params = {onSubmit: emFundBill, amount, isOtp: true};
    triggerAuth(amount, isNewPayee, isOwnAccount, 'AuthDashboard', params, true);
  }
};

const mapStateToProps = (state) => ({ 
  currentLanguage: result(state, 'currentLanguage.id', 'id'),
  accountList: result(state, 'accounts', []),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, isNewPayee = false, isOwnAccount = false, routeName, params) => {
    if (isNewPayee) {
      return dispatch(getTransRefNumAndOTPNavigate('emergencyFundSIL', true, routeName, params, isOwnAccount));
    }
    return dispatch(triggerAuthNavigate('emergencyFundSIL', amount, isOwnAccount, routeName, params));
  },
  // triggerAuth: (amount, isNewPayee = false, isOwnAccount = false, routeName, params) => dispatch(getTransRefNumAndOTPNavigate('sil', isNewPayee, routeName, params, isOwnAccount)),
  simasLinkInvestasiEF: (data) => dispatch(simasLinkInvestasiEmFund(data)),
});

const SILConfirm = reduxForm(formConfig)(SimasInvestaLinkEmFundConfirm);

class SilConfirmform extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    triggerAuth: PropTypes.func,
    simasLinkInvestasiEF: PropTypes.func,
    accountList: PropTypes.array,
  }

  emFundBill = () => {
    const {navigation, simasLinkInvestasiEF} = this.props;
    const data = navigation;
    simasLinkInvestasiEF(data);
  }
  render () {
    const {navigation, triggerAuth, accountList} = this.props;
    const formValues = result(navigation, 'state.params.formValues', {});
    const amount = result(navigation, 'state.params.amount', {});
    const infoPolis = result(navigation, 'state.params.infoPolis', {});
    const summaryDetail = result(navigation, 'state.params.summaryDetail', {});
    const isOwnAccount = false;
    const isNewPayee = true;
    return (
      <SILConfirm infoPolis={infoPolis} summaryDetail={summaryDetail}  emFundBill={this.emFundBill} amount={amount} triggerAuth={triggerAuth} formValues={formValues} accountList={accountList}
        isOwnAccount={isOwnAccount} isNewPayee={isNewPayee}/>
    );
  }
}



const connectedTransfer = connect(mapStateToProps, mapDispatchToProps)(SilConfirmform);
export default connectedTransfer;
