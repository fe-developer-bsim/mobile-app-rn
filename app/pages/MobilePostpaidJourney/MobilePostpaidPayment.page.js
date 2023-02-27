import React from 'react';
import PropTypes from 'prop-types';
import MobilePostpaidPayment from '../../components/MobilePostpaidJourney/MobilePostpaidPayment.component';
import {validateRequiredFields, validateBalance} from '../../utils/validator.util';
import {reduxForm} from 'redux-form';
import result from 'lodash/result';
import {updateBalances} from '../../state/thunks/common.thunks';
import {connect} from 'react-redux';
import {getAccountAmount, getTransferPossibleAccounts} from '../../utils/transformer.util';
import {confirmationPostpaidBill} from '../../state/thunks/mobilePostpaid.thunks';

const formConfig = {
  form: 'MobilePostpaidPaymentForm',
  validate (values, props) {
    const selectedAccountBalance = getAccountAmount(values.accountNumber);
    return {
      accountNumber: validateBalance(selectedAccountBalance, props.billDetails.billAmount),
      ...validateRequiredFields(values, ['topupAmount', 'myAccount'])
    };
  },
  initialValues: {
    accountNumber: {}
  },
  onSubmit (values, dispatch, {biller, billDetails, navigation}) { // third argument is props
    const mobileNo = navigation.state.params.mobileNo;
    dispatch(confirmationPostpaidBill(biller, billDetails, mobileNo));
  }
};

const mapStateToProps = (state) => ({
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
  selectedAccount: result(state, 'form.MobilePostpaidPaymentForm.values.accountNumber', {})
});

const mapDispatchToProps = (dispatch) => ({
  populateAccounts () {
    dispatch(updateBalances());
  }
});

const ContainerForm = reduxForm(formConfig)(MobilePostpaidPayment);

class MobilePostpaidPaymentPage extends React.Component {
  static propTypes = {
    populateAccounts: PropTypes.func,
    navigation: PropTypes.object,
    confirmationPostpaidBill: PropTypes.func,

  }
  componentWillMount () {
    this.props.populateAccounts();
  }
  render () {
    const {biller, billDetails} = this.props.navigation.state.params;
    return <ContainerForm {...this.props} biller={biller} billDetails={billDetails} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobilePostpaidPaymentPage);
