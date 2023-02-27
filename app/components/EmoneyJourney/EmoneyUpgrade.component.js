import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, View, Image, ImageBackground} from 'react-native';
import {language} from '../../config/language';
import styles from './EmoneyUpgrade.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import SimasEmoney from '../../assets/images/emoney-bg-2.png';
import SimasEmoneyBg from '../../assets/images/emoney-bg.png';
import Sinarmas from '../../assets/images/banksinarmas2x.png';
import {SinarmasButton} from '../FormComponents';

class EmoneyUpgrade extends React.Component {
  static propTypes = {
    accounts: PropTypes.array,
    userName: PropTypes.string,
    emoney: PropTypes.object,
    copyAccountNumber: PropTypes.func,
    cif: PropTypes.string,
    showOffer: PropTypes.bool,
    getBalanceEmoney: PropTypes.func,
    showUpgradeEmoney: PropTypes.func,
    movetoForm: PropTypes.func,
    mockImageLocation: PropTypes.bool,
  }

  render () {
    const {movetoForm, mockImageLocation = false} = this.props;
    const imageLocationSinarmas = mockImageLocation ? '' : Sinarmas;
    const imageLocationSimasEmoney = mockImageLocation ? '' : SimasEmoney;
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <ImageBackground source={SimasEmoneyBg} style={styles.image}>
            <View style={styles.rowImg}>
              <Image source={imageLocationSimasEmoney} style={styles.simasImg}/>
              <SimasIcon name='simas-emoney-white' style={styles.simasIcon} size={45}/>
            </View>
            <View style={styles.txtCont}>
              <View style={styles.titleCont}>
                <Text style={styles.simasTxtTitle}>{language.EMONEY__UPGRADE_EMONEY}</Text>
                <Text style={styles.simasTxtTitle}>{language.EMONEY__UPGRADE_EMONEY_SUB}</Text>
              </View>
              <View style={styles.rowTxt}>
                <Text style={styles.simasTxt}>1. </Text>
                <Text style={styles.simasTxt}>{language.EMONEY__DASHBOARD_UPGRADE_LIMIT}</Text>
              </View>
              <View style={styles.rowTxt}>
                <Text style={styles.simasTxt}>2. </Text>
                <Text style={styles.simasTxt}>{language.EMONEY__DASHBOARD_WITHDRAW}</Text>
              </View>
              <View style={styles.rowTxt}>
                <Text style={styles.simasTxt}>3. </Text>
                <Text style={styles.simasTxt}>{language.EMONEY__SEND_MONEY_2}</Text>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.contentContainer}>
            <View style={styles.rowPadding}>
              <Text style={styles.title}>
                {language.EMONEY__SIMPLE_STEPS_TITLE}
              </Text>
            </View>

            <View style={styles.row}>
              <View style={styles.leftContainer}>
                <View style={styles.filler}/>
                <View style={styles.circle}/>
                <View style={styles.greyLine}/>
              </View>
              <View style={styles.iconContainer}>
                <SimasIcon name='id' style={styles.arrowIcon} size={35}/>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.leftContainer}>
                <View style={styles.greyLine}/>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.steps}>
                  {language.EMONEY__PREPARE_ID}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.leftContainer}>
                <View style={styles.greyLine}/>
                <View style={styles.circle}/>
                <View style={styles.greyLine}/>
              </View>
              <View style={styles.iconContainer}>
                <SimasIcon name='form' style={styles.arrowIcon} size={35}/>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.leftContainer}>
                <View style={styles.greyLine}/>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.steps}>
                  {language.EMONEY__FILL_IN_FORM}
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.leftContainer}>
                <View style={styles.greyLine}/>
                <View style={styles.circle}/>
                <View style={styles.filler}/>
              </View>
              <View style={styles.iconContainer}>
                <Image source={imageLocationSinarmas} style={styles.imageSekuritas}/>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.leftContainer}/>
              <View style={styles.textContainer}>
                <Text style={styles.steps}>
                  {language.EMONEY__GO_TO_BRANCH}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <SinarmasButton onPress={movetoForm} text={language.EMONEY__UPGRADE_BUTTON}/>
        </View>
      </ScrollView>
    );
  }
}

export default EmoneyUpgrade;
