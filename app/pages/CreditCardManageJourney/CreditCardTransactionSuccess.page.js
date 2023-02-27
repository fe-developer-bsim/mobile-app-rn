import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CreditCardTransactionSuccess from '../../components/CreditCardManageJourney/CreditCardTransactionSuccess.component';
import {reduxForm} from 'redux-form';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {resetToDashboardFrom, refreshStorageNew} from '../../state/thunks/common.thunks';
import {hidePaymentModal} from '../../state/actions/index.actions.js';


const formConfig = {
  form: 'CreditCardTransactionSuccess'
};

const ConnectedForm = reduxForm(formConfig)(CreditCardTransactionSuccess);

class CreditCardTransactionSuccessPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    setStatus: PropTypes.func,
    returnToDash: PropTypes.func,
  }

  render () {
    const {navigation, returnToDash} = this.props;
    const formValues = result(navigation, 'state.params.formValues');
    const periode = result(navigation, 'state.params.periode');
    const selectedAccount = result(navigation, 'state.params.selectedAccount');

    return (
      <ConnectedForm
        formValues={formValues}
        periode={periode}
        selectedAccount={selectedAccount}
        returnToDashboard={returnToDash}
      />
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  returnToDash: () => {
    dispatch(refreshStorageNew());
    dispatch(hidePaymentModal());
    dispatch(resetToDashboardFrom('Landing'));
  },
});

const connectedCreditCardTransactionSuccess = connect(null, mapDispatchToProps)(CreditCardTransactionSuccessPage);
export default connectedCreditCardTransactionSuccess;
