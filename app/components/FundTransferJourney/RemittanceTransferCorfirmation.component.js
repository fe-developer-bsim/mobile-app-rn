import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {formatFieldAmount, wrapMethodInFunction} from '../../utils/transformer.util';
import result from 'lodash/result';
import styles from './RemittanceTransferConfirmation.style';
import {language} from '../../config/language';
import isEmpty from 'lodash/isEmpty';
import SimasIcon from '../../assets/fonts/SimasIcon';
import toUpper from 'lodash/toUpper';
import trx_icon from '../../assets/images/trx_icon.png';
import FromNew from '../../assets/images/FromNew.png';
import {connect} from 'react-redux';
import {spreadMarginValasRefreshRateRemittance} from '../../state/thunks/common.thunks';
import BackgroundTimer from 'react-native-background-timer';
import CheckBox from 'react-native-checkbox';
import RedCheckBox from '../../assets/images/checkbox-checked.png';
import UnCheckBox from '../../assets/images/checkbox-unchecked.png';

const mapStateToProps = () => ({

});

const mapDispatchToProps = (dispatch) => ({
  spreadMarginValasRefreshRateRemittance: (isConfirm) => dispatch(spreadMarginValasRefreshRateRemittance(isConfirm)),
});

class RemittanceTransferConfirmation extends Component {
  static propTypes = {
    formValues: PropTypes.object,
    payee: PropTypes.object,
    handleSubmit: PropTypes.func,
    triggerAuth: PropTypes.func,
    currentDate: PropTypes.string,
    isOwnAccount: PropTypes.bool,
    doTransfer: PropTypes.func,
    resData: PropTypes.object,
    config: PropTypes.object,
    gapTime: PropTypes.number,
    getCurrency: PropTypes.array,
    currencyRate: PropTypes.array,
    isValas: PropTypes.bool,
    dataTransactionRemittance: PropTypes.object,
    formRefreshRateRemittance: PropTypes.object,
    rateChangeRemittance: PropTypes.bool,
    spreadMarginValasRefreshRateRemittance: PropTypes.func,
    dispatch: PropTypes.func,
    toggleSpreadMargin: PropTypes.bool,
    valasRefreshInterval: PropTypes.number,
  }

  state = {
    containerHeightStyle: {minHeight: 0},
    showExpand: false,
    summaryCollapsed: true,
    secondsRemaining: this.props.valasRefreshInterval,
    isConfirm: false,
    checked: false,
    disable: false,
  }

  setContainerHeightStyle = (e) => {
    this.setState({containerHeightStyle: {minHeight: e.nativeEvent.layout.height - 20}});
  }

  tick = () => {
    const {spreadMarginValasRefreshRateRemittance} = this.props;
    const {isConfirm} = this.state;
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (isConfirm === true) {
      BackgroundTimer.clearInterval(this.interval);
    } else if (isConfirm === false && this.state.secondsRemaining <= 0) {
      BackgroundTimer.clearInterval(this.interval);
      this.testsec();
      spreadMarginValasRefreshRateRemittance(isConfirm);
    }
  }

  testsec = () => {
    const {valasRefreshInterval} = this.props;
    this.interval = BackgroundTimer.setInterval(this.tick, 1000);
    this.setState({
      secondsRemaining: valasRefreshInterval,
    });
  }

  componentDidMount = () => {
    if (this.props.toggleSpreadMargin) {
      this.testsec();
    }
    this.setState({isConfirm: false});
  }

  submit = () => {
    const {dispatch, ...reduxFormProps} = this.props;
    const {handleSubmit} = reduxFormProps;
    this.setState({isConfirm: true});
    dispatch(wrapMethodInFunction(handleSubmit));
  };

  toogleCheckbox = (checked) => {
    this.setState({checked, disable: checked});
  }

