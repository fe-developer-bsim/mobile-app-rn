import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton, RadioButton, SinarmasInput} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './SILeSPAJForm5.styles';
import {wrapMethodInFunction, isEmptyOrNull} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {result, forEach, map, noop, isEmpty, remove, filter} from 'lodash';
import CheckBox from 'react-native-checkbox';
import RedCheckBox from '../../assets/images/checkbox-checked.png';
import UnCheckBox from '../../assets/images/checkbox-unchecked.png';
import Touchable from '../Touchable.component';

export const fields = {
  ANSWERS: 'answers',
  EXPLAIN: 'explain'
};

export default class RegisterFormAtm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    isForgetPassword: PropTypes.bool,
    goToRegisterNTB: PropTypes.func,
    validationInput: PropTypes.func,
    goToAtmRegis: PropTypes.func,
    changeCheckboxArray: PropTypes.func,
    checkboxArray: PropTypes.array,
    formHealth: PropTypes.object,
    healthQuestions: PropTypes.array,
    answers1: PropTypes.object
  };
  state = {
    valueSubmit: false
  }

  onModalSubmit = () => {
    this.setState({valueSubmit: true}, () => {
      // set time out because of this bug
      // https://github.com/facebook/react-native/issues/10471
      const {handleSubmit = noop} = this.props;
      wrapMethodInFunction(handleSubmit());
      setTimeout(() => {
        this.setState({valueSubmit: false});
      }, 7000);
    });
  };
  setChangingCheck = (item) => () => {
    const {checkboxArray = [], changeCheckboxArray = {}, answers1} = this.props;
    if (answers1.questionarePpFlag === 1 || isEmptyOrNull(answers1)) {
      const found = filter(checkboxArray, function (o) {
        return o.value === item.value;
      });
      const checked = !!isEmpty(found);
      item['checked'] = checked;
      if (checked === true) {
        const newArray = [...checkboxArray, item];
        if (isEmpty(found)) {
          changeCheckboxArray(newArray);
        } else {
          changeCheckboxArray(checkboxArray);
        }
      } else if (checked === false) {
        if (isEmpty(found)) {
          changeCheckboxArray(checkboxArray);
        } else {
          if (checkboxArray.length === 1) {
            changeCheckboxArray([]);
          } else {
            remove(checkboxArray, (o) => o.value === item.value);
            changeCheckboxArray(checkboxArray);
          }
    
        }
      }
    }
  }

  changingRadio = () => {

  }
  doNothingCheckbox = () => () => {

  }

  render () {
    const {healthQuestions, formHealth, answers1, checkboxArray, ...reduxFormProps} = this.props;
    const {invalid, submitting} = reduxFormProps;
    const checkedBoxButton = !!(result(answers1, 'value', 0) === 1 && isEmpty(checkboxArray));
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithTerms} extraHeight={120}>
        <View style={styles.progressBar}>
          <View style={[{flex: 8}, styles.redBar]}/>
          <View style={[{flex: 2}, styles.greyBar]}/>
        </View>
        <View style={styles.upperContainer}>
          <View>
            <Text style={styles.emoneyTitle}>{language.SIL__DATA_KESEHATAN_HEADER}</Text>
          </View>
          {
            map(healthQuestions, (item, i) => {
              let optionsRemake = result(item, 'listAnswers', []);
              const questionareId = result(item, 'questionareId', '');
              forEach(optionsRemake, (object) => {
                const value = result(object, 'questionarePpFlag', '');
                object['questionareId'] = questionareId;
                object['label'] = result(object, 'label', '');
                object['value'] = value;
              });
              let checkboxchoice = result(item, 'listChoice', []);
              forEach(checkboxchoice, (object) => {
                const label = result(object, 'label', '');
                const value = result(object, 'questionareTtg', '');
                object['label'] = label;
                object['value'] = value;
                object['checked'] = false;
                object['questionareId'] = questionareId;
              });

              return (
                <View index ={i} style={styles.viewContainer}>
                  <View>
                    {item.label2 !== undefined ?
                      (
                        <View>
                          <Text>
                            <Text>{i + 1}. {result(item, 'label2[0].string', '')}</Text>
                            {!isEmpty(result(item, 'label2[0].icon', '')) ?
                              <SimasIcon name={result(item, 'label2[0].icon', '')}/> :
                              null
                            }
                            <Text>{result(item, 'label2[0].string2', '')}</Text>
                          </Text>
                        </View>
                      )
                      : <Text>{i + 1}. {result(item, 'label', '')}</Text>
                    }
                  </View>
                  <View>
                    {
                      map(checkboxchoice, (choice) => (
                        <Touchable onPress={noop} disabled={true}>
                          <CheckBox
                            onChange={this.setChangingCheck(choice) }
                            uncheckedImage={UnCheckBox}
                            checkedImage={RedCheckBox}
                            label={result(choice, 'label', '')}
                            checkboxStyle={styles.checkboxStyle}
                            labelStyle={styles.checkboxLabel}
                            checked={isEmpty(answers1) || answers1.value === 1 ? null : false}
                            value={!choice.checked} // somehow checked value is reversed
                          />
                        </Touchable>
                      )
                      )
                    }
                    <Field
                      name = {`${fields.ANSWERS}` + `${i}`}
                      component={RadioButton}
                      options={optionsRemake}
                      onChange={this.changingRadio}
                    />
                    {
                      result(item, 'questionareId', 3) !== 3 && result(formHealth, `answers${i}.questionarePpFlag`, 0) === 1 ?
                        <View>
                          <Field
                            name={`${fields.EXPLAIN}` + `${i}`}
                            component={SinarmasInput}
                            isMultiline={true}
                            label={language.SIL__INPUT_EXPLANATION}
                            placeholder={language.SIL__INPUT_EXPLANATION}
                          />
                        </View> : <View/>
                    }
                  </View>
                </View>
              );
            })
          }

        </View>
        <View>
          <View style={styles.buttonOtpSubmit}>
            <SinarmasButton style={styles.buttonRegister} onPress={this.onModalSubmit} disabled={invalid || submitting || this.state.valueSubmit || checkedBoxButton}>
              <Text style={styles.buttonLargeTextStyle}>{language.GENERIC__CONTINUE}</Text>
            </SinarmasButton>
          </View>
        </View>

      </KeyboardAwareScrollView>
    );
  }
}