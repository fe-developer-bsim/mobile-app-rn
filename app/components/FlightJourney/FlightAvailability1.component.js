import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList} from 'react-native';
import styles from './FlightAvailability.style';
import {listViewComparator} from '../../utils/transformer.util';
import FlightItem from './FlightItem1.component';
import result from 'lodash/result';
import Touchable from '../Touchable.component';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import orderBy from 'lodash/orderBy';
import SortingFlightModal from './SortingFlightModal.component';
import moment from 'moment';

class FlightSchedule1 extends Component {
  state = {
    visibleDatePicker: false,
    stateSort: '',
    modalVisible: false,
    orderType: '',
    close: false,
    showing: '',
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
  renderListItemSummary = (value) => {
    const {goToSummary} = this.props;
    return goToSummary ? goToSummary(value) : '';
  }
  renderListItem = ({item}) => (
    <FlightItem {...item} userCategory={this.renderListItemCategory()} sorting={this.renderListItemSort()}
      getDetailFlights={this.renderListItemFuncPress(item)} getIntenational={this.renderListIsInternational()} 
      nextPage={this.renderListItemNextFunc(item)} summary={this.renderListItemSummary(item)} />
  )

  comparator = listViewComparator;
  changeVisible =() => {
    this.setState({
      visibleDatePicker: !this.state.visibleDatePicker
    });
  }
  
  changeModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }
  catching = (item) => () => {
    if (item.value === 'LP') {
      this.setState({
        stateSort: 'Fare',
        orderType: 'asc',
        showing: item.label,
        value: item.value,
        modalVisible: false
      });
    } else if (item.value === 'SD') {
      this.setState({
        stateSort: 'duration',
        orderType: 'asc',
        modalVisible: false,
        showing: item.label,
        value: item.value,
      });
    }  else if (item.value === 'EA') {
      this.setState({
        stateSort: 'fullArrive',
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
    }    
  }
  
  hideModal = () => this.setState({modalVisible: false});

  _hideDateTimePicker = () => this.setState({visibleDatePicker: false}); 
  
  changeDateDepart = (date) => {
    const {changeDateFunc} = this.props;
    changeDateFunc(date, 1);
  }
  render () {
    
    const minDate = new Date();
    const {data, departDate, dayDepartdate, sorting, passenger,
      flights, cityOrigin, cityDestination, arrivalDate} = this.props;
  
    const destination = result(data[0], 'Destination', '');
    const origin = result(data[0], 'Origin', '');
    const sorted = String(this.state.stateSort);
    const order = String(this.state.orderType);
    const sortedFlights = orderBy(flights, [sorted], [order]);
    const total = result(passenger, 'total');
    const departDateNew = new Date(departDate);
    const arrivalDateNew = new Date(arrivalDate);
    const value = this.state.value;
    const showing = this.state.showing;
    
    return (
      <View style={styles.container}>
        <View style={styles.progressBar}>
          <View style={[{flex: 3.3}, styles.redBar]}/>
          <View style={[{flex: 6.6}, styles.greyBar]}/>
        </View>
        <View style={styles.titleContainer}>
          <View style={styles.calendarContainer}>
            <SimasIcon name = 'calendar' size={40} style={styles.iconStyle} />
          </View>
          <View style={styles.information}>
            <Text style={styles.specialText}>{language.FLIGHT__DEPARTURE}</Text> 
            <Text style={styles.timesText}>{dayDepartdate},</Text>
            <Text style={styles.timesText}>{moment(departDate).format('DD MMM YYYY')} {'\n'}</Text>  
            <Text style={styles.timesText}>{language.FLIGHT__TOTAL}: {total} {language.FLIGHT__PAX}</Text>  
          </View>
          <View style={styles.separatorContainer}>
            <SimasIcon name='separator' size={90} style={styles.iconStyle}/>
          </View>
          <View style={styles.rightTitle}>
            <View style={styles.titleFrom}>
              <Text style={styles.titleText}>{origin}</Text>
              <Text style={styles.timesText}>{cityOrigin}</Text>
            </View>
            <View style={styles.depatureContainer}>
              <SimasIcon name = 'departure-plane' size={25}  style={styles.iconStyle} />
            </View>
            <View style={styles.titleTo}>
              <Text style={styles.titleText}>{destination}</Text>
              <Text style={styles.timesText}>{cityDestination}</Text>
            </View>
          </View>
        </View>
        <FlatList enableEmptySections data={sortedFlights} renderItem={this.renderListItem}/>
        <View style={styles.footerContainer}>
          <View style={[styles.borderedContainer]}>
            <Touchable onPress = {this.changeModal}>
              <View style={styles.rightBorder}>
                <Text style={styles.timesTextFooter}>{showing ? showing : language.FLIGHT__SORT} </Text> 
                <SimasIcon name = 'filter' size={20} style={styles.footerIconStyle} />
              </View>
            </Touchable>
            <Touchable onPress={this.changeVisible} >
              <View style={styles.rightBorder}>
                <Text style={styles.timesTextFooter}>{language.FLIGHT__CHANGE_DATE}</Text>
                <SimasIcon name = 'calendar' size={20} style={styles.footerIconStyle} />
              </View>
            </Touchable>
          </View>          
        </View>
        <DateTimePicker
          isVisible={this.state.visibleDatePicker}
          onConfirm={this.changeDateDepart}
          onCancel={this._hideDateTimePicker}
          minimumDate={minDate}
          date={departDateNew ? departDateNew : minDate}
          maximumDate={arrivalDateNew ? arrivalDateNew : {}}
        />
        <SortingFlightModal sortProps={sorting} sortFunc={this.catching} 
          visible={this.state.modalVisible} value={value} style={styles.modalPrecise}/>
      </View>

    );
  }

}

FlightSchedule1.propTypes = {
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
  flights: PropTypes.array,
  showSpinner: PropTypes.func,
  hideSpinner: PropTypes.func,
  cityOrigin: PropTypes.string,
  cityDestination: PropTypes.string
};

export default FlightSchedule1;
