import {View, Image, Text, ScrollView} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './QRRegisterStatus.styles';
import LogoImage from '../../assets/images/white-simobi.png';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import result from 'lodash/result';

class QRRegisterStatus extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    navigation: PropTypes.object,
  }

  render () {
    const {handleSubmit, navigation} = this.props;
    const merchantId = result(navigation, 'state.params.merchantId', '');
    const isSuccess = result(navigation, 'state.params.isSuccess', '');
    const isRegisterTerminal = result(navigation, 'state.params.isRegisterTerminal', '');
    const errMsg = result(navigation, 'state.params.errMsg', '');
    return (
      <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.container} extraHeight={120} style={styles.bgGrey}>
        <View style={styles.redContainer}>
          <Image source={LogoImage} style={styles.logoImage}/>
          <View style={styles.regCont}>
            <View>
              {isRegisterTerminal === true ?
                <Text style={styles.merchantText}>{language.QR_GPN__MERCHANT_SUCCESS_01_CASHIER}</Text>
                : isRegisterTerminal === false ?
                  <Text style={styles.merchantText}>{language.QR_GPN__MERCHANT_SUCCESS_01_STORE}</Text>
                  :
                  <Text style={styles.merchantText}>{language.QR_GPN__MERCHANT_SUCCESS_01}</Text>
              }
              {isSuccess === 'yes' ?
                <Text style={styles.merchantText}>{language.QR_GPN__MERCHANT_SUCCESS_02}</Text>
                :
                <View>
                  <Text style={styles.merchantText}>{language.QR_GPN__MERCHANT_FAILED}</Text>
                  <Text style={styles.whiteText}>{errMsg}</Text>
                </View>
              }
            </View>
            <View style={styles.plusContainer}>
              <SimasIcon name={isSuccess === 'yes' ? 'check-black' : 'close-black'} size={30} style={styles.plusIcon}/>
            </View>
          </View>
          <View>
            {isRegisterTerminal === true || isRegisterTerminal === false ?
              null
              :
              <View>
                <Text style={styles.whiteText}>{language.QR_GPN__MERCHANT_SUCCESS_08}</Text>
                <Text style={styles.whiteText}>{merchantId}</Text>
              </View>
            }
          </View>
          <View style={styles.info}>
            <Text style={styles.whiteText}>{language.QR_GPN__MERCHANT_SUCCESS_03}</Text>
            <View style={styles.row}>
              <Text style={styles.whiteUnderlineText}>{language.QR_GPN__MERCHANT_SUCCESS_04}</Text>
              <Text style={styles.whiteText}>{language.QR_GPN__MERCHANT_SUCCESS_05}</Text>
            </View>
          </View>
        </View>
        {isSuccess === 'yes' ?
          <View style={styles.whiteContainer}>
            <View style={styles.row}>
              <View>
                <View style={styles.plusContainer}>
                  <SimasIcon name={'bullet'} size={15} style={styles.bulletIcon}/>
                </View>
              </View>
              <View>
                <View style={styles.plusContainer}>
                  <SimasIcon name={'time-black'} size={40} style={styles.waitIcon}/>
                </View>
                <View style={styles.info2}>
                  <Text style={styles.txt}>{language.QR_GPN__MERCHANT_SUCCESS_06}</Text>
                  <Text style={styles.txt}>{language.QR_GPN__MERCHANT_SUCCESS_07}</Text>
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <View>
                <View style={styles.plusContainer}>
                  <SimasIcon name={'bullet'} size={15} style={styles.bulletIcon}/>
                </View>
              </View>
              <View>
                <View style={styles.plusContainer}>
                  <SimasIcon name={'envelope'} size={40} style={styles.waitIcon}/>
                </View>
                <View style={styles.info2}>
                  <Text style={styles.txt}>{language.QR_GPN__MERCHANT_SUCCESS_09}</Text>
                  <Text style={styles.txt}>{language.QR_GPN__MERCHANT_SUCCESS_10}</Text>
                  <Text style={styles.txt}>{language.QR_GPN__MERCHANT_SUCCESS_11}</Text>
                </View>
              </View>
            </View>
          </View> : null}
        <View style={styles.buttonAgree}>
          <SinarmasButton onPress={handleSubmit} text={language.QR_GPN__REFUND_STATUS_09} />
        </View>
      </ScrollView>
    );
  }
}


export default QRRegisterStatus;
