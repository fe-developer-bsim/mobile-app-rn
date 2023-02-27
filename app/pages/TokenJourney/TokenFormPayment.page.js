import {result, isEmpty} from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import TokenFormPayment, {fields} from '../../components/TokenJourney/TokenFormPayment.component';
import {validateRequiredFields, validateBalance, validateMaxAmount} from '../../utils/validator.util';
import {getUnformattedAccountAmount, getTransferPossibleAccounts, getAccountAmount, getPushBillPossibleAccounts} from '../../utils/transformer.util';
import {confirmTokenPayment} from '../../state/thunks/common.thunks';

const formConfig = {
  form: fields.formName,
  destroyOnUnmount: false,
  validate: (values) => {
    const errors = validateRequiredFields(values, ['accountNo', 'amount']);
    if (values !== '') {  
      const selectedAccountBalance = getAccountAmount(values.accountNo);
      errors['accountNo'] = validateBalance(selectedAccountBalance, result(values, 'amount', ''));
    }
    errors['amount'] = validateMaxAmount(result(values, 'amount', ''));
    return errors;
  },
  onSubmit: (values, dispatch, {navigation, isOwnAccount, emoneyAccount, kmtr}) => {
    const data = result(navigation, 'state.params.data', {});
    const amount = result(navigation, 'state.params.data.totalAmount');
    dispatch(confirmTokenPayment({data, values, amount, kmtr, isOwnAccount, emoneyAccount}));
  }
};

const mapStateToProps = (state) => ({
  accounts: result(state, 'accounts', []),
  formValues: result(state, 'form.TokenForm.values', {}),
  emoneyAccount: getPushBillPossibleAccounts(result(state, 'accounts', {}), 'bp'),

});

const DecoratedTokenForm = reduxForm(formConfig)(TokenFormPayment);

class TokenFormPaymentPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    triggerAuth: PropTypes.func,
    emoneyAccount: PropTypes.object,
    kmtr: PropTypes.bool
  };

  render () {
    const {accounts = {}, triggerAuth, formValues = {}, navigation = {}, emoneyAccount} = this.props;
    const savingAccounts = getTransferPossibleAccounts(accounts, 'td');
    const kmtr = result(navigation, 'state.params.data.kmtr');
    const availableBalance = getUnformattedAccountAmount(formValues['accountNo']);
    const amount = result(navigation, 'state.params.data.amount', 0);
    const disabled = isEmpty(result(formValues, 'accountNo', {})) && kmtr === false;
    const balances = kmtr ? result(emoneyAccount, 'emoneyAccount.balances', '') : result(formValues, 'accountNo.balances', '');
    let errors = [];
    if (balances !== '') {
      const balanceVal = formValues.accountNo;
      const selectedAccountBalance = kmtr ? getAccountAmount(emoneyAccount.emoneyAccount) : getAccountAmount(balanceVal);
      errors['accountNo'] = validateBalance(selectedAccountBalance, amount);
    }
    errors['amount'] = validateMaxAmount(result(formValues, 'amount', ''));
    return <DecoratedTokenForm
      formValues={formValues}
      availableBalance={availableBalance}
      savingAccounts={savingAccounts}
      navigation={navigation}
      triggerAuth={triggerAuth}
      disabled={disabled}
      errors={errors}
      amount={amount}
      emoneyAccount={emoneyAccount}
      kmtr={kmtr}
    />;
  }
}

export default connect(mapStateToProps)(TokenFormPaymentPage);
