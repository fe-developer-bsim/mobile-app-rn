import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';
import {View, Text} from 'react-native';
import {SinarmasButton, SinarmasInput, ContactsPicker} from '../FormComponents';
import RecentPaymentCard from '../RecentPaymentCard/RecentPaymentCard.component';
import Carousel from '../Carousel/Carousel.component';
import {normaliseContactPicker, wrapMethodInFunction, formatMobileNumber} from '../../utils/transformer.util';
import {cardVerticalSpacingStyle, fontSizeMediumStyle, bold, contentContainerStyle} from '../../styles/common.styles';
import result from 'lodash/result';
import noop from 'lodash/noop';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class MobilePostpaidView extends React.Component {
  static propTypes = {
    onNext: PropTypes.func,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
    handleCardClick: PropTypes.func,
    submitting: PropTypes.bool,
    recentTransactions: PropTypes.array
  }

  render () {
    const {invalid, submitting, handleSubmit = noop, recentTransactions = [], handleCardClick} = this.props;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' style={contentContainerStyle} extraHeight={120}>
        <View>
          {recentTransactions.length > 0 ?
            (<View>
              <Text style={[bold, fontSizeMediumStyle]}>{language.MOBILE_POSTPAID__RECENT}</Text>
              <Carousel>
                {recentTransactions.map((transaction, i) => (
                  <RecentPaymentCard key={i} onPress={handleCardClick(transaction)} {...transaction}
                    consumerNo={transaction.mobileNo} billAmount={result(transaction, 'billDetails.billAmount', '0')}/>
                ))}
              </Carousel>
            </View>
            ) : null
          }
          <View style={cardVerticalSpacingStyle}>
            <Field
              name='mobileNo'
              label={language.MOBILE_POSTPAID__MOBILE_NUMBER}
              placeholder={language.HINTTEXT__PHONE_NUMBER}
              format={formatMobileNumber}
              component={SinarmasInput}
              keyboardType='numeric'/>
            <Field name='mobileNo' normalize={normaliseContactPicker} component={ContactsPicker}/>
          </View>
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting} text={language.SERVICE__NEXT_BUTTON} />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default MobilePostpaidView;
