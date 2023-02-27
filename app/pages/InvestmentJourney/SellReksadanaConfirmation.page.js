import React from 'react';
import PropTypes from 'prop-types';
import BuyReksadana from '../../components/InvestmentJourney/SellReksadanaConfirmation.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {redemptionReksadana} from '../../state/thunks/dashboard.thunks';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';

const formConfig = {
  form: 'sellReksadana',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {doRedemption, triggerAuth, formValues}) => {
    const params = {onSubmit: doRedemption, amount: formValues.amount};
    triggerAuth(formValues.amount, params);
  }
};

const DecoratedReksadana = reduxForm(formConfig)(BuyReksadana);

const mapStateToProps = (state) => ({
  currentLanguage: result(state, 'currentLanguage.id', 'id'),
  accountList: getTransferPossibleAccounts(result(state, 'accounts', []), 'ft'),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, params) => dispatch(triggerAuthNavigate('reksadana', amount, false, 'AuthDashboard', params)),
  redemption: (values, item, total, totalFee, redemAll) => {
    dispatch(redemptionReksadana(values, item, total, totalFee, redemAll));
  }
});

class BuyReksadanaform extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    triggerAuth: PropTypes.func,
    redemption: PropTypes.func,
    accountList: PropTypes.array
  }

  doRedemption = () => {
    const {redemption, navigation} = this.props;
    const formValues = result(navigation, 'state.params.formValues', {});
    const item = result(navigation, 'state.params.item', {});
    const unit = parseInt(result(formValues, 'amount', 0));
    const NABPerUnit = result(item, 'detailPortfolio.portfolio.0.NAB_Per_Unit', 0);
    const total = unit * NABPerUnit;
    const totalFee = result(navigation, 'state.params.totalFee', 0);
    const redemAll = result(navigation, 'state.params.editableInput', false);

    redemption(formValues, item, total, totalFee, redemAll);
  }

  render () {
    const {navigation, triggerAuth, accountList} = this.props;
    const formValues = result(navigation, 'state.params.formValues', {});
    const item = result(navigation, 'state.params.item', {});
    const totalFee = result(navigation, 'state.params.totalFee', 0);
    const responseUnit = result(navigation, 'state.params.responseUnit', '');

    return (
      <DecoratedReksadana doRedemption={this.doRedemption} triggerAuth={triggerAuth} formValues={formValues} item={item}
        accountList={accountList} totalFee={totalFee} responseUnit={responseUnit}/>
    );
  }
}


const connectedTransfer = connect(mapStateToProps, mapDispatchToProps)(BuyReksadanaform);
export default connectedTransfer;
