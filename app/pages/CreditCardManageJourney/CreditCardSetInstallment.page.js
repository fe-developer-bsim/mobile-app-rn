import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CreditCardSetInstallment from '../../components/CreditCardManageJourney/CreditCardSetInstallment.component';
import {reduxForm} from 'redux-form';
import {getInstallmentPeriode, setInstallmentConfirm} from '../../state/thunks/creditCardManage.thunks';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import {connect} from 'react-redux';

const formConfig = {
  form: 'CreditCardSetInstallment'
};

const ConnectedForm = reduxForm(formConfig)(CreditCardSetInstallment);

class CreditCardSetInstallmentPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    navigageToConfirmInstallment: PropTypes.func,
    getInstallmentPeriode: PropTypes.func,
    formVal: PropTypes.object,
    cCperiode: PropTypes.array
  }

  _goToConfirmInstallment = () => {
    const {navigation, formVal, cCperiode} = this.props;
    const formValues = result(navigation, 'state.params.formValues');
    const selectedAccount = result(navigation, 'state.params.selectedAccount');
    const perState = result(formVal, 'periode');
    const periode = perState === undefined ? cCperiode[0] : perState;
    this.props.navigageToConfirmInstallment(formValues, periode, selectedAccount);
  }

  render () {
    const {navigation, formVal, cCperiode} = this.props;
    const formValues = result(navigation, 'state.params.formValues', {});
    const cCperiodeOpt = result(cCperiode, '0', []);
    const perState = result(formVal, 'periode', {});
    const periode = perState === '' || isEmpty(perState) ? cCperiodeOpt : perState;
    return (
      <ConnectedForm
        formValues={formValues}
        formVal={formVal}
        toConfirmInstallment={this._goToConfirmInstallment}
        cCperiode={cCperiode}
        iPeriode={periode}
        navigation={navigation}
      />

    );
  }
}

const mapStateToProps = (state) => ({
  formVal: result(state, 'form.CreditCardSetInstallment.values', {}),
  cCperiode: result(state, 'ccPeriodInst', []),
});

const mapDispatchToProps = (dispatch) => ({
  navigageToConfirmInstallment: (formValues, periode, selectedAccount) => dispatch(setInstallmentConfirm(formValues, periode, selectedAccount)),
  getInstallmentPeriode: (accountNumber, amount) => dispatch(getInstallmentPeriode(accountNumber, amount)),
});

const connectedCreditCardSetInstallment = connect(mapStateToProps, mapDispatchToProps)(CreditCardSetInstallmentPage);
export default connectedCreditCardSetInstallment;