  render () {
    const {formValues, resData, payee, dataTransactionRemittance, formRefreshRateRemittance, rateChangeRemittance} = this.props;
    const targetAccount = result(resData, 'targetAccountObject', {});
    const isSimas = targetAccount.detailNetworkCode === '153';
    const isUnknownAccount = targetAccount.accountType === 'UnknownAccount' || isEmpty(targetAccount.accountType);
    const targetAccountType = isSimas ?
      isUnknownAccount ? result(targetAccount, 'bankName', 'NA') : result(targetAccount, 'accountType', 'NA')
      : result(targetAccount, 'bankName', 'NA');
    const amount = parseInt(result(formValues, 'amount', 0));
    // DIPAKE
    const nameSender = result(payee, 'senderData.senderData.nameSender', '');
    const countrySender = result(payee, 'senderData.senderData.countrySender', '');
    const stateSender = result(payee, 'senderData.senderData.stateSender', '');
    const adressSender = result(payee, 'senderData.senderData.adressSender', '');
    const nameRecipient = result(payee, 'dataForm.recipientData.nameRecipient', '');
    const countryRecipient = result(payee, 'dataForm.recipientData.countryRecipient', '');
    const stateRecipient = result(payee, 'dataForm.recipientData.stateRecipient', '');
    const adressRecipient = result(payee, 'dataForm.recipientData.adressRecipient', '');
    const purposeRecipient = result(payee, 'dataForm.recipientData.purposeListRecipient.display', '');
    const descriptionRecipient = result(payee, 'dataForm.recipientData.descriptionRecipient', '');
    const totalAmountView = rateChangeRemittance === true && !isEmpty(result(formRefreshRateRemittance, 'totalAmountView', '')) ? result(formRefreshRateRemittance, 'totalAmountView', '') : result(resData, 'totalAmountView', '');
    const currencyAccountFrom = result(dataTransactionRemittance, 'currencyAccountFrom', '');
    const currencyRemmitance = result(resData, 'currencyRemmitance', '');
    const feeRateDisplay = rateChangeRemittance === true && !isEmpty(result(formRefreshRateRemittance, 'fee', '')) ? result(formRefreshRateRemittance, 'fee', '') : result(resData, 'fee', '');
    const equivalenRateDisplay = rateChangeRemittance === true && !isEmpty(result(formRefreshRateRemittance, 'equivalent', '')) ? result(formRefreshRateRemittance, 'equivalent', '') : result(dataTransactionRemittance, 'equivalenRateDisplay', '');
    const currencyRateDisplay = rateChangeRemittance === true && !isEmpty(result(formRefreshRateRemittance, 'exchangeRate', '')) ? result(formRefreshRateRemittance, 'exchangeRate', '') : result(resData, 'getConvertAmountTransaction.currencyRateDisplay', '');
    return (
      <View style={styles.containerUtama}>
        <ScrollView style={styles.flexGrey}>
          <View style={styles.backgroundColorPink}/>
          <View style={styles.containerBannerWhite}>
            <View style={styles.rowInformation}>
              <View style={styles.paddingBox}>
                <View style={styles.accNumberContainer}>
                  <View style={styles.amountTextTitleContent}>
                    <Text style={styles.amountTextTitle}>{language.REMITTANCE__AMOUNT}</Text>
                  </View>
                  <View style={styles.textInputAmountValas}>
                    <View style={styles.textInputAmountValas}>
                      <View style={styles.rowLeft}>
                        <Text style={styles.CurrencyText}>{currencyRemmitance}</Text>
                      </View>
                      <View style={styles.rowRight}>
                        <Text style={styles.AmountText}>{formatFieldAmount(amount)}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View>
                  {currencyAccountFrom === currencyRemmitance ?
                    null
                    :
                    <View style={styles.detailTransactionText}>
                      <Text style={styles.colorDetailTextTrx}>{language.REMITTANCE__EXCHANGE_RATE}</Text>
                      <Text style={styles.colorDetailTextTrx}>{currencyRateDisplay}</Text>
                    </View>
                  }
                  <View style={styles.detailTransactionText}>
                    <Text style={styles.colorDetailTextTrx}>{language.REMITTANCE__EQUIVALENT_TO}</Text>
                    <Text style={styles.colorDetailTextTrx}>{equivalenRateDisplay}</Text>
                  </View>
                  <View style={styles.detailTransactionText}>
                    <Text style={styles.colorDetailTextTrx}>{language.REMITTANCE__FEE_OUR}</Text>
                    <Text style={styles.colorDetailTextTrx}>{feeRateDisplay}</Text>
                  </View>
                  <View style={styles.containerGreyline}>
                    <View style={styles.greyLine} />
                  </View>
                  <View style={styles.detailTransactionTextDebited}>
                    <Text style={styles.colorDetailTextDebited}>{language.REMITTANCE__AMOUNT_DEBITED}</Text>
                    <Text style={styles.colorDetailTextDebited}>{totalAmountView}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.infoTextTrue}>
            <Text style={styles.title}>{language.REMITTANCE__ACCOUNT_INFORMATION_TITLE}</Text>
          </View>
          <View style={[styles.containerWhite]}>
            <View style={styles.containerRekening}>
              <View style={styles.accDetail}>
                <Image source={FromNew} style={styles.imgIconFrom}/>
                <View style={styles.rightItemContainer}>
                  <Text style={styles.sendAccNameType}>{result(formValues, 'myAccount.name', 'NIL')}</Text>
                  <Text style={styles.sendAccNumber}>{result(formValues, 'myAccount.accountNumber', 'NIL')}</Text>
                  <Text style={styles.sendAccType}>{result(formValues, 'myAccount.productType', 'NIL')}</Text>
                </View>
              </View>

              <SimasIcon name={'more-menu'} size={25} style={styles.greyDot}/>

              <View style={styles.payeeDetail}>
                <Image source={trx_icon} style={styles.imgIcon}/>
                <View style={styles.containerAcc}>
                  <Text style={styles.sendAccNameType}>{!isEmpty(targetAccount) ? toUpper(result(targetAccount, 'name', 'NA')) : toUpper(result(payee, 'name', 'NA'))}</Text>
                  <Text style={styles.sendAccNumber}>{!isEmpty(targetAccount) ? result(targetAccount, 'accountNumber', 'NA') : result(payee, 'accountNumber', 'NA')}</Text>
                  <Text style={styles.sendAccType}>{!isEmpty(targetAccount) ? targetAccountType : result(payee, 'bank', 'NA')}</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.infoText}>
            <Text style={styles.title}>{language.REMITTANCE__SENDER_INFORMATION_TITLE}</Text>
          </View>
          <View style={[styles.containerWhite]}>
            <View style={styles.informationItem}>
              <View style={styles.flex}>
                <Text style={styles.subTitleText}>{language.REMITTANCE__NAME_TEXT}</Text>
              </View>
              <View style={styles.informationItemTwo}>
                <View style={styles.flex}>
                  <Text style={styles.subTitleTextTwo}>{nameSender}</Text>
                </View>                 
              </View>
            </View>
            <View style={styles.informationItem}>
              <View style={styles.flex}>
                <Text style={styles.subTitleText}>{language.REMITTANCE___COUNTRY_TEXT}</Text>
              </View>
              <View style={styles.informationItemTwo}>
                <View style={styles.flex}>
                  <Text style={styles.subTitleTextTwo}>{countrySender}</Text>
                </View>                 
              </View>
            </View>
            <View style={styles.informationItem}>
              <View style={styles.flex}>
                <Text style={styles.subTitleText}>{language.REMITTANCE__CITY_TEXT}</Text>
              </View>
              <View style={styles.informationItemTwo}>
                <View style={styles.flex}>
                  <Text style={styles.subTitleTextTwo}>{stateSender}</Text>
                </View>                 
              </View>
            </View>
            <View style={styles.informationItem}>
              <View style={styles.flex}>
                <Text style={styles.subTitleText}>{language.REMITTANCE__ADDRESS_TEXT}</Text>
              </View>
              <View style={styles.informationItemTwo}>
                <View style={styles.flex}>
                  <Text style={styles.subTitleTextTwo}>{adressSender}</Text>
                </View>                 
              </View>
            </View>
          </View>
          
