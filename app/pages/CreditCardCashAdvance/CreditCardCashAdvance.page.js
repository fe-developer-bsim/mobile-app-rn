import React from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {result, isEmpty} from 'lodash';
import {validateRequiredFields, validateBalance, isInRange} from '../../utils/validator.util';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';
import {getCashAdvanceFee} from '../../state/thunks/creditCardManage.thunks';
import CreditCardCashAdvance from '../../components/CreditCardCashAdvance/CreditCardCashAdvance.component';

const formConfig = {
  form: 'CreditCardCashAdvance',
  initialValues: {
    destAcc: '',
    amount: '',
    note: '',
  },
  validate: (values, {navigation}) => {
    const ccDetail = result(navigation, 'state.params.CCDetail', {});
    const creditAvailable = parseInt(result(ccDetail, 'creditAvailable', '').replace(/[^0-9.]+/g, ''));
    const errors =  validateRequiredFields(values, ['amount', 'destAcc']);
    if (!isEmpty(values.amount) && values.amount > creditAvailable) {
      const transactionAmount = values.amount;
      errors['amount'] = validateBalance(creditAvailable, transactionAmount, 'Credit Card');
    }
    return errors;
  },
  onSubmit: (values, dispatch, {navigation}) => {
    const ccAccount = result(navigation, 'state.params.selectedAccount', '');
    const destAcc = result(values, 'destAcc', {});
    const amount = result(values, 'amount', '');
    const note = result(values, 'note', '');
    dispatch(getCashAdvanceFee(ccAccount, destAcc, amount, note));
  }
};

const DecoratedCreditCardCashAdvance = reduxForm(formConfig)(CreditCardCashAdvance);

class CreditCardCashAdvancePage extends React.Component {

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
    accountFirst: PropTypes.object,
    goToSourceAccount: PropTypes.func,
    changeAccount: PropTypes.func,
    selectedAccount: PropTypes.object,
    ccDetail: PropTypes.object,
    disabled: PropTypes.bool,
    navigateCashAdvanceConfirm: PropTypes.func,
    chargeList: PropTypes.array
  };

  render () {
    const {navigation, accountList, formValues, appConfig, selectedAccount, navigateCashAdvanceConfirm, chargeList} = this.props;
    const disabled = isEmpty(result(formValues, 'destAcc', {}));
    const disabledA = isEmpty(result(formValues, 'amount', {}));
    const transactionAmount = parseInt(result(formValues, 'amount', ''));
    const tokenConfig = result(appConfig, 'tokenConfig', {});
    const disclaimerfig = result(appConfig, 'disclaimerCashAdvanceCC', {});
    const minval = parseInt(result(disclaimerfig, 'minimumCA', ''));
    const transferChargeConfig = result(chargeList, 'transfer', []);
    const isSelectedAccount = isEmpty(selectedAccount);
    const ccDetail = result(navigation, 'state.params.CCDetail', {});
    const creditAvailable = parseInt(result(ccDetail, 'creditAvailable', '').replace(/[^0-9.]+/g, ''));
    const disableAmount = (transactionAmount > creditAvailable) || (transactionAmount < minval);
    let errors = [];
    errors['amount'] = isInRange(minval, creditAvailable, transactionAmount);

    return (
      <DecoratedCreditCardCashAdvance disabled={disabled} navigation={navigation} accountList={accountList} accountTarget={this.state.newAccount}
        formValues={formValues} tokenConfig={tokenConfig} transferChargeConfig={transferChargeConfig}  disabledA={disabledA} disclaimerfig={disclaimerfig}
        selectedAccount={selectedAccount} isSelectedAccount={isSelectedAccount} ccDetail={ccDetail} navigateCashAdvanceConfirm={navigateCashAdvanceConfirm} errors={errors} disableAmount={disableAmount} />
    );
  }
}

const mapStateToProps = (state) =>   ({
  accountList: getTransferPossibleAccounts(result(state, 'accounts', []), 'ft'),
  formValues: result(state, 'form.CreditCardCashAdvance.values', {}),
  appConfig: result(state, 'config', {}),
  selectedAccount: result(state, 'form.CreditCardCashAdvance.values.sourceAcc', {}),
  chargeList: result(state, 'chargeList', [])
});



export default connect(mapStateToProps, null)(CreditCardCashAdvancePage);
