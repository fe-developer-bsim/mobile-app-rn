import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import {language} from '../../config/language';
import styles from './RedeemSmartfrenResult.styles';
import {SinarmasButton} from '../FormComponents';
import result from 'lodash/result';
import successImg from '../../assets/images/check-green.png';
import errorImg from '../../assets/images/check-green.png';

class RedeemSmartfrenResult extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    navigation: PropTypes.object,
  }

  render () {
    const {navigation} = this.props;
    const responseCode = result(navigation, 'state.params.response.data.responseCode', '');
    const message = result(navigation, 'state.params.response.data.responseMessage', '');
    const transRefNum = result(navigation, 'state.params.response.data.ipassport', '');
    const serverTime = result(navigation, 'state.params.serverTime', '').substring(0, 16);
    return (
      <ScrollView keyboardShouldPersistTaps='handled' >
        <View style={styles.container}>
          <View style={styles.imageTop}>
            <Image source={responseCode === '00' ? successImg : errorImg}/>
          </View>
          <View style={styles.viewTittle1}>
            { responseCode === '00' ?
              <Text style={styles.textTittle1}>{language.REDEEM__SMARTFREN__TEXT__RES__SUCCESS}</Text>
              :
              <Text style={styles.textTittle1}>{language.REDEEM__SMARTFREN__TEXT__RES__FAIL}</Text>
            }
          </View>
          <View style={styles.viewMessage}>
            <Text style={styles.textMessage}>{message}</Text>
          </View>
          <View style={styles.viewFooter}>
            <Text style={styles.textFooter}>{transRefNum}</Text>
            <Text style={styles.textFooter}>{serverTime}</Text>
          </View>
          <SinarmasButton style={styles.buttonNext} text={language.REDEEM__SMARTFREN__BTN__GET__CAHSBACK__RES}/>
        </View>
      </ScrollView>
    );
  }
}

export default RedeemSmartfrenResult;
