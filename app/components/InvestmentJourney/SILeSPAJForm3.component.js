import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasIconInput, SinarmasButton, SinarmasPicker} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from '../../components/InvestmentJourney/SILeSPAJForm3.styles';
import {noop} from 'lodash';
import {wrapMethodInFunction, currencyFormatter, generateAccountLabelSil} from '../../utils/transformer.util';
import {getDataForSIlPolis} from '../../utils/middleware.util';
import {result} from 'lodash';

export const fields = {
  JOB_TYPE: 'pekerjaan',
  MONTHLY_INCOME: 'penghasilanKantor',
  SOURCE_OF_FUND: 'myAccount',
  OTHER_JOB: 'pekerjaanLainnya'
};

class SmartInvestaLinkForm3 extends Component {

  render () {
    const {validationInput, dropList, formValues, workValue, accountsTransfer, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const income = getDataForSIlPolis(result(dropList, 'penghasilanKantor', []));
    const jobType = getDataForSIlPolis(result(dropList, 'pekerjaan', []));
    currencyFormatter(result(formValues, 'myAccount.balances.availableBalance', ''));
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.spaceContainer}>
          <View style={styles.SilTitleHeaderView}>
            <Text style={styles.SilTitleHeader}>{language.SMART__INVESTA_LINK_DETAIL_HEADER2}</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[{flex: 4}, styles.redBar]}/>
            <View style={[{flex: 6}, styles.greyBar]}/>
          </View>
          <View>
            <Text style={styles.mainTitleText}>{language.SIL__ESPAJ_TITLE3}</Text>
          </View>

          <View>
            <Text style={styles.fieldContainer}>{language.SIL__ESPAJ_INCOME}</Text>
          </View>

          <View style={styles.FieldsContainerWrapper}>
            <Field
              name={fields.MONTHLY_INCOME}
              component={SinarmasPicker}
              placeholder={language.SIL__ESPAJ_INCOME}
              itemList={income}
              labelKey='label'
              validationInput={validationInput}
            />
            <View>
              <Text style={styles.fieldContainers}>{language.SIL__ESPAJ_JOB_TYPE}</Text>
            </View>
            <View>
              <Field
                name={fields.JOB_TYPE}
                component={SinarmasPicker}
                label={language.SIL__ESPAJ_JOB_TYPE}
                placeholder={language.SIL__ESPAJ_JOB_TYPE}
                itemList={jobType}
                labelKey='label'
                validationInput={validationInput}
              />
              {
                workValue === 'Lainnya' ?
                  <Field
                    name={fields.OTHER_JOB}
                    component={SinarmasIconInput}
                    theme='primary'
                    label={language.SIL__PEKERJAAN_LAIN}
                    placeholder={language.SIL__HINTTEXT_PEKERJAAN_LAIN}
                    isUseSuccessInputText={true}
                    typeField={'streetAddress'}
                    validationInput={validationInput}
                    maxLength={80}
                  />
                  : null
              } 
            </View>
          </View>
          <View style={styles.FieldsContainerWrapper}>
            <Text style={styles.formHeaderWithSpace}>{language.CONFIRMATION_REKENING_PENCAIRAN}</Text>
            <View style={styles.fieldJob}>
              <Field
                name={fields.SOURCE_OF_FUND}
                component={SinarmasPicker}
                theme='primary'
                itemList={generateAccountLabelSil(accountsTransfer)}
                labelKey={'display'}
                style={styles.fieldContainer}
                label={language.SIL__SOURCE_OF_FUND_TEXT_PLACHOLDER}
                placeholder={language.SIL__SOURCE_OF_FUND_TEXT_PLACHOLDER}
                isUseSuccessInputText={true}
                validationInput={validationInput}
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting} >
            <Text style={styles.buttonLargeTextStyle}>{language.GENERIC__CONTINUE}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }

}

SmartInvestaLinkForm3.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onSubmitPress: PropTypes.func,
  validationInput: PropTypes.func,
  isLogin: PropTypes.bool,
  dropList: PropTypes.array,
  formValues: PropTypes.object,
  workValue: PropTypes.object,
  accountList: PropTypes.array,
  accountsTransfer: PropTypes.array,
};

export default SmartInvestaLinkForm3;