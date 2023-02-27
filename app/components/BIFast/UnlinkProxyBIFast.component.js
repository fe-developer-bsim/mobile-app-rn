import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './UnlinkProxyBIFast.style';
import noop from 'lodash/noop';
import result from 'lodash/result';
import size from 'lodash/size';
import map from 'lodash/map';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import isEmpty from 'lodash/isEmpty';
import {getSourceAccountProxyRadioButton} from '../../utils/middleware.util';
import savingPay from '../../assets/images/SavingAccount.png';
import {ScrollView} from 'react-native-gesture-handler';

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
    errors: PropTypes.array,
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
    setNewSof: PropTypes.func
  }

  state = {
    buttonDisabled: true,
    targetId: '',
  }

  enableButton = () => {
    this.setState({buttonDisabled: false});
  }

  onNextPress = () => {
    const {onNextPress = noop, currencyRate = []} = this.props;
    onNextPress(currencyRate);
  }

  setIdtarget =(value, alldata) => () => {
    this.setState({targetId: value});
    this.props.setNewSof(alldata);
  }

  render () {
    const {goBack, proxyAccount = [], goToConfirmation} = this.props;
    const accList = getSourceAccountProxyRadioButton(proxyAccount);
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
                      <Text style={styles.transferTitle}>{language.BIFAST_UNLINK_PROXY}</Text>
                    </View>
                  </View>

                  <Text style={styles.titles}>{language.BIFAST_SELECT_ACCOUNT}</Text>
                  
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
                    
                  <View style={styles.buttonBottom}>
                    <SinarmasButton onPress={goToConfirmation} disabled={this.state.targetId === ''} text={language.BIFAST_UNLINK_PROXY_BUTTON} />
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
