import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasButton, SinarmasInputBox, SinarmasInputBoxSetLimit} from '../FormComponents';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from '../../components/Account/SetLimitForm1.styles';
import Touchable from '../Touchable.component';
import {noop} from 'lodash';
import {wrapMethodInFunction, currencyFormatter} from '../../utils/transformer.util';
import {result, isEmpty} from 'lodash';
import {formatFieldAmount, normalizeAmount} from '../../utils/transformer.util';

export const fields = {
  LIMIT_PER_TRANSACTION: 'limitPerTransaction',
  LIMIT_PER_DAY: 'limitPerDay',
  SOURCE_OF_FUND: 'sourceOfFund',
  SOURCE_OF_CREDIT: 'sourceCredit',
  CREDIT_NAME: 'name',
  CREDIT_NUMBER: 'accountNumber'
};

class SetForm1 extends Component {
  render () {
    const {disabled, validationInput, getSourceAcc = noop, formValues, defaultAccount, goToSearchableList, errorNextTrx, errorNextDay,  ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
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
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.container} extraScrollHeight={100} enableOnAndroid={true}>
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

                              {/* <Field
                  name={fields.USERNAME}
                  iconName='username-input'
                  component={SinarmasInputBoxNew}
                  label={regisATM ? language.LOGIN_ENTER_REGISTRATION_CODE : language.LOGIN__ENTER_USERNAME}
                  placeholder={regisATM ? language.HINTTEXT__ACT_CODE : language.HINTTEXT__MOBILE_NUMBER_OR_USERNAME}
                  disabled={isUserRegistered || isLockedDevice}
                />           */}
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
              <View style={styles.paddingBottom}>

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
              <View>
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
        </View>
        <View style={styles.buttonWrapper}>
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)}  disabled={ invalid || submitting || disabled || !errorNext && !successNext} >
            <Text style={styles.buttonLargeTextStyle}>{language.GENERIC__CONTINUE}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

SetForm1.propTypes = {
  disabled: PropTypes.bool,
  handleSubmit: PropTypes.func,
  validationInput: PropTypes.func,
  isLogin: PropTypes.bool,
  getSourceAcc: PropTypes.func,
  formValues: PropTypes.object,
  defaultAccount: PropTypes.object,
  goToSearchableList: PropTypes.func,
  errorNextTrx: PropTypes.string,
  errorNextDay: PropTypes.string,
};

export default SetForm1;
