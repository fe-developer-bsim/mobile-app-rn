import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasIconInput, SinarmasButton, SinarmasPicker} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './CreditCard.styles';
import Touchable from '../Touchable.component';
import {noop} from 'lodash';
import {wrapMethodInFunction, normalizeAmount, formatFieldNote, formatFieldAmount} from '../../utils/transformer.util';

export const fields = {
  LAST_EDUCATION: 'lastEducation',
  PURPOSE_OF_OPENING: 'purposeOfOpening',
  NUMBER_OF_DEBIT: 'numberOfDebit',
  DEBIT_PER_MONTH: 'debitPerMonth',
  NUMBER_OF_CREDIT: 'numberOfCredit',
  CREDIT_PER_MONTH: 'creditPerMonth',
  NUMBER_OF_DEPENDANT: 'numberOfDependant'
};

class CreditCardForm5 extends Component {

  render () {
    const {minusQuantity, addQuantity, numberOfDependant, validationInput, educationList,
      purposeList, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.spaceContainer}>
          <View style={styles.progressBar}>
            <View style={[{flex: 5}, styles.redBar]}/>
            <View style={[{flex: 5}, styles.greyBar]}/>
          </View>

          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>{language.CREDITCARD_TITLE5}</Text>
          </View>

          <View style={styles.FieldsContainerWrapper}>
            <Field
              name={fields.LAST_EDUCATION}
              component={SinarmasPicker}
              style={styles.fieldContainer}
              labelKey='name'
              placeholder={language.HINT__LAST_EDUCATION}
              itemList={educationList}
            />
            <Field
              name={fields.PURPOSE_OF_OPENING}
              component={SinarmasPicker}
              style={styles.fieldContainer}
              labelKey='name'
              placeholder={language.CREDITCARD__PURPOSE_OF_OPENING}
              itemList={purposeList}
            />
            <Field
              name={fields.NUMBER_OF_DEBIT}
              component={SinarmasIconInput}
              label={language.CREDITCARD__NUMBER_OF_DEBIT}
              theme='primary'
              style={styles.fieldContainer}
              placeholder={language.HINT__NUMBER_OF_DEBIT}
              isUseSuccessInputText={true}
              typeField={'numberOfDebit'}
              keyboardType='numeric'
              validationInput={validationInput}
              normalize={normalizeAmount}
              format={formatFieldNote}
              maxLength={4}
            />
            <Field
              name={fields.DEBIT_PER_MONTH}
              component={SinarmasIconInput}
              label={language.CREDITCARD__DEBIT_PER_MONTH}
              theme='primary'
              style={styles.fieldContainer}
              placeholder={language.HINT__DEBIT_PER_MONTH}
              isUseSuccessInputText={true}
              typeField={'debitPerMonth'}
              keyboardType='numeric'
              validationInput={validationInput}
              normalize={normalizeAmount}
              format={formatFieldAmount}
            />
            <Field
              name={fields.NUMBER_OF_CREDIT}
              component={SinarmasIconInput}
              label={language.CREDITCARD__NUMBER_OF_CREDIT}
              theme='primary'
              style={styles.fieldContainer}
              placeholder={language.HINT__NUMBER_OF_CREDIT}
              isUseSuccessInputText={true}
              typeField={'numberOfCredit'}
              keyboardType='numeric'
              validationInput={validationInput}
              normalize={normalizeAmount}
              format={formatFieldNote}
              maxLength={4}
            />
            <Field
              name={fields.CREDIT_PER_MONTH}
              component={SinarmasIconInput}
              label={language.CREDITCARD__CREDIT_PER_MONTH}
              theme='primary'
              style={styles.fieldContainer}
              placeholder={language.HINT__CREDIT_PER_MONTH}
              isUseSuccessInputText={true}
              typeField={'creditPerMonth'}
              keyboardType='numeric'
              validationInput={validationInput}
              normalize={normalizeAmount}
              format={formatFieldAmount}
            />
            <View style={styles.dependantContainer}>
              <Text style={styles.quantity}>{language.CREDITCARD__NUMBER_OF_DEPENDANT}</Text>
              <View style={styles.amountContainer}>
                <View style={styles.borderedContainer}>
                  <Touchable onPress={minusQuantity}>
                    <View style={styles.rightBorder}>
                      <Text style={numberOfDependant > 0 ? styles.largeText : styles.largeTextDisabled}>-</Text>
                    </View>
                  </Touchable>
                  <View style={styles.rightBorder}>
                    <Text style={styles.timesText}>{numberOfDependant}</Text>
                  </View>
                  <Touchable onPress={addQuantity}>
                    <View style={styles.center}>
                      <Text style={numberOfDependant < 0 ? styles.largeText : styles.largeTextDisabled}>+</Text>
                    </View>
                  </Touchable>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting} >
            <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }

}

CreditCardForm5.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onSubmitPress: PropTypes.func,
  validationInput: PropTypes.func,
  educationList: PropTypes.array,
  purposeList: PropTypes.array,
  minusQuantity: PropTypes.func,
  addQuantity: PropTypes.func,
  numberOfDependant: PropTypes.number,
};

export default CreditCardForm5;
