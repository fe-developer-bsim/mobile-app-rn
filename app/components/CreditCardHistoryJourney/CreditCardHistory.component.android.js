import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Text,
  View,
  FlatList,
  Platform
} from 'react-native';
import TransactionItem from '../Transactions/TransactionItemCCInstallment.component';
import styles from './CreditCardHistory.styles';
import {size, isEmpty} from 'lodash';
import {result, startsWith} from 'lodash';
import {creditCardNumberFormat, dateFormatter, generateCcImage} from '../../utils/transformer.util';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {language} from '../../config/language';
import AnimatedElevatedView from '../ElevatedView/AnimatedElevatedView.component';

const HEADER_MAX_HEIGHT = styles.headerMaxHeight;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 170 : 183;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

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
    creditCardDetail: PropTypes.object,
    navigation: PropTypes.object,
  }

  state = {
    scrollY: new Animated.Value(
      // iOS has negative initial scroll value because content inset...
      Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
    ),
    refreshing: false,
    viewOffset: new Animated.Value(HEADER_MAX_HEIGHT)
  }

  renderListItemCurency = () => {
    const {currency} = this.props;
    return currency ? currency : '';
  }
  renderListItemDetailTransaction = () => {
    const {goToDetailTransaction = {}} = this.props;
    return goToDetailTransaction ? goToDetailTransaction : {};
  }

  _navigateToCreditCardTransactionDetail = (param) => {
    const {selectedAccount} = this.props;
    this.props.navigation.navigate('CreditCardTransactionDetail', {selectedAccount: selectedAccount, params: {...param}});
  }

  renderListItem = ({item}, index) => {
    const {transactions = []} = this.props;
    const transactionLength = size(transactions);
    const currency = 'IDR';
    return (<TransactionItem {...item} index={index} currencyCC={currency}
      getDetailTransactionHistory={this.renderListItemDetailTransaction()} key={index}
      transactionLength={transactionLength} hideIcon={true} transactions={item} CCtransDetail={this._navigateToCreditCardTransactionDetail}/>);
  }

  generateColors = (accountNumber = '') => {
    let cardStyle = {color: styles.gradientOrange, image: generateCcImage(accountNumber)};
    if (startsWith(accountNumber, '489372')) {
      cardStyle = {color: styles.gradientBlack, image: generateCcImage(accountNumber)};
    } else if (startsWith(accountNumber, '489373')) {
      cardStyle = {color: styles.gradientGold, image: generateCcImage(accountNumber)};
    } else if (startsWith(accountNumber, '421469')) {
      cardStyle = {color: styles.gradientPink, image: generateCcImage(accountNumber)};
    } else if (startsWith(accountNumber, '421456')) {
      cardStyle = {color: styles.gradientOrange, image: generateCcImage(accountNumber)};
    } else {
      cardStyle = {color: styles.gradientGrey, image: generateCcImage(accountNumber)};
    }
    return cardStyle;
  }

  render () {
    const {transactions = [], selectedAccount = {}} = this.props;
    const {accountNumber = '', name = ''} = selectedAccount;

    const cardExpired = dateFormatter(moment(result(selectedAccount, 'expiryDate', ''), 'YYYYMM'), 'MM/YY');
    const cardStyle = this.generateColors(accountNumber);
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0.5, 0],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -65],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.container}>
        <View style={[styles.placeholderHeader, {backgroundColor: cardStyle.color[0]}]}/>
        <Animated.View
          pointerEvents='none'
          style={[
            styles.header,
            {transform: [{translateY: headerTranslate}]},
          ]}
        >
          <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={cardStyle.color}>
            <AnimatedElevatedView elevation={5} style={[styles.backgroundContainer, {
              opacity: imageOpacity,
              height: HEADER_MAX_HEIGHT - 40
            }]}>
              <Animated.Image
                style={[
                  styles.backgroundImage,
                  {
                    height: HEADER_MAX_HEIGHT - 40
                  },
                ]}
                source={result(cardStyle, 'image', '')}
              />
            </AnimatedElevatedView>
          </LinearGradient>
        </Animated.View>

        <Animated.View
          style={[
            styles.bar,
            {
              marginTop: Platform.OS === 'ios' ? 28 : 38,
              transform: [
                {translateY: titleTranslate},
              ],
            },
          ]}
        >
          <View style={styles.card}>
            <Text style={styles.creditCardAccountNumberValue}>{creditCardNumberFormat(accountNumber)}</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{paddingRight: 5}}>
                <Text style={styles.creditCardExpiryTitle}>Expiry</Text>
                <Text style={styles.creditCardExpiryTitle}>Date</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.creditCardExpiry}>{cardExpired}</Text>
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <Text style={styles.creditCardAccountName}>{name}</Text>
            </View>
          </View>
        </Animated.View>

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
          contentContainerStyle = {{paddingTop: HEADER_MAX_HEIGHT}}
        >
          {
            isEmpty(transactions) ?
              <View style={styles.activityContainer}>
                <Text style={styles.errorText}>
                  {language.DASHBOARD__NOTHING_TO_SHOW}
                </Text>
              </View> :
              <FlatList enableEmptySections
                data={transactions}
                renderItem={this.renderListItem}
              />
          }
        </Animated.ScrollView>
      </View>
    );
  }
}
