import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import {SinarmasButton, SinarmasButtonOnboarding} from '../FormComponents';
import {language} from '../../config/language';
import styles from './IdentityFifthForm.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import checkLogo from '../../assets/images/white-checked.png';
import phone from '../../assets/images/blackIconPhone.png';
import homeIcon from '../../assets/images/blackHomeIcon.png';
import checkLogoWhite from '../../assets/images/white-checked-success.png';

class IdentityFifthForm extends Component {

  render () {
    const {onPrimaryCustomerCall, smartfrenAmount, backToHome} = this.props;
    return (
      <KeyboardAwareScrollView  style={styles.columnContainer} extraHeight={120}>
        <View style={styles.upperWrapper}>
          <View style={styles.mainTitle}>
            <Image source={checkLogoWhite} style={styles.mainCheckLogo}/>
            <Text style={styles.mainTitleText}>{language.IDENTITYFIFTHFORM__TITLE}</Text>
          </View>
          <View style={styles.subTitle}>
            <Text style={styles.subTitleText}>{language.IDENTITYFIFTHFORM__SUBTITLE}</Text>
          </View>
        </View>
        <View style={styles.fieldRow}>
          <View style={styles.bottomleftWrapper}>
            <View style={styles.circle}/>
            <View style={styles.block}/>
            {smartfrenAmount === '1' ?
              null :
              <View>
                <View style={styles.circle}/>
                <View style={styles.blockTwo}/>
              </View>
            }
            <View style={styles.circle}/>
          </View>
          <View style={styles.bottomWrapper}>
            <View style={styles.containerFieldStep}>
              <Image source={phone} style={styles.subMainCheckLogo}/>
              <View style={styles.subMainTitle}>
                <Text style={styles.subMainTitleText}>{language.IDENTITYFIFTHFORM__STEP_ONE_TITLE}</Text>
              </View>
              <View style={styles.subSubTitle}>
                {smartfrenAmount === '1' ?
                  <Text style={styles.subSubTitleText}>{language.SMARTFREN__FINAL_INFORMATION}</Text> :
                  <Text style={styles.subSubTitleText}>{language.IDENTITYFIFTHFORM__STEP_ONE_SUBTITLE}</Text>
                }
              </View>
            </View>
            {smartfrenAmount === '1' ? 
              null :
              <View style={styles.containerFieldStep}>
                <Image source={homeIcon} style={styles.subMainCheckLogo}/>
                <View style={styles.subMainTitle}>
                  <Text style={styles.subMainTitleText}>{language.IDENTITYFIFTHFORM__STEP_TWO_TITLE}</Text>
                </View>
                <View style={styles.subSubTitle}>
                  <Text style={styles.subSubTitleText}>{language.IDENTITYFIFTHFORM__STEP_TWO_SUBTITLE}</Text>
                </View>
                <View style={styles.documentStyles}>
                  <Text style={styles.documentStylesText}>
                    {language.IDENTITYFIFTHFORM__STEP_TWO_DOCUMENT_1}
                  </Text>
                  <Text style={styles.documentStylesText}>
                    {language.IDENTITYFIFTHFORM__STEP_TWO_DOCUMENT_2}
                  </Text>
                  <Text style={styles.documentStylesText}>
                    {language.IDENTITYFIFTHFORM__STEP_TWO_DOCUMENT_3}
                  </Text>
                  <Text style={styles.documentStylesText}>
                    {language.IDENTITYFIFTHFORM__STEP_TWO_DOCUMENT_4}
                  </Text>
                  <Text style={styles.documentStylesText}>
                    {language.IDENTITYFIFTHFORM__STEP_TWO_DOCUMENT_5}
                  </Text>
                </View>
              </View>
            }
            <View style={styles.containerFieldStep}>
              <Image source={checkLogo} style={styles.subMainCheckLogo}/>
              <View style={styles.subMainTitle}>
                <Text style={styles.subMainTitleText}>{language.IDENTITYFIFTHFORM__STEP_THREE_TITLE}</Text>
              </View>
              <View style={styles.subSubTitle}>
                <Text style={styles.subSubTitleText}>{language.IDENTITYFIFTHFORM__STEP_THREE_SUBTITLE}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonNext}>
          <SinarmasButtonOnboarding onPress={onPrimaryCustomerCall} style={styles.buttonLoginSpace} >
            <Text style={styles.buttonMainLoginUser}>{language.IDENTITYFIFTHFORM__TITLE_HELP_BUTTON}</Text>
          </SinarmasButtonOnboarding>
        </View>
        <View style={styles.buttonNext}>
          <SinarmasButton onPress={backToHome}>
            <Text style={styles.buttonLargeTextStyle}>{language.NEWTOBANK__BUTTON_HOME}</Text>
          </SinarmasButton>
        </View>
        <View style={styles.bottomRow}>
          <Text>
            {language.IDENTITYFIFTHFORM__TITLE_HELP}
          </Text>
          <Text style={styles.helpEmail}>
            {language.IDENTITYFIFTHFORM__TITLE_HELP_EMAIL}
          </Text>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

IdentityFifthForm.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onPrimaryCustomerCall: PropTypes.func,
  smartfrenAmount: PropTypes.string,
  backToHome: PropTypes.func
};

export default IdentityFifthForm;
