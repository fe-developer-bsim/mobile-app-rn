import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import SavingAccount, {fields} from '../../components/CreateNewSavingAccount/SavingAccountForm3.component';
import {validateRequiredFields, validateNumber, validateMonthlyIncome} from '../../utils/validator.util';
import {connect} from 'react-redux';
import {isEmpty, startsWith, result, sortBy, find} from 'lodash';
import {getDataOptions} from '../../utils/middleware.util';
import {createCreditCardForm} from '../../state/thunks/savingAccount.thunks';

const formConfig = {
  form: 'SavingForm3',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {navigation, numberOfDependant2}) => {
    const checkpoint = result(navigation, 'state.params.checkpoint', false);
    const existing = result(navigation, 'state.params.existing', false);
    const statusForm = 'NEXT';
    const pageName = 'SavingAccountForm4';
    dispatch(change('SavingForm3', 'numberOfDependant2', numberOfDependant2)),
    dispatch(createCreditCardForm(statusForm, pageName, checkpoint, existing));
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.WORK, fields.MONTHLY_INCOME, fields.SOURCE_OF_FUND])
    };
    return {
      monthlyIncome: validateMonthlyIncome(values.monthlyIncome),
      ...errors,
    };
  }
};

const mapStateToProps = (state) => ({
  jobOptions: sortBy(getDataOptions(result(state, 'configEmoney.emoneyConfig.listJobConfig', {})), ['id']),
  monthlyIncome: result(state, 'form.SavingForm3.values.monthlyIncome', ''),
  sourceOfFund: result(state, 'form.SavingForm3.values.sourceOfFund', ''),
  listWorker: result(state, 'configEForm.listConfigEform.listWorker', []),
  listSourceOfFund: result(state, 'configEForm.listConfigEform.sourceOfFund', []),
  isLogin: !isEmpty(result(state, 'user', {})),
  accountList: result(state, 'accounts', []),
  cifCode: result(state, 'user.profile.customer.cifCode', '')
});

const mapDispatchToProps = () => ({

});


const SavingAccountForm = reduxForm(formConfig)(SavingAccount);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(SavingAccountForm);

class SavingAccountForm3 extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    listWorker: PropTypes.array,
    listSourceOfFund: PropTypes.array,
    isLogin: PropTypes.bool,
    accountList: PropTypes.array,
    cifCode: PropTypes.string,
  }

  state = {
    numberOfDependant2: 0,
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('monthlyIncome' === typeField) {
      if (isEmpty(validateNumber(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('sourceOfFund' === typeField) {
      if (isEmpty(validateNumber(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  addQuantity = () => {
    if (this.state.numberOfDependant2 < 10) {
      this.setState({numberOfDependant2: this.state.numberOfDependant2 + 1});
    }
  }

  minusQuantity = () => {
    if (this.state.numberOfDependant2 > 0) {
      this.setState({numberOfDependant2: this.state.numberOfDependant2 - 1});
    }
  }

  render () {
    const {navigation, listWorker, listSourceOfFund, isLogin, accountList, cifCode} = this.props;
    const emoneyKycOnly = !find(accountList, {accountType: 'SavingAccount'}) && find(accountList, {accountType: 'emoneyAccount'}) && !startsWith(cifCode, 'NK');
    let isValidKyc = false;

    if (!startsWith(cifCode, 'NK')) {
      if (emoneyKycOnly) {
        isValidKyc = false;
      } else {
        isValidKyc = true;
      }
    } else {
      isValidKyc = false;
    }

    return (
      <ConnectedForm
        navigation={navigation}
        validationInput={this.validationInput()}
        listWorker={listWorker}
        listSourceOfFund={listSourceOfFund}
        isLogin={isLogin}
        addQuantity={this.addQuantity}
        minusQuantity={this.minusQuantity}
        numberOfDependant2={this.state.numberOfDependant2}
        isValidKyc={isValidKyc}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(SavingAccountForm3);
export default ConnectedFormPage;
