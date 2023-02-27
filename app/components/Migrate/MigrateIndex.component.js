import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, Linking} from 'react-native';
import styles from './MigrateIndex.style';
import simobiIcon from './../../assets/images/simobiplus.png';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import VersionNumber from 'react-native-version-number';
import {Toast} from '../../utils/RNHelpers.util';
import simobiMigrate from '../../assets/images/MigrateImage.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const openLink = (termsLink) => () => {
  Linking.canOpenURL(termsLink).then((supported) => {
    if (supported) {
      Linking.openURL(termsLink);
    } else {
      if (termsLink.indexOf('tel') > -1) {
        Toast.show('Cannot call customer service');
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_HANDLE_URL);
      }
    }
  });
};

class MigrateIndexComponent extends React.Component {
  static propTypes = {
    getMigrateToken: PropTypes.func,
  }

  render () {
    const {getMigrateToken} = this.props;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithTerms} extraHeight={120}>
        <View style={styles.topContent}>
          <Image source={simobiIcon} style={styles.simobiIcon}/>
          <View>
            <Image source={simobiMigrate} style={styles.bigBannerMigrate}/>
          </View>
          <Text style={styles.mainTitle}>{language.MIGRATE__MAIN_TITLE}</Text>
          <Text style={styles.subTitle}>{language.MIGRATE__MAIN_SUBTITLE}</Text>
        </View>
        <View>
          <View style={styles.buttonNext}>
            <SinarmasButton onPress={getMigrateToken}>
              <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
            </SinarmasButton>
          </View>
          <Text style={styles.alreadyHaveAcc}>{language.ONBOARDING__ALREADY_REGISTER}</Text>
          <View style={styles.containerBottomtext}>
            <Text style={styles.contentText}>
              {language.INTRODUCTION__PAGE_BOTTOM_TEXT}{VersionNumber.appVersion}{language.INTRODUCTION__PAGE_BOTTOM_TEXT_TWO}
            </Text>
            <Text onPress={openLink(language.TERMS__LINK)} style={styles.textTerm}>
              {language.INTRODUCTION__PAGE_TERMS_TEXT}
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default MigrateIndexComponent;
