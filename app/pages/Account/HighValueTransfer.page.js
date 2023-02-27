import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import FormHighValue  from '../../components/Account/HighValueTransfer.component';
import {connect} from 'react-redux';
import {result, isEmpty} from 'lodash';
import {NavigationActions} from 'react-navigation';
import {inbankList, deleteSelectedList, listSetLimitTransaction, highValueSetLimit, editSelectedList, storageSetLimitFundTransfer, easyPinDataToAddLimitTransactionHighValue} from '../../state/thunks/common.thunks';
import {validateRequiredString, validateInputSetLimit, validateRequiredFields} from '../../utils/validator.util';
import  {fields}  from '../../components/Account/HighValueList.component';

const formConfig = {
  form: 'highValueTransfer',
  onSubmit: (values, dispatch) => {
    dispatch(easyPinDataToAddLimitTransactionHighValue());
  },
  validate: (values) => {    
    const errors = {
      ...validateRequiredFields(values, [fields.SOURCE_OF_FUND, fields.SOURCE_OF_CREDIT, fields.LIST_LIMIT]),
      ...validateRequiredString(values, [fields.LIMIT_PER_DAY, fields.LIMIT_PER_TRANSACTION, fields.CREDIT_NAME, fields.CREDIT_NUMBER])
    };   
    return {
      limitPerDay: validateInputSetLimit(values.limitPerDay),      
      limitPerTransaction: validateInputSetLimit(values.limitPerTransaction),
      ...errors,
    };
  } 
};
const mapStateToProps = (state) => ({
  formValues: result(state, 'form.highValueTransfer.values', ''),
  defaultAccount: result(state, 'defaultAccount', {}),
  listAddNew: result(state, 'listLimit', []),
  getList: result(state, 'configEForm.listConfigEform.listAddNew', []),    
  payeeStatus: result(state, 'payeeStatus', ''),
  id: result(state, 'listLimit.id', {}),  
  listID: result(state, 'form.highValueTransfer.values.id', ''),    
  listLimitID: result(state, 'configEForm.listConfigEform.listID', []), 
  drawer: result(state, 'drawer', false),
  creditAccount: result(state, 'listLimit.creditAccount', []),  
  creditAccNo: result(state, 'form.highValueTransfer.values.creditAccount', ''),    
  listCreditAccNo: result(state, 'configEForm.listConfigEform.creditAccNo', []),  
  debitAccount: result(state, 'listLimit.debitAccount', []),  
  debitAccNo: result(state, 'form.highValueTransfer.values.debitAccount', ''),    
  listDebitAccNo: result(state, 'configEForm.listConfigEform.debitAccNo', []),    
  debitAccountName: result(state, 'listLimit.debitAccountName', []),  
  debitAccName: result(state, 'form.highValueTransfer.values.debitAccountName', ''),    
  listDebitAccName: result(state, 'configEForm.listConfigEform.debitAccName', []),    
  maximumLimit: result(state, 'listLimit.maximumLimit', []),  
  maxLimit: result(state, 'form.highValueTransfer.values.maximumLimit', ''),    
  maximum: result(state, 'configEForm.listConfigEform.maxLimit', []),
  maximumLimitPerDay: result(state, 'listLimit.maximumLimitPerDay', []),  
  maxLimitPerDay: result(state, 'form.highValueTransfer.values.maximumLimitPerDay', ''),    
  maximumPerDay: result(state, 'configEForm.listConfigEform.maxLimitPerDay', []),
  myAccount: result(state, 'accounts.myAccount', []),   
  sourceOfFund: result(state, 'form.highValueTransfer.values.myAccount', ''),
  listSourceOfFund: result(state, 'configEForm.listConfigEform.sourceOfFund', []),  
  creditAccountList: result(state, 'inbankTransferList', []),  
  listCreditAcc: result(state, 'configEForm.listConfigEform.creditAccountList', []),
  amountValueDay: result(state, 'form.highValueTransfer.values.limitPerDay', ''),
  amountValueTransaction: result(state, 'form.highValueTransfer.values.limitPerTransaction', ''),   
  name: result(state, 'form.highValueTransfer.values.name', {}),
  accountNumber: result(state, 'form.highValueTransfer.values.accountNumber', {}),  
  errorNextTrx: result(state, 'form.highValueTransfer.values.limitPerTransaction', 0),    
  errorNextDay: result(state, 'form.highValueTransfer.values.limitPerDay', 0),        
});

