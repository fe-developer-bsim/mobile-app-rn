import React from 'react';
import PropTypes from 'prop-types';
import {language} from '../../config/language';
import {Text, View, ScrollView, Image} from 'react-native';
import styles from './ShareReferralCodeMgm.styles';
import MgmRegister from '../../assets/images/MgmRegister.png';
import MgmCodeRegister from '../../assets/images/MgmCodeRegister.png';
import MgmSavingDAO from '../../assets/images/MgmSavingDAO.png';

class ReferralYourFriend extends React.Component {
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
              <Text style={styles.whiteText}>{language.MGM__TEXT_REGISTER1} </Text>
              <View style={styles.row}>
                <Text style={styles.whiteText}>{language.MGM__TEXT_REGISTER2} </Text> 
                <Text style={styles.whiteTextBold}>{language.MGM__TEXT_REGISTER3} </Text> 
                <Text style={styles.whiteText}>{language.MGM__TEXT_REGISTER4} </Text> 
              </View>
            </View>
          </View>
          <View>
            <Image source={MgmRegister} style={styles.backgroundImageReferral3} />
          </View>
          <View style={styles.titleCode2}>
            <View style={styles.referalCode}>
              <Text style={styles.redText}>2</Text>
            </View>
            <View style={styles.titleCodeText}>
              <View style={styles.row}>
                <Text style={styles.whiteText}>{language.MGM__TEXT_REGISTER_SAVING1} </Text>
                <Text style={styles.whiteTextBold}>{language.MGM__TEXT_REGISTER_SAVING2} </Text> 
                <Text style={styles.whiteText}>{language.MGM__TEXT_REGISTER_SAVING3} </Text> 
              </View>
              <View>
                <Text style={styles.whiteTextBold}>{language.MGM__TEXT_REGISTER_SAVING4} </Text> 
              </View>
            </View>
          </View>
          <View>
            <Image source={MgmSavingDAO} style={styles.backgroundImageReferral4} />
          </View>
          <View style={styles.titleCode2}>
            <View style={styles.referalCode}>
              <Text style={styles.redText}>3</Text>
            </View>
            <View style={styles.titleCodeText}>
              <View style={styles.row}>
                <Text style={styles.whiteText}>{language.MGM__TEXT_REGISTER_CODE1} </Text>
                <Text style={styles.whiteTextBold}>{language.MGM__TEXT_YOUR_CODE} </Text> 
                <Text style={styles.whiteText}>{language.MGM__TEXT_REGISTER_CODE2} </Text> 
              </View>
              <View>
                <Text style={styles.whiteText}>{language.MGM__TEXT_REGISTER_CODE3} </Text> 
              </View>
            </View>
          </View>
          <View style={styles.pb30}>
            <Image source={MgmCodeRegister} style={styles.backgroundImageReferral4} />
          </View>
        </View>
        
      </ScrollView>

    );
  }
}

export default ReferralYourFriend;
