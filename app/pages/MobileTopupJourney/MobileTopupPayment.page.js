import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {change, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import MobileTopupPayment from '../../components/MobileTopupJourney/MobileTopupPayment.component';
import {updateBalances} from '../../state/thunks/common.thunks';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';
import result from 'lodash/result';
import {validateRequiredFields, validateBalance} from '../../utils/validator.util';
import {getAccountAmount} from '../../utils/transformer.util';
import {confirmationMobileTopUp} from '../../state/thunks/mobileTopup.thunks';

const formConfig = {
  form: 'MobileTopupForm',
  validate: (values) => {
    const selectedAccountBalance = getAccountAmount(values.myAccount);
    const amount = (values.topupAmount) ? values.topupAmount.id : '';
    return {
      myAccount: validateBalance(selectedAccountBalance, amount),
      ...validateRequiredFields(values, ['topupAmount', 'myAccount'])
    };
  },
};

const DecoratedMobileTopupPayment = reduxForm(formConfig)(MobileTopupPayment);

class MobileTopupPaymentPage extends Component {
  static propTypes = {
    populateAccounts: PropTypes.func,
    goToConfirmation: PropTypes.func,
    setMobileAndAmount: PropTypes.func,
    accountList: PropTypes.array,
    formValues: PropTypes.object,
    navigation: PropTypes.object,
    confirmationMobileTopUp: PropTypes.func
  };

  componentWillMount () {
    const {populateAccounts, setMobileAndAmount, navigation} = this.props;
    const {topupInfo} = result(navigation, 'state.params', {});
    if (topupInfo) {
      const mobileNumber = topupInfo.subscriberNoInput;
      const tAmount = topupInfo.amount;
      setMobileAndAmount(mobileNumber, tAmount);
    }
    populateAccounts();
  }

  render () {
    const {goToConfirmation, navigation, accountList, formValues} = this.props;
    const {topupInfo = {}, biller} = result(navigation, 'state.params', {});
    const selectedBiller = topupInfo.biller || biller;
    return (
      <DecoratedMobileTopupPayment accountList={accountList} formValues={formValues} onNextPress={goToConfirmation} biller={selectedBiller}/>
    );
  }
}

const mapStateToProps = (state) => ({
  formValues: result(state, 'form.MobileTopupForm.values', {}),
  accountList: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp')
});

const mapDispatchToProps = (dispatch) => ({
  populateAccounts: () => {
    dispatch(updateBalances());
  },
  setMobileAndAmount: (mobileNo, topupAmount) => {
    dispatch(change('MobileTopupForm', 'mobileNo', mobileNo));
    dispatch(change('MobileTopupForm', 'topupAmount', topupAmount));
  },
  goToConfirmation: (biller) => {
    dispatch(confirmationMobileTopUp(biller));
  }
});

const connectedTransfer = connect(mapStateToProps, mapDispatchToProps)(MobileTopupPaymentPage);
export default connectedTransfer;
