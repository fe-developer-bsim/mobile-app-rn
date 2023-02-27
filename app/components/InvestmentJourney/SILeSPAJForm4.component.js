import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasIconInput, SinarmasButton, RadioButton, SinarmasPicker, SinarmasInput} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from '../../components/InvestmentJourney/SILeSPAJForm4.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import result from 'lodash/result';
import {getDataForSIlPolis} from '../../utils/middleware.util';
import {normalizeDate} from '../../utils/transformer.util';


export const fields = {
  FULLNAME: 'fullName',
  BIRTHDATE: 'birthdate',
  GENDER: 'gender',
  POLIS_RELATION: 'polisRelation',
  BENEFIT: 'benefit'
};

class SmartInvestaLinkForm4 extends Component {

  
  render () {
    const {validationInput, maritalStatus, gender, relationBeneficiary, genderOther, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit, dropList} = reduxFormProps;
    const jenisKelamin = getDataForSIlPolis(result(dropList, 'jenisKelamin', []));
    const polisRelation = getDataForSIlPolis(result(dropList, 'hubunganTertanggung', []));
    const genderWoman = result(jenisKelamin, '[0]', '');
    const genderMan = result(jenisKelamin, '[1]', '');
    const husbandWife = result(polisRelation, '[2]', '');
    const filteredItems = maritalStatus === 'married' || maritalStatus === 'menikah' ? polisRelation : polisRelation.filter((item) => item !== husbandWife);
    const filteredGender = maritalStatus === 'married' && relationBeneficiary === 'husband wife' && gender === 'man' || maritalStatus === 'menikah' && relationBeneficiary === 'suami istri' && gender === 'pria' ? jenisKelamin.filter((item) => item !== genderMan) : jenisKelamin ?
      maritalStatus === 'married' && relationBeneficiary === 'husband wife'  && gender === 'woman' || maritalStatus === 'menikah' && relationBeneficiary === 'suami istri' && gender === 'wanita' ? jenisKelamin.filter((item) => item !== genderWoman) : jenisKelamin : jenisKelamin;
    const disabledGender = relationBeneficiary === 'husband wife' && genderOther === 'woman' && gender === 'woman' || relationBeneficiary === 'suami istri' && genderOther === 'wanita' && gender === 'wanita' ? true : 
      !!(relationBeneficiary === 'husband wife' && genderOther === 'man' && gender === 'man' ||   relationBeneficiary === 'suami istri' && genderOther === 'pria' && gender === 'pria');
   
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithNoTerms} extraHeight={120}>
        <View style={styles.spaceContainer}>
          <View style={styles.SilTitleHeaderView}>
            <Text style={styles.SilTitleHeader}>{language.SMART__INVESTA_LINK_DETAIL_HEADER2}</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[{flex: 7}, styles.redBar]}/>
            <View style={[{flex: 3}, styles.greyBar]}/>
          </View>
          <View style={styles.upperContainer}>
            <View>
              <Text style={styles.mainTitleTextForm4}>{language.SMART__INVESMENT_LINK_DETAIL12}</Text>
            </View>
            <View style={styles.loginFieldsContainer}>
              <Field
                name={fields.FULLNAME}
                component={SinarmasIconInput}
                theme='primary'
                label={language.EMONEY__FULLNAME_FIELD}
                placeholder={language.HINTTEXT__NAME}
                isUseSuccessInputText={true}
                typeField={'fullName'}
                validationInput={validationInput}
              />
            </View>
          
            <View style={styles.loginFieldsContainerCal}>
              <Field
                name={fields.BIRTHDATE}
                label={language.EMONEY__BIRTHDATE}
                placeholder={language.HINTTEXT__BIRTHDATE}
                normalize={normalizeDate}
                component={SinarmasInput}
                keyboardType='numeric'
                maxLength={10}
              />
            </View>
            <View style={styles.loginFieldsContainerCal}>
              <Field
                name={fields.POLIS_RELATION}
                component={SinarmasPicker}
                theme='primary'
                style={styles.fieldContainer}
                labelKey='label'
                placeholder={language.SIL__POLIS_RELATION}
                itemList={filteredItems}
                typeField={'polisRelation'}
              />
            </View>
            { relationBeneficiary === '' ? 
              null :
              <View style={styles.fieldsContainerWrapper}>
                <Text style={styles.formHeaderWithSpace}>{language.SMART__INVESMENT_LINK_DETAIL05}</Text>
                <Field name={fields.GENDER}
                  component={RadioButton}
                  options={filteredGender}
                  renderItem={true}/>
              </View>
            }
            <View style={styles.fieldsContainerWrapperBenefit}>
              <Text style={styles.formHeaderWithSpace}>{language.SIL__BENEFIT}</Text>
              <Text style={styles.formHeaderWithSpace}>{language.SIL__BENEFIT_PERCENTAGE}</Text>
            
            </View>
          </View>
          <View style={styles.buttonWrapper}>
            <SinarmasButton onPress={(handleSubmit)} disabled={invalid || submitting || disabledGender}>
              <Text style={styles.buttonLargeTextStyle}>{language.GENERIC__CONTINUE}</Text>
            </SinarmasButton>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

SmartInvestaLinkForm4.propTypes = {
  handleSubmit: PropTypes.func,
  validationInput: PropTypes.func,
  gender: PropTypes.array,
  maritalStatus: PropTypes.string,
  relationBeneficiary: PropTypes.string,
  genderOther: PropTypes.string
};
export default SmartInvestaLinkForm4;