          <View style={styles.infoText}>
            <Text style={styles.title}>{language.REMITTANCE__RECIPIENT_INFORMATION_TITLE}</Text>
          </View>
          <View style={[styles.containerWhite]}>
            <View style={styles.informationItem}>
              <View style={styles.flex}>
                <Text style={styles.subTitleText}>{language.REMITTANCE__NAME_TEXT}</Text>
              </View>
              <View style={styles.informationItemTwo}>
                <View style={styles.flex}>
                  <Text style={styles.subTitleTextTwo}>{nameRecipient}</Text>
                </View>                 
              </View>
            </View>
            <View style={styles.informationItem}>
              <View style={styles.flex}>
                <Text style={styles.subTitleText}>{language.REMITTANCE___COUNTRY_TEXT}</Text>
              </View>
              <View style={styles.informationItemTwo}>
                <View style={styles.flex}>
                  <Text style={styles.subTitleTextTwo}>{countryRecipient}</Text>
                </View>                 
              </View>
            </View>
            <View style={styles.informationItem}>
              <View style={styles.flex}>
                <Text style={styles.subTitleText}>{language.REMITTANCE__CITY_TEXT}</Text>
              </View>
              <View style={styles.informationItemTwo}>
                <View style={styles.flex}>
                  <Text style={styles.subTitleTextTwo}>{stateRecipient}</Text>
                </View>                 
              </View>
            </View>
            <View style={styles.informationItem}>
              <View style={styles.flex}>
                <Text style={styles.subTitleText}>{language.REMITTANCE__ADDRESS_TEXT}</Text>
              </View>
              <View style={styles.informationItemTwo}>
                <View style={styles.flex}>
                  <Text style={styles.subTitleTextTwo}>{adressRecipient}</Text>
                </View>                 
              </View>
            </View>
            <View style={styles.informationItem}>
              <View style={styles.flex}>
                <Text style={styles.subTitleText}>{language.REMITTANCE__PURPOSE_TEXT}</Text>
              </View>
              <View style={styles.informationItemTwo}>
                <View style={styles.flex}>
                  <Text style={styles.subTitleTextTwo}>{purposeRecipient}</Text>
                </View>                 
              </View>
            </View>
            <View style={styles.informationItem}>
              <View style={styles.flex}>
                <Text style={styles.subTitleText}>{language.REMITTANCE__DESCRIPTION_TEXT}</Text>
              </View>
              <View style={styles.informationItemTwo}>
                <View style={styles.flex}>
                  <Text style={styles.subTitleTextTwo}>{descriptionRecipient}</Text>
                </View>                 
              </View>
            </View>
          </View>
          <View style={[styles.container]}>
            <View style={styles.bottomSpacing}>
              <View style={styles.containtextExplanation}>
                <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon}/>
                <View style={styles.containExplantionRight}><Text style={styles.textExplanation}>{language.REMITTANCE__EXCHANGE_RATES_EXPLANATION_TRANSFER}</Text></View>
              </View>
            </View>
          </View>

          <View style={styles.containerCheckboxText}>
            <View style={styles.borderCaution}>
              <View style={styles.containerCheckbox}>
                <CheckBox
                  onChange={this.toogleCheckbox}
                  uncheckedImage={RedCheckBox}
                  checkedImage={UnCheckBox}
                  label={''}
                  checkboxStyle={styles.checkBox}
                  checked={!this.state.checked}
                />
              </View>
              <Text style={styles.caution}>{language.CHECKBOX__REMITTANCE_CONFIRMATION}</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <SinarmasButton style={styles.button} text={language.REMITTANCE__BUTTON_TRANSFER} onPress={this.submit} disabled={!this.state.disable}/>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemittanceTransferConfirmation);
