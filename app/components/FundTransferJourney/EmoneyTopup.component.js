import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, Clipboard, Image} from 'react-native';
import styles from './EmoneyTopup.style.js';
import {language} from '../../config/language';
import Touchable from '../../components/Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {emoneyAccountNumber} from '../../utils/transformer.util';
import result from 'lodash/result';
import alto from '../../assets/images/alto.png';
import atmBersama from '../../assets/images/atm-bersama.png';
import prima from '../../assets/images/prima.png';

class EmoneyTopup extends Component {
  static propTypes = {
    goTransfer: PropTypes.func,
    accounts: PropTypes.array,
    accountNumber: PropTypes.string,
  }

  copyAccountNumber = () => {
    const accountNumber = result(this.props, 'accountNumber', '');
    Clipboard.setString(accountNumber);
  }

  render () {
    const {goTransfer, accounts = [], accountNumber} = this.props;
    const showButton = accounts.length > 1;
    const emoneyAccNo = emoneyAccountNumber(accountNumber);
    return (
      <View style={styles.container}>
        {
          showButton ?
            <Touchable onPress={goTransfer} style={styles.navigationContainer}>
              <View style={styles.flex1}>
                <Text style={styles.title}>{language.EMONEY__TOP_UP_NOW}</Text>
                <View style={styles.additionalPadding}/>
                <Text style={styles.subtitle}>{language.EMONEY__TOP_UP_DETAIL}</Text>
              </View>
              <View style={styles.iconContainer}>
                <SimasIcon name='arrow' style={styles.arrowIcon} size={30}/>
              </View>
            </Touchable>
            :
            null
        }
        <View style={styles.middleContainer}>
          <View style={styles.methodContainer}>
            <Text style={showButton ? styles.otherMethod : styles.titleBlack}>{language.EMONEY__TOP_UP_OTHER_METHOD}</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.infoTitle}>{language.EMONEY__TOP_UP_CASH}</Text>
              <Text style={styles.infoSubtitle}>{language.EMONEY__TOP_UP_CASH_DETAIL}</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.accountNumberContainer}>
                <Text style={styles.accountNumberTitle}>{language.EMONEY__TOP_UP_ACCOUNT}</Text>
                <Text style={styles.accountNumber}>{emoneyAccNo}</Text>
              </View>
              <Touchable onPress={this.copyAccountNumber}>
                <SimasIcon name='copy' style={styles.copyIcon} size={20}/>
              </Touchable>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.infoTitle}>{language.EMONEY__TOP_UP_TRANSFER_SINARMAS}</Text>
              <Text style={styles.infoSubtitle}>{language.EMONEY__TOP_UP_TRANSFER_DETAIL}</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.accountNumberContainer}>
                <Text style={styles.accountNumberTitle}>{language.EMONEY__TOP_UP_ACCOUNT}</Text>
                <Text style={styles.accountNumber}>{emoneyAccNo}</Text>
              </View>
              <Touchable onPress={this.copyAccountNumber}>
                <SimasIcon name='copy' style={styles.copyIcon} size={20}/>
              </Touchable>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.infoTitle}>{language.EMONEY__TOP_UP_TRANSFER_OTHER}</Text>
              <View style={styles.imagesContainer}>
                <Image source={prima} style={styles.logo}/>
                <View style={styles.logoPadding}/>
                <Image source={atmBersama} style={styles.logo}/>
                <View style={styles.logoPadding}/>
                <Image source={alto} style={styles.logo}/>
              </View>
              <Text style={styles.infoSubtitle}>{language.EMONEY__TOP_UP_TRANSFER_OTHER_DETAIL}</Text>
              <Text style={styles.infoSubtitle}>{language.EMONEY__TOP_UP_TRANSFER_CODE}<Text style={styles.infoSubtitleBold}>153</Text></Text>
            </View>
            <View style={styles.row}>
              <View style={styles.accountNumberContainer}>
                <Text style={styles.accountNumberTitle}>{language.EMONEY__TOP_UP_ACCOUNT}</Text>
                <Text style={styles.accountNumber}>{emoneyAccNo}</Text>
              </View>
              <Touchable onPress={this.copyAccountNumber}>
                <SimasIcon name='copy' style={styles.copyIcon} size={20}/>
              </Touchable>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default EmoneyTopup;
