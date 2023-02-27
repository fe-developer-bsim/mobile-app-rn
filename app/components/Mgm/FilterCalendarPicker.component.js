import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import styles from './ShareReferralCodeMgm.styles';
import isEmpty from 'lodash/isEmpty';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import {Field} from 'redux-form';
import * as actionCreators from '../../state/actions/index.actions.js';
import Touchable from '../Touchable.component';
import {result} from 'lodash';
import {NavigationActions} from 'react-navigation';
import {language} from '../../config/language';

export const fields = {
  CALENDAR: 'calendar',
};

class FilterCalendarPicker extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    formFilterValue: PropTypes.object,
    getFilterDateReferralList: PropTypes.func,
    getFilterDateClaimReward: PropTypes.func
  }

  state = {
    selectedStartDate: null,
    selectedEndDate: null,
  }

  onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      this.setState({selectedEndDate: date});
    } else {
      this.setState({selectedEndDate: null});
      this.setState({selectedStartDate: date});
    }
  };

  goBackPage = () => {
    const {dispatch, navigation, getFilterDateReferralList, getFilterDateClaimReward} = this.props;
    const formMyInvitingRecord = result(navigation, 'state.params.formMyInvitingRecord', '') === 'myInvitingRecord';
    if (formMyInvitingRecord) {
      dispatch(NavigationActions.back());
      dispatch(getFilterDateReferralList);
    } else {
      dispatch(NavigationActions.back());
      dispatch(getFilterDateClaimReward);
    }
  }
  
  render () {
    const {dispatch} = this.props;
    const selectedStartDate = this.state.selectedStartDate;
    const selectedEndDate = this.state.selectedEndDate;
    const filterStarDate = selectedStartDate ? moment(selectedStartDate).format('D MMMM YYYY') : '';
    const filterEndDate = selectedEndDate ? moment(selectedEndDate).format('D MMMM YYYY') : '';
    const disableClose = isEmpty(filterStarDate && filterEndDate);
    dispatch(actionCreators.saveFilterCalendar({filterStarDate, filterEndDate}));
    const newDate = new Date();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    const day = newDate.getDate();
    const today = moment(newDate).format('D MMMM YYYY');
    const threeMonth = new Date(year, month, day - 90);
    
    return (
      <ScrollView style={styles.flex}>
        <View style={styles.backgroundColorCalendar}/>
        <View>
          <View style={styles.containerDate}>
            <Text style={styles.dateText}>{language.MGM__CALENDAR_CHOOSE_DATE}</Text>
            <Touchable onPress ={this.goBackPage} disabled={disableClose}>
              <Text style={styles.closeText}>{language.MGM__CALENDAR_SET_DATE}</Text>
            </Touchable>
          </View>
          <View style={styles.containerBanner}>
            <Field
              name={fields.CALENDAR}
              component={CalendarPicker}
              startFromMonday={true}
              allowRangeSelection={true}
              // minDate={new Date(1973, 1, 1)}
              minDate={threeMonth}
              maxDate={today}
              weekdays={
                [
                  'Sun',
                  'Mon', 
                  'Tue', 
                  'Wed', 
                  'Thur', 
                  'Fri', 
                  'Sat'
                ]}
              months={[
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ]}
              todayBackgroundColor='#ffb3cb'
              selectedDayColor='#FFEFF4'
              selectedDayTextColor='#000000'
              scaleFactor={375}
              textStyle={{
                fontFamily: 'Cochin',
                color: '#000000',
              }}
              onDateChange={this.onDateChange}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default FilterCalendarPicker;