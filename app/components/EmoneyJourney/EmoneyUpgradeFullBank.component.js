import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import styles from './EmoneyUpgradeFullBank.component.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Sinarmas from '../../assets/images/banksinarmas2x.png';
import checkLogoWhite from '../../assets/images/white-checked-success.png';
import user from '../../assets/images/user.png';
import SimobiPlus from '../../assets/images/white-simobi.png';



class FullBankUpgrade extends Component {

  render () {
    const {onButtonPress, mockImageLocation = false} = this.props;
    const SinarmasLocation = mockImageLocation ? '' : Sinarmas;
    return (
      <KeyboardAwareScrollView  style={styles.columnContainer} extraHeight={120}>
        <View style={styles.upperWrapper}>
          <Image source={SimobiPlus} style={styles.mainTitleLogo}/>
          <View style={styles.row}>
            <View style={styles.mainTitle}>
              <Text style={styles.mainTitleText}>{language.EMONEY__FULL_INTERESTED}</Text>
            </View>
            <Image source={checkLogoWhite} style={styles.mainCheckLogo}/>
          </View>
          <View style={styles.row}>
            <View style={styles.mainTitle}>
              <Text style={styles.mainsubTitleText}>{language.EMONEY__FULL_OPENING_ACCOUNT}</Text>
            </View>
          </View>
        </View>

        <View style={styles.fieldRow}>
          <View style={styles.bottomleftWrapper}>
            <View style={styles.circle}/>
            <View style={styles.block}/>
            <View style={styles.circle}/>
          </View>

          <View style={styles.bottomWrapper}>
            <View style={styles.containerFieldStep}>

              <View style={styles.subMainTitle}>
                <Image source={SinarmasLocation} style={styles.imageSekuritas}/>
                <Text style={styles.subMainTitleText}>{language.EMONEY__REPRESENTATIVE}</Text>
              </View>
            </View>
            <View style={styles.containerFieldStep}>

              <View style={styles.subMainTitle}>
                <Image source={user} style={styles.subMainCheckLogo2}/>
                <Text style={styles.subMainTitleText}>{language.EMONEY__ASK}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonNext}>
          <SinarmasButton onPress={onButtonPress}>
            <Text style={styles.buttonLargeTextStyle}>{language.EMONEY__OK}</Text>
          </SinarmasButton>
        </View>

      </KeyboardAwareScrollView>
    );
  }
}

FullBankUpgrade.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onButtonPress: PropTypes.func,
  mockImageLocation: PropTypes.bool,
};

export default FullBankUpgrade;
