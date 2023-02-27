import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import {SinarmasButton, RadioButton} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './IdentityThirdForm.styles';
import noop from 'lodash/noop';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Touchable from '../Touchable.component';
import redArrow from '../../assets/images/red-arrow-up.png';

export const fields = {
  SAVINGTYPE: 'savingType',
};

const getNTBTypeAccount = [
  {label: language.IDENTITYTHIRDFORM__REGULAR_SAVING, value: 'Reguler'},
  {label: language.IDENTITYTHIRDFORM__TIMEDEPOSIT_SAVING, value: 'Deposito Online'},
];

const getNTBTypeAccountWithSmartfren = [
  {label: language.IDENTITYTHIRDFORM__REGULAR_SAVING, value: 'Reguler'},
  {label: language.IDENTITYTHIRDFORM__TIMEDEPOSIT_SAVING, value: 'Deposito Online'},
  {label: language.IDENTITYTHIRDFORM__SMARTPROMOCARD_SAVING, value: 'Smartfren Promo'}
];


class IdentityThirdForm extends Component {

  render () {
    const {LearnMoreProduct, smartfrenEnable, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const selectAccount = smartfrenEnable === 'yes' ? getNTBTypeAccountWithSmartfren : getNTBTypeAccount;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.columnContainer} extraHeight={120}>
        <View>
          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>{language.IDENTITYTHIRDFORM__TITLE}</Text>
          </View>
          <View style={styles.FieldsContainerWrapper}>
            <Text style={styles.formHeaderWithSpace}>{language.IDENTITYTHIRDFORM__PRODUCT_TYPE}</Text>
            <Field name={fields.SAVINGTYPE}
              component={RadioButton}
              options={selectAccount}/>
          </View>
          <Touchable style={styles.titleLearnMore} onPress={LearnMoreProduct}>
            <Text>{language.IDENTITYTHIRDFORM__LEARN_ABOUT_PRODUCT} </Text>
            <Image source={redArrow} style={styles.redArrow}/>
          </Touchable>
        </View>

        <View style={styles.bottomWrapper}>
          <View style={styles.buttonNext}>
            <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting}>
              <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYTHIRDFORM__SUBMIT}</Text>
            </SinarmasButton>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

IdentityThirdForm.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  LearnMoreProduct: PropTypes.func,
  refreshCaptcha: PropTypes.func,
  simasCaptcha: PropTypes.object,
  smartfrenEnable: PropTypes.string
};

export default IdentityThirdForm;
