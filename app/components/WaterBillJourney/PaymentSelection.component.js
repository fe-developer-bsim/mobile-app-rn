import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {language} from '../../config/language';
import {SinarmasPicker, SinarmasButton} from '../FormComponents';
import {Field} from 'redux-form';
import AccountwBalanceListItem from './AccountwBalanceListItem.component';
import {getUnformattedAccountAmount, balanceFormatter, formatBillDetails, wrapMethodInFunction, generateAccountLabel} from '../../utils/transformer.util';
import {textLightGreyStyle, buttonLargeTextStyle} from '../../styles/common.styles';
import Card from '../Card/Card.component';
import map from 'lodash/map';
import styles from './PaymentSelection.component.styles';
import noop from 'lodash/noop';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const fields = {
  EASY_PIN: 'easypin',
  SMS_OTP: 'smsotp',
  ACCOUNT_NO: 'accountNo'
};

class PaymentSelection extends React.Component {
  static propTypes ={
    handleSubmit: PropTypes.func,
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    billDetails: PropTypes.object,
    invalid: PropTypes.bool
  }

  render () {
    const {accounts, formValues, billDetails = {}, invalid = false, handleSubmit = noop} = this.props;
    const availableBalance = getUnformattedAccountAmount(formValues[fields.ACCOUNT_NO]);
    const bills = formatBillDetails(billDetails.displayList);
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'  style={[styles.horizontalSpacing, styles.tabBarMargin, styles.background]} extraHeight={120}>
        <Text style={styles.titleText}>{language.SERVICE__SELECT_ACCOUNT}</Text>
        <View style={styles.verticalSpacing}>
          <Text style={styles.labelSpacing}>{language.SERVICE__PAY_FROM}</Text>
          <Field
            name={fields.ACCOUNT_NO}
            autocomplete={false}
            rightIcon='arrow'
            component={SinarmasPicker}
            placeholder={language.WATER_BILL__SELECT_ACCOUNT_PLACEHOLDER}
            labelKey='display'
            itemList={generateAccountLabel(accounts)}
            renderComponent={AccountwBalanceListItem} />
          <View style={styles.labelSpacing} />
          <Text style={styles.availableBalance}>{language.SERVICE__AVAILABLE_BALANCE} : Rp {balanceFormatter(availableBalance)}</Text>
        </View>
        <Card style={styles.cardStyle}>
          <Text style={styles.billDetails}>{language.SERVICE__BILL_DETAILS}</Text>

          {map(bills, (value, k) => (
            <View key={k} style={styles.row}>
              <View style={styles.halfWidth}><Text style={textLightGreyStyle}>{k}</Text></View>
              <View style={styles.halfWidth}><Text style={styles.rightAlign}>{value}</Text></View>
            </View>)
          )
          }
        </Card>
        <View style={[styles.verticalSpacing]}>
          <SinarmasButton disabled={invalid} onPress={wrapMethodInFunction(handleSubmit)}>
            <Text style={buttonLargeTextStyle}>{language.SERVICE__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default PaymentSelection;
