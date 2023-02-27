import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, WebView, Image} from 'react-native';
import {RadioButtons} from 'react-native-radio-buttons';
import styles from './RadioButton.styles';
import Touchable from '../../Touchable.component';
import noop from 'lodash/noop';
import result from 'lodash/result';
import FundTransferMethodDetail from '../../FundTransferJourney/FundTransferMethodDetail.component.js';
import {language} from '../../../config/language';
import {currencyFormatter} from '../../../utils/transformer.util';
import savingPay from '../../../assets/images/saving-paycard.png';
import {toCCFormater} from '../../../../app/utils/transformer.util';
import SimasIcon from '../../../assets/fonts/SimasIcon';
import saving_wallet from '../../../assets/images/SavingAccount.png';
import emoney_wallet from '../../../assets/images/e_money.png';
import creditCard from '../../../assets/images/icon-CreditCard.png';

class RadioButton extends Component {

  static propTypes = {
    options: PropTypes.array,
    input: PropTypes.object,
    onPressRadioButton: PropTypes.func,
    warningText: PropTypes.string,
    renderContainer: PropTypes.object,
    renderRow: PropTypes.bool,
    renderFull: PropTypes.bool,
    renderCC: PropTypes.bool,
    renderOptionSublabelWithoutRow: PropTypes.bool,
    timeConfig: PropTypes.object,
    isSourceAccount: PropTypes.bool,
    isSourceAccountQRTrf: PropTypes.bool,
    transactionsFilter: PropTypes.bool,
    showMonths: PropTypes.bool,
    monthSelection: PropTypes.func,
    showDateSelection: PropTypes.func,
    dateRangeSelection: PropTypes.bool,
    renderOptionMerchantQRGPN: PropTypes.bool,
    transferChargeConfig: PropTypes.array,
  }

  static defaultProps = {
    options: [],  // option = [{label: '', value: ''}, ...]
    input: {
      onChange: noop,
    }
  }

  setSelectedOption = (selectedOption, option) => option.value === this.props.input.value.value;

  renderOptionFull = (option, selected, onSelect, index) => {
    const {warningText = '', timeConfig, transferChargeConfig} = this.props;
    if (result(option, 'disabled', false)) {
      return (
        <View>
          <View style={styles.optionContainer}>
            <View style={styles.optionStyle}>
              <View style={styles.buttonDisabled}>{selected && <View style={styles.buttonActive} />}</View>
              <View style={styles.labelContainer}>
                <View style={styles.flex2}>
                  <Text style={styles.boldTextDisabled}>{option.label}</Text>
                </View>
                <View style={styles.flex1Skn}>
                  {
                    option.value === 'skn' && option.sublabel === 'Rp 0' || option.value === 'bifast' && option.sublabel === 'Rp 0' ||
                    option.value === 'network' && option.sublabel === 'Rp 0' || option.value === 'rtgs' && option.sublabel === 'Rp 0' ?
                      <View style={styles.skn}><Text style={styles.sknText}>{language.TRANSFER__TRANSFER_SKN}</Text></View>
                      :
                      <View>
                        <Text style={styles.smallGreyText}>{option.sublabelTitle}</Text>
                        <Text style={styles.smallGreyText}>{option.sublabel}</Text>
                      </View>
                  }

                </View>
              </View>
            </View>
            <View style={styles.detailContainer}>
              <FundTransferMethodDetail
                disabled={result(option, 'disabled', false)}
                type={option.value}
                textStyle={styles.textStyleDisabled}
                timeConfig={timeConfig}
                transferChargeConfig={transferChargeConfig}/>
            </View>
            {warningText !== '' && <View style={styles.webViewContainer}>
              <WebView style={styles.webViewStyle} source={{html: warningText}}/>
            </View>}
          </View>
          <View style={styles.greyLineFull}/>
        </View>);
    } else {
      return (<Touchable onPress={onSelect} key={index}>
        <View>
          <View style={styles.optionContainer}>
            <View style={styles.optionStyle}>
              <View style={selected ? styles.buttonStyleSelect : styles.buttonStyle}>{selected && <View style={styles.buttonActive} />}</View>
              <View style={styles.labelContainer}>
                <View style={styles.flex2}>
                  <Text style={styles.boldTextStyle}>{option.label}</Text>
                </View>
                <View style={styles.flex1Skn}>
                  {
                    option.value === 'skn' && option.sublabel === 'Rp 0' || option.value === 'bifast' && option.sublabel === 'Rp 0' ||
                    option.value === 'network' && option.sublabel === 'Rp 0' || option.value === 'rtgs' && option.sublabel === 'Rp 0' ?
                      <View style={styles.skn}><Text style={styles.sknText}>{language.TRANSFER__TRANSFER_SKN}</Text></View>
                      :
                      <View>
                        <Text style={styles.smallText}>{option.sublabelTitle}</Text>
                        <Text style={styles.smallText}>{option.sublabel}</Text>
                      </View>
                  }

                </View>
              </View>
            </View>
            <View style={styles.detailContainer}>
              <FundTransferMethodDetail
                disabled={result(option, 'disabled', false)}
                type={option.value}
                textStyle={styles.textStyle}
                timeConfig={timeConfig}
                transferChargeConfig={transferChargeConfig}/>

            </View>
            {warningText !== '' && <View style={styles.webViewContainer}>
              <WebView style={styles.webViewStyle} source={{html: warningText}}/>
            </View>}
          </View>
          <View style={styles.greyLineFull}/>
        </View>
      </Touchable>);
    }
  }

