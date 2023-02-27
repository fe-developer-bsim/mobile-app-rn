import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, Text, ActivityIndicator, Linking, FlatList} from 'react-native';
import OrderItem from './OrderItem.component';
import CgvOrderItem from './CgvOrderItem.component';
import result from 'lodash/result';
import noop from 'lodash/noop';
import noVoucher from '../../assets/images/no-voucher.png';
import isEmpty from 'lodash/isEmpty';
import styles from './MyOrder.component.styles';
import {language} from '../../config/language';
import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';
import {Toast} from '../../utils/RNHelpers.util.js';
import moment from 'moment';

class MyOrder extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    header: PropTypes.string,
    goToDetailTransaction: PropTypes.func,
    onOrderDetail: PropTypes.func,
    goToEvoucherDetail: PropTypes.func,
    moveVoucher: PropTypes.func,
    activeTab: PropTypes.string,
    deleteVoucher: PropTypes.func,
    searchVoucher: PropTypes.string,
    sortVoucher: PropTypes.bool,
    expiredRangeConfig: PropTypes.string,
  }
  static defaultProps = {
    offers: [],
    onOrderDetail: noop,
    goToEvoucherDetail: noop,
    moveVoucher: noop,
    deleteVoucher: noop,
  }

  openLink = (data) => () => {
    const link = result(data, 'item.voucher.url', 'https://www.banksinarmas.com/PersonalBanking/NoPage');
    Linking.canOpenURL(link).then((supported) => {
      if (supported) {
        Linking.openURL(link);
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_HANDLE_URL, Toast.LONG);
      }
    });
  };

  renderListItem = (item) => (
    <OrderItem {...item.item} key={item.index} type='detail' onPress={this.openLink(item)} goToEvoucherDetail={this.props.goToEvoucherDetail} 
      moveVoucher={this.props.moveVoucher} deleteVoucher={this.props.deleteVoucher} expiredRangeConfig={this.props.expiredRangeConfig}
      activeTab={this.props.activeTab}/>
  )

  renderListCgv = (item) => (<CgvOrderItem {...item} key={item.index} type='detail' onPress={this.props.onOrderDetail(item)} />)

  filterVoucher = (voucherList, voucherStatus) => {
    const filteredList = filter(voucherList, (voucher) => {
      const expiredDate = moment(result(voucher, 'expiredDate', '')).format('D MMM YYYY hh:mm');
      const currentDate = moment().format('D MMM YYYY hh:mm');
      const isExpired = moment(currentDate).isSameOrAfter(expiredDate);
      const typeVoucher = result(voucher, 'typeVoucher', '');
      const redeemedDate = result(voucher, typeVoucher === 'GIVEAWAY' || typeVoucher === 'EVOUCHER' ? 'data.redeemedDate' : 'redeemedDate', '');
      const isRedeemed = !isEmpty(redeemedDate);
      if (voucherStatus.toUpperCase() === 'AVAILABLE') {
        return isExpired === false && isRedeemed === false;
      } else {
        return isExpired === true || isRedeemed === true;
      }
    });
    return filteredList;
  }

  searchVoucher = (voucherList, searchString) => {
    const filteredList = filter(voucherList, (voucher) => {
      const typeVoucher = result(voucher, 'typeVoucher', '');
      const voucherName = result(voucher, typeVoucher === 'GIVEAWAY' || typeVoucher === 'EVOUCHER' ? 'data.rewards[0].displayName' : 'voucherName', '');
      if (voucherName.toUpperCase().includes(searchString.toUpperCase())) {
        return voucher;
      }
    });
    return filteredList;
  }

  sortVoucher = (voucherList) => {
    const sortedList = orderBy(voucherList, (voucher) => {
      const expiredDate = moment(result(voucher, 'expiredDate', '')).format('YYYYMMDDhhmm');
      return expiredDate;
    }, ['asc']);
    return sortedList;
  }

  render () {
    const {searchVoucher, sortVoucher, activeTab} = this.props;
    const orderData = result(this.props, 'orderData', []);
    const cgvList = filter(orderData, {agregator: 'CGV'});
    const voucherList  = filter(orderData, (voucher) => {
      const agregator = result(voucher, agregator, '');
      return agregator !== 'CGV';
    });
    const loading = result(orderData, 'loading', false);
    const availableVoucher = orderBy(this.filterVoucher(voucherList, 'available'), 'redemptionDate', ['desc']);
    const unavailableVoucher = orderBy(this.filterVoucher(voucherList, 'unavailable'), 'redemptionDate', ['desc']);
    const itemList = activeTab === 'available' ? availableVoucher : unavailableVoucher;
    const reload = result(orderData, 'reload', false) || isEmpty(orderData);
    let finalList = [];
    if (activeTab === 'unavailable') {
      finalList = itemList;
    } else if (sortVoucher && !isEmpty(searchVoucher)) {
      finalList = this.sortVoucher(this.searchVoucher(availableVoucher, searchVoucher));
    } else if (sortVoucher) {
      finalList = this.sortVoucher(availableVoucher);
    } else if (!isEmpty(searchVoucher)) {
      finalList = this.searchVoucher(availableVoucher, searchVoucher);
    } else {
      finalList = itemList;
    }
    return (
      <View style={styles.pageContainer}>
        { loading ?
          <View style={styles.errorContainer}>
            <ActivityIndicator size='large' color={styles.red}/>
          </View>
          : reload ?
            <View style={styles.noofferImage}>
              <Image source={noVoucher} style={styles.imageSize} />
              <View>
                <Text style={styles.informationVoucher}>{language.PROFILE__SIMAS_POIN_NOT_FOUND_VOUCHER}</Text>
                <Text style={styles.transactionDate}>{language.PROFILE__SIMAS_POIN_NO_VOUCHER}</Text>
              </View>
            </View>
            :
            <View>
              { !isEmpty(cgvList) ? <Text style={styles.headerVoucher}>{language.PURCHASED_ITEM__CGV}</Text> : null }
              <FlatList enableEmptySections data={cgvList} renderItem={this.renderListCgv}/>
              <FlatList enableEmptySections data={finalList} renderItem={this.renderListItem} extraData={finalList}/>
            </View>
        }
      </View>
    );
  }
}

export default MyOrder;
