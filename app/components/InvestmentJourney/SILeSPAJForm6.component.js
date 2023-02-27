import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton, RadioButton} from '../FormComponents';
import styles from './SILeSPAJForm6.styles';
import {size, result, map, forEach, sum} from 'lodash';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import noop from 'lodash/noop';
import {Field} from 'redux-form';
import RedCheckBox from '../../assets/images/checkbox-checked.png';
import UnCheckBox from '../../assets/images/checkbox-unchecked.png';
import CheckBox from 'react-native-checkbox';
import {wrapMethodInFunction} from '../../utils/transformer.util';

export const fields = {
  ANSWER: 'answer',
};

class SmartInvestaLinkRiskQuestionComponent extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    formValues: PropTypes.object,
    amountValue: PropTypes.number,
    validationInput: PropTypes.func,
    isSilIdrUsd: PropTypes.string,
    getProfileQuestion: PropTypes.array,
    toogleCheckbox: PropTypes.func,
    hidden: PropTypes.bool,
    checked: PropTypes.bool,
    countingAnswer: PropTypes.object,
    profileQuestionResult: PropTypes.array
  }

  state={
    checked: false,
    hidden: false,
  }

  checkBox=(checked) => {
    this.setState({checked, hidden: checked});
  }

  render () {
    const {countingAnswer, getProfileQuestion, profileQuestionResult, formValues, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const countingQuestion = size(getProfileQuestion);
    const countingAnswers = size(countingAnswer);
    const flagCounting = countingAnswers === countingQuestion;
    const itemPoin = map(formValues, 'poin');
    const totalPoin = sum(itemPoin);
    const rangePoin = map(profileQuestionResult, 'rangePoin');
    const investorType = map(profileQuestionResult, 'type', '');
    const deskripsi =  map(profileQuestionResult, 'deskripsi', '');

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithTerms} extraHeight={120}>
        <View style={styles.SilTitleHeaderView}>
          <Text style={styles.SilTitleHeader}>{language.SMART__INVESTA_LINK_DETAIL_HEADER2}</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[{flex: 10}, styles.redBar]}/>
          <View style={[{flex: 0}, styles.greyBar]}/>
        </View>
        <View>
          <Text style={styles.emoneyTitle}>{language.SIL__RISK_QUESTION}</Text>
        </View>
        {
          map(getProfileQuestion, (item, i) => {
            let optionsRemake = (result(item, 'listAnswers', []));
            forEach(optionsRemake, (object) => {
              const value3 = String(result(object, 'questionarePp', ''));
              const questionareId = result(item, 'questionareId', '');
              const poinResult = result(object, 'poin');
              object['questionareId'] = questionareId;
              object['label'] = result(object, 'label', '');
              object['value'] = value3;
              object['poin'] = poinResult;
            });
            return (
              <View index ={i}>
                <View style={styles.invesRadioButton}>
                  <Text>{i + 1}. {result(item, 'label', '')}</Text>
                </View>
                <View style={styles.row}>
                  <Field
                    name = {fields.ANSWER + `${i}`}
                    component={RadioButton}
                    renderItem={false}
                    options={optionsRemake}
                  />
                </View>
              </View>
            );
          })
        }
        <View>
          <View style={styles.progressBar}>
            <View style={[{flex: 10}, styles.greyBar]}/>
          </View>
          <Text style={styles.detailTitle3}>{language.SIL__RESULT_PROFILE1}</Text>
          <Text style={styles.detailTitle}>{language.SIL__RESULT_PROFILE2} </Text>
          {
            totalPoin >= result(rangePoin, '[0]', '').substring(0, 1) && totalPoin <= result(rangePoin, '[0]', '').substring(rangePoin.length + 1, rangePoin.length - 1) ?
              <View>
                <Text style={styles.detailTitle2}>{result(investorType, '[0]', '')} </Text>
              </View> :
              totalPoin >= result(rangePoin, '[1]', '').substring(0, 2) && totalPoin <= result(rangePoin, '[1]', '').substring(rangePoin.length + 2, rangePoin.length) ?
                <View>
                  <Text style={styles.detailTitle2}>{result(investorType, '[1]', '')} </Text>
                </View> :
                totalPoin >= result(rangePoin, '[2]', '').substring(0, 2) && totalPoin <= result(rangePoin, '[2]', '').substring(rangePoin.length + 2, rangePoin.length) ?
                  <View>
                    <Text style={styles.detailTitle2}>{result(investorType, '[2]', '')} </Text>
                  </View> : null
          }
          <Text style={styles.detailTitle}>{language.SIL__RESULT_PROFILE3} </Text>
          {
            totalPoin >= result(rangePoin, '[0]', '').substring(0, 1) && totalPoin <= result(rangePoin, '[0]', '').substring(rangePoin.length + 1, rangePoin.length - 1) ?
              <View>
                <Text style={styles.detailTitle2}>{result(deskripsi, '[0]', '')} </Text>
              </View> :
              totalPoin >= result(rangePoin, '[1]', '').substring(0, 2) && totalPoin <= result(rangePoin, '[1]', '').substring(rangePoin.length + 2, rangePoin.length) ?
                <View>
                  <Text style={styles.detailTitle2}>{result(deskripsi, '[1]', '')} </Text>
                </View> :
                totalPoin >= result(rangePoin, '[2]', '').substring(0, 2) && totalPoin <= result(rangePoin, '[2]', '').substring(rangePoin.length + 2, rangePoin.length) ?
                  <View>
                    <Text style={styles.detailTitle2}>{result(deskripsi, '[2]', '')} </Text>
                  </View> : null
          }

          <View style={styles.progressBar}>
            <View style={[{flex: 10}, styles.greyBar]}/>
          </View>
        </View>

        <View style={styles.rowCheckBox}>
          <View style={styles.containn}>
            <CheckBox
              onChange={this.checkBox}
              uncheckedImage={RedCheckBox}
              checkedImage={UnCheckBox}
              label={null}
              checkboxStyle={styles.checkboxStyle}
              labelStyle={styles.checkboxLabel}
              checked={!this.state.checked} // somehow checked value is reversed
            />
          </View>

          <View style={styles.textCheckBox}>
            <Text>
              {language.SIL__DISCLAMER_POLIS}
            </Text>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <SinarmasButton style={styles.buttonRegister} onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting || !this.state.checked || !flagCounting}>
            <Text style={styles.buttonLargeTextStyle}>{language.TAB_TITLE__SEND}</Text>
          </SinarmasButton>
        </View>

      </KeyboardAwareScrollView>
    );
  }
}

export default SmartInvestaLinkRiskQuestionComponent;