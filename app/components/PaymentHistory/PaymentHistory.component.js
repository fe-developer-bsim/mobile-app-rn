import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, ActivityIndicator, FlatList, TextInput} from 'react-native';
import styles from './PaymentHistory.styles';
import {result, find, includes, filter, isEmpty, toUpper} from 'lodash';
import {language} from '../../config/language';
import {listViewComparator} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {SwipeRow} from 'react-native-swipe-list-view';

class Pay extends React.Component {

  static propTypes = {
    billpayHistory: PropTypes.object,
    billerList: PropTypes.array,
    goToIndex: PropTypes.func,
    deleteBillpayHistory: PropTypes.func,
    reloadHistory: PropTypes.func,
    drawer: PropTypes.bool,
    dtActionNameHistory: PropTypes.string,
  }

  state = {
    searchFilter: ''
  }

  comparator = listViewComparator

  renderHistory = ({item}) => {
    const {billerList, goToIndex, deleteBillpayHistory, drawer, dtActionNameHistory} = this.props;
    const subscriberNo = result(item, 'subscriberNo', '');
    const description = result(item, 'description', '');
    const biller = find(billerList, (biller) => biller.id === item.billerId);
    const billerName = result(biller, 'name', '');
    return (
      <SwipeRow swipeToOpenPercent={10} disableRightSwipe={true} rightOpenValue={-54}>
        {
          drawer ?
            null
            :
            <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
              <Touchable onPress={deleteBillpayHistory(item)} style={styles.trash}>
                <SimasIcon name='trash' style={styles.whiteIcon} size={24}/>
              </Touchable>
            </View>
        }

        <Touchable dtActionName={dtActionNameHistory} onPress={goToIndex(biller, subscriberNo, description)} style={styles.historyItem} highlightOpacity={1}>
          <View>
            <Text style={styles.desc}>{description}</Text>
          </View>
          <View style={styles.historyItemRow}>
            <View style={styles.flex}>
              <Text style={styles.subNo}>{subscriberNo}</Text>
            </View>
            <View style={styles.billerDetails}>
              <Text style={styles.billerName}>{billerName}</Text>
              <SimasIcon name='arrow' style={styles.redArrow} size={10}/>
            </View>
          </View>
        </Touchable>
      </SwipeRow>
    );
  }

  filterChange = (searchFilter) => {
    this.setState({searchFilter});
  }

  render () {
    const {billpayHistory, billerList, reloadHistory} = this.props;
    const {searchFilter} = this.state;
    const status = result(billpayHistory, 'status', 'loading');
    const history = filter(result(billpayHistory, 'savedBillPaymentList', []), (item) => {
      const biller = find(billerList, (biller) => biller.id === item.billerId);
      const billerName = result(biller, 'name', '');
      const description = result(item, 'description', '');
      return includes(toUpper(description), toUpper(searchFilter)) || includes(item.subscriberNo, searchFilter) || includes(toUpper(billerName), toUpper(searchFilter));
    });
    return (
      <View style={styles.container}>
        <View style={styles.separator}>
          <View style={styles.separatorLine}/>
          <View style={styles.separatorTextContainer}>
            <Text style={styles.separatorText}>{language.PAY_BILLS__OR}</Text>
          </View>
          <View style={styles.separatorLine}/>
        </View>
        <Text style={styles.title}>{language.PAYMENT_HISTORY__TITLE}</Text>
        <View style={styles.filterBox}>
          <TextInput underlineColorAndroid='transparent' onChangeText={this.filterChange}
            value={this.state.searchFilter} maxLength={20} placeholder={language.PAY_BILLS__SEARCH_PLACEHOLDER}
            style={styles.filterTextInput}/>
          <View style={styles.iconStyle}>
            <SimasIcon name='magnifier' style={styles.searchIcon} size={20}/>
          </View>
        </View>
        {
          status === 'loading' ?
            <View style={styles.activityContainer}>
              <ActivityIndicator size='large'/>
            </View>
            : status === 'error' ?
              <Touchable onPress={reloadHistory} style={styles.activityContainer}>
                <Text style={styles.errorText}>
                  {language.PAY_BILLS__HISTORY_ERROR}
                  <Text style={styles.reloadText}>{language.PAY_BILLS__HISTORY_RELOAD}</Text>
                </Text>
              </Touchable>
              : isEmpty(history) ?
                <View style={styles.activityContainer}>
                  <Text style={styles.errorText}>
                    {language.PAY_BILLS__HISTORY_NOTHING}
                  </Text>
                </View>
                :
                <View>
                  <FlatList
                    data={history}
                    renderItem={this.renderHistory} removeClippedSubviews={false} />
                </View>
        }
      </View>
    );
  }
}

export default Pay;
