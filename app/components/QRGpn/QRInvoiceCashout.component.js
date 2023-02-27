import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './QRInvoiceCashout.styles';
import {SinarmasButton, RadioButton} from '../FormComponents';
import noop from 'lodash/noop';
import {language} from '../../config/language';
import {result, isEmpty} from 'lodash';
import {Field} from 'redux-form';
import {toTitleCase} from '../../utils/transformer.util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import SinarmasInputBoxRevamp from '../FormComponents/SinarmasInputBox/SinarmasInputBoxRevamp.component';
import * as Utils from '../../utils/transformer.util';
import {getSourceAccountRadioButton} from '../../utils/middleware.util';

class QRInvoiceCashout extends React.Component {
  static propTypes = {
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    navParams: PropTypes.object,
    inputTipDisabled: PropTypes.bool,
    submitting: PropTypes.bool,
    thisState: PropTypes.object,
    defaultAccount: PropTypes.object,
    isLogin: PropTypes.bool,
    moreInfoBL: PropTypes.func,
    accountsTransfer: PropTypes.array,
  }

  state = {
    inquiryData: {}
  }

  render () {
    const {navParams, formValues, submitting, accounts, ...reduxFormProps} = this.props;
    const accountName = result(navParams, 'data.59', '');
    const accountNumber = result(navParams, 'data.40.02', '');
    const {handleSubmit = noop, invalid = false} = reduxFormProps;
    const emptyAcc = isEmpty(result(formValues, 'sourceAcc', {}));
    const accountList = getSourceAccountRadioButton(accounts);
    const amount = result(navParams, 'data.54', '');
    const disableAmount = amount !== '0';
    const disableTemp = true;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.center}>
          <View style={styles.backgroundColor1} />
          <View style={styles.containerTransfer}>
            <View style={styles.containerBanner}>
              <View style={styles.containerLeft}>
                <View style={styles.targetAcc}>
                  <View style={styles.iconAcc}>
                    <SimasIcon name='new-send' style={styles.testIcon} size={27}/>
                  </View>
                  <View style={styles.textAcc}>
                    <Text style={styles.targetName}>{toTitleCase(accountName)}</Text>
                    <Text>{accountNumber}</Text>
                  </View>
                </View>
                <View style={styles.accNumberContainer}>
                  <View style={styles.accNumber}>
                    <View style={styles.iconRp}>
                      <SimasIcon name={'amount'} size={50} style={styles.headerIcon}/>
                    </View>
                    <View style={styles.amountRight}>
                      <Text>Amount</Text>
                      <Field
                        name='amountVal'
                        placeholder={language.HINTTEXT__TRANSFER_AMOUNT_PLACEHOLDER}
                        format={Utils.formatFieldAmount}
                        normalize={Utils.normalizeAmount}
                        disabled={disableAmount}
                        component={SinarmasInputBoxRevamp}
                        keyboardType='phone-pad'
                        isInputAmount={true}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.sourceAccTitle}>
                <Text style={styles.sourceAccText}>{language.AUTODEBIT__LIST_ACCOUNT}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.containerLeftSourceAcc}>
          <ScrollView>
            <Field name='sourceAcc' component={RadioButton} options={accountList} isSourceAccount={true}/>
          </ScrollView>
        </View>

        <View style={styles.bottomSpacing}>
          <SinarmasButton onPress={handleSubmit} disabled={invalid || submitting || emptyAcc || disableTemp} >
            <Text style={styles.buttonLargeTextStyle}>{language.BUTTON__START}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>

    );
  }
}


export default QRInvoiceCashout;
