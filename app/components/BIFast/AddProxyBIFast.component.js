import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import styles from './AddProxyBIFast.style';
import noop from 'lodash/noop';
import result from 'lodash/result';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import isEmpty from 'lodash/isEmpty';
import {SinarmasButton, SinarmasPickerBoxProxy, SinarmasInputBoxNew} from '../FormComponents';


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
    user: PropTypes.object,
    isEmail: PropTypes.object,
    isPhoneNumber: PropTypes.object,
    addProxyAddress: PropTypes.string,
    prefiledAliasProxy: PropTypes.func,

  }


  onNextPress = () => {
    const {onNextPress = noop, currencyRate = []} = this.props;
    onNextPress(currencyRate);
  }

  render () {
    const {getSourceAcc, formValues, goBack, goToConfirmation,
      isEmail, isPhoneNumber, addProxyAddress, prefiledAliasProxy, ...reduxFormProps} = this.props;
    const {invalid, submitting} = reduxFormProps;
    const sendAccountNumber = result(formValues, 'myAccount.accountNumber', '');
    const checkAcc = isEmpty(result(formValues, 'myAccount', {}));
    const proxyAddressType = [
      {label: 'Email Address', value: '02'},
      {label: 'Phone Number', value: '01'},
    ];
    const isAddProxy = isEmpty(addProxyAddress);
    const emptyAccountNumber = isEmpty(sendAccountNumber);

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
                      <Text style={styles.transferTitle}>{language.BIFAST_ADD_PROXY}</Text>
                    </View>
                  </View>

                  <Text style={styles.titles}>{language.BIFAST_ADD_PROXY_PLEASE}</Text>
                  <View style={styles.accNumberContainer}>
                    <Field
                      name={fields.ADDPROXYTYPE}
                      rightIcon='arrow'
                      theme='primary'
                      component={SinarmasPickerBoxProxy}
                      placeholder={language.BIFAST_PROXY_ADDRESS_TYPE}
                      labelText={language.BIFAST_PROXY_ADDRESS_TYPE}
                      labelKey='label'
                      itemList={proxyAddressType}
                      isRemittance={true}
                      isProxyType={true}
                      isCurrency={language.BIFAST_PROXY_ADDRESS_TYPE}
                      isAddProxy={isAddProxy}
                      isEmail={isEmail}
                      isPhoneNumber={isPhoneNumber}
                      prefiledAliasProxy={prefiledAliasProxy}
                    />
                  </View>
                  
                  <View style={styles.accNumberContainer}>
                    <Field
                      name={fields.PROXYALIAS}
                      label={language.HINTTEXT__ALIAS}
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
                  
                  <View style={styles.containtextExplanation}>
                    <SimasIcon name={'caution-circle'} size={25} style={styles.checkboxLabel} />
                    <View style={styles.containExplantionRight}><Text style={styles.textExplanation}>{language.BIFAST_CAUTION_ADD_PROXY}</Text></View>
                  </View>
                    
                  <View style={styles.buttonBottom}>
                    <SinarmasButton onPress={goToConfirmation} disabled={invalid || submitting || emptyAccountNumber} text={language.SERVICE__NEXT_BUTTON} />
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
