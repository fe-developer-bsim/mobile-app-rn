import React from 'react';
import PropTypes from 'prop-types';
import styles from './SelectSeat.styles';
import {View, Text, ScrollView} from 'react-native';
import Touchable from '../Touchable.component';
import {result, filter, isEmpty, forEach} from 'lodash';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import {currencyFormatter} from '../../utils/transformer.util';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';

class SelectSeat extends React.Component {
  static propTypes = {
    viewHeight: PropTypes.number,
    viewWidth: PropTypes.number,
    seatLayout: PropTypes.array,
    seatPriceList: PropTypes.array,
    selectSeat: PropTypes.func,
    selectedSeat: PropTypes.array,
    seatAmount: PropTypes.object,
    totalAmount: PropTypes.number,
    timeout: PropTypes.func,
    scheduleData: PropTypes.object,
    seatPayment: PropTypes.func,
    disabled: PropTypes.bool,
  }

  state = {
    secondsRemaining: 60
  }

  renderRow = (rowData, index) => (
    <View style={styles.rowData} key={index}>
      {rowData.map(this.renderSeat)}
    </View>
  );

  renderSeat = (seatData) => {
    const seatStatusCode = result(seatData, 'seatStatusCode', '00');
    const seatLocationNumber = result(seatData, 'seatLocationNumber', '00');
    const seatNumber = result(seatData, 'rowName', '') + result(seatData, 'seatNumber', '');
    const seatGradeCode = result(seatData, 'seatGradeCode', '');
    const {selectSeat, selectedSeat} = this.props;
    const selected = !isEmpty(filter(selectedSeat, {'rowName': result(seatData, 'rowName', ''), 'seatNumber': result(seatData, 'seatNumber', '')}));
    const color = 'color' + seatGradeCode;
    const seatStyle = seatStatusCode !== '01' ?
      [styles.seat, {borderColor: styles.na}] :
      selected ?
        [styles.seat, {backgroundColor: styles[`${color}`], borderColor: styles[`${color}`]}] :
        [styles.seat, {borderColor: styles[`${color}`]}];
    const seatNumberStyle = seatStatusCode !== '01' ? styles.seatNumberDisabled : selected ? styles.seatNumberSelected : styles.seatNumber;
    return (
      <View key={seatLocationNumber}>
        {seatStatusCode === '00' ?
          <View style={styles.empty}/>
          :
          seatStatusCode === '01' ?
            <Touchable onPress={selectSeat(seatData)} style={seatStyle}>
              <Text style={seatNumberStyle}>{seatNumber}</Text>
            </Touchable>
            :
            <View onPress={selectSeat(seatData)} style={seatStyle}>
              <Text style={seatNumberStyle}>{seatNumber}</Text>
            </View>
        }
      </View>
    );
  }

  tick = () => {
    const {timeout} = this.props;
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      BackgroundTimer.clearInterval(this.interval);
      timeout();
    }
  }

  componentDidMount = () => {
    this.interval = BackgroundTimer.setInterval(this.tick, 1000);
  }

  componentWillUnmount = () => {
    BackgroundTimer.clearInterval(this.interval);
  }

  doPayment = () => {
    this.props.seatPayment();
    BackgroundTimer.clearInterval(this.interval);
  }

  renderLegend = (legendData, index) => {
    const {selectedSeat} = this.props;
    let seats = '';
    forEach(filter(selectedSeat, {'seatGradeCode': legendData.seatGradeCode}), (value) => {
      const seat = result(value, 'rowName', '') + result(value, 'seatNumber', '');
      if (seats === '') {
        seats = seat;
      } else {
        seats = seats + ', ' + seat;
      }
    });
    const seatGradeCode = result(legendData, 'seatGradeCode', '');
    const color = 'color' + seatGradeCode;
    const seatGradeKey = 'CGV__LEGEND_' + seatGradeCode;
    return (
      <View style={styles.legendRow} key={index}>
        <View style={[styles.colorBox, {backgroundColor: styles[`${color}`]}]}/>
        <View style={styles.seatGrade}><Text>{language[`${seatGradeKey}`]}</Text></View>
        <View style={styles.seatAmount}><Text>{seats.toString()}</Text></View>
      </View>
    );
  }

  render () {
    const {viewHeight, viewWidth, seatLayout = [], seatPriceList, selectedSeat, totalAmount, scheduleData,
      disabled} = this.props;
    const selectedSeatAmount = selectedSeat.length;
    const {secondsRemaining} = this.state;
    const seconds = secondsRemaining === 60 ? '01:00' :
      secondsRemaining > 9 ?
        '00:' + secondsRemaining.toString()
        :
        '00:0' + secondsRemaining.toString();
    const title = result(scheduleData, 'movieName', '');
    const subTitle = result(scheduleData, 'cinemaName', '') + ' - ' +
    result(scheduleData, 'movieTypeName', '') + ' - ' +
    result(scheduleData, 'studioName', '');
    const showDate = moment(result(scheduleData, 'showDate', ''));
    const showStartTime = result(scheduleData, 'showStartTime', '');
    const startTime = showStartTime === '' ? '' : showStartTime.substring(0, 2) + ':' + showStartTime.substring(2, 4);
    const showDateFormatted = String(showDate.format('dddd, D MMMM YYYY'));
    const schedule = showDateFormatted + ', ' + startTime;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
            <Text style={styles.subTitle}>{schedule}</Text>
          </View>
          <View style={styles.middleContainer}>
            <View style={styles.screenContainer}><Text style={styles.screenText}>{language.CGV__SCREEN}</Text></View>
            <View style={[styles.seatLayoutContainer]}>
              <ScrollView
                horizontal={true}
                directionalLockEnabled={false}
              >
                <View style={{width: viewWidth, height: viewHeight}}>
                  {seatLayout.map(this.renderRow)}
                </View>
              </ScrollView>
            </View>
            <View style={styles.legendContainer}>
              <View style={styles.rowSpace}>
                <Text style={styles.legendSpace}>{language.CGV__SEAT} ({selectedSeatAmount})</Text>
                <Text style={styles.countdown}>{seconds}</Text>
              </View>
              {seatPriceList.map(this.renderLegend)}
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalTitle}>{language.CGV__TOTAL}</Text>
            <Text style={styles.amount}>Rp {currencyFormatter(totalAmount)}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <SinarmasButton onPress={this.doPayment} text={language.GENERIC__BUY} disabled={disabled}/>
          </View>
        </View>
      </View>

    );
  }
}


export default SelectSeat;
