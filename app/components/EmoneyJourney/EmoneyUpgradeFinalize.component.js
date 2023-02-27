import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import styles from './EmoneyUpgradeFinalize.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Sinarmas from '../../assets/images/banksinarmas2x.png';
import SimasIcon from '../../assets/fonts/SimasIcon';
import user from '../../assets/images/user.png';
import SimobiPlus from '../../assets/images/white-simobi.png';

class FinalizeEmoney extends Component {

  render () {
    const {onButtonPress, name, mockImageLocation = false} = this.props;
    const SinarmasLocation = mockImageLocation ? '' : Sinarmas;
    return (
      <KeyboardAwareScrollView style={styles.columnContainer} extraHeight={120} contentContainerStyle={styles.contentContainer}>
        <View style={styles.upperWrapper}>
          <Image source={SimobiPlus} style={styles.mainTitleLogo}/>
          <View style={styles.row}>
            <View style={styles.mainTitle}>
              <Text style={styles.mainTitleText}>{`${language.EMONEY__THANKYOU} ${name} ${language.EMONEY__UPGRADED_KYC}`}</Text>
            </View>
            <View style={styles.check}>
              <SimasIcon name='check-black' style={styles.mainCheckLogo} size={40}/>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.mainTitle}>
              <Text style={styles.mainsubTitleText}>{language.EMONEY__ONE_MORE_STEP}</Text>
            </View>
          </View>
        </View>

        <View style={styles.fieldRow}>
          <View style={styles.row}>
            <View style={styles.leftContainer}>
              <View style={styles.filler}/>
              <View style={styles.circleRed}/>
              <View style={styles.greyLine}/>
            </View>
            <View style={styles.iconContainer}>
              <Image source={SinarmasLocation} style={styles.imageSekuritas}/>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.leftContainer}>
              <View style={styles.greyLine}/>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.steps}>
                {language.EMONEY__REPRESENTATIVE}
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
              <Image source={user}/>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.leftContainer}/>
            <View style={styles.textContainer}>
              <Text style={styles.steps}>
                {language.CREATE_ACCOUNT__VERIFICATION}
              </Text>
              <Text style={styles.steps}>
                <Text>{language.EMONEY__ASK}</Text>
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <SinarmasButton onPress={onButtonPress}>
            <Text style={styles.buttonLargeTextStyle}>{language.EMONEY__CLOSING_EMONEY_BUTTON_DONE}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

FinalizeEmoney.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onButtonPress: PropTypes.func,
  name: PropTypes.string,
  mockImageLocation: PropTypes.bool,
};

export default FinalizeEmoney;
