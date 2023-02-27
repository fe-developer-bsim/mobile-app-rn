import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ChooseCloseCardComponent from '../../components/ManageAtmCard/ChooseCloseCard.component';
import {getTransferPossibleAccountsRemittanceClosing, getTransferPossibleAccountsNoGiro, getSavingValasPossibleAccounts} from '../../utils/transformer.util';
import {reduxForm} from 'redux-form';
import {NavigationActions} from 'react-navigation';
import isEmpty from 'lodash/isEmpty';

const formConfig = {
  form: 'recipientAccount',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'ClosingTnc'}));
  }
};

const mapStateToProps = (state) => ({
  accounts: getTransferPossibleAccountsNoGiro(result(state, 'closeAccountConfig.closingAccountException', []), result(state, 'accounts', []), 'ft', result(state, 'form.recipientAccount.values.accountNumber', '')),
  accountsFilterValas: getSavingValasPossibleAccounts(result(state, 'accounts', []), 'ft'),
  isValas: result(state, 'closeCard.currency', ''),
  accountValas: getTransferPossibleAccountsRemittanceClosing(result(state, 'accounts', []), 'ft', result(state, 'form.recipientAccount.values.accountNumber', ''), result(state, 'closeCard.currency', '')),
  formValues: result(state, 'form.recipientAccount.values', {}),
  valasCurrency: result(state, 'closeAccountConfig.closingAccountException', [])
});


const ChooseCloseCardForm = reduxForm(formConfig)(ChooseCloseCardComponent);

const ConnectedForm = connect(mapStateToProps)(ChooseCloseCardForm);

class ChooseCloseCardPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    productCode: PropTypes.string,
    currencySavingValas: PropTypes.string,
    accountsFilterValas: PropTypes.array,
    isValas: PropTypes.bool,
    chosenAccount: PropTypes.string,
    accountValas: PropTypes.array,
    formValues: PropTypes.object,
    valasCurrency: PropTypes.array
  };

  render () {
    const {navigation, accounts, formValues} = this.props; 
    const disabled = isEmpty(result(formValues, 'transferTo', '')); 

    return <ConnectedForm
      navigation={navigation}
      accounts={accounts}
      disabled={disabled}
    />;
  }
}

const ConnectedFormPage = connect(mapStateToProps)(ChooseCloseCardPage);
export default ConnectedFormPage;
