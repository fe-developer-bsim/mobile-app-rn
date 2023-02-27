import {View, Text, ScrollView, Image, ImageBackground} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './QRInvoiceTcico.styles';
import {SinarmasButton, RadioButton} from '../FormComponents';
import noop from 'lodash/noop';
import {language} from '../../config/language';
import {result, isEmpty} from 'lodash';
import {Field} from 'redux-form';
import {toTitleCase} from '../../utils/transformer.util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import SinarmasInputBoxRevamp from '../FormComponents/SinarmasInputBox/SinarmasInputBoxRevamp.component';
import * as Utils from '../../utils/transformer.util';
import {getSourceAccountRadioButton} from '../../utils/middleware.util';
import merchantIcon from '../../assets/images/dimo_home.png';
import bG from '../../assets/images/backgroud_rev.png';
import Touchable from '../Touchable.component';


class QRInvoice extends React.Component {
  static propTypes = {
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    navParams: PropTypes.object,
    inputTipDisabled: PropTypes.bool,
    submitting: PropTypes.bool,
    thisState: PropTypes.object,
    defaultAccount: PropTypes.object,
    isLogin: PropTypes.bool,
    moreInfoBL: PropTypes.func,
    accountsTransfer: PropTypes.array,
  }

  state = {
    inquiryData: {}
  }

  render () {
    const {navParams, formValues, submitting, accounts, defaultAccount, moreInfoBL, isLogin, ...reduxFormProps} = this.props;
    const accountName = result(navParams, 'data.59', '');
    const accountNumber = result(navParams, 'data.40.02', '');
    const {handleSubmit = noop, invalid = false} = reduxFormProps;
    const emptyAcc = isEmpty(result(formValues, 'sourceAcc', {}));
    const accountList = getSourceAccountRadioButton(accounts);
    const isCashout = result(navParams, 'data.62.08', '') === 'CWDL';
    const amount = result(navParams, 'data.54', '');
    const disableAmount = !isEmpty(amount);
    const defAccountNumber = result(defaultAccount, 'accountNumber', '');
    const selectedBalance = result(formValues, 'sourceAcc.balances', '');
    const amountVal = result(formValues, 'amountVal', '');
    const checkBalance = parseInt(selectedBalance) < parseInt(amountVal);
    const checkAmountCashout = parseInt(amountVal) > 1000000;
    const checkAmountTransfer = parseInt(amountVal) > 2000000;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraScrollHeight={100} enableOnAndroid={true}>
        <ImageBackground source={bG} style={styles.imageSummary} />
        <View style={styles.tes} > 
          <View style={styles.containerTransfer}>
            <View style={styles.containerBanner}>
              <View style={styles.containerLeft}>
                <View style={styles.targetAcc}>
                  {
                    isCashout ? 
                      <View style={styles.merchIcon}>
                        <Image source={merchantIcon} style={styles.merchantSize}/>
                      </View> 
                      :
                      <View style={styles.iconAcc}>
                        <SimasIcon name='new-send' style={styles.testIcon} size={27}/>
                      </View>
                  }
                  
                  {
                    isCashout ? 
                      <View style={styles.textAcc}>
                        <Text>Merchant's Name</Text>
                        <Text style={styles.targetName}>{toTitleCase(accountName)}</Text>
                      </View>
                      : 
                      <View style={styles.textAcc}>
                        <Text style={styles.targetName}>{toTitleCase(accountName)}</Text>
                        <Text>{accountNumber}</Text>
                      </View> 
                  }   
                </View>
                <View style={styles.accNumberContainer}>
                  <View style={styles.accNumber}>
                    <View style={styles.iconRp}>
                      <SimasIcon name={'new_rpicon'} size={50} style={styles.headerIcon}/>
                    </View>
                    <View style={styles.amountRight}>
                      <Text style={styles.textAmount}>Amount</Text>
                      <Field
                        name='amountVal'
                        placeholder={language.HINTTEXT__TRANSFER_AMOUNT_PLACEHOLDER}
                        format={Utils.formatFieldAmount}
                        normalize={Utils.normalizeAmount}
                        disabled={disableAmount}
                        component={SinarmasInputBoxRevamp}
                        keyboardType='phone-pad'
                        isInputAmount={true}
                      />
                    </View>
                    
                  </View>
                  {
                    checkAmountCashout && isCashout ? 
                      <View style={[styles.row, styles.mt5]}>
                        <SimasIcon name='input-error' style={styles.errIcon}/>
                        <Text style={styles.redText}>{language.MAX_AMOUNT_QR_CASHOUT}</Text>
                      </View>
                      :
                      checkAmountTransfer && !isCashout ?
                        <View style={[styles.row, styles.mt5]}>
                          <SimasIcon name='input-error' style={styles.errIcon}/>
                          <Text style={styles.redText}>{language.MAX_AMOUNT_QR_TRANSFER}</Text>
                        </View>
                        :
                        checkBalance ?
                          <View style={[styles.row, styles.mt5]}>
                            <SimasIcon name='input-error' style={styles.errIcon}/>
                            <Text style={styles.redText}>{language.SAVING__ACCOUNT_NOT_ENOUGH_BALANCE}</Text>
                          </View>
                  
                          : null
                  }
                  
                </View>
                {
                  isCashout ? 
                    null :
                    <View style={styles.accNumberContainer}>
                      <View style={styles.accNumber}>
                        <View style={styles.amountRightNote}>
                          <Text style={styles.textAmount}>Additional Information</Text>
                          <Field
                            name='notes'
                            component={SinarmasInputBoxRevamp}
                          />
                        </View>
                      </View>
                    </View>
                }
                
                
              </View>
              <View>
                <View style={styles.sourceAccTitle}>
                  <Text style={styles.sourceAccText}>{language.AUTODEBIT__LIST_ACCOUNT}</Text>
                </View>
                {
                  isLogin ? 
                    <View style={styles.containerLeftSourceAcc}>
                      <ScrollView enableOnAndroid={true} nestedScrollEnabled={true}>
                        <Field name='sourceAcc' component={RadioButton} options={accountList} isSourceAccountQRTrf={true}/>
                      </ScrollView>
                    </View> 
                    :
                    <View style={styles.containerLeftSourceAccBL}>
                  
                      <View style={styles.labelSpacing} />
                      <View style={{flexDirection: 'row'}}>
                        <View>
                          <SimasIcon name={'wallet'} size={30} style={[styles.wallet, styles.mr10]}/>
                        </View>
                        <View style={{flex: 1}}>
                          <Text style={[styles.accNo, styles.roboto]}>{defAccountNumber}</Text>
                        </View>
                        <View>
                          <Touchable onPress={moreInfoBL}>
                            <SimasIcon name={'caution-reverse'} size={30} style={styles.informationcolor} />
                          </Touchable >
                        </View>
                      </View>
    
                    </View>
                }
                
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.bottomSpacing}>
          <SinarmasButton onPress={handleSubmit} disabled={invalid || submitting || emptyAcc || checkBalance || (checkAmountCashout && isCashout) || (checkAmountTransfer && !isCashout)} >
            <Text style={styles.buttonLargeTextStyle}>{language.BUTTON__START}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>

    );
  }
}


export default QRInvoice;
