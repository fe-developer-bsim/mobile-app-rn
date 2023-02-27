import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import SetLimitEdit, {fields}  from '../../components/Account/SetLimitEdit.component';
import {connect} from 'react-redux';
import {change} from 'redux-form';
import {isEmpty, result} from 'lodash';
import {validateRequiredString, validateInputSetLimit} from '../../utils/validator.util';
import {inbankList} from '../../state/thunks/common.thunks';
import {triggerEditLimit, listSetLimitTransaction, goToEditSetLimitTransaction, easyPinDataToAddLimitTransactionEdit} from '../../state/thunks/common.thunks';


const formConfig = {
  form: 'autoFilledSetLimit',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => {
    dispatch(easyPinDataToAddLimitTransactionEdit());
  },
  validate: (values) => {    
    const errors = {
      ...validateRequiredString(values, [fields.LIMIT_PER_DAY, fields.LIMIT_PER_TRANSACTION]),
    };     

    return {
      limitPerDay: validateInputSetLimit(values.limitPerDay),      
      limitPerTransaction: validateInputSetLimit(values.limitPerTransaction),
      ...errors,
    
    };
  }
};

const mapStateToProps = (state) => ({    
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
  amountValueDay: result(state, 'form.setLimitForm1.values.limitPerDay', 0),
  amountValueTransaction: result(state, 'form.setLimitForm1.values.limitPerTransaction', 0),  
  creditAccountList: result(state, 'inbankTransferList', []),  
  listCreditAcc: result(state, 'configEForm.listConfigEform.creditAccountList', []),    
  formValues: result(state, 'form.autoFilledSetLimit.values', ''),
  creditValues: result(state, 'accounts.creditValues', []),
  sourceCredit: result(state, 'form.setLimitForm2.values.creditValues', ''),   
  listCreditValues: result(state, 'configEForm.listConfigEform.sourceCredit', []),   
  errorNextTrx: result(state, 'form.autoFilledSetLimit.values.limitPerTransaction', 0),    
  errorNextDay: result(state, 'form.autoFilledSetLimit.values.limitPerDay', 0),      
});

const SetFormEdit = reduxForm(formConfig)(SetLimitEdit);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(SetFormEdit);

class LimitTransactionEdit extends Component {

  state = {
    value: 1000000
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('limitPerDay' === typeField) {
      if (isEmpty(validateInputSetLimit(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('limitPerTransaction' === typeField) {
      if (isEmpty(validateInputSetLimit(val))) {
        return true;
      } else {
        return false;
      }
    }
  }



  onthisChangeAmountDay=() => {
    if (this.props.amountValueDay === '') {
      this.setState.iserror;
    } 
  }
  onthisChangeAmountTransaction=() => {
    if (this.props.amountValueTransaction === '') {
      this.setState.iserror;
    } 
  }

  static propTypes = {
    listLimitID: PropTypes.array,
    creditAccountNumber: PropTypes.object,
    listCreditAccNo: PropTypes.array,
    debitAccountNumber: PropTypes.string,
    listDebitAccNo: PropTypes.array,    
    maximumLimit: PropTypes.object,
    maximum: PropTypes.array,    
    maximumLimitPerDay: PropTypes.object,
    maximumPerDay: PropTypes.array,    
    listAddNew: PropTypes.array,    
    getList: PropTypes.array,    
    amountValueDay: PropTypes.string,
    amountValueTransaction: PropTypes.string,
    inbankList: PropTypes.string,
    formValues: PropTypes.object,     
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
    navigation: PropTypes.object,      
    state: PropTypes.object,
    limitPerDay: PropTypes.string,  
    limitPerTransaction: PropTypes.string,  
    prefilledlimitPerDay: PropTypes.func,
    prefilledlimitPerTransaction: PropTypes.func,    
    errorNextTrx: PropTypes.string,
    errorNextDay: PropTypes.string,    
  }



  componentWillMount () {
    const {limitPerDay, prefilledlimitPerDay} = this.props;
    prefilledlimitPerDay(limitPerDay);
    const {limitPerTransaction, prefilledlimitPerTransaction} = this.props;
    prefilledlimitPerTransaction(limitPerTransaction);
  }


 
  render () {
  
    const {state, navigation, triggerAuth, formValues,  inbankList,  maximumLimit, maximum, maximumLimitPerDay, maximumPerDay, listAddNew, getList, amountValueDay, amountValueTransaction, debitAccNo, listID, debitAccountNo, debitAccountName, creditAccountNo, sendVerification, creditAccountName, limitPerDay, limitPerTransaction,  errorNextTrx, errorNextDay} = this.props;
    const errorFieldTrxLessthanDay = errorNextDay < errorNextTrx;
  
    return (
      <ConnectedForm
      
        inbankList={inbankList}
        maximumLimit={maximumLimit}
        maximum={maximum}
        maximumPerDay={maximumPerDay}
        maximumLimitPerDay={maximumLimitPerDay}
        listAddNew={listAddNew}
        getList={getList}
        amountValueDay={amountValueDay}
        amountValueTransaction={amountValueTransaction}
        formValues={formValues}
        debitAccNo={debitAccNo}
        listID={listID}
        debitAccountNo={debitAccountNo}
        debitAccountName={debitAccountName}
        creditAccountNo={creditAccountNo}
        creditAccountName={creditAccountName}
        triggerAuth={triggerAuth}
        sendVerification={sendVerification}
        navigation={navigation}
        state={state}
        limitPerDay={limitPerDay}
        limitPerTransaction={limitPerTransaction}      
        errorNextTrx={errorNextTrx}
        errorNextDay={errorNextDay}
        errorFieldTrxLessthanDay={errorFieldTrxLessthanDay}
  
     
      />
    );
  }
}



const mapDispatchToProps = (dispatch) => ({


  triggerAuth: (params) => {
    dispatch(triggerEditLimit('CustomLimit', null, true, false, 'AuthNew', params));
  },
  sendVerification: (data) => {
    dispatch(goToEditSetLimitTransaction(data));
  },
  
  inbankList: (creditAccountList) => {
    dispatch(inbankList(creditAccountList));
  }, 
  listSetLimitTransaction: () => {
    dispatch(listSetLimitTransaction());
  },
  prefilledlimitPerDay: (limitPerDay) => {
    dispatch(change('autoFilledSetLimit', 'limitPerDay', limitPerDay));
  },  
  prefilledlimitPerTransaction: (limitPerTransaction) => {
    dispatch(change('autoFilledSetLimit', 'limitPerTransaction', limitPerTransaction));
  },
});




const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(LimitTransactionEdit);
export default ConnectedFormPage;