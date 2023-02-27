import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, Linking, ScrollView} from 'react-native';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';
import styles from './FailActivationPage.styles';
import SimobiPlus from '../../assets/images/simobiplus.png';
import {SinarmasButton} from '../FormComponents';
import {noop} from 'lodash';
import moment from 'moment';
import SimasIcon from '../../assets/fonts/SimasIcon';

class CreditCardFinalizeForm extends Component {
  openStoreURL = () => {
    Linking.canOpenURL('http://.bit.ly/simobiplus').then((supported) => {
      if (supported) {
        Linking.openURL('http://bit.ly/simobiplus');
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_CALL);
      }
    }).catch(() => Toast.show(language.ERROR_MESSAGE__CANNOT_CALL));
  }

  call = () => {
    Linking.canOpenURL('tel:1500153').then((supported) => {
      if (supported) {
        Linking.openURL('tel:1500153');
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_CALL);
      }
    }).catch(() => Toast.show(language.ERROR_MESSAGE__CANNOT_CALL));
  }

  render () {
    const {transactionDate = new Date(), onClose = noop, errorCode, onDone, isLockedDevice, onLockDown} = this.props;
    const txDate = moment(transactionDate).format('D MMM YYYY, h:mm a');

    return (
      <ScrollView contentContainerStyle={styles.columnContainer}>
        <View>
          <View style={styles.upperWrapper}>
            <View style={styles.titleContainer}>
              <Image source={SimobiPlus} style={styles.mainTitleLogo}/>
              <Text style={styles.transactionDate}>{txDate}</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.mainTitle}>
                {errorCode === '99' || errorCode === '96' || errorCode === '01' ?
                  <Text style={styles.mainTitleText}>{language.ACTIVATION__TITLE_FAIL_PAGE_INVALID}</Text>
                  :
                  errorCode === '98' ?
                    <Text style={styles.mainTitleText}>{language.ACTIVATION__TITLE_FAIL_PAGE_EXPIRED}</Text>
                    :
                    <Text style={styles.mainTitleText}>{language.ACTIVATION__TITLE_FAIL_PAGE}</Text>
                }
              </View>
              <SimasIcon name={'fail-circle'} style={styles.logoFail} size={50}/>
            </View>
          </View>
          <View>
            <View style={styles.borderGreyTop}/>
          </View>
          <View style={styles.middleContainer}>
            {errorCode === '97' ?
              <View style={styles.helpContainer}>
                <Text style={styles.subTitle}>{language.ACTIVATION__SUBTITLE_FAIL_PAGE}</Text>
              </View>
              :
              null
            }
            <View style={styles.helpContainer}>
              <Text style={styles.description}>{language.ACTIVATION__BOTTOM_TEXT_ONE}
                <Text style={styles.redText}>{language.ACTIVATION__BOTTOM_TEXT_TWO}</Text>
                <Text style={styles.description}>{language.ACTIVATION__BOTTOM_TEXT_THREE}</Text>
                <Text style={styles.redText}>{language.ACTIVATION__BOTTOM_TEXT_FOUR}</Text>
              </Text>
            </View>
          </View>


          <View />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            {isLockedDevice && errorCode === '97' ?
              <SinarmasButton onPress={onLockDown} text={language.LOGIN__LOGIN_BUTTON}/>
              :
              errorCode === '97' ?
                <SinarmasButton onPress={onClose} text={language.LOGIN__LOGIN_BUTTON}/>
                :
                <SinarmasButton onPress={onDone} text={language.EMONEY__CLOSING_EMONEY_BUTTON_DONE}/>
            }
          </View>
        </View>
      </ScrollView>
    );
  }
}

CreditCardFinalizeForm.propTypes = {
  displayList: PropTypes.object,
  dataDetailList: PropTypes.object,
  transactionId: PropTypes.string,
  amount: PropTypes.string,
  accountFrom: PropTypes.object,
  transactionDate: PropTypes.string,
  transactionType: PropTypes.string,
  onClose: PropTypes.func,
  token: PropTypes.string,
  type: PropTypes.string,
  errorCode: PropTypes.string,
  onDone: PropTypes.func,
  isLockedDevice: PropTypes.bool,
  onLockDown: PropTypes.func
};

export default CreditCardFinalizeForm;
