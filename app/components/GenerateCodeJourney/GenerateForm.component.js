import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, ScrollView} from 'react-native';
import styles from './GenerateForm.styles';
import {SinarmasButton, SinarmasInputBox} from '../FormComponents';
import {Field} from 'redux-form';
import {formatFieldAmount, normalizeAmount} from '../../utils/transformer.util';
import {result} from 'lodash';
import isEmpty from 'lodash/isEmpty';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import Overlay from '../Overlay/OverlayRadius.component';

class GenerateCode extends React.Component {
  static propTypes = {
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    isLogin: PropTypes.bool,
    dataMerchant: PropTypes.object,
    accounts: PropTypes.array,
    values: PropTypes.object,
    goToConfirmation: PropTypes.func,
    thisState: PropTypes.object,
    trxType: PropTypes.string,
    generateCode: PropTypes.object,
    navigation: PropTypes.object,
    goNextPage: PropTypes.func,
    emoneyAccounts: PropTypes.array,
    selectNoPolis: PropTypes.func,
    inquiryData: PropTypes.object,
    changeData: PropTypes.func,
    infoPolis: PropTypes.object,
    summaryPolis: PropTypes.object,
    goToEmFund: PropTypes.func,
    errMsg: PropTypes.func,
    getSourceMerc: PropTypes.func,
    formValues: PropTypes.object,
    billerConfig: PropTypes.object,
    billerLKD: PropTypes.object,
    visible: PropTypes.object,
    tickOverlay: PropTypes.object,
    tickOnclose: PropTypes.object,
    goTopUp: PropTypes.func,
  }

