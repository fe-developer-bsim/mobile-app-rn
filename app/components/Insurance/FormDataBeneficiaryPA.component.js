import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import styles from './FormDataBeneficiaryPA.styles';
import {language} from '../../config/language';
import result from 'lodash/result';
import {SinarmasInput, SinarmasPicker, SinarmasButton} from '../FormComponents';
import {formatFieldName, normalizeDate, wrapMethodInFunction, getDropDownList} from '../../utils/transformer.util';
import {Field} from 'redux-form';
import noop from 'lodash/noop';
import Touchable from '../Touchable.component';
import RedBoxCheck from '../../assets/images/checkbox-checked.png';
import UnCheckBox from '../../assets/images/checkbox-unchecked.png';
import CheckBox from 'react-native-checkbox';


export const fields = {
  BENEF_NAME: 'benef_name',
  BENEF_DOB: 'benef_dob',
  BENEF_SEX: 'benef_sex',
  BENEF_RELATION: 'benef_relation',
};

class InsurancePAForm extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    navParams: PropTypes.object,
    sumbitFormDataPA: PropTypes.func,
    handleSubmit: PropTypes.func,
    accounts: PropTypes.array,
    editPremi: PropTypes.func,
    editFormData: PropTypes.func,
    goOnPage: PropTypes.func,
    setFormVal: PropTypes.func,
  }
  state = {
    checked: false,
  }

  checkboxChange = () => {
    if (this.state.checked) {
      this.setState({checked: false});
    }  else {
      this.setState({checked: true});
    }
  }

  onCheckButton = () => {
    if (this.state.checked) {
      return false;
    }  else {
      return true;
    }
  }
  render () {
    const {navParams, editPremi, editFormData, goOnPage, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const BeneficiaryDataRelation = result(navParams, 'BeneficiaryDataRelation', []);
    const BeneficiaryDataSex = result(navParams, 'BeneficiaryDataSex', []);
    const premi = result(navParams, 'premium', '');
    const name = result(navParams, 'cust_name', '');
    return (
      <ScrollView>
        <View style={styles.barStep}>
          <View style={styles.partOne}/>
          <View style={styles.partTwo}/>
        </View>
        <View style={styles.content}>
          <View style={styles.contentContainerEdit}>
            <View style={styles.row}>
              <View style={styles.contentContainer}>
                <Text style={styles.editPart}>{language.INSURANCE_PA} </Text>
                <Text style={styles.editPart}>{language.INSURANCE_PA_CONFIRMATION_TYPE_PREMI}{premi} </Text>
              </View>
              <Touchable onPress={editPremi}>
                <Text style={styles.editButton}>{language.GENERIC__EDIT}</Text>
              </Touchable>
            </View>
          </View>
        </View>
        <Text style={styles.EditBar}/>
        <View style={styles.content}>
          <View style={styles.contentContainerEdit}>
            <View style={styles.row}>
              <View style={styles.contentContainer}>
                <Text style={styles.editPart}>{language.INSURANCE_PA_CONFIRMATION_PARTICIPANTS} </Text>
                <Text style={styles.editPart}>{name} </Text>
              </View>
              <Touchable onPress={editFormData}>
                <Text style={styles.editButton}>{language.GENERIC__EDIT}</Text>
              </Touchable>
            </View>
          </View>
        </View>
        <Text style={styles.partEditBar}/>
        <View style={styles.content}>
          <View style={styles.contentContainer}>
            <Text style={styles.pageTitle}>{language.INSURANCE_PA_BENEF_DETAIL}</Text>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
              <Field
                name={fields.BENEF_NAME}
                label={language.INSURANCE_PA_BENEF_NAME}
                placeholder={language.INSURANCE_PA_BENEF_NAME_PH}
                component={SinarmasInput}
                format={formatFieldName}
                normalize={formatFieldName}
              />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
              <Field
                name={fields.BENEF_DOB}
                label={language.INSURANCE_PA_BENEF_DOB}
                placeholder={language.INSURANCE_PA_DOB}
                component={SinarmasInput}
                normalize={normalizeDate}
                keyboardType='numeric'
                maxLength={10}
              />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
              <Text style={styles.subTitle}>{language.INSURANCE_PA_BENEF_RELATION}</Text>
              <Field
                name={fields.BENEF_RELATION}
                rightIcon='arrow'
                component={SinarmasPicker}
                placeholder={language.INSURANCE_PA_BENEF_RELATION}
                labelKey='display'
                itemList={getDropDownList(BeneficiaryDataRelation)}
              />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
              <Text style={styles.subTitle}>{language.INSURANCE_PA_BENEF_SEX}</Text>
              <Field
                name={fields.BENEF_SEX}
                rightIcon='arrow'
                component={SinarmasPicker}
                placeholder={language.INSURANCE_PA_BENEF_SEX}
                labelKey='display'
                itemList={getDropDownList(BeneficiaryDataSex)}
              />
            </View>
          </View>
        </View>
        <View style={styles.EditBar}/>
        <View style={styles.content}>
          <View style={styles.contentContainerEdit}>
            <View style={styles.contentContainer}>
              <Text style={styles.pageTitle}>{language.INSURANCE_PA_TC_TITLE} </Text>
              <Text style={styles.pageSubtitle}>{language.INSURANCE_PA_TC_DETAIL}</Text>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.rowCheckbox}>
                <View>
                  <CheckBox onChange={this.checkboxChange} uncheckedImage={UnCheckBox} checkedImage={RedBoxCheck} label={''} checkboxStyle={styles.checkboxStyle} labelStyle={styles.checkboxLabel}/>
                </View>
                <View>
                  <Text style={styles.checkboxPadding}> {language.INSURANCE_PA_TC_DETAIL2}<Text style={styles.textUnderline} onPress={goOnPage}>{language.INSURANCE_PA_TC_DETAIL3}</Text></Text>
                </View>
              </View>
            </View>
          </View>
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting || this.onCheckButton()} >
            <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>




      </ScrollView>
    );
  }
}

export default InsurancePAForm;
