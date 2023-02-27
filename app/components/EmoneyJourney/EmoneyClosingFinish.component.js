import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, View, Image} from 'react-native';
import {language} from '../../config/language';
import styles from './EmoneyClosingFinish.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import LogoImage from '../../assets/images/white-simobi.png';
import {SinarmasButton} from '../FormComponents';

class EmoneyClosingFinish extends React.Component {
  static propTypes = {
    accounts: PropTypes.array,
    userName: PropTypes.string,
    emoney: PropTypes.object,
    copyAccountNumber: PropTypes.func,
    cif: PropTypes.string,
    showOffer: PropTypes.bool,
    getBalanceEmoney: PropTypes.func,
    showUpgradeEmoney: PropTypes.func,
    resetToLogin: PropTypes.func,
    resetToIntro: PropTypes.func,
  }

  render () {
    const {resetToLogin, resetToIntro, accounts = []} = this.props;
    const isSavingAcc = accounts.length > 1;
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {isSavingAcc ? 
          <View>
            <View style={styles.redContainer}>
              <Image source={LogoImage} style={styles.logoImage}/>
              <View style={styles.row}>
                <Text style={styles.whiteTitle}>
                  {language.EMONEY__CLOSING_EMONEY_FINISH_TITLE}
                </Text>
                <SimasIcon name='check-black' style={styles.iconStyle} size={40}/>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.row}>
                <View style={styles.leftContainer}>
                  <View style={styles.filler}/>
                  <View style={styles.circle}/>
                  <View style={styles.greyLine}/>
                </View>
                <View style={styles.iconContainer}>
                  <SimasIcon name='sign-out-black' style={styles.arrowIcon} size={40}/>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.leftContainer}>
                  <View style={styles.greyLine}/>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>
                    {language.EMONEY__CLOSING_EMONEY_FINISH_SUBTITLE_SAVING_ACC_1}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.leftContainer}>
                  <View style={styles.greyLine}/>
                  <View style={styles.circle}/>
                </View>
                <View style={styles.iconContainer}>
                  <SimasIcon name='sign-in-black' style={styles.arrowIcon} size={40}/>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.leftContainer}/>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>
                    {language.EMONEY__CLOSING_EMONEY_FINISH_SUBTITLE_SAVING_ACC_2}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          :
          <View>
            <View style={styles.redContainer}>
              <Image source={LogoImage} style={styles.logoImage}/>
              <View style={styles.row}>
                <Text style={styles.whiteTitle}>
                  {language.EMONEY__CLOSING_EMONEY_FINISH_TITLE}
                </Text>
                <SimasIcon name='check-black' style={styles.iconStyle} size={40}/>
              </View>
              <Text style={styles.whiteSubtitle}>
                {language.EMONEY__CLOSING_EMONEY_FINISH_SUBTITLE}
              </Text>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.row}>
                <View style={styles.leftContainer}>
                  <View style={styles.filler}/>
                  <View style={styles.circle}/>
                </View>
                <View style={styles.iconContainer}>
                  <SimasIcon name='sign-out-black' style={styles.arrowIcon} size={40}/>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.leftContainer}/>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>
                    {language.EMONEY__CLOSING_EMONEY_FINISH_SUBTITLE_EMONEY_ACC}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        }      
        <View style={styles.bottomContainer}>
          <SinarmasButton onPress={isSavingAcc ? resetToLogin : resetToIntro} text={isSavingAcc ? language.EMONEY__CLOSING_EMONEY_BUTTON_LOGOUT : language.EMONEY__CLOSING_EMONEY_BUTTON_DONE }/>
        </View>
      </ScrollView>
    );


  }
}

export default EmoneyClosingFinish;
