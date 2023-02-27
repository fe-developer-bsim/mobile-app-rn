import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import moment from 'moment';
import styles from './CgvSchedule.styles';
import result from 'lodash/result';
import {getFilterDate, getFilteredType, getFilteredStudio} from '../../utils/transformer.util';
import Touchable from '../Touchable.component';
import Carousel from '../Carousel/Carousel.component';
import map from 'lodash/map';
import chunk from 'lodash/chunk';
import {language} from '../../config/language';
import BackgroundTimer from 'react-native-background-timer';

class CgvMovie extends React.Component {
  static propTypes = {
    offer: PropTypes.object,
    onOfferClick: PropTypes.func,
    param: PropTypes.object,
    navigation: PropTypes.object,
    toCgvSeats: PropTypes.func,
    timeout: PropTypes.func,
  }

  state = {
    secondsRemaining: 300,
    dataFilter: {},
    selectedDate: {
    },
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
  componentWillMount = () => {
    const {navigation} = this.props;
    const today = moment().format('YYYYMMDD');
    const month = moment(today).format('MMMM');
    const year = moment(today).format('YYYY');
    const dt = result(navigation, 'state.params.mapingSchedule');
    const schMap = getFilterDate(dt, today);
    this.setState({
      dataFilter: schMap,
      selectedDate: {
        tittle: month + ' ' + year,
        select: today
      },
    });
  }
  componentWillUnmount = () => {
    BackgroundTimer.clearInterval(this.interval);
  }
  renderMovie = (movie = []) => {
    const {navigation} = this.props;
    const filteredTypeList = getFilteredType(movie);
    const tipe = result(navigation, 'state.params.tipe');
    if (filteredTypeList.length > 0)
      return (
        <View>
          <View style={styles.container}>
            <View style={styles.viewSelect}>
              <Text style={styles.textSelect}>{tipe === 'movie' ? movie.cinemaName : movie.movieName}</Text>
            </View>
          </View>
          {filteredTypeList.map(this.renderType)}
        </View>
      );
  }

  renderType = (type = []) => {
    const filteredStudioList = getFilteredStudio(type);
    return (
      <View style={styles.containerType}>
        <View style={styles.container}>
          <Text style={styles.textMovieType}>{type.movieType}</Text>
        </View>
        {filteredStudioList.map(this.renderStudio)}
      </View>
    );
  }

  renderStudio = (studio = []) => {
    const timeList = result(studio, 'timeList', []);
    let timeChunk = [];
    if (timeList.length > 0) {
      timeChunk = chunk(timeList, 4);
    }
    return (
      <View style={styles.containerTime}>
        <Text style={styles.textStudioType}>{studio.studioName}</Text>
        <View style={styles.timeContainer}>
          {
            map(timeChunk, (std, k) => (
              <View key={k} style={styles.stdRow}>
                { map(std, (tm, ky) => (
                  <View key={ky}>
                    {this.renderTime(tm)}
                  </View>
                ))
                }
              </View>
            ))
          }
        </View>
        <View style={styles.line} />
      </View>
    );
  }

  renderTime = (time = {}) => {
    const {toCgvSeats} = this.props;
    const times = result(time, 'showStartTime', '----');
    const hour = times.substring(0, 2);
    const min = times.substring(2, 4);
    const timeShow =  hour + ':' + min;
    const isAvailableSchedule = !result(time, 'value.isAvailableSchedule', true);
    return (
      <View>
        <Touchable onPress={toCgvSeats(time.value)} disabled={isAvailableSchedule}>
          <View style={isAvailableSchedule ? styles.roundTimeDisable : styles.roundTime }>
            <Text style={isAvailableSchedule ? styles.roundTimeTextDisable : styles.roundTimeText }>{timeShow}</Text>
          </View>
        </Touchable>
      </View>
    );
  }

  changeDate = (inputProps = '') => () => {
    const {navigation} = this.props;
    const dt = result(navigation, 'state.params.mapingSchedule');
    const schMap = getFilterDate(dt, inputProps);
    const month = moment(inputProps).format('MMMM');
    const year = moment(inputProps).format('YYYY');
    this.setState({
      dataFilter: schMap,
      selectedDate: {
        tittle: month + ' ' + year,
        select: inputProps
      },
    });
  }

  renderDate = (date = {}) => {
    const selected = (this.state.selectedDate.select) === (result(date, 'date', '-'));
    const day = result(date, 'day', '-');
    const dates = result(date, 'date', '-');
    const dateDay = result(date, 'dateDay', '-');
    return (
      <View>
        <Text style={selected ?  styles.detailTextTittleTopSelect : styles.detailTextTittleTop}>{day}</Text>
        <View>
          <View style={selected ? styles.dateRoundSelect : styles.dateRoundNotSelect}>
            <Touchable onPress={this.changeDate(dates)} style={styles.touchableWhite}>
              <Text style={selected ? styles.detailTextTittleSelected : day === 'Sun' ? styles.detailTextTittleRed : styles.detailTextTittle}>
                {dateDay}
              </Text>
            </Touchable>
          </View>
        </View>
      </View>
    );
  }

  render () {
    const {navigation = {}} = this.props;
    const movieList = result(this.state, 'dataFilter', {});
    const tipe = result(navigation, 'state.params.tipe');
    const dayList = result(navigation, 'state.params.dayList');
    const name = tipe === 'cinema' ? 'CGV ' + result(navigation, 'state.params.cinemaData.cinemaName', {}) : result(navigation, 'state.params.cinemaData.movieName', {});
    return (
      <View style={styles.bgWhite}>
        <ScrollView style={styles.containerPadding} contentContainerStyle={styles.scrollContainer}>
          <View style={styles.containerDetailCinema}>
            <Text style={styles.nameTittle}>{name}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.containerDetailCinema}>
            <Text style={styles.monthTextTittle}>{this.state.selectedDate.tittle}</Text>
          </View>
          <View>
            <View>
              <Carousel slideStyle={styles.slideStyle}>
                {dayList.map(this.renderDate)}
              </Carousel>
            </View>
          </View>

          <View style={styles.lineGrey} />

          <View>
            <View style={styles.container}>
              {tipe === 'cinema' ?
                <Text style={styles.detailTittle}>{language.CGV_SELECT_MOVIE_AND_TIME}</Text>
                :
                <Text style={styles.detailTittle}>{language.CGV_SELECT_CINEMA_AND_TIME}</Text>
              }
            </View>
            {movieList.map(this.renderMovie)}
          </View>

        </ScrollView>
      </View>
    );
  }
}

export default CgvMovie;
