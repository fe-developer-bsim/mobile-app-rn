import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CreditCardTransactionDetail from '../../components/CreditCardManageJourney/CreditCardTransactionDetail.component';
import {reduxForm} from 'redux-form';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {getInstallmentPeriode, getInstallmentPeriodeNew} from '../../state/thunks/creditCardManage.thunks';

const formConfig = {
  form: 'CreditCardTransactionDetail'
};

const ConnectedForm = reduxForm(formConfig)(CreditCardTransactionDetail);

class CreditCardTransactionDetailPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    setStatus: PropTypes.func,
    moveTo: PropTypes.func,
    navigageToSetInstallment: PropTypes.func,
    navigageToSetInstallmentNew: PropTypes.func,
    isDisable: PropTypes.bool
  }

  componentDidMount () {
    const {navigation} = this.props;
    const amount = result(navigation, 'state.params.params.amount');
    const selectedAccount = result(navigation, 'state.params.selectedAccount');
    this.props.navigageToSetInstallmentNew(selectedAccount, amount);
  }

  _goToSetInstallment = () => {
    const {navigation} = this.props;
    const selectedAccount = result(navigation, 'state.params.selectedAccount');
    const amount = result(navigation, 'state.params.params.amount');
    const CCtransaction = result(navigation, 'state.params.params');
    this.props.navigageToSetInstallment(selectedAccount, amount, CCtransaction);
  }

  render () {
    const {navigation, moveTo, isDisable} = this.props;
    const selectedAccount = result(navigation, 'state.params.selectedAccount');
    const CCtransaction = result(navigation, 'state.params.params');
    return (
      <ConnectedForm
        selectedAccount={selectedAccount}
        moveTo={moveTo}
        navigation={navigation}
        CCtransaction = {CCtransaction}
        chageToInstallment = {this._goToSetInstallment}
        isDisable={isDisable}
      />

    );
  }
}

const mapStateToProps = (state) => ({
  isDisable: result(state, 'ccInstallmentDisable', false),
});

const mapDispatchToProps = (dispatch) => ({
  navigageToSetInstallment: (selectedAccount, amount, formValues) => dispatch(getInstallmentPeriode(selectedAccount, amount, formValues)),
  navigageToSetInstallmentNew: (selectedAccount, amount, formValues) => dispatch(getInstallmentPeriodeNew(selectedAccount, amount, formValues)),
});

const connectedCreditCardTransactionDetail = connect(mapStateToProps, mapDispatchToProps)(CreditCardTransactionDetailPage);
export default connectedCreditCardTransactionDetail;