  renderOption = (option, selected, onSelect, index) => {
    const {warningText = '', transactionsFilter = false} = this.props;
    if (transactionsFilter) {
      const {options, showMonths, monthSelection, showDateSelection, dateRangeSelection} = this.props;
      const lastRow = index === (options.length - 1);
      const showMonthLocation = options.findIndex((option) => option.value === 'selectMonth');
      const showDateLocation = options.findIndex((option) => option.value === 'selectDateRange');
      const MonthSelection = monthSelection;
      const DateRangeSelection = dateRangeSelection;
      return (
        <Touchable onPress={onSelect} key={index}>
          <View>
            <View style={styles.whiteBoxOptionStyle}>
              <View style={styles.labelContainer}>
                <Text style={styles.darkBlueTextStyle}>{option.label}</Text>
                <Text style={styles.darkBlueTextStyle}>{option.sublabel}</Text>
              </View>
              {selected ? <SimasIcon name='success-circle' size={20} style={styles.checkIcon}/> : <SimasIcon name='radio-disabled' size={20} style={styles.newButtonStyle}/>}
            </View>
            {showMonths && index === showMonthLocation ? <MonthSelection/> : null}
            {showDateSelection && index === showDateLocation ?  <DateRangeSelection/> : null }
            {lastRow ? null : <View style={styles.greyLine}/>}
            {warningText !== '' && <View style={styles.webViewContainer}>
              <WebView style={styles.webViewStyle} source={{html: warningText}} />
            </View>}
          </View>
        </Touchable>
      );
    } else {
      return (
        <Touchable onPress={onSelect} key={index}>
          <View>
            <View style={styles.optionStyle}>
              <View style={styles.buttonStyle}>{selected && <View style={styles.buttonActive} />}</View>
              <View style={styles.labelContainer}>
                <Text style={styles.textStyle}>{option.label}</Text>
                <Text style={styles.textStyle}>{option.sublabel}</Text>
              </View>
            </View>
            {warningText !== '' && <View style={styles.webViewContainer}>
              <WebView style={styles.webViewStyle} source={{html: warningText}}/>
            </View>}
          </View>
        </Touchable>);
    }
  }

  renderOptionSourceAcc = (option, selected, onSelect, index) => {
    const {warningText = ''} = this.props;
    return (<Touchable onPress={onSelect} key={index}>
      <View>
        <View style={styles.optionStyleSourceAcc}>
          <View style={styles.iconContainer}>
            <Image source={savingPay} style={styles.imageOffer2} />
          </View>
          <View style={styles.labelContainerSourceAcc}>
            <Text style={styles.textStyleType}>{option.productType}</Text>
            <Text style={styles.textStyleNumber}>{option.accountNumber}</Text>
            <Text style={styles.textStyleNumber}>Balances : {currencyFormatter(option.balances)}</Text>
          </View>
          <View style={styles.buttonStyle}>{selected && <View style={styles.buttonActive} />}</View>
        </View>
        {warningText !== '' && <View style={styles.webViewContainer}>
          <WebView style={styles.webViewStyle} source={{html: warningText}}/>
        </View>}
      </View>
    </Touchable>);
  }
  
  renderOptionCC = (option, selected, onSelect, index) => {
    const {warningText = ''} = this.props;
    return (<Touchable onPress={onSelect} key={index}>
      <View>
        <View style={styles.optionStyleCC}>
          <View style={styles.buttonStyle}>{selected && <View style={styles.buttonActive} />}</View>
          <View style={styles.labelContainerCC}>
            <Text style={styles.textStyleCC}>{option.label}</Text>
          </View>
          <Text style={styles.textStyleCC}>{'Rp ' + toCCFormater(option.sublabel)}</Text>
        </View>
        {warningText !== '' && <View style={styles.webViewContainer}>
          <WebView style={styles.webViewStyle} source={{html: warningText}}/>
        </View>}
        <View style={styles.optionContainer}>
          <View style={styles.greyLineCC}/>
        </View>
      </View>
    </Touchable>);
  }

