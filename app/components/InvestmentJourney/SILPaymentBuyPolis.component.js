import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, ImageBackground, ScrollView} from 'react-native';
import styles from './SILPaymentBuyPolis.styles';
import {language} from '../../config/language';
import result from 'lodash/result';
import {noop, isEmpty} from 'lodash';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import SILBackground from '../../assets/images/simasInvestaLink-bg.jpg';
import {SinarmasButton} from '../FormComponents';
import {currencyFormatter} from '../../utils/transformer.util';
import {wrapMethodInFunction, formatForexAmount} from '../../utils/transformer.util';
import moment from 'moment';

export const fields = {
  AMOUNT: 'amount',
  WORK: 'work',
  INCOME: 'income',
  FUND: 'fund',
  MATURITYTYPE: 'maturitytipe',
  VANUMBER: 'numberva'
};

class PaymentBuyPolisComponent extends React.Component {
  static propTypes = {
    showAlert: PropTypes.func,
    listSummary: PropTypes.object,
    summaryDetail: PropTypes.object,
    infoPolis: PropTypes.object,
    sliderChange: PropTypes.func,
    amountSlider: PropTypes.number,
    getSourceAcc: PropTypes.func,
    formValues: PropTypes.func,
    isSilIdrUsd: PropTypes.string,
    errors: PropTypes.array,
    currencyRate: PropTypes.array,
    nameCurrency: PropTypes.object,
    sourceOfFund: PropTypes.array,
    disabled: PropTypes.bool,
    inputPolisIndividu: PropTypes.object,
    amount: PropTypes.string,
    currencySil: PropTypes.array

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
    const {formValues, getSourceAcc,
      inputPolisIndividu, amount, isSilIdrUsd = noop, errors,  nameCurrency,
      currencyRate, sourceOfFund, disabled, currencySil, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const checkAcc = isEmpty(result(formValues, 'myAccount', {}));
    const sendAccountNumber = result(formValues, 'myAccount.accountNumber', '');
    const sendAccountName = result(formValues, 'myAccount.name', '');
    const productType = result(formValues, 'myAccount.productType', '');
    const currencyIcon = result(formValues, 'myAccount.currency', '');
    const errorTextLess = result(errors, 'amountLess', '');
    const errorText = result(errors, 'amount', '');
    const isLessAmount = !isEmpty(errorText) || !isEmpty(errorTextLess);
    const balance = currencyFormatter(result(formValues, 'myAccount.balances.availableBalance', ''));
    const newDate = new Date();
    const currentDate = moment(newDate).format('DD/MM/YYYY');
    const noVa = result(inputPolisIndividu, 'noVa', '');
    const trxId = result(inputPolisIndividu, 'trx_id', '');
    const changeAmount = result(currencyRate, 'amount', 0);
    const myAccountNumber = result(sourceOfFund, 'accountNumber', '');
    const myAccountName = result(sourceOfFund, 'name', '');
    const equivalentCurrency = !isEmpty(currencySil);

    return (
      <View style={styles.offsetOpacity}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container}>
          <View style={styles.progressBar}>
            <View style={[{flex: 5}, styles.greyBar]}/>
            <View style={[{flex: 5}, styles.redBar]}/>            
          </View>
          <View style={styles.rowDetails}>
            <View style={styles.leftContainer}>
              <Text style={styles.detailTitle}>{language.PAYMENT_ESPAJ}</Text>
              <Text style={styles.detailTitle2}>{trxId}</Text>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.detailValues}>{language.PAYMENT_ESPAJ_DATE}</Text>
              <Text style={styles.detailValues2}>{currentDate}</Text>
            </View>
          </View>
          <View style={styles.upperContainer}>
            <ImageBackground source={SILBackground} style={styles.backgroundImageEmFund}>
              <View style={styles.padding}>
                <View style={styles.dropDownContainer}>
                  <Text style={styles.polis}>{language.SIL__VIRTUAL_ACCOUNT}</Text>
                  <View style={styles.dropDown}>
                    <Text style={styles.noPolis}>{noVa}</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.fieldsContainerWrapper}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>{language.SIL__PREMI_TO_PAY}</Text>
            </View>
            {isSilIdrUsd === 'IDR' ?
              <View style={styles.textInputContainerPadding}>
                <Text style={styles.colorText}>{isSilIdrUsd}</Text>
                <View style={styles.textInputAmount}>
                  <Text style={styles.colorTextAmount}>{currencyFormatter(amount)}</Text>
                </View>
                <View style={styles.lineGrey}/>
              </View> : 
              <View style={styles.textInputContainerPadding}>
                <Text style={styles.colorText}>{isSilIdrUsd}</Text>
                <View style={styles.textInputAmount}>
                  <Text style={styles.colorTextAmount}>{formatForexAmount(amount, isSilIdrUsd)}</Text>
                </View>
                <View style={styles.lineGrey}/>
              </View>}
            <View style={styles.checkboxContainer}>
              {isSilIdrUsd === 'IDR' && nameCurrency === 'USD' && equivalentCurrency ?
                <View>
                  <View style={styles.infoMulti}>
                    <Text style={styles.infoTittleCurrency}>{language.SIL__MULTI_EQUIVALENT}</Text>
                    <Text>{nameCurrency} {formatForexAmount(changeAmount, nameCurrency)}</Text>
                  </View>
                </View>
                :
                isSilIdrUsd === 'USD' && nameCurrency === 'IDR' & equivalentCurrency ?
                  <View>
                    <View style={styles.infoMulti}>
                      <Text style={styles.infoTittleCurrency}>{language.SIL__MULTI_EQUIVALENT}</Text>
                      <Text>{nameCurrency} {formatForexAmount(changeAmount, nameCurrency)}</Text>
                    </View>
                  </View>
                  : null}
            </View>
          </View>

