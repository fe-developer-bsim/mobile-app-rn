import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image} from 'react-native';
import styles from './SILForexHours.styles';
import {language} from '../../config/language';
import {noop} from 'lodash';
import {SinarmasButton} from '../FormComponents';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import warnIcon from '../../assets/images/warn.png';



class SilForexHoursComponent extends React.Component {
  static propTypes = {
    navParams: PropTypes.object,
    onBackPage: PropTypes.func,
    currentLanguage: PropTypes.string,
    url: PropTypes.string,
    isSilIdrUsd: PropTypes.string,
    cutOffTimeForex: PropTypes.string,
    startTimeForex: PropTypes.string
  }

  render () {
    const {onBackPage = noop} = this.props;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.buttonContainer}>
          <View>
            <Image source={warnIcon} style={styles.successImage}/>
            <View style={styles.service}>
              <Text style={styles.textService}>{language.SIL__FOREX_HOURS_SERVICE}</Text>
            </View>
            <View style={styles.operational}>
              <Text style={styles.textoperational}>{language.SIL__FOREX_HOURS_OPERATIONAL}</Text>
            </View>
            <View style={styles.service}>
              <Text style={styles.textLater}>{language.SIL__FOREX_HOURS_LATER}</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonBack}>
          <SinarmasButton onPress={onBackPage}>
            <Text style={styles.nextButton}>{language.SIL__FOREX_HOURS_BACK}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default SilForexHoursComponent;