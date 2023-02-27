import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import CardLessWithdrawalPayment from '../../components/CardLessWithdrawalJourney/CardLessWithdrawalPayment.component';
import result from 'lodash/result';
import {validateRequiredFields, isInRange, isModulus} from '../../utils/validator.util';
import {getAccountAmount, getTransferPossibleAccounts} from '../../utils/transformer.util';
import {confirmTransfer} from '../../state/thunks/fundTransfer.thunks';
import {NavigationActions} from 'react-navigation';
import isEmpty from 'lodash/isEmpty';

const formConfig = {
  form: 'CardLessWithdrawalPayment',
  destroyOnUnmount: false,
  initialValues: {
    myAccount: {},
    amount: '',
    note: '',
  },
  validate: (values, props) => {
    let errors = {
      ...validateRequiredFields(values, ['myAccount', 'amount']),
      ...validateRequiredFields(props, ['payee']),
    };
    const accountBalance = getAccountAmount(values.myAccount);
    return {
      amount: isInRange(100000, accountBalance, values.amount)
      || isInRange(100000, 1000000, values.amount)
      || isModulus(values.amount, 50000),
      ...errors
    };
  }
};

const DecoratedCardLessWithdrawalPayment = reduxForm(formConfig)(CardLessWithdrawalPayment);

class CardLessWithdrawalPaymentPage extends Component {
  state = {
    newAccount: {}
  }
  static propTypes = {
    goToSummary: PropTypes.func,
    setup: PropTypes.func,
    accountList: PropTypes.array,
    navigation: PropTypes.object,
    formValues: PropTypes.object,
    appConfig: PropTypes.object,
    prefixCardlessWithdrawal: PropTypes.string,
    accountFirst: PropTypes.object,
    goToSourceAccount: PropTypes.func,
    accountCardless: PropTypes.object,
    changeAccount: PropTypes.func,
    selectedAccount: PropTypes.object,
    chargeList: PropTypes.array
  };

  render () {
    const {navigation, accountList, formValues, goToSummary, appConfig, goToSourceAccount, selectedAccount, chargeList} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const tokenConfig = result(appConfig, 'tokenConfig', {});
    const transferChargeConfig = result(chargeList, 'transfer', []);
    const prefixCardlessWithdrawal = result(appConfig, 'cardlessWithdrawalPrefix', '');
    const isSelectedAccount = isEmpty(selectedAccount);

    return (
      <DecoratedCardLessWithdrawalPayment accountList={accountList} accountTarget={this.state.newAccount} onNextPress={goToSummary(payee, formValues)} payee={payee}
        formValues={formValues} tokenConfig={tokenConfig} transferChargeConfig={transferChargeConfig} prefixCardlessWithdrawal={prefixCardlessWithdrawal}
        goToSourceAccount={goToSourceAccount} selectedAccount={selectedAccount} isSelectedAccount={isSelectedAccount}/>
    );
  }
}

const mapStateToProps = (state) =>   ({
  accountList: getTransferPossibleAccounts(result(state, 'accounts', []), 'ft'),
  formValues: result(state, 'form.CardLessWithdrawalPayment.values', {}),
  appConfig: result(state, 'config', {}),
  accountCardless: result(state, 'acccountCardLess', {}),
  selectedAccount: result(state, 'form.CardLessWithdrawalPayment.values.myAccount', {}),
  chargeList: result(state, 'chargeList', [])
});

const mapDispatchToProps = (dispatch) => ({
  goToSummary: (payee, formValues) => () => {
    dispatch(confirmTransfer(formValues, payee, 'cardlessWithdrawal'));
  },
  goToSourceAccount: () => dispatch(NavigationActions.navigate({routeName: 'CardLessWithdrawalSourceAcc'})),
  changeAccount: (newAccount) => dispatch(change('CardLessWithdrawalPayment', 'myAccount', newAccount))
});

const connectedTransfer = connect(mapStateToProps, mapDispatchToProps)(CardLessWithdrawalPaymentPage);
export default connectedTransfer;
