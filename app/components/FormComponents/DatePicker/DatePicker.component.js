import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {noop, result} from 'lodash';
import SimasIcon from '../../../assets/fonts/SimasIcon';
import Touchable from '../../Touchable.component';
import SinarmasInput from '../SinarmasInput/SinarmasInput.component';
import styles from './DatePicker.component.styles';
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
    isEStatement: PropTypes.bool,
    textPosition: PropTypes.string
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
    const {meta, input, label, minimumDate = '01/01/1900', maximumDate = '01/01/2100', disabled, icon, errorType, showDay = false, formatDate = '', date = new Date(), isEStatement = false} = this.props;
    const err = errorType === 'birthDate' ? meta.error : (!disabled && (meta && !meta.active && meta.error));
    const newDate = result(input, 'value', new Date());
    const selectedDate =  moment(newDate, formatDate).isValid() ? moment(newDate, formatDate) : moment(newDate).isValid() ? newDate : '';
    const shownDate = this.isValidDate(selectedDate, formatDate) ? formatDate ? moment(selectedDate, formatDate).format('MM/DD/YYYY') : selectedDate : '';
    const displayedDate = this.isValidDate(selectedDate, formatDate) ? this.formatDate({formatDate, showDay: true, isDisplay: true}, shownDate) : '';
    const displayedMonth = this.isValidDate(selectedDate, formatDate) ? formatDate ? moment(selectedDate, formatDate).format('MMMM YYYY') : selectedDate : '';
    const minDate = this.isValidDate(minimumDate, formatDate) ? new Date(minimumDate) : new Date();
    const maxDate = this.isValidDate(maximumDate, formatDate) ? new Date(maximumDate) : new Date();
    const format = {formatDate, showDay, isDisplay: false};

    return (
      <View>
        <Touchable onPress={this._toggleDateTimePicker}>
          <SinarmasInput
            label={label}
            disabled={true}
            value={(isEStatement) ? displayedMonth : displayedDate}
            isBoxR={isEStatement}
          />

          <SimasIcon name={icon ? icon : 'scheduled-2-outline'} size={(isEStatement) ? 10 : styles.dateSize} style={[(isEStatement) ? styles.arrowPointDownStyle : styles.arrowDownStyle, (disabled) ? styles.arrowDownStyleDisabled : {}]}/>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handlePickerFunction(format)}
            onCancel={this._toggleDateTimePicker}
            minimumDate={minDate}
            date={date !== null ? date : minDate}
            maximumDate={maxDate}
            disabled={disabled}
          />
        </Touchable>
        {err && <ErrorTextIndicator text={err}/>}
      </View>
    );
  }
}

export default DatePicker;
