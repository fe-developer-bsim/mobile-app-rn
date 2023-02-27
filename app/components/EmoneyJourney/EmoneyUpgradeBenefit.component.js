import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import styles from './EmoneyUpgrade.styles';
import UpgradeKyc from '../../assets/images/upgrade-kyc-benefit.png';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {Platform} from 'react-native';
let adjustAndroid;

if (Platform.OS === 'android') {
  adjustAndroid = require('react-native-adjust');
}  

class EmoneyUpgradeBenefit extends React.Component {
  static propTypes = {
    goNextPage: PropTypes.func,
    isSplitBillNKYC: PropTypes.bool,
    goNextPageSplitBill: PropTypes.func,
    cif: PropTypes.string
  }
  
  render () {
    const {goNextPage, isSplitBillNKYC, goNextPageSplitBill, cif} = this.props;
    let adjustEvent;
    if (Platform.OS === 'android') {
      adjustEvent = new adjustAndroid.AdjustEvent('eb9ysx');
      adjustEvent.addCallbackParameter('page_id', 'ak-emkyc-1');
      adjustEvent.addCallbackParameter('cif', cif);
      adjustAndroid.Adjust.trackEvent(adjustEvent);
    }

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.spaceContainerIndex}>
          <View style={styles.container}>
            <Text style={styles.mainTitleText}>{language.UPGRADE__KYC_MAIN_TITLE}</Text>
            <Image source={UpgradeKyc} style={styles.benefitImage}/>
            <View style={styles.mainContent}>
              <Text style={styles.subtitleText}>{language.UPGRADE__KYC_SUB_TITLE}</Text>
              <View style={styles.rowContainer}>
                <SimasIcon style={styles.benefitIcon} name={'success-circle'} size={15}/>
                <View>
                  <Text style={styles.benefitTxt}>{language.UPGRADE__KYC_BENEFIT_1}</Text>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <SimasIcon style={styles.benefitIcon} name={'success-circle'} size={15}/>
                <View>
                  <Text style={styles.benefitTxt}>{language.UPGRADE__KYC_BENEFIT_2}</Text>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <SimasIcon style={styles.benefitIcon} name={'success-circle'} size={15}/>
                <View>
                  <Text style={styles.benefitTxt}>{language.UPGRADE__KYC_BENEFIT_3}</Text>
                </View>
              </View>
              
              <View style={styles.rowContainer}>
                <SimasIcon style={styles.benefitIcon} name={'success-circle'} size={15}/>
                <View>
                  <Text style={styles.benefitTxt}>{language.UPGRADE__KYC_BENEFIT_4}</Text>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <SimasIcon style={styles.benefitIcon} name={'success-circle'} size={15}/>
                <View>
                  <Text style={styles.benefitTxt}>{language.UPGRADE__KYC_BENEFIT_5}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonWrapperHorizontal}>
          <SinarmasButton onPress={!isSplitBillNKYC ? goNextPage : goNextPageSplitBill}>
            <Text style={styles.buttonLargeTextStyle}>{language.EMONEY__UPGRADE_NOW}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default EmoneyUpgradeBenefit;
