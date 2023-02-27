import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {language} from '../../config/language';
import styles from './Summary.styles';
import {getGroupedAccountsSum, currencyFormatter, currencySymbol, formatForexAmount} from '../../utils/transformer.util';
import result from 'lodash/result';
import Touchable from '../../components/Touchable.component';
import isEmpty from 'lodash/isEmpty';
import SimasIcon from '../../assets/fonts/SimasIcon';
import BackgroundTimer from 'react-native-background-timer';
import Collapsible from 'react-native-collapsible';
// import portofolioIcon from '../../assets/images/portofolio.png';

const totalSeconds = 60;

class Summary extends React.Component {
  static propTypes = {
    accounts: PropTypes.object,
    userName: PropTypes.string,
    simasPoin: PropTypes.object,
    inquirySimasPoin: PropTypes.func,
    SimasPoinHistory: PropTypes.func,
    loadBalances: PropTypes.func,
    goBack: PropTypes.func
  }

  state = {
    secondsRemaining: totalSeconds,
    disabled: false,
    summaryCollapsed: true,
    forexCollapsed: true,
    minHeight: 50,
    maxHeight: 100
  }

  tick = () => {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      this.setState({disabled: false});
    } else {
      this.setState({disabled: true});
    }
  }

  componentDidMount = () => {
    this.setState({disabled: false});
  }

  componentWillUnmount = () => {
    BackgroundTimer.clearInterval(this.interval);
  }

  reloadSimaspoin = () => {
    const {inquirySimasPoin} = this.props;
    this.setState({disabled: true});
    return inquirySimasPoin().then(() => {
      this.interval = BackgroundTimer.setInterval(this.tick, 1000);
      this.setState({
        secondsRemaining: totalSeconds,
        reload: false
      });
    }).catch(() => {
      this.setState({
        secondsRemaining: 0,
        reload: false,
      });
    });
  }

  _handleRef = (ref) => {
    this.contentHandle = ref;
  }

  summaryCollapse = () => {
    this.setState({summaryCollapsed: !this.state.summaryCollapsed});
  }

  forexCollapse = () => this.setState({forexCollapsed: !this.state.forexCollapsed})

  currencies = {
    USD: 'US Dollar',
    SGD: 'Singapore Dollar',
    AUD: 'Australian Dollar',
    EUR: 'Euro',
    JPY: 'Japanese Yen',
    CNY: 'Chinese Yuan',
    NZD: 'New Zealand Dollar'
  }

  getForexBalances = () => {
    const {accounts} = this.props;
    const accountTypeSum = getGroupedAccountsSum(accounts);
    const forexBalances = result(accountTypeSum, 'forex', {});
    return Object.keys(forexBalances).map((currency, i) => (<View style={styles.rowForex} key={i}>
      <Text style={styles.title}>{this.currencies[currency]}</Text>
      <Text style={styles.value}>{`${currencySymbol(currency)} ${formatForexAmount(forexBalances[currency], currency)}`}</Text>
    </View>));
  }

  render () {
    const {accounts, goBack} = this.props;
    const accountTypeSum = getGroupedAccountsSum(accounts);
    const forexBalances = result(accountTypeSum, 'forex', {});
    const summaryIconStyle = this.state.summaryCollapsed ? styles.iconCollapsedStyle : styles.accordionIcon;
    const summaryText = this.state.summaryCollapsed ? 'Show Detail' : 'Hide Detail';
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.titleContainer}>
            <Touchable onPress={goBack}>
              <View style={[styles.containerButtonHome]}>
                <SimasIcon name={'new-home-active'} size={35} style={[styles.collapsibleButtonHome]}/>
                <Text style={styles.textHome}>HOME</Text>
              </View>
            </Touchable>
            <View style={styles.nameContainer} >
              <Text style={styles.welcome}>Summary Portofolio</Text>
              <Touchable onPress={this.summaryCollapse} style={[styles.collapsibleContainer]}>
                <Text style={styles.details}>{summaryText}</Text>
                <View style={summaryIconStyle}>
                  <SimasIcon name={'chevron'} size={20} style={[styles.collapsibleButton]}/>
                </View>
              </Touchable>
            </View>
          </View>
        </View>
        <Collapsible collapsed={this.state.summaryCollapsed} refName='summary'>
          <View style={ isEmpty(forexBalances) ? styles.summary : styles.summaryForex}>
            <View style={styles.borderGreyTop}/>
            <View style={styles.row}>
              <Text style={styles.title}>{language.DASHBOARD__ACCOUNT_SAVING}</Text>
              <Text style={styles.value}>Rp {(accountTypeSum.savingAccount === 0) === true ? '--' : isEmpty(accountTypeSum.savingAccount) ? currencyFormatter(accountTypeSum.savingAccount) : '--'}</Text>
            </View>
            <View style={styles.paddingSpace} />
            <View style={styles.row}>
              <Text style={styles.title}>{language.DASHBOARD__ACCOUNT_CURRENT}</Text>
              <Text style={styles.value}>Rp {(accountTypeSum.currentAccount === 0) === true ? '--' : isEmpty(accountTypeSum.currentAccount) ? currencyFormatter(accountTypeSum.currentAccount) : '--'}</Text>
            </View>
            <View style={styles.paddingSpace} />
            <View style={styles.row}>
              <Text style={styles.title}>{language.DASHBOARD__ACCOUNT_TIME_DEPOSIT}</Text>
              <Text style={styles.value}>Rp {(accountTypeSum.timeDepositAccount === 0) === true ? '--' : isEmpty(accountTypeSum.timeDepositAccount) ? currencyFormatter(accountTypeSum.timeDepositAccount) : '--'}</Text>
            </View>
            <View style={styles.paddingSpace} />
            <View style={styles.row}>
              <Text style={styles.title}>{language.DASHBOARD__RDN_LONG}</Text>
              <Text style={styles.value}>Rp {(accountTypeSum.rdn === 0) === true ? '--' : currencyFormatter(accountTypeSum.rdn)}</Text>
            </View>
          </View>
          {isEmpty(forexBalances) ? null : <View>
            <Collapsible collapsed={false}>
              <View style={styles.forexDetails}>
                {this.getForexBalances()}
              </View>
            </Collapsible>
          </View>}
        </Collapsible>
        {/* <Touchable onPress={this.summaryCollapse} style={[styles.collapsibleContainer]}>
          <View style={summaryIconStyle}>
            <SimasIcon name={'chevron'} size={25} style={[styles.collapsibleButton]}/>
          </View>
        </Touchable> */}
      </View>
    );
  }
}

export default Summary;
