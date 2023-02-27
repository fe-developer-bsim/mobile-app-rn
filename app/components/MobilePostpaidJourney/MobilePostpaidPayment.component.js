import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';
import {View, Text, ScrollView} from 'react-native';
import Card from '../Card/Card.component';
import {SinarmasButton, SinarmasPicker} from '../FormComponents';
import {light, textLightGreyStyle, fontSizeSmallStyle, fontSizeNormalStyle, fontSizeMediumStyle, buttonLargeTextStyle, bold, cardVerticalSpacingStyle} from '../../styles/common.styles';
import styles from './MobilePostpaidPayment.styles';
import {currencyFormatter, getUnformattedAccountAmount, formatBillDetails, wrapMethodInFunction, generateAccountLabel, balanceFormatter} from '../../utils/transformer.util';
import {language} from '../../config/language';
import noop from 'lodash/noop';
import map from 'lodash/map';

export const ListItem = ({name, accountNumber}) => (
  <View style={styles.container}>
    <Text style={[styles.text, fontSizeMediumStyle]}>{accountNumber}</Text>
    <Text style={[styles.text, fontSizeSmallStyle, bold]}>{name}</Text>
  </View>
);

ListItem.propTypes = {
  name: PropTypes.string,
  accountNumber: PropTypes.string
};

export default class MobilePostpaidPayment extends React.Component {

  render () {
    const {invalid = false, accounts = [], handleSubmit = noop, billDetails = {}, selectedAccount, placeholder = language.MOBILE_POSTPAID__SELECT_ACCOUNT_PLACEHOLDER} = this.props;
    const selectedAccountBalance = getUnformattedAccountAmount(selectedAccount);
    const bills = formatBillDetails(billDetails.displayList);
    return (
      <ScrollView keyboardShouldPersistTaps='handled'  style={[styles.horizontalSpacing, styles.tabBarMargin, styles.background]}>
        <Text style={[bold, fontSizeMediumStyle]}>{language.SERVICE__SELECT_ACCOUNT}</Text>
        <View style={[cardVerticalSpacingStyle, styles.verticalSpacing]}>
          <Text style={[fontSizeNormalStyle, styles.labelSpacing]}>{language.SERVICE__PAY_FROM}</Text>
          <Field
            name='accountNumber'
            component={SinarmasPicker}
            rightIcon={accounts.length > 0 ? 'arrow' : null}
            itemList={generateAccountLabel(accounts)}
            label='Account'
            placeholder={placeholder}
            labelKey='display' />
          <View style={styles.labelSpacing} />
          <Text style={[fontSizeNormalStyle, light, textLightGreyStyle]}>{language.SERVICE__AVAILABLE_BALANCE} : Rp {balanceFormatter(selectedAccountBalance)}</Text>
        </View>
        <Text style={[fontSizeNormalStyle, cardVerticalSpacingStyle]}>{language.SERVICE__PAYMENT_AMOUNT}</Text>
        <Card>
          <View style={styles.row}>
            <View style={styles.halfWidth}><Text style={[light, fontSizeNormalStyle]}>{language.MOBILE_POSTPAID__TOTAL_AMOUNT}</Text></View>
            <View style={styles.halfWidth}><Text style={[bold, styles.rightAlign, fontSizeMediumStyle]}>Rp {currencyFormatter(billDetails.billAmount)}</Text></View>
          </View>
        </Card>

        <Card style={styles.cardStyle}>
          <Text style={[bold, fontSizeSmallStyle, styles.billDetails]}>{language.SERVICE__BILL_DETAILS}</Text>

          {map(bills, (value, k) => (
            <View key={k} style={styles.row}>
              <View style={styles.halfWidth}><Text style={[textLightGreyStyle]}>{k}</Text></View>
              <View style={styles.halfWidth}><Text style={[bold, styles.rightAlign]}>{value}</Text></View>
            </View>)
          )
          }
        </Card>
        <View style={[styles.verticalSpacing]}>
          <SinarmasButton disabled={invalid} onPress={wrapMethodInFunction(handleSubmit)}>
            <Text style={buttonLargeTextStyle}>{language.SERVICE__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </ScrollView>
    );
  }
}

MobilePostpaidPayment.propTypes = {
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  selectedAccount: PropTypes.object,
  accounts: PropTypes.array,
  billDetails: PropTypes.object,
  placeholder: PropTypes.string
};
