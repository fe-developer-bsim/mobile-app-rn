import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import ElectricityPayment from '../../components/ElectricityJourney/ElectricityPayment.component';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';
import {validateRequiredFields, validateBalance} from '../../utils/validator.util';
import {getAccountAmount} from '../../utils/transformer.util';
import {confirmationElectricityBill} from '../../state/thunks/electricityBill.thunks';


const formConfig = {
  form: 'ElectricityBillerPayment',
  destroyOnUnmount: false,
  validate: (values, {billDetails}) => {
    const errors = validateRequiredFields(values, ['accountNo', 'denomination']);
    if (values.accountNo.balances) {
      const selectedAccountBalance = getAccountAmount(values.accountNo);
      const transactionAmount = values.denomination ? values.denomination.value :  billDetails.billAmount || '';
      errors['accountNo'] = validateBalance(selectedAccountBalance, transactionAmount);
    }
    return errors;
  },
  onSubmit: (values, dispatch, {biller, billDetails, confirmationElectricityBill, isPrepaidBiller}) => {
    confirmationElectricityBill(biller, billDetails, isPrepaidBiller);

  },
  initialValues: {
    accountNo: {}
  }
};

const mapStateToProps = (state) => ({
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.ElectricityBillerPayment.values', {})
});

const mapDispatchToProps = (dispatch) => ({
  confirmationElectricityBill: (biller, billDetails, isPrepaidBiller) => dispatch(confirmationElectricityBill(biller, billDetails, isPrepaidBiller))
});

const DecoratedForm = reduxForm(formConfig)(ElectricityPayment);

class ElectricityPaymentPage extends React.Component {
  static propTypes = {
    updateAccounts: PropTypes.func,
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    navigation: PropTypes.object
  };

  getProcessedBiller = (denoms) => denoms.map((denom) => ({denomLabel: `Rp ${denom}`, value: denom}))

  render () {
    const {accounts = [], formValues = {}, navigation, ...extraProps} = this.props;
    const navParams = navigation.state.params;
    const isPrepaidBiller = result(navParams, 'biller.billerPreferences.code', '') === '301422'; // To show dropdown if biller is prepaid
    const denominations = this.getProcessedBiller(result(navParams, 'billDetails.denomList', []));
    return <DecoratedForm denominations={denominations} isPrepaidBiller={isPrepaidBiller} {...navParams} formValues={formValues} accounts={accounts} {...extraProps}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElectricityPaymentPage);
