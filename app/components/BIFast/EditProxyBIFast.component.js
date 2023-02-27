import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './EditProxyBIFast.style';
import noop from 'lodash/noop';
import result from 'lodash/result';
import map from 'lodash/map';
import size from 'lodash/size';
import {SinarmasButton, SinarmasInputBoxNew} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import isEmpty from 'lodash/isEmpty';
import {getSourceAccountProxyRadioButton} from '../../utils/middleware.util';
import savingPay from '../../assets/images/SavingAccount.png';
import {ScrollView} from 'react-native-gesture-handler';


export const fields = {
  ADDPROXYTYPE: 'addProxyType',
  PROXYALIAS: 'proxyAlias',
  PROXYACCOUNT: 'proxyAccount',
};

class FundTransferPayment extends Component {
  static propTypes = {
    payee: PropTypes.object,
    accountList: PropTypes.array,
    onNextPress: PropTypes.func,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    formValues: PropTypes.object,
    paymentMethods: PropTypes.array,
    checkboxChange: PropTypes.func,
    getSourceAcc: PropTypes.func,
    selectedSourceAcc: PropTypes.object,
    sendAccountNumber: PropTypes.string,
    amountChange: PropTypes.func,
    disabled: PropTypes.bool,
    isOwnAccount: PropTypes.bool,
    currencyRate: PropTypes.array,
    currencyTarget: PropTypes.array,
    amountNormalise: PropTypes.number,
    goBack: PropTypes.func,
    goToConfirmation: PropTypes.func,
    visible: PropTypes.object,
    tickOverlay: PropTypes.object,
    tickOnclose: PropTypes.object,
    proxyAccount: PropTypes.array,
    selectedAccount: PropTypes.object,
    setNewSof: PropTypes.func,
  }

  state = {
    buttonDisabled: true,
    targetId: '',
    allData: {}
  }

  setIdtarget =(value, allData) => () => {
    this.setState({targetId: value});
    this.setState({allData: allData});
    const proxyType = result(allData, 'ProxyDefinition1_Tp', '') === '01' ? 'Phone Number' : result(allData, 'ProxyDefinition1_Tp', '') === '02' ? 'Email Address' : '';
    this.props.setNewSof(proxyType, result(allData, 'ProxyDefinition1_Val', ''), result(allData, 'ProxyDefinition1_Tp', ''), allData);
  }

  enableButton = () => {
    this.setState({buttonDisabled: false});
  }

  onNextPress = () => {
    const {onNextPress = noop, currencyRate = []} = this.props;
    onNextPress(currencyRate);
  }

