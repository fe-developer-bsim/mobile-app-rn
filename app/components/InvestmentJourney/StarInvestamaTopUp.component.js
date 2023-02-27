import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, ImageBackground, ScrollView} from 'react-native';
import styles from './StarInvestamaTopUp.styles';
import {language} from '../../config/language';
import result from 'lodash/result';
import {noop, isEmpty, filter, find} from 'lodash';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import SILBackground from '../../assets/images/simasInvestaLink-bg.jpg';
import {SinarmasButton, SinarmasPicker, RadioButton, SinarmasInputBox} from '../FormComponents';
import {currencyFormatter, formatForexAmount} from '../../utils/transformer.util';
import {getDataForSIl} from '../../utils/middleware.util';
import {Field} from 'redux-form';
import CheckBox from 'react-native-checkbox';
import RedCheckBox from '../../assets/images/checkbox-checked.png';
import UnCheckBox from '../../assets/images/checkbox-unchecked.png';
import * as Utils from '../../utils/transformer.util';
import {wrapMethodInFunction} from '../../utils/transformer.util';

export const fields = {
  AMOUNT: 'amount',
  WORK: 'work',
  INCOME: 'income',
  FUND: 'fund',
  MATURITYTYPE: 'maturitytipe',
  VANUMBER: 'numberva'
};

class InvestmentComponent extends React.Component {
  static propTypes = {
    showAlert: PropTypes.func,
    listSummary: PropTypes.object,
    listMtiPolis: PropTypes.object,
    infoPolis: PropTypes.object,
    sliderChange: PropTypes.func,
    amountSlider: PropTypes.number,
    validationInput: PropTypes.func,
    getSourceAcc: PropTypes.func,
    formValues: PropTypes.func,
    inquiryData: PropTypes.object,
    amountValue: PropTypes.number,
    errors: PropTypes.array,
    monthIncome: PropTypes.object
  }
  state={
    checked: false,
    secondChecked: false  
  }

  checkBox=() => {
    this.setState({checked: !this.state.checked});
  }

  checkBoxSecond=() => {
    this.setState({secondChecked: !this.state.secondChecked});
  }
  
