import React from 'react';
import PropTypes from 'prop-types';
import CreditCardAccount from '../../components/CreditCardJourney/CreditCardAccount.component';
import {validateRequiredFields, validateCreditCard} from '../../utils/validator.util';
import {reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import {getCreditCardInquiry, getPayeeNameCc} from '../../state/thunks/common.thunks';
import {CardIOModule} from 'react-native-awesome-card-io';
import result from 'lodash/result';
import find from 'lodash/find';
import {isSimasPayee, selectedBank, getFilteredBillerData, isInBin} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';

const formConfig = {
  form: 'creditcard',
  validate: (values) => {
    const errors = {
      accNo: validateCreditCard(values.accNo),
      ...validateRequiredFields(values, ['accNo', 'name', 'bank'])};
    return errors;
  },
  onSubmit: (values, dispatch, {payees, bankList, biller}) => {
    const validBankList = selectedBank(values.accNo, bankList);
    const bank = result(validBankList, '[0]', values.bank);
    const payee = find(payees, {'accountNumber': values.accNo});
    const payeeID = payee && payee.id ? Number(payee.id) : undefined;
    const name = result(payee, '.name', values.name);
    if (isSimasPayee(values.accNo, bankList) || bank.isSinarmas) {
      dispatch(getCreditCardInquiry(bank, values.accNo, biller, name, payeeID));
    } else {
      dispatch(NavigationActions.navigate({routeName: 'CreditCardPayment', params: {accNo: values.accNo, name, bank, id: payeeID}}));
    }
  },
  initialValues: {
    accNo: '',
    bank: {},
    payeeNameDisabled: true,
    name: ''
  }
};


const CreditCardAccountForm = reduxForm(formConfig)(CreditCardAccount);

class CreditCardAccountPage extends React.Component {
  static propTypes = {
    formValues: PropTypes.object,
    navigation: PropTypes.object,
    biller: PropTypes.array,
    setCardNumber: PropTypes.func,
    onBankPress: PropTypes.func,
    payees: PropTypes.array,
    updateBank: PropTypes.func,
    getPayeeDetails: PropTypes.func,
    bankList: PropTypes.array,
    payeeDisabled: PropTypes.bool,
    updateName: PropTypes.func,
    updatePayeeDisabled: PropTypes.func,
    updateAccNo: PropTypes.func,
    bank: PropTypes.object,
    payeeAccNo: PropTypes.string,
  }

  getCardNumber = () => {
    const {updateBank, bankList, getPayeeDetails, updateName} = this.props;
    CardIOModule.
      scanCard({
        hideCardIOLogo: true,
        suppressManualEntry: true,
        requireExpiry: false,
        requireCVV: false,
        scanExpiry: false,
        keepStatusBarStyle: true,
        suppressConfirmation: true
      }).
      then((card) => {
        const accNo = card.cardNumber;
        const bank = selectedBank(accNo, bankList);
        this.props.setCardNumber(card.cardNumber);
        if (isInBin(accNo, bankList)) {
          updateBank(result(bank, '[0]'));
          getPayeeDetails(result(bank, '[0]'), accNo);
        } else {
          updateBank('');
          updateName('');
        }
      }).catch(() => {
      // user termination - catch here
      });
  }

  updateFormFromNavProps = () => {
    const {bank, getPayeeDetails, payeeAccNo} = this.props;
    (payeeAccNo || bank) && getPayeeDetails();
  }

  componentDidMount () {
    this.updateFormFromNavProps();
  }

  render () {
    const {payees, formValues, bankList, onBankPress, biller, getPayeeDetails, updateName, updateBank, updatePayeeDisabled} = this.props;
    return (<CreditCardAccountForm
      bankList={bankList}
      onBankPress={onBankPress}
      biller={biller}
      formValues={formValues}
      payees={payees}
      scanCard={this.getCardNumber}
      getPayeeDetails={getPayeeDetails}
      updateName={updateName}
      updateBank={updateBank}
      updatePayeeDisabled={updatePayeeDisabled}
    />);
  }
}

const mapStateToProps = (state) => ({
  formValues: result(state, 'form.creditcard.values', {}),
  payees: result(state, 'payees'),
  bankList: result(state, 'valueBankList.bankList', []),
  biller: getFilteredBillerData(result(state, 'billerConfig', []), 'CC')
});

const mapDispatchToProps = (dispatch) => ({
  setCardNumber: (cardNumber) => dispatch(change('creditcard', 'accNo', cardNumber)),
  onBankPress: () => dispatch(NavigationActions.navigate({routeName: 'CreditCardSelectBank'})),
  updateAccNo: (accNo) => {
    dispatch(change('creditcard', 'accNo', accNo));
  },
  updateBank: (bank) => {
    dispatch(change('creditcard', 'bank', bank));
  },
  updateName: (name) => {
    dispatch(change('creditcard', 'name', name));
  },
  updatePayeeDisabled: (disable) => {
    dispatch(change('creditcard', 'payeeNameDisabled', disable));
  },
  getPayeeDetails: (bank, accNo) => {
    dispatch(getPayeeNameCc(bank, accNo));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardAccountPage);
