import React from 'react';
import PropTypes from 'prop-types';
import {language} from '../../config/language';
import {Text, View, ScrollView, Image} from 'react-native';
import styles from './ShareReferralCodeMgm.styles';
import MgmCode from '../../assets/images/MgmCode.png';
import MgmShare from '../../assets/images/MgmShare.png';


class ReferralYou extends React.Component {
  static propTypes = {
    detailProductData: PropTypes.array,
  }

  render () {
    return (
      <ScrollView>
        <View>
          <View style={styles.titleCode}>
            <View style={styles.referalCode}>
              <Text style={styles.redText}>1</Text>
            </View>
            <View style={styles.titleCodeText}>
              <Text style={styles.whiteText}>{language.MGM__TEXT_YOUR} </Text>
              <Text style={styles.whiteTextBold}>{language.MGM__TEXT_YOUR_CODE} </Text>
            </View>
          </View>
          <View>
            <Image source={MgmCode} style={styles.backgroundImageReferral1} />
          </View>
          <View style={styles.titleCode2}>
            <View style={styles.referalCode}>
              <Text style={styles.redText}>2</Text>
            </View>
            
            <View style={styles.titleCodeText}>
              <Text style={styles.whiteText}>{language.MGM__TEXT_SHARE1} </Text>
              <View style={styles.row}>
                <Text style={styles.whiteText}>{language.MGM__TEXT_SHARE2} </Text> 
                <Text style={styles.whiteTextBold}>{language.MGM__TEXT_SHARE3} </Text> 
              </View>
              <Text style={styles.whiteText}>{language.MGM__TEXT_SHARE4} </Text> 
            </View>
          </View>
          <View style={styles.pb30}>
            <Image source={MgmShare} style={styles.backgroundImageReferral2} />
          </View>
        </View>
        
      </ScrollView>

    );
  }
}

export default ReferralYou;
