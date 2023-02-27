import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList} from 'react-native';
import styles from './FlightAvailability.style';
import {listViewComparator} from '../../utils/transformer.util';
import FlightItem from './FlightItem2.component';
import result from 'lodash/result';
import Touchable from '../Touchable.component';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import orderBy from 'lodash/orderBy';
import SortingFlightModal from './SortingFlightModal.component';
import moment from 'moment';

class FlightSchedule2 extends Component {
  state = {
    visibleDatePicker: false,
    stateSort: '',
    modalVisible: false,
    showing: ''
  }
  renderListItemNextFunc = (value) => () => {
    const {onNextPage = {}} = this.props;
    return onNextPage ? onNextPage(value) : {};
  }
  
  renderListItemFuncPress = (value) => () => {
    const {onItemPress = {}} = this.props;
    return onItemPress ? onItemPress(value) : {};
  }
  renderListItemCategory = () => {
    const {category} = this.props;
    return category ? category : '';
  }
  renderListItemSort = () => {
    const {sorting} = this.props;
    return sorting ? sorting : '';
  }
  renderListIsInternational = () => {
    const {data} = this.props;
    const isInter = result(data[0], 'IsInternational', '');
    return isInter ? isInter : '';
  }
  renderListItemSummary = (value) => () => {
    const {goToSummary} = this.props;
    return goToSummary ? goToSummary(value) : '';
  }
  renderListItemDetail1 = () => {
    const {flightDataDetail1} = this.props;
    return flightDataDetail1 ? flightDataDetail1 : {};
  }
  renderListItem = ({item}) => (
    <FlightItem {...item} userCategory={this.renderListItemCategory()} sorting={this.renderListItemSort()}
      getDetailFlights={this.renderListItemFuncPress(item)} getIntenational={this.renderListIsInternational()} 
      summary={this.renderListItemSummary(item)} itemDetail1={this.renderListItemDetail1()}/>
  )

  comparator = listViewComparator;
  changeVisible = () => {
    this.setState({
      visibleDatePicker: !this.state.visibleDatePicker
    });
  }
 
  catching = (item) => () => {
    if (item.value === 'LP') {
      this.setState({
        stateSort: 'Fare',
        orderType: 'asc',
        showing: item.label,
        modalVisible: false,
        value: item.value,

      });
    } else if (item.value === 'SD') {
      this.setState({
        stateSort: 'duration',
        orderType: 'asc',
        modalVisible: false,
        showing: item.label,
        value: item.value,

      });
    } else if (item.value === 'LA') {
      this.setState({
        stateSort: 'fullArrive',
        orderType: 'desc',
        modalVisible: false,
        showing: item.label,
        value: item.value,

      });
    } else if (item.value === 'EA') {
      this.setState({
        stateSort: 'fullArrive',
        orderType: 'asc',
        modalVisible: false,
        showing: item.label,
        value: item.value,

      });
    }
  }
  
  changeModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  changeDateArrival = (date) => {
    const {changeDateFunc} = this.props;
    changeDateFunc(date, 2);
  }
  _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false}); 

  render () {
    
    
    const {data, arrivalDate, dayArrivaldate, sorting, passenger, 
      flights, cityOrigin, cityDestination, departDate} = this.props;
    const destination = result(data[1], 'Destination', '');
    const origin = result(data[1], 'Origin', '');
    const sorted = String(this.state.stateSort);
    const order = String(this.state.orderType);
    const sortedFlights = orderBy(flights, [sorted], [order]);
    const showing = this.state.showing;
    const total = result(passenger, 'total');
    return (
      <View style={styles.container}>
        <View style={styles.progressBar}>
          <View style={[{flex: 3.3}, styles.redBar]}/>
          <View style={[{flex: 6.6}, styles.greyBar]}/>
        </View>
        <View style={styles.titleContainer}>
          <View style={styles.calendarContainer}>
            <SimasIcon name = 'calendar' size={30} style={styles.iconStyle} />
          </View>
          <View style={styles.information}>
            <Text style={styles.specialText}>{language.FLIGHT__ARRIVAL}</Text> 
            <Text style={styles.timesText}>{dayArrivaldate},</Text>
            <Text style={styles.timesText}>{moment(arrivalDate).format('DD MMM YYYY')} {'\n'}</Text>  
            <Text style={styles.timesText}>{language.FLIGHT__TOTAL}: {total} {language.FLIGHT__PAX}</Text>  
          </View>
          <View style={styles.separatorContainer}>
            <SimasIcon name='separator' size={90} style={styles.iconStyle}/>
          </View>
          <View style={styles.rightTitle}>
            <View style={styles.titleFrom}>
              <Text style={styles.titleText}>{origin}</Text>
              <Text style={styles.timesText}>{cityDestination}</Text>

            </View>
            <View style={styles.depatureContainer}>
              <SimasIcon name = 'departure-plane' size={30}  style={styles.iconStyle} />
            </View>
            <View style={styles.titleTo}>
              <Text style={styles.titleText}>{destination}</Text>
              <Text style={styles.timesText}>{cityOrigin}</Text>

            </View>
          </View>
        </View>
        <FlatList enableEmptySections data={sortedFlights} renderItem={this.renderListItem}/>
        <View style={styles.footerContainer}>
          <View style={[styles.borderedContainer]}>
            <Touchable onPress={this.changeModal}>
              <View style={styles.rightBorder}>
                <Text style={styles.timesTextFooter}>{showing ? showing : language.FLIGHT__SORT  }</Text> 
                <SimasIcon name = 'filter' size={10} style={styles.footerIconStyle} />
              </View>
            </Touchable>
            <Touchable onPress={this.changeVisible} >
              <View style={styles.rightBorder}>
                <Text style={styles.timesTextFooter}>{language.FLIGHT__CHANGE_DATE}</Text>
                <SimasIcon name = 'calendar' size={10} style={styles.footerIconStyle} />
              </View>
            </Touchable>
          </View>
          
          <SortingFlightModal sortProps={sorting} sortFunc={this.catching} value={this.state.value} visible={this.state.modalVisible} />
          <DateTimePicker
            isVisible={this.state.visibleDatePicker}
            onConfirm={this.changeDateArrival}
            onCancel={this._hideDateTimePicker}
            minimumDate={departDate ? departDate : undefined}
            date={arrivalDate}
          />
          
        </View>
      </View>

    );
  }

}

FlightSchedule2.propTypes = {
  handleSubmit: PropTypes.func,
  validateBeforeSubmit: PropTypes.func,
  navParams: PropTypes.array,
  onItemPress: PropTypes.func,
  category: PropTypes.string,
  renderListItemCategory: PropTypes.func,
  renderListItemFuncPress: PropTypes.func,
  departDate: PropTypes.oneOfType([PropTypes.date, PropTypes.func]),
  arrivalDate: PropTypes.oneOfType([PropTypes.date, PropTypes.func]),
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  changeDateFunc: PropTypes.func,
  sorting: PropTypes.array,
  visibleDatePicker: PropTypes.bool,
  dayDepartdate: PropTypes.string,
  onNextPage: PropTypes.func,
  flag: PropTypes.string,
  passenger: PropTypes.object,
  goToSummary: PropTypes.func,
  dayArrivaldate: PropTypes.string,
  flights: PropTypes.array,
  cityOrigin: PropTypes.string,
  cityDestination: PropTypes.string,
  flightDataDetail1: PropTypes.object,
  mockDate: PropTypes.bool
};

export default FlightSchedule2;
