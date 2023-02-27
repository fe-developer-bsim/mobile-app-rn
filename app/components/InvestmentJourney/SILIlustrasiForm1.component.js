import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasIconInput, SinarmasButton} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './SILIlustrasiForm1.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';

export const fields = {
  EMAIL: 'email',
};

class SmartInvestaLinkInfoComponent extends Component {

  render () {
    const {validationInput, gender, email, fullName, phone, birthdate, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit} = reduxFormProps;

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithTerms} extraHeight={120}>
        <View style={styles.SilTitleHeaderView}>
          <Text style={styles.SilTitleHeader}>{language.SMART__INVESTA_LINK_DETAIL_HEADER1}</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[{flex: 5}, styles.redBar]}/>
          <View style={[{flex: 5}, styles.greyBar]}/>
        </View>
        <View style={styles.upperContainer}>
          <View>
            <Text style={styles.myInformation}>{language.SMART__INVESMENT_LINK_DETAIL01}</Text>
          </View>
          <View>
            <View style={styles.loginFieldsContainer}>
              <Field
                name={fields.EMAIL}
                component={SinarmasIconInput}
                theme='primary'
                label={language.IDENTITYSECONDFORM__EMAIL_TITLE}
                placeholder={language.HINTTEXT__EMAIL}
                isUseSuccessInputText={true}
                typeField={'email'}
                disabled={!(email === '' || email === null)}
                validationInput={validationInput}
              />
            </View>
            <View style={styles.typeLabel}>
              <Text style={styles.textHeaderSpace}>{language.SMART__INVESMENT_LINK_DETAIL02}</Text>
              <Text style={styles.textLabel}>{phone}</Text>
            </View>
            <View>
              <Text style={styles.holderData}>{language.SMART__INVESMENT_LINK_DETAIL03}</Text>
            </View>
            <View style={styles.typeLabel}>
              <Text style={styles.textHeaderSpace}>{language.EMONEY__FULLNAME_FIELD}</Text>
              <Text style={styles.textLabel}>{fullName}</Text>
            </View>
            <View style={styles.typeLabel}>
              <Text style={styles.textHeaderSpace}>{language.EMONEY__BIRTHDATE}</Text>
              <Text style={styles.textLabel}>{moment(birthdate).format('DD/MM/YYYY')}</Text>
            </View>
            <View style={styles.typeLabel}>
              <Text style={styles.textHeaderSpace}>{language.SMART__INVESMENT_LINK_DETAIL05}</Text>
              <Text style={styles.textLabel}>{gender}</Text>
            </View>
          </View>

        </View>
        <View style={styles.buttonWrapper}>
          <SinarmasButton style={styles.buttonRegister} onPress={handleSubmit} disabled={invalid || submitting}>
            <Text style={styles.nextButton}>{language.GENERIC__CONTINUE}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

SmartInvestaLinkInfoComponent.propTypes = {
  handleSubmit: PropTypes.func,
  validationInput: PropTypes.func,
  chooseGender: PropTypes.array,
  gender: PropTypes.string,
  email: PropTypes.string,
  fullName: PropTypes.string,
  phone: PropTypes.string,
  birthdate: PropTypes.string,
};
export default SmartInvestaLinkInfoComponent;