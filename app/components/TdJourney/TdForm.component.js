import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {SinarmasPicker, SinarmasInput, SinarmasButton, RadioButton} from '../FormComponents';
import {Field} from 'redux-form';
import {generateAccountLabel, generatePeriodLabel, currencyFormatter, formatFieldAmount, normalizeAmount, currencySymbol, formatForexAmount, generateMinTD, generatePeriodLabelSharia} from '../../utils/transformer.util';
import {language} from '../../config/language';
import styles from './TdForm.component.style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class TdForm extends React.Component {

  static propTypes = {
    availableBalance: PropTypes.number,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
    savingAccounts: PropTypes.array,
    tdTypeOptions: PropTypes.array,
    tdPeriodList: PropTypes.array,
    isShariaAccount: PropTypes.bool,
    openTdHolidayWarning: PropTypes.string,
    minimumDeposit: PropTypes.string,
    rate: PropTypes.number,
    isDisabled: PropTypes.bool,
    setIsDisabled: PropTypes.func,
    changeTdPeriodList: PropTypes.func,
    tenorRate: PropTypes.object,
    currency: PropTypes.string,
    minCurrency: PropTypes.object,
    rateValas: PropTypes.string,
    newRate: PropTypes.object,
    tenorRateSyariah: PropTypes.object,
    tenorNisbahBank: PropTypes.object,
    tenorNisbahCust: PropTypes.object,
    newRateSha: PropTypes.object,
    nisbahCust: PropTypes.object,
    nisbahBank: PropTypes.object
  }

  render () {
    const {isDisabled, changeTdPeriodList, invalid, submitting, handleSubmit, savingAccounts, availableBalance, tdPeriodList = [], tdTypeOptions, isShariaAccount, tenorRate = [], currency, minCurrency, newRate,  tenorRateSyariah = [], tenorNisbahBank = [], tenorNisbahCust = [], newRateSha} = this.props;
    const tdMsg = (isShariaAccount) ? language.TIME_DEPOSIT__SHARIA_MESSAGE : language.TIME_DEPOSIT__CONVENTIONAL_MESSAGE;
    const generateMin = generateMinTD(minCurrency, currency);
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraHeight={120}>
        <View style={styles.row}>
          <Text style={styles.formHeader}>{language.TIME_DEPOSIT__SELECT_ACCOUNT}</Text>
          <Field
            name='accountNo'
            rightIcon='arrow'
            component={SinarmasPicker}
            placeholder={language.TIME_DEPOSIT__SELECT_ACCOUNT_PLACEHOLDER}
            labelKey='display'
            itemList={generateAccountLabel(savingAccounts)}
            onValChange={changeTdPeriodList(tdPeriodList)}
          />
          <View style={styles.row}>
            <Text style={styles.availableBalanceText}>{language.TIME_DEPOSIT__AVAILABLE_BALANCE}: {currencySymbol(currency)} {currency === 'IDR' ? currencyFormatter(availableBalance) : formatForexAmount(availableBalance, currency)}</Text>
            <View style={styles.note}>
              <Text style={styles.formHeaderSubtext}>
                {tdMsg}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.formContainer}>
            <Field
              name='amount'
              label={language.TIME_DEPOSIT__AMOUNT}
              placeholder={language.HINTTEXT__DEPOSIT_AMOUNT}
              format={formatFieldAmount}
              normalize={normalizeAmount}
              component={SinarmasInput}
              keyboardType='numeric'
              disabled={isDisabled}
            />
            <Text style={styles.formHeaderSubtext}>{language.TIME_DEPOSIT__AMOUNT_MIN}{currencySymbol(currency)} {currency === 'IDR' ? currencyFormatter(generateMin) : formatForexAmount(generateMin, currency)}</Text>
          </View>
          <View>
            { isShariaAccount ?   
              <View style={styles.row}>
                <Text style={styles.formHeaderWithSpace}>{language.TIME_DEPOSIT__SELECT_PERIODE}</Text>
                <Field
                  name='periodeList'
                  rightIcon='arrow'
                  component={SinarmasPicker}
                  placeholder={language.TIME_DEPOSIT__PERIOD_PLACEHOLDER} // remove first label
                  labelKey='display'
                  itemList={isDisabled ?  [] : generatePeriodLabelSharia(tdPeriodList, tenorRate, tenorRateSyariah, tenorNisbahBank, tenorNisbahCust, isShariaAccount, currency, newRateSha)}
                />
              </View>
              : 
              <View style={styles.row}>
                <Text style={styles.formHeaderWithSpace}>{language.TIME_DEPOSIT__SELECT_PERIODE}</Text>
                <Field
                  name='periodeList'
                  rightIcon='arrow'
                  component={SinarmasPicker}
                  placeholder={language.TIME_DEPOSIT__PERIOD_PLACEHOLDER} // remove first label
                  labelKey='display'
                  itemList={isDisabled ?  [] : generatePeriodLabel(tdPeriodList, tenorRate, tenorRateSyariah, tenorNisbahBank, tenorNisbahCust, isShariaAccount, currency, newRate)}
                />
              </View>}

          </View>
        
          <View style={styles.row}>
            <Text style={styles.formHeaderWithSpace}>{language.TIME_DEPOSIT__SELECT_TYPE}</Text>
            <Field name='maturityType'
              component={RadioButton}
              options={isDisabled ? [] : tdTypeOptions}
            />
          </View>
        </View>
        <View style={styles.buttonNext}>
          <SinarmasButton disabled={invalid || submitting} onPress={handleSubmit} text={language.GENERIC__CONTINUE}/>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default TdForm;
