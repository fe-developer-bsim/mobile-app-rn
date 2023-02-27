import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasIconInput, SinarmasButton, SinarmasPicker} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './CreditCard.styles';
import CheckBox from 'react-native-checkbox';
import RedCheckBox from '../../assets/images/checkbox-checked.png';
import UnCheckBox from '../../assets/images/checkbox-unchecked.png';
import {noop} from 'lodash';
import Touchable from '../Touchable.component';
import {wrapMethodInFunction, normalizeNumber, formatFieldNote} from '../../utils/transformer.util';

export const fields = {
  NPWP_NUMBER: 'npwpNumber',
  REASON_NO_NPWP: 'reasonNoNPWP',
};

class CreditCardForm7 extends Component {

  render () {
    const {validationInput, toogleCheckbox, checked, disable, listReasonNoNpwp, 
      creditLimit, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.spaceContainer}>
          <View style={styles.progressBar}>
            <View style={[{flex: 7}, styles.redBar]}/>
            <View style={[{flex: 3}, styles.greyBar]}/>
          </View>
          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>{language.CREDITCARD_TITLE7}</Text>
          </View>

          <View style={styles.FieldsContainerWrapper}>

            <Field
              name={fields.NPWP_NUMBER}
              component={SinarmasIconInput}
              theme='primary'
              style={styles.fieldContainer}
              label={language.CREDITCARD__NPWP_NUMBER}
              placeholder={language.HINT__NPWP_NUMBER}
              isUseSuccessInputText={true}
              typeField={'npwpNumber'}
              keyboardType={'numeric'}
              validationInput={validationInput}
              normalize={normalizeNumber}
              format={formatFieldNote}
              maxLength={15}
              disabled={disable}
            />
          </View>

          {creditLimit >= 50000000 ?
            null :
            <View style={styles.mainTitle}>
              <View style={styles.rowFieldAgreement}>
                <Touchable>
                  <View>
                    <CheckBox
                      onChange={toogleCheckbox}
                      uncheckedImage={RedCheckBox}
                      checkedImage={UnCheckBox}
                      label={language.CREDITCARD__DONT_HAVE_NPWP}
                      checkboxStyle={styles.checkboxStyle}
                      labelStyle={styles.checkboxLabel}
                      checked={!checked} // somehow checked value is reversed
                    />
                  </View>
                </Touchable>
              </View>
            </View>
          }

          <View>
            {checked === true ?
              <View style={styles.FieldsContainerWrapper}>
                <Field
                  name={fields.REASON_NO_NPWP}
                  component={SinarmasPicker}
                  style={styles.fieldContainer}
                  placeholder={language.HINT__DONT_HAVE_NPWP}
                  itemList={listReasonNoNpwp}
                  labelKey='name'
                  typeField={'reasonNoNPWP'}
                />
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

CreditCardForm7.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onSubmitPress: PropTypes.func,
  validationInput: PropTypes.func,
  toogleCheckbox: PropTypes.func,
  hidden: PropTypes.bool,
  checked: PropTypes.bool,
  disable: PropTypes.bool,
  listReasonNoNpwp: PropTypes.array,
  creditLimit: PropTypes.number
};

export default CreditCardForm7;
