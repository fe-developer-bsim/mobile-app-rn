import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {noop, result} from 'lodash';
import SimasIcon from '../../../assets/fonts/SimasIcon';
import Touchable from '../../Touchable.component';
import styles from './DatePickerNew.component.styles';
import ErrorTextIndicator from '../../ErrorTextIndicator/ErrorTextIndicator.component';
import {getDayName} from '../../../utils/transformer.util';
import moment from 'moment';

class DatePicker extends Component {
  static propTypes = {
    meta: PropTypes.object,
    input: PropTypes.object,
    label: PropTypes.string,
    minimumDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    maximumDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    disabled: PropTypes.bool,
    showDay: PropTypes.bool,
    formatDate: PropTypes.string,
    icon: PropTypes.string,
    errorType: PropTypes.string,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    addStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    isTax: PropTypes.bool,
    transactionsFilter: PropTypes.bool,
    darkBlueText: PropTypes.bool,
    checkPristine: PropTypes.bool,
    showInitialDate: PropTypes.bool,
    multipleInRow: PropTypes.bool,
    arrowDown: PropTypes.bool,
  }

  static defaultProps = {
    itemList: [],
    input: {onChange: noop, value: {}},
    onValChange: noop
  }

  state = {
    isDateTimePickerVisible: false,
    disabled: false
  }

  _toggleDateTimePicker = () => !this.props.disabled && this.setState({isDateTimePickerVisible: !this.state.isDateTimePickerVisible});

  _handleDatePicked = (format = {}, date) => {
    const selectedDate = moment(date).isValid() ? date : new Date();
    const formattedDate = this.formatDate(format, selectedDate);
    if (!this.state.disabled) {
      this.props.input.onChange(formattedDate || {});
      this._toggleDateTimePicker();
    }
  };

  handlePickerFunction = (format) => (date) => this._handleDatePicked(format, date);

  formatDate = (format, date) => (format.showDay ? (moment(date).isValid() ? this.dayShow(date, format.formatDate) : this.dayShow(date, format.formatDate)) : '') + (format.formatDate && !format.isDisplay ? this.customFormat(format.formatDate, date) : date ? this.dateShow(date) : '');

  dateShow = (date) => moment(date).format('DD MMM YYYY')

  dayShow = (date, format = '') => (moment(date).isValid() ? getDayName(date) : getDayName(moment(date, format))) + ', '

  customFormat = (format, date) => moment(date).isValid() ? moment(date).format(format) : moment(date, format).format(format);

  isValidDate = (date, format) => moment(date, format).isValid() || moment(date).isValid()

  render () {
    const {meta, input, label, minimumDate = '21/05/1900', maximumDate = '01/01/2100', disabled, icon, errorType, showDay = false, formatDate = '', date = new Date(), addStyle, isTax,
      multipleInRow = false, arrowDown = false, darkBlueText = false, transactionsFilter = false, showInitialDate = false} = this.props;
    const err = errorType === 'birthDate' ? meta.error : (!disabled && (meta && !meta.active && meta.error));
    const newDate = result(input, 'value', new Date());
    const selectedDate =  moment(newDate, formatDate).isValid() ? moment(newDate, formatDate) : moment(newDate).isValid() ? newDate : showInitialDate ? new Date() : '';
    const shownDate = this.isValidDate(selectedDate, formatDate) ? formatDate ? moment(selectedDate, formatDate).format('MM/DD/YYYY') : selectedDate : '';
    const displayedDate = this.isValidDate(selectedDate, formatDate) ? this.formatDate({formatDate, showDay, isDisplay: true}, shownDate) : '';
    const minDate = this.isValidDate(minimumDate, formatDate) ? new Date(minimumDate) : new Date();
    const maxDate = this.isValidDate(maximumDate, formatDate) ? new Date(maximumDate) : new Date();
    const format = {formatDate, showDay, isDisplay: false};
    return (
      <View style={transactionsFilter ? {flex: 1} : null}>
        <TouchableOpacity onPress={this._toggleDateTimePicker} activeOpacity={1}>
          <View style={displayedDate === '' ? multipleInRow ? [styles.borderGrey2, addStyle] : [styles.borderGrey, addStyle] : multipleInRow ? [styles.borderGreyFocus2, addStyle] : [styles.borderGreyFocus, addStyle]}>
            <Touchable onPress={this._toggleDateTimePicker}>
              <View>
                {displayedDate === '' ?
                  <Text style={styles.textDate}>{label}</Text>
                  :
                  multipleInRow ?
                    <View>
                      <Text style={styles.upperText}>{label}</Text>
                      <View style={styles.dateContainer}>
                        <Text style={darkBlueText ? styles.darkBlueLowerText : styles.lowerText}>{displayedDate}</Text>
                      </View>
                    </View>
                    :
                    <View style={styles.columnContainer}>
                      <Text style={styles.upperText}>{label}</Text>
                      <Text style={darkBlueText ? styles.darkBlueLowerText : styles.lowerText}>{displayedDate}</Text>
                    </View>
                }
              </View>
            </Touchable>
            <SimasIcon name={icon ? icon : 'scheduled-2-outline'} size={arrowDown ? 12 : 20} style={[arrowDown ? styles.newArrowDownStyle : styles.arrowDownStyle, (disabled) ? styles.arrowDownStyleDisabled : {}]}/>            
          </View>

          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handlePickerFunction(format)}
            onCancel={this._toggleDateTimePicker}
            minimumDate={minDate}
            date={date !== null ? date : minDate}
            maximumDate={maxDate}
            disabled={disabled}
          />
          {err && <ErrorTextIndicator text={err} isTax={isTax}/>}
        </TouchableOpacity>
      </View>
    );
  }
}

export default DatePicker;