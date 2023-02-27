import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './SellReksadana.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import * as Utils from '../../utils/transformer.util';
import {SinarmasButton} from '../FormComponents';
import {result, isEmpty, noop} from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SinarmasInputBox from '../FormComponents/SinarmasInputBox/SinarmasInputBox.component';
import MoneyBag from '../../assets/images/moneybag.png';
import Collapsible from 'react-native-collapsible';
import Touchable from '../Touchable.component';
import moment from 'moment';

export const fields = {
  AMOUNT: 'amount', 

};

class Casa extends React.Component {
  static propTypes = {
    formValues: PropTypes.object,
    goToConfirmation: PropTypes.func,
    getSourceAcc: PropTypes.func,
    invalid: PropTypes.bool,
    disabled: PropTypes.bool,
    errors: PropTypes.array,
    submitting: PropTypes.bool,
    item: PropTypes.object,
    accountList: PropTypes.array,
    errorMsg: PropTypes.string,
    prefilledUnit: PropTypes.func,
    unitAll: PropTypes.func,
    unitInput: PropTypes.func,
    editableInput: PropTypes.bool,
    prefilledAccount: PropTypes.func,
    redemAll: PropTypes.bool,
    summaryCollapsed: PropTypes.bool,
    summaryCollapse: PropTypes.func

  }

  state = {
    showExpand: false,
    summaryCollapsed: true,
    editableInput: false
  }

  summaryCollapse = () => {
    this.setState({summaryCollapsed: !this.state.summaryCollapsed});
  }

  expand = () => {
    this.setState({showExpand: !this.state.showExpand});
  }

  render () {
    const {formValues, goToConfirmation, errors, invalid, submitting, item, errorMsg, unitAll = noop, unitInput, editableInput, 
      summaryCollapsed, summaryCollapse} = this.props;
    const detailPortfolio = result(item, 'detailPortfolio', {});
    const errorTextLess = result(errors, 'amountLess', '');
    const errorText = result(errors, 'amount', '');
    const isLessAmount = !isEmpty(errorText) || !isEmpty(errorTextLess);
    const showDetailAmt = summaryCollapsed;
    const numberOfUnit = result(detailPortfolio, 'portfolio.0.Customer_Unit_Available', 0);
    const NABDate = moment(result(detailPortfolio, 'portfolio.0.NAB_Date')).format('DD/MM/YYYY');
    const NABPerUnit = result(detailPortfolio, 'portfolio.0.NAB_Per_Unit', 0);
    const fundCurrency = result(detailPortfolio, 'portfolio.0.Fund_Currency', '');

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraScrollHeight={100} enableOnAndroid={true}>
        <View>
          <View style={styles.amountContainer}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>{language.REKSADANA_SELL_TITLE}</Text>
            </View>
            <View style={styles.textInputContainerPadding}>
              <View style={styles.textInputAmount}>
                <Field
                  name={fields.AMOUNT}
                  placeholder={language.HINTTEXT__TRANSFER_AMOUNT_PLACEHOLDER}
                  normalize={Utils.formatFieldDecimal}
                  keyboardType='numeric'
                  component={SinarmasInputBox}
                  textPosition='center'
                  maxLength={15}
                  leftIconImage={MoneyBag}
                  disabled={editableInput}
                />
                <SimasIcon onPress={summaryCollapse} style={showDetailAmt ? styles.arrowDownStyle : styles.arrowUpStyle} name={'arrow'} size={15} />
              </View>
            </View>
            <View style={showDetailAmt ? styles.collapsibleContainerHide : styles.collapsibleContainerShow}>
              <Collapsible collapsed={summaryCollapsed} refName='summary'>
                <Touchable onPress={unitAll(numberOfUnit)}><Text style={styles.textCollapse}>{language.REKSADANA__REDEMPT_ALL}</Text></Touchable>
                <View style={styles.greyLineCollapse} />
                <Touchable onPress={unitInput}><Text style={styles.textCollapse}>{language.REKSADANA__REDEMPT_INPUT}</Text></Touchable>
              </Collapsible>
            </View>
            {errorMsg !== '' ?
              <View style={styles.row}>
                <SimasIcon name='input-error' style={styles.errIcon} />
                <Text style={styles.redText}>{errorMsg}</Text>
              </View>
              : null
            }
            <View style={styles.unitContainer}>
              <View style={styles.unitDetail}>
                <Text style={styles.unitNAB}>NAB {NABDate}</Text>
                <Text style={styles.unitPrice}>1 unit = {NABPerUnit} {fundCurrency}</Text>
              </View>
              <View style={styles.unitDetail}>
                <Text style={styles.unitNAB}>{language.REKSADANA_TOTAL_UNIT}</Text>
                <Text style={styles.unitPrice}>{numberOfUnit} unit</Text>
              </View>
            </View>
            <View style={styles.greyLine} />

          </View>
          <View style={styles.selectAccountContainer}>
            <View style={styles.headerRow}>
              <SimasIcon name={'wallet'} size={30} style={styles.walletIcon} />
              <Text style={styles.title}>{language.REKSADANA__WALLET}</Text>
            </View>
            <View style={styles.sendAccountDetailContainer}>
              <View>
                <Text style={[styles.sendAccNumber, styles.roboto]}>{result(formValues, 'accountNumber', '')}</Text>
                <Text style={[styles.sendAccNameType, styles.roboto]}>{result(formValues, 'name', '')}</Text>
                <Text style={[styles.sendAccNameType, styles.roboto]}>{result(formValues, 'productType', '')}</Text>
              </View>
            </View>
          </View>
          <View style={styles.greyLine} />
        </View>
        <View style={styles.buttonBottom}>
          <SinarmasButton disabled={invalid || submitting || isLessAmount} onPress={goToConfirmation} text={language.SERVICE__NEXT_BUTTON} />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default Casa;
