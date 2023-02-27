import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Platform,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import TransactionItem from './TransactionItemPage.component';
import styles from './Transactions.styles';
import {size, isEmpty, noop} from 'lodash';
import {language} from '../../config/language';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Tooltip from 'react-native-walkthrough-tooltip';

const HEADER_MAX_HEIGHT = styles.headerMaxHeight;

export default class Transactions extends Component {
  static propTypes = {
    transactions: PropTypes.array,
    goToDetailTransaction: PropTypes.func,
    currency: PropTypes.string,
    isShariaAccount: PropTypes.bool,
    selectedAccount: PropTypes.object,
    header: PropTypes.string,
    goToFilter: PropTypes.func,
    selectedFilterType: PropTypes.number,
    goToCloseSimasTara: PropTypes.func,
    data: PropTypes.object,
    productType: PropTypes.string,
    estimatedInterest: PropTypes.string,
    serverTime: PropTypes.string,
    moreInfo: PropTypes.func,
    filterText: PropTypes.string,
  }

  state = {
    scrollY: new Animated.Value(
      // iOS has negative initial scroll value because content inset...
      Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
    ),
    refreshing: false,
    viewOffset: new Animated.Value(HEADER_MAX_HEIGHT),
    toolTipVisible: false
  }

  renderListItemCurency = () => {
    const {currency} = this.props;
    return currency ? currency : '';
  }
  renderListItemDetailTransaction = () => {
    const {goToDetailTransaction = {}} = this.props;
    return goToDetailTransaction ? goToDetailTransaction : {};
  }

  renderListItem = (item, index) => {
    const {transactions} = this.props;
    const transactionLength = size(transactions);
    return (<TransactionItem {...item} index={index} currency={this.renderListItemCurency()}
      getDetailTransactionHistory={this.renderListItemDetailTransaction()} key={index}
      isShariaAccount={this.props.isShariaAccount} transactionLength={transactionLength}/>);
  }

  render () {
    const {transactions = [], goToFilter = noop, filterText} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.placeholderHeader}/>
        <Animated.ScrollView
          style={[styles.transactionContainer]}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{nativeEvent: {
              contentOffset: {
                y: this.state.scrollY
              }
            }}],
            {useNativeDriver: true},
          )}
        >
          {
            <View>
              <View style={styles.headerRow}>
                <Text style={styles.bold}>{language.DASHBOARD__TRANSACTION_HEADER}</Text>
                <View style={styles.tooltipView}>
                  <Tooltip
                    animated={true}
                    arrowSize={{width: 0, height: 0}}
                    isVisible={this.state.toolTipVisible}
                    content={<Text style={styles.contentTextStyle}>{language.DASHBOARD_TOOLTIP_TRANSACTION_HEADER_HISTORY}</Text>}
                    placement='bottom'
                    contentStyle={{backgroundColor: 'black'}}
                    backgroundColor='rgba(0,0,0,0)'
                    // eslint-disable-next-line react/jsx-no-bind
                    onClose={() => this.setState({toolTipVisible: false})}
                    tooltipStyle={{width: 280, alignItems: 'flex-end', paddingHorizontal: 30, marginRight: 20}}
                  >
                    <TouchableOpacity
                      // eslint-disable-next-line react/jsx-no-bind
                      onPress={() => this.setState({toolTipVisible: true})}>
                      <View style={styles.showInformation}>
                        <SimasIcon name={'caution-reverse'} size={22} style={styles.infoIcon}/>
                      </View>
                    </TouchableOpacity>
                  </Tooltip>
                </View>
                <Touchable onPress={goToFilter}>
                  <SimasIcon name='filter' style={styles.filterIcon} size={20} />
                </Touchable>
              </View>
              <Text>{filterText}</Text>
              <View style={styles.lowExtraPadding} />
              {
                isEmpty(transactions) ?
                  <View style={styles.activityContainer}>
                    <Text style={styles.errorText}>
                      {language.DASHBOARD__NOTHING_TO_SHOW}
                    </Text>
                  </View>
                  :
                  transactions.map(this.renderListItem)
              }
            </View>
          }
        </Animated.ScrollView>
      </View>
    );
  }
}
