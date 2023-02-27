import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Keyboard} from 'react-native';
import {noop} from 'lodash';
import PaymentHistoryTrf from './HighValueList.component';

class FormHighValue extends Component {
  static propTypes = {
    searchlist: PropTypes.array,
    secondaryText: PropTypes.string,    
    id: PropTypes.object,
    onNextClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    onEditClick: PropTypes.func,    
    transfer: PropTypes.func,  
    placeholderText: PropTypes.string,
    placeholderSearch: PropTypes.string,
    hideAcc: PropTypes.bool,
    acc: PropTypes.bool,
    payeeStatus: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object]),
    drawer: PropTypes.bool,
    getConfirmation: PropTypes.func,
    getTargetAccount: PropTypes.func,
    creditAccountName: PropTypes.string,
    creditAccountNumber: PropTypes.string,
    listSetLimitTransaction: PropTypes.func,
    limitText: PropTypes.string,
    limitId: PropTypes.string,
    disabled: PropTypes.bool,
    validationInput: PropTypes.func,
    getSourceAcc: PropTypes.func,
    formValues: PropTypes.object, 
    getListCreditAcc: PropTypes.func,
    defaultAccount: PropTypes.object,  
    inbankList: PropTypes.func,   
    goToSearchableList: PropTypes.func,
    amountValueDay: PropTypes.string, 
    amountValueTransaction: PropTypes.string,
    handleSubmit: PropTypes.func,
    goOnPage: PropTypes.func,
    errorNextTrx: PropTypes.string,
    errorNextDay: PropTypes.string,
    errorFieldTrxLessthanDay: PropTypes.bool, 
    onthisChangeAmountDay: PropTypes.func,
    onthisChangeAmountTransaction: PropTypes.func,
  };

  state = {
    searchlist: [],
    searchText: '',
    searchTextAcc: '',
    hideAcc: false,
    acc: false,
  }
  onNextClick=() => {
    const {onNextClick = noop} = this.props;
    onNextClick(this.state.searchTextAcc);
  }
  componentWillMount () {
    const {searchlist = []} = this.props;
    this.setState({searchlist});
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }
  componentWillUnmount () {
    this.keyboardDidHideListener.remove();
  }
  componentWillReceiveProps (nextProps) {
    const {searchlist} = nextProps;
    this.setState({searchlist});
  }
  onFocusAcc=() => {
    const {hideAcc = false} = this.props;
    this.setState({hideAcc});
  }
  onFocusSearch=() => {
    const {hideAcc = true} = this.props;
    this.setState({hideAcc});
  }
  onBlurSearch=() => {
    const {hideAcc = false} = this.props;
    this.setState({hideAcc});
  }
  _keyboardDidHide=() => {
    const {hideAcc = false} = this.props;
    this.setState({hideAcc});
  }


  render () {
    const {placeholderText = '', creditAccountName = 'name', creditAccountNumber = 'creditNumber', secondaryText = 'bank', limitText = 'maximumLimit',  onDeleteClick = noop, onEditClick = noop, transfer = noop, payeeStatus, drawer, disabled = false, getConfirmation, getTargetAccount, formValues, inbankList, listSetLimitTransaction,
      validationInput, getSourceAcc, getListCreditAcc, defaultAccount, goToSearchableList, amountValueDay, amountValueTransaction, goOnPage, errorNextTrx, errorNextDay, errorFieldTrxLessthanDay,
    
      onthisChangeAmountDay = noop, onthisChangeAmountTransaction = noop, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    return (<PaymentHistoryTrf
      listOfItems={this.state.searchlist}
      creditAccountName={creditAccountName}
      creditAccountNumber={creditAccountNumber}
      secondaryTextKey={secondaryText}
      limitMaxText= {limitText}
      placeholderText={placeholderText}
      onDeleteClick={onDeleteClick}
      onEditClick={onEditClick}            
      transfer={transfer} 
      drawer={drawer}
      disabled={disabled}
      getConfirmation={getConfirmation}
      getTargetAccount={getTargetAccount}            
      formValues={formValues}
      inbankList={inbankList}
      payeeStatus={payeeStatus}
      listSetLimitTransaction={listSetLimitTransaction}
      validationInput={validationInput}
      getSourceAcc={getSourceAcc}
      getListCreditAcc={getListCreditAcc}
      defaultAccount={defaultAccount}
      goToSearchableList={goToSearchableList}
      amountValueDay={amountValueDay}
      amountValueTransaction={amountValueTransaction} 
      invalid={invalid} 
      submitting={submitting} 
      handleSubmit = {handleSubmit} 
      goOnPage={goOnPage}          
      errorNextTrx={errorNextTrx}
      errorNextDay={errorNextDay}
      errorFieldTrxLessthanDay={errorFieldTrxLessthanDay}
      onthisChangeAmountDay={onthisChangeAmountDay}
      onthisChangeAmountTransaction={onthisChangeAmountTransaction}
    />  
    );
  }
}
export default FormHighValue;