import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View, Image, Text, RefreshControl} from 'react-native';
import {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {language} from '../../config/language';
import EmoneyCard from '../EmoneyJourney/EmoneyCard.component';
import styles from './EmoneyDashboard.styles';
import {wrapObjectInFunction} from '../../utils/transformer.util';
import startsWith from 'lodash/startsWith';
import Touchable from '../../components/Touchable.component';
import LinearGradient from 'react-native-linear-gradient';
import EmoneySummary from '../EmoneyJourney/EmoneySummary.component';
import {theme} from '../../styles/core.styles';
import savingThumbnail from '../../assets/images/thumbnail_saving.png';
import emoneySend from '../../assets/images/emoney_send.png';
import emoneyUpgrade from '../../assets/images/emoney_upgrade.png';
import emoneyWithdraw from '../../assets/images/emoney_withdraw.png';

class Dashboard extends React.Component {
  static propTypes = {
    userName: PropTypes.string,
    cif: PropTypes.string,
    accounts: PropTypes.array,
    emoney: PropTypes.object,
    getBalanceEmoney: PropTypes.func,
    showUpgradeEmoney: PropTypes.func,
    showUpgradeFull: PropTypes.func,
    cardLessWithdrawal: PropTypes.func,
    topUp: PropTypes.func,
    onDashboardRefresh: PropTypes.func,
    refreshing: PropTypes.bool,
    goToEmoneyHistoryNavigate: PropTypes.func,
    goToTopUp: PropTypes.func,
    goUpgrade: PropTypes.func,
    openSaving: PropTypes.func,
    nav: PropTypes.object,
    dashboardRefreshing: PropTypes.bool,
    showEmoneyOffer: PropTypes.func,
    simasPoin: PropTypes.object,
    inquirySimasPoin: PropTypes.func,
    SimasPoinHistory: PropTypes.func,
    currLanguage: PropTypes.object,
    setDefaultAccEmoney: PropTypes.func
  }

  renderTabBar = wrapObjectInFunction(<ScrollableTabBar />)

  openSaving = () => {
    const {nav, openSaving} = this.props;
    openSaving(nav);
  }
  render () {
    const {userName, dashboardRefreshing = false, emoney, cif, goToEmoneyHistoryNavigate, getBalanceEmoney, showUpgradeEmoney, cardLessWithdrawal, topUp,
      onDashboardRefresh, showEmoneyOffer, simasPoin, inquirySimasPoin, SimasPoinHistory, goUpgrade, goToTopUp,
      currLanguage, setDefaultAccEmoney} = this.props;
    const isVerified = !startsWith(cif, 'NK');
    return (
      <ScrollView keyboardShouldPersistTaps='handled' style={styles.container}
        refreshControl={<RefreshControl refreshing={dashboardRefreshing} onRefresh={onDashboardRefresh}
          tintColor={theme.brand} colors={[theme.brand]} enabled/>}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={styles.gradientGrey} style={styles.header}>
          <EmoneySummary emoney={emoney} userName={userName} simasPoin={simasPoin} inquirySimasPoin={inquirySimasPoin} SimasPoinHistory={SimasPoinHistory}/>
          <EmoneyCard emoney={emoney} cif={cif} showOffer={showEmoneyOffer} getBalanceEmoney={getBalanceEmoney}
            showUpgradeEmoney={showUpgradeEmoney} cardLessWithdrawal={cardLessWithdrawal} topUp={topUp}
            goToEmoneyHistoryNavigate={goToEmoneyHistoryNavigate} goUpgrade={goUpgrade} goToTopUp={goToTopUp} 
            setDefaultAccEmoney={setDefaultAccEmoney}/>
        </LinearGradient>
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>{language.EMONEY__GET_BENEFIT}</Text>

          {isVerified ?
            <View style={styles.cardsContainer}>
              <Image source={savingThumbnail} style={styles.thumbnailImage} />
              <View style={styles.flexGrow}>
                <View style={styles.thumbnailDetail}>
                  <View style={styles.thumbnail}>
                    <Text style={styles.thumbnailTitle}>{language.DASHBOARD__ACCOUNT_SAVING}</Text>
                    <Text style={styles.thumbnailText}>{language.EMONEY__UPGRADE_BENEFIT}</Text>
                  </View>
                  <Touchable onPress={this.openSaving}>
                    <Text style={styles.redTextEnd}>APPLY</Text>
                  </Touchable>
                </View>
              </View>
            </View>
            :
            <View>
              <View style={styles.cardsContainer}>
                <Image source={emoneySend} style={styles.thumbnailImage} />
                <View style={styles.flexGrow}>
                  <View style={styles.thumbnailDetail}>
                    <View style={styles.thumbnailNK}>
                      <Text style={styles.thumbnailText}>{language.EMONEY__MAX_BALANCE}
                        <Text style={styles.thumbnailMedium}>{language.EMONEY__MAX_BALANCE_AMOUNT}</Text>
                      </Text>
                    </View>
                    <Touchable onPress={goUpgrade}>
                      <Text style={styles.redTextEnd}>{language.EMONEY__DASHBOARD_UPGRADE_NOW}</Text>
                    </Touchable>
                  </View>
                </View>
              </View>

              <View style={styles.cardsContainer}>
                <Image source={emoneyUpgrade} style={styles.thumbnailImage} />
                <View style={styles.flexGrow}>
                  <View style={styles.thumbnailDetail}>
                    <View style={styles.thumbnailNK}>
                      <Text style={styles.thumbnailText}>{language.EMONEY__TRANSFER_MONEY}
                        <Text style={styles.thumbnailMedium}>{language.EMONEY__TRANSFER_MONEY_PHONE}</Text>
                        {language.EMONEY__TRANSFER_AND}
                        <Text style={styles.thumbnailMedium}>{language.EMONEY__TRANSFER_OTHER_BANKS}</Text>
                      </Text>
                    </View>
                    <Touchable onPress={goUpgrade}>
                      <Text style={styles.redTextEnd}>{language.EMONEY__DASHBOARD_UPGRADE_NOW}</Text>
                    </Touchable>
                  </View>
                </View>
              </View>

              <View style={styles.cardsContainer}>
                <Image source={emoneyWithdraw} style={styles.thumbnailImage} />
                <View style={styles.flexGrow}>
                  <View style={styles.thumbnailDetail}>
                    {currLanguage.id === 'en' ?
                      <View style={styles.thumbnailNK}>
                        <Text style={styles.thumbnailText}>{language.EMONEY__WITHDRAW}
                          <Text style={styles.thumbnailMedium}>{language.EMONEY__WITHDRAW_FREE}</Text>
                        </Text>
                      </View> :
                      <View style={styles.thumbnailNK}>
                        <Text style={styles.thumbnailText}>
                          <Text style={styles.thumbnailMedium}>{language.EMONEY__WITHDRAW_FREE}</Text>
                          {language.EMONEY__WITHDRAW}
                        </Text>
                      </View>
                    }

                    <Touchable onPress={goUpgrade}>
                      <Text style={styles.redTextEnd}>{language.EMONEY__DASHBOARD_UPGRADE_NOW}</Text>
                    </Touchable>
                  </View>
                </View>
              </View>
            </View>
          }
        </View>
      </ScrollView>
    );
  }
}

export default Dashboard;
