import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasIconInput, SinarmasButton, DatePicker, SinarmasPicker} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './CreditCard.styles';
import {noop, result} from 'lodash';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';

export const fields = {
  WORK_STATUS: 'workStatus',
  START_WORK: 'startWork',
  START_BUSINESS: 'startBusiness'
};

class CreditCardForm8 extends Component {

  render () {
    const {selectInput, disabled, savingStatement1, savingStatement2, savingStatement3,
      workStatusList, work, latestPayslip, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const maxDate = new Date();
    const workType = result(work, 'filter', '');

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.spaceContainer}>        
          <View style={styles.progressBar}>
            <View style={[{flex: 8}, styles.redBar]}/>
            <View style={[{flex: 2}, styles.greyBar]}/>
          </View>
          <View style={styles.mainTitle}>
            {workType === 'Entrepreneur' ?
              <Text style={styles.mainTitleText}>{language.CREDITCARD_TITLE8}</Text>
              : workType === 'Employed' ?
                <Text style={styles.mainTitleText}>{language.CREDITCARD_TITLE8_BUSINESS}</Text>
                :
                null}
          </View>
          {workType === 'Others' || workType === 'Entrepreneur' ?
            <View>
              <View style={styles.FieldsContainerWrapper}>
                <Field
                  name={fields.START_BUSINESS}
                  component={DatePicker}
                  label={language.CREDITCARD__START_BUSINESS}
                  placeholder={language.CREDITCARD__START_BUSINESS}
                  maximumDate={maxDate}
                  minimumDate={'01/01/1900'}
                  date={maxDate}     
                />
              </View>
              <View style={styles.greyLine}/>
            </View> : null
          }

          {workType === 'Employed' ?
            <View style={styles.FieldsContainerWrapper}>
              <Field
                name={fields.WORK_STATUS}
                labelKey='name'
                itemList={workStatusList}
                component={SinarmasPicker}
                style={styles.fieldContainer}
                placeholder={language.CREDITCARD__WORK_STATUS}
                typeField={'workStatus'}
              />
              <Field
                name={fields.START_WORK}
                component={DatePicker}
                label={language.CREDITCARD__START_WORK}
                placeholder={language.HINT__START_WORK}
                maximumDate={maxDate}
                minimumDate={'01/01/1900'}
                date={maxDate}    
              />
              <Touchable onPress={selectInput('latestPayslip')}>
                <SinarmasIconInput
                  component={SinarmasIconInput}
                  theme='primary'
                  style={styles.fieldContainer}
                  label={language.CREDITCARD__LATEST_PAYSLIP}
                  placeholder={language.CREDITCARD__LATEST_PAYSLIP}
                  disabled={true}
                  value={latestPayslip}
                />
                <View style={styles.cameraIconStyle}><SimasIcon name='camera' size={20}/></View>
              </Touchable>
            </View>
            : null}

          {workType === 'Others' || workType === 'Entrepreneur' ?
            <View style={styles.FieldsContainerWrapper}>
              <Text style={styles.mainTitleText}>{language.CREDITCARD__SAVING_STATEMENT_TITLE}</Text>
              <Touchable onPress={selectInput('savingStatement1')}>
                <SinarmasIconInput
                  component={SinarmasIconInput}
                  theme='primary'
                  style={styles.fieldContainer}
                  label={language.CREDITCARD__SAVING_STATEMENT_1}
                  placeholder={language.CREDITCARD__SAVING_STATEMENT_1}
                  disabled={true}
                  value={savingStatement1}
                />
                <View style={styles.cameraIconStyle}><SimasIcon name='camera' size={20}/></View>
              </Touchable>
              <Touchable onPress={selectInput('savingStatement2')}>
                <SinarmasIconInput
                  component={SinarmasIconInput}
                  theme='primary'
                  style={styles.fieldContainer}
                  label={language.CREDITCARD__SAVING_STATEMENT_2}
                  placeholder={language.CREDITCARD__SAVING_STATEMENT_2}
                  disabled={true}
                  value={savingStatement2}
                />
                <View style={styles.cameraIconStyle}><SimasIcon name='camera' size={20}/></View>
              </Touchable>
              <Touchable onPress={selectInput('savingStatement3')}>
                <SinarmasIconInput
                  component={SinarmasIconInput}
                  theme='primary'
                  style={styles.fieldContainer}
                  label={language.CREDITCARD__SAVING_STATEMENT_3}
                  placeholder={language.CREDITCARD__SAVING_STATEMENT_3}
                  disabled={true}
                  value={savingStatement3}
                />
                <View style={styles.cameraIconStyle}><SimasIcon name='camera' size={20}/></View>
              </Touchable>
            </View> : null
          }

        </View>
        <View style={styles.buttonWrapper}>
          {workType === 'Others' || workType === 'Entrepreneur' ?
            <View style={styles.boxedInfo}>
              <SimasIcon style={styles.iconColor} name='caution-circle' size={20}/>
              <View><Text style={styles.info}>{language.CREDITCARD__SAVING_STATEMENT_FOOTER}</Text></View> 
            </View>
            : null
          }
          
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting || disabled} >
            <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }

}

CreditCardForm8.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onSubmitPress: PropTypes.func,
  validationInput: PropTypes.func,
  selectInput: PropTypes.func,
  disabled: PropTypes.bool,
  savingStatement1: PropTypes.string,
  savingStatement2: PropTypes.string,
  savingStatement3: PropTypes.string,
  workStatusList: PropTypes.array,
  work: PropTypes.object,
  selectPayslip: PropTypes.func,
  latestPayslip: PropTypes.string,
};

export default CreditCardForm8;
