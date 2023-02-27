import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';
import {Text, View} from 'react-native';
import {fontSizeNormalStyle, fontSizeSmallStyle, cardVerticalSpacingStyle, bold, contentContainerStyle, fontSizeMediumStyle} from '../../styles/common.styles';
import {SinarmasPicker, SinarmasInput, SinarmasButton} from '../FormComponents';
import {stringify, wrapMethodInFunction} from '../../utils/transformer.util';
import styles from './ElectricityIndex.style';
import RecentPaymentCard from '../RecentPaymentCard/RecentPaymentCard.component';
import Carousel from '../Carousel/Carousel.component';
import noop from 'lodash/noop';
import result from 'lodash/result';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class ElectricityIndex extends Component {
  static propTypes = {
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    handleCardClick: PropTypes.func,
    billers: PropTypes.array,
    recentTransactions: PropTypes.array
  }
  render () {
    const {invalid, handleSubmit = noop, submitting, billers = [], recentTransactions = [], handleCardClick = noop} = this.props;

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' style={contentContainerStyle} extraHeight={120}>
        {recentTransactions.length > 0 ?
          (<View>
            <Text style={[bold, fontSizeMediumStyle]}>{language.ELECTRICITY__RECENT_PAYMENTS}</Text>
            <Carousel>
              {recentTransactions.map((transaction, i) => (
                <RecentPaymentCard key={i} onPress={handleCardClick(transaction)} {...transaction}
                  consumerNo={transaction.meterNo} billAmount={result(transaction, 'billDetails.billAmount', '0')}/>
              ))}
            </Carousel>
          </View>
          ) : null
        }
        <View style={cardVerticalSpacingStyle}>
          <Text style={[bold, fontSizeNormalStyle]}>{language.ELECTRICITY__BILL_TITLE}</Text>
          <Text style={[bold, fontSizeSmallStyle, styles.subtext]}>{language.ELECTRICITY__BILL_TITLE_DESCRIPTION}</Text>
          <View style={styles.labelSpacing} />
          <Text style={[bold, fontSizeNormalStyle]}>{language.ELECTRICITY__BILLING_TYPE}</Text>
          <Field
            name='selectedBiller'
            rightIcon='arrow'
            placeholder={language.ELECTRICITY__SELECT_BILL_TYPE}
            component={SinarmasPicker}
            itemList={billers}
            labelKey='name' />
          <View style={styles.labelSpacing} />
          <Field
            name='meterNo'
            label={language.ELECTRICITY__METER_NUMBER}
            placeholder='Ex: 100800020068'
            normalize={stringify}
            component={SinarmasInput}
            style={styles.meter}
            keyboardType='numeric'
          />
        </View>
        <View style={styles.labelSpacing} />
        <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting} text={language.SERVICE__NEXT_BUTTON} />
      </KeyboardAwareScrollView>
    );
  }
}

export default ElectricityIndex;
