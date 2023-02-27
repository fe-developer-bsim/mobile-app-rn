import React from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {result, isEmpty} from 'lodash';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';
import {confirmCashAdvance} from '../../state/thunks/creditCardManage.thunks';
import {NavigationActions} from 'react-navigation';
import CashAdvanceConfirm from '../../components/CreditCardCashAdvance/CashAdvanceConfirm.component';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';

const formConfig = {
  form: 'CreditCardCashAdvanceConfirm',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {confirmCashAdvance, triggerAuth, navigation}) => {
    const amount = result(navigation, 'state.params.amount', '');
    const params = {onSubmit: confirmCashAdvance, amount: amount, isOtp: false};
    triggerAuth(amount, false, false, 'AuthDashboard', params, true);
  }
};

const DecoratedCashAdvanceConfirm = reduxForm(formConfig)(CashAdvanceConfirm);

class CashAdvanceConfirmPage extends React.Component {

  state = {
    newAccount: {}
  }
  static propTypes = {
    goToSummary: PropTypes.func,
    confirmCashAdvance: PropTypes.func,
    accountList: PropTypes.array,
    navigation: PropTypes.object,
    formValues: PropTypes.object,
    appConfig: PropTypes.object,
    goToSourceAccount: PropTypes.func,
    selectedAccount: PropTypes.object,
    ccAccount: PropTypes.object,
    moveTo: PropTypes.func,
    navigatePaymentSuccess: PropTypes.func,
    triggerAuth: PropTypes.func,
    chargeList: PropTypes.array
  };

  goconfirmCashAdvance = () => {
    const {confirmCashAdvance, navigation} = this.props;
    const ccAccount = result(navigation, 'state.params.ccAccount', {});
    const destAcc = result(navigation, 'state.params.destAcc', {});
    const amount = result(navigation, 'state.params.amount', '');
    const note = result(navigation, 'state.params.note', '');
    const fee = result(navigation, 'state.params.resData.fee', '');
    const total = result(navigation, 'state.params.resData.total', '');
    confirmCashAdvance(ccAccount, destAcc, amount, note, fee, total);
  }

  render () {
    const {navigation, accountList, formValues, appConfig, selectedAccount, navigatePaymentSuccess, moveTo, triggerAuth, chargeList} = this.props;
    const tokenConfig = result(appConfig, 'tokenConfig', {});
    const transferChargeConfig = result(chargeList, 'transfer', []);
    const isSelectedAccount = isEmpty(selectedAccount);
    return (
      <DecoratedCashAdvanceConfirm accountList={accountList} accountTarget={this.state.newAccount}
        formValues={formValues} navigation={navigation} tokenConfig={tokenConfig} transferChargeConfig={transferChargeConfig}
        selectedAccount={selectedAccount} isSelectedAccount={isSelectedAccount} navigatePaymentSuccess={navigatePaymentSuccess}
        moveTo={moveTo} confirmCashAdvance={this.goconfirmCashAdvance} triggerAuth={triggerAuth}/>
    );
  }
}

const mapStateToProps = (state) =>   ({
  accountList: getTransferPossibleAccounts(result(state, 'accounts', []), 'ft'),
  formValues: result(state, 'form.CreditCardCashAdvance.values', {}),
  appConfig: result(state, 'config', {}),
  selectedAccount: result(state, 'form.CreditCardCashAdvance.values.destAcc', {}),
  chargeList: result(state, 'chargeList', [])
});

const mapDispatchToProps = (dispatch) => ({
  confirmCashAdvance: (ccAccount, destAcc, amount, note, fee, total) => dispatch(confirmCashAdvance(ccAccount, destAcc, amount, note, fee, total)),
  navigatePaymentSuccess: () => dispatch(NavigationActions.navigate({routeName: 'CreditCardCashAdvanceSuccess'})),
  moveTo: (routeName, params) => dispatch(NavigationActions.navigate({routeName: routeName, params: {...params}})),
  triggerAuth: (amount, isNewPayee = false, isOwnAccount = false, routeName, params) => dispatch(triggerAuthNavigate('cashAdvanceCC', amount, isOwnAccount, routeName, params, isNewPayee)),
});


export default connect(mapStateToProps, mapDispatchToProps)(CashAdvanceConfirmPage);