  render () {
    const {getSourceAcc, formValues, goBack, goToConfirmation, proxyAccount = [], selectedAccount} = this.props;
    const accList = getSourceAccountProxyRadioButton(proxyAccount);
    const ProxyDefinition1_Tp = result(selectedAccount, 'ProxyDefinition1_Tp', '');
    const sendAccountNumber = result(formValues, 'myAccount.accountNumber', '');
    const checkAcc = isEmpty(result(formValues, 'myAccount', {}));
    const checkAcc1 = isEmpty(result(formValues, 'proxyAlias', ''));
    const sizeAccount = size(accList);
    return (     
      
      <View style={styles.pinkBg}>
        <View style={styles.shadowWhiteBg}>
          <View style={styles.whiteBg}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraScrollHeight={120} enableOnAndroid={true}>
              <ScrollView keyboardShouldPersistTaps='handled'>
                <View style={styles.containerNew}>

                  <View style={styles.containerArrow}>
                    <Touchable onPress={goBack}>
                      <View style={{padding: 5}}>
                        <SimasIcon name={'arrow'} size={20} style={styles.arrow}/>
                      </View>
                    </Touchable>
                    <View style={styles.progressBar}>
                      <Text style={styles.transferTitle}>{language.BIFAST_EDIT_PROXY}</Text>
                    </View>
                  </View>

                  <Text style={styles.titles}>{language.BIFAST_EDIT_PROXY_SELECT}</Text>
                  
                  <View>  
                    {isEmpty(accList) ?
                      <View>  
                        <Text style={styles.captionText}>{language.BIFAST_ACCOUNT_DONTHAVE}</Text>
                      </View>
                      :   
                      <View>
                        {map(accList, (value, k) => (
                          <View index={k}>
                            <View style={styles.bgWhite}>

                              <Touchable style={styles.rowCheck} onPress ={this.setIdtarget(result(value, 'ProxyDefinition1_Val', ''), value)}>
                                <View style={styles.rowAccount}>
                                  <View style={styles.iconContainer}>
                                    <Image source={savingPay} style={styles.imageOffer2} />
                                  </View>
                                  <View style={styles.infoContainer}>
                                    <View style={styles.pad2}>
                                      <Text style={styles.accTxt2}>{result(value, 'ProxyDefinition1_Val', '')}</Text>
                                    </View>
                                    <View style={styles.pad2}>
                                      <Text style={styles.typeTxt}>{result(value, 'CashAccount40_Nm', '')}</Text>
                                    </View>
                                    <View style={styles.pad2}>
                                      {result(value, 'CashAccountType2ChoiceProxy_Prtry', '') === 'CCAC' ?
                                        <Text style={styles.typeTxt}>{'Current account'}</Text>
                                        : result(value, 'CashAccountType2ChoiceProxy_Prtry', '') === 'SVGS' ?
                                          <Text style={styles.typeTxt}>{'Savings Account'}</Text>
                                          : result(value, 'CashAccountType2ChoiceProxy_Prtry', '') === 'LOAN' ?
                                            <Text style={styles.typeTxt}>{'Loan'}</Text>
                                            : result(value, 'CashAccountType2ChoiceProxy_Prtry', '') === 'CCRD' ?
                                              <Text style={styles.typeTxt}>{'Credit Card'}</Text>
                                              : result(value, 'CashAccountType2ChoiceProxy_Prtry', '') === 'UESB' ?
                                                <Text style={styles.typeTxt}>{'E-Money'}</Text>
                                                : result(value, 'CashAccountType2ChoiceProxy_Prtry', '') === 'OTHR' ?
                                                  <Text style={styles.typeTxt}>{'None of the above'}</Text>
                                                  :
                                                  <Text style={styles.typeTxt}>{'-'}</Text>
                                      }
                                    </View>
                                    <View style={styles.pad2}>
                                      <Text style={styles.typeTxt}>{result(value, 'GenericAccountIdentification1_Id', '')}</Text>
                                    </View>
                                  </View>
                                </View>
                                <View style={styles.coloumnCheck}>
                                  {result(value, 'ProxyDefinition1_Val', '') === this.state.targetId ?
                                    <View style={styles.circleOuter}>
                                      <View style={styles.circleInner}/>
                                    </View>
                                    :
                                    <View style={styles.circleOuterOff}>
                                      <View style={styles.circleInnerOff}/>
                                    </View>
                                  }
                                </View>
                              </Touchable>
                              {k + 1 !== sizeAccount && <View style={styles.greyLineAccount}/>}
                            </View>
                          </View>)
                        )}
                      </View>
                    }
                  </View>
                    
                  <View>  
                    <View>
                      <Text style={styles.titleBottom}>{language.BIFAST_EDIT_PROXY_INPUT}</Text>
                      {ProxyDefinition1_Tp === '01' ?
                        <Text style={styles.sendAccNumber}>{language.MOBILE_POSTPAID__PHONE_NUMBER}</Text>
                        : ProxyDefinition1_Tp === '02' ?
                          <Text style={styles.sendAccNumber}>{language.COMMON__EMAIL}</Text>
                          :
                          <Text style={styles.sendAccNumber}>{''}</Text>
                      }
                      <Field
                        name={fields.ADDPROXYTYPE}
                        label={'Account address type'}
                        disabled={true}
                        component={SinarmasInputBoxNew}
                        maxLength={40}
                      />
                    </View>

                    <View style={styles.senderDetail}>
                      <Field
                        name={fields.PROXYALIAS}
                        label={'Alias'}
                        disabled={true}
                        component={SinarmasInputBoxNew}
                        maxLength={40}
                      />
                    </View>

                    <View style={styles.containerDiv}>
                      <Touchable onPress={getSourceAcc}>
                        <View style={styles.sendAccountDetailContainer}>
                          {
                            checkAcc ?
                              <View>
                                <Text style={styles.captionText}>{language.BIFAST_PROXY_ACCOUNT}</Text>
                              </View>
                              :
                              <View>
                                <Text style={styles.captionText}>{language.BIFAST_PROXY_ACCOUNT}</Text>
                                <Text style={styles.sendAccNumber}>{sendAccountNumber}</Text>
                              </View>
                          }
                          <SimasIcon name='arrow' size={12} style={styles.blackArrow} />
                        </View>
                      </Touchable>
                    </View>
                  </View>

                  <View style={styles.buttonBottom}>
                    <SinarmasButton onPress={goToConfirmation} disabled={checkAcc1 || checkAcc} text={language.SERVICE__NEXT_BUTTON} />
                  </View>
                </View>
              </ScrollView>
            </KeyboardAwareScrollView>
          </View>
        </View>
      </View>
    );
  }
}

export default FundTransferPayment;