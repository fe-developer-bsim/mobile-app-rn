import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import CreditCard, {fields} from '../../components/CreateNewAccount/CreditCardForm6.component';
import {validateRequiredFields, validateNumber, validateNameEform, validateIdNumber, checkLimitCreateCC, getTotalDeposit} from '../../utils/validator.util';
import {connect} from 'react-redux';
import {isEmpty, result, startsWith, find} from 'lodash';
import {createCreditCardForm} from '../../state/thunks/ccEform.thunks';
import {getTransferPossibleShariaAccounts} from '../../utils/transformer.util';

const formConfig = {
  form: 'CCForm6',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {navigation}) => {
    const checkpoint = result(navigation, 'state.params.checkpoint', false);
    const statusForm = 'NEXT';
    const pageName = 'CreditCardForm7';
    dispatch(createCreditCardForm(statusForm, pageName, checkpoint));
  },
  validate: (values, {ccCode}) => {
    const currentAddressSince = result(values, 'currentAddressSince', '').toString();
    const value = {...values, currentAddressSince};
    let errors = {};
    if (ccCode === 'CCT-SIMOBI-002') {
      errors = {
        ...validateRequiredFields(value, [fields.CARD_NAME, fields.CREDIT_LIMIT, fields.CURRENT_ADDRESS_STATUS,
          fields.CREDIT_TOTAL, fields.CURRENT_ADDRESS_SINCE, fields.PAYMENT_TYPE]),
      };
    } else {
      errors = {
        ...validateRequiredFields(value, [fields.CARD_NAME, fields.CREDIT_LIMIT, fields.CURRENT_ADDRESS_STATUS,
          fields.CREDIT_TOTAL, fields.SOURCE_OF_FUND_PAYMENT, fields.CURRENT_ADDRESS_SINCE, fields.PAYMENT_TYPE]),
      };
    }
    return {
      creditLimit: checkLimitCreateCC(result(values, 'creditLimit', 0), ccCode),
      ...errors,
    };
  }
};

const mapStateToProps = (state) => ({
  totalDeposit: getTotalDeposit(result(state, 'form.CCForm6.values.creditLimit', '')),
  addressStatusList: result(state, 'configEForm.listConfigEform.residenceStatus', []),
  ccCode: result(state, 'ccCode', ''),
  accounts: getTransferPossibleShariaAccounts(result(state, 'accounts', []), 'bp'),
  listPaymentType: result(state, 'configEForm.listConfigEform.listPaymentType', []),
  isLogin: !isEmpty(result(state, 'user', {})),
  accountList: result(state, 'accounts', []),
  cifCode: result(state, 'user.profile.customer.cifCode', '')
});

const mapDispatchToProps = () => ({
});

const CreditCardForm = reduxForm(formConfig)(CreditCard);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(CreditCardForm);

class CreditCardForm6 extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    addressStatusList: PropTypes.array,
    ccCode: PropTypes.string,
    accounts: PropTypes.array,
    listPaymentType: PropTypes.array,
    isLogin: PropTypes.bool,
    totalDeposit: PropTypes.number,
    accountList: PropTypes.array,
    cifCode: PropTypes.string
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('creditLimit' === typeField) {
      if (isEmpty(validateNumber(val) || validateIdNumber(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('cardName' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('currentAddressStatus' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('creditLimit' === typeField) {
      if (isEmpty(checkLimitCreateCC(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  render () {
    const {navigation, addressStatusList, ccCode, accounts, listPaymentType, isLogin, totalDeposit, accountList, cifCode} = this.props;
    const isEmoneyKyc = !isEmpty(find(accountList, {accountType: 'emoneyAccount'})) && !startsWith(cifCode, 'NK');
    return (
      <ConnectedForm
        navigation={navigation}
        validationInput={this.validationInput()}
        addressStatusList={addressStatusList}
        ccCode={ccCode}
        accounts={accounts}
        listPaymentType={listPaymentType}
        isLogin={isLogin}
        totalDeposit={totalDeposit}
        isEmoneyKyc={isEmoneyKyc}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(CreditCardForm6);
export default ConnectedFormPage;