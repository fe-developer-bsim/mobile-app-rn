import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, ScrollView} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {buttonLargeTextStyle} from '../../styles/common.styles';
import Collapsible from 'react-native-collapsible';
import {language} from '../../config/language';
import styles from './TokenForm.component.style';
import {result} from 'lodash';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {currencyFormatter, getDayName} from '../../utils/transformer.util';
import moment from 'moment';


export const fields = {
  formName: 'TokenForm',
  accountNo: 'accountNo',
};

class TokenForm extends React.Component {

  static propTypes = {
    availableBalance: PropTypes.number,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    savingAccounts: PropTypes.array,
    triggerAuth: PropTypes.func,
    isOwnAccount: PropTypes.bool,
    navigation: PropTypes.object,
    disabled: PropTypes.bool,
    errors: PropTypes.string,
    amount: PropTypes.string, 
    emoneyAccount: PropTypes.array,
    kmtr: PropTypes.bool
  }

  state = {
    summaryCollapsed: true,
  }

  summaryCollapse = () => {
    this.setState({summaryCollapsed: !this.state.summaryCollapsed});
  }

  render () {
    const {handleSubmit, navigation} = this.props;
    const navParams = result(navigation, 'state.params.data');
    const totalAmount = result(navParams, 'data.totalAmount', 0);
    const amount = result(navParams, 'data.amount', 0);
    const accNo = result(navParams, 'values.accountNo.accountNumber', '');
    const name = result(navParams, 'values.accountNo.name', '');
    const productType = result(navParams, 'values.accountNo.productType', '');
    const subsNumber = result(navParams, 'data.txId', '');
    const billerName = result(navParams, 'data.merchantName', '');
    const itemName = result(navParams, 'data.itemName', '');
    const showDetailAmt = this.state.summaryCollapsed;
    const currentDate = new Date();
    const showTime = getDayName(currentDate) + ', ' + moment().format('DD MMM YYYY');
    const fee = result(navParams, 'data.transCharge', 0);
    return (
      <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container}>
        <Text style={styles.titleText}>{language.GENERIC_BILLER__CONFIRMATION}</Text>
        <View style={styles.labelSpacing} />
        <View style={styles.box}>
          <View style={styles.rowBetween}>
            <View>
              <SimasIcon name={'amount'} size={30} style={[styles.amount]}/>
            </View>
            <View>
              <Text style={styles.amountText}>{language.CGV__RP} {currencyFormatter(totalAmount)}</Text>
            </View>
            <View>
              <SimasIcon onPress={this.summaryCollapse} name={showDetailAmt ? 'expand-black' : 'colapse-black'} size={20} style={[styles.plus]}/>
            </View>
          </View>
          <View>
            <Collapsible collapsed={this.state.summaryCollapsed} refName='summary'>
              <View style={[styles.greyLine, styles.mt10]} />
              <View style={styles.row}>
                <Text style={styles.robotoLight}>{language.GENERIC_BILLER__AMOUNT_TXT}</Text>
                <Text style={styles.robotoLight}>{language.CGV__RP} {currencyFormatter(amount)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.robotoLight}>{language.GENERIC_BILLER__FEE_TXT}</Text>
                <Text style={styles.robotoLight}>{language.CGV__RP} {currencyFormatter(fee)}</Text>
              </View>
            </Collapsible>
          </View>
        </View>
        <View style={styles.labelSpacing} />
        <View>
          <Text style={styles.dateText}>{showTime}</Text>
        </View>
        <View style={styles.labelSpacing} />
        <View>
          <View style={styles.rowAlign}>
            <View>
              <SimasIcon name={'wallet'} size={30} style={[styles.wallet, styles.mr10]}/>
            </View>
            <View>
              <Text style={[styles.accNo, styles.roboto]}>{accNo}</Text>
              <View>
                <Text style={[styles.product]}>{name}</Text>
                <Text style={[styles.product]}>{productType}</Text>
              </View>
            </View>
          </View>
          <View>
            <SimasIcon name={'more-menu'} size={25} style={[styles.more]}/>
          </View>
          <View style={styles.rowAlign}>
            <View>
              <SimasIcon name={'purchase'} size={30} style={[styles.purchase, styles.mr10]}/>
            </View>
            <View>
              <Text style={[styles.accNo, styles.roboto]}>{billerName}</Text>
              <Text style={[styles.product]}>{subsNumber}</Text>
            </View>
          </View>
          <View style={styles.labelSpacing} />
          <View style={styles.greyLineLast} />
        </View>

      
        <View style={styles.rowDataMerchant}>
          <Text style={styles.value}>{language.QR_TAB_MERCHANT}</Text>
          <Text style={styles.subHeader}>{billerName}</Text>
          <View style={styles.spaceBot}/>
          <Text style={styles.value}>{language.PUSH_BILLING__PAYMENT_NUMBER}</Text>
          <Text style={styles.subHeader}>{subsNumber}</Text>
          <View style={styles.spaceBot}/>
          <Text style={styles.value}>{language.PUSH_BILLING__ITEM_NAME}</Text>
          <Text style={styles.subHeader}>{itemName}</Text>
          <View style={styles.spaceBot}/>
          <Text style={styles.value}>{language.AUTODEBIT__LIST_NOMINAL}</Text>
          <Text style={styles.subHeader}>Rp {currencyFormatter(amount)}</Text>
        </View>
       
        <View style={styles.containtextExplanation}>
          <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon}/>
          <Text style={styles.textExplanation}>{language.CONFIRMATION_PAGE__EXPLANATION}</Text>
        </View>
        <View style={styles.verticalSpacing}>
          
          <SinarmasButton onPress={handleSubmit}>
            <Text style={[buttonLargeTextStyle, styles.roboto]}>{language.GENERIC_BILLER__CONFIRM_PAYMENT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </ScrollView>
    );
  }
}
export default TokenForm;
