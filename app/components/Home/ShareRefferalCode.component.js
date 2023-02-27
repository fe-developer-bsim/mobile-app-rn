import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import styles from './ShareReferralCode.styles';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import morePeople from '../../assets/images/morepeople.png';
import lessPeople from '../../assets/images/lesspeople.png';
import {wrapMethodInFunction, copyToCLipboard} from '../../utils/transformer.util';

class ReferralCodeComponent extends React.Component {
  static propTypes = {
    referralCode: PropTypes.string
  }

  render () {
    const {referralCode} = this.props;
    return (
      <ScrollView Style={styles.content}>
        <View>
          <Text style={styles.mainTitle}>
            {language.REFERRALCODE__SHARE_MAIN_TITLE}
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <View style={styles.logoShare}>
              <Image source={lessPeople} style={styles.logoShareIcon}/>
            </View>
            <Text style={styles.rowInvitLeft}>
              {language.REFERRALCODE__SHARE_INVITE_TEN}
            </Text>
            <Text style={styles.rowBot}>
              {language.REFERRALCODE__SHARE_INVITE_TEN_NUMBER}
            </Text>
          </View>
          <View style={styles.rowRight}>
            <View style={styles.logoShare}>
              <Image source={morePeople} style={styles.logoShareIcon}/>
            </View>
            <Text style={styles.rowInvitRight}>
              {language.REFERRALCODE__SHARE_INVITE_TWENTY}
            </Text>
            <Text style={styles.rowBot}>
              {language.REFERRALCODE__SHARE_INVITE_TWENTY_NUMBER}
            </Text>
          </View>
        </View>
        <View style={styles.valid}>
          <Text style={styles.validText}>{language.REFERRALCODE__SHARE_VALID}</Text>
        </View>

        <View style={styles.downContent}>
          <View style={styles.shareLinkTitle}>
            <Text>
              {language.REFERRALCODE__SHARE_UNIQUE_TITLE}
            </Text>
          </View>

          <View style={styles.downRow}>
            <View style={styles.downRowLeft}>
              <Text>{referralCode}</Text>
            </View>
            <View style={styles.downRowRight}>
              <Text style={styles.copy} selectable={true} onPress={wrapMethodInFunction(copyToCLipboard, referralCode)}>
                {language.REFERRALCODE__SHARE_TERM_COPY}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomSide}>
          <View style={styles.bottomSpacing}>
            <SinarmasButton text={language.REFERRALCODE__SHARE_BUTTON}/>
          </View>
          <View style={styles.termTitleView}>
            <Text style={styles.termTitle}>
              {language.REFERRALCODE__SHARE_TERM_CONDITION}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default ReferralCodeComponent;
