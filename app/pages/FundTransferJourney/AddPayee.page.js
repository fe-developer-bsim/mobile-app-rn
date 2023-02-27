import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AddPayee from '../../components/FundTransferJourney/AddPayee.component';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import {NavigationActions} from 'react-navigation';
import {result, find, isEmpty} from 'lodash';
import {getPayeeName, setupFundTransfer} from '../../state/thunks/fundTransfer.thunks';
import {generatePayee, formatTransferPayeeType, generatePayeeBiFast} from '../../utils/transformer.util';
import {validateRequiredFields, validatePhoneNumber} from '../../utils/validator.util';
import {language} from '../../config/language';

const formConfig = {
  form: 'addPayee',
  destroyOnUnmount: true,
  validate: (values, {unregisteredName, emoneyAccount, isBiFast}) => {
    const payeeType = result(values, 'payeeType.value', '');
    const prefixEmoney = result(values, 'banks.prefixEmoney', '');
    const companyCode = result(values, 'banks.companyCode', '');
    const payeeAcc = result(values, 'payeeAccNo', '');
    const isSimasEmoney = isBiFast ? null : prefixEmoney + companyCode === '3808' || payeeType === 'bank' && payeeAcc.substring(0, 4) === '3808';
    const payeeNameError = values.payeeName === unregisteredName && !isSimasEmoney ? language.ERROR_MESSAGE__HINT_PAYEE : undefined;
    const payeeAccNoError = payeeType === 'bank' ? undefined : validatePhoneNumber(values.payeeAccNo);
    const emoneyAccountError = isEmpty(emoneyAccount) && values.payeeName === unregisteredName ? language.ERROR_MESSAGE__EMONEY_ACCOUNT_ONLY : null;
    let errors = {
      ...validateRequiredFields(values, ['payeeAccNo', 'payeeName', 'bank', 'payeeName2', 'proxyAddress', 'bankName', 'accountNumberBiFast', 'payeeNameBiFast']),
      payeeName: payeeNameError || emoneyAccountError,
      payeeAccNo: payeeAccNoError,

    };
    return errors;
  },
  initialValues: {
    payeeName: '',
    payeeAccNo: '',
    bank: {},
    payeeNameDisabled: false,
    proxyAddress: '',
    bankName: '',
    accountNumberBiFast: '',
    payeeNameBiFast: '',
  },
  onSubmit: (values, dispatch, {ownEmoney, payeeList, payeeCurrency, amount, isSplitBill, dataTransRefNum, invoiceNumber, isBiFast, biFastPayee, accNoCust, payeeCurrencyBiFast}) => {
    const payeeName2 = result(values, 'payeeName2', '');
    const payeeName = payeeName2 !== '' ? payeeName2 : values.payeeName;
    const payeeAccNo = values.payeeAccNo;
    const bank = values.bank;
    const payeeType = values.payeeType;
    const accNo = payeeAccNo;
    const payee = generatePayee(accNo, payeeName, bank, payeeType, ownEmoney, payeeCurrency);
    const payeeBiFastNew = generatePayeeBiFast(accNo, payeeName, bank, payeeType, ownEmoney, payeeCurrencyBiFast, isBiFast, biFastPayee, accNoCust);
    const foundPayee = find(payeeList, {accountNumber: accNo});
    dispatch(setupFundTransfer(foundPayee ? foundPayee :  isBiFast ?  payeeBiFastNew : payee, amount, isSplitBill, dataTransRefNum, invoiceNumber));
  }
};

const DecoratedAddPayee = reduxForm(formConfig)(AddPayee);

class AddPayeePage extends Component {
  static propTypes = {
    onBankAccountPress: PropTypes.func,
    onPayeeAccountPress: PropTypes.func,
    onNextPress: PropTypes.func,
    updatePayeeAccNo: PropTypes.func,
    updateBank: PropTypes.func,
    getPayeeDetails: PropTypes.func,
    navigation: PropTypes.object,
    providerList: PropTypes.array,
    payeeDisabled: PropTypes.bool,
    payeeType: PropTypes.string,
    setPayeeType: PropTypes.func,
    bankList: PropTypes.array,
    clearBank: PropTypes.func,
    bank: PropTypes.object,
    payeeAccNo: PropTypes.string,
    unregisteredName: PropTypes.string,
    emoneyAccount: PropTypes.object,
    payeeName: PropTypes.string,
    payeeList: PropTypes.array,
    payeeForm: PropTypes.object,
    originalName: PropTypes.string,
    setEmoneyTransfer: PropTypes.func,
    emoneyPayeeData: PropTypes.object,
    cifString: PropTypes.string,
    accounts: PropTypes.array,
    isSplitBill: PropTypes.bool,
    dataTransRefNum: PropTypes.string,
    amount: PropTypes.string,
    payeeCurrency: PropTypes.string,
    biFastPayee: PropTypes.object,
    setBiFastPayee: PropTypes.func,
    payeeCurrencyBiFast: PropTypes.string,
  }

  updateFormFromNavProps = () => {
    const {bank, getPayeeDetails, payeeAccNo} = this.props;
    (payeeAccNo || bank) && getPayeeDetails();
  }

