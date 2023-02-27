import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {SinarmasButton, RadioButtonOpenAccount} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './CreditCard.styles';
import {noop} from 'lodash';
import {wrapMethodInFunction} from '../../utils/transformer.util';

class CreditCardDelivery extends Component {

  render () {
    const {radioOptions, disabled, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;

    return (
      <ScrollView keyboardShouldPersistTaps='handled' bounces={false} contentContainerStyle={styles.bodyContainerWithNoTerms} extraHeight={120}>
        <View style={styles.spaceContainer}>
          <View style={styles.progressBar}>
            <View style={[{flex: 1}, styles.redBar]}/>
          </View>
          <View>
            <View style={styles.mainTitle}>
              <Text style={styles.mainTitleText}>{language.CREDITCARD__DELIVER_TITLE}</Text>
            </View>

            <View style={styles.FieldsContainerWrapper}>
              <Field name='deliveryMode'
                component={RadioButtonOpenAccount}
                options={radioOptions}
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting || disabled} >
            <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </ScrollView>
    );
  }

}

CreditCardDelivery.propTypes = {
  handleSubmit: PropTypes.func,
  radioOptions: PropTypes.array,
  disabled: PropTypes.bool
};

export default CreditCardDelivery;
