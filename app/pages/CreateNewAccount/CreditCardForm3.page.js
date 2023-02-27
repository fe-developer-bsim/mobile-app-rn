import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import CreditCard, {fields} from '../../components/CreateNewAccount/CreditCardForm3.component';
import {validateRequiredFields, validateNumber, validateMonthlyIncome} from '../../utils/validator.util';
import {connect} from 'react-redux';
import {isEmpty, startsWith, result, sortBy, find} from 'lodash';
import {getDataOptions} from '../../utils/middleware.util';
import {createCreditCardForm} from '../../state/thunks/ccEform.thunks';
import * as actionCreators from '../../state/actions/index.actions';

const formConfig = {
  form: 'CCForm3',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {navigation, numberOfDependant2, checkpointData}) => {
    const checkpoint = result(navigation, 'state.params.checkpoint', false);
    const checkpointPageName = result(checkpointData, '0.pageName', '');
    const existing = result(navigation, 'state.params.existing', false);
    const statusForm = 'NEXT';
    const goToPage = result(navigation, 'state.params.pageName', 'CreditCardForm4');
    let pageName = '';
    if (checkpoint) {
      if ((checkpointPageName === 'CreditCardForm9' || checkpointPageName === 'CreditCardDelivery' || checkpointPageName === 'CreditCardFinalize')) {
        pageName = 'CreditCardForm8';
      } else {
        pageName = goToPage;
      }
      dispatch(actionCreators.saveCheckpoint({...checkpointData, pageName}));
    } else {
      pageName = 'CreditCardForm4';
    }
    dispatch(change('CCForm3', 'numberOfDependant2', numberOfDependant2)),
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
  monthlyIncome: result(state, 'form.CCForm3.values.monthlyIncome', ''),
  sourceOfFund: result(state, 'form.CCForm3.values.sourceOfFund', ''),
  listWorker: result(state, 'configEForm.listConfigEform.listWorker', []),
  listSourceOfFund: result(state, 'configEForm.listConfigEform.sourceOfFund', []),
  isLogin: !isEmpty(result(state, 'user', {})),
  accountList: result(state, 'accounts', []),
  cifCode: result(state, 'user.profile.customer.cifCode', ''),
  checkpointData: result(state, 'checkpoint', {})
});

const mapDispatchToProps = (dispatch) => ({
  clearForm8: () => {
    dispatch(change('CCForm8', 'workStatus', ''));
    dispatch(change('CCForm8', 'startWork', ''));
    dispatch(change('CCForm8', 'startBusiness', ''));
    dispatch(change('CCForm8', 'latestPayslip', ''));
    dispatch(change('CCForm8', 'savingStatement1', ''));
    dispatch(change('CCForm8', 'savingStatement2', ''));
    dispatch(change('CCForm8', 'savingStatement3', ''));
  }
});


const CreditCardForm = reduxForm(formConfig)(CreditCard);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(CreditCardForm);

class CreditCardForm3 extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    listWorker: PropTypes.array,
    listSourceOfFund: PropTypes.array,
    isLogin: PropTypes.bool,
    accountList: PropTypes.array,
    cifCode: PropTypes.string,
    checkpointData: PropTypes.object,
    clearForm8: PropTypes.func
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
    const {navigation, listWorker, listSourceOfFund, isLogin, checkpointData, clearForm8, accountList, cifCode} = this.props;
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
        checkpointData={checkpointData}
        clearForm8={clearForm8}
        isValidKyc={isValidKyc}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(CreditCardForm3);
export default ConnectedFormPage;
