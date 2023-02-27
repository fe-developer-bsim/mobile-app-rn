import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, FlatList} from 'react-native';
import {language} from '../../config/language';
import styles from './ShareReferralCodeMgm.styles';
import {isEmpty, result, size, find, map} from 'lodash';
import {listViewComparator} from '../../utils/transformer.util';
import TransactionItemMgm from './TransactionItemPageMgm.component';
import * as actionCreators from '../../state/actions/index.actions.js';

export const fields = {
  FILTERMODE: 'selectedRanged',
};

class MyHistoryReward extends React.Component {
  static propTypes = {
    transactions: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
    radioOptions: PropTypes.array,
    formFilterValue: PropTypes.object,
    continueToCalendarPage: PropTypes.func,
    filterDate: PropTypes.string,
    filterStarDate: PropTypes.string,
    filterEndDate: PropTypes.string,
    getMyHistoryReward: PropTypes.func,
    claimRewardBalance: PropTypes.object,
    getDefaultDateHistory: PropTypes.func,
    getInformation: PropTypes.func,
    getFilterDate: PropTypes.func,
    goToDetailHistoryReward: PropTypes.func,
    SimasPoinHistory: PropTypes.func,
  }

  state = {
    isModalVisible: false,
    isSeeMore: false,
  }


  comparator = listViewComparator

  openModal = () => {
    this.setState({isModalVisible: true});
  }

  closeModal = () => {
    this.setState({isModalVisible: false});
  }

  openHistory = () => {
    const {isSeeMore} = this.state;
    if (isSeeMore) {
      this.setState({isSeeMore: false});
    } else {
      this.setState({isSeeMore: true});
    }
  }

  goToClaimRewardNow = () => {
    const {dispatch, getDefaultDateHistory} = this.props;
    dispatch(getDefaultDateHistory);
  }

  goToInformation = () => {
    const {dispatch, getInformation} = this.props;
    dispatch(getInformation);
  }

  renderListItemDetailTransaction = () => {
    const {goToDetailHistoryReward = {}} = this.props;
    return goToDetailHistoryReward ? goToDetailHistoryReward : {};
  }

  renderListItem = ({item}, index) => {
    const {transactions} = this.props;
    const formMyHistoryReward = 'myHistoryReward';
    const transactionLength = size(transactions);
    return (<TransactionItemMgm {...item} index={index}
      getDetailTransactionHistory={this.renderListItemDetailTransaction()} key={index}
      transactionLength={transactionLength} formMyHistoryReward={formMyHistoryReward}/>);
  }


