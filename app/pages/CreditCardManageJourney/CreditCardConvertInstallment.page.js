import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CreditCardConvertInstallment from '../../components/CreditCardManageJourney/CreditCardConvertInstallment.component';
import {reduxForm, change} from 'redux-form';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {getInstallmentPeriodeManage} from '../../state/thunks/creditCardManage.thunks';

const formConfig = {
  form: 'CreditCardConvertInstallment',
};

const ConnectedForm = reduxForm(formConfig)(CreditCardConvertInstallment);

class CreditCardConvertInstallmentPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    navigageToSetInstallment: PropTypes.func,
    formValues: PropTypes.object
  }

  _goToSetInstallment = () => {
    const {formValues, navigation} = this.props;
    const selectedAccount = result(navigation, 'state.params.selectedAccount');
    const amount = result(formValues, 'transaction.sublabel');
    const form = result(formValues, 'transaction');
    this.props.navigageToSetInstallment(selectedAccount, amount, form);
  }

  render () {
    const {navigation, formValues} = this.props;
    const data = result(navigation, 'state.params');
    const selectedAccount = result(navigation, 'state.params.selectedAccount');
    const CCtransaction = result(navigation, 'state.params.CCtransaction');
    return (
      <ConnectedForm
        data={data}
        selectedAccount={selectedAccount}
        CCtransaction={CCtransaction}
        toSetInstallment={this._goToSetInstallment}
        formValues={formValues}
      />
    );
  }
}

const mapStateToProps = (state) =>   ({
  formValues: result(state, 'form.CreditCardConvertInstallment.values', {}),
});

const mapDispatchToProps = (dispatch) => ({
  setStatus: (status) => {
    dispatch(change('CreditCardManageInputForm', 'status', status));
  },
  navigageToSetInstallment: (selectedAccount, amount, formValues) => dispatch(getInstallmentPeriodeManage(selectedAccount, amount, formValues)),

});

const connectedCreditCardConvertInstallment = connect(mapStateToProps, mapDispatchToProps)(CreditCardConvertInstallmentPage);
export default connectedCreditCardConvertInstallment;
