import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import styles from './DetailTransactionMgm.styles';
import {result} from 'lodash';
import REWARD from '../../assets/images/REWARD.png';
import {language} from '../../config/language';


class DetailTransactionMgmComponent extends React.Component {
  static propTypes = {
    navParams: PropTypes.object,
    profile: PropTypes.object
  }

  render () {
    const {navParams, profile} = this.props;
    const referralUser = result(navParams, 'detailData.referralUser', '');
    const poinType = result(navParams, 'detailData.poinType', '');
    const redeemPoin = result(navParams, 'detailData.redeemPoin', '');
    const event = result(navParams, 'detailData.event', '');
    const date = result(navParams, 'detailData.date', '');
    const name = result(profile, 'name', '');
    const status = result(navParams, 'detailData.status', '');
    const transactionType = result(navParams, 'detailData.transactionType') === 'Debit';
    const totalRedeemPoin = result(navParams, 'detailData.totalRedeemPoin', '');

    return (
      <ScrollView style={styles.flex}>
        <View style={styles.backgroundColor1} />
        <View style={styles.lastReward}>
          <View style={styles.rowIcon}>
            <View>
              <Image source={REWARD} style={styles.pictureIcon}/>
            </View>
            <View style={styles.detailsTextContainer}>
              <Text style={styles.textPoinType}>{poinType}</Text>
              <Text style={styles.textRedeemPoin}>+{redeemPoin} POIN</Text>
              <View>
                <Text style={styles.textSimasPoin}>{language.MGM__DETAIL_CREDIT_TO}</Text>
                <Text style={styles.valueReferralUser}>{name}</Text>
                <Text style={styles.textSimasPoin}>{poinType}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.containerBanner}>
          {
            transactionType ? 
              <View>
                <Text style={styles.textDetailReward}>{language.MGM__DETAIL_REWARD}</Text>
                <View style={styles.containerReferralUser}>
                  <Text style={styles.textReferralUser}>{language.MGM__DETAIL_EVENT_NAME}</Text>
                  <Text style={styles.valueReferralUser}>{event}</Text>
                </View>
                <View style={styles.containerLine}/>
                <View style={styles.containerReferralUser}>
                  <Text style={styles.textReferralUser}>{language.MGM__DETAIL_STATUS_REFERRAL}</Text>
                  <Text style={styles.valueReferralUser}>{totalRedeemPoin} {language.MGM__INVITING_PRODUCTS}</Text>
                </View> 
                <View style={styles.containerLine}/>
                <View style={styles.containerReferralUser}>
                  <Text style={styles.textReferralUser}>{language.MGM__DETAIL_DATE}</Text>
                  <Text style={styles.valueReferralUser}>{date}</Text>
                </View>
                <View style={styles.containerLine}/>
              </View>
              : 
              <View>
                <Text style={styles.textDetailReward}>{language.MGM__DETAIL_REFERRAL_FRIEND}</Text>
                <View style={styles.containerReferralUser}>
                  <Text style={styles.textReferralUser}>{language.MGM__DETAIL_REFERRAL_USER}</Text>
                  <Text style={styles.valueReferralUser}>{referralUser}</Text>
                </View>
                <View style={styles.containerLine}/>
                <View style={styles.containerReferralUser}>
                  <Text style={styles.textReferralUser}>{language.MGM__DETAIL_EVENT_NAME}</Text>
                  <Text style={styles.valueReferralUser}>{event}</Text>
                </View>
                <View style={styles.containerLine}/>
                <View style={styles.containerReferralUser}>
                  <Text style={styles.textReferralUser}>{language.MGM__DETAIL_STATUS_REFERRAL}</Text>
                  <Text style={styles.valueReferralUser}>{status}</Text>
                </View> 
                <View style={styles.containerLine}/>
                <View style={styles.containerReferralUser}>
                  <Text style={styles.textReferralUser}>{language.MGM__DETAIL_DATE}</Text>
                  <Text style={styles.valueReferralUser}>{date}</Text>
                </View>
                <View style={styles.containerLine}/>
              </View>
          }
        </View>
      </ScrollView>
    );
  }
}

export default (DetailTransactionMgmComponent);
