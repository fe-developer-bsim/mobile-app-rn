import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './FundTransferPayment.style';
import noop from 'lodash/noop';
import {SinarmasInput, SinarmasButton, SinarmasInputBox} from '../FormComponents';
import {Field} from 'redux-form';
import * as Utils from '../../utils/transformer.util';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {formatFieldAmount, wrapMethodInFunction} from '../../utils/transformer.util';

export const fields = {
  AMOUNT: 'amount'
};


class FundTransferPayment extends Component {
  static propTypes = {
    payee: PropTypes.object,
    accountList: PropTypes.array,
    onNextPress: PropTypes.func,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    paymentMethods: PropTypes.array,
    getSourceAcc: PropTypes.func,
    selectedSourceAcc: PropTypes.object,
    sendAccountNumber: PropTypes.string,
    amountChange: PropTypes.func,
    disabled: PropTypes.bool,
    isOwnAccount: PropTypes.bool,
    isSetLimit: PropTypes.func,    
    payeeSinarmasBank: PropTypes.object,
    bankListData2: PropTypes.string,
    bankListData: PropTypes.string,
    populateConfigData: PropTypes.func,
    bankSinarmas: PropTypes.func,
    goSetPayee: PropTypes.func,
    inbankList: PropTypes.func,     
    maximumLimit: PropTypes.object,
    maximum: PropTypes.array,      
    maximumLimitPerDay: PropTypes.object,
    maximumPerDay: PropTypes.array,  
    listAddNew: PropTypes.array,     
    getList: PropTypes.array,      
    debitAccountNumber: PropTypes.string,
    listDebitAccNo: PropTypes.array,    
    debitAccountNo: PropTypes.string,      
    debitAccountName: PropTypes.string,   
     
    creditAccountNo: PropTypes.string,         
     
    creditAccountName: PropTypes.string, 
    
    limitPerDay: PropTypes.string,  
    limitPerTransaction: PropTypes.string, 
    bank: PropTypes.string,
    validationInput: PropTypes.func,    
    handleSubmit: PropTypes.func,
  }

  onNextPress = () => {
    const {onNextPress = noop} = this.props;
    onNextPress();
  }

  render () {
    const {invalid, submitting, disabled, goSetPayee, debitAccountNo, debitAccountName, limitPerTransaction, bank, validationInput, handleSubmit = noop} = this.props;
    const normalizeLimitText = formatFieldAmount(limitPerTransaction);


    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraScrollHeight={100} enableOnAndroid={true}>
        <View>
          <View style={styles.containerDiv}>
            <View style={styles.headerRow}>
              <SimasIcon name={'amount'} size={30} style={styles.headerIcon} />
              <Text style={styles.title}>{language.TRANSFER__TRANSFER_SET_AMOUNT}</Text>
            </View>
            <View style={styles.textInputAmount}>
              <Field
                name={fields.AMOUNT}
                placeholder={language.HINTTEXT__TRANSFER_AMOUNT_PLACEHOLDER}
                format={Utils.formatFieldAmount}
                normalize={Utils.normalizeAmount}
                keyboardType='numeric'
                component={SinarmasInputBox}
                iconName={'edit-amount'}
                leftIcon='Rp'
                textPosition='center'
                maxLength={13}                      
                validationInput={validationInput}
              />
            </View>
          </View>
          <View style={styles.greyLine} />
          <View style={styles.containerDiv}>
            <View style={styles.headerRow}>
              <SimasIcon name={'wallet'} size={30} style={styles.walletIcon} />
              <Text style={styles.title}>{language.WALLET_SET_LIMIT}</Text>
            </View>
            <View style={styles.sendAccountDetailContainer}>               
              <View>
                <Text style={styles.sendAccNumber}>{debitAccountNo}</Text>
                <Text style={styles.sendAccNameType}>{debitAccountName}</Text>                      
                <Text style={styles.sendAccNameType}>{bank}</Text>
              </View>                
            </View>
          </View>
          <View style={styles.greyLine} />
          <View style={styles.containerDiv}>
            <View>
              <Text style={[styles.roboto, styles.black]}>{language.GENERIC_BILLER__ADDITIONAL}</Text>
            </View>
            <Field
              name='note'
              label={language.GENERIC_BILLER__DESCRIPTION}
              placeholder={language.HINTTEXT__DESCRIPTION}
              format={Utils.formatFieldNote}
              normalize={Utils.formatFieldNote}
              component={SinarmasInput}
              maxLength={16}
            />
          </View>
        </View>
        <View style={styles.bottom}> 
          <View style={styles.boxedInfo}>            
            <SimasIcon name='input-error' style={styles.alertSetLimit} size={20} />
            <View style={styles.rowSetLimit}>                    
              <View><Text style={styles.blackTextSetLimit}> {language.VALIDATE__GREATER_THAN_MAX_SET_LIMIT3}{normalizeLimitText} </Text></View>
              <View><Text style={styles.redTextSetLimit}  onPress={goSetPayee}>{language.VALIDATE__GREATER_THAN_MAX_SET_LIMIT2}</Text></View>
            </View>   
          </View>   
        </View> 
        <View style={styles.buttonBottom}>
          <SinarmasButton disabled={invalid || submitting || disabled} onPress={wrapMethodInFunction(handleSubmit)} text={language.SERVICE__NEXT_BUTTON} />
        </View>
      </KeyboardAwareScrollView>

    );
  }
}

export default FundTransferPayment;
