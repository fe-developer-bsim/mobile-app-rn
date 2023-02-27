import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CreditCardConfirmInstallment from '../../components/CreditCardManageJourney/CreditCardConfirmInstallment.component';
import {reduxForm} from 'redux-form';
import {NavigationActions} from 'react-navigation';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {changeToInstallmet} from '../../state/thunks/creditCardManage.thunks';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';


const formConfig = {
  form: 'CreditCardConfirmInstallment',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {changeInstallmet, triggerAuth, formValues}) => {
    const amount = result(formValues, 'sublabel');
    const params = {onSubmit: changeInstallmet, amount: amount, isOtp: false};
    triggerAuth(amount, false, false, 'AuthDashboard', params, true);
  }
};

const ConnectedForm = reduxForm(formConfig)(CreditCardConfirmInstallment);

class CreditCardConfirmInstallmentPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    setStatus: PropTypes.func,
    moveTo: PropTypes.func,
    changeInstallmet: PropTypes.func,
    triggerAuth: PropTypes.func,
  }

  goToInstallment = () => {
    const {navigation, changeInstallmet} = this.props;
    const selectedAccount = result(navigation, 'state.params.selectedAccount');
    const formValues = result(navigation, 'state.params.formValues');
    const periode = result(navigation, 'state.params.periode');
    const arn = result(formValues, 'arn');
    const schmeId = result(periode, 'schmeId');
    const amount = result(formValues, 'sublabel');
    changeInstallmet(selectedAccount, amount, arn, schmeId, periode, formValues);
  }


  render () {
    const {navigation, moveTo, triggerAuth} = this.props;
    const selectedAccount = result(navigation, 'state.params.selectedAccount');
    const formValues = result(navigation, 'state.params.formValues');
    const periode = result(navigation, 'state.params.periode');

    return (
      <ConnectedForm
        formValues={formValues}
        periode={periode}
        selectedAccount={selectedAccount}
        moveTo={moveTo}
        changeInstallmet={this.goToInstallment}
        navigation={navigation}
        triggerAuth={triggerAuth}
      />

    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  moveTo: (routeName, params) => dispatch(NavigationActions.navigate({routeName: routeName, params: {...params}})),
  changeInstallmet: (selectedAccount, amount, arn, schmeId, periode, formValues) => dispatch(changeToInstallmet(selectedAccount, amount, arn, schmeId, periode, formValues)),
  triggerAuth: (amount, isNewPayee = false, isOwnAccount = false, routeName, params) => dispatch(triggerAuthNavigate('cashAdvanceCC', amount, isOwnAccount, routeName, params, isNewPayee)),
});

const connectedCreditCardConfirmInstallment = connect(null, mapDispatchToProps)(CreditCardConfirmInstallmentPage);
export default connectedCreditCardConfirmInstallment;