  render () {
    const {infoPolis, formValues, getSourceAcc, inquiryData, validationInput, amountValue, errors, monthIncome, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const checkAcc = isEmpty(result(formValues, 'myAccount', {}));
    const polisNumber = result(infoPolis, 'nomorPolis', '');
    const sendAccountNumber = result(formValues, 'myAccount.accountNumber', '');
    const sendAccountName = result(formValues, 'myAccount.name', '');
    const productType = result(formValues, 'myAccount.productType', '');
    const totalAll = Number(amountValue);
    const balance = currencyFormatter(result(formValues, 'myAccount.balances.availableBalance', ''));
    const availableBalance = !checkAcc && (result(formValues, 'myAccount.balances.availableBalance', '') === '' || result(formValues, 'myAccount.balances.availableBalance', '') === null) ? totalAll : result(formValues, 'myAccount.balances.availableBalance', 0);
    const balanceFlag = availableBalance < totalAll;
    const siltopUpOption = getDataForSIl(result(inquiryData, 'listRollover', []));
    const currencyIcon = result(infoPolis, 'mataUang', 'IDR');
    const monthOptions = getDataForSIl(result(infoPolis, 'listMti', []));
    const errorTextLess = result(errors, 'amountLess', '');
    const errorText = result(errors, 'amount', '');
    const isLessAmount = !isEmpty(errorText) || !isEmpty(errorTextLess);
    const checkAmount = result(errors, 'checkedAmount', true);
    const jobOptions = getDataForSIl(result(inquiryData, 'listSumberPendanaan', []));
    const listRPI = result(infoPolis, 'listRate', []);
    const filterRPI = filter(listRPI, function (o) {
      return result(o, 'maxDynamic', 0) >= amountValue && result(o, 'minDynamic', 0) <= amountValue;
    });
    const findRPI = isEmpty(listRPI) ? null : find(filterRPI, {rpi: result(monthIncome, 'label', '')});
    const limitTopUp = parseInt(result(inquiryData, 'limitTopUp', ''));

    return (
      <View style={styles.offsetOpacity}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container}>
          <View style={styles.upperContainer}>
            <ImageBackground source={SILBackground} style={styles.backgroundImageEmFund}>
              <View style={styles.padding}>
                <View style={styles.dropDownContainer}>
                  <Text style={styles.polis}>{language.INQUIRY__STAR_INVESTAMA_NO_POLIS}</Text>
                  <View style={styles.dropDown}>
                    <Text style={styles.noPolis}>{polisNumber}</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.fieldsContainerWrapper}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>{language.SIL__TOPUP_AMOUNT_TEXT}</Text>
            </View>
            <View style={styles.textInputContainerPadding}>
              <View style={styles.textInputAmount}>
                <Field
                  name={fields.AMOUNT}
                  placeholder={language.HINTTEXT__TRANSFER_AMOUNT_PLACEHOLDER}
                  format={Utils.formatFieldAmountChange}
                  normalize={Utils.normalizeAmount}
                  keyboardType='numeric'
                  component={SinarmasInputBox}
                  leftIcon={currencyIcon}
                  textPosition='center'
                  maxLength={17}
                  borderOff={true}
                />
              </View>
              <View style={styles.lineGrey}/>
              <View style={styles.containerTipsAmount}>
                {checkAmount ?
                  <Text style = {styles.redAmount}>{language.STAR__MIN_AMOUNT_USD} {formatForexAmount(limitTopUp, 'USD')}{}</Text>
                  : null }
              </View>
            </View>
          </View>
          <View style={styles.fieldsContainerWrapper}>
            <View style={styles.rowWallet}>
              <SimasIcon name={'wallet'} size={30} style={[styles.wallet, styles.mr10]}/>
              <Text style={styles.titleWallet}>{language.GENERIC_BILLER__WALLET}</Text>
            </View>
            <View style={styles.labelSpacing} />
            <Touchable onPress={getSourceAcc} style={[styles.row2]}>
              { checkAcc ?
                <View>
                  <Text style={[styles.roboto, styles.black]}>{language.GENERIC_BILLER__WALLET}</Text>
                </View>
                :
                <View>
                  <Text style={[styles.accNo, styles.roboto]}>{sendAccountNumber}</Text>
                  <Text style={[styles.name]}>{sendAccountName}</Text>
                  <Text style={[styles.product]}>{productType}</Text>
                  <View style={styles.row}>
                    <Text style={[styles.balance, styles.roboto]}>{language.SEND__AVAILABLE_BALANCE} {currencyIcon} </Text>
                    <Text style={[styles.balance, styles.roboto]}>{balance}</Text>
                  </View>
                  {/* {balanceFlag && <Text style={styles.styleRedMessageError}>{language.SAVING__ACCOUNT_NOT_ENOUGH_BALANCE}</Text>} */}
                </View>
              }
              <View>
                <SimasIcon name={'more-menu-2'} size={15} style={styles.black}/>
              </View>
            </Touchable>
            { errorText !== '' && errorTextLess === '' ?
              <View style={styles.rowErrors}>
                <SimasIcon name='input-error' style={styles.errIcon}/>
                <Text style={styles.redText}>{errorText}</Text>
              </View>
              :
              errorTextLess !== '' ?
                <View style={styles.rowErrors}>
                  <SimasIcon name='input-error' style={styles.errIcon}/>
                  <Text style={styles.redText}>{errorTextLess}</Text>
                </View>
                :
                null
            }
          </View>
          
          <View style={styles.padding10}/>
          <View style={styles.fieldsContainerWrapper}>
            <Text style={styles.formHeaderWithSpace}>{language.SIL__SOURCE_OF_FUND_TEXT}</Text>
            <Field
              name={fields.WORK}
              component={SinarmasPicker}
              theme='primary'
              itemList={jobOptions}
              labelKey='label'
              style={styles.fieldContainer}
              label={language.SIL__SOURCE_OF_FUND_TEXT_PLACHOLDER}
              placeholder={language.SIL__SOURCE_OF_FUND_TEXT_PLACHOLDER}
              isUseSuccessInputText={true}
              typeField={'work'}
              validationInput={validationInput}
            />
          </View>
          <View style={styles.padding10}/>
          <View style={styles.fieldsContainerWrapper}>
            <Text style={styles.formHeaderWithSpace}>{language.STAR__INVESTAMA_PERIOD_INVESTMENT}</Text>
            <Field
              name={fields.INCOME}
              component={SinarmasPicker}
              label={language.STAR__INVESTAMA_PERIOD_INVESTMENT}
              placeholder={language.SIL__INVESTMENT_WITHDRAWAL_TEXT_PLACEHOLDER}
              itemList={monthOptions}
              labelKey='label'
              typeField={'fund'}
              validationInput={validationInput}
            />
          </View>
          {!isEmpty(findRPI) ?
            <View style={styles.rateInvest}>
              <View>
                <Text>{language.INQUIRY__SIL_INVEST_RATE}</Text>
              </View>
              <View style={styles.row}>
                <Text>{language.INQUIRY__SIL_INVEST_RATE_LOW} {result(findRPI, 'low', '')}% - </Text>
                <Text>{language.INQUIRY__SIL_INVEST_RATE_MEDIUM} {result(findRPI, 'mid', '')}% - </Text>
                <Text>{language.INQUIRY__SIL_INVEST_RATE_HIGH} {result(findRPI, 'high', '')}%</Text>
              </View>
            </View> : null
          }
          <View style={styles.padding10}/>
          <View style={styles.fieldsContainerWrapper}>
            <Text style={styles.formHeaderWithSpace}>{language.SIL__OPTION__MATURITY}</Text>
            <Field name={fields.MATURITYTYPE}
              component={RadioButton}
              options={siltopUpOption}/>
          </View>

          <View style={styles.fieldsContainerWrapper}>
            <View style={styles.rowCheckBox}>
              <View style={styles.containn}>
                <CheckBox
                  onChange={this.checkBox}
                  uncheckedImage={RedCheckBox}
                  checkedImage={UnCheckBox}
                  label={null}
                  checkboxStyle={styles.checkboxStyle}
                  labelStyle={styles.checkboxLabel}
                  checked={!this.state.checked} // somehow checked value is reversed
                />
              </View>
              <View style={styles.textCheckBox}>
                <Text>
                  {language.STAR__INVESTAMA_DISCLAIMER_TOP_UP}
                </Text>
              </View>
            </View>
            {/* <View style={styles.rowCheckBox}>
              <View style={styles.containn}>
                <CheckBox
                  onChange={this.checkBoxSecond}
                  uncheckedImage={RedCheckBox}
                  checkedImage={UnCheckBox}
                  label={null}
                  checkboxStyle={styles.checkboxStyle}
                  labelStyle={styles.checkboxLabel}
                  checked={!this.state.secondChecked} // somehow checked value is reversed
                  />
              </View>
              <View style={styles.textCheckBox}>
                <Text>
                  {language.SIL__DISCLAIMER_TOP_UP2}
                </Text>
              </View>
            </View> */}
            
          </View>
          <View style={styles.buttonWrapper}>
            <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting || !this.state.checked || checkAcc || balanceFlag || isLessAmount || checkAmount} >
              <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
            </SinarmasButton>
          </View>
        </ScrollView>      
      </View>
    );
  }
}

export default InvestmentComponent;