  renderOptionSublabelWithoutRow = (option, selected, onSelect, index) => {
    const {warningText = ''} = this.props;
    return (<Touchable onPress={onSelect} key={index}>
      <View>
        <View style={styles.optionStyle}>
          <View style={styles.buttonStyle}>{selected && <View style={styles.buttonActive} />}</View>
          <View>
            <Text style={styles.textStyleCC}>{option.label}</Text>
            <Text style={styles.textStyleCC}>{option.sublabel}</Text>
          </View>
        </View>
        {warningText !== '' && <View style={styles.webViewContainer}>
          <WebView style={styles.webViewStyle} source={{html: warningText}}/>
        </View>}
      </View>
    </Touchable>);
  }

  renderOptionRow = (option, selected, onSelect, index) => {
    const {onPressRadioButton = noop, warningText = ''} = this.props;
    return (
      <View style={styles.halfWidth}>
        <Touchable onPress={onSelect} key={index}>
          <View>
            <View style={styles.optionStyle}>
              <View style={styles.buttonStyle}>{selected && <View style={styles.buttonActive} />}</View>
              <View style={styles.labelContainer}>
                <Text style={styles.textStyle} onPress={onPressRadioButton}>{option.label}</Text>
                <Text style={styles.textStyle}>{option.sublabel}</Text>
              </View>
            </View>
            {warningText !== '' && <View style={styles.webViewContainer}>
              <WebView style={styles.webViewStyle} source={{html: warningText}}/>
            </View>}
          </View>
        </Touchable>
      </View>
    );
  }

  renderContainer = (optionNodes) => <View>{optionNodes}</View>

  renderContainerRow = (optionNodes) => <View style={styles.renderContainerRow}>{optionNodes}</View>

  renderOptionTransferAcc = (option, selected, onSelect, index) => {
    const {warningText = ''} = this.props;
    const simasIconName = option.productType === 'Emoney Account' ? emoney_wallet : option.productType === 'Credit Card' ? creditCard : saving_wallet;
    const iconContainer = option.productType === 'Emoney Account' ? styles.iconContainer : styles.iconContainerSaving;
    return (
      <Touchable onPress={onSelect} key={index}>
        <View>
          <View style={styles.optionStyleSourceAccCC}>
            <View style={iconContainer}>
              <Image source={simasIconName} style={styles.iconSize}/>
            </View>
            <View style={styles.labelContainerSourceAccCC}>
              <Text style={styles.textStyleName}>{option.name}</Text>
              <Text style={styles.textStyleNumber}>{option.accountNumber}</Text>
              <Text style={styles.textStyleTypeCC}>{option.productType}</Text>
              <Text style={styles.textStyleTypeCC}>{language.CARDLESSWITHDRAWAL__BALANCE}: {currencyFormatter(option.balances)}</Text>
            </View>
            <View style={styles.buttonStyleTrfAccCC}>{selected && <View style={styles.buttonActive} />}</View>
          </View>
          {warningText !== '' && <View style={styles.webViewContainer}>
            <WebView style={styles.webViewStyle} source={{html: warningText}}/>
          </View>}
        </View>
      </Touchable>);
  }

  renderOptionMerchantQRGPN = (option, selected, onSelect, index) => {
    const detail = option;
    return (
      <Touchable onPress={onSelect} key={index}>
        <View>
          <View style={styles.optionStyleSourceAcc}>
            <View style={styles.buttonStyleTrfAcc}>{selected && <View style={styles.buttonActive} />}</View>
            <View style={styles.labelContainerSourceAcc}>
              <Text style={styles.textStyleName}>{detail.merchantCriteria}</Text>
              <Text style={styles.textStyleType}>{language.QR_GPN__CRITERIA_NET_WORTH + '         : ' + detail.netWorth}</Text>
              <Text style={styles.textStyleType}>{language.QR_GPN__CRITERIA_SALES_ANUM + '  : ' + detail.salesPerAnum}</Text>
            </View>
            <View style={styles.horizontalLine}/>
          </View>
        </View>
      </Touchable>
    );
  }

  render () {
    const {options, input, renderRow = false, renderFull = false, renderOptionSublabelWithoutRow = false, isSourceAccount, renderOptionMerchantQRGPN = false, renderCC = false, isSourceAccountQRTrf} = this.props;
    return (
      <RadioButtons
        options={options}
        onSelection={input.onChange}
        selectedOption={input.value}
        renderOption={renderCC ? this.renderOptionCC : isSourceAccountQRTrf ? this.renderOptionTransferAcc : renderOptionSublabelWithoutRow ? this.renderOptionSublabelWithoutRow : renderRow ? this.renderOptionRow : renderFull ? this.renderOptionFull : isSourceAccount ? this.renderOptionSourceAcc : renderOptionMerchantQRGPN ? this.renderOptionMerchantQRGPN : this.renderOption}
        renderContainer={renderRow ? this.renderContainerRow : this.renderContainer}
        testOptionEqual={this.setSelectedOption}
      />
    );
  }
}

export default RadioButton;
