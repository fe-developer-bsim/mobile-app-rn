import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import CreditCardTransactionManagement from '../../components/CreditCardManageJourney/CreditCardTransactionManagement.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';
import {TxnManage, GetTxnManage} from '../../state/thunks/creditCardManage.thunks';


const formConfig = {form: 'CreditCardTransactionManagement'};

const ConnectedForm = reduxForm(formConfig)(CreditCardTransactionManagement);

class CreditCardTransactionManagementPage extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    triggerAuth: PropTypes.func,
    dispatch: PropTypes.func,
    txnManage: PropTypes.func,
    moveTo: PropTypes.func,
    gettxnManage: PropTypes.func,
    flag: PropTypes.object
  }

  render () {
    const {navigation = {}, triggerAuth, txnManage, moveTo, gettxnManage, flag} = this.props;
    const selectedAccount = result(navigation, 'state.params.selectedAccount');

    return (
      <ConnectedForm
        selectedAccount={selectedAccount}
        triggerAuth={triggerAuth}
        txnManage={txnManage}
        moveTo={moveTo}
        navigation={navigation}
        gettxnManage={gettxnManage}
        txnValue={flag}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  transRefNum: result(state, 'transRefNum'),
  flag: result(state, 'creditCardTrxManageReducer')
});

const mapDispatchToProps = (dispatch) => ({
  txnManage: (selectedAccount, flagECommerce, flagCav, flagOverSeas, allowEcommTxn, allowCavTxn, allowOverseaTxn) => dispatch(TxnManage(selectedAccount, flagECommerce, flagCav, flagOverSeas, allowEcommTxn, allowCavTxn, allowOverseaTxn)),
  gettxnManage: (selectedAccount) => dispatch(GetTxnManage(selectedAccount)),
  moveTo: (routeName, params) => dispatch(NavigationActions.navigate({routeName: routeName, params: {...params}}))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardTransactionManagementPage);
