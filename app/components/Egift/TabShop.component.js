import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View, Text, TextInput} from 'react-native';
import styles from './TabShop.styles';
import {noop, isEmpty} from 'lodash';
import {language} from '../../config/language';
import MyOrder from './MyOrder.component';
import result from 'lodash/result';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Tooltip from 'react-native-walkthrough-tooltip';

class ShopPage extends React.Component {
  static propTypes = {
    onOrderDetail: PropTypes.func,
    getDataList: PropTypes.func,
    navigation: PropTypes.object,
    egiftList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    goToDetail: PropTypes.func,
    getEgiftList: PropTypes.func,
    goToEvoucherDetail: PropTypes.func,
    moveVoucher: PropTypes.func,
    deleteVoucher: PropTypes.func,
    expiredRangeConfig: PropTypes.string,
  }
  static defaultProps = {
    orderData: [],
    onOrderDetail: noop,
    goToEvoucherDetail: noop,
    moveVoucher: noop,
    deleteVoucher: noop,
  }

  state = {
    activeTab: 'available',
    searchVoucher: '',
    showSortButton: false,
    sortVoucher: false,
  };

  changeTab = (selectedTab) => () => {
    this.setState({activeTab: selectedTab});
  }

  changeSearch = (searchVoucher) => {
    this.setState({searchVoucher: searchVoucher});
  }

  toggleShowButton = () => {
    this.setState({showSortButton: !this.state.showSortButton});
  }

  toggleSort = () => {
    this.setState({sortVoucher: !this.state.sortVoucher, showSortButton: false});
  }

  render () {
    const {onOrderDetail, goToEvoucherDetail, moveVoucher, deleteVoucher, expiredRangeConfig} = this.props;
    const orderData = result(this.props, 'orderData', []);
    const activeTab = this.state.activeTab;
    const loading = result(orderData, 'loading', false);
    const reload = result(orderData, 'reload', false) || isEmpty(orderData);
    return (
      <View style={styles.container}>
        { !loading && !reload &&
          <View>
            <View style={styles.tabContainer}>
              <Touchable style={activeTab === 'available' ? styles.tabSelected : styles.tabUnselected} onPress={this.changeTab('available')}>
                <Text style={activeTab === 'available' ? styles.whiteText : styles.greyText}>{language.EVOUCHER__TAB_AVAILABLE}</Text>
              </Touchable>
              <Touchable style={activeTab === 'unavailable' ? styles.tabSelected : styles.tabUnselected} onPress={this.changeTab('unavailable')}>
                <Text style={activeTab === 'unavailable' ? styles.whiteText : styles.greyText}>{language.EVOUCHER__TAB_USED_EXPIRED}</Text>
              </Touchable>
            </View>
            { activeTab === 'available' &&
              <View style={styles.filterSection}>
                <View style={styles.searchBox}>
                  <View style={styles.iconStyle}>
                    <SimasIcon name='search-2' style={styles.searchIcon} size={20}/>
                  </View>
                  <TextInput
                    underlineColorAndroid='transparent'
                    onChangeText={this.changeSearch}
                    value={this.state.searchVoucher}
                    maxLength={20}
                    placeholder={language.EVOUCHER__SEARCH_VOUCHER}
                    style={styles.searchText}
                    placeholderTextColor={styles.placeholderText}
                  />
                </View>
                { this.state.sortVoucher ?
                  <View style={styles.sortButtonSelected}>
                    <Text style={styles.pinkText}>{language.EVOUCHER__SORT_VOUCHER}</Text>
                    <Touchable onPress={this.toggleSort} style={styles.cancelButton}>
                      <SimasIcon name='fail-circle' size={15} style={styles.cancelIcon}/>
                    </Touchable>
                  </View>
                  :
                  <Tooltip
                    isVisible={this.state.showSortButton}
                    content={<Touchable onPress={this.toggleSort} style={styles.tooltipButton}>
                      <Text style={styles.greyText}>{language.EVOUCHER__SORT_BY_EXPIRY_DATE}</Text>
                    </Touchable>}
                    placement='bottom'
                    onClose={this.toggleShowButton}
                    arrowSize={{width: 8, height: 8}}
                    contentStyle={styles.tooltipContainer}
                    disableShadow>
                    <Touchable style={styles.sortButton} onPress={this.toggleShowButton}>
                      <View style={styles.sortTextContainer}>
                        <Text style={styles.greyText}>{language.EVOUCHER__SORT_VOUCHER}</Text>
                      </View>
                    </Touchable>
                  </Tooltip>
                }
              </View>
            }
          </View>
        }
        { !loading && !reload && activeTab === 'unavailable' &&
          <View style={styles.warningContainer}>
            <SimasIcon name='alert-circle' size={20} style={styles.warningIcon}/>
            <Text style={styles.warningText}>{language.EVOUCHER__WARNING}</Text>
          </View>
        }
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainer} tabLabel={language.PROFILE__SIMAS_POIN_MYORDER}>
          <MyOrder orderData={orderData} onOrderDetail={onOrderDetail} goToEvoucherDetail={goToEvoucherDetail} expiredRangeConfig={expiredRangeConfig}
            moveVoucher={moveVoucher} activeTab={activeTab} deleteVoucher={deleteVoucher} searchVoucher={this.state.searchVoucher} sortVoucher={this.state.sortVoucher}/>
        </ScrollView>
      </View>
    );
  }
}

export default ShopPage;
