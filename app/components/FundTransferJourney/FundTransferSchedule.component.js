import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './FundTransferSchedule.style';
import noop from 'lodash/noop';
import {SinarmasButton, DatePicker, SinarmasPickerLine} from '../FormComponents';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {scheduleTransferListEN, scheduleTransferListID} from '../../utils/transformer.util';

export const fields = {
  SCHEDULE_FIELD: 'schedule',
  SCHEDULE_DATE: 'transferTime'
};


class FundTransferSchedule extends Component {
  static propTypes = {
    payee: PropTypes.object,
    accountList: PropTypes.array,
    onNextPress: PropTypes.func,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    formValues: PropTypes.object,
    paymentMethods: PropTypes.array,
    scheduleTime: PropTypes.string,
    times: PropTypes.number,
    addTimes: PropTypes.func,
    minusTimes: PropTypes.func,
    changeScheduleTime: PropTypes.func,
    serverTimeNew: PropTypes.object,
    currentLanguage: PropTypes.string
  }

  render () {
    const {invalid, submitting, onNextPress = noop, scheduleTime, times, addTimes, minusTimes, currentLanguage, changeScheduleTime = noop,
      serverTimeNew} = this.props;
    const initialTime = new Date(); 
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraHeight={120}>
        <View>          
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{language.TRANSFER__SCHEDULE}</Text>
          </View>
          <View style={styles.formContainer}>
            <Field
              name={fields.SCHEDULE_DATE}
              component={DatePicker}
              label={language.TRANSFER__START_DATE}
              minimumDate={serverTimeNew}
              maximumDate={'01/01/2100'}
              date={initialTime} 
            />
          </View>
          <View>
            <View style={styles.scheduleContainer}>
              <View style={styles.schedulePicker}>
                <Field
                  component={SinarmasPickerLine}
                  placeholder={language.TRANSFER__SCHEDULE_PERIOD}
                  labelKey='label'
                  itemList={currentLanguage === 'id' ? scheduleTransferListID : scheduleTransferListEN}
                  onValChange={changeScheduleTime}
                  name={fields.SCHEDULE_FIELD}
                  arrowPickerStyle={{marginTop: 15}}
                  textPickerStyle={{color: 'black', fontWeight: 'normal'}}
                />
              </View>
              <View style={styles.timeAddContainer}>
                <View style={scheduleTime !== '' || scheduleTime !== 'oneTime' ? styles.borderedContainer : styles.disbaledBorderedContainer}>
                  <Touchable disabled={scheduleTime === '' || scheduleTime === 'oneTime' || times === 1} onPress={minusTimes}>
                    <View style={scheduleTime === '' || scheduleTime === 'oneTime' ? styles.disbaledRightBorder : styles.rightBorder}>
                      <Text style={scheduleTime === '' || scheduleTime === 'oneTime' || times === 1 ? styles.largeTextDisabled : styles.largeText }>-</Text>
                    </View>
                  </Touchable>
                  <View style={scheduleTime === '' || scheduleTime === 'oneTime' ? styles.disbaledRightBorder : styles.rightBorder}>
                    <Text style={styles.timesText}>{scheduleTime === '' ||  scheduleTime === 'oneTime' ? '' : times + 'x' }</Text>
                  </View>
                  <Touchable disabled={scheduleTime === '' || scheduleTime === 'oneTime'} onPress={addTimes}>
                    <View style={styles.center}>
                      <Text style={scheduleTime === '' || scheduleTime === 'oneTime' ? styles.largeTextDisabled : styles.largeText}>+</Text>
                    </View>
                  </Touchable>
                </View>
              </View>
            </View>
          </View>
        </View>
          
        <View>
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <SimasIcon style={styles.iconColor} name='caution-circle' size={24}/>
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.info}>{language.TRANSFER__SCHEDULE_FOOTER}</Text>
            </View>
          </View>
          <View style={styles.paddingContent}>
            <SinarmasButton disabled={invalid || submitting} onPress={onNextPress} text={language.SERVICE__NEXT_BUTTON} />
          </View>
        </View>

      </KeyboardAwareScrollView>
        
    );
  }
}

export default FundTransferSchedule;
