import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';
import {Text, View} from 'react-native';
import {fontSizeNormalStyle, cardVerticalSpacingStyle, fontSizeLargeStyle, fontSizeSmallStyle, bold} from '../../styles/common.styles';
import {SinarmasInput, SinarmasButton, SinarmasPickerLine} from '../FormComponents';
import {wrapMethodInFunction, generateLanguageGenericBillerPlaceHolder, formatFieldAccount, monthList, generateLanguageGenericBiller} from '../../utils/transformer.util';
import styles from './BillerTypeTenIndex.style';
import noop from 'lodash/noop';
import result from 'lodash/result';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import isEmpty from 'lodash/isEmpty';
import Touchable from '../Touchable.component';

class BillerTypeTenIndex extends Component {
  static propTypes = {
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    handleCardClick: PropTypes.func,
    billers: PropTypes.array,
    recentTransactions: PropTypes.array,
    navigation: PropTypes.object,
    formDataBillerTen: PropTypes.object,
    pickAreaName: PropTypes.func
  }

  render () {
    const {invalid, handleSubmit = noop, submitting, navigation = {}, formDataBillerTen, pickAreaName} = this.props;
    const biller = result(navigation, 'state.params.biller', {});
    const areaList = result(biller, 'areaList', []);
    const subscriberNoText = language[generateLanguageGenericBillerPlaceHolder(result(biller, 'billerPreferences.paymentSubscriberNoKey', ''))];
    const subscriberNoTitle = language[generateLanguageGenericBiller(result(biller, 'billerPreferences.paymentSubscriberNoKey', ''))];
    const custId = result(navigation, 'state.params.values.subscriberNo', '');
    const areaNameText = result(formDataBillerTen, 'values.areaCode.label', '');
    const checkExistArea = isEmpty(result(formDataBillerTen, 'values.areaCode', {}));
    const billPeriod = result(biller, 'billPeriod', []);
    const isPbb = result(biller, 'name', '') === 'PBB';
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraHeight={120}>
        <View style={cardVerticalSpacingStyle}>
          <View style={styles.row}>
            <View>
              <SimasIcon name={'purchase'} size={30} style={[styles.purchase, styles.mr10]}/>            
            </View>
            <View>
              <Text style={[fontSizeLargeStyle, {fontFamily: 'Roboto'}]}>{language.GENERIC_BILLER__PAY}</Text>
              <Text style={[fontSizeSmallStyle, {fontFamily: 'Roboto'}]}>{result(biller, 'name', '')}</Text>
            </View>
          </View>
          <View style={styles.labelSpacing} />
          <Field
            name='subscriberNo'
            label={subscriberNoTitle}
            placeholder={subscriberNoText}
            format={formatFieldAccount}
            normalize={formatFieldAccount}
            component={SinarmasInput}
            style={styles.meter}
            keyboardType='numeric'
            disabled={true}
            value={custId}
          />

          <View style={styles.labelSpacing} />
          {
            result(biller, 'billerPreferences.isOpenMonth') === '1' ?
              <View>
                <Text style={[bold, fontSizeNormalStyle]}>{language.GENERIC_BILLER__MONTH_LABEL}</Text>
                <Field
                  name='month'
                  rightIcon='arrow'
                  component={SinarmasPickerLine}
                  placeholder={language.GENERIC_BILLER__MONTH_LABEL_PLACEHOLDER}
                  labelKey='label'
                  itemList={monthList} />
              </View> :
              <View>
                <Touchable onPress={pickAreaName(areaList)}>
                  <View>
                    {
                      checkExistArea ?
                        <View style={styles.areaContainer}>
                          <Text style={[styles.roboto, styles.black]}>{language.GENERIC_BILLER__AREA_LABEL_PLACEHOLDER}</Text>
                          <SimasIcon name='arrow' style={styles.arrowDownStyle} />
                        </View>
                        :
                        <View style={styles.areaContainer}>
                          <Text style={[styles.roboto, styles.black]}>{areaNameText}</Text>
                          <SimasIcon name='arrow' style={styles.arrowDownStyle} />
                        </View>
                    }
                  </View>
                </Touchable>
                <View style={styles.greyLineLeft} />
              </View>
          }
          <View>
            {
              isPbb ?
                <View style={styles.periodPbb}>
                  <View>
                    <View>
                      <Text style={[styles.roboto, styles.black]}>{language.GENERIC_BILLER__BILL_PERIOD}</Text>
                    </View>
                    <Field
                      name='billPeriod'
                      rightIcon='arrow'
                      placeholder={language.GENERIC_BILLER__BILL_PERIOD}
                      component={SinarmasPickerLine}
                      itemList={billPeriod}
                      labelKey='label'
                      arrowPickerStyle={{marginTop: 15}}
                    />
                  </View>
                  <View style={styles.labelSpacing} />
                </View>
                : null
            }
          </View>
        </View>
        <View style={styles.labelSpacing} />
        <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting} text={language.SERVICE__NEXT_BUTTON} />
      </KeyboardAwareScrollView>
    );
  }
}

export default BillerTypeTenIndex;
