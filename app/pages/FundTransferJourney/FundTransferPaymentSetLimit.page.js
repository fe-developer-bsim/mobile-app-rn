import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import FundTransferPayment, {fields}  from '../../components/FundTransferJourney/FundTransferPaymentSetLimit.component';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import {validateMaxTransferAmountSetLimit, validateRequiredString} from '../../utils/validator.util';
import {generatePayeeSetLimit, generatePayeeOnPage} from '../../utils/transformer.util';
import {confirmTransferSetLimit, setupFundTransferSetLimitConfirm, inbankList} from '../../state/thunks/fundTransfer.thunks';
import find from 'lodash/find';
import {listSetLimitTransaction} from '../../state/thunks/common.thunks';
import {getDefaultAccount} from '../../state/thunks/fundTransfer.thunks';


const formConfig = {
  form: 'fundTransfer',
  destroyOnUnmount: false,
  validate: (values) => {    
    const errors = {
      ...validateRequiredString(values, [fields.AMOUNT])
    };   
    return {
      amount: validateMaxTransferAmountSetLimit(values.amount),      
      ...errors,
    };
  },
  onSubmit: (values, dispatch, {debitAccountNo, creditAccountNo,  formValues, accountList, creditAccountList}) => {    
    const payeeAccount = find(creditAccountList, {accountNumber: creditAccountNo});  
    const myAccount = find(accountList, {accountNumber: debitAccountNo});  
    const payee = generatePayeeSetLimit(payeeAccount, myAccount);
    dispatch(confirmTransferSetLimit(formValues, payee, 'fundTransfer'));
  },
};

const DecoratedFundTransferPayment = reduxForm(formConfig)(FundTransferPayment);

class FundTransferPaymentPage extends Component {
  static propTypes = {
    goToSummary: PropTypes.func,
    setup: PropTypes.func,
    accountList: PropTypes.array,
    navigation: PropTypes.object,    
    dispatch: PropTypes.func,
    formValues: PropTypes.object,
    appConfig: PropTypes.object,
    gapTimeServer: PropTypes.number,
    goToPaymentMethod: PropTypes.func,
    goToSchedule: PropTypes.func,
    payeeAccNo: PropTypes.string,
    getSourceAcc: PropTypes.func,
    selectedSourceAcc: PropTypes.object,
    changeFormValues: PropTypes.func,
    setAmount: PropTypes.func,
    isLogin: PropTypes.bool,
    accounts: PropTypes.array,
    setNewSof: PropTypes.func,    
    listAddNew: PropTypes.array,    
    goToSetLimit: PropTypes.func,    
    inbankList: PropTypes.array, 
    payeeSinarmasBank: PropTypes.object,
    prefilledlimitPerTransaction: PropTypes.func,    
    bankSimas: PropTypes.string,    
    bankListData: PropTypes.string,
    bankListData2: PropTypes.string,    
    setupFundTransferSetLimitConfirm: PropTypes.func,    
    payeeList: PropTypes.array,   
    goSetPayee: PropTypes.func,    
    goToConfirmationSetLimit: PropTypes.func,
    listLimitID: PropTypes.array,
    creditAccountNumber: PropTypes.object,
    listCreditAccNo: PropTypes.array,
    debitAccountNumber: PropTypes.string,
    listDebitAccNo: PropTypes.array,    
    maximumLimit: PropTypes.object,
    maximum: PropTypes.array,    
    maximumLimitPerDay: PropTypes.object,
    maximumPerDay: PropTypes.array, 
    getList: PropTypes.array,    
    amountValueDay: PropTypes.string,
    amountValueTransaction: PropTypes.string,
    form: PropTypes.object,   
    getListCreditAcc: PropTypes.func,
    debitAccNo: PropTypes.string,
    listID: PropTypes.string,
    goToEditList: PropTypes.func,
    debitAccountNo: PropTypes.string,    
    debitAccountName: PropTypes.string,    
    creditAccountNo: PropTypes.string,    
    creditAccountName: PropTypes.string,  
    creditAccountList: PropTypes.array,
    creditValues: PropTypes.object,    
    triggerAuth: PropTypes.func,    
    sendVerification: PropTypes.func,    
    setLimitPerDay: PropTypes.func,
    state: PropTypes.object,
    limitPerDay: PropTypes.string,  
    limitPerTransaction: PropTypes.string,      
    currency: PropTypes.string,
    bank: PropTypes.string,
    idTargetAcc: PropTypes.string,    
    getDefaultAccount: PropTypes.func,
  };
  state = {
    scheduled: false,
    isValas: false,
  }
  
  
  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('amount' === typeField) {
      if (isEmpty(validateMaxTransferAmountSetLimit(val))) {
        return true;
      } else {
        return false;
      }
    }
  }
 
  goOnPage = () => {
    const {goSetPayee, debitAccountName, debitAccountNo, creditAccountName, bank, currency, creditAccountNo, idTargetAcc} = this.props;
    const payeeName = debitAccountName;
    const payeeNumber = debitAccountNo;
    const payeeBank = bank;
    const payeeCurrency = currency;    
    const payeeType = 'Bank Sinar Mas';
    const targetAccName = creditAccountName;
    const targetAccNo = creditAccountNo;
    const idTa = idTargetAcc;
    const payee = generatePayeeOnPage(payeeNumber, payeeName, payeeBank, payeeCurrency, payeeType, targetAccName, targetAccNo, idTa);
    goSetPayee(payee);
  }
  
  render () {
    const {formValues, goToSetLimit, setupFundTransferSetLimitConfirm, 
      inbankList,
      maximumLimit,
      maximum,
      maximumPerDay,
      maximumLimitPerDay,
      listAddNew,
      getList,
      debitAccNo,
      listID,
      debitAccountNo,
      debitAccountName,
      creditAccountNo,
      creditAccountName,
      limitPerDay,
      limitPerTransaction,
      currency,
      bank,
      idTargetAcc,
      accountList,
      creditAccountList
    } = this.props;
   
    return (
      <DecoratedFundTransferPayment 
        onNextPress={this.onNext}
        formValues={formValues}    
        goToSetLimit={goToSetLimit} 
        goSetPayee={this.goOnPage}  
        setupFundTransferSetLimitConfirm={setupFundTransferSetLimitConfirm}
        goConfirmation={this.nextPage}
        inbankList={inbankList}
        maximumLimit={maximumLimit}
        maximum={maximum}
        maximumPerDay={maximumPerDay}
        maximumLimitPerDay={maximumLimitPerDay}
        listAddNew={listAddNew}
        getList={getList}
        debitAccNo={debitAccNo}
        listID={listID}
        debitAccountNo={debitAccountNo}
        debitAccountName={debitAccountName}
        creditAccountNo={creditAccountNo}
        creditAccountName={creditAccountName}
        limitPerDay={limitPerDay}
        limitPerTransaction={limitPerTransaction}      
        currency={currency}   
        bank={bank}      
        validationInput={this.validationInput}
        idTargetAcc={idTargetAcc}
        accountList={accountList}
        creditAccountList={creditAccountList}
      />
    );
  }
}
  
