import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import OpenAndromaxForm from '../../components/OpenNewAccount/OpenAndromaxForm.component';
import {validateRequiredFields, validateBalance, validateEmail} from '../../utils/validator.util';
import {getUnformattedAccountAmount, getTransferPossibleAccounts} from '../../utils/transformer.util';
import {confirmOpenAndromax} from '../../state/thunks/openAccount.thunks';
import result from 'lodash/result';
import find from 'lodash/find';

const formConfig = {
  form: 'OpenAndromaxForm',
  destroyOnUnmount: false,
  validate: (values, props) => {
    let errors = {
      ...validateRequiredFields(values, ['accountNo', 'email']),
    };
    return {
      accountNo: validateBalance(props.availableBalance, props.minimumInitialDeposit),
      email: validateEmail(values.email),
      ...errors
    };
  },
  initialValues: {
    accountNo: {},
    amount: '',
  },
  onSubmit: (values, dispatch, props) => {
    const bankBranch = find(props.bankBranchList, (bank) => bank.address.includes('Roxy Square'));
    dispatch(confirmOpenAndromax(values, props.minimumInitialDeposit, result(bankBranch, 'code', '')));
  }
};

const mapStateToProps = (state) => ({
  accounts: result(state, 'accounts', []),
  formValues: result(state, 'form.OpenAndromaxForm.values', {}),
  openAccountConfig: result(state, 'openAccountConfig', {}),
});

const DecoratedForm = reduxForm(formConfig)(OpenAndromaxForm);

class OpenAndromaxFormPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    openAccountConfig: PropTypes.object,
    formValues: PropTypes.object,
    accounts: PropTypes.array,
  };

  render () {
    const {accounts = {}, formValues = {}, openAccountConfig} = this.props;
    const availableBalance = getUnformattedAccountAmount(formValues['accountNo']);
    const accountList = getTransferPossibleAccounts(accounts, 'ft');
    return <DecoratedForm
      formValues={formValues} availableBalance={availableBalance} accounts={accountList}
      {...openAccountConfig}
    />;
  }
}

export default connect(mapStateToProps, null)(OpenAndromaxFormPage);
