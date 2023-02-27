import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import styles from './ConfirmationPA.styles';
import {language} from '../../config/language';
import result from 'lodash/result';
import {SinarmasButton} from '../FormComponents';

class InsurancePA extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    navParams: PropTypes.object,
    confirmDataPA: PropTypes.func,
    handleSubmit: PropTypes.func,
    isDisabled: PropTypes.bool,
    triggerAuth: PropTypes.func,
    invalid: PropTypes.bool,
    confirmPA: PropTypes.func,
  }

  render () {
    const {navParams, confirmDataPA, ...reduxFormProps} = this.props;

    const {invalid = false} = reduxFormProps;
    return (
      <ScrollView>
        <View style={styles.barStep}>
          <View style={styles.partOne}/>
          <View style={styles.partTwo}/>
        </View>
        <View style={styles.content}>
          <View style={styles.contentContainerTitle}>
            <Text style={styles.pageTitleXL}>{language.INSURANCE_PA_CONFIRMATION}</Text>
            <Text style={styles.pageTitleXL}>{language.INSURANCE_PA_CONFIRMATION2}</Text>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.confirmTitle}>{language.INSURANCE_PA_CONFIRMATION_INSURANCE}</Text>
            <Text style={styles.confirmSubtitle}>{language.INSURANCE_PA}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.confirmTitle}>{language.INSURANCE_PA_CONFIRMATION_TYPE}</Text>
            <Text style={styles.confirmSubtitle}>{language.INSURANCE_PA_CONFIRMATION_TYPE_PREMI + result(navParams, 'premium', '')}</Text>
          </View>
        </View>
        <View style={styles.rowGrey}/>
        <View style={styles.content}>
          <View style={styles.contentContainerTitle}>
            <Text style={styles.pageTitleXL}>{language.INSURANCE_PA_CONFIRMATION_PARTICIPANTS}</Text>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.confirmTitle}>{language.INSURANCE_PA_NAME}</Text>
            <Text style={styles.confirmSubtitle}>{result(navParams, 'cust_name', '')}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.confirmTitle}>{language.INSURANCE_PA_IDENTITY_NUMBER}</Text>
            <Text style={styles.confirmSubtitle}>{result(navParams, 'cust_identity_number', '')}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.confirmTitle}>{language.INSURANCE_PA_BIRTH}</Text>
            <Text style={styles.confirmSubtitle}>{ result(navParams, 'cust_dob', '')}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.confirmTitle}>{language.INSURANCE_PA_GENDER}</Text>
            <Text style={styles.confirmSubtitle}>{result(navParams, 'cust_sex_dis', '')}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.confirmTitle}>{language.INSURANCE_PA_PHONE}</Text>
            <Text style={styles.confirmSubtitle}>{result(navParams, 'cust_phone', '')}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.confirmTitle}>{language.INSURANCE_PA_MOBILE_PHONE}</Text>
            <Text style={styles.confirmSubtitle}>{result(navParams, 'cust_mobile', '')}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.confirmTitle}>{language.INSURANCE_PA_EMAIL}</Text>
            <Text style={styles.confirmSubtitle}>{result(navParams, 'cust_email', '')}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.confirmTitle}>{language.INSURANCE_PA_ADDRESS}</Text>
            <Text style={styles.confirmSubtitle}>{result(navParams, 'cust_address', '')}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.confirmTitle}>{language.INSURANCE_PA_CITY}</Text>
            <Text style={styles.confirmSubtitle}>{result(navParams, 'cust_city', '')}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.confirmTitle}>{language.INSURANCE_PA_POSTAL_CODE}</Text>
            <Text style={styles.confirmSubtitle}>{result(navParams, 'cust_postal_code', '')}</Text>
          </View>
        </View>
        <View style={styles.rowGrey}/>
        <View style={styles.content}>
          <View style={styles.contentContainerTitle}>
            <Text style={styles.pageTitleXL}>{language.INSURANCE_PA_CONFIRMATION_BENEFICIARY}</Text>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.confirmTitle}>{language.INSURANCE_PA_BENEF_NAME}</Text>
            <Text style={styles.confirmSubtitle}>{result(navParams, 'benef_name', '')}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.confirmTitle}>{language.INSURANCE_PA_BENEF_DOB}</Text>
            <Text style={styles.confirmSubtitle}>{result(navParams, 'benef_dob', '')}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.confirmTitle}>{language.INSURANCE_PA_BENEF_SEX}</Text>
            <Text style={styles.confirmSubtitle}>{result(navParams, 'benef_sex_dis', '')}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.confirmTitle}>{language.INSURANCE_PA_BENEF_RELATION}</Text>
            <Text style={styles.confirmSubtitle}>{result(navParams, 'benef_relation_dis', '')}</Text>
          </View>
          <View style={styles.containtextExplanation}>
            <Text style={styles.textExplanation}>{language.CONFIRMATION_PAGE__EXPLANATION}</Text>
          </View>
          <SinarmasButton onPress={confirmDataPA} disabled={invalid} >
            <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>

      </ScrollView>
    );
  }
}

export default InsurancePA;
