import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './Introduction.styles';
import {language} from '../../config/language';
import bankSinarmas from '../../assets/images/banksinarmas.png';
import simobi from '../../assets/images/simobiplus.png';
import Touchable from '../../components/Touchable.component';
import UpgradeKyc from '../../assets/images/introduction-image.png';
import noop from 'lodash/noop';

class IntroductionComponent extends React.Component {
  static propTypes = {
    onButtonPress: PropTypes.func,
    isLockedDevice: PropTypes.bool,
    onRegistrationEmoney: PropTypes. func,
    onButtonProductPress: PropTypes.func,
    onPressLinkTnC: PropTypes.func,
    onPressLinkPrivacy: PropTypes.func,
    termsCondition: PropTypes.string,
    privacyPolicy: PropTypes.string
  }

  render () {
    const {onButtonPress, onButtonProductPress, onPressLinkTnC = noop, onPressLinkPrivacy = noop, termsCondition, privacyPolicy} = this.props;
    return (
      <View>
        <Image source={UpgradeKyc} style={styles.mainImage}/>
        <View style={styles.whiteBg}>
          <View style={styles.rowLogo}>
            <Image source={simobi} style={styles.logo}/>
            <Image source={bankSinarmas} style={styles.logo2}/>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.upperText}>{language.INTRODUCTION__PAGE_ONE}</Text>
          </View>

          <View>
            <Touchable style={styles.boxContainerPink} onPress={onButtonPress}>
              <Text style={styles.txtWhiteBold}>{language.LOGIN__LOGIN_BUTTON}</Text>
            </Touchable>
            <Touchable style={styles.boxContainerWhite} onPress={onButtonProductPress}>
              <Text style={styles.txtPinkBold}>{language.LOGIN__REGISTER}</Text>
            </Touchable>
          </View>

          <View>
            <Text style={styles.contentText}>
              {language.TERMS_CONDITION__PART_ONE}
              <Text style={styles.underlineText} onPress={onPressLinkTnC(termsCondition, 'yes')}>
                {language.TERMS_CONDITION__PART_TWO}
              </Text>
              <Text>
                {language.TERMS_CONDITION__PART_THREE}
              </Text>
              <Text style={styles.underlineText} onPress={onPressLinkPrivacy(privacyPolicy, 'yes')}>
                {language.TERMS_CONDITION__PART_FOUR}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default IntroductionComponent;