const mapStateToProps = (state) => ({
  accountList: result(state, 'accounts', []),
  formValues: result(state, 'form.fundTransfer.values', {}),
  appConfig: result(state, 'config', {}),
  gapTimeServer: result(state, 'gapTimeServer', 0),
  isLogin: !isEmpty(result(state, 'user', {})),
  accounts: result(state, 'accounts', {}),  
  listAddNew: result(state, 'listLimit', []),
  debitAccountNo: result(state, 'setLimitTransactionEdit.payload.debitAccountNumber', ''),    
  debitAccountName: result(state, 'setLimitTransactionEdit.payload.debitAccountName', ''),        
  creditAccountNo: result(state, 'setLimitTransactionEdit.payload.creditAccountNumber', ''),         
  creditAccountName: result(state, 'setLimitTransactionEdit.payload.name', ''),   
  limitPerDay: result(state, 'setLimitTransactionEdit.payload.limitPerDay', ''),      
  limitPerTransaction: result(state, 'setLimitTransactionEdit.payload.limitPerTransaction', ''),       
  getList: result(state, 'configEForm.listConfigEform.listAddNew', []),  
  drawer: result(state, 'drawer', false),
  creditAccountNumber: result(state, 'listLimit.creditAccount', ''),  
  creditAccNo: result(state, 'form.highValueTransfer.values.creditAccountNumber', ''),    
  listCreditAccNo: result(state, 'configEForm.listConfigEform.creditAccNo', []),
  debitAccountNumber: result(state, 'listLimit.debitAccount', ''),  
  debitAccNo: result(state, 'form.highValueTransfer.values.debitAccountNumber', ''),    
  listDebitAccNo: result(state, 'configEForm.listConfigEform.debitAccNo', []),    
  debitAccName: result(state, 'form.highValueTransfer.values.debitAccountName', ''),    
  listDebitAccName: result(state, 'configEForm.listConfigEform.debitAccName', []),    
  maximumLimit: result(state, 'listLimit.maximumLimit', []),  
  maxLimit: result(state, 'form.highValueTransfer.values.maximumLimit', ''),    
  maximum: result(state, 'configEForm.listConfigEform.maxLimit', []),
  maximumLimitPerDay: result(state, 'listLimit.maximumLimitPerDay', []),  
  maxLimitPerDay: result(state, 'form.highValueTransfer.values.maximumLimitPerDay', ''),    
  maximumPerDay: result(state, 'configEForm.listConfigEform.maxLimitPerDay', []),    
  amount: result(state, 'form.fundTransfer.values.amount', 0),
  creditAccountList: result(state, 'inbankTransferList', []),  
  listCreditAcc: result(state, 'configEForm.listConfigEform.creditAccountList', []),   
  currency: result(state, 'setLimitTransactionEdit.payload.currency', ''),   
  bank: result(state, 'setLimitTransactionEdit.payload.bank', ''),            
  idTargetAcc: result(state, 'setLimitTransactionEdit.payload.idTa', ''), 
  
    
});

const mapDispatchToProps = (dispatch) => ({
 
  goSetPayee: (payee) => {
    dispatch(setupFundTransferSetLimitConfirm(payee));
  },
  inbankList: (creditAccountList) => {
    dispatch(inbankList(creditAccountList));
  },
  listSetLimitTransaction: () => {
    dispatch(listSetLimitTransaction());
  },
  getDefaultAccount: () => dispatch(getDefaultAccount()),
});
  
const connectedTransfer = connect(mapStateToProps, mapDispatchToProps)(FundTransferPaymentPage);
export default connectedTransfer;