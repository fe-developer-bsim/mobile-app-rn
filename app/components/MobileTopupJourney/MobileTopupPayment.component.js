import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './MobileTopupPayment.style';
import noop from 'lodash/noop';
import result from 'lodash/result';
import {currencyFormatter, generateAccountLabel, getUnformattedAccountAmount, prepareTopups, balanceFormatter} from '../../utils/transformer.util';
import {SinarmasButton, SinarmasPicker} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const TopupListItem = ({id}) => (<View style={styles.topupItemContainer}><Text style={styles.amount}>Rp {currencyFormatter(id)}</Text></View>);
TopupListItem.propTypes = {id: PropTypes.string};

class MobileTopupPayment extends Component {
  static propTypes = {
    biller: PropTypes.object,
    accountList: PropTypes.array,
    onNextPress: PropTypes.func,
    invalid: PropTypes.bool,
    formValues: PropTypes.object,
    submitting: PropTypes.bool
  }
  sendBiller = () => {
    const {biller, onNextPress = noop} = this.props;
    onNextPress(biller);
  }
  render () {
    const {accountList = [], biller, invalid, submitting, formValues} = this.props;
    const availableBalance = getUnformattedAccountAmount(formValues['myAccount']);
    const topups = prepareTopups(result(biller, 'denomList', []));
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraHeight={120}>
        <Text style={styles.title}>{language.MOBILE_TOPUP__MAKE_PAYMENT}</Text>
        <Text style={styles.formHeaderSubtext}>{language.MOBILE_TOPUP__SUBTITLE} {formValues.mobileNo}</Text>

        <View style={styles.formContainer}>
          <Text style={styles.formHeader}>{language.SERVICE__PAY_FROM}</Text>

          <Field name='myAccount'
            component={SinarmasPicker}
            autocomplete={false}
            itemList={generateAccountLabel(accountList)}
            label='Account'
            placeholder={language.MOBILE_TOPUP__SELECT_ACCOUNT_PLACEHOLDER}
            labelKey='display'/>
          <Text style={styles.availableBalance}>{language.ELECTRICITY__AVAILABLE_BALANCE} : Rp {balanceFormatter(availableBalance)}</Text>
          <Text style={styles.formHeader}>{language.ELECTRICITY__TOPUP_AMOUNT}</Text>

          <Field name='topupAmount'
            component={SinarmasPicker}
            autocomplete={false}
            rightIcon={result(biller, 'denomList.length', 0) > 0 ? 'arrow' : null}
            itemList={topups}
            placeholder={language.MOBILE_TOPUP__SELECT_TOPUP_AMOUNT}
            labelKey='display'/>
        </View>

        <SinarmasButton onPress={this.sendBiller} disabled={invalid || submitting} text={language.SERVICE__NEXT_BUTTON} />
      </KeyboardAwareScrollView>
    );
  }
}

export default MobileTopupPayment;
