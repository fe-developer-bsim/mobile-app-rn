import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {language} from '../../config/language';
import {SinarmasButton, SinarmasPickerBox, SinarmasPickerLine} from '../FormComponents';
import {Field} from 'redux-form';
import {generateDenomination, wrapMethodInFunction, currencyFormatter, dateList} from '../../utils/transformer.util';
import noop from 'lodash/noop';
import result from 'lodash/result';
import styles from './BillerTypeNinePayment.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import isEmpty from 'lodash/isEmpty';
import CheckBox from 'react-native-checkbox';
import RedCheckBox from '../../assets/images/checkbox-checked.png';
import UnCheckBox from '../../assets/images/checkbox-unchecked.png';

export const fields = {
  ACCOUNT_NO: 'accountNo'
};

class BillerTypeNinePayment extends React.Component {
  static propTypes ={
    handleSubmit: PropTypes.func,
    accounts: PropTypes.array,
    denominations: PropTypes.array,
    formValues: PropTypes.object,
    billDetails: PropTypes.object,
    biller: PropTypes.object,
    invalid: PropTypes.bool,
    billerAccount: PropTypes.func,
    billerAccountWithCC: PropTypes.func,
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    errorsAmount: PropTypes.bool,
    defaultAccount: PropTypes.object,
    isLogin: PropTypes.bool,
    moreInfoBL: PropTypes.func,
    billerBlacklist: PropTypes.string,
    isBillerBlacklisted: PropTypes.bool,
    isAutoSwitchToogle: PropTypes.bool,
    switchAccountToogleBE: PropTypes.bool,
    toogleCheckbox: PropTypes.func,
    checked: PropTypes.bool,
    isAutoDebit: PropTypes.object,
    isADebit: PropTypes.bool,
    autoDebitEnabled: PropTypes.string,
  }

