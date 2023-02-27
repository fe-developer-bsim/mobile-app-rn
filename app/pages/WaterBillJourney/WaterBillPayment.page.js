import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import PaymentSelection from '../../components/WaterBillJourney/PaymentSelection.component';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {updateBalances} from '../../state/thunks/common.thunks';
import {validateRequiredFields, validateBalance} from '../../utils/validator.util';
import {getAccountAmount, getTransferPossibleAccounts} from '../../utils/transformer.util';
import {confirmationWaterBill} from '../../state/thunks/waterBill.thunks';

const formConfig = {
  form: 'WaterBillerPayment',
  destroyOnUnmount: false,
  validate: (values, {navigation}) => {
    const {bill} = navigation.state.params;
    const accountBalance = getAccountAmount(values.accountNo);
    return {
      accountNo: validateBalance(accountBalance, bill.billAmount),
      ...validateRequiredFields(values, ['accountNo'])
    };
  },
  onSubmit: (values, dispatch, {navigation}) => {
    const {bill} = navigation.state.params;
    dispatch(confirmationWaterBill(bill));
  },
  initialValues: {
    accountNo: {}
  }
};

const mapStateToProps = (state) => ({
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.WaterBillerPayment.values', {})
});

const mapDispatchToProps = (dispatch) => ({
  updateAccounts: () => {
    dispatch(updateBalances());
  },
  confirmationWaterBill: (bill) => dispatch(confirmationWaterBill(bill))
});

class WaterBillPayment extends React.Component {
  static propTypes = {
    updateAccounts: PropTypes.func,
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    navigation: PropTypes.object,
  };

  componentDidMount () {
    this.props.updateAccounts();
  }

  render () {
    const {accounts, formValues, navigation, ...extraProps} = this.props;
    const {bill} = navigation.state.params;

    return <PaymentSelection formValues={formValues} billDetails={bill} amount={bill.billAmount} accounts={accounts} {...extraProps} />;
  }
}

const ContainerForm = reduxForm(formConfig)(WaterBillPayment);

export default connect(mapStateToProps, mapDispatchToProps)(ContainerForm);
