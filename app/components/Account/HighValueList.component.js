import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, FlatList} from 'react-native';
import styles from './HistoryValueList.styles';
import {result, isEmpty, noop} from 'lodash';
import {language} from '../../config/language';
import {listViewComparator, filterObjects} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {SwipeRow} from 'react-native-swipe-list-view';
import {SinarmasButton, SinarmasInputBox, SinarmasInputBoxSetLimit} from '../FormComponents';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {wrapMethodInFunction, formatFieldAmount, currencyFormatter, normalizeAmount} from '../../utils/transformer.util';
import {Field} from 'redux-form';



export const fields = {
  LIMIT_PER_TRANSACTION: 'limitPerTransaction',
  LIMIT_PER_DAY: 'limitPerDay',
  SOURCE_OF_FUND: 'sourceOfFund',  
  SOURCE_OF_CREDIT: 'sourceCredit',
  CREDIT_NAME: 'name',  
  CREDIT_NUMBER: 'accountNumber'

};

class Pay extends Component {

  static propTypes = {
    billpayHistory: PropTypes.object,
    billerList: PropTypes.array,
    goToIndex: PropTypes.func,
    deleteBillpayHistory: PropTypes.func,
    reloadHistory: PropTypes.func,
    listOfItems: PropTypes.array,
    onDeleteClick: PropTypes.func,
    onEditClick: PropTypes.func,    
    transfer: PropTypes.func,  
    creditAccountName: PropTypes.string,
    creditAccountNumber: PropTypes.string,
    secondaryTextKey: PropTypes.string,
    disabled: PropTypes.bool,
    placeholderText: PropTypes.string,
    drawer: PropTypes.bool,
    creditAccountList: PropTypes.array,
    accountNumberCreditList: PropTypes.object,
    accountNameCreditList: PropTypes.object,
    creditNumber: PropTypes.object,
    creditName: PropTypes.object,
    formValues: PropTypes.object,
    getTargetAccount: PropTypes.func,
    limitMaxText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    limitId: PropTypes.string,     
    id: PropTypes.object,    
    handleSubmit: PropTypes.func,   
    validationInput: PropTypes.func,
    getSourceAcc: PropTypes.func,
    defaultAccount: PropTypes.object,  
    inbankList: PropTypes.func,    
    goToSearchableList: PropTypes.func, 
    goOnPage: PropTypes.func, 
    errorFieldTrxLessthanDay: PropTypes.bool,
    errorNextDay: PropTypes.string,
    errorNextTrx: PropTypes.string,
    listSetLimitTransaction: PropTypes.func,        
  }

  state = {
    searchFilter: ''
  }

  comparator = listViewComparator

  renderHistory = ({item}) => {
    const {onDeleteClick, onEditClick, transfer = noop, drawer, creditAccountName = '', creditAccountNumber = '', secondaryTextKey = '', limitMaxText = ''} = this.props;
    const subtext = result(item, creditAccountNumber, '');
    const text = result(item, creditAccountName, '');
    const secondaryText = result(item, secondaryTextKey, '');
    const limitText = Number((result(item, limitMaxText, '')));
    const normalizeLimitText = formatFieldAmount(limitText);
    return (
      <SwipeRow swipeToOpenPercent={10} disableRightSwipe={true} rightOpenValue={-60} >
        
      
        {
          drawer ? 
            null
            :
            <View style={{flex: 3, alignItems: 'flex-end', justifyContent: 'center'}}>
              <View style={styles.infoContainer}>
                <View style={styles.flex}>
                  <Touchable onPress={onEditClick(item)} style={styles.edit}>
                    <SimasIcon name='edit-amount' style={styles.whiteIcon} size={10}/>
                  </Touchable>
                  <Touchable onPress={onDeleteClick(item)} style={styles.trash}>        
                    <SimasIcon name='trash' style={styles.whiteIcon} size={10}/>
                  </Touchable>
                </View>
              </View>
            </View>
        }        
        <View style={styles.historyItem} highlightOpacity={1}>
          <View style={styles.flex}>
            
            <View style={styles.infoContainer}>                 
              <Touchable onPress={transfer(item)}> 
                <View style={styles.pad2}>
                  <Text style={styles.subNo}>{text}</Text>
                </View>
                <View style={styles.pad2}>
                  <Text style={styles.subtext}>{subtext}</Text>    
                </View>       
                <View style={styles.pad2}> 
                  <Text style={styles.subtext}>{secondaryText}</Text>  
                </View>
              </Touchable>
            </View>
            <View style={styles.billerDetails}>
              <View style={styles.infoContainer}>
                <Text style={styles.billerName}>Rp {normalizeLimitText}</Text>          
                <Text style={styles.billerName2}>{language.MAX_LIMIT_TRANSACTION}</Text>
              </View>
              <View styles={styles.iconArrow}>
                <SimasIcon name={'more-menu'} size={10} style={[styles.more]}/>         
              </View>       
            </View>
          </View>        
        </View>
      </SwipeRow>
    );
  }

