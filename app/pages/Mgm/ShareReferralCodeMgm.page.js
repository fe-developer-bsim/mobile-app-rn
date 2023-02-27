import React from 'react';
import PropTypes from 'prop-types';
import ShareReferralCodeComponent from '../../components/Mgm/ShareReferralCodeMgm.component';
import {result, startsWith, isEmpty, find} from 'lodash/';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {goRewardBalance, popUpOpenSaving} from '../../state/thunks/common.thunks';
import * as actionCreators from '../../state/actions/index.actions.js';

const mapStateToProps = (state) => ({
  initialDeposit: result(state, 'savingData.productDeposit', ''),
  accounts: result(state, 'accounts', []),
  referralCode: result(state, 'referralCodeMgm', ''),
  profile: result(state, 'user.profile', {}),
  cif: result(state, 'user.profile.customer.cifCode', ''),
  currentLanguage: result(state, 'currentLanguage.id', 'id'),
  urlTncReferFriendId: result(state, 'config.attention.URL_TNC_MGM_IN', ''),
  urlTncReferFriendEn: result(state, 'config.attention.URL_TNC_MGM_EN', ''),
});

const mapDispatchToProps = (dispatch) => ({
  goHowReferralWorks: () => {
    dispatch(NavigationActions.navigate({routeName: 'HowReferralWorks'}));
  },
  goHistoryReward: () => {
    dispatch(actionCreators.clearFilterCalendar());
    dispatch(goRewardBalance());
  },
  goInvitingRecord: () => {
    dispatch(actionCreators.clearFilterCalendar());
    dispatch(NavigationActions.navigate({routeName: 'MyInvitingRecord'}));
  },
  goTncReferFriend: () => {
    dispatch(NavigationActions.navigate({routeName: 'MgmTncReferFriend'}));
  },
  popUpOpenSaving: () => {
    dispatch(popUpOpenSaving());
  }
});


class ShareReferralCodeDetail extends React.Component {

  static propTypes = {
    referralCode: PropTypes.string,
    navigation: PropTypes.object,
    goHowReferralWorks: PropTypes.func,
    goHistoryReward: PropTypes.func,
    goInvitingRecord: PropTypes.func,
    profile: PropTypes.object,
    goTncReferFriend: PropTypes.func,
    accounts: PropTypes.object,
    accountEmoney: PropTypes.object,
    cif: PropTypes.string,
    popUpOpenSaving: PropTypes.func,
    currentLanguage: PropTypes.string,
    urlTncReferFriendId: PropTypes.string,
    urlTncReferFriendEn: PropTypes.string,
  }

  render () {
    const {referralCode, navigation, goHowReferralWorks, goHistoryReward, goInvitingRecord, profile, goTncReferFriend, accounts, cif, popUpOpenSaving,
      currentLanguage, urlTncReferFriendEn, urlTncReferFriendId} = this.props;
    const userAccount = !isEmpty(find(accounts, {accountType: 'emoneyAccount'})) && !startsWith(cif, 'NK') && !isEmpty(find(accounts, {accountType: 'SavingAccount'}));
    const urlTncMgm = currentLanguage === 'en' ? urlTncReferFriendEn : urlTncReferFriendId;
    return <ShareReferralCodeComponent referralCode={referralCode} sliderChange={this.sliderChange}
      navigation={navigation} goHowReferralWorks={goHowReferralWorks} goHistoryReward={goHistoryReward} goInvitingRecord={goInvitingRecord}
      profile={profile} goTncReferFriend={goTncReferFriend} userAccount={userAccount} popUpOpenSaving={popUpOpenSaving} urlTncMgm={urlTncMgm}
    />;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShareReferralCodeDetail);
