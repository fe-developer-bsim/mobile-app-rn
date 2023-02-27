import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CardLessWithdrawalAccount from '../../components/CardLessWithdrawalJourney/CardLessWithdrawalAccount.component';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import result from 'lodash/result';
import {setupCardlessWithdrawal} from '../../state/thunks/fundTransfer.thunks';
import {generateCardlessWithdrawal, selectedBank} from '../../utils/transformer.util';
import {validateRequiredFields, validatePhoneNumber} from '../../utils/validator.util';

const formConfig = {
  form: 'CardLessWithdrawalAccount',
  destroyOnUnmount: false,
  validate: (values) => {
    const errors = validateRequiredFields(values, ['phoneNumber', 'description']);
    errors['phoneNumber'] = validatePhoneNumber(result(values, 'phoneNumber', ''));
    return errors;
  },
  initialValues: {
    phoneNumber: '',
    bank: {},
    description: ''
  },
  onSubmit: (values, dispatch, {bankList, prefixCardlessWithdrawal}) => {
    const validBankList = selectedBank('489370', bankList);
    const bank = result(validBankList, '[0]', []);
    const payee = generateCardlessWithdrawal(values.phoneNumber, bank, values.description, prefixCardlessWithdrawal);
    return dispatch(setupCardlessWithdrawal(payee));
  }
};

const DecoratedCardLessWithdrawalAccount = reduxForm(formConfig)(CardLessWithdrawalAccount);

class CardLessWithdrawalAccountPage extends Component {
  static propTypes = {
    onBankAccountPress: PropTypes.func,
    onPayeeAccountPress: PropTypes.func,
    onNextPress: PropTypes.func,
    navigation: PropTypes.object,
    payeeDisabled: PropTypes.bool,
    bankList: PropTypes.array,
    prefixCardlessWithdrawal: PropTypes.string,
    updatePhoneNumber: PropTypes.func
  }

  updateFormFromNavProps = () => {
    const {navigation, updatePhoneNumber} = this.props;
    const params = result(navigation, 'state.params', {});
    const {payeeAccNo} = params;
    payeeAccNo && updatePhoneNumber(payeeAccNo);
  }

  componentDidMount () {
    this.updateFormFromNavProps();
  }

  render () {
    const {onNextPress, bankList, prefixCardlessWithdrawal} = this.props;
    return <DecoratedCardLessWithdrawalAccount
      onNextPress={onNextPress}
      bankList={bankList}
      prefixCardlessWithdrawal={prefixCardlessWithdrawal}/>;
  }
}

const mapStateToProps = (state) => ({
  bankList: result(state, 'valueBankList.bankList', []),
  prefixCardlessWithdrawal: result(state, 'config.cardlessWithdrawalPrefix', ''),
});

const mapDispatchToProps = (dispatch) => ({
  updatePhoneNumber: (accNo) => {
    dispatch(change('CardLessWithdrawalAccount', 'phoneNumber', accNo));
  },
});

const ConnectedCardLessWithdrawalAccountPage = connect(mapStateToProps, mapDispatchToProps)(CardLessWithdrawalAccountPage);

export default ConnectedCardLessWithdrawalAccountPage;