  filterChange = (searchFilter) => {
    this.setState({searchFilter});
  }


  render () {
    const {listOfItems, disabled, validationInput, getSourceAcc = noop, formValues, defaultAccount, goToSearchableList, goOnPage, errorNextDay, errorNextTrx, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const {searchFilter} = this.state;
    const history = filterObjects(listOfItems, searchFilter);    
    const checkAcc = isEmpty(result(formValues, 'myAccount', {}));
    const name  = isEmpty(result(formValues, 'name', {}));    
    const accountNumber  = isEmpty(result(formValues, 'accountNumber', {}));
    const debitAccountNumber = result(formValues, 'myAccount.accountNumber', '');
    const sendAccountName = result(formValues, 'myAccount.name', '');
    const productType = result(formValues, 'myAccount.productType', '');    
    const currencyIcon = result(formValues, 'myAccount.currency', '');
    const balance = currencyFormatter(result(formValues, 'myAccount.balances.availableBalance', ''));    
    const defAccountNumber = result(defaultAccount, 'accountNumber', '');
    const defAccountName = result(defaultAccount, 'name', '');
    const defProductType = result(defaultAccount, 'productType', '');   
    const isDataEmptyTrx = Number(errorNextTrx);
    const isDataEmptyDay = Number(errorNextDay);
    const errorNext = isDataEmptyDay > isDataEmptyTrx;
    const successNext = isDataEmptyDay === isDataEmptyTrx;
    return (
      <View style={styles.flexHighValue}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.wrapContainer} extraScrollHeight={120} enableOnAndroid={true} >    
          <View style={styles.paddingBottom}>
            {
              (listOfItems.length > 0) ?
                <View>
                  <View style={styles.container}>
                    <FlatList
                      data={history}
                      renderItem={this.renderHistory} 
                      removeClippedSubviews={false}/>
                  </View>
                </View>
                :
                <View>
                  <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.wrapContainer} extraScrollHeight={100} enableOnAndroid={true}>
                    <View style={styles.spaceContainer}>
                      <View style={styles.FieldsContainerWrapper}> 
                        <View>
                          <View style={styles.fieldsContainerWrapper}>
                            { checkAcc ?
                              <View>
                                <Text style={styles.titleLimitTransaction}>{language.YOUR_LAST_SOURCE_ACCOUNT}</Text>
                              </View>
                              :
                              <View>
                                <Text style={styles.titleLimitTransaction}>{language.TIME_DEPOSIT__PAY_FROM}</Text>
                              </View>
                            }
                            <View style={styles.labelSpacing} />
                            <View style={styles.row2}>                      
                              <View>
                                { checkAcc ? 
                                  <View>
                                    <View style={styles.rowProduct}>
                                      <View style={styles.start}>  
                                        <SimasIcon name={'new_card'} size={15} style={styles.walletIcon}/>
                                      </View>
                                      <View style={styles.end}>
                                        <Text style={styles.debitName}>{defAccountName}</Text>
                                        <Text style={styles.accNo}>{defAccountNumber}</Text>
                                        <Text style={styles.product}>{defProductType}</Text>
                                      </View>
                                    </View>
                     
                                  </View>
                                  : 
                                  <View>
                                    <View style={styles.rowProduct}>
                                      <View style={styles.start}>  
                                        <SimasIcon name={'new_card'} size={15} style={styles.walletIcon}/>                     
                                      </View>
                                      <View style={styles.end}>
                                        <Text style={styles.debitName}>{sendAccountName}</Text>
                                        <Text style={styles.accNo}>{debitAccountNumber}</Text>
                                        <Text style={styles.product}>{productType}</Text>
                                        <Text style={styles.balance1}>{language.SEND__AVAILABLE_BALANCE} {currencyIcon} {balance}</Text>     
                                      </View>
                                    </View>                     
                                  </View>
                                }
                              </View>
                              <View style={styles.greyLine} />   
                            </View>
                            <View >
                              <Touchable onPress={getSourceAcc} >
                                <View>
                                  <Text style={styles.choose}>{language.CHOOSE_ANOTHER_SOURCE_ACCOUNT}</Text>
                                </View>
                              </Touchable>
                            </View>
                          </View>
                        </View>       
                      </View>
                      <View style={styles.FieldsContainerWrapper}> 
                        <View>
                          <View style={styles.fieldsContainerWrapper}>
                
                            <Text style={styles.titleLimitTransaction}>Transfer to</Text>              
                            <View style={styles.labelSpacing}/>
                            <View style={styles.column}>
                 
                              <View>
                                <Touchable onPress={goToSearchableList} >
                                  { name && accountNumber ? 
                                    <View>                        
                                      <View style={styles.boxedInfoTransferTo}>  
                         
                                        <Text style={styles.transferto}>Transfer to</Text>  
                                        <View style={styles.row3}> 
                                          <Text style={styles.select}>Select Account</Text>
                                          <View style={styles.arrowContainer}>
                                            <SimasIcon name={'arrow'} size={10} style={styles.arrowIcon}/>
                                          </View>
                                        </View>                            
                                      </View>                       
                                    </View>
                                    : 
                      
                                    <View style={styles.rowCenter}>
                                      <View style={styles.boxedInfoTransferSelected}>

                                        <Text style={styles.transferto}>Transfer to</Text>
                                        <View style={styles.rowCenter}>
                                          <Field
                                            name={fields.CREDIT_NAME}
                                            component={SinarmasInputBoxSetLimit}
                                            theme='primary'
                                            style={styles.fieldContainer}
                                            labelKey='name'
                                            label={language.TIME_DEPOSIT__ACCOUNT_NAME}
                                            placeholder={language.TIME_DEPOSIT__ACCOUNT_NAME}
                                            typeField={'name'}
                                            disabled={true}
                                          />

                                          <Text style={styles.select}> - </Text>
                                          <Field
                                            name={fields.CREDIT_NUMBER}
                                            component={SinarmasInputBoxSetLimit}
                                            theme='primary'
                                            style={styles.fieldContainer}
                                            labelKey='accountNumber'
                                            label={language.LOAN__ACCOUNT_NUMBER}
                                            placeholder={language.LOAN__ACCOUNT_NUMBER}
                                            typeField={'accountNumber'}
                                            disabled={true}
                                          />
                                          <View style={styles.rowCenter}>
                                            <SimasIcon style={styles.arrowIcon} name='arrow' size={10}/>
                                          </View>
                                        </View>
                                      </View>
                                    </View>
                      
                                  }
                                </Touchable>
                              </View>
                            </View>
                          </View>
                        </View>       
                      </View> 
                      <View>  
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
                    </View>
                    <View style={styles.buttonWrapper}>
                      <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)}  disabled={invalid || submitting || disabled  || !errorNext && !successNext} >
                        <Text style={styles.buttonLargeTextStyle}>{language.GENERIC__CONTINUE}</Text>
                      </SinarmasButton>
                    </View>        
                  </KeyboardAwareScrollView>
                </View>
            }     
          </View>        
        </KeyboardAwareScrollView>
        <View style={styles.bottomButton} >
        
          {         
            (listOfItems.length > 0) ?
              <View style={styles.bottom}>   
                <View style={styles.paddingBox}>   
                  <View style={styles.boxedInfo}>            
                    <View>                    
                      <View><Text style={styles.blackTextSetLimit}> {language.DISCLAIMER_SET_LIMIT}  </Text></View>
                    </View>   
                  </View>  
                </View>
                <View>
                  <SinarmasButton onPress={goOnPage}  disabled={invalid || submitting || disabled} >
                    <Text style={styles.buttonLargeTextStyle}>{language.ADD_NEW_SET_LIMIT}</Text>
                  </SinarmasButton> 
                </View>
              </View>
              : null
          }
        </View>
      </View>
    );
  }

}

export default Pay;
