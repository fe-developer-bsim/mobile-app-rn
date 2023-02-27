import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {SinarmasButton, RadioButtonOpenAccount} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './CreditCard.styles';
import noop from 'lodash/noop';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';

class CreditCardDelivery extends Component {

  render () {
    const {radioOptions, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    return (
      <ScrollView keyboardShouldPersistTaps='handled' bounces={false} contentContainerStyle={styles.container} extraHeight={120}>
        <View>
          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>{language.CREDITCARD__DELIVER_TITLE}</Text>
          </View>

          <View style={styles.FieldsContainerWrapper}>
            <Field name='deliveryMode'
              component={RadioButtonOpenAccount}
              options={radioOptions}/>
          </View>
        </View>
        <View>
          <View style={styles.containtextExplanation}>
            <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon}/>
            <View style={styles.containExplantionRight}><Text style={styles.textExplanation}>{language.ADDRESS_PAGE__EXPLANATION}</Text></View>
          </View>
          <View style={styles.bottomWrapper}>
            <View style={styles.buttonNext}>
              <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting} >
                <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
              </SinarmasButton>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

}

CreditCardDelivery.propTypes = {
  handleSubmit: PropTypes.func,
  radioOptions: PropTypes.array,
};

export default CreditCardDelivery;
