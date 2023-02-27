import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import {language} from '../../config/language';
import styles from './SavingAccountFinalize.style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimobiPlus from '../../assets/images/white-simobi.png';
import {SinarmasButton} from '../FormComponents';
import SimasIcon from '../../assets/fonts/SimasIcon';

class DukcapilNotMatch extends Component {

  render () {
    const {backToHome} = this.props;
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.columnContainer} extraHeight={120}>
        <View style={styles.upperWrapper}>
          <Image source={SimobiPlus} style={styles.mainTitleLogo}/>
          <View style={styles.row}>
            <View style={styles.mainTitle}>
              <Text style={styles.mainTitleText}>{language.SAVING_ACCOUNT__DATA_NOT_MATCH}</Text>
            </View>
            <View style={styles.check2}><SimasIcon name='fail' style={styles.mainCheckLogo} size={26}/></View>
          </View>
        </View>
        <View>
          <View style={styles.borderGreyTop}/>
        </View>
        <View style={styles.middle2Container}>
          <View style={styles.ticketContainer}>
            <Text style={styles.informationText}>{language.SAVING_ACCOUNT__INFORMATION_NOTMATCH}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.boxedInfo}>
            <SimasIcon style={styles.iconColor} name='caution-circle' size={20}/>
            <Text style={styles.info}>{language.SAVING_ACCOUNT__BOX_INFORMATION}</Text>
          </View>
          <SinarmasButton onPress={backToHome}>
            <Text style={styles.buttonLargeTextStyle}>{language.GENERIC__CLOSE}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

DukcapilNotMatch.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onButtonPress: PropTypes.func,
  backToHome: PropTypes.func,
};

export default DukcapilNotMatch;
