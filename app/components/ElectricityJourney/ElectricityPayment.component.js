import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {language} from '../../config/language';
import {SinarmasButton, SinarmasPicker} from '../FormComponents';
import {Field} from 'redux-form';
import {getUnformattedAccountAmount, currencyFormatter, formatBillDetails, wrapMethodInFunction, generateAccountLabel, balanceFormatter} from '../../utils/transformer.util';
import Card from '../Card/Card.component';
import map from 'lodash/map';
import noop from 'lodash/noop';
import styles from './ElectricityPayment.component.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const fields = {
  ACCOUNT_NO: 'accountNo'
};

class ElectricityPayment extends React.Component {
  static propTypes ={
    handleSubmit: PropTypes.func,
    accounts: PropTypes.array,
    denominations: PropTypes.array,
    formValues: PropTypes.object,
    billDetails: PropTypes.object,
    invalid: PropTypes.bool,
    isPrepaidBiller: PropTypes.bool,
  }

  render () {

    const {accounts, formValues, billDetails = {}, invalid = false, handleSubmit = noop, isPrepaidBiller = false, denominations = []} = this.props;
    const availableBalance = getUnformattedAccountAmount(formValues[fields.ACCOUNT_NO]);
    const bills = formatBillDetails(billDetails.displayList);
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraHeight={120}>
        <Text style={styles.title}>{language.SERVICE__SELECT_ACCOUNT}</Text>
        <View style={styles.verticalSpacing}>
          <Text style={styles.subTitle}>{language.SERVICE__PAY_FROM}</Text>
          <Field
            name='accountNo'
            rightIcon='arrow'
            component={SinarmasPicker}
            placeholder={language.ELECTRICITY__SELECT_ACCOUNT_PLACEHOLDER}
            labelKey='display'
            itemList={generateAccountLabel(accounts)} />
          <Text style={styles.availableBalanceText}>{language.ELECTRICITY__AVAILABLE_BALANCE} : Rp {balanceFormatter(availableBalance)}</Text>
        </View>
        {isPrepaidBiller ?
          <View>
            <View style={styles.verticalSpacing}>
              <Text style={styles.subTitle}>{language.ELECTRICITY__TOPUP_AMOUNT}</Text>
              <Field
                name='denomination'
                rightIcon='arrow'
                component={SinarmasPicker}
                placeholder={language.ELECTRICITY__SELECT_AMOUNT_PLACEHOLDER}
                labelKey='denomLabel'
                itemList={denominations} />
            </View>
            <View style={styles.verticalSpacing}>
              <Text style={styles.availableTokenText}>{language.ELECTRICITY__AVAILABLE_TOKENS}</Text>
              {(billDetails.tokens.length) ? 
                billDetails.tokens.map((token, i) =>
                  <Text key={i} style={styles.denomText}>Token {i + 1} - Rp {token}</Text>) 
                :
                <Text>{language.ELECTRICITY__NO_TOKEN_AVAILABLE}</Text>
              }
            </View>
          </View> :
          <View>
            <Text style={styles.paymentAmountText}>{language.SERVICE__PAYMENT_AMOUNT}</Text>
            <Card>
              <View style={styles.rowContainer}>
                <View style={styles.halfWidth}><Text style={styles.totalAmountText}>{language.ELECTRICITY__TOTAL_AMOUNT}</Text></View>
                <View style={styles.halfWidth}><Text style={styles.billAmountText}>Rp {currencyFormatter(billDetails.billAmount)}</Text></View>
              </View>
            </Card>
            <Card>
              <Text style={styles.billDetailText}>{language.SERVICE__BILL_DETAILS}</Text>
              {map(bills, (value, k) => (
                <View key={k} style={styles.billDetailContainer}>
                  <View style={styles.halfWidth}><Text style={styles.billDetailTitle}>{k}</Text></View>
                  <View style={styles.halfWidth}><Text style={styles.billDetailValue}>{value}</Text></View>
                </View>)
              )
              }
            </Card>
          </View>
        }
        <View style={styles.verticalSpacing}>
          <SinarmasButton disabled={invalid} onPress={wrapMethodInFunction(handleSubmit)}>
            <Text style={styles.nextButton}>{language.SERVICE__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default ElectricityPayment;
