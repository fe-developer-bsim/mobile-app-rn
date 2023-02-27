import React from 'react';
import PropTypes from 'prop-types';
import {Text, Linking, View} from 'react-native';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';
import styles from './TermConditionLink.styles';
import VersionNumber from 'react-native-version-number';

const openLink = (termsLink) => () => {
  Linking.canOpenURL(termsLink).then((supported) => {
    if (supported) {
      Linking.openURL(termsLink);
    } else {
      if (termsLink.indexOf('tel') > -1) {
        Toast.show('Cannot call customer service', Toast.LONG);
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_HANDLE_URL, Toast.LONG);
      }
    }
  });
};

const TermConditionLink = ({showTerms, drawer, link}) => (
  <View>
    {showTerms ?
      <View>
        <Text style={styles.greySmallText}>Simobi v{VersionNumber.appVersion}. {language.LOGIN__TERM_CONDITION_TEXT}</Text>
        <Text style={styles.footerText}>
          <Text onPress={openLink(link)} style={styles.redSmallText}>{language.LOGIN__TERM_CONDITION_LINK}.</Text>
          <Text style={styles.greySmallText}>{language.LANDING__NEED_HELP}</Text>
          <Text onPress={openLink('tel:1500153')} style={styles.redSmallText}>{language.LANDING__CALL_US}</Text>
        </Text>
      </View>
      :
      drawer ?
        <View>
          <Text onPress={openLink(link)} style={styles.whiteUnderlineText}>{language.DRAWER__TERM_CONDITION_LINK}.</Text>
          <Text style={styles.whiteSmallText}>Simobi v{VersionNumber.appVersion}</Text>
        </View>
        :
        <View>
          <Text style={styles.footerText}>
            <Text style={styles.greySmallText}>{language.LANDING__NEED_HELP}</Text>
            <Text onPress={openLink('tel:1500153')} style={styles.redSmallText}>{language.LANDING__CALL_US}</Text>
          </Text>
        </View>
    }
  </View>
);


TermConditionLink.propTypes = {
  handleSubmit: PropTypes.func,
  showTerms: PropTypes.bool,
  drawer: PropTypes.bool,
  link: PropTypes.string,
};

export default TermConditionLink;
