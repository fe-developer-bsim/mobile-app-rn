import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {SinarmasIconInput, SinarmasButton} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './PaydayLoanIndex.styles';
import noop from 'lodash/noop';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import Touchable from '../Touchable.component';
import * as Utils from '../../utils/transformer.util';

export const fields = {
  AMOUNT_PAYLOAN: 'amountPayloan',
};


class PaydayLoanForm extends Component {

  render () {
    const {setAmountOne, amountValid, setAmountTwo, setAmountThree, setAmountFour, partFour, partOne, partThree, partTwo, validationInput, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    return (
      <ScrollView  contentContainerStyle={styles.columnContainer} extraHeight={120}>
        <View style={styles.bottomWrapper}>
          <View>
            <Text style={styles.mainTitleText}>{language.PAYDAY_LOAN__TITLE}</Text>
          </View>
          <View>
            <Field
              name={fields.AMOUNT_PAYLOAN}
              component={SinarmasIconInput}
              theme='primary'
              maxLength={12}
              format={Utils.formatFieldAmount}
              normalize={Utils.normalizeAmount}
              style={styles.fieldContainer}
              label={language.PAYDAY_LOAN__AMOUNT_FIELD}
              isUseSuccessInputText={true}
              typeField={'amountPayloan'}
              validationInput={validationInput}
            />
          </View>

          <View style={styles.containerAmount}>
            <View style={styles.selectedAmount}>
              {amountValid < 1000000 ? null : partOne < 500000 ?
                <Touchable style={styles.borderAmount} onPress={setAmountOne}>
                  <Text style={styles.textAmount}>Rp {Utils.formatFieldAmount(500000)}</Text>
                </Touchable>
                :
                <Touchable style={styles.borderAmount} onPress={setAmountOne}>
                  <Text style={styles.textAmount}>Rp {Utils.formatFieldAmount(partOne)}</Text>
                </Touchable>
              }
              <View style={styles.sparateBorder}/>
              <Touchable style={styles.borderAmount} onPress={setAmountThree}>
                <Text style={styles.textAmount}>Rp {Utils.formatFieldAmount(partThree)}</Text>
              </Touchable>
            </View>
            <View style={styles.selectedAmount}>
              {amountValid < 1000000 ? 
                null :
                <Touchable style={styles.borderAmount} onPress={setAmountTwo}>
                  <Text style={styles.textAmount}>Rp {Utils.formatFieldAmount(partTwo)}</Text>
                </Touchable>
              }
              <View style={styles.sparateBorder}/>
              <Touchable style={styles.borderAmount} onPress={setAmountFour}>
                <Text style={styles.textAmount}>Rp {Utils.formatFieldAmount(partFour)}</Text>
              </Touchable>
            </View>
          </View>
        </View>
        <View style={styles.bottomPadding}>
          <View style={styles.bottomWrapper}>
            <View style={styles.buttonNext}>
              <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting} >
                <Text style={styles.buttonLargeTextStyle}>{language.SMARTFREN__CONTINUE_BUTTON}</Text>
              </SinarmasButton>
            </View>
          </View>
        </View>

      </ScrollView>
    );
  }

}

PaydayLoanForm.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onLoginPress: PropTypes.func,
  validationInput: PropTypes.func,
  setAmountOne: PropTypes.func,
  setAmountTwo: PropTypes.func,
  setAmountThree: PropTypes.func,
  setAmountFour: PropTypes.func,
  partOne: PropTypes.string,
  partTwo: PropTypes.string,
  partThree: PropTypes.string,
  partFour: PropTypes.string,
  configPostal: PropTypes.object,
  amountValid: PropTypes.string
};

export default PaydayLoanForm;
