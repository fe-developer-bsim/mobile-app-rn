import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import RecurringEdit, {fields} from '../../components/RecurringJourney/RecurringEditing.component';
import {validateRequiredFields, validateNumber, isInRange} from '../../utils/validator.util';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import find from 'lodash/find';
import {NavigationActions} from 'react-navigation';
import {editRecurringTransfer} from '../../state/thunks/fundTransfer.thunks';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {lowerCase} from '../../utils/transformer.util';

const formConfig = {
  form: 'RecurringEditForm',
  destroyOnUnmount: false,
  initialValues: {
    [fields.AMOUNT_RECURRING]: '',
  },
  onSubmit: (values, dispatch, {triggerAuth, editingRecurring, transferMode}) => {
    const amount = result(values, 'amountRecurring', '');
    const otp = lowerCase(transferMode) === 'own' ? false : amount > 5000000;
    const Easypin = lowerCase(transferMode) === 'own';
    const params = {onSubmit: editingRecurring, amount, isOtp: otp, isEasypin: Easypin};
    triggerAuth(params);
  },
  validate: (values, {currentaccountBalance, transferMode, maxInbank, maxNetwork, maxRtgs, minRtgs, minNetwork, minInbank, minSkn, maxSkn, minOwn}) => {
    const errors = {
      ...validateRequiredFields(values, [fields.AMOUNT_RECURRING])};
    const minValue = lowerCase(transferMode) === 'rtgs' ? minRtgs : lowerCase(transferMode) === 'network' ? minNetwork : lowerCase(transferMode) === 'inbank' ? minInbank : lowerCase(transferMode) === 'own' ? minOwn : minSkn;
    const countMaxValue = lowerCase(transferMode) === 'network' ? maxNetwork : lowerCase(transferMode) === 'inbank' ? maxInbank : lowerCase(transferMode) === 'rtgs' ? maxRtgs : lowerCase(transferMode) === 'own' ? currentaccountBalance : maxSkn;
    const maxValue = countMaxValue < currentaccountBalance ? countMaxValue : currentaccountBalance;
    return {
      amountRecurring: validateNumber(values.amountRecurring) || isInRange(minValue, maxValue, values.amountRecurring),
      ...errors
    };
  }
};

const mapDispatchToProps = (dispatch) => ({
  setAmount: (amount) => dispatch(change('RecurringEditForm', 'amountRecurring', amount)),
  editRecurringTransferThunk: (data) => dispatch(editRecurringTransfer(data)),
  goToEditTransfer: () => dispatch(NavigationActions.navigate({routeName: 'HomeScreen'})),
  triggerAuth: (params) => dispatch(triggerAuthNavigate('editRecurring', null, false, 'Auth', params)),
});

const mapStateToProps = (state) => ({
  accounts: result(state, 'accounts', []),
  transferCharge: result(state, 'chargeList.transfer', []),
  accountName: result(state, 'user.profile.name', ''),
});

const RegisterForm = reduxForm(formConfig)(RecurringEdit);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(RegisterForm);

class IdentityFormPage extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    setUsername: PropTypes.func,
    goToForgotPassword: PropTypes.func,
    setAmount: PropTypes.func,
    accounts: PropTypes.array,
    goToEditTransfer: PropTypes.func,
    triggerAuth: PropTypes.func,
    editRecurringTransferThunk: PropTypes.func,
    transferCharge: PropTypes.array,
    accountName: PropTypes.string
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    const {navigation, accounts} = this.props;
    const transferData = result(navigation, 'state.params', {});
    const foundAccount = find(accounts, {'accountNumber': result(transferData, 'account', '')});
    const accountBalance = result(foundAccount, 'balances.availableBalance', '');
    if ('amountRecurring' === typeField) {
      return (isEmpty(validateNumber(val) && isInRange(1000, accountBalance, val) && val < 500000000));
    }
  }

  componentDidMount =() => {
    this.setAmountRecurring();
  }

  editingRecurring = () => {
    const {navigation, editRecurringTransferThunk} = this.props;
    const transferData = result(navigation, 'state.params', {});
    editRecurringTransferThunk(transferData);
  }

  setAmountRecurring = () => {
    const {setAmount, navigation} = this.props;
    const amountData = result(navigation, 'state.params.amount', '');
    setAmount(amountData);
  }

  render () {
    const {navigation, accounts, triggerAuth, transferCharge, accountName} = this.props;
    const transferData = result(navigation, 'state.params', {});
    const foundAccount = find(accounts, {'accountNumber': result(transferData, 'account', '')});
    const currentaccountBalance = result(foundAccount, 'balances.availableBalance', 0);
    const findInbank = find(transferCharge, {'mode': 'inbank'});
    const findNetwork = find(transferCharge, {'mode': 'network'});
    const findRtgs = find(transferCharge, {'mode': 'rtgs'});
    const findSkn = find(transferCharge, {'mode': 'skn'});
    const findOwn = find(transferCharge, {'mode': 'own'});
    const maxInbank = result(findInbank, 'maxAmount', '');
    const maxNetwork = result(findNetwork, 'maxAmount', '');
    const maxRtgs = result(findRtgs, 'maxAmount', '');
    const minRtgs = result(findRtgs, 'minAmount', '');
    const minInbank = result(findInbank, 'minAmount', '');
    const minNetwork = result(findNetwork, 'minAmount', '');
    const minSkn = result(findSkn, 'minAmount', '');
    const maxSkn = result(findSkn, 'maxAmount', '');
    const minOwn = result(findOwn, 'minAmount', '');
    const maxOwn = result(findOwn, 'maxAmount', '');
    return (
      <ConnectedForm
        navigation={navigation}
        onLoginPress={this.onLoginPress}
        validationInput={this.validationInput()}
        {...transferData}
        currentaccountBalance={currentaccountBalance}
        dataForm={transferData}
        triggerAuth={triggerAuth}
        editingRecurring={this.editingRecurring}
        maxInbank={maxInbank}
        maxNetwork={maxNetwork}
        maxRtgs={maxRtgs}
        minRtgs={minRtgs}
        minNetwork={minNetwork}
        minInbank={minInbank}
        minSkn={minSkn}
        maxSkn={maxSkn}
        minOwn={minOwn}
        maxOwn={maxOwn}
        accountName={accountName}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(IdentityFormPage);
export default ConnectedFormPage;