  render () {
    const {submitting, invalid, goToConfirmation, emoneyAccounts, errMsg, getSourceMerc, formValues, billerConfig, billerLKD, visible, tickOverlay, tickOnclose} = this.props;
    const checkAcc = isEmpty(result(formValues, 'merchantCode.name', {}));
    const iconDefault = result(billerLKD, '[0].icon', '');
    const merchantDefault = result(billerLKD, '[0].name', '');
    const icon = result(formValues, 'merchantCode.icon', '');
    const merchantName = result(formValues, 'merchantCode.name', '');
    const errEmoney = result(emoneyAccounts, 'error.accountNo', '');
    const accEmoney = result(emoneyAccounts, 'accountNo', {});
    const data = result(billerConfig, 'billerLKD', []);
    const isAlfa = data.length;
    const disabled = true;
   

    return (
      <ScrollView>
        <Overlay closeOnTouchOutside visible={visible} onClose={tickOnclose}>
          <View>
            <View style={styles.greyLine2} />
            <View style={styles.detailTitleContainer}><Text style={styles.bold}>{language.GENERATE_FORM_RULES_POP}</Text></View>
            <View style={styles.greyLine2} />
            <View style={styles.rowContainer}>
              <View style={styles.numberContainer}><Text style={[styles.numberText]}>1</Text></View>
              <View style={styles.rowText}><Text style={[styles.roboto]}>{language.GENERATE_FORM__CASH_1}</Text></View>
            </View>
            <View style={styles.greyLine2} />
            <View style={styles.rowContainer}>
              <View style={styles.numberContainer}><Text style={styles.numberText}>2</Text></View>
              <View style={styles.rowText}><Text style={[styles.roboto]}>{language.GENERATE_FORM__CASH_4}</Text></View>
            </View>
            <View style={styles.greyLine2} />
            <View style={styles.rowContainer}>
              <View style={styles.numberContainer}><Text style={styles.numberText}>3</Text></View>
              <View style={styles.rowText}><Text style={[styles.roboto]}>{language.GENERATE_FORM__CASH_5}</Text></View>
            </View>
            <View style={styles.greyLine2} />
            <View style={styles.rowContainer}>
              <View style={styles.numberContainer}><Text style={styles.numberText}>4</Text></View>
              <View style={styles.rowText}><Text style={[styles.roboto]}>{language.GENERATE_FORM__CASH_6}</Text></View>
            </View>
          </View>
        </Overlay>
        <View onLayout={this.setContainerHeightStyle} style={[styles.halfWidth]}>
          <View style={styles.container2}>
            <View keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} >
              <View style={[styles.row1, styles.left, styles.paddingVer]}>
                <View style={styles.iconAmount}>
                  <Text style={styles.iconText}>IDR</Text>
                </View>
                <Text style={styles.textAmount}>{language.GENERATE_CODE_FORM_MAX_AMOUNT}</Text>
              </View>
              <View style={styles.containerForm}>
                <View style={styles.field} />
                <View style={styles.field}>
                  <Field 
                    name='amount'
                    label={language.CARDLESSWITHDRAWAL__AMOUNT}
                    placeholder={language.CARDLESSWITHDRAWAL__HINTTEXT_TRANSFER_AMOUNT}
                    format={formatFieldAmount}
                    normalize={normalizeAmount}
                    component={SinarmasInputBox}
                    leftIcon={language.GENERATE_CONFIRMATION_FEE_2}
                    textPosition={'center'}
                    keyboardType={'phone-pad'}
                    iconName={'edit-amount'}
                    maxLength={13}
                  />
                </View>
                <Touchable onPress={tickOverlay}>
                  <View style={styles.itemContainer}>
                    <View style={styles.rowContainerSpace}>
                      <View style={styles.disclaimerText1}>
                        <Text style={styles.disclaimerTxt1}>{language.GENERATE_FORM_RULES}</Text>
                      </View>
                    </View>
                  </View>
                </Touchable>
                <View style={styles.containerWhite1}>
                  <View style={styles.containerMenu}>
                    <Text style={styles.merchText}>{language.GENERATE_FORM_MERCHANT}</Text>
                    <View>
                      <Touchable onPress={getSourceMerc} disabled={isAlfa === 1 ? disabled : false}>
                        <View>
                          {
                            checkAcc ?
                              <View style={styles.codeBorder}>
                                <Image source={{uri: iconDefault}} style={styles.iconMerch}/>
                                <Text style={styles.titleCode}>{merchantDefault}</Text> 
                                <SimasIcon name={isAlfa === 1 ? '' : 'arrow'} size={15} style={styles.arrowIcon}/>
                              </View>
                              : 
                              <View style={styles.codeBorder}>
                                <Image source={{uri: icon}} style={styles.iconMerch}/>
                                <Text style={styles.titleCode}>{merchantName}</Text>   
                                <SimasIcon name={'arrow'} size={15} style={styles.arrowIcon}/>
                              </View>
                          }
                        </View>
                      </Touchable>
                    </View>
                  </View>
                  <View style={styles.whiteBottom} />
                </View>
                <View>
                  <View style={styles.greyLine1} />
                  <View style={styles.container1}>
                    <View style={[styles.row1, styles.left, styles.paddingVer]}>
                      <SimasIcon name='wallet' size={30} style={styles.iconWallet}/>
                      <Text style={styles.textAmount}>{language.GENERIC_BILLER__WALLET}</Text>
                    </View>
                    <View style={styles.labelSpacing} />
                    <View style={styles.rowPicker}>
                      <View style={styles.centerRowPicker}>
                        {accEmoney ?
                          <View style={styles.sourchAccount}>
                            <Text style={styles.titlePicker}>{result(emoneyAccounts, 'accountNumber', '')}</Text>
                            <Text>{result(emoneyAccounts, 'name', '')}</Text>
                            <Text>{result(emoneyAccounts, 'productType', '')}</Text>
                            {errEmoney ? <Text style={styles.errText}>{errEmoney}</Text> : null}
                          </View>
                          : <View>
                            <Text style={styles.blackText}>{language.GENERIC_BILLER__WALLET}</Text>
                          </View>
                        }
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.disclaimerText}>
                <Touchable onPress={''}>
                  <Text style={styles.disclaimerTxt}>{''}</Text>
                </Touchable>
              </View>
              <View>
                <View style={styles.buttonContainer}>
                  <SinarmasButton style={styles.btnConfirm} onPress={goToConfirmation} disabled={invalid || submitting || errMsg} >
                    <Text style={styles.buttonLargeTextStyle}>{language.GENERIC__CONTINUE}</Text>
                  </SinarmasButton>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default GenerateCode;