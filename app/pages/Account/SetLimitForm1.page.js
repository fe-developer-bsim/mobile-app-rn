import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import SetForm1, {fields}  from '../../components/Account/SetLimitForm1.component';
import {validateRequiredFields} from '../../utils/validator.util';
import {connect} from 'react-redux';
import {isEmpty, result} from 'lodash';
import {NavigationActions} from 'react-navigation';
import {validateRequiredString, validateInputSetLimit} from '../../utils/validator.util';
import {inbankList} from '../../state/thunks/common.thunks';
import {triggerAddLimit, easyPinLimitTransaction, easyPinDataToAddLimitTransaction} from '../../state/thunks/common.thunks';

const formConfig = {
  form: 'setLimitForm1',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => {
    dispatch(easyPinDataToAddLimitTransaction());
  },
  validate: (values) => {    
    const errors = {
      ...validateRequiredFields(values, [fields.SOURCE_OF_FUND, fields.SOURCE_OF_CREDIT, fields.LIST_LIMIT]),
      ...validateRequiredString(values, [fields.LIMIT_PER_DAY, fields.CREDIT_NAME, fields.CREDIT_NUMBER])
    };   
    return {
      limitPerDay: validateInputSetLimit(values.limitPerDay),      
      limitPerTransaction: validateInputSetLimit(values.limitPerTransaction),
      ...errors,
    };
  }
};

const mapStateToProps = (state) => ({
  isLogin: !isEmpty(result(state, 'user', {})),
  accountList: result(state, 'accounts', []),
  formValues: result(state, 'form.setLimitForm1.values', ''),
  myAccount: result(state, 'accounts.myAccount', []),   
  sourceOfFund: result(state, 'form.setLimitForm1.values.myAccount', ''),
  listSourceOfFund: result(state, 'configEForm.listConfigEform.sourceOfFund', []),  
  creditAccountList: result(state, 'inbankTransferList', []),  
  listCreditAcc: result(state, 'configEForm.listConfigEform.creditAccountList', []),
  creditValues: result(state, 'accounts.creditValues', []),
  sourceCredit: result(state, 'form.setLimitForm2.values.creditValues', ''),   
  listCreditValues: result(state, 'configEForm.listConfigEform.sourceCredit', []), 
  amountValueDay: result(state, 'form.setLimitForm1.values.limitPerDay', 0),
  amountValueTransaction: result(state, 'form.setLimitForm1.values.limitPerTransaction', 0),   
  defaultAccount: result(state, 'defaultAccount', []),   
  name: result(state, 'form.setLimitForm1.values.name', {}),
  accountNumber: result(state, 'form.setLimitForm1.values.accountNumber', {}),    
  errorNextTrx: result(state, 'form.setLimitForm1.values.limitPerTransaction', 0),    
  errorNextDay: result(state, 'form.setLimitForm1.values.limitPerDay', 0),
});

const SetLimitForm1 = reduxForm(formConfig)(SetForm1);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(SetLimitForm1);

class LimitTransaction1 extends Component {

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
    navigation: PropTypes.object,
    listSourceOfFund: PropTypes.array,
    isLogin: PropTypes.bool,
    accountList: PropTypes.array,
    getSourceAcc: PropTypes.func,
    formValues: PropTypes.object,
    myAccount: PropTypes.object,
    lastAccountName: PropTypes.string,
    lastAccountNumber: PropTypes.string,
    lastProductType: PropTypes.string,
    lastAccountBalance: PropTypes.string,    
    creditAccountList: PropTypes.array,
    getListCreditAcc: PropTypes.func,
    creditValues: PropTypes.object,
    amountValueDay: PropTypes.string,
    amountValueTransaction: PropTypes.string,
    triggerAuth: PropTypes.func,
    payee: PropTypes.object,
    showFavorite: PropTypes.func,
    isFavorite: PropTypes.bool,
    timeConfig: PropTypes.object,
    tokenConfig: PropTypes.array,    
    listCreditAcc: PropTypes.array,    
    listLimit: PropTypes.array,
    sendVerification: PropTypes.func,
    defaultAccount: PropTypes.object,
    inbankList: PropTypes.func,    
    listCreditValues: PropTypes.array,  
    goToSearchableList: PropTypes.func,
    setFieldCreditToClear: PropTypes.func,    
    errorNextTrx: PropTypes.string,
    errorNextDay: PropTypes.string,
  
  }

  state = {
    numberOfDependant2: 0,
  }

  changeCheckboxArray = (checkbox) => {
    this.setState({checkboxArray: checkbox});
  }
  getSourceAccountSetLimit = () => () => {
    const {getSourceAcc} = this.props;
    getSourceAcc();
  }
  getListTransferTo = () => () => {
    const {getListCreditAcc} = this.props;
    getListCreditAcc();
  }

 
  componentDidMount () {
    const {creditAccountList} = this.props;
    if (isEmpty(creditAccountList)) {
      this.props.inbankList(creditAccountList);
    }
  }


  render () {
    const {navigation, listSourceOfFund, isLogin, formValues, amountValueDay, amountValueTransaction, triggerAuth, listCreditAcc, listLimit, sendVerification, defaultAccount, inbankList, listCreditValues, goToSearchableList, errorNextTrx, errorNextDay} = this.props;
    return (
      <ConnectedForm
        navigation={navigation}
        listSourceOfFund={listSourceOfFund}
        isLogin={isLogin}
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
        triggerAuth={triggerAuth}
        listCreditAcc={listCreditAcc}   
        listLimit={listLimit}
        sendVerification={sendVerification}
        defaultAccount={defaultAccount}
        inbankList={inbankList}
        listCreditValues={listCreditValues}      
        goToSearchableList={goToSearchableList}
      
        errorNextTrx={errorNextTrx}
        errorNextDay={errorNextDay}      
      />
    );
  }
}



const mapDispatchToProps = (dispatch) => ({
  inbankList: (creditAccountList) => {
    dispatch(inbankList(creditAccountList));
  },
  getSourceAcc: () => {
    dispatch(NavigationActions.navigate({
      routeName: 'SourceAccountSetLimit',
      params: {formName: 'setLimitForm1', fieldName: 'myAccount', sourceType: 'fundTransfer'}
    }));
  }, 
  triggerAuth: (params) => {
    dispatch(triggerAddLimit('CustomLimit', null, true, false, 'AuthNew', params));
  },
  sendVerification: (data) => {
    dispatch(easyPinLimitTransaction(data));
  },  
  goToSearchableList: (creditAccountList) => {
    dispatch(inbankList(creditAccountList)),
    dispatch(NavigationActions.navigate({routeName: 'SetLimitSearchableList'}));
  },
  setFieldCreditToClear: () => {
    dispatch(change('setLimitForm1', 'name', ''));
    dispatch(change('setLimitForm1', 'accountNumber', ''));
  },
  
});

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(LimitTransaction1);
export default ConnectedFormPage;