import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TextInput,
  Image
} from 'react-native';
import styles from './PaymentHistoryTrfRev.styles';
import {result, isEmpty} from 'lodash';
import {language} from '../../config/language';
import {filterObjectsRemittance} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {SwipeRow} from 'react-native-swipe-list-view';
import trx_icon from '../../assets/images/trx_icon.png';

class Pay extends React.Component {

  static propTypes = {
    billpayHistory: PropTypes.object,
    billerList: PropTypes.array,
    goToIndex: PropTypes.func,
    deleteBillpayHistory: PropTypes.func,
    reloadHistory: PropTypes.func,
    listOfItems: PropTypes.array,
    onSelect: PropTypes.func,
    onDeleteClick: PropTypes.func,
    textKey: PropTypes.string,
    subtextKey: PropTypes.string,
    secondaryTextKey: PropTypes.string,
    payeeStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    disabled: PropTypes.bool,
    placeholderText: PropTypes.string,
    drawer: PropTypes.bool,
    isRemittance: PropTypes.bool,
    swiftCodeTextKey: PropTypes.string
  };

  state = {
    searchFilter: ''
  };

  renderHistory = ({item}) => {
    const {
      onSelect,
      onDeleteClick,
      drawer,
      disabled,
      textKey = '',
      subtextKey = '',
      secondaryTextKey = '',
      isRemittance,
      swiftCodeTextKey = ''
    } = this.props;
    const subtext = result(item, subtextKey, '');
    const text = result(item, textKey, '');
    const secondaryText = result(item, secondaryTextKey, '');
    const swiftCodeText = result(item, swiftCodeTextKey, '');
    const bankNameText = result(item, 'bankName', '');
    return (
      <SwipeRow
        swipeToOpenPercent={10}
        disableRightSwipe={true}
        rightOpenValue={-54}
      >
        {drawer ? null : (
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingRight: 2
            }}
          >
            <Touchable onPress={onDeleteClick(item)} style={styles.trash}>
              <SimasIcon name='trash' style={styles.whiteIcon} size={24} />
            </Touchable>
          </View>
        )}
        {isRemittance ? (
          <View style={styles.containerHistory}>
            <Touchable
              onPress={onSelect(item)}
              disabled={disabled}
              style={styles.historyItem}
              highlightOpacity={1}
            >
              <Image source={trx_icon} style={styles.imgIcon} />
              <View style={styles.flex}>
                <Text style={styles.subNoRemittance}>{text}</Text>
                <Text style={styles.subtextRemittance}>{subtext}</Text>
              </View>
              <View style={styles.billerDetailsRemittance}>
                <View style={styles.flex}>
                  <Text style={styles.billerNameRemittance}>
                    {bankNameText}
                  </Text>
                  <Text style={styles.swiftCodeRemittance}>
                    {swiftCodeText}
                  </Text>
                </View>
                <SimasIcon name='arrow' style={styles.arrowDownStyle} />
              </View>
            </Touchable>
          </View>
        ) : (
          <View style={styles.containerHistory}>
            <Touchable
              onPress={onSelect(item)}
              disabled={disabled}
              style={styles.historyItem}
              highlightOpacity={1}
            >
              <SimasIcon name='new-send' style={styles.testIcon} size={24}/>
              <View style={styles.flex}>
                <Text style={styles.subNo}>{text}</Text>
                <Text style={styles.subtext}>{subtext}</Text>
              </View>
              <View style={styles.billerDetails}>
                <Text style={styles.billerName}>{secondaryText}</Text>
              </View>
            </Touchable>
          </View>
        )}
      </SwipeRow>
    );
  };

  filterChange = (searchFilter) => {
    this.setState({searchFilter});
  };

  render () {
    const {
      listOfItems,
      payeeStatus,
      reloadHistory,
      placeholderText
    } = this.props;
    const {searchFilter} = this.state;
    const history = filterObjectsRemittance(listOfItems, searchFilter);
    return (
      <View style={styles.containerTrf}>
        <Text style={styles.title}>{language.REV_PAYMENT_HISTORY__TITLE}</Text>
        <View style={styles.filterBox}>
          <TextInput
            underlineColorAndroid='transparent'
            onChangeText={this.filterChange}
            value={this.state.searchFilter}
            maxLength={20}
            placeholder={placeholderText}
            style={styles.filterTextInput}
          />
          <View style={styles.iconStyle}>
            <SimasIcon name='magnifier' style={styles.searchIcon} size={20}/>
          </View>
        </View>
        {payeeStatus === 'loading' ? 
          <View style={styles.activityContainer}>
            <ActivityIndicator size='large' />
          </View>
          : payeeStatus === 'error' ? 
            <Touchable onPress={reloadHistory} style={styles.activityContainer}>
              <Text style={styles.errorText}>
                {language.PAY_BILLS__HISTORY_ERROR}
                <Text style={styles.reloadText}>{language.PAY_BILLS__HISTORY_RELOAD}</Text>
              </Text>
            </Touchable>
            :
            ((listOfItems.length > 0 && payeeStatus === 'success') || (listOfItems.length > 0 && isEmpty(payeeStatus))) ?
              <View style={styles.containerHistory}>
                <FlatList
                  data={history}
                  renderItem={this.renderHistory} removeClippedSubviews={false}/>
              </View>
              :
              <View style={styles.activityContainer}>
                <Text style={styles.errorText}>
                  {language.PAY_BILLS__HISTORY_NOTHING}
                </Text>
              </View>
        }
      </View>
    );
  }
}

export default Pay;