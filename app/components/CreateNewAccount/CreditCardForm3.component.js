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
import {wrapMethodInFunction, normalizeAmount, formatFieldAmount} from '../../utils/transformer.util';

export const fields = {
  WORK: 'work',
  MONTHLY_INCOME: 'monthlyIncome',
  SOURCE_OF_FUND: 'sourceOfFund',
  NUMBER_OF_DEPENDANT: 'numberOfDependant2'
};

class CreditCardForm3 extends Component {

  render () {
    const {validationInput, listWorker, minusQuantity, addQuantity, numberOfDependant2, 
      listSourceOfFund, clearForm8, isValidKyc, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.spaceContainer}>
          <View style={styles.progressBar}>
            <View style={[{flex: 3}, styles.redBar]}/>
            <View style={[{flex: 7}, styles.greyBar]}/>
          </View>
          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>{language.CREDITCARD_TITLE3}</Text>
          </View>

          <View style={styles.FieldsContainerWrapper}>
            <Field
              component={SinarmasPicker}
              style={styles.fieldContainer}
              placeholder={language.HINT__WORK}
              labelKey='name'
              itemList={listWorker}
              validationInput={validationInput}
              name={fields.WORK}
              onSelectPress={clearForm8}
            />
            <Field
              name={fields.MONTHLY_INCOME}
              component={SinarmasIconInput}
              theme='primary'
              style={styles.fieldContainer}
              label={language.CREDITCARD__MONTHLY_INCOME}
              placeholder={language.HINT__MONTHLY_INCOME}
              isUseSuccessInputText={true}
              keyboardType='numeric'
              typeField={'monthlyIncome'}
              format={formatFieldAmount}
              normalize={normalizeAmount}
              validationInput={validationInput}
            />
            <Field
              component={SinarmasPicker}
              style={styles.fieldContainer}
              placeholder={language.CREDITCARD__SOURCE_OF_FUND}
              labelKey='name'
              itemList={listSourceOfFund}
              validationInput={validationInput}
              name={fields.SOURCE_OF_FUND}
            />
            {isValidKyc ?
              <View style={styles.dependantContainer}>
                <Text style={styles.quantity}>{language.CREDITCARD__NUMBER_OF_DEPENDANT}</Text>
                <View style={styles.amountContainer}>
                  <View style={styles.borderedContainer}>
                    <Touchable onPress={minusQuantity}>
                      <View style={styles.rightBorder}>
                        <Text style={numberOfDependant2 > 0 ? styles.largeText : styles.largeTextDisabled}>-</Text>
                      </View>
                    </Touchable>
                    <View style={styles.rightBorder}>
                      <Text style={styles.timesText}>{numberOfDependant2}</Text>
                    </View>
                    <Touchable onPress={addQuantity}>
                      <View style={styles.center}>
                        <Text style={numberOfDependant2 < 0 ? styles.largeText : styles.largeTextDisabled}>+</Text>
                      </View>
                    </Touchable>
                  </View>
                </View>
              </View> : null
            }
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

CreditCardForm3.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onSubmitPress: PropTypes.func,
  validationInput: PropTypes.func,
  listWorker: PropTypes.array,
  listSourceOfFund: PropTypes.array,
  minusQuantity: PropTypes.func,
  addQuantity: PropTypes.func,
  numberOfDependant2: PropTypes.number,
  clearForm8: PropTypes.func,
  isValidKyc: PropTypes.bool
};

export default CreditCardForm3;
