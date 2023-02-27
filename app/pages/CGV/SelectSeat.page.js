import React from 'react';
import PropTypes from 'prop-types';
import SelectSeat from '../../components/CGV/SelectSeat.component';
import {connect} from 'react-redux';
import {result, remove, isEmpty, find, filter, flatten, forEach} from 'lodash';
import {NavigationActions} from 'react-navigation';
import {getCgvLogin} from '../../state/thunks/cgv.thunks';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';

class SelectSeatPage extends React.Component {
  static propTypes = {
    getSeatLayout: PropTypes.func,
    navigation: PropTypes.object,
    goBack: PropTypes.func,
    seatPayment: PropTypes.func,
    maximumNumberOfSeats: PropTypes.number,
  }

  state = {
    selectedSeat: [],
    totalAmount: 0
  }

  timeout = () => {
    this.props.goBack();
  }

  onSubmit = () => {
    const {navigation, seatPayment} = this.props;
    const {selectedSeat, totalAmount} = this.state;
    const scheduleData = result(navigation, 'state.params.scheduleData', {});
    const priceData = result(navigation, 'state.params.seatData.seatPriceInfoList', []);
    const chargeData = result(navigation, 'state.params.seatData.transactionCharge', '');
    const seatData = {paymentSeatInfoList: selectedSeat, scheduleData, totalAmount, priceData, chargeData};
    seatPayment(seatData);
  }

  selectSeat = (seat) => () => {
    const {navigation, maximumNumberOfSeats} = this.props;
    const {selectedSeat, flatLayout} = this.state;
    const seatData = result(navigation, 'state.params.seatData', {});
    const seatPriceList = result(seatData, 'seatPriceInfoList', {});
    const specialConnectionGradeCode = result(seat, 'specialConnectionGradeCode', '');
    const foundSeat = find(selectedSeat, {'rowName': result(seat, 'rowName', ''), 'seatNumber': result(seat, 'seatNumber', '')});
    let updatedSeat = [];
    const seats = (specialConnectionGradeCode === '' || !specialConnectionGradeCode) ? [seat] : filter(flatLayout, {'specialConnectionGradeCode': specialConnectionGradeCode});
    const totalSeat = seats.length + selectedSeat.length;
    if (totalSeat <= maximumNumberOfSeats) {
      if (!isEmpty(foundSeat)) {
        if (specialConnectionGradeCode === '' || !specialConnectionGradeCode) {
          remove(selectedSeat, (data) => data.rowName === result(seat, 'rowName', '') && data.seatNumber === result(seat, 'seatNumber', ''));
        } else {
          remove(selectedSeat, (data) => data.specialConnectionGradeCode === result(seat, 'specialConnectionGradeCode', ''));
        }
        updatedSeat = selectedSeat;
        this.setState({selectedSeat});
      } else {
        updatedSeat = [...selectedSeat, ...seats];
        this.setState({selectedSeat: updatedSeat});
      }
      let totalAmount = 0;
      if (!isEmpty(updatedSeat)) {
        forEach(updatedSeat, (data) => {
          const seatGradeCode = result(data, 'seatGradeCode', '');
          const price = result(find(seatPriceList, {'seatGradeCode': seatGradeCode}), 'showingAmount', 0);
          totalAmount += price;
        });
      }
      this.setState({totalAmount});
    } else {
      if (!isEmpty(foundSeat)) {
        if (specialConnectionGradeCode === '' || !specialConnectionGradeCode) {
          remove(selectedSeat, (data) => data.rowName === result(seat, 'rowName', '') && data.seatNumber === result(seat, 'seatNumber', ''));
        } else {
          remove(selectedSeat, (data) => data.specialConnectionGradeCode === result(seat, 'specialConnectionGradeCode', ''));
        }
        updatedSeat = selectedSeat;
        this.setState({selectedSeat});
      } else {
        Toast.show(language.CGV__SEAT_MAX + maximumNumberOfSeats + language.CGV__SEAT_LIMIT);
      }
    }
  }

  componentWillMount () {
    const {navigation} = this.props;
    const flatLayout = flatten(result(navigation, 'state.params.seatData.seatLayoutInfoList', {}));
    this.setState({flatLayout});
  }

  render () {
    const {navigation, maximumNumberOfSeats} = this.props;
    const seatData = result(navigation, 'state.params.seatData', {});
    const seatRow = parseInt(result(seatData, 'showingSeatInfo.numberOfRow', 0)) + 2;
    const seatColumn = parseInt(result(seatData, 'showingSeatInfo.numberOfColumn', 0)) + 2;
    const viewHeight = seatRow * 25 + (seatRow - 1) * 5 + 20;
    const viewWidth = seatColumn * 25 + (seatColumn - 1) * 5 + 20;
    const seatLayout = result(seatData, 'seatLayoutInfoList', []);
    const seatPriceList = result(seatData, 'seatPriceInfoList', []);
    const {selectedSeat, totalAmount} = this.state;
    const scheduleData = result(navigation, 'state.params.scheduleData', {});
    const disabled = isEmpty(selectedSeat);
    return <SelectSeat viewHeight={viewHeight} viewWidth={viewWidth} seatLayout={seatLayout} seatPriceList={seatPriceList}
      selectSeat={this.selectSeat} selectedSeat={selectedSeat} totalAmount={totalAmount} timeout={this.timeout}
      scheduleData={scheduleData} seatPayment={this.onSubmit} disabled={disabled} maximumNumberOfSeats={maximumNumberOfSeats}/>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  goBack: () => dispatch(NavigationActions.back()),
  seatPayment: (seatData) => {
    dispatch(getCgvLogin(seatData));
  }
});

const mapStateToProps = (state) => ({
  maximumNumberOfSeats: result(state, 'config.CGVConfig.maximumNumberOfSeats', 6)
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectSeatPage);
