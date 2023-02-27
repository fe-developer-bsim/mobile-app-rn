import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import styles from './FinalizeEmoney.style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import signOut from '../../assets/images/sign-out.png';
import signIn from '../../assets/images/sign-in.png';
import checkLogoWhite from '../../assets/images/white-checked-success.png';
import SimobiPlus from '../../assets/images/white-simobi.png';


class FinalizeEmoney extends Component {

  render () {
    const {onButtonPress, name} = this.props;
    return (
      <KeyboardAwareScrollView  style={styles.columnContainer} extraHeight={120}>
        <View style={styles.upperWrapper}>
          <Image source={SimobiPlus} style={styles.mainTitleLogo}/>
          <View style={styles.row}>
            <View style={styles.mainTitle}>
              <Text style={styles.mainTitleText}>{`${language.EMONEY__THANKYOU} ${name} ${language.EMONEY__ACTIVATED}`}</Text>
            </View>
            <Image source={checkLogoWhite} style={styles.mainCheckLogo}/>
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
                <Image source={signOut} style={styles.subMainCheckLogo}/>
                <Text style={styles.subMainTitleText}>{language.EMONEY__SIGNOUT}</Text>
              </View>
            </View>
            <View style={styles.containerFieldStep}>

              <View style={styles.subMainTitle}>
                <Image source={signIn} style={styles.subMainCheckLogo}/>
                <Text style={styles.subMainTitleText}>{language.EMONEY__SIGNIN}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonNext}>
          <SinarmasButton onPress={onButtonPress}>
            <Text style={styles.buttonLargeTextStyle}>{language.EMONEY__LOGOUT}</Text>
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

};

export default FinalizeEmoney;
