import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import styles from './SavingConfirmation.style';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import * as Utils from '../../utils/transformer.util';
import {isEmpty, result} from 'lodash';
import {language} from '../../config/language';

class SavingAccountConfirmation extends Component {
 
  render () {
    const {getSourceAccList, name, email, initialDeposit, formValues, handleSubmit,
      disabled, errors, invalid, savingImage, savingProductType, currencySavingValas, formValuesSavingValas} = this.props;
    const checkAcc = savingProductType === 'savingValas' ? isEmpty(result(formValuesSavingValas, 'myAccount', {})) : isEmpty(result(formValues, 'myAccount', {}));
    const accountName = savingProductType === 'savingValas' ? result(formValuesSavingValas, 'myAccount.name', '') : result(formValues, 'myAccount.name', '');
    const accountNumber = savingProductType === 'savingValas' ? result(formValuesSavingValas, 'myAccount.accountNumber', '') : result(formValues, 'myAccount.accountNumber', '');
    const currencySofSavingValas = result(formValuesSavingValas, 'myAccount.currency', '');
    const checkCurrencySofSavingValas = !isEmpty(result(formValuesSavingValas, 'myAccount.currency', ''));
    const errorText = result(errors, 'myAccount', '');
    const isLessAmount = initialDeposit === '0' ? false : !isEmpty(errorText);
    const exchangeRate = result(formValuesSavingValas, 'convertMapValasData.exchangeRateDisplay', '');
    const initialDepositAmountValas = result(formValuesSavingValas, 'convertMapValasData.initialDepositDisplay', '');
    const equivalenTo = result(formValuesSavingValas, 'convertMapValasData.equivalenRateDisplay', '');
    const amountToBeDebetedValas = result(formValuesSavingValas, 'convertMapValasData.totalAmountDebited', '');

    return (
      <View style={styles.container}>
        {savingProductType === 'savingValas' ?
          <ScrollView keyboardShouldPersistTaps='handled' extraHeight={120}>
            <View style={styles.mainTitle}>
              <Text style={styles.mainTitleText}>{language.SAVING__ACCOUNT_CONFIRMATION_TITLE}</Text>
            </View>

            <View style={styles.FieldsContainerWrapper}>
              <Image source={{uri: savingImage}} style={styles.image} />
            </View>

            <View style={styles.contentText}>
              <Text style={styles.subContentTextTop}>{language.OPEN_NEW_ACCOUNT__NAME}</Text>
              <Text style={styles.subContentTextBottom}>{name}</Text>
              <View style={styles.borderGreyTop}/>
              <Text style={styles.subContentTextTop}>{language.OPEN_NEW_ACCOUNT__EMAIL}</Text>
              <Text style={styles.subContentTextBottom}>{email}</Text>
              <View style={styles.borderGreyTop}/>
              <Text style={styles.subContentTextTop}>{language.OPEN_NEW_ACCOUNT__CONFIRM_INITIAL_DEPOSIT}</Text>
              <Text style={styles.subContentTextBottom}>{savingProductType === 'savingValas' ? currencySavingValas : 'IDR'} {Utils.currencyFormatter(initialDeposit)}</Text>
              <View style={styles.borderGreyTop}/>
            </View>

            {initialDeposit !== '0' ?
              <View>
                <View style={styles.greyLineValas} />
                <Touchable onPress={getSourceAccList} style={styles.sendAccountDetailContainer}>
                  <View style={styles.detailLeft}>
                    { checkAcc ? 
                      <View style={styles.textCenter}>
                        <Text style={styles.textThin}>{language.TRANSFER__TRANSFER_SELECT_SRC_ACC_TITLE}</Text>
                      </View>
                      :  
                      <View>
                        <Text style={styles.textThin}>{language.DETAIL_TRANSACTION__FROM}</Text>
                        <View style={styles.rowFieldAgreement}>
                          <Text style={styles.subContentTextBottom}>{accountNumber} - </Text>
                          <Text style={styles.subContentTextBottom}>{accountName}</Text>
                        </View>
                        { errorText !== '' ?
                          <View style={[styles.row]}>
                            <SimasIcon name='input-error' style={styles.errIcon}/>
                            <Text style={styles.redText}>{errorText}</Text>
                          </View>
                          : null
                        }
                      </View>
                    }
                  </View>
                  <View style={styles.detailRight}>
                    <SimasIcon name='more-menu' size={20}/>
                  </View>
                </Touchable>
              </View>
              : null
            }
            {savingProductType === 'savingValas' && checkCurrencySofSavingValas && currencySavingValas !== currencySofSavingValas && initialDeposit !== '0' ?
              <View>
                <View style={styles.borderGreyTop}/>
                <View style={styles.containerConvertSavingValas}>
                  <View style={styles.titleContainerConvertValas}>
                    <Text style={styles.titleConvertValas}>{language.SIMAS_VALAS_EXCHANGE_RATE}</Text>
                  </View>
                  <Text style={styles.valueConvertValas}>{exchangeRate}</Text>
                </View>
                <View style={styles.containerConvertSavingValas}>
                  <View style={styles.titleContainerConvertValas}>
                    <Text style={styles.titleConvertValas}>{language.SIMAS_VALAS_INITIAL_DEPOSIT_AMOUNT}</Text>
                  </View>
                  <Text style={styles.valueConvertValas}>{initialDepositAmountValas}</Text>
                </View>
                <View style={styles.containerConvertSavingValas}>
                  <View style={styles.titleContainerConvertValas}>
                    <Text style={styles.titleConvertValas}>{language.SIMAS_VALAS_EQUIVALEN_TO}</Text>
                  </View>
                  <Text style={styles.valueConvertValas}>{equivalenTo}</Text>
                </View>
                <View style={styles.greyLine3} />
                <View style={styles.containerAmountDebitedSavingValas}>
                  <View style={styles.titleContainerConvertValas}>
                    <Text style={styles.titleConvertValasBold}>{language.SIMAS_VALAS_AMOUNT_TO_BE_DEBETED}</Text>
                  </View>
                  <Text style={styles.valueConvertValasBold}>{amountToBeDebetedValas}</Text>
                </View>
              </View>
              : null }
          </ScrollView>
          
          :

          <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps='handled' extraHeight={120}>
              <View style={styles.mainTitle}>
                <Text style={styles.mainTitleText}>{language.SAVING__ACCOUNT_CONFIRMATION_TITLE}</Text>
              </View>

              <View style={styles.FieldsContainerWrapper}>
                <Image source={{uri: savingImage}} style={styles.image} />
              </View>

              <View style={styles.contentText}>
                <Text style={styles.subContentTextTop}>{language.OPEN_NEW_ACCOUNT__NAME}</Text>
                <Text style={styles.subContentTextBottom}>{name}</Text>
                <View style={styles.borderGreyTop}/>
                <Text style={styles.subContentTextTop}>{language.OPEN_NEW_ACCOUNT__EMAIL}</Text>
                <Text style={styles.subContentTextBottom}>{email}</Text>
                <View style={styles.borderGreyTop}/>
                <Text style={styles.subContentTextTop}>{language.OPEN_NEW_ACCOUNT__CONFIRM_INITIAL_DEPOSIT}</Text>
                <Text style={styles.subContentTextBottom}>{savingProductType === 'savingValas' ? currencySavingValas : 'IDR'} {Utils.currencyFormatter(initialDeposit)}</Text>
                <View style={styles.borderGreyTop}/>
              </View>
            </ScrollView>

            {initialDeposit !== '0' ?
              <View>
                <View style={styles.greyLine3} />
                <Touchable onPress={getSourceAccList} style={styles.sendAccountDetailContainer}>
                  <View style={styles.detailLeft}>
                    { checkAcc ? 
                      <View style={styles.textCenter}>
                        <Text style={styles.textThin}>{language.TRANSFER__TRANSFER_SELECT_SRC_ACC_TITLE}</Text>
                      </View>
                      :  
                      <View>
                        <Text style={styles.textThin}>{language.DETAIL_TRANSACTION__FROM}</Text>
                        <View style={styles.rowFieldAgreement}>
                          <Text style={styles.subContentTextBottom}>{accountNumber} - </Text>
                          <Text style={styles.subContentTextBottom}>{accountName}</Text>
                        </View>
                        { errorText !== '' ?
                          <View style={[styles.row]}>
                            <SimasIcon name='input-error' style={styles.errIcon}/>
                            <Text style={styles.redText}>{errorText}</Text>
                          </View>
                          : null
                        }
                      </View>
                    }
                  </View>
                  <View style={styles.detailRight}>
                    <SimasIcon name='more-menu' size={20}/>
                  </View>
                </Touchable>
              </View>
              : null
            }
          </View>
        }
          
        <View style={styles.greyLine2} />
        <View style={styles.buttonContainer}>
          <View>
            <Text style={styles.subContentTextTop}>{language.OPEN_NEW_ACCOUNT__CONFIRM_INITIAL_DEPOSIT}</Text>
            <Text style={styles.subContentTextBottomBold}>{savingProductType === 'savingValas' ? currencySavingValas : 'IDR'} {Utils.currencyFormatter(initialDeposit)}</Text>
          </View>

          <SinarmasButton style={styles.button2} text={language.SAVING__ACCOUNT_CREATE_BUTTON} 
            onPress={Utils.wrapMethodInFunction(handleSubmit)} disabled={invalid || disabled || isLessAmount} />
        </View>
      </View>
    );
  }
}

SavingAccountConfirmation.propTypes = {
  navigation: PropTypes.object,
  onSubmitPress: PropTypes.func,
  disabled: PropTypes.bool,
  getSourceAccList: PropTypes.func,
  name: PropTypes.string,
  email: PropTypes.string,
  initialDeposit: PropTypes.string,
  formValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  invalid: PropTypes.bool,
  savingImage: PropTypes.string,
  productDeposit: PropTypes.string,
  savingProductType: PropTypes.string,
  currencySavingValas: PropTypes.string,
  formValuesSavingValas: PropTypes.object,
};

export default SavingAccountConfirmation;
