import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasButton, SinarmasInputBox} from '../FormComponents';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from '../../components/FundTransferJourney/SetLimitFromConfirmation.styles';
import {noop} from 'lodash';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import {formatFieldAmount, normalizeAmount} from '../../utils/transformer.util';



export const fields = {
  LIMIT_PER_TRANSACTION: 'limitPerTransaction',
  LIMIT_PER_DAY: 'limitPerDay',
};

class SetLimitEdit extends Component {

 

  render () {
    const {disabled, validationInput, payeeNumber, payeeName, errorNextTrx, errorNextDay, payeeBank, payeeTargetAccNo, payeeTargetAccName, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;     
    const isDataEmptyTrx = Number(errorNextTrx);
    const isDataEmptyDay = Number(errorNextDay);
    const errorNext = isDataEmptyDay > isDataEmptyTrx;    
    const successNext = isDataEmptyDay === isDataEmptyTrx;
   

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.container} extraHeight={120} enableOnAndroid={true}>
        <View style={styles.spaceContainer}>
          <View style={styles.FieldsContainerWrapper}> 
            <View>
              <View style={styles.fieldsContainerWrapper}>
                <View style={styles.labelSpacing} />
                <View style={styles.row2}>                      
                  <View>
                    <View style={styles.rowProduct}>
                      <View style={styles.start}>  
                        <SimasIcon name={'new_card'} size={15} style={styles.walletIcon}/>                     
                      </View>
                      <View style={styles.end}>
                        <Text style={styles.debitName}>{payeeName}</Text>
                        <Text style={styles.accNo}>{payeeNumber}</Text>
                        <Text style={styles.product}>{payeeBank}</Text>
                      </View>
                    </View>     
                  </View>
                  <View style={styles.greyLine} />                      
                </View>
              </View>
            </View>
          </View>
          <View style={styles.FieldsContainerWrapper}> 
            <View>
              <View style={styles.fieldsContainerWrapper}>
                <Text style={styles.titleWallet}>Transfer to</Text>
                <View style={styles.labelSpacing} />
                <View style={styles.column}>    
                  <View>
                    <View>
                      <View style={styles.boxedInfoTransferTo}>  
                        <Text style={styles.transferto}>Transfer to</Text>  
                        <View style={styles.rowPadding}> 
                          <Text style={styles.accTarget}>{payeeTargetAccName}    -    {payeeTargetAccNo}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.loginFieldsContainerCel}>
            <View style={styles.row3}>
              <Text style={[styles.titleSetLimit]}>{language.SET_LIMIT_TRANSACTION}</Text>
            </View>
            <Field
              name={fields.LIMIT_PER_TRANSACTION}
              placeholder={language.LIMIT_PER_TRANSACTION}
              format={formatFieldAmount}
              normalize={normalizeAmount}
              keyboardType='numeric'
              component={SinarmasInputBox}
              leftIcon='Rp'
              textPosition='center'
              maxLength={17}
              typeField={'limitPerTransaction'}
              theme='primary'              
              validationInput={validationInput}
            />
            
          </View>
          <View style={styles.loginFieldsContainerCel}>            
            <Field
              name={fields.LIMIT_PER_DAY}
              placeholder={language.LIMIT_PER_DAY}
              format={formatFieldAmount}
              normalize={normalizeAmount}
              keyboardType='numeric'
              component={SinarmasInputBox}
              leftIcon='Rp'
              textPosition='center'
              maxLength={17}
              typeField={'limitPerDay'}
              theme='primary'              
              validationInput={validationInput}
            />
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)}  disabled={invalid || submitting || disabled || !errorNext && !successNext} >
            <Text style={styles.buttonLargeTextStyle}>{language.GENERIC__CONTINUE}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }

}

SetLimitEdit.propTypes = {  
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onSubmitPress: PropTypes.func,
  validationInput: PropTypes.func,
  listWorker: PropTypes.array,
  isLogin: PropTypes.bool,
  minusQuantity: PropTypes.func,
  addQuantity: PropTypes.func,
  amountValue: PropTypes.number,
  dropList: PropTypes.array,
  getSourceAcc: PropTypes.func,
  formValues: PropTypes.object,  
  form: PropTypes.object,
  workValue: PropTypes.object,
  errors: PropTypes.array,
  disabled: PropTypes.bool,
  accountList: PropTypes.array,
  accNumber: PropTypes.array,
  labelKey: PropTypes.string,  
  itemList: PropTypes.array,  
  onValChange: PropTypes.func,  
  input: PropTypes.object,   
  forgotEasyPin: PropTypes.func,
  lastAccountName: PropTypes.string,
  lastAccountNumber: PropTypes.string,
  lastProductType: PropTypes.string,
  lastAccountBalance: PropTypes.string,
  getListCreditAcc: PropTypes.func,
  amountValueDay: PropTypes.string,
  amountValueTransaction: PropTypes.string,
  payee: PropTypes.object,
  triggerAuth: PropTypes.func,
  currentDate: PropTypes.string,
  isOwnAccount: PropTypes.bool,
  doTransfer: PropTypes.func,
  resData: PropTypes.object,
  config: PropTypes.object,
  gapTime: PropTypes.number,
  billerFavorite: PropTypes.array,
  favoriteBill: PropTypes.string,
  showFavorite: PropTypes.func,
  removeFavorite: PropTypes.func,
  ownAccount: PropTypes.array,
  saveAlias: PropTypes.func,
  isFavorite: PropTypes.bool,
  timeConfig: PropTypes.object,
  defaultAccount: PropTypes.object,  
  inbankList: PropTypes.func,  
  creditAccount: PropTypes.object,
  creditAccountName: PropTypes.string,
  creditAccountNumber: PropTypes.string,
  
  debitAccountNumber: PropTypes.object,  
  creditAccNo: PropTypes.object, 
  debitAccountNo: PropTypes.string,
  
  debitAccountName: PropTypes.string,    
  creditAccountNo: PropTypes.string,   
  balance: PropTypes.string,
  productType: PropTypes.string,
  errorFieldTrxLessthanDay: PropTypes.bool,
  minimaltoError: PropTypes.func,
  errorNextTrx: PropTypes.string,
  errorNextDay: PropTypes.string,  
  payeeName: PropTypes.string,
  payeeNumber: PropTypes.string,
  payeeBank: PropTypes.string,
  payeeTargetAccName: PropTypes.string,
  payeeTargetAccNo: PropTypes.string

  
};

export default SetLimitEdit;