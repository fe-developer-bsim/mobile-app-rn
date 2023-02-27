import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton, SinarmasPicker} from '../FormComponents';
import styles from './SILeSPAJForm1.styles';
import {result} from 'lodash';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import noop from 'lodash/noop';
import {Field} from 'redux-form';
import {getDataForSIlPolis} from '../../utils/middleware.util';
import moment from 'moment';

export const fields = {
  MARITALSTATUS: 'maritalStatus',
  RELIGION: 'agama',
  NATIONALITY: 'warganegara',
  EDUCATION: 'pendidikan'
};

class SmartInvestaLinkPolisDetailComponent extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    listProductIdr: PropTypes.array,
    listProductUsd: PropTypes.array,
    listProductDetailIdr: PropTypes.array,
    listProductDetailUsd: PropTypes.array,
    formMyInformation: PropTypes.object,
    amountValue: PropTypes.number,
    validationInput: PropTypes.func,
    smartInvestasiLinkPolis: PropTypes.object,
    dropList: PropTypes.array,
    gender: PropTypes.string,
    nationality: PropTypes.array,
    mothersMaiden: PropTypes.string,
    nikKtp: PropTypes.string,
    birthPlace: PropTypes.string,
    fullName: PropTypes.string,
    birthdate: PropTypes.string,
  }

  state = {
    valueSubmit: false,
  }
  render () {
    const {dropList, validationInput, gender, nationality, mothersMaiden, nikKtp, birthPlace, fullName, birthdate, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const religion = getDataForSIlPolis(result(dropList, 'agama', []));
    const maritalStatus = getDataForSIlPolis(result(dropList, 'statusPernikahan', []));
    const education = getDataForSIlPolis(result(dropList, 'pendidikan', []));
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithTerms} extraHeight={120}>
        <View style={styles.SilTitleHeaderView}>
          <Text style={styles.SilTitleHeader}>{language.SMART__INVESTA_LINK_DETAIL_HEADER2}</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[{flex: 2}, styles.redBar]}/>
          <View style={[{flex: 8}, styles.greyBar]}/>
        </View>
        <View style={styles.upperContainer}>
          <View>
            <Text style={styles.emoneyTitle}>{language.SMART__INVESMENT_LINK_DETAIL03}</Text>
          </View>
          <View style={styles.typeLabel}>
            <Text style={styles.textHeaderSpace}>{language.GENERIC__FORM_FULLNAME}</Text>
            <Text style={styles.textLabel}>{fullName}</Text>
          </View><View style={styles.typeLabel}>
            <Text style={styles.textHeaderSpace}>{language.GENERIC__BIRTH_DATE}</Text>
            <Text style={styles.textLabel}>{moment(birthdate).format('DD/MM/YYYY')}</Text>
          </View>
          <View style={styles.typeLabel}>
            <Text style={styles.textHeaderSpace}>{language.GENERIC__SEX_TYPE}</Text>
            <Text style={styles.textLabel}>{gender}</Text>
          </View>
          <View style={styles.typeLabel}>
            <Text style={styles.textHeaderSpace}>{language.GENERIC__FORM_MOTHER_MAIDEN}</Text>
            <Text style={styles.textLabel}>{mothersMaiden}</Text>
          </View>
          <View style={styles.typeLabel}>
            <Text style={styles.textHeaderSpace}>{language.SIL_NUMBER_KTP}</Text>
            <Text style={styles.textLabel}>{nikKtp}</Text>
          </View>
          <View style={styles.typeLabel}>
            <Text style={styles.textHeaderSpace}>{language.GENERIC__FORM_BIRTH_PLACE}</Text>
            <Text style={styles.textLabel}>{birthPlace}</Text>
          </View>
          <View>
            <Text style={styles.pageTitle}>{language.SIL__CHOOSE_STATUS}</Text>
          </View>
          <View style={styles.loginFieldsContainerCel}>
            <Field
              name={fields.MARITALSTATUS}
              component={SinarmasPicker}
              placeholder={language.SIL__CHOOSE_STATUS}
              itemList={maritalStatus}
              labelKey='label'
              typeField={'maritalStatus'}
              validationInput={validationInput}
            />
          </View>
          <View>
            <Text style={styles.pageTitle}>{language.SIL__CHOOSE_RELIGION}</Text>
          </View>
          <View style={styles.loginFieldsContainerCel}>
            <Field
              name={fields.RELIGION}
              component={SinarmasPicker}
              placeholder={language.SIL__CHOOSE_RELIGION}
              itemList={religion}
              labelKey='label'
              typeField={'religion'}
              validationInput={validationInput}
            />
          </View>
          <View>
            <Text style={styles.pageTitle}>{language.SIL__CHOOSE_NATIONALITY}</Text>
          </View>
          <View style={styles.loginFieldsContainer}>
            <Field
              name={fields.NATIONALITY}
              component={SinarmasPicker}
              itemList={nationality}
              labelKey='label'
              typeField={'nationality'}
              validationInput={validationInput}
            />
          </View>
          <View>
            <Text style={styles.pageTitle}>{language.SIL__CHOOSE_EDUCATION}</Text>
          </View>
          <View style={styles.loginFieldsContainer}>
            <Field
              name={fields.EDUCATION}
              component={SinarmasPicker}
              placeholder={language.SIL__CHOOSE_EDUCATION}
              itemList={education}
              labelKey='label'
              typeField={'education'}
              validationInput={validationInput}
            />
          </View>
        </View>
        <View>
          <View style={styles.buttonOtpSubmit}>
            <SinarmasButton style={styles.buttonRegister} onPress={handleSubmit} disabled={invalid || submitting || this.state.valueSubmit}>
              <Text style={styles.buttonMainLogin}>{language.GENERIC__CONTINUE}</Text>
            </SinarmasButton>
          </View>
        </View>
    
      </KeyboardAwareScrollView>
    );
  }
}

export default SmartInvestaLinkPolisDetailComponent;