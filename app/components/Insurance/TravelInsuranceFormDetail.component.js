import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {language} from '../../config/language';
import {SinarmasInput, SinarmasButton, SinarmasPicker, DatePicker} from '../FormComponents';
import {Field} from 'redux-form';
import styles from './TravelInsuranceFormDetail.component.styles';
import {getDropDownList, formatFieldName, getVarName, recursiveMap} from '../../utils/transformer.util';
import result from 'lodash/result';
import InsuranceHeader from './InsuranceHeader.component';
import noop from 'lodash/noop';

class TravelAssuranceDetail extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    formValues: PropTypes.object,
    navigation: PropTypes.object,
    navParams: PropTypes.object,
    planPage: PropTypes.func,
    dataDisplay: PropTypes.object,
    isValidDate: PropTypes.bool,
    checkDate: PropTypes.func,
  }

  headerView = (text, key) => <Text style={styles.header} key={key}>{text}</Text>

  nameView = (text, key) => text ? <Text style={styles.subHeader} key={key}>{text}</Text> : null

  customView = (object, objKey = '') => recursiveMap(object, this.nameView, 'name', ['function', 'header'], {function: noop, header: this.headerView}).map((object, key) => <View key={objKey + key}>{object}</View>)

  render () {
    const {submitting, invalid, navParams, handleSubmit, dataDisplay, isValidDate} = this.props;
    const minDate = new Date();
    const formatDate = 'DD/MM/YYYY';
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120}>
        <View style={styles.barStep}>
          <View style={styles.partOne}/>
          <View style={styles.partTwo}/>
        </View>
        <InsuranceHeader headerDisplay={dataDisplay} headerKey={getVarName({dataDisplay})} avoidedDisplay={['function']} customHeader={['insuredHeader', 'travelHeader']} customView={{insuredHeader: this.customView, travelHeader: null}}/>
        <View style={styles.container}>
          <Text style={styles.tittleHeader}>{language.TRAVEL_DETAIL_TITTLE_HEADER}</Text>
          <Field
            name='TripReason'
            rightIcon='arrow'
            component={SinarmasPicker}
            label={language.TRAVEL_TRIP_REASON}
            placeholder={language.TRAVEL_TRIP_REASON}
            labelKey='display'
            itemList={getDropDownList(result(navParams, 'reason', ''))}
          />
          <Field
            name='OriginatingCity'
            label={language.TRAVEL_ORIGINAL_CITY}
            placeholder={language.TRAVEL_INSURANCE__FILL_ORIGINATING_CITY}
            disabled={false}
            component={SinarmasInput}
            format={formatFieldName}
            normalize={formatFieldName}
            maxLength={40}
          />
          <Field
            name='FurthestCity'
            label={language.TRAVEL_DESTINATION_CITY}
            placeholder={language.TRAVEL_INSURANCE__FILL_FURTHEST_CITY}
            disabled={false}
            component={SinarmasInput}
            format={formatFieldName}
            normalize={formatFieldName}
            maxLength={40}
          />
          <Field
            name='InseptionDate'
            component={DatePicker}
            label={language.TRAVEL_DEPARTURE_DATE}
            minimumDate={minDate}
            formatDate={formatDate}
            maximumDate={'01/01/2100'}
            date={minDate}
          />
          <Field
            name='InseptionDateTo'
            component={DatePicker}
            label={language.TRAVEL_ARRIVAL_DATE}
            minimumDate={minDate}
            formatDate={'DD/MM/YYYY'}
            maximumDate={'01/01/2100'}
            date={minDate}
          />
          <View style={styles.buttonContinue} >
            <SinarmasButton onPress={(handleSubmit)} disabled={invalid || submitting || !isValidDate} text={language.GENERIC__CONTINUE}/>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default TravelAssuranceDetail;
