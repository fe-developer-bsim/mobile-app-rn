import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, ImageBackground, Image, Linking} from 'react-native';
import {language} from '../../config/language';
import styles from './ShareReferralCodeMgm.styles';
import Touchable from '../Touchable.component';
import {result} from 'lodash';
import MgmImage from '../../assets/images/Mgm_Image.png';
import HOW from '../../assets/images/HOW.png';
import RECORD from '../../assets/images/RECORD.png';
import REWARD from '../../assets/images/REWARD.png';
import SHARE from '../../assets/images/SHARE.png';
import Share from 'react-native-share';
import {copyToCLipboard, wrapMethodInFunction} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {Toast} from '../../utils/RNHelpers.util';


const openLink = (officeLink) => () => {
  Linking.canOpenURL(officeLink).then((supported) => {
    if (supported) {
      Linking.openURL(officeLink);
    } else {
      Toast.show(language.ERROR_MESSAGE__CANNOT_HANDLE_URL, Toast.LONG);
    }
  });
};

class ShareReferralCode extends React.Component {
  static propTypes = {
    referralCode: PropTypes.string,
    goHowReferralWorks: PropTypes.func,
    goHistoryReward: PropTypes.func,
    goInvitingRecord: PropTypes.func,
    profile: PropTypes.object,
    goTncReferFriend: PropTypes.func,
    userAccount: PropTypes.bool,
    popUpOpenSaving: PropTypes.func,
    urlTncMgm: PropTypes.string,
  }

  screenCapture = () => () => {
    const {referralCode} = this.props;
    const wordingShare = result(referralCode, 'wording', '');
    const shareOptions = {
      title: language.PAYMENT_STATUS__SHARE_WITH,
      message: wordingShare + language.MGM__SHARE_SUCCESS_TEXT2,
      // url: 'https://simobiplusprod.page.link/?link=https://www.banksinarmas.com/PersonalBanking/ShareCodeMgm/:?pathRoute=' + 'Introduction' + '/?referralCode=' + shareReferralCode + '&apn=com.simas.mobile.SimobiPlus&isi=938705552&ibi=com.simas.mobile.SimobiPlus',
      url: 'http://bit.ly/simobiplus-mgm-sp'
    };
    Share.open(shareOptions);
  }

  render () {
    const {referralCode, goHowReferralWorks, goHistoryReward, goInvitingRecord, urlTncMgm} = this.props;
    const shareReferralCode = result(referralCode, 'referralCode', '');

    return (
      <ScrollView style={styles.midContainer}>
        <View style={styles.upperContainer}>
          <View style={styles.borderHeader}>
            <Text style={styles.textReferYour}>{language.MGM__REFER_YOUR_FRIENDS}</Text>
          </View>
        </View>
        <View>
          <ImageBackground source={MgmImage} style={styles.backgroundImage}>
            <Text style={styles.textReferYour3}>{language.MGM__REFER_YOUR_FRIENDS2}</Text>
          </ImageBackground>
        </View>
        <View style={styles.media}>
          <Text style={styles.textReferral}>{language.MGM__REFERRAL_CODE}</Text>
          <View style={styles.rowShare}>
            <View style={styles.box}>
              <View style={styles.rowBetween}>
                <Text style={styles.amountText}>{shareReferralCode}</Text>
                <Touchable onPress={wrapMethodInFunction(copyToCLipboard, shareReferralCode)}>
                  <SimasIcon name='copy' style={styles.copyIcon} size={15}/>
                </Touchable>
              </View>
              <View />
            </View>
            <Touchable onPress={this.screenCapture()}>
              <View style={styles.buttonShare}>
                <Image source={SHARE} style={styles.pictureIconShare}/>
                <Text style={styles.textButtonShare}>{language.MGM__TEXT_SHARE3}</Text>
              </View>
            </Touchable>
          </View>

          <View style={[styles.content, styles.row]}>
            <View style={styles.wrapCoupon}>
              <Touchable onPress={goHowReferralWorks}>
                <View style={styles.height}>
                  <Image source={HOW} style={styles.pictureIcon}/>
                </View>
                <View style={styles.mv20}>
                  <Text style={styles.roboto}>{language.MGM__REFER__CODE_WORK}</Text>
                  <Text style={styles.roboto}>{language.MGM__REFER__CODE_WORK2}</Text>
                </View>
              </Touchable>
            </View>
            <View style={styles.wrapCoupon}>
              <Touchable onPress={goInvitingRecord}>
                <View style={styles.height}>
                  <Image source={RECORD} style={styles.pictureIcon}/>
                </View>
                <View style={styles.mv20}>
                  <Text style={styles.roboto}>{language.MGM__REFER__CODE_RECORD}</Text>
                  <Text style={styles.roboto}>{language.MGM__REFER__CODE_RECORD2}</Text>
                </View>
              </Touchable>
            </View>
            <View style={styles.wrapCoupon}>
              <Touchable onPress={goHistoryReward}>
                <View style={styles.height}>
                  <Image source={REWARD} style={styles.pictureIcon}/>
                </View>
                <View style={styles.mv20}>
                  <Text style={styles.roboto}>{language.MGM__REFER__CODE_REWARD}</Text>
                  <Text style={styles.roboto}>{language.MGM__REFER__CODE_REWARD2}</Text>
                </View>
              </Touchable>
            </View>
          </View>
          <Touchable onPress={openLink(urlTncMgm)}>
            <View style={styles.readTnc}>
              <Text style={styles.textTnc}>* {language.MGM__REFER__CODE_TNC}</Text>
            </View>
          </Touchable>
        </View>

      </ScrollView>
    );
  }
}

export default ShareReferralCode;
