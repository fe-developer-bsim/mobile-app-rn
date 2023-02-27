import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import SavingAccountConfirmation from '../../components/CreateNewSavingAccount/SavingAccountConfirmation.component';
import {result, isEmpty} from 'lodash';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {validateBalance} from '../../utils/validator.util';
import {getAccountAmount, getTransferPossibleAccounts} from '../../utils/transformer.util';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {createSavingAccount, createSavingValasAccount} from '../../state/thunks/savingAccount.thunks';

const formConfig = {
  form: 'savingConfirmation',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {triggerAuth, initialDeposit, createSaving, savingProductType}) => {
    const params = {onSubmit: createSaving, amount: initialDeposit, isOtp: false};
    triggerAuth(initialDeposit, params, savingProductType);
  }
};

const mapDispatchToProps = (dispatch) => ({
  setAmount: (name, amount) => {
    dispatch(change('SourceAccountForm', name, amount));
  },
  getSourceAcc: (savingProductType) => {
    if (savingProductType === 'savingValas') {
      dispatch(NavigationActions.navigate({
        routeName: 'SavingSourceAccount',
        params: {formName: 'SourceAccountValasForm', fieldName: 'myAccount', sourceType: savingProductType}
      }));
    } else {
      dispatch(NavigationActions.navigate({
        routeName: 'SavingSourceAccount',
        params: {formName: 'SourceAccountForm', fieldName: 'myAccount', sourceType: savingProductType}
      }));
    }
  },
  triggerAuth: (amount, params, savingProductType) => dispatch(triggerAuthNavigate(savingProductType, amount, true, 'SavingAccountEasyPIN', params)),
  createSavingGold: (formValues, savingProductType) => {
    if (savingProductType === 'savingValas') {
      dispatch(createSavingValasAccount());
    } else {
      dispatch(createSavingAccount(formValues));
    }
  },
});

const mapStateToProps = (state) => ({
  isLogin: !isEmpty(result(state, 'user', {})),
  name: result(state, 'user.profile.name', ''),
  email: result(state, 'form.EmailForm.values.email', ''),
  initialDeposit: result(state, 'productData.productDeposit', ''),
  formValues: result(state, 'form.SourceAccountForm.values', {}),
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
  savingImage: result(state, 'productData.productImage', ''),
  savingProductType: result(state, 'productData.productType', ''),
  currencySavingValas: result(state, 'productItems.currencySavingValas', ''),
  formValuesSavingValas: result(state, 'form.SourceAccountValasForm.values', {}),
  treasuryRateSavingValas: result(state, 'form.SourceAccountValasForm.values.convertMapValasData.temenosTreasuryRate', ''),
});

const SavingAccountForm = reduxForm(formConfig)(SavingAccountConfirmation);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(SavingAccountForm);

class SavingAccountConfirmationForm extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    onButtonPress: PropTypes.func,
    isLogin: PropTypes.bool,
    getSourceAcc: PropTypes.func,
    goToTrigerAuth: PropTypes.func,
    name: PropTypes.string,
    email: PropTypes.string,
    initialDeposit: PropTypes.string,
    formValues: PropTypes.object,
    createSavingGold: PropTypes.func,
    accounts: PropTypes.array,
    savingImage: PropTypes.string,
    savingProductType: PropTypes.string,
    currencySavingValas: PropTypes.string,
    formValuesSavingValas: PropTypes.object,
    treasuryRateSavingValas: PropTypes.string,
  }

  getSourceAccList = () => {
    const {getSourceAcc, savingProductType} = this.props;
    getSourceAcc(savingProductType);
  }

  createSaving = () => {
    const {formValues, createSavingGold, savingProductType} = this.props;
    createSavingGold(formValues, savingProductType);
  }

  render () {
    const {navigation, name, email, initialDeposit, accounts = [], formValues, savingImage, savingProductType, currencySavingValas, formValuesSavingValas, treasuryRateSavingValas} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const initialDepositSavingValasInIDR = parseFloat(initialDeposit * treasuryRateSavingValas) || parseInt(initialDeposit);
    const errors = [];

    const deposit = savingProductType === 'savingValas' ? initialDepositSavingValasInIDR : parseInt(initialDeposit);
    const disabled = deposit === 0 ? false : savingProductType === 'savingValas' && !isEmpty(result(formValuesSavingValas, 'myAccount', {})) ? false : savingProductType === 'savingValas' && isEmpty(result(formValuesSavingValas, 'myAccount', {})) ? true : isEmpty(result(formValues, 'myAccount', {}));
    const balances = savingProductType === 'savingValas' ? result(formValuesSavingValas, 'myAccount.balances.availableBalance', '') : result(formValues, 'myAccount.balances.availableBalance', '');
    const account = savingProductType === 'savingValas' ? result(formValuesSavingValas, 'myAccount', {}) : result(formValues, 'myAccount', {});

    if (balances !== '') {
      const selectedAccountBalance = getAccountAmount(account);
      errors['myAccount'] = validateBalance(selectedAccountBalance, deposit, 'saving');
    }

    return (
      <ConnectedForm getSourceAccList={this.getSourceAccList}
        name={name} email={email} initialDeposit={initialDeposit} formValues={formValues}
        createSaving={this.createSaving} accounts={accounts} disabled={disabled} errors={errors}
        savingImage={savingImage} savingProductType={savingProductType} currencySavingValas={currencySavingValas} formValuesSavingValas={formValuesSavingValas} {...navParams} />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(SavingAccountConfirmationForm);
export default ConnectedFormPage;