  render () {
    const {formValues, biller = {}, invalid = false, handleSubmit = noop, billerAccount, billerAccountWithCC, isBillerBlacklisted, defaultAccount, isLogin, moreInfoBL, disabled, errors, isAutoSwitchToogle, switchAccountToogleBE, toogleCheckbox, checked, isAutoDebit, isADebit, autoDebitEnabled} = this.props;
    const denomList = generateDenomination(biller);
    const isUseSimas = result(formValues, 'accountNo.isUseSimas', '');
    const checkAcc = isEmpty(result(formValues, 'accountNo', {}));
    const accNo = result(formValues, 'accountNo.accountNumber', '');
    const name = result(formValues, 'accountNo.name', '');
    const productType = result(formValues, 'accountNo.productType', '');
    const balance = isUseSimas ? currencyFormatter(result(formValues, 'accountNo.balances.availableBalance', '')) + ' ' + language.PROFILE__SIMAS_POIN_HEAD : currencyFormatter(result(formValues, 'accountNo.balances.availableBalance', ''));
    const errorText = result(errors, 'accountNo', '');
    const isLessAmount = !isEmpty(errorText);
    const defAccountNumber = result(defaultAccount, 'accountNumber', '');
    const isRegular = result(isAutoDebit, 'isRegular', false);
    const billerName = 'Payment ' + result(biller, 'name', '');
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraScrollHeight={100} enableOnAndroid={true}>
        <View>
          <View style={styles.container}>
            <View style={styles.row}>
              <View>
                <SimasIcon name={'amount'} size={30} style={[styles.amount, styles.mr10]}/>
              </View>
              <View>
                <Text style={styles.title}>{language.GENERIC_BILLER__SELECT_AMOUNT}</Text>
              </View>
            </View>
            <View style={styles.labelSpacing} />
            <View>
              <View style={styles.bgSearch}>
                <View style={styles.searchTxtInput}>
                  <Field
                    name='denomination'
                    rightIcon='arrow'
                    placeholder={language.GENERIC_BILLER__PICKER_AMOUNT}
                    component={SinarmasPickerBox}
                    itemList={denomList}
                    labelKey='label'/>
                </View>
              </View>
              {
                !isEmpty(autoDebitEnabled) && autoDebitEnabled !== 'NONE' ?
                  <Touchable style={styles.p20}>
                    <View>
                      <CheckBox
                        onChange={isADebit ? noop : toogleCheckbox}
                        uncheckedImage={RedCheckBox}
                        checkedImage={UnCheckBox}
                        label={language.AUTODEBIT__SETAUTODEBIT}
                        checkboxStyle={styles.checkboxStyle}
                        labelStyle={styles.checkboxLabel}
                        checked={isADebit === true ? checked : !checked} // somehow checked value is reversed
                      />
                    </View>
                  </Touchable>
                  : null
              }
            </View>
          </View>

          <View style={styles.greyLine} />

          <View style={styles.container}>
            {isLogin || !(isAutoSwitchToogle && switchAccountToogleBE) ?
              <View>
                <View style={styles.row}>
                  <View>
                    <SimasIcon name={'wallet'} size={30} style={[styles.wallet, styles.mr10]}/>
                  </View>
                  <View>
                    <Text style={styles.title}>{language.GENERIC_BILLER__WALLET}</Text>
                  </View>
                </View>
                <View style={styles.labelSpacing} />
                <Touchable dtActionName='Select source account' onPress={isBillerBlacklisted === true ? billerAccount : billerAccountWithCC} style={[styles.row2]}>
                  { checkAcc ?
                    <View>
                      <Text style={[styles.roboto, styles.black]}>{language.GENERIC_BILLER__WALLET}</Text>
                    </View>
                    :
                    <View style={{flex: 1}}>
                      {
                        isUseSimas ? 
                          null
                          :
                          <Text style={[styles.accNo, styles.roboto]}>{accNo}</Text>
                      }
                      <Text style={[styles.name]}>{name}</Text>
                      {
                        isUseSimas ?
                          <Text style={[styles.product]}>{language.ONBOARDING__REDEEM_TITLE}</Text>
                          :
                          <Text style={[styles.product]}>{productType}</Text>
                      }
                      <View style={styles.row}>
                        {
                          isUseSimas ?
                            <Text style={[styles.balance, styles.roboto]}>{language.SIMAS_POIN_BALANCE} </Text>
                            :
                            <Text style={[styles.balance, styles.roboto]}>{language.GENERIC_BILLER__BALANCE} </Text>
                        }
                        <Text style={[styles.balance, styles.roboto]}>{balance}</Text>
                      </View>

                    </View>
                  }
                  <View>
                    <SimasIcon name={'more-menu-2'} size={15} style={styles.black}/>
                  </View>
                </Touchable>
              </View>
              :
              <View>
                <View style={styles.row}>
                  <View>
                    <SimasIcon name={'wallet'} size={30} style={[styles.wallet, styles.mr10]}/>
                  </View>
                  <View>
                    <Text style={styles.title}>{language.GENERIC_BILLER__SOURCE_ACC}</Text>
                  </View>
                </View>
                <View style={styles.labelSpacing} />
                <View style={{flexDirection: 'row'}}>
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
            { errorText !== '' ?
              <View style={[styles.row, styles.mt5]}>
                <SimasIcon name='input-error' style={styles.errIcon}/>
                <Text style={styles.redText}>{errorText}</Text>
              </View>
              :
              null
            }
          </View>
          <View style={styles.greyLine} />

          <View style={styles.container}>
            {(checked === true || isADebit) && isRegular === true ?
              <View>
                <View>
                  <Text style={[styles.roboto, styles.black]}>{language.AUTODEBIT__LIST_EDIT_DATE_LABEL}</Text>
                </View>
                <Field
                  name='date'
                  rightIcon='arrow'
                  component={SinarmasPickerLine}
                  placeholder={language.AUTODEBIT__LIST_EDIT_DATE_LABEL}
                  labelKey='label'
                  itemList={dateList} />
                <View>
                  <Text style={[styles.roboto, styles.black]}>{language.AUTODEBIT__LABEL_DATE_EXPLANATION}</Text>
                </View>
              </View>
              : null
            }
          </View>
        </View>
        <View style={styles.verticalSpacing}>
          <SinarmasButton dtActionName={billerName} disabled={invalid || disabled || isLessAmount} onPress={wrapMethodInFunction(handleSubmit)}>
            <Text style={styles.nextButton}>{language.SERVICE__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default BillerTypeNinePayment;