          <View style={styles.fieldsContainerWrapper}>
            <View style={styles.rowWallet}>
              <SimasIcon name={'wallet'} size={30} style={[styles.wallet, styles.mr10]}/>
              <Text style={styles.titleWallet}>{language.GENERIC_BILLER__WALLET}</Text>
            </View>
            <View style={styles.labelSpacing} />
            <Touchable onPress={getSourceAcc} >
              <View style={styles.row2}>
                <View>
                  { checkAcc ?
                    <View>
                      <Text style={[styles.roboto, styles.black]}>{language.GENERIC_BILLER__WALLET}</Text>
                    </View>
                    :
                    <View>
                      <Text style={[styles.accNo, styles.roboto]}>{sendAccountNumber}</Text>
                      <Text style={[styles.name]}>{sendAccountName}</Text>
                      <Text style={[styles.product]}>{productType}</Text>
                      <View style={styles.rowBalance}>
                        <Text style={[styles.balance, styles.roboto]}>{language.SEND__AVAILABLE_BALANCE} {currencyIcon} {balance}</Text>
                      </View>
                    </View>
                  }
                </View>
                <View>
                  <SimasIcon name={'more-menu-2'} size={15} style={styles.black}/>
                </View>
              </View>
            </Touchable>
            { errorText !== '' && errorTextLess === '' ?
              <View style={styles.row}>
                <SimasIcon name='input-error' style={styles.errIcon}/>
                <Text style={styles.redText}>{errorText}</Text>
              </View>
              :
              errorTextLess !== '' ?
                <View style={styles.row}>
                  <SimasIcon name='input-error' style={styles.errIcon}/>
                  <Text style={styles.redText}>{errorTextLess}</Text>
                </View>
                :
                null
            }
            <View style={styles.lineGrey}/>
            <View style={styles.padding10}>
              <Text style={styles.formHeaderWithSpace}>{language.CONFIRMATION_REKENING_PENCAIRAN}</Text>
              <Text>{myAccountNumber} - {myAccountName}</Text>
              <Text />
            </View>
            {isSilIdrUsd === 'USD' && nameCurrency === 'IDR' || isSilIdrUsd === 'IDR' && nameCurrency === 'USD' ?
              <View style={styles.row}>
                <SimasIcon name='input-error' style={styles.textCurrency}/>
                <Text style={styles.redText}>{language.SIL__MULTI_WORDING_PAY}</Text>
              </View>
              : null
            }
          </View>
             
          <View style={styles.buttonWrapper}>
            <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting || isLessAmount || disabled || checkAcc} >
              <Text style={styles.buttonLargeTextStyle}>{language.GENERIC__CONTINUE}</Text>
            </SinarmasButton>
          </View>
        </ScrollView>      
      </View>
    );
  }
}

export default PaymentBuyPolisComponent;