  render () {
    const {transactions, claimRewardBalance, dispatch, SimasPoinHistory} = this.props;
    let total = 0;
    const totalRewardInvite = result(claimRewardBalance, 'totalReward', []);
    const eventAndPoin = result(claimRewardBalance, 'eventAndPoin', []);
    const checkingPoint = map(eventAndPoin, (obj) => {
      map(totalRewardInvite, (item) => {
        const eventReward = result(item, 'eventName', '');
        const eventTotal = result(item, 'totalReward', '');
        const eventAndPoinName = obj.split(':')[0];
        const eventAndPoinReward = obj.split(':')[1];
        const isReward = eventReward === eventAndPoinName;
        if (isReward) {
          const allTotal = eventTotal * eventAndPoinReward;
          total = allTotal + total;
        }
        return total, checkingPoint;
      });
    });
    const rewardInviteSaving = find(totalRewardInvite, {eventName: 'opensavingaccount'});
    const totalInviteSaving = result(rewardInviteSaving, 'totalReward', '');
    const totalBonusRewardPoin = result(claimRewardBalance, 'eventTiering', '').split('&');
    const totalBonusPoinOne = parseInt(result(totalBonusRewardPoin, '[0]', '').split(':')[0]);
    const totalBonusRewardPoinOne = parseInt(result(totalBonusRewardPoin, '[0]', '').split(':')[1]);
    const totalBonusPoinTwo = parseInt(result(totalBonusRewardPoin, '[1]', '').split(':')[0]);
    const totalBonusRewardPoinTwo = parseInt(result(totalBonusRewardPoin, '[1]', '').split(':')[1]);
    const totalBonusPoinThree = parseInt(result(totalBonusRewardPoin, '[2]', '').split(':')[0]);
    const totalBonusRewardPoinThree = parseInt(result(totalBonusRewardPoin, '[2]', '').split(':')[1]);

    let arrayTwo = [];
    if (!isEmpty(transactions)) {
      arrayTwo = transactions.slice(0, 2);
    }
    // const disableButtonClaim = total === 0;
    const totalPoinCustomer = [];
    if (totalInviteSaving < totalBonusPoinOne && totalInviteSaving < totalBonusPoinTwo && totalInviteSaving < totalBonusPoinThree) {
      const totalPoinCustomerss = total;
      totalPoinCustomer['totalPoinSuccess'] = totalPoinCustomerss;
      dispatch(actionCreators.getSaveTotalReward(totalPoinCustomer));
    }
    if (totalInviteSaving >= totalBonusPoinOne) {
      const totalPoinCustomerss = total + totalBonusRewardPoinOne;
      totalPoinCustomer['totalPoinSuccess'] = totalPoinCustomerss;
      dispatch(actionCreators.getSaveTotalReward(totalPoinCustomer));
    }
    if (totalInviteSaving >= totalBonusPoinTwo) {
      const totalPoinCustomerss =  total + totalBonusRewardPoinTwo;
      totalPoinCustomer['totalPoinSuccess'] = totalPoinCustomerss;
      dispatch(actionCreators.getSaveTotalReward(totalPoinCustomer));
    }
    if (totalInviteSaving >= totalBonusPoinThree) {
      const totalPoinCustomerss = total + totalBonusRewardPoinThree;
      totalPoinCustomer['totalPoinSuccess'] = totalPoinCustomerss;
      dispatch(actionCreators.getSaveTotalReward(totalPoinCustomer));
    }
    
    // const tierBox = result(claimRewardBalance, 'tierBox', '');

    return (
      <ScrollView style={styles.flex}>
        <View style={styles.backgroundColor1}/>
        <View style={styles.containerSuccessInvite}>
          <View style={styles.successInvite}>
            <Text style={styles.textSuccessInvite}>{language.MGM__CLAIM_SUCCESS_INVITE}</Text>
            <Text style={styles.textReward}>{totalInviteSaving}</Text>
            <Text style={styles.textCustomer}>{language.MGM__CLAIM_CUSTOMER}</Text>
            <Text style={styles.textSuccessEarn}>{language.MGM__CLAIM_SUCCESS_EARN}</Text>
            <Text style={styles.textReward}>{totalPoinCustomer.totalPoinSuccess}</Text>
            <Text style={styles.textPoin}>poin</Text>

            <View>
              <View style={styles.buttonClaimRewardDisabled}>
                <View>
                  <Text style={styles.buttonTextClaim}>{language.MGM__REWARD_RECORD}</Text>
                  <Text style={styles.buttonTextClaim}>{language.MGM__REWARD_RECORD2}</Text>
                  <View style={styles.rowCenterHere}>
                    <Text style={styles.buttonTextClaim}>{language.MGM__REWARD_RECORD3} </Text>
                    <Text onPress={SimasPoinHistory} style={styles.buttonTextClaimHere}>{language.MGM__REWARD_RECORD_HERE}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.lastReward}>
          <Text style={styles.textLastReward}>{language.MGM__CLAIM_LAST_REWARD}</Text>
          {isEmpty(arrayTwo) ?
            <View>
              <Text style={styles.textEmpty}>No Content</Text>
              <Text style={styles.textEmptys}>{language.MGM__HISTORY_CLAIM}</Text>
            </View>
            :
            <FlatList enableEmptySections
              data={this.state.isSeeMore ? transactions : arrayTwo}
              renderItem={this.renderListItem}
            />
          }
          {isEmpty(arrayTwo) ? null : this.state.isSeeMore ?
            <Text onPress={this.openHistory} style={styles.textSeeMore}>{language.MGM__HISTORY_LIST_HIDE}</Text>
            :
            <Text onPress={this.openHistory} style={styles.textSeeMore}>{language.MGM__HISTORY_LIST_SEE_MORE}</Text>
          }
        </View>
      </ScrollView>
    );
  }
}

export default (MyHistoryReward);
