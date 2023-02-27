import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {SinarmasButton, SinarmasInputBoxNewRemittance} from '../FormComponents';
import {wrapMethodInFunction, formatFieldNote} from '../../utils/transformer.util';
import {Field} from 'redux-form';
import styles from './RemittanceSenderData.style';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-checkbox';
import RedCheckBox from '../../assets/images/checkbox-checked.png';
import UnCheckBox from '../../assets/images/checkbox-unchecked.png';
import {result, isEmpty} from 'lodash';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';

class RemittanceSenderDataForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    formValues: PropTypes.object,
    accounts: PropTypes.array,
    goBack: PropTypes.func,
    toogleCheckbox: PropTypes.func,
    checked: PropTypes.bool,
  }

  render () {
    const {formValues, goBack, toogleCheckbox, checked, ...reduxFormProps} = this.props;
    const {handleSubmit, submitting} = reduxFormProps;
    const nameSender = isEmpty(result(formValues, 'nameSender', ''));
    const countrySender = isEmpty(result(formValues, 'countrySender', ''));
    const stateSender = isEmpty(result(formValues, 'stateSender', ''));
    const adressSender = isEmpty(result(formValues, 'adressSender', ''));
    const requireField = nameSender || countrySender || stateSender || adressSender;
    return (
      <View style={styles.pinkBg}>
        <View style={styles.shadowWhiteBg}>
          <View style={styles.whiteBg}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraScrollHeight={100} enableOnAndroid={true}>
              <ScrollView keyboardShouldPersistTaps='handled'>
                <View style={styles.containerNew}>
                  <View style={styles.containerArrow}>
                    <Touchable onPress={goBack}>
                      <View style={{padding: 5}}>
                        <SimasIcon name={'arrow'} size={20} style={styles.arrow}/>
                      </View>
                    </Touchable>
                    <View style={styles.progressBar}>
                      <View style={[{flex: 1}, styles.redBar]}/>
                      <View style={[{flex: 1}, styles.greyBar]}/>
                    </View>
                  </View>
                  <Text style={styles.titles}>{language.REMITTANCE__TITLE_SENDER_DATA}</Text>
                  <View style={styles.senderDataContainerName}>
                    <Field
                      name='nameSender'
                      label={language.REMITTANCE__NAME_TEXT}
                      placeholder={language.REMITTANCE__NAME_TEXT}
                      disabled={true}
                      component={SinarmasInputBoxNewRemittance}
                      maxLength={35}
                      format={formatFieldNote}
                      normalize={formatFieldNote}
                      isRemittance={true}
                    />
                  </View>
                  <View style={styles.checkBoxCurrentAddress}>
                    <Touchable>
                      <View>
                        <CheckBox
                          onChange={toogleCheckbox}
                          uncheckedImage={RedCheckBox}
                          checkedImage={UnCheckBox}
                          label={language.REMITTANCE_CURRENT_ADDRESS}
                          labelStyle={styles.checkboxLabel}
                          checked={!checked}
                        />
                      </View>
                    </Touchable>
                  </View>
                  <View style={styles.senderDataContainerCountry}>
                    <Field
                      name='countrySender'
                      label={language.REMITTANCE___COUNTRY_TEXT}
                      placeholder={language.REMITTANCE___COUNTRY_TEXT}
                      disabled={checked}
                      component={SinarmasInputBoxNewRemittance}
                      maxLength={35}
                      format={formatFieldNote}
                      normalize={formatFieldNote}
                      isRemittance={true}
                    />
                  </View>
                  <View style={styles.senderDataContainerCity}>
                    <Field
                      name='stateSender'
                      label={language.REMITTANCE___STATE_TEXT}
                      placeholder={language.HINTTEXT__REMITTANCE_STATE}
                      disabled={checked}
                      component={SinarmasInputBoxNewRemittance}
                      maxLength={35}
                      format={formatFieldNote}
                      normalize={formatFieldNote}
                      isRemittance={true}
                    />
                  </View>
                  <View style={styles.senderDataContainerAddress}>
                    <Field
                      name='adressSender'
                      label={language.REMITTANCE__ADDRESS_TEXT}
                      placeholder={language.REMITTANCE__ADDRESS_TEXT}
                      disabled={checked}
                      component={SinarmasInputBoxNewRemittance}
                      maxLength={35}
                      format={formatFieldNote}
                      normalize={formatFieldNote}
                      isRemittance={true}
                    />
                  </View>
                  <View style={styles.buttonBottom}>
                    <SinarmasButton disabled={submitting || requireField} onPress={wrapMethodInFunction(handleSubmit)} text={language.SERVICE__CONTINUE_BUTTON} style={styles.nextButton}/>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAwareScrollView>
          </View>
        </View>
      </View>
    );
  }
}




export default RemittanceSenderDataForm;