  componentDidMount () {
    const {navigation, updatePayeeAccNo, setEmoneyTransfer, biFastPayee, setBiFastPayee} = this.props;
    const params = result(navigation, 'state.params', {});
    const {payeeAccNo, emoneyPayeeData} = params;
    payeeAccNo && updatePayeeAccNo(payeeAccNo);
    this.props.setPayeeType();
    if (!isEmpty(emoneyPayeeData)) {
      setEmoneyTransfer(emoneyPayeeData);
    } else if (!isEmpty(biFastPayee)) {
      setBiFastPayee(biFastPayee);
    }
  }

  render () {
    const {onPayeeAccountPress, onBankAccountPress, onNextPress, payeeDisabled, providerList, payeeType, bankList, clearBank,
      navigation, unregisteredName, emoneyAccount, payeeName, payeeList, payeeForm, originalName, payeeCurrency, biFastPayee, payeeCurrencyBiFast} = this.props;
    const ownEmoney = result(navigation, 'state.params.ownEmoney', false);
    const params = result(navigation, 'state.params', {});
    const isSplitBill = result(params, 'isSplitBill');
    const dataTransRefNum = result(params, 'dataTransRefNum', '');
    const invoiceNumber = result(params, 'invoiceNumber', '');
    const amount = result(params, 'amount', '');
    const {payeeAccNo} = params;
    const payeeTypeList = formatTransferPayeeType();
    const isBiFast = result(params, 'isBiFast', false);
    const accNoCust = result(params, 'accNo', '');
    return <DecoratedAddPayee payeeNameDisabled={payeeDisabled}
      onPayeeAccountPress={onPayeeAccountPress}
      onBankNamePress={onBankAccountPress}
      onNextPress={onNextPress}
      payeeTypeList={payeeTypeList}
      providerList={providerList}
      payeeType={payeeType}
      getPayeeDetail={this.updateFormFromNavProps}
      bankList={bankList}
      clearBank={clearBank}
      ownEmoney={ownEmoney}
      unregisteredName={unregisteredName}
      emoneyAccount={emoneyAccount}
      payeeName={payeeName}
      payeeList={payeeList}
      payeeForm={payeeForm}
      payeeAccNo={payeeAccNo}
      originalName={originalName}
      isSplitBill={isSplitBill}
      dataTransRefNum={dataTransRefNum}
      amount={amount}
      payeeCurrency={payeeCurrency}
      invoiceNumber={invoiceNumber}
      isBiFast={isBiFast}
      biFastPayee={biFastPayee}
      accNoCust={accNoCust}
      payeeCurrencyBiFast={payeeCurrencyBiFast}
    />;

  }
}

const mapStateToProps = (state) =>  ({
  payeeDisabled: result(state, 'form.addPayee.values.payeeNameDisabled', false),
  providerList: result(state, 'configEmoney.emoneyConfig.listTransferConfig', []),
  payeeType: result(state, 'form.addPayee.values.payeeType.value', 'bank'),
  bankList: result(state, 'valueBankList.bankList', []),
  bank: result(state, 'form.addPayee.values.bank', {}),
  payeeAccNo: result(state, 'form.addPayee.values.payeeAccNo', ''),
  unregisteredName: result(state, 'configEmoney.emoneyConfig.pendingAccountName', ''),
  emoneyAccount: find(result(state, 'accounts', []), {accountType: 'emoneyAccount'}),
  payeeName: result(state, 'form.addPayee.values.payeeName', ''),
  payeeList: result(state, 'payees', []),
  payeeForm: result(state, 'form.addPayee.values', {}),
  originalName: result(state, 'form.addPayee.values.originalName', ''),
  cifString: result(state, 'user.profile.customer.cifCode', ''),
  payeeCurrency: result(state, 'payeeCurrency.currency', ''),  
  biFastPayee: result(state, 'payeeBiFast', {}),
  payeeCurrencyBiFast: result(state, 'payeeBiFast.currency', ''),
});

const mapDispatchToProps = (dispatch) => ({
  onPayeeAccountPress: () => dispatch(NavigationActions.back()),
  onBankAccountPress: () => dispatch(NavigationActions.navigate({routeName: 'AddPayeeBank'})),
  updatePayeeAccNo: (accNo) => {
    dispatch(change('addPayee', 'payeeAccNo', accNo));
  },
  setPayeeType: () => {
    dispatch(change('addPayee', 'payeeType', {label: language.TRANSFER__EMONEY, value: 'bank'}));
  },
  clearBank: () => {
    dispatch(change('addPayee', 'bank', {}));
    dispatch(change('addPayee', 'payeeName', ''));
  },
  setEmoneyTransfer: (emoneyPayeeData) => {
    dispatch(change('addPayee', 'originalName', emoneyPayeeData.targetName));
    dispatch(change('addPayee', 'payeeName', emoneyPayeeData.targetName));
    dispatch(change('addPayee', 'payeeNameDisabled', false));
    dispatch(change('addPayee', 'bank', emoneyPayeeData.bank));
  },
  getPayeeDetails: () => dispatch(getPayeeName()),
  setBiFastPayee: (biFastPayee) => {
    dispatch(change('addPayee', 'proxyAddress', biFastPayee.proxyValue));
    dispatch(change('addPayee', 'bankName', biFastPayee.targetAccountBankName));
    dispatch(change('addPayee', 'accountNumberBiFast', biFastPayee.targetAccountNumber));
    dispatch(change('addPayee', 'payeeNameBiFast', biFastPayee.targetAccountName));
  },
});

const ConnectedAddPayeePage = connect(mapStateToProps, mapDispatchToProps)(AddPayeePage);

export default ConnectedAddPayeePage;