const HighValue = reduxForm(formConfig)(FormHighValue);
const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(HighValue);
class PageHighValue extends Component {
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
    if (this.props.errorNextDay === '') {
      this.setState.iserror;
    } 
  }
  onthisChangeAmountTransaction=() => {
    if (this.props.errorNextTrx === '') {
      this.setState.iserror;
    } 
  }
  static propTypes = {
    reloadHistory: PropTypes.func,
    inbankList: PropTypes.func,
    creditAccountList: PropTypes.array,
    accountNumberCreditList: PropTypes.object,
    accountNameCreditList: PropTypes.object,
    creditNumber: PropTypes.object,
    creditName: PropTypes.object,
    listCreditAcc: PropTypes.array,    
    navigation: PropTypes.object, 
    listAddNew: PropTypes.array,
    payeeStatus: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    goToDeleteList: PropTypes.func,
    goToEditList: PropTypes.func,
    getList: PropTypes.array,
    id: PropTypes.object,
    listLimitID: PropTypes.array,
    creditAccount: PropTypes.object,
    listCreditAccNo: PropTypes.array,   
    listCreditName: PropTypes.array,
    debitAccount: PropTypes.object,
    listDebitAccNo: PropTypes.array,  
    debitAccountName: PropTypes.object,
    listDebitAccName: PropTypes.array,   
    maximumLimit: PropTypes.object,
    maximum: PropTypes.array,    
    maximumLimitPerDay: PropTypes.object,
    maximumPerDay: PropTypes.array,
    listSourceOfFund: PropTypes.array,
    getSourceAcc: PropTypes.func,
    formValues: PropTypes.object,
    myAccount: PropTypes.object,  
    getListCreditAcc: PropTypes.func,
    amountValueDay: PropTypes.string,
    amountValueTransaction: PropTypes.string,
    payee: PropTypes.object,   
    listLimit: PropTypes.array,
    sendVerification: PropTypes.func,
    defaultAccount: PropTypes.object,
    listCreditValues: PropTypes.array,  
    goToSearchableList: PropTypes.func,
    setFieldCreditToClear: PropTypes.func,     
    goToSetLimit: PropTypes.func,  
    goToSetTransfer: PropTypes.func,
    errorNextTrx: PropTypes.string,
    errorNextDay: PropTypes.string,
  }  
  state = {
    numberOfDependant2: 0,
  }
  getSourceAccountSetLimit = () => () => {
    const {getSourceAcc} = this.props;
    getSourceAcc();
  }
  getListTransferTo = () => () => {
    const {getListCreditAcc} = this.props;
    getListCreditAcc();
  } 
  deleteList = (payee) => () => {
    const {goToDeleteList} = this.props;
    goToDeleteList(payee);
  }
  editList = (formValues) => () => {
    const {goToEditList} = this.props;
    goToEditList(formValues);
  }
  componentDidMount () {
    const {listAddNew} = this.props;
    if (isEmpty(listAddNew)) {
      this.props.inbankList(listAddNew);
    }
  }  
  goOnPage = () => {
    this.props.goToSetLimit();
  }
  goTransfer = (formValues) => () =>    {
    const {goToSetTransfer} = this.props;
    goToSetTransfer(formValues);
  }

  render () {
    const {listAddNew = [], accountNameCreditList, accountNumberCreditList, creditNumber, creditName, listCreditAcc, inbankList, payeeStatus, getList, listLimitID,
      navigation, listSourceOfFund, formValues, amountValueDay, amountValueTransaction, listLimit, sendVerification, defaultAccount, listCreditValues, 
      goToSearchableList, goToSetLimit, errorNextDay, errorNextTrx} = this.props;  
    const errorFieldTrxLessthanDay = errorNextDay < errorNextTrx;
    return (
      <ConnectedForm
        searchlist={listAddNew}
        buttonText = 'arrow-next-red'
        creditAccountName = 'name'
        creditAccountNumber = 'creditAccount'
        secondaryTextKey = 'bank'
        limitMaxText = 'maximumLimit'
        limitId = 'id'
        reloadHistory = {this.reloadHistory}
        accountNumberCreditList={accountNumberCreditList}
        accountNameCreditList={accountNameCreditList}
        onDeleteClick = {this.deleteList}
        onEditClick={this.editList}      
        transfer={this.goTransfer}  
        creditName={creditName}
        creditNumber={creditNumber}
        listCreditAcc={listCreditAcc}
        inbankList={inbankList}
        payeeStatus = {payeeStatus}
        getList={getList}   
        listLimitID={listLimitID}
        navigation={navigation}
        listSourceOfFund={listSourceOfFund}
        numberOfDependant2={this.state.numberOfDependant2}
        checkboxArray={this.state.checkboxArray}
        formValues = {formValues}
        getSourceAcc={this.getSourceAccountSetLimit()}
        getListCreditAcc={this.getListTransferTo()}
        validationInput={this.validationInput}
        amountValueDay={amountValueDay}
        amountValueTransaction={amountValueTransaction}
        validationInputLimitDay={this.validationInputLimitDay}
        validationInputLimitTransaction={this.validationInputLimitTransaction}
        onthisChangeAmountDay={this.onthisChangeAmountDay}
        onthisChangeAmountTransaction={this.onthisChangeAmountTransaction}
        listLimit={listLimit}
        sendVerification={sendVerification}
        defaultAccount={defaultAccount}
        listCreditValues={listCreditValues}      
        goToSearchableList={goToSearchableList}      
        goToSetLimit={goToSetLimit} 
        goOnPage={this.goOnPage}    
        errorNextTrx={errorNextTrx}
        errorNextDay={errorNextDay}
        errorFieldTrxLessthanDay={errorFieldTrxLessthanDay}
      />
    );
  }
}
const mapDispatchToProps = (dispatch) => ({  
  inbankList: (creditAccountList) => {
    dispatch(inbankList(creditAccountList));
  },
  listSetLimitTransaction: (listAddNew) => {
    dispatch(listSetLimitTransaction(listAddNew));
  },
  goToDeleteList: (payee) => {
    dispatch(deleteSelectedList(payee));
  },
  goToEditList: (formValues) => {
    dispatch(editSelectedList(formValues));
  }, 
  getSourceAcc: () => {
    dispatch(NavigationActions.navigate({
      routeName: 'SourceAccountSetLimit',
      params: {formName: 'highValueTransfer', fieldName: 'myAccount', sourceType: 'fundTransfer'}
    }));
  }, 
  sendVerification: (data) => {
    dispatch(highValueSetLimit(data));
  },  
  goToSearchableList: (creditAccountList) => {
    dispatch(inbankList(creditAccountList)),
    dispatch(NavigationActions.navigate({routeName: 'SetLimitSearchableListHighValue'}));
  },
  setFieldCreditToClear: () => {
    dispatch(change('highValueTransfer', 'name', ''));
    dispatch(change('highValueTransfer', 'accountNumber', ''));
  },
  goToSetLimit: () => dispatch(NavigationActions.navigate({routeName: 'SetLimitForm1'})),    
  goToSetTransfer: (formValues) => {
    dispatch(storageSetLimitFundTransfer(formValues));
  
  }
});
const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(PageHighValue);
export default ConnectedFormPage; 